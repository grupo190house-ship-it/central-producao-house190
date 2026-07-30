import { PageHeader } from "@/components/page-header";
import { clients } from "@/lib/data";

export const metadata = { title: "Clientes" };

export default function ClientesPage() {
  return (
    <><PageHeader eyebrow="Unidades atendidas" title="Clientes e destinos" description="Veja pedidos, volume produzido, contatos e próximas entregas." actions={<button className="button button-primary">+ Novo cliente</button>} />
    <section className="client-grid">{clients.map((client) => <article className="client-card" key={client.code}><div className="client-card-head"><span>{client.code}</span><strong>Ativo</strong></div><h2>{client.name}</h2><p>{client.city}</p><dl><div><dt>Contato</dt><dd>{client.contact}</dd></div><div><dt>Telefone</dt><dd>{client.phone}</dd></div><div><dt>Pedidos abertos</dt><dd>{client.orders}</dd></div><div><dt>Volume no mês</dt><dd>{client.volume}</dd></div></dl><div className="delivery-box"><small>Próxima entrega</small><strong>{client.nextDelivery}</strong></div><button className="button button-secondary button-full">Abrir cadastro</button></article>)}</section></>
  );
}
