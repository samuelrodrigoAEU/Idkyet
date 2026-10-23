// Renderiza os carrosséis (PNG 1080×1920) e gera o roteiro em Markdown a partir de dados.mjs.
// Uso: node render.mjs          (todos)
//      node render.mjs C03 C07  (só alguns)
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { carrosseis } from "./dados.mjs";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(aqui, "..");
const css = pathToFileURL(resolve(aqui, "../../Identidade_Visual/carrossel.css")).href;
const tmp = join(aqui, ".tmp");
mkdirSync(tmp, { recursive: true });

const lista = (itens, tipo = "num") => `<ul class="lista ${tipo === "check" ? "check" : ""}">${itens
  .map((t, i) => `<li><span class="m">${tipo === "num" ? String(i + 1).padStart(2, "0") : tipo === "check" ? "" : "—"}</span><span>${t}</span></li>`).join("")}</ul>`;

const blocos = {
  capa: (s) => `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ""}<div class="gancho">${s.gancho}</div>${s.apoio ? `<div class="apoio">${s.apoio}</div>` : ""}<div class="deslize">deslize <i></i></div>`,
  texto: (s) => `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ""}<div class="titulo">${s.titulo}</div>${s.corpo ? `<div class="corpo">${s.corpo}</div>` : ""}${s.apoio ? `<div class="apoio">${s.apoio}</div>` : ""}${s.nota ? `<div class="nota">${s.nota}</div>` : ""}`,
  numero: (s) => `<div class="numero">${s.numero}</div><div class="titulo">${s.titulo}</div>${s.corpo ? `<div class="corpo">${s.corpo}</div>` : ""}`,
  lista: (s) => `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ""}<div class="titulo">${s.titulo}</div>${lista(s.itens, s.marcador)}${s.nota ? `<div class="nota">${s.nota}</div>` : ""}`,
  comparar: (s) => `<div class="titulo">${s.titulo}</div><div class="comparar"><div class="caixa ruim"><span class="r">${s.ruim[0]}</span>${s.ruim[1]}</div><div class="caixa ${s.ambosRuins ? "ruim" : "bom"}"><span class="r">${s.bom[0]}</span>${s.bom[1]}</div></div>${s.apoio ? `<div class="apoio">${s.apoio}</div>` : ""}`,
  chat: (s) => `${s.titulo ? `<div class="titulo">${s.titulo}</div>` : ""}<div class="chat">${s.msgs.map((m) => `<div class="bolha ${m.de}">${m.q ? `<span class="q">${m.q}</span>` : ""}${m.t}</div>`).join("")}</div>${s.apoio ? `<div class="apoio">${s.apoio}</div>` : ""}${s.nota ? `<div class="nota">${s.nota}</div>` : ""}`,
  formula: (s) => `<div class="titulo">${s.titulo}</div><div class="formula">${s.formula}</div>${s.apoio ? `<div class="apoio">${s.apoio}</div>` : ""}`,
  tabela: (s) => `<div class="titulo">${s.titulo}</div><table class="tabela">${s.linhas.map(([a, b], i) => `<tr class="${s.total && i === s.linhas.length - 1 ? "tot" : ""}"><td>${a}</td><td>${b}</td></tr>`).join("")}</table>${s.nota ? `<div class="nota">${s.nota}</div>` : ""}`,
  trilha: (s) => `<div class="titulo">${s.titulo}</div><div class="trilha">${"PASSO".split("").map((l, i) => `<span class="${s.ativo?.includes(i) ? "on" : ""}">${l}</span>`).join("")}</div>${s.corpo ? `<div class="corpo">${s.corpo}</div>` : ""}`,
};

