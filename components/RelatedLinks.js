import Link from "next/link";

export default function RelatedLinks({ title, links }) {
  if (!links.length) return null;
  return (
    <section className="wrap-x related">
      <h2 className="plain">{title}</h2>
      <ul>
        {links.map((l) => <li key={l.href}><Link href={l.href} className="cap">{l.label}</Link></li>)}
      </ul>
    </section>
  );
}
