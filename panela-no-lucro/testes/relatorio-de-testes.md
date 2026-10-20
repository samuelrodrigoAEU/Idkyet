# Testes de qualidade (20/10/2026)

## 1. Planilha: verificação automática
Método: gerar o .xlsx → recalcular no LibreOffice headless → reler os valores com openpyxl.
- **0 erros** (#VALUE!, #REF!, #N/A, "ITEM NÃO CADASTRADO") nas 8 abas, depois das correções.
- Cálculos conferidos à mão:
  - Marmita: ingredientes de R$ 47,70 (9 itens somados à mão) ÷ 10 = R$ 4,77; gás de 90 min × R$ 2,0833/h ÷ 10 = R$ 0,31; + embalagem de R$ 1,20 = material de R$ 6,28 ✓. Hora: 120 min × R$ 15 ÷ 10 = R$ 3,00 ✓. Mínimo = 9,28 ÷ (1 − 0,01 − 0,0673) = 10,06 → R$ 10,10 ✓. Sugerido = 9,28 ÷ 0,7227 = 12,84 → R$ 13,00 ✓. App = 9,28 ÷ 0,4627 = 20,06 → R$ 20,50 ✓.
  - Entrega de 6 km de moto: 12 km × R$ 0,327 + 35 min × R$ 15/h = R$ 12,68 → taxa de R$ 13 ✓.
  - Painel de outubro: 2.295 − 45,97 − 1.020,23 − 93,00 − 202 = R$ 933,81 ✓; ÷ 52 h = R$ 17,96 ✓.
  - Lista de compras: frango = (1.500 g × 3 receitas de marmita) + (1.000 g × 3 de coxinha) = 7.500 g → 8 pacotes ✓.

## 2. Defeitos encontrados e corrigidos
| # | Defeito | Correção |
|---|---|---|
| 1 | Rótulos do painel começando com "=" eram lidos como fórmula (#VALUE!) | Trocado o "=" por "→" |
| 2 | A taxa do app dava R$ 0 (o rótulo da Config era diferente do da lista de pagamento) | Rótulos unificados para "App de delivery" |
| 3 | O guia dizia "10 horas" no exemplo da coxinha; a planilha mostra 16 h (4 receitas × 4 h) | Texto corrigido para 16 h, ~R$ 1/h |
| 4 | O cardápio de WhatsApp no PDF saía numa linha só | Quebras de linha forçadas nos blocos de mensagem |
| 5 | O número de página aparecia duplicado no PDF | Removido o contador do CSS |
| 6 | O título da mensagem ficava sozinho no fim da página | Regra de quebra (`break-after: avoid`) |

## 3. Simulação de uso (comprador iniciante: "Rose", vende marmita e bolo de pote)
| Passo | Resultado | Problema / ajuste |
|---|---|---|
| Abre a planilha no celular (Google Planilhas) | Funciona; é preciso rolar para os lados nas abas largas | O guia orienta o uso no celular; as colunas principais ficam congeladas |
| Dia 1 (Config) | Fica em dúvida sobre o valor da hora | O guia dá um piso (salário mínimo ÷ 220) e uma faixa comum. OK |
| Dia 2 | Digita "Leite Condensado" com C maiúsculo | Na Fichas, escolher pela lista evita o erro. A Parte 5 cobre isso. **Risco residual:** o PROCV não diferencia maiúsculas, então funciona mesmo assim |
| Dia 3 | Não tem balança | Tabela de medidas caseiras + recomendação de pesar uma vez |
| Dia 4 | Bolo de pote "Atenção" | As 6 alavancas e a mensagem 1. OK |
| Dia 6 | Quer apagar o exemplo | A instrução "apague só as células amarelas" está na aba Comece Aqui |
| Dia 7 | Não mediu as horas | O guia sugere estimar por semana × 4 |

**Limitações conhecidas (documentadas, não corrigidas):** o custo de entrega própria inclui o valor do seu tempo, o que deixa o painel conservador. Os custos fixos entram no preço como % do faturamento esperado, uma aproximação. A planilha suporta 200 ingredientes, 600 linhas de ficha, 50 produtos, 40 bairros e 500 pedidos: para mais pedidos, basta copiar a última linha da aba Pedidos.

## 4. Revisão de comprador exigente
- **Resolve o problema escolhido (controle de custos e preço)?** Sim: custo, preço, entrega e painel estão ligados entre si.
- **É genérico?** Não: o exemplo é completo, os números são calculados, há 24 mensagens específicas, um sistema de encomenda e a lista de compras automática.
- **Contradições:** o guia e a planilha foram conferidos com os mesmos números (seção 1).
- **Informação que pode ficar desatualizada:** preços de ingredientes, DAS do MEI, taxas de maquininha e de app e regras de plataforma. Estão todos marcados como "exemplo, confira".
- **A oferta corresponde ao entregue?** A descrição comercial lista exatamente os 4 arquivos de `entrega/`.
- **Exige site ou app?** Não: são arquivos entregues pela própria plataforma de venda.
