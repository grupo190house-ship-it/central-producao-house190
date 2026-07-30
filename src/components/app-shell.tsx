"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Painel", short: "IN" },
  { href: "/producao", label: "Produção", short: "PR" },
  { href: "/produtos", label: "Produtos", short: "PD" },
  { href: "/etiquetas", label: "Etiquetas", short: "ET" },
  { href: "/clientes", label: "Clientes", short: "CL" },
  { href: "/estoque", label: "Estoque", short: "ES" },
  { href: "/perdas", label: "Perdas", short: "PE" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">H</span>
          <span><strong>HOUSE190</strong><small>Central de Produção</small></span>
        </Link>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "nav-link active" : "nav-link"}>
                <span className="nav-icon">{link.short}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <span className="online-dot" /> Sistema operacional
          <small>Ambiente de demonstração</small>
        </div>
      </aside>

      <div className="main-area">
        <div className="topbar">
          <div><strong>Quinta-feira, 30 de julho</strong><span>Teixeira de Freitas · BA</span></div>
          <div className="user-chip"><span>GH</span><div><strong>Gestão House190</strong><small>Administrador</small></div></div>
        </div>
        <main className="content">{children}</main>
      </div>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        {links.slice(0, 5).map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return <Link key={link.href} href={link.href} className={active ? "mobile-link active" : "mobile-link"}><span>{link.short}</span><small>{link.label}</small></Link>;
        })}
      </nav>
    </div>
  );
}
