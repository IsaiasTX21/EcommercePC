import Link from "next/link";
import { site } from "@/site.config";

const A = ({ l }) =>
  l.external ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
  ) : (
    <Link href={l.href}>{l.label}</Link>
  );

export default function Footer({ accountHref, columns = [], policies = [] }) {
  const socials = Object.entries(site.footer.social).filter(([, url]) => url);
  const { email, whatsapp } = site.contact ?? {};

  return (
    <footer className="ftr">
      <div className="wrap-x ftr-grid">
        <div>
          <h4>Atendimento</h4>
          <ul>
            {whatsapp && <li><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
            <li><a href={accountHref}>Acompanhe seu pedido</a></li>
          </ul>
        </div>
        <div>
          <h4>Loja</h4>
          <ul>
            <li><Link href="/ofertas">Ofertas</Link></li>
            <li><Link href="/loja?ordem=novos">Lançamentos</Link></li>
            <li><Link href="/loja">Todos os produtos</Link></li>
            <li><Link href="/carrinho">Carrinho</Link></li>
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>{col.links.map((l) => <li key={l.href + l.label}><A l={l} /></li>)}</ul>
          </div>
        ))}
        {policies.length > 0 && (
          <div>
            <h4>Políticas</h4>
            <ul>{policies.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
        )}
        {socials.length > 0 && (
          <div>
            <h4>Redes sociais</h4>
            <ul>
              {socials.map(([n, url]) => (
                <li key={n}><a href={url} target="_blank" rel="noopener noreferrer" style={{ textTransform: "capitalize" }}>{n}</a></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="ftr-base">
        <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados. Pagamento seguro pela Shopify.</p>
      </div>
    </footer>
  );
}
