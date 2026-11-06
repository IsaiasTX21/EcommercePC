import Listing from "@/components/Listing";
import { getCollections, getProducts } from "@/lib/shopify";

const decode = (v) => { try { return decodeURIComponent(v); } catch { return v; } };

export async function generateMetadata({ params }) {
  const { vendor } = await params;
  return { title: decode(vendor) };
}

export default async function BrandPage({ params, searchParams }) {
  const { vendor } = await params;
  const sp = await searchParams;
  const name = decode(vendor);
  const sort = ["vendidos", "novos", "menor", "maior"].includes(sp.ordem) ? sp.ordem : "vendidos";
  const safe = name.replace(/["\\]/g, "");

  const [products, categories] = await Promise.all([
    getProducts({ first: 48, query: `vendor:"${safe}"`, sort }),
    getCollections(20).catch(() => []),
  ]);
  return (
    <div className="wrap page">
      <Listing title={name} products={products} sort={sort} categories={categories} />
    </div>
  );
}
