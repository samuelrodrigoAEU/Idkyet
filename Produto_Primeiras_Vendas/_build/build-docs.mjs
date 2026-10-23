// Gera PDF (A5), HTML e DOCX de cada documento a partir dos arquivos Markdown.
// Uso: node build-docs.mjs            (todos)
//      node build-docs.mjs principal  (só um, pelo id)
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = [
  { id: "principal", pasta: "Produto_Principal", nome: "Primeiras-Vendas-na-Pratica", titulo: "Primeiras Vendas na Prática" },
  { id: "scripts", pasta: "Order_Bump_01_Scripts", nome: "Kit-de-Conversas-que-Vendem", titulo: "Kit de Conversas que Vendem" },
  { id: "conteudo", pasta: "Order_Bump_02_Conteudo", nome: "Fabrica-de-Conteudo-Organico", titulo: "Fábrica de Conteúdo Orgânico" },
  { id: "painel", pasta: "Order_Bump_03_Painel", nome: "Painel-das-Primeiras-Vendas-Manual", titulo: "Painel das Primeiras Vendas" },
];
const rotulos = {
  passos: "Passo a passo", exemplo: "Exemplo (simulação)", modelo: "Modelo para copiar e adaptar",
  erro: "Erro comum", exercicio: "Exercício", pronto: "Pronto quando", nota: "Importante",
};
const filtro = process.argv.slice(2);
const tmp = join(raiz, "_build", "tmp");
const htmlDir = join(raiz, "_build", "html");
mkdirSync(tmp, { recursive: true });
mkdirSync(htmlDir, { recursive: true });

const pandoc = (args, input) => execFileSync("pandoc", args, { input, maxBuffer: 64 << 20 }).toString();
const css = pathToFileURL(join(raiz, "Identidade_Visual", "documento.css")).href;
const pagina = (titulo, corpo) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>${titulo}</title>
<link rel="stylesheet" href="${css}"></head><body>${corpo}</body></html>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const d of docs.filter((d) => !filtro.length || filtro.includes(d.id))) {
  const fonte = join(raiz, d.pasta, "fonte");
  const md = readdirSync(fonte).filter((f) => f.endsWith(".md")).sort()
    .map((f) => readFileSync(join(fonte, f), "utf8")).join("\n\n");

  // A capa fica entre <!--capa--> e <!--/capa-->; o resto é o corpo.
  const [, capa = "", corpoMd = md] = md.match(/<!--capa-->([\s\S]*?)<!--\/capa-->([\s\S]*)/) || [];
  const corpoHtml = pandoc(["-f", "markdown+fenced_divs+pipe_tables+raw_html+hard_line_breaks-implicit_header_references", "-t", "html5", "--wrap=none"], corpoMd);
  writeFileSync(join(htmlDir, `${d.nome}.html`), pagina(d.titulo, capa + corpoHtml));

  const page = await browser.newPage();
  const pdfDe = async (html, rodape) => {
    const arq = join(tmp, `${d.id}-${rodape ? "corpo" : "capa"}.html`);
    writeFileSync(arq, html);
    await page.goto(pathToFileURL(arq).href);
    await page.evaluate(() => document.fonts.ready);
    return page.pdf({
      preferCSSPageSize: true, printBackground: true, displayHeaderFooter: rodape,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;font-family:monospace;font-size:6.5px;color:#5E6370;padding:0 13mm;display:flex;justify-content:space-between"><span>${d.titulo}</span><span class="pageNumber"></span></div>`,
    });
  };
  const final = await PDFDocument.create();
  const estiloCapa = "<style>@page{margin:0} body{background:#161A22} .capa{height:210mm;border-radius:0;padding:20mm 15mm 16mm} .capa.bump{border:0}</style>";
  for (const bytes of [await pdfDe(pagina(d.titulo, estiloCapa + capa), false), await pdfDe(pagina(d.titulo, corpoHtml), true)]) {
    const src = await PDFDocument.load(bytes);
    (await final.copyPages(src, src.getPageIndices())).forEach((p) => final.addPage(p));
  }
  final.setTitle(d.titulo);
  writeFileSync(join(raiz, d.pasta, `${d.nome}.pdf`), await final.save());
  await page.close();

  // DOCX editável: sem a capa e com o rótulo das caixas escrito como texto.
  const mdDocx = corpoMd.replace(/^:::\s*\{?\.?([a-z]+)[^\n]*$/gm, (l, c) => rotulos[c] ? `${l}\n\n**${rotulos[c]}**\n` : l)
    .replace(/<div class="modulo">[\s\S]*?<\/div>\s*<\/div>/g, "");
  writeFileSync(join(tmp, `${d.id}.md`), mdDocx);
  execFileSync("pandoc", ["-f", "markdown+fenced_divs+pipe_tables+raw_html+hard_line_breaks-implicit_header_references", "-o", join(raiz, d.pasta, `${d.nome}-editavel.docx`),
    "--metadata", `title=${d.titulo}`, join(tmp, `${d.id}.md`)]);
  console.log(`ok ${d.id}: ${final.getPageCount()} páginas`);
}
await browser.close();
