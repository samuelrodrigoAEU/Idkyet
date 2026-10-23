# Controle de qualidade

Revisão feita em 23/10/2026 sobre os arquivos gerados. Itens corrigidos durante a revisão estão marcados.

## Produto
| Pergunta | Resultado |
|---|---|
| Um iniciante consegue executar? | Sim: cada módulo tem passo a passo, modelo, exercício e critério "pronto quando"; o plano de 7 dias diz o que fazer em cada dia |
| Ordem lógica? | Base → P → A → S → S → O; a planilha segue a mesma ordem das abas |
| Exemplos em mais de um modelo de negócio? | Serviço digital, produto físico, produto digital e revenda, todos marcados como simulação |
| O método ensina o que a promessa anuncia? | Sim: escolher, ofertar, encontrar interessados, conduzir até o pagamento, medir |
| Os bumps acrescentam valor? | Sim, cada um amplia uma etapa diferente (conversa, conteúdo, medição) e funciona sozinho. O Painel é o de menor valor adicional; alternativa registrada no funil, seção 9.2 |

## Design
| Verificação | Resultado |
|---|---|
| PDFs renderizados e inspecionados por página | Sem elementos cortados; capas sangradas |
| Corrigido: linhas de modelos que se juntavam num único parágrafo | Ativada a quebra de linha literal no build |
| Corrigido: palavras entre colchetes viravam links internos ("[serviço]") | Desativadas as referências implícitas a títulos |
| Corrigido: caixas longas empurravam conteúdo e deixavam páginas vazias | Exemplos e modelos agora podem quebrar entre páginas |
| Carrosséis | O script acusa texto que passe da área segura; nenhum acusou. Texto mínimo de 36 px em 1080 de largura |
| Página de vendas | Testada em 390 px de largura, sem rolagem horizontal |

## Planilhas
| Verificação | Resultado |
|---|---|
| Recalculadas no LibreOffice | 0 erros de fórmula nas duas planilhas |
| Exemplo com dados fictícios | Funil, canais, dinheiro e diagnóstico preenchidos corretamente |
| Corrigido: custo direto de venda reembolsada sumia do resultado | Agora entra no custo |

## Marketing e integridade
| Verificação | Resultado |
|---|---|
| Promessas de renda, prazo ou venda garantida | Nenhuma; a ausência de garantia é dita no guia, na página, nos carrosséis C11 e C12 e no checkout |
| Depoimentos, prints ou números de alunos | Nenhum |
| Preço nos carrosséis | Nenhum preço do produto ou dos bumps (os valores que aparecem são de exemplos fictícios de outros negócios) |
| Urgência ou escassez | Nenhuma |
| Fontes citadas | Na pesquisa e no funil, com links; dados não confirmados oficialmente estão marcados como hipótese |
| Direitos de uso | Fontes com licença OFL; nenhuma imagem de terceiros ou gerada por IA |
