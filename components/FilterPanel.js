"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const priceOf = (input) => { try { return JSON.parse(input).price ?? null; } catch { return null; } };

// Filtros da Shopify (Search & Discovery): marca, especificações, faixa de preço...
export default function FilterPanel({ filters, selected, params }) {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const groups = filters.filter((f) => f.values.length);
  const currentPrice = selected.map(priceOf).find(Boolean);
  const [min, setMin] = useState(currentPrice?.min ?? "");
  const [max, setMax] = useState(currentPrice?.max ?? "");
  if (!groups.length) return null;

  function go(list) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params || {})) if (v) qs.set(k, v);
    list.forEach((x) => qs.append("f", x));
    const s = qs.toString();
    router.push(s ? `${path}?${s}` : path, { scroll: false });
  }
  const toggle = (input) => go(selected.includes(input) ? selected.filter((x) => x !== input) : [...selected, input]);

  function applyPrice(range) {
    const without = selected.filter((x) => !priceOf(x));
    const lo = min === "" ? 0 : Number(min);
    const hi = max === "" ? range?.max : Number(max);
    go([...without, JSON.stringify({ price: { min: lo, ...(hi != null ? { max: hi } : {}) } })]);
  }

  return (
    <aside className="filters" aria-label="Filtros">
      <button className="filters-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Filtros{selected.length ? ` (${selected.length})` : ""}
      </button>
      <div className={`filters-body ${open ? "is-open" : ""}`}>
        {selected.length > 0 && <button className="link-btn" onClick={() => { setMin(""); setMax(""); go([]); }}>Limpar filtros</button>}
        {groups.map((g) =>
          g.type === "PRICE_RANGE" ? (
            <details key={g.id} open className="fgroup">
              <summary>{g.label}</summary>
              <div className="price-range">
                <input type="number" min="0" inputMode="decimal" placeholder="Mín." value={min} onChange={(e) => setMin(e.target.value)} aria-label="Preço mínimo" />
                <span>–</span>
                <input type="number" min="0" inputMode="decimal" placeholder="Máx." value={max} onChange={(e) => setMax(e.target.value)} aria-label="Preço máximo" />
                <button type="button" onClick={() => applyPrice(priceOf(g.values[0].input))}>OK</button>
              </div>
            </details>
          ) : (
            <details key={g.id} open className="fgroup">
              <summary>{g.label}</summary>
              <ul>
                {g.values.map((v) => {
                  const on = selected.includes(v.input);
                  const off = v.count === 0 && !on;
                  return (
                    <li key={v.id}>
                      <label className={off ? "is-disabled" : ""}>
                        <input type="checkbox" checked={on} disabled={off} onChange={() => toggle(v.input)} />
                        <span>{v.label}</span>
                        <small>{v.count}</small>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </details>
          )
        )}
      </div>
    </aside>
  );
}
