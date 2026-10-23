# Identidade visual

Uma única identidade para o guia, os complementos, a página de vendas e os carrosséis. Objetivo: clareza, competência e praticidade, longe da estética de "dinheiro fácil" (sem verde de cédula, dourado, setas para cima ou fotos de ostentação).

## Paleta

| Nome | HEX | Uso |
|---|---|---|
| Tinta | `#161A22` | Texto, capas, fundos escuros, cabeçalho de tabelas |
| Papel | `#F5F2EB` | Fundo claro, capas dos complementos |
| Sinal | `#E8552A` | Destaque único: palavra-chave do título, números, rótulos, botões, caixa "Erro comum" |
| Azul | `#2D4FD6` | Caixa "Exercício", links, bolha de resposta nos carrosséis (`#DDE5FF`) |
| Verde | `#2E7D5B` | Caixa "Pronto quando" |
| Areia | `#ECE6DA` | Caixa "Exemplo (simulação)", fundos de apoio |
| Cinza | `#5E6370` | Texto secundário |
| Linha | `#D8D1C2` | Fios, bordas e divisórias |

Regra: o laranja aparece no máximo em um elemento de destaque por bloco.

## Tipografia

| Família | Papel | Pesos |
|---|---|---|
| Bricolage Grotesque | Títulos, ganchos, números grandes | 600 a 800 |
| Inter | Texto corrido, tabelas, botões | 400 a 700 |
| IBM Plex Mono | Rótulos, contadores, fórmulas, rodapés | 400 e 600 |

Todas com licença SIL Open Font License, arquivos em `fontes/` (via Fontsource).

**Hierarquia nos documentos (A5):** H1 22 pt · H2 13,5 pt · H3 10,8 pt · rótulo mono 7,6 pt em caixa alta laranja · texto 9,4 pt com entrelinha 1,52 · tabelas 8 pt.

## Elementos

- **Abertura de módulo:** rótulo mono "Módulo X · letra" + trilha P-A-S-S-O com a etapa atual preenchida. É o principal elemento de navegação.
- **Caixas didáticas:** Passo a passo (papel), Exemplo · simulação (areia), Modelo para copiar (tracejado), Erro comum (borda laranja), Exercício (borda azul), Pronto quando (borda verde), Importante (contorno). O rótulo de cada caixa é gerado pelo estilo, então todas ficam iguais.
- **Tabelas:** cabeçalho em tinta com texto claro, linhas zebradas suaves, sem bordas verticais.
- **Ilustrações:** nenhuma imagem gerada nem foto de banco. Os elementos visuais são tipográficos e geométricos (trilha de círculos, bolhas de conversa, caixas de comparação, fórmulas em bloco escuro).
- **Capas:** produto principal em tinta com título em duas cores e a trilha PASSO; complementos em papel com contorno, mesmo grid.

## Carrosséis (1080 × 1920)

- Zona segura: 170 px no topo, 400 px na base, 150 px à direita; margem esquerda de 96 px.
- Topo: nome da série (mono, laranja) e contador "01 / 07". Rodapé: nome do produto e seta.
- Tipos de slide reutilizáveis: capa, texto, número grande, lista, comparação, conversa, fórmula, tabela, trilha PASSO.
- Ritmo: capa escura → miolo claro → slide de virada escuro → fechamento laranja com chamada.
- Ganchos 112 px; títulos 76 px; texto 36 a 42 px; rótulos 24 a 28 px.

## Arquivos

- `documento.css`: estilo dos PDFs e do HTML de leitura.
- `carrossel.css`: sistema dos carrosséis.
- `fontes/`: fontes usadas pelos dois.
