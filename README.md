# Central de Produção House190

Sistema web para controle da central de produção da House190, com foco em produção, etiquetas de validade, lotes, estoque, clientes, perdas e rastreabilidade.

## Escopo inicial

- Painel operacional do dia
- Cadastro de produtos e validade padrão
- Ordens de produção
- Geração de lote e etiquetas
- Impressão de etiquetas 60 x 40 mm
- Cadastro de clientes e unidades
- Estoque por lote e PVPS
- Alertas de vencimento
- Registro de perdas
- Rastreabilidade e auditoria

## Tecnologias

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker Compose

## Executar localmente

1. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

2. Inicie o PostgreSQL:

```bash
docker compose up -d
```

3. Instale as dependências:

```bash
npm install
```

4. Gere o Prisma Client e prepare o banco:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Inicie o sistema:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura principal

```text
src/app            Telas e rotas do sistema
src/components     Componentes reutilizáveis
src/lib            Dados iniciais e utilitários
prisma              Banco de dados, modelos e seed
docs                Arquitetura e roadmap
```

## Módulos

### Produção

Criação e acompanhamento de ordens por produto, quantidade, responsável, cliente e prazo.

### Etiquetas

Cálculo automático da validade, geração de lote e impressão no formato térmico 60 x 40 mm.

### Estoque

Controle por lote, quantidade, vencimento, localização e sistema PVPS.

### Clientes

Cadastro das unidades e clientes atendidos pela central, incluindo calendário de entrega e histórico.

### Perdas

Registro de produto, lote, quantidade, motivo, responsável e observações.

## Próximas etapas

Consulte [docs/ROADMAP.md](docs/ROADMAP.md) para as próximas fases do desenvolvimento.
