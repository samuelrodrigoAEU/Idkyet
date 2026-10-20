# Panela no Lucro

Produto digital para quem vende comida feita em casa: planilha integrada + guia de 7 dias + 24 mensagens de WhatsApp + fichas de papel. Ajuda a descobrir o lucro real de cada pedido e a cobrar o preço certo.

## Estrutura
| Pasta | Conteúdo |
|---|---|
| `entrega/` | **O que o comprador recebe:** `Panela-no-Lucro-Guia.pdf` (18 p.), a versão HTML do guia para celular, `Planilha-Panela-no-Lucro.xlsx`, `Mensagens-WhatsApp.docx` e `Fichas-para-imprimir.pdf` |
| `produto/` | Fontes editáveis: `guia.md`, `fichas-para-imprimir.md` e a planilha gerada |
| `pesquisa/` | Evidências, matriz de oportunidades, fontes e limitações |
| `marca/` | Nome, conceito, promessa e identidade visual |
| `marketing/` | Preço, persona, títulos, ganchos, roteiros, carrosséis, posts, objeções, descrição de venda e plano de 14 dias |
| `testes/` | Relatório de testes, defeitos corrigidos e hipóteses a validar |
| `build/` | Scripts que geram os arquivos de entrega |

## Como atualizar
1. Edite `produto/guia.md` (texto) ou `build/gerar_planilha.py` (planilha).
2. Na pasta `panela-no-lucro`, rode `sh build/build.sh`. Requisitos: python3 + openpyxl, pandoc e Node com Playwright/Chromium.
3. Confira os números do guia contra a planilha, se mudar o exemplo (ver `testes/relatorio-de-testes.md`).

## Como vender e entregar
1. Crie o produto numa plataforma (Kiwify, Hotmart ou Eduzz) usando a descrição de `marketing/estrategia-comercial.md` (seção 12).
2. Compacte a pasta `entrega/` num .zip e cadastre-o como o arquivo do produto. A plataforma faz a entrega por e-mail ou na área do comprador; não é preciso site.
3. Preço recomendado: R$ 37. Siga o plano de 14 dias.

**Aviso:** os exemplos usam um negócio fictício. Não publique depoimentos ou resultados que não sejam reais e autorizados.
