import Link from "next/link";

export default function ServiceCards({ items }) {
  if (!items.length) return null;
  return (
    <section className="wrap-x services">
      {items.map((s) => (
        <Link key={s.title} href={s.href} className="service">
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </Link>
      ))}
    </section>
  );
}
