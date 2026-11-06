import Image from "next/image";
import Link from "next/link";
import { IconChevronRight } from "./Icons";
import { money } from "@/lib/format";
import { saleInfo } from "@/lib/pricing";

// Caixas de categoria com 2 produtos de cada coleção
export default function GroupCards({ collections }) {
  if (!collections.length) return null;
  return (
    <section className="wrap-x groups" aria-label="Categorias em destaque">
      {collections.map((c) => (
        <div className="gcard" key={c.id}>
          <Link href={`/categorias/${c.handle}`} className="gcard-head">
            <h3 className="cap">{c.title}</h3>
            <IconChevronRight size={18} />
          </Link>
          <div className="gcard-items">
            {c.products.nodes.slice(0, 2).map((p) => {
              const s = saleInfo(p);
              return (
                <Link key={p.id} href={`/produtos/${p.handle}`} className="gitem" title={p.title}>
                  <div className="gitem-img">
                    {p.featuredImage && <Image src={p.featuredImage.url} alt={p.title} fill sizes="110px" />}
                    {s.onSale && <span className="b b-off">-{s.pct}%</span>}
                  </div>
                  <p>{money(s.price)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
