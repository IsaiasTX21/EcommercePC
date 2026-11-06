import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import ProductView from "@/components/ProductView";
import { metafieldIdentifiers, resolveAttributes, withoutOptions } from "@/lib/attributes";
import { categoryOf } from "@/lib/categories";
import { getProduct } from "@/lib/shopify";
import { site } from "@/site.config";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  return { title: product?.title || "Produto" };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const full = await getProduct(handle);
  if (!full) notFound();

  const { metafields, ...product } = full; // metacampos brutos não vão para o navegador
  const category = categoryOf(product);

  const optionNames = (product.variants.nodes[0]?.selectedOptions ?? []).map((o) => o.name);
  const fromShopify = withoutOptions(
    resolveAttributes(site.attributes, metafieldIdentifiers(site.attributes), metafields),
    optionNames
  );
  // "Marca" vem do campo Fornecedor do produto; "Tipo" do tipo de produto
  const attributes = [
    ...(product.vendor ? [{ label: "Marca", values: [product.vendor] }] : []),
    ...(product.productType ? [{ label: "Tipo", values: [product.productType] }] : []),
    ...fromShopify,
  ];
  const subtitle = [product.vendor, ...fromShopify.filter((a) => a.headline).flatMap((a) => a.values)]
    .filter(Boolean).join(" · ");

  return (
    <article className="wrap page">
      <nav className="crumbs" aria-label="Você está em">
        <Link href="/">Início</Link>
        {category && (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/categorias/${category.handle}`} className="cap">{category.title}</Link>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>
      <ProductView product={product} category={category} subtitle={subtitle}>
        <ProductDetails descriptionHtml={product.descriptionHtml} attributes={attributes} />
      </ProductView>
    </article>
  );
}
