// Renderiza os criativos HTML em PNG nos três formatos.
// Uso: node render.mjs            (todos)
//      node render.mjs 01 04      (só os números indicados)
import { chromium } from "playwright";
import { readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = dirname(fileURLToPath(import.meta.url));
const formatos = [
  { classe: "s45", h: 1350, pasta: "4x5-1080x1350" },
  { classe: "s11", h: 1080, pasta: "1x1-1080x1080" },
  { classe: "s916", h: 1920, pasta: "9x16-1080x1920" },
];
const filtro = process.argv.slice(2);
const arquivos = readdirSync(join(raiz, "src"))
  .filter((f) => /^\d\d-.*\.html$/.test(f))
  .filter((f) => !filtro.length || filtro.some((n) => f.startsWith(n)));

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const { classe, h, pasta } of formatos) {
  const page = await browser.newPage({ viewport: { width: 1080, height: h } });
  mkdirSync(join(raiz, "png", pasta), { recursive: true });
  for (const f of arquivos) {
    await page.goto(pathToFileURL(join(raiz, "src", f)).href);
    await page.evaluate(([c, altura]) => {
      document.body.classList.add(c);
      document.documentElement.style.setProperty("--h", altura + "px");
    }, [classe, h]);
    await page.evaluate(() => document.fonts.ready);
    // Avisa se algum bloco passou da borda do quadro
    const estouro = await page.evaluate(() => {
      const fr = document.querySelector(".frame");
      return fr.scrollHeight > fr.clientHeight + 1 ? fr.scrollHeight - fr.clientHeight : 0;
    });
    if (estouro) console.warn(`ESTOURO ${pasta}/${f}: ${estouro}px`);
    await page.screenshot({ path: join(raiz, "png", pasta, f.replace(".html", ".png")) });
  }
  await page.close();
}
await browser.close();
console.log(`${arquivos.length} criativo(s) x ${formatos.length} formatos renderizados.`);
