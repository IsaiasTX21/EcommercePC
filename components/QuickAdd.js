"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { IconCart } from "./Icons";

// Produto de variante única: adiciona direto. Com variantes: leva à página para escolher cor/tamanho.
export default function QuickAdd({ variantId, single, handle, title }) {
  const { add, busy } = useCart();
  if (!single) {
    return (
      <Link className="qa" href={`/produtos/${handle}`} aria-label={`Escolher opções de ${title}`} title="Escolher opções">
        <IconCart size={18} />
      </Link>
    );
  }
  return (
    <button className="qa" disabled={busy} onClick={() => add(variantId, 1)} aria-label={`Adicionar ${title} ao carrinho`} title="Adicionar ao carrinho">
      <IconCart size={18} />
    </button>
  );
}
