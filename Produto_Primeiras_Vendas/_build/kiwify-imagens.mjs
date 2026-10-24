// Gera as imagens dos produtos para a Kiwify: 300×250 e versão @2x (600×500).
// Uso (dentro de _build/): node kiwify-imagens.mjs
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontes = pathToFileURL(join(raiz, "Identidade_Visual", "fontes")).href;
const saida = join(raiz, "Kiwify", "imagens");
mkdirSync(saida, { recursive: true });

// Elemento visual de cada produto, desenhado em CSS (nada de imagem de banco ou gerada).
const visuais = {
  passo: `<div class="passo">${"PASSO".split("").map((l, i) => `<span class="${i === 0 ? "on" : ""}">${l}</span>`).join("")}</div>`,
  conversa: `<div class="chat"><i class="ela">Quanto custa?</i><i class="voce">Me conta rapidinho: …</i></div>`,
  conteudo: `<div class="grade">${Array.from({ length: 8 }, (_, i) => `<b class="${i === 2 || i === 5 ? "on" : ""}"></b>`).join("")}</div>`,
  painel: `<div class="barras">${[100, 62, 38, 22, 10].map((w, i) => `<b style="width:${w}%" class="${i === 4 ? "on" : ""}"></b>`).join("")}</div>`,
};

const produtos = [
  { arq: "01-primeiras-vendas-na-pratica", tema: "escuro", rotulo: "Guia + planilha", titulo: "Primeiras Vendas <em>na Prática</em>", sub: "Método PASSO para as primeiras vendas pela internet", visual: "passo" },
  { arq: "02-kit-de-conversas-que-vendem", tema: "claro", rotulo: "Complemento · Conversas", titulo: "Kit de Conversas <em>que Vendem</em>", sub: "62 mensagens para cada momento da venda", visual: "conversa" },
  { arq: "03-fabrica-de-conteudo-organico", tema: "claro", rotulo: "Complemento · Conteúdo", titulo: "Fábrica de Conteúdo <em>Orgânico</em>", sub: "10 estruturas, 60 pautas e 50 ganchos", visual: "conteudo" },
  { arq: "04-painel-das-primeiras-vendas", tema: "claro", rotulo: "Complemento · Planilha", titulo: "Painel das <em>Primeiras Vendas</em>", sub: "Suas taxas e o que trava, sem fazer contas", visual: "painel" },
];

const css = `
@font-face { font-family: B; font-weight: 800; src: url(${fontes}/bricolage-grotesque-latin-800-normal.woff2); }
@font-face { font-family: I; font-weight: 500; src: url(${fontes}/inter-latin-500-normal.woff2); }
@font-face { font-family: M; font-weight: 600; src: url(${fontes}/ibm-plex-mono-latin-600-normal.woff2); }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 300px; height: 250px; overflow: hidden; }
.c { width: 300px; height: 250px; padding: 20px 20px 18px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.escuro { background: #161A22; color: #F5F2EB; }
.claro { background: #F5F2EB; color: #161A22; box-shadow: inset 0 0 0 2px #161A22; }
.rot { font-family: M; font-weight: 600; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #E8552A; }
.t { font-family: B; font-weight: 800; font-size: 31px; line-height: .98; letter-spacing: -0.02em; margin-top: 12px; }
.t em { font-style: normal; color: #E8552A; }
.s { font-family: I; font-weight: 500; font-size: 12.5px; line-height: 1.3; margin-top: 12px; opacity: .85; }
.v { margin-top: auto; }
.passo { display: flex; gap: 4px; }
.passo span { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #F5F2EB; display: grid; place-items: center; font-family: B; font-weight: 800; font-size: 11px; }
.passo span.on { background: #E8552A; border-color: #E8552A; color: #161A22; }
.chat { display: flex; gap: 6px; align-items: flex-start; }
.chat i { font-style: normal; font-family: I; font-weight: 500; font-size: 8px; padding: 5px 7px; border-radius: 9px; white-space: nowrap; }
.chat .ela { background: #fff; border: 1px solid #D8D1C2; border-top-left-radius: 2px; }
.chat .voce { background: #DDE5FF; border-top-right-radius: 2px; margin-top: 12px; }
.grade { display: grid; grid-template-columns: repeat(8, 16px); gap: 4px; }
.grade b { height: 22px; border-radius: 3px; background: #161A22; opacity: .85; }
.grade b.on { background: #E8552A; opacity: 1; }
.barras { display: flex; flex-direction: column; gap: 3px; width: 150px; }
.barras b { height: 6px !important; }
.barras b { height: 8px; border-radius: 2px; background: #161A22; }
.barras b.on { background: #E8552A; }
`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const escala of [1, 2]) {
  const page = await browser.newPage({ viewport: { width: 300, height: 250 }, deviceScaleFactor: escala });
  for (const p of produtos) {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="c ${p.tema}"><div class="rot">${p.rotulo}</div><div class="t">${p.titulo}</div><div class="v">${visuais[p.visual]}</div><div class="s">${p.sub}</div></div></body></html>`;
    const tmp = join(saida, "_tmp.html");
    writeFileSync(tmp, html);
    await page.goto(pathToFileURL(tmp).href);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(saida, `${p.arq}${escala === 2 ? "@2x" : ""}.png`) });
  }
  await page.close();
}
await browser.close();
const { rmSync } = await import("node:fs");
rmSync(join(saida, "_tmp.html"));
console.log("ok");
