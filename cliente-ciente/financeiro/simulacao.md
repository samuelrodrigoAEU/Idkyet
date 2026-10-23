# Simulação financeira — Cliente Ciente

Gerado por `simulacao.py`. Todos os números são hipóteses explícitas, não previsões.

- Preço principal: R$ 27,00; order bump: R$ 12,90; upsell: R$ 37,00
- Taxa da plataforma (hipótese a confirmar): 8,99% + R$ 2,49 por transação aprovada
- Imposto (hipótese): 6,0% sobre a receita bruta
- O bump entra na mesma transação do produto principal (uma taxa fixa); o upsell é outra transação (outra taxa fixa).
- Reembolso: considera-se que a venda principal reembolsada devolve todo o valor e a taxa da plataforma não volta (premissa conservadora). Reembolsos do upsell não foram modelados.

## 1. Uma venda só do produto principal

| Item | Valor |
| --- | ---: |
| Receita bruta | R$ 27,00 |
| Taxa da plataforma | −R$ 4,92 |
| Imposto | −R$ 1,62 |
| **Receita líquida antes da publicidade** | **R$ 20,46** |
| CPA de equilíbrio (sem bump, upsell nem reembolso) | R$ 20,46 |

## 2. Cenários com bump, upsell e reembolso (por comprador)

| Indicador | Conservador | Intermediário | Otimista |
| --- | ---: | ---: | ---: |
| Adesão ao bump / upsell / reembolso | 15,0% / 3,0% / 12,0% | 25,0% / 6,0% / 8,0% | 35,0% / 10,0% / 5,0% |
| Receita bruta média por comprador | R$ 30,04 | R$ 32,45 | R$ 35,22 |
| Taxas da plataforma | −R$ 5,27 | −R$ 5,56 | −R$ 5,90 |
| Impostos | −R$ 1,80 | −R$ 1,95 | −R$ 2,11 |
| Perda média com reembolsos | −R$ 3,26 | −R$ 2,27 | −R$ 1,48 |
| **Margem de contribuição antes da publicidade** | R$ 19,71 | R$ 22,67 | R$ 25,72 |
| **CPA de equilíbrio** | R$ 19,71 | R$ 22,67 | R$ 25,72 |
| CPA-alvo (60% do equilíbrio) | R$ 11,83 | R$ 13,60 | R$ 15,43 |
| ROAS de equilíbrio | 1,52 | 1,43 | 1,37 |
| ROAS-alvo | 2,54 | 2,39 | 2,28 |

## 3. Quanto sobra por venda com diferentes CPAs (cenário intermediário)

| CPA pago | Sobra por comprador | Leitura |
| ---: | ---: | --- |
| R$ 10,00 | R$ 12,67 | lucro |
| R$ 15,00 | R$ 7,67 | lucro |
| R$ 18,00 | R$ 4,67 | lucro |
| R$ 22,00 | R$ 0,67 | empate técnico |
| R$ 25,00 | −R$ 2,33 | prejuízo |
| R$ 30,00 | −R$ 7,33 | prejuízo |

## 4. O que R$ 100 compram (faixas de hipótese, não previsão)

CPM, CTR e conversão variam muito por nicho, época e criativo. As faixas abaixo servem para dimensionar o teste.

| Hipótese | CPM | CTR de saída | Cliques de saída | Visualizações da página (75%) | Conversão da página | Compras esperadas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Ruim | R$ 40,00 | 0,6% | 15 | 11 | 1,0% | 0,1 |
| Média | R$ 25,00 | 1,0% | 40 | 30 | 2,5% | 0,8 |
| Boa | R$ 15,00 | 1,5% | 100 | 75 | 4,0% | 3,0 |

Conclusão: com R$ 100, o número esperado de vendas fica entre zero e três. Esse orçamento mede atenção e intenção
(CTR, custo por visualização da página, inícios de checkout); não prova lucratividade.
