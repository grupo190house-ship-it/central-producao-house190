# PRD — Central de Produção House190 (Etiquetas de Validade)

## Problem Statement (original)
Evolução do sistema de etiquetas de validade (Web App) para impressora térmica Elgin i9 (papel 80mm):
corrigir "letras falhando" na impressão térmica, redesenhar o layout da etiqueta (sem QR code),
preview visual em tempo real e impressão em lote. Sem login nesta fase; dados no navegador (localStorage).

## Architecture
- **Frontend:** React (CRA + craco), React Router, shadcn/ui, Tailwind, lucide-react, sonner.
- **Backend:** FastAPI template mínimo (não usado nesta fase).
- **Dados:** localStorage (produtos, destinos, responsáveis, histórico). MongoDB fica para fase futura.
- **Impressão:** `@media print` isolado + portal `#print-root` (createPortal em `document.body`); `@page { size: 80mm Xmm; margin:0 }` injetado dinâmico; uma etiqueta por página (`.label-page` com page-break).
- **Fonte térmica:** Barlow (700–900) para a etiqueta, IBM Plex Mono para o LOTE, IBM Plex Sans na UI. Preto pleno (#000) sobre branco, bordas 2px, sem anti-aliasing no print.

## Users
- 2 operadores/lojas (House190 Teixeira, Eunápolis, Food Park). Sem níveis de acesso.

## Core Requirements (static)
1. Correção do bug das letras (fonte encorpada, contraste, CSS print controlado).
2. Layout da etiqueta redesenhado SEM QR: topo (HOUSE190/Central + Peso), nome do produto em destaque, PRODUÇÃO/VALIDADE lado a lado (VALIDADE invertida), LOTE/CONSERVAÇÃO/DESTINO/RESPONSÁVEL, faixa ALÉRGICOS.
3. Preview visual fiel ao papel, em tempo real.
4. Impressão em lote (quantidade + fila com itens diferentes; uma etiqueta por página).

## Implemented (2026-06)
- Página **Gerar**: formulário + preview lado a lado; seleção de produto autopreenche campos; LOTE (L+AAMMDD) e VALIDADE (produção + dias) automáticos.
- Seletor de tamanho 80×40 / 80×50 / 80×60 com preview fiel (variante compacta `thermal-label--h40`).
- **Imprimir etiqueta** (× quantidade) e **Imprimir lote** (fila de itens variados, soma das quantidades).
- **Histórico** de impressões (localStorage) com limpar.
- **Cadastros**: CRUD de produtos, destinos e responsáveis (localStorage) com seeds de exemplo.
- Testado (testing_agent, iteração 2): 100% dos fluxos; sem clipping nos 3 tamanhos.

## Backlog (P0/P1/P2)
- **P0 (validação real):** teste de impressão física na Elgin i9 nos 3 tamanhos (traço/legibilidade).
- **P1:** logo House190 na etiqueta (opcional, aguardando arquivo do usuário); importar lista real de produtos/destinos do usuário.
- **P2:** banco compartilhado (MongoDB) entre lojas; login/níveis de acesso; sincronização de histórico.

## Next Tasks
- Substituir seeds pelos produtos/destinos reais quando o usuário enviar.
- Ajustes finos de fonte/espaçamento após teste de impressão real.
