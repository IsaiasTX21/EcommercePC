import Brands from "@/components/Brands";
import CategoryCircles from "@/components/CategoryCircles";
import GroupCards from "@/components/GroupCards";
import HeroBanners from "@/components/HeroBanners";
import ProductCard from "@/components/ProductCard";
import PromoStrip from "@/components/PromoStrip";
import PromoTiles from "@/components/PromoTiles";
import Rail from "@/components/Rail";
import RelatedLinks from "@/components/RelatedLinks";
import ServiceCards from "@/components/ServiceCards";
import TabbedRail from "@/components/TabbedRail";
import { getFooter } from "@/lib/footer";
import { buildHome } from "@/lib/home";
import { site } from "@/site.config";

const cards = (list) => list.map((p) => <ProductCard key={p.id} product={p} />);

export default async function Home() {
  const [home, footer] = await Promise.all([buildHome(), getFooter().catch(() => ({ existing: [] }))]);
  const { collections, rails, autoRails, brands, banners, top } = home;

  const existing = new Set(footer.existing ?? []);
  const services = site.services.filter((s) => !/^\/(pagina|politicas)\//.test(s.href) || existing.has(s.href));
  const related = [
    ...collections.map((c) => ({ label: c.title, href: `/categorias/${c.handle}` })),
    ...brands.map((b) => ({ label: b, href: `/marcas/${encodeURIComponent(b)}` })),
  ];
  const tabs = [
    { label: "Todos", href: "/loja", node: cards(top) },
    ...collections.slice(0, 4).map((c) => ({
      label: c.title, href: `/categorias/${c.handle}`, node: cards(c.products.nodes.slice(0, 12)),
    })),
  ];

  return (
    <>
      <div className="wrap-x"><HeroBanners slides={banners.hero} /></div>
      <GroupCards collections={collections.slice(0, 5)} />
      <CategoryCircles collections={collections} label={site.sections.circlesAria} />
      <PromoStrip banner={banners.strip[0]} />

      {rails.slice(0, 2).map((r) => <Rail key={r.title} title={r.title} href={r.href}>{cards(r.products)}</Rail>)}
      <PromoTiles collections={collections} />
      {rails.slice(2).map((r) => <Rail key={r.title} title={r.title} href={r.href}>{cards(r.products)}</Rail>)}

      {top.length > 0 && <TabbedRail title={site.sections.tabsTitle} tabs={tabs} />}
      <Brands brands={brands} title={site.sections.brandsTitle} />
      {autoRails.map((r) => <Rail key={r.href} title={r.title} href={r.href}>{cards(r.products)}</Rail>)}

      {top.length === 0 && (
        <p className="wrap-x empty-note">
          Nenhum produto publicado ainda. Cadastre produtos no painel da Shopify e publique-os no canal Headless.
        </p>
      )}

      <ServiceCards items={services} />
      <RelatedLinks title={site.sections.relatedTitle} links={related} />
    </>
  );
}
