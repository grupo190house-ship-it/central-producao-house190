"use client";

import { useMemo, useState } from "react";

const productOptions = {
  "Maionese Verde": { shelfLife: 5, storage: "Manter refrigerado entre 1 °C e 5 °C", weight: "500 g", code: "MV" },
  "Blend House 180 g": { shelfLife: 30, storage: "Manter congelado a -18 °C", weight: "180 g", code: "BH" },
  "Bacon Crispy 40 g": { shelfLife: 5, storage: "Manter refrigerado entre 1 °C e 5 °C", weight: "40 g", code: "BC" },
} as const;

type ProductName = keyof typeof productOptions;

function isoDate(date: Date) { return date.toISOString().slice(0, 10); }
function brDate(value: string) { if (!value) return "—"; const [y, m, d] = value.split("-"); return `${d}/${m}/${y}`; }

export function LabelDesigner() {
  const today = isoDate(new Date());
  const [product, setProduct] = useState<ProductName>("Maionese Verde");
  const [client, setClient] = useState("House190 Teixeira de Freitas");
  const [productionDate, setProductionDate] = useState(today);
  const [weight, setWeight] = useState(productOptions[product].weight);
  const [responsible, setResponsible] = useState("Equipe de Produção");
  const [copies, setCopies] = useState(1);

  const details = productOptions[product];
  const expiry = useMemo(() => {
    const date = new Date(`${productionDate}T12:00:00`);
    date.setDate(date.getDate() + details.shelfLife);
    return isoDate(date);
  }, [productionDate, details.shelfLife]);
  const lot = `${details.code}-${productionDate.replaceAll("-", "").slice(2)}-001`;

  function changeProduct(name: ProductName) {
    setProduct(name);
    setWeight(productOptions[name].weight);
  }

  return (
    <div className="label-workspace">
      <form className="panel label-form" onSubmit={(event) => event.preventDefault()}>
        <h2>Dados da etiqueta</h2>
        <label>Produto<select value={product} onChange={(e) => changeProduct(e.target.value as ProductName)}>{Object.keys(productOptions).map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Cliente / destino<select value={client} onChange={(e) => setClient(e.target.value)}><option>House190 Teixeira de Freitas</option><option>House190 Eunápolis</option><option>House Food Park</option><option>Estoque central</option></select></label>
        <div className="form-grid compact"><label>Produção<input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} /></label><label>Validade<input type="date" value={expiry} readOnly /></label></div>
        <div className="form-grid compact"><label>Peso<input value={weight} onChange={(e) => setWeight(e.target.value)} /></label><label>Cópias<input type="number" min="1" max="100" value={copies} onChange={(e) => setCopies(Number(e.target.value))} /></label></div>
        <label>Responsável<input value={responsible} onChange={(e) => setResponsible(e.target.value)} /></label>
        <label>Lote<input value={lot} readOnly /></label>
        <div className="print-actions"><button type="button" className="button button-muted">Salvar lote</button><button type="button" className="button button-primary" onClick={() => window.print()}>Imprimir {copies} {copies === 1 ? "etiqueta" : "etiquetas"}</button></div>
      </form>

      <section className="preview-panel">
        <div className="preview-heading"><div><span className="eyebrow">Visualização</span><h2>Etiqueta 60 × 40 mm</h2></div><span className="status-badge status-success">Pronta</span></div>
        <div className="label-print-area">
          <article className="product-label">
            <div className="label-brand"><strong>HOUSE190</strong><span>CENTRAL DE PRODUÇÃO</span></div>
            <h3>{product}</h3>
            <div className="label-grid"><span><small>PESO</small><strong>{weight}</strong></span><span><small>LOTE</small><strong>{lot}</strong></span><span><small>PRODUÇÃO</small><strong>{brDate(productionDate)}</strong></span><span className="expiry"><small>VALIDADE</small><strong>{brDate(expiry)}</strong></span></div>
            <div className="label-destination"><small>DESTINO</small><strong>{client}</strong></div>
            <p>{details.storage}</p>
            <div className="label-footer"><span>Resp.: {responsible}</span><div className="fake-qr" aria-label="Espaço reservado para QR Code"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
          </article>
        </div>
      </section>
    </div>
  );
}
