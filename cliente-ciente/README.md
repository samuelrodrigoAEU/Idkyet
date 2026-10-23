# Cliente Ciente

Kit digital de fichas, termos e regras de agenda para profissionais de sobrancelha, cílios e unhas, com a pesquisa de
mercado que levou a ele e a campanha para testá-lo com R$ 100.

**Leia primeiro:** [`RELATORIO.md`](RELATORIO.md), com as 16 seções na ordem pedida (pesquisa, ranking, oferta, copy,
criativos, teste, finanças e plano de execução).

> A Biblioteca de Anúncios da Meta não pôde ser acessada no ambiente da pesquisa. Nenhum dado de anúncio foi observado
> diretamente. A seção 2.4 do relatório traz os links e o critério para fazer essa verificação antes de investir.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `RELATORIO.md` | Relatório completo |
| `criativos/png/` | 10 anúncios estáticos em 4:5 (1080×1350), 1:1 (1080×1080) e 9:16 (1080×1920) |
| `criativos/src/` | Fonte HTML/CSS de cada anúncio |
| `criativos/fonts/` | Fraunces e DM Sans (licença OFL) |
| `financeiro/` | `simulacao.py` e o resultado `simulacao.md` |
| `landing/index.html` | Landing page estática de teste |

## Como regenerar

```bash
# Criativos (usa o Chromium do sistema; ajuste o caminho em render.mjs se for outro)
cd criativos && npm install && npm run render      # todos
node render.mjs 04 09                               # só alguns

# Simulação financeira
cd financeiro && python3 simulacao.py > simulacao.md
```

## Antes de publicar qualquer anúncio

1. Verificar os anúncios dos concorrentes na Biblioteca (relatório, seção 2.4).
2. Produzir o kit e fazer a revisão técnica e a jurídica.
3. Confirmar as taxas oficiais da plataforma de pagamento e atualizar `financeiro/simulacao.py`.
4. Na landing page, trocar `#checkout`, os campos `REVISOR` e as prévias desenhadas.
