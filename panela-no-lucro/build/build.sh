#!/bin/sh
# Gera todos os arquivos de entrega. Rode a partir da pasta panela-no-lucro: sh build/build.sh
set -e
export NODE_PATH=$(npm root -g)
python3 build/gerar_planilha.py
for n in guia fichas-para-imprimir; do
  pandoc produto/$n.md -s --embed-resources --css build/estilo.css -o build/$n.html
done
node build/pdf.js build/guia.html "entrega/Panela-no-Lucro-Guia.pdf"
node build/pdf.js build/fichas-para-imprimir.html "entrega/Fichas-para-imprimir.pdf"
# Mensagens: recorta a Parte 3 do guia
awk '/^## Parte 3/{f=1} /^## Parte 4/{f=0} f' produto/guia.md | sed '/^:::/d' > build/mensagens.md
pandoc build/mensagens.md -o "entrega/Mensagens-WhatsApp.docx" --metadata title="Panela no Lucro · 24 mensagens de WhatsApp"
cp produto/Planilha-Panela-no-Lucro.xlsx entrega/
cp build/guia.html "entrega/Panela-no-Lucro-Guia (versao celular).html"
