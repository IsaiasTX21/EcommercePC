import Image from "next/image";
import Link from "next/link";
import QuickAdd from "./QuickAdd";
import { money } from "@/lib/format";
import { badgesFor, installment, lowStock, pixPrice, saleInfo } from "@/lib/pricing";

export default function ProductCard({ product }) {
  const { price, compare, onSale, pct } = saleInfo(product);
  const badges = badgesFor(product);
  const inst = installment(price);
  const pix = pixPrice(price);
  const left = lowStock(product);
  const variants = product.quickVariants?.nodes ?? [];
  const single = variants.length === 1;

  return (
    <article className="pcard">
      <Link href={`/produtos/${product.handle}`} className="pcard-link">
        <div className="pcard-badges">
          {badges.map((b) => <span key={b.label} className={`b b-${b.tone || "dark"}`}>{b.label}</span>)}
          {onSale && <span className="b b-off">-{pct}%</span>}
        </div>
        <div className="pcard-img">
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(max-width: 700px) 45vw, 200px"
            />
          )}
        </div>
        <h3>{product.title}</h3>
        {product.vendor && <p className="pcard-brand">{product.vendor}</p>}
        {onSale && <p className="pcard-old"><s>{money(compare)}</s></p>}
        <p className="pcard-price">{money(price)}</p>
        {pix && <p className="pcard-pix">No Pix {money(pix)}</p>}
        {inst && <p className="pcard-inst">ou {inst.n}x de {money(inst.value)}</p>}
        {left && <p className="pcard-low">Restam {left} unid.</p>}
        {!product.availableForSale && <p className="pcard-out">Indisponível</p>}
      </Link>
      {product.availableForSale && variants[0] && (
        <QuickAdd variantId={variants[0].id} single={single} handle={product.handle} title={product.title} />
      )}
    </article>
  );
}
