"use client";

import { useMemo, useState } from "react";
import { productionRows } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";

const filters = ["Todos", "Solicitado", "Em produção", "Separado", "Concluído"];

export function ProductionBoard() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [showForm, setShowForm] = useState(false);
  const visible = useMemo(() => activeFilter === "Todos" ? productionRows : productionRows.filter((row) => row.status === activeFilter), [activeFilter]);

  return (
    <>
      <div className="toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Filtrar ordens">
          {filters.map((filter) => <button key={filter} type="button" className={filter === activeFilter ? "filter-tab active" : "filter-tab"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm((value) => !value)}>{showForm ? "Fechar" : "+ Nova ordem"}</button>
      </div>

      {showForm ? (
        <form className="panel form-grid" onSubmit={(event) => event.preventDefault()}>
          <label>Cliente<select defaultValue=""><option value="" disabled>Selecione</option><option>House190 Teixeira</option><option>House190 Eunápolis</option><option>House Food Park</option></select></label>
          <label>Produto<select defaultValue=""><option value="" disabled>Selecione</option><option>Maionese Verde</option><option>Blend House 180 g</option><option>Bacon Crispy 40 g</option></select></label>
          <label>Quantidade<input type="number" min="0" step="0.001" placeholder="Ex.: 24" /></label>
          <label>Entrega<input type="datetime-local" /></label>
          <label className="form-span-2">Observação<textarea rows={3} placeholder="Orientações para a produção" /></label>
          <div className="form-span-2 form-actions"><button type="button" className="button button-muted" onClick={() => setShowForm(false)}>Cancelar</button><button className="button button-primary" type="submit">Salvar ordem</button></div>
        </form>
      ) : null}

      <section className="kanban-grid">
        {visible.map((row) => (
          <article className="order-card" key={row.code}>
            <div className="order-card-header"><span className="mono">{row.code}</span><StatusBadge tone={row.tone}>{row.status}</StatusBadge></div>
            <h3>{row.product}</h3>
            <p>{row.client}</p>
            <div className="order-meta"><span><small>Quantidade</small><strong>{row.quantity}</strong></span><span><small>Prazo</small><strong>{row.time}</strong></span></div>
            <div className="progress"><span style={{ width: row.status === "Concluído" ? "100%" : row.status === "Separado" ? "78%" : row.status === "Em produção" ? "48%" : "12%" }} /></div>
            <div className="card-actions"><button type="button" className="button button-muted">Detalhes</button><button type="button" className="button button-secondary">Avançar</button></div>
          </article>
        ))}
      </section>
    </>
  );
}
