import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { products } from "@/lib/data";

export const metadata = { title: "Produtos" };

export default function ProdutosPage() {
  return (
    <><PageHeader eyebrow="Catálogo" title="Produtos e fichas de validade" description="Configure validade padrão, armazenamento, peso de embalagem e estoque mínimo." actions={<button className="button button-primary">+ Novo produto</button>} />
    <section className="panel"><div className="search-row"><input className="search-input" placeholder="Buscar produto, código ou categoria" /><select><option>Todas as categorias</option><option>Molhos</option><option>Carnes</option><option>Frios</option></select></div><div className="table-wrap"><table><thead><tr><th>Código</th><th>Produto</th><th>Categoria</th><th>Validade</th><th>Armazenamento</th><th>Estoque</th><th>Situação</th></tr></thead><tbody>{products.map((product) => <tr key={product.code}><td className="mono">{product.code}</td><td><strong>{product.name}</strong></td><td>{product.category}</td><td>{product.validity}</td><td>{product.storage}</td><td>{product.stock}<small className="cell-note">Mín.: {product.min}</small></td><td><StatusBadge tone={product.tone}>{product.status}</StatusBadge></td></tr>)}</tbody></table></div></section></>
  );
}
