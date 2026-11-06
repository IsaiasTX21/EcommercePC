import Image from "next/image";
import Link from "next/link";

// Dois banners grandes com a imagem da coleção
export default function PromoTiles({ collections }) {
  const items = collections.slice(0, 2).map((c) => ({
    c, img: c.image || c.products.nodes[0]?.featuredImage,
  }));
  if (items.length < 2) return null;
  return (
    <section className="wrap-x ptiles">
      {items.map(({ c, img }) => (
        <Link key={c.id} href={`/categorias/${c.handle}`} className="ptile">
          {img && <Image src={img.url} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />}
          <div className="ptile-copy">
            <h3 className="cap">{c.title}</h3>
            <span className="pill">Ver coleção</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
