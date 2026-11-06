import Image from "next/image";
import Link from "next/link";

export default function CategoryCircles({ collections, label }) {
  if (!collections.length) return null;
  return (
    <nav className="wrap-x circles" aria-label={label}>
      {collections.slice(0, 12).map((c) => {
        const img = c.image || c.products.nodes[0]?.featuredImage;
        return (
          <Link key={c.id} href={`/categorias/${c.handle}`} className="circle">
            <span className="circle-img">{img && <Image src={img.url} alt="" fill sizes="76px" />}</span>
            <span className="cap">{c.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
