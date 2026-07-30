# Central de Produção House190

Sistema web responsivo para organizar a produção da central, gerar etiquetas de validade, controlar lotes, clientes, estoque, perdas e rastreabilidade.

## Módulos incluídos nesta base

- Painel operacional do dia
- Ordens de produção e acompanhamento de status
- Cadastro de produtos e validade padrão
- Gerador de etiqueta 60 × 40 mm com impressão
- Clientes e unidades atendidas
- Estoque por lote com lógica PVPS
- Registro de perdas
- API de saúde e API inicial para cálculo de etiqueta
- Modelo PostgreSQL completo com auditoria
- Layout responsivo e instalável como aplicativo web

## Tecnologias

- Next.js com App Router
- React e TypeScript
- CSS responsivo sem biblioteca visual externa
- PostgreSQL
- Prisma ORM
- Docker Compose para banco local

## Como executar

1. Copie as variáveis de ambiente:

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

4. Gere o cliente do banco e aplique a primeira migração:

```bash
npm run db:generate
npm run db:migrate -- --name initial
npm run db:seed
```

5. Inicie o sistema:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Impressão de etiquetas

A tela **Etiquetas** possui um modelo 60 × 40 mm. Ao clicar em imprimir, o CSS de impressão remove o restante da interface e envia somente a etiqueta para o navegador. Para impressoras térmicas, configure o papel como 60 × 40 mm e margens como zero.

## Estrutura principal

```text
src/app/                 páginas e APIs
src/components/          componentes da interface
src/lib/                 dados demonstrativos e acesso ao banco
prisma/schema.prisma     modelo relacional
prisma/seed.ts           dados iniciais
docs/                    arquitetura, escopo e próximos passos
```

## Estado atual

A interface usa dados demonstrativos para permitir validação visual imediata. O banco e as APIs já possuem a estrutura necessária para substituir os dados demonstrativos por consultas reais na próxima etapa.

## Segurança

Antes de colocar em produção, implemente autenticação, políticas de permissão, hash de senha, backup automático, armazenamento protegido de imagens e HTTPS. O modelo de dados já prevê funções de usuário e auditoria.
