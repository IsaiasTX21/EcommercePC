import { getBanners, getCollection, getProducts, getShowcase } from "./shopify";
import { localHref } from "./links";
import { saleInfo } from "./pricing";
import { site } from "@/site.config";

function normalizeBanner(b) {
  const l = b.link ? localHref(b.link) : { href: b.href || "/loja", external: false };
  return {
    title: b.title, subtitle: b.subtitle, button: b.button,
    href: l.href, external: l.external,
    image: b.image && typeof b.image === "object" ? b.image : null,
    background: b.background || null, color: b.color || null,
  };
}

export async function buildHome() {
  const [collections, pool, newest, meta] = await Promise.all([
    getShowcase({ collections: 10, perCollection: 12 }).catch(() => []),
    getProducts({ first: 100, sort: "vendidos" }),
    getProducts({ first: 20, sort: "novos" }).catch(() => []),
    getBanners().catch(() => []),
  ]);

  const sources = {
    vendidos: pool.slice(0, 16),
    novos: newest,
    oferta: pool.filter((p) => saleInfo(p).onSale).sort((a, b) => saleInfo(b).pct - saleInfo(a).pct).slice(0, 16),
  };
  const hrefs = { vendidos: "/loja?ordem=vendidos", novos: "/loja?ordem=novos", oferta: "/ofertas" };

  const rails = [];
  for (const def of site.rails) {
    let products = [];
    let href = hrefs[def.source] || "/loja";
    if (def.collection) {
      const col = collections.find((c) => c.handle === def.collection);
      products = col ? col.products.nodes : (await getCollection(def.collection).catch(() => null))?.products?.nodes ?? [];
      href = `/categorias/${def.collection}`;
      if (!products.length && def.fallback) { products = sources[def.fallback] ?? []; href = hrefs[def.fallback] || "/loja"; }
    } else {
      products = sources[def.source] ?? [];
    }
    if (products.length) rails.push({ title: def.title, href, products: products.slice(0, 16) });
  }

  const used = new Set(site.rails.map((r) => r.collection).filter(Boolean));
  const autoRails = collections
    .filter((c) => !used.has(c.handle))
    .slice(0, site.autoCategoryRails)
    .map((c) => ({ title: c.title, href: `/categorias/${c.handle}`, products: c.products.nodes }));

  // Banners: metaobjetos "banner" (campo placement: hero | strip) têm prioridade sobre o padrão do site.config.js
  const pick = (placement) => {
    const fromShopify = meta.filter((m) => (m.placement || "hero") === placement).map(normalizeBanner);
    return fromShopify.length ? fromShopify : site.banners[placement].map(normalizeBanner);
  };

  const counts = new Map();
  for (const p of pool) if (p.vendor) counts.set(p.vendor, (counts.get(p.vendor) ?? 0) + 1);
  const brands = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([name]) => name);

  return {
    collections, rails, autoRails, brands,
    banners: { hero: pick("hero"), strip: pick("strip") },
    top: pool.slice(0, 12),
  };
}
