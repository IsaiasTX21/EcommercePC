import { site } from "@/site.config";

export function saleInfo(p) {
  const price = p.priceRange.minVariantPrice;
  const compare = p.compareAtPriceRange.minVariantPrice;
  const a = Number(price.amount);
  const c = Number(compare.amount);
  const onSale = c > a;
  return { price, compare, onSale, pct: onSale ? Math.round((1 - a / c) * 100) : 0 };
}

// "ou 10x de R$ ..." (só exibe se der ao menos 2 parcelas acima do valor mínimo)
export function installment(money) {
  const { installments: max, minInstallment: min } = site.pricing;
  if (!max || max < 2) return null;
  const total = Number(money.amount);
  const n = Math.min(max, Math.floor(total / (min || 1)));
  if (n < 2) return null;
  return { n, value: { amount: total / n, currencyCode: money.currencyCode } };
}

export function pixPrice(money) {
  const d = site.pricing.pixDiscount;
  if (!d) return null;
  return { amount: Number(money.amount) * (1 - d / 100), currencyCode: money.currencyCode };
}

// Selos definidos pelas tags do produto na Shopify
export function badgesFor(p) {
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  return Object.entries(site.tagBadges).filter(([k]) => tags.includes(k)).map(([, v]) => v);
}

export function lowStock(p) {
  const n = p.totalInventory;
  return typeof n === "number" && n > 0 && n <= site.pricing.lowStock ? n : null;
}
