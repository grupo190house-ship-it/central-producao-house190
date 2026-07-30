import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { dashboardStats, expiryAlerts, productionRows } from "@/lib/data";

export default function DashboardPage() {
  return (
    <>
      <PageHeader eyebrow="Operação de hoje" title="Central sob controle" description="Acompanhe a produção, as validades e os pedidos das unidades em um único lugar." actions={<><Link className="button button-muted" href="/etiquetas">Imprimir etiqueta</Link><Link className="button button-primary" href="/producao">+ Nova produção</Link></>} />
      <section className="stats-grid">{dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}</section>
      <section className="dashboard-grid">
        <div className="panel panel-wide">
          <div className="panel-heading"><div><span className="eyebrow">Fluxo do dia</span><h2>Produções em andamento</h2></div><Link href="/producao">Ver todas</Link></div>
          <div className="table-wrap"><table><thead><tr><th>Ordem</th><th>Produto</th><th>Destino</th><th>Quantidade</th><th>Status</th><th>Prazo</th></tr></thead><tbody>{productionRows.map((row) => <tr key={row.code}><td className="mono">{row.code}</td><td><strong>{row.product}</strong></td><td>{row.client}</td><td>{row.quantity}</td><td><StatusBadge tone={row.tone}>{row.status}</StatusBadge></td><td>{row.time}</td></tr>)}</tbody></table></div>
        </div>
        <aside className="panel">
          <div className="panel-heading"><div><span className="eyebrow">PVPS</span><h2>Validades críticas</h2></div><Link href="/estoque">Estoque</Link></div>
          <div className="alert-list">{expiryAlerts.map((item) => <article key={item.batch} className="alert-item"><div><strong>{item.product}</strong><span className="mono">{item.batch}</span></div><div><StatusBadge tone={item.tone}>{item.expires}</StatusBadge><small>{item.quantity}</small></div></article>)}</div>
          <Link href="/estoque" className="button button-secondary button-full">Abrir mapa de validade</Link>
        </aside>
      </section>
      <section className="quick-grid">
        <Link href="/etiquetas" className="quick-card"><span>01</span><div><strong>Gerar etiqueta</strong><small>Crie lote e validade automaticamente</small></div></Link>
        <Link href="/producao" className="quick-card"><span>02</span><div><strong>Iniciar produção</strong><small>Transforme pedidos em ordens</small></div></Link>
        <Link href="/perdas" className="quick-card"><span>03</span><div><strong>Registrar perda</strong><small>Mantenha custo e estoque corretos</small></div></Link>
      </section>
    </>
  );
}
