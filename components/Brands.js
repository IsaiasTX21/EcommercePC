import Link from "next/link";

export default function Brands({ brands, title }) {
  if (!brands.length) return null;
  return (
    <section className="wrap-x rail" aria-label={title}>
      <div className="rail-head"><h2 className="plain">{title}</h2></div>
      <div className="brands">
        {brands.map((b) => (
          <Link key={b} href={`/marcas/${encodeURIComponent(b)}`} className="brand-chip">{b}</Link>
        ))}
      </div>
    </section>
  );
}
