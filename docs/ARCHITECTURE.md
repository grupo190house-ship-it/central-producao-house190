# Arquitetura

## Visão geral

O sistema é uma aplicação web full-stack. A interface e as rotas HTTP ficam no Next.js. O Prisma faz o acesso tipado ao PostgreSQL.

## Domínios

### Produção

`ProductionOrder` representa o pedido da unidade. Cada ordem possui um ou mais `ProductionItem`. Ao concluir um item, são criados lotes em `Batch`.

### Etiquetas e lotes

Cada lote possui produção, validade, quantidade disponível, destino e responsável. `LabelPrint` registra impressão e reimpressão.

### Estoque

O saldo operacional fica no lote. Toda entrada, saída, transferência, ajuste, perda ou devolução gera `StockMovement`. A consulta deve ordenar por `expiresAt` para aplicar PVPS.

### Perdas

`Loss` registra produto, lote, quantidade, motivo, responsável e evidência opcional. A gravação deverá ser feita em transação junto com a movimentação de estoque.

### Auditoria

`AuditLog` permite guardar alterações importantes, especialmente mudança de validade, bloqueio de lote, ajuste de saldo, exclusão lógica e reimpressão.

## Regras recomendadas

- A validade vem da ficha do produto, mas alterações manuais exigem permissão de gerente e auditoria.
- Não permitir saldo negativo por lote.
- Lote bloqueado não pode ser enviado.
- Produto vencido não pode ser movimentado para cliente.
- Perda e ajuste de estoque devem usar transação no banco.
- Reimpressão deve registrar usuário, horário, quantidade e impressora.
