import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { stockItems } from "@/lib/data";

export const metadata = { title: "Estoque" };

export default function EstoquePage() {
  return (
    <><PageHeader eyebrow="PVPS e rastreabilidade" title="Estoque por lote" description="Controle o saldo disponível e priorize automaticamente o que vence primeiro." actions={<><button className="button button-muted">Registrar entrada</button><button className="button button-primary">Movimentar estoque</button></>} />
    <section className="stats-grid compact-stats"><StatCard label="Itens em estoque" value="1.284" detail="37 produtos" tone="info" /><StatCard label="Abaixo do mínimo" value="4" detail="Reposição necessária" tone="danger" /><StatCard label="Vencem em 7 dias" value="12" detail="Aplicar PVPS" tone="warning" /><StatCard label="Lotes bloqueados" value="1" detail="Aguardando análise" tone="neutral" /></section>
    <section className="panel"><div className="search-row"><input className="search-input" placeholder="Buscar produto, lote ou localização" /><select><option>Todos os status</option><option>Normal</option><option>Atenção</option><option>Baixo</option></select></div><div className="table-wrap"><table><thead><tr><th>Produto</th><th>Lote</th><th>Localização</th><th>Disponível</th><th>Validade</th><th>Situação</th></tr></thead><tbody>{stockItems.map((item) => <tr key={item.batch}><td><strong>{item.product}</strong></td><td className="mono">{item.batch}</td><td>{item.location}</td><td>{item.available}</td><td>{item.expires}</td><td><StatusBadge tone={item.tone}>{item.status}</StatusBadge></td></tr>)}</tbody></table></div></section></>
  );
}
