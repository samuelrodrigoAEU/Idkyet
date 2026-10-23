"""Simulação financeira do Cliente Ciente.

Tudo aqui é hipótese, não previsão. Troque os valores de TAXAS e CENARIOS
pelos números reais assim que a conta na plataforma estiver aberta.

Uso: python3 simulacao.py > simulacao.md
"""

# Hipótese de taxa: Kiwify 8,99% + R$ 2,49 por venda aprovada, valor citado em
# blogs (tactus.com.br, viniensina.com.br) e NÃO confirmado em página oficial.
TAXA_PERCENTUAL = 0.0899
TAXA_FIXA = 2.49

# Hipótese de imposto: empresa no Simples Nacional, alíquota efetiva de 6%.
# Pessoa física (carnê-leão) ou outro enquadramento muda esse número.
IMPOSTO = 0.06

PRECO_PRINCIPAL = 27.00
PRECO_BUMP = 12.90    # Pack de stories "Regras da Agenda" (Canva)
PRECO_UPSELL = 37.00  # Planilha Agenda & Caixa (compra separada, 1 clique)

CENARIOS = {
    # nome: (adesão ao bump, adesão ao upsell, taxa de reembolso)
    "Conservador": (0.15, 0.03, 0.12),
    "Intermediário": (0.25, 0.06, 0.08),
    "Otimista": (0.35, 0.10, 0.05),
}


def liquido(bruto, transacoes):
    """Receita depois de taxa da plataforma e imposto."""
    taxa = bruto * TAXA_PERCENTUAL + TAXA_FIXA * transacoes
    imposto = bruto * IMPOSTO
    return bruto - taxa - imposto, taxa, imposto


def brl(v):
    s = f"{abs(v):,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{'−' if v < 0 else ''}R$ {s}"


def pct(v, casas=1):
    return f"{v * 100:.{casas}f}%".replace(".", ",")


def linha(*cols):
    print("| " + " | ".join(cols) + " |")


print("# Simulação financeira — Cliente Ciente\n")
print("Gerado por `simulacao.py`. Todos os números são hipóteses explícitas, não previsões.\n")
print(f"- Preço principal: {brl(PRECO_PRINCIPAL)}; order bump: {brl(PRECO_BUMP)}; upsell: {brl(PRECO_UPSELL)}")
print(f"- Taxa da plataforma (hipótese a confirmar): {pct(TAXA_PERCENTUAL, 2)} + {brl(TAXA_FIXA)} por transação aprovada")
print(f"- Imposto (hipótese): {pct(IMPOSTO)} sobre a receita bruta")
print("- O bump entra na mesma transação do produto principal (uma taxa fixa); o upsell é outra transação (outra taxa fixa).")
print("- Reembolso: considera-se que a venda principal reembolsada devolve todo o valor e a taxa da plataforma não volta (premissa conservadora). Reembolsos do upsell não foram modelados.\n")

print("## 1. Uma venda só do produto principal\n")
liq, taxa, imp = liquido(PRECO_PRINCIPAL, 1)
linha("Item", "Valor")
linha("---", "---:")
linha("Receita bruta", brl(PRECO_PRINCIPAL))
linha("Taxa da plataforma", "−" + brl(taxa))
linha("Imposto", "−" + brl(imp))
linha("**Receita líquida antes da publicidade**", f"**{brl(liq)}**")
linha("CPA de equilíbrio (sem bump, upsell nem reembolso)", brl(liq))
print()

print("## 2. Cenários com bump, upsell e reembolso (por comprador)\n")
linha("Indicador", *CENARIOS.keys())
linha("---", *["---:"] * len(CENARIOS))
resultados = {}
for nome, (bump, upsell, reembolso) in CENARIOS.items():
    bruto_principal = PRECO_PRINCIPAL + bump * PRECO_BUMP
    liq_principal, taxa_p, imp_p = liquido(bruto_principal, 1)
    bruto_upsell = upsell * PRECO_UPSELL
    liq_upsell, taxa_u, imp_u = liquido(PRECO_UPSELL, 1)
    liq_upsell *= upsell
    taxa_u *= upsell
    imp_u *= upsell
    bruto = bruto_principal + bruto_upsell
    # Reembolso: perde a receita bruta da venda principal; a taxa já paga não volta.
    perda_reembolso = reembolso * (bruto_principal - imp_p)
    contrib = liq_principal + liq_upsell - perda_reembolso
    be = contrib
    alvo = contrib * 0.6  # deixa 40% da contribuição como margem antes de custos fixos
    resultados[nome] = dict(
        bruto=bruto, taxa=taxa_p + taxa_u, imp=imp_p + imp_u, reemb=perda_reembolso,
        contrib=contrib, be=be, alvo=alvo, roas_be=bruto / be,
        roas_alvo=bruto / alvo,
    )

def row(label, key, fmt=brl, neg=False):
    vals = [("−" if neg else "") + fmt(r[key]) for r in resultados.values()]
    linha(label, *vals)

linha("Adesão ao bump / upsell / reembolso", *[f"{pct(b)} / {pct(u)} / {pct(r)}" for b, u, r in CENARIOS.values()])
row("Receita bruta média por comprador", "bruto")
row("Taxas da plataforma", "taxa", neg=True)
row("Impostos", "imp", neg=True)
row("Perda média com reembolsos", "reemb", neg=True)
row("**Margem de contribuição antes da publicidade**", "contrib")
row("**CPA de equilíbrio**", "be")
row("CPA-alvo (60% do equilíbrio)", "alvo")
linha("ROAS de equilíbrio", *[f"{r['roas_be']:.2f}".replace(".", ",") for r in resultados.values()])
linha("ROAS-alvo", *[f"{r['roas_alvo']:.2f}".replace(".", ",") for r in resultados.values()])
print()

print("## 3. Quanto sobra por venda com diferentes CPAs (cenário intermediário)\n")
r = resultados["Intermediário"]
linha("CPA pago", "Sobra por comprador", "Leitura")
linha("---:", "---:", "---")
for cpa in (10, 15, 18, 22, 25, 30):
    sobra = r["contrib"] - cpa
    leitura = "lucro" if sobra > 3 else ("empate técnico" if sobra > -1 else "prejuízo")
    linha(brl(cpa), brl(sobra), leitura)
print()

print("## 4. O que R$ 100 compram (faixas de hipótese, não previsão)\n")
print("CPM, CTR e conversão variam muito por nicho, época e criativo. As faixas abaixo servem para dimensionar o teste.\n")
linha("Hipótese", "CPM", "CTR de saída", "Cliques de saída", "Visualizações da página (75%)", "Conversão da página", "Compras esperadas")
linha("---", "---:", "---:", "---:", "---:", "---:", "---:")
for nome, cpm, ctr, conv in (("Ruim", 40, 0.006, 0.01), ("Média", 25, 0.010, 0.025), ("Boa", 15, 0.015, 0.04)):
    imp = 100 / cpm * 1000
    cliques = imp * ctr
    lpv = cliques * 0.75
    compras = lpv * conv
    linha(nome, brl(cpm), pct(ctr), f"{cliques:.0f}", f"{lpv:.0f}", pct(conv), f"{compras:.1f}".replace(".", ","))
print()
print("Conclusão: com R$ 100, o número esperado de vendas fica entre zero e três. Esse orçamento mede atenção e intenção")
print("(CTR, custo por visualização da página, inícios de checkout); não prova lucratividade.")
