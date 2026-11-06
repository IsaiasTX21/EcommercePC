import Image from "next/image";
import Link from "next/link";

// Banner de marketing: imagem opcional (Shopify) sobre um fundo/gradiente
export default function BannerLink({ s, priority = false, className = "slide", sizes = "(max-width: 900px) 85vw, 50vw" }) {
  const Tag = s.external ? "a" : Link;
  const props = s.external ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : { href: s.href };
  return (
    <Tag {...props} className={className} style={{ background: s.background || undefined, color: s.color || undefined }}>
      {s.image && <Image src={s.image.url} alt={s.image.altText || ""} fill sizes={sizes} priority={priority} />}
      <div className="slide-copy">
        {s.subtitle && <p>{s.subtitle}</p>}
        {s.title && <h2>{s.title}</h2>}
        {s.button && <span className="pill">{s.button}</span>}
      </div>
    </Tag>
  );
}
