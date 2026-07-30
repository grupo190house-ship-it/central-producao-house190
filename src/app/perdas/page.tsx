import { PageHeader } from "@/components/page-header";
import { lossRows } from "@/lib/data";

export const metadata = { title: "Perdas" };

export default function PerdasPage() {
  return (
    <><PageHeader eyebrow="Controle de custos" title="Registro de perdas" description="Registre o motivo, lote e responsável para manter o estoque e os indicadores corretos." />
    <section className="split-layout"><form className="panel form-grid" onSubmit={(event) => event.preventDefault()}><h2 className="form-span-2">Nova perda</h2><label>Produto<select><option>Tomate Confitado</option><option>Maionese Verde</option><option>Blend House 180 g</option></select></label><label>Lote<input placeholder="Ex.: TC-280726-002" /></label><label>Quantidade<input type="number" min="0" step="0.001" /></label><label>Unidade<select><option>kg</option><option>unidade</option><option>pacote</option></select></label><label className="form-span-2">Motivo<select><option>Vencimento</option><option>Erro de produção</option><option>Qualidade inadequada</option><option>Armazenamento incorreto</option><option>Avaria</option><option>Sobra</option><option>Divergência de estoque</option></select></label><label className="form-span-2">Observação<textarea rows={4} placeholder="Descreva o ocorrido" /></label><div className="form-span-2 form-actions"><button className="button button-primary button-full">Registrar perda</button></div></form>
    <div className="panel"><div className="panel-heading"><div><span className="eyebrow">Últimos registros</span><h2>Histórico de perdas</h2></div></div><div className="loss-list">{lossRows.map((row) => <article key={`${row.date}-${row.product}`}><div><strong>{row.product}</strong><span>{row.reason} · {row.quantity}</span><small>{row.date} · {row.responsible}</small></div><strong>{row.value}</strong></article>)}</div><div className="loss-total"><span>Total exibido</span><strong>R$ 64,40</strong></div></div></section></>
  );
}