const fundoPadrao = { capa: "tinta" };
const html = (c, s, i) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><link rel="stylesheet" href="${css}"></head><body>
<div class="slide bg-${s.bg || fundoPadrao[s.tipo] || "papel"}">
<div class="topo"><span class="serie">${c.serie}</span><span class="cont">${String(i + 1).padStart(2, "0")} / ${String(c.slides.length).padStart(2, "0")}</span></div>
<div class="miolo">${blocos[s.tipo](s)}</div>
<div class="rodape"><span>Primeiras Vendas na Prática</span><span>${i < c.slides.length - 1 ? "→" : ""}</span></div>
</div></body></html>`;

const semTags = (t = "") => t.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const textoDoSlide = (s) => {
  const p = [];
  if (s.kicker) p.push(`Rótulo: ${semTags(s.kicker)}`);
  if (s.gancho) p.push(`**${semTags(s.gancho)}**`);
  if (s.numero) p.push(`Número: ${s.numero}`);
  if (s.titulo) p.push(`**${semTags(s.titulo)}**`);
  if (s.corpo) p.push(semTags(s.corpo));
  if (s.itens) s.itens.forEach((t, i) => p.push(`${s.marcador === "check" ? "☐" : i + 1 + "."} ${semTags(t)}`));
  if (s.ruim) p.push(`${s.ruim[0]}: ${semTags(s.ruim[1])}`, `${s.bom[0]}: ${semTags(s.bom[1])}`);
  if (s.msgs) s.msgs.forEach((m) => p.push(`${m.de === "ela" ? "Mensagem recebida" : "Resposta"}: “${semTags(m.t)}”`));
  if (s.formula) p.push(`Fórmula: ${semTags(s.formula)}`);
  if (s.linhas) s.linhas.forEach(([a, b]) => p.push(`${semTags(a)}: ${semTags(b)}`));
  if (s.apoio) p.push(semTags(s.apoio));
  if (s.nota) p.push(`Nota: ${semTags(s.nota)}`);
  return p.join("<br>");
};
const composicao = {
  capa: "Fundo sólido; gancho grande alinhado à esquerda no centro vertical; indicador “deslize” abaixo",
  texto: "Título grande no centro vertical; texto de apoio abaixo, alinhado à esquerda",
  numero: "Número gigante em laranja como elemento principal; título e explicação abaixo",
  lista: "Título no topo do bloco; itens com marcador em fonte mono, espaçamento generoso",
  comparar: "Duas caixas empilhadas: a de cima tracejada (versão fraca), a de baixo sólida em tinta (versão melhor)",
  chat: "Bolhas de conversa simplificadas, sem logotipo de aplicativo; mensagem recebida à esquerda, resposta à direita",
  formula: "Bloco escuro com a fórmula em fonte mono; explicação abaixo",
  tabela: "Tabela de duas colunas com valores alinhados à direita em fonte mono; total em laranja",
  trilha: "Cinco círculos com as letras P-A-S-S-O, os ativos preenchidos em laranja",
};

const filtro = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
let md = `# Roteiros dos 12 carrosséis\n\nGerado por \`fonte/render.mjs\` a partir de \`fonte/dados.mjs\`. As imagens estão em \`png/\`, uma pasta por carrossel.\nFormato: 1080 × 1920 px (9:16). Nenhum carrossel mostra preço, ganho, depoimento ou prova social.\n\n`;
md += `## Direção de arte comum\n\n- **Tipografia:** Bricolage Grotesque 800 nos ganchos e títulos (76 a 112 px); Inter 400 e 700 no texto (36 a 42 px); IBM Plex Mono nos rótulos e no contador (24 a 28 px).\n- **Cores:** tinta \`#161A22\`, papel \`#F5F2EB\`, laranja-sinal \`#E8552A\`, areia \`#ECE6DA\`, azul \`#2D4FD6\` (bolhas de resposta \`#DDE5FF\`).\n- **Espaçamento:** margem esquerda de 96 px; 150 px livres à direita (ícones do TikTok); 170 px no topo; 400 px na base (legenda e botões). Todo texto fica dentro dessa área.\n- **Elementos:** contador “01 / 07” e nome da série no topo; nome do produto e seta no rodapé. Nenhum ícone decorativo, foto de banco ou imagem gerada.\n- **Ritmo:** capa escura, miolo claro, slide de virada em laranja ou escuro, fechamento com chamada.\n\n`;
for (const c of carrosseis.filter((c) => !filtro.length || filtro.includes(c.id))) {
  const pasta = join(raiz, "png", `${c.id}-${c.slug}`);
  rmSync(pasta, { recursive: true, force: true });
  mkdirSync(pasta, { recursive: true });
  for (const [i, s] of c.slides.entries()) {
    const arq = join(tmp, "slide.html");
    writeFileSync(arq, html(c, s, i));
    await page.goto(pathToFileURL(arq).href);
    await page.evaluate(() => document.fonts.ready);
    const estouro = await page.evaluate(() => {
      const m = document.querySelector(".miolo");
      return m.scrollHeight > m.clientHeight + 1 ? m.scrollHeight - m.clientHeight : 0;
    });
    if (estouro) console.warn(`ESTOURO ${c.id} slide ${i + 1}: ${estouro}px`);
    await page.screenshot({ path: join(pasta, `${c.id}-slide-${String(i + 1).padStart(2, "0")}.png`) });
  }
  md += `---\n\n## ${c.id} · ${c.titulo}\n\n**Grupo:** ${c.grupo} · **Slides:** ${c.slides.length} · **Arquivos:** \`png/${c.id}-${c.slug}/\`\n\n`;
  md += `**Objetivo estratégico:** ${c.objetivo}\n\n**Por que este ângulo:** ${c.justificativa}\n\n`;
  md += `| # | Texto do slide | Composição | Fundo |\n|---|---|---|---|\n`;
  c.slides.forEach((s, i) => { md += `| ${i + 1} | ${textoDoSlide(s)} | ${s.visual || composicao[s.tipo]} | ${s.bg || fundoPadrao[s.tipo] || "papel"} |\n`; });
  md += `\n**Legenda:**\n\n> ${c.legenda.replace(/\n/g, "\n> ")}\n\n**Chamada para ação:** ${c.cta}\n\n`;
  if (c.comentario) md += `**Comentário fixado:** ${c.comentario}\n\n`;
}
writeFileSync(join(raiz, "Roteiros-dos-Carrosseis.md"), md);
await browser.close();
rmSync(tmp, { recursive: true, force: true });
console.log("ok");
