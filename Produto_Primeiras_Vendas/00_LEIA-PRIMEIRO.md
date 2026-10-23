# Primeiras Vendas na Prática: índice dos entregáveis

Produto digital de entrada para quem quer fazer as primeiras vendas pela internet, com três complementos (order bumps), 12 carrosséis para TikTok e o funil orgânico. Método: **PASSO** (Problema, Arrumar a oferta, Sinais de interesse, Seguir a conversa, Observar e ajustar).

## O que vai para o comprador

| Produto | Arquivos de entrega |
|---|---|
| **Primeiras Vendas na Prática** (principal) | `Produto_Principal/Primeiras-Vendas-na-Pratica.pdf` (53 p., A5) · `Primeiras-Vendas-na-Pratica-editavel.docx` · `Ferramentas-Primeiras-Vendas.xlsx` |
| **Kit de Conversas que Vendem** (bump 1) | `Order_Bump_01_Scripts/Kit-de-Conversas-que-Vendem.pdf` (18 p.) · `…-editavel.docx` |
| **Fábrica de Conteúdo Orgânico** (bump 2) | `Order_Bump_02_Conteudo/Fabrica-de-Conteudo-Organico.pdf` (19 p.) · `…-editavel.docx` |
| **Painel das Primeiras Vendas** (bump 3) | `Order_Bump_03_Painel/Painel-das-Primeiras-Vendas.xlsx` · `Painel-EXEMPLO-dados-ficticios.xlsx` · `Painel-das-Primeiras-Vendas-Manual.pdf` (8 p.) · `…-Manual-editavel.docx` |

## Para você (operação)

| Pasta | Conteúdo |
|---|---|
| `Carrosseis_TikTok/png/` | 12 carrosséis, 82 imagens PNG 1080 × 1920, uma pasta por carrossel |
| `Carrosseis_TikTok/Roteiros-dos-Carrosseis.md` | Objetivo, texto e composição de cada slide, legenda, CTA, comentário fixado e justificativa |
| `Funil_e_Pagina_de_Vendas/Funil-Organico-e-Precos.md` | Posicionamento, bio, estratégia de conteúdo, fixados, CTAs, sequência de mensagens, textos do checkout, hipóteses de preço e plano de testes |
| `Funil_e_Pagina_de_Vendas/pagina-de-vendas.html` | Página de vendas completa (texto e layout), feita para celular |
| `Identidade_Visual/` | Guia de identidade (`Identidade-Visual.md`), estilos (`documento.css`, `carrossel.css`) e fontes |
| `Documentacao/` | Pesquisa e posicionamento, checklist de publicação, controle de qualidade, progresso e pendências |

## Arquivos-fonte e como regenerar

| Item | Fonte | Comando (de dentro de `_build/`, depois de `npm install`) |
|---|---|---|
| PDFs e DOCX | `*/fonte/*.md` | `node build-docs.mjs` (ou `node build-docs.mjs principal`) |
| Planilhas | `_build/gerar_planilhas.py` | `python3 gerar_planilhas.py` |
| Carrosséis e roteiro | `Carrosseis_TikTok/fonte/dados.mjs` | `cd ../Carrosseis_TikTok/fonte && node render.mjs` |

Requisitos: Node 18+, Python 3 com openpyxl, pandoc e Chromium (o caminho está nos scripts; ajuste se for outro).

## Ordem sugerida para publicar

1. Ler `Documentacao/Checklist-de-Publicacao.md` e resolver as pendências.
2. Criar o produto e os 3 bumps na plataforma de pagamento, com os textos do checkout.
3. Publicar a página de vendas com o link do checkout e o preço.
4. Ajustar a bio e começar a sequência de carrosséis da seção 3 do funil.
