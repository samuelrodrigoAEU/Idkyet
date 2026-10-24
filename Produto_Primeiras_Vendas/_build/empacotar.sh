#!/usr/bin/env bash
# Gera a página de vendas em arquivo único e os pacotes ZIP em Downloads/.
# Uso: bash _build/empacotar.sh   (a partir da pasta Produto_Primeiras_Vendas)
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY'
import base64, re
from pathlib import Path
src = Path("Funil_e_Pagina_de_Vendas/pagina-de-vendas.html")
html = src.read_text()
def embutir(m):
    arq = Path("Funil_e_Pagina_de_Vendas") / m.group(1)
    return "url(data:font/woff2;base64," + base64.b64encode(arq.read_bytes()).decode() + ")"
html = re.sub(r"url\((\.\./Identidade_Visual/fontes/[^)]+\.woff2)\)", embutir, html)
Path("Funil_e_Pagina_de_Vendas/pagina-de-vendas-arquivo-unico.html").write_text(html)
PY
rm -rf Downloads && mkdir -p Downloads
z() { local nome=$1; shift; zip -q -j "Downloads/$nome" "$@"; }
z Entrega-Primeiras-Vendas-na-Pratica.zip Produto_Principal/*.pdf Produto_Principal/*.docx Produto_Principal/*.xlsx
z Entrega-Kit-de-Conversas-que-Vendem.zip Order_Bump_01_Scripts/*.pdf Order_Bump_01_Scripts/*.docx
z Entrega-Fabrica-de-Conteudo-Organico.zip Order_Bump_02_Conteudo/*.pdf Order_Bump_02_Conteudo/*.docx
z Entrega-Painel-das-Primeiras-Vendas.zip Order_Bump_03_Painel/*.pdf Order_Bump_03_Painel/*.docx Order_Bump_03_Painel/*.xlsx
(cd Kiwify && zip -q -r ../Downloads/Kiwify-Textos-e-Imagens.zip Cadastro-Kiwify.md imagens)
(cd Carrosseis_TikTok && zip -q -r ../Downloads/Carrosseis-TikTok-PNG.zip png Roteiros-dos-Carrosseis.md)
(cd .. && zip -q -r Produto_Primeiras_Vendas/Downloads/Projeto-Completo.zip Produto_Primeiras_Vendas \
  -x "*/node_modules/*" "*/node_modules" "*/_build/tmp/*" "*/_build/html/*" "*/Downloads/*" "*/.tmp/*")
ls -la Downloads
