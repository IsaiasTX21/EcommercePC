import Listing from "@/components/Listing";
import { saleInfo } from "@/lib/pricing";
import { getCollections, getProducts } from "@/lib/shopify";

export const metadata = { title: "Ofertas" };

export default async function Offers() {
  const [pool, categories] = await Promise.all([
    getProducts({ first: 100, sort: "vendidos" }),
    getCollections(20).catch(() => []),
  ]);
  const products = pool.filter((p) => saleInfo(p).onSale).sort((a, b) => saleInfo(b).pct - saleInfo(a).pct);
  return (
    <div className="wrap page">
      <Listing
        title="Ofertas"
        description="Produtos com desconto, do maior para o menor. Defina o preço “de” (comparação) no painel da Shopify."
        products={products}
        sort="vendidos"
        showSort={false}
        categories={categories}
      />
    </div>
  );
}
