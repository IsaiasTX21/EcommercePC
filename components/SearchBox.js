"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "./Icons";
import { money } from "@/lib/format";

// Busca com sugestões em tempo real (Predictive Search da Shopify)
export default function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [res, setRes] = useState(null);
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setRes(null); return; }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctrl.signal });
        if (r.ok) setRes(await r.json());
      } catch {}
    }, 250);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  function submit(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    router.push(`/busca?q=${encodeURIComponent(term)}`);
  }

  const has = res && (res.products?.length || res.collections?.length);

  return (
    <div className="search-box" ref={box}>
      <form className="search" role="search" onSubmit={submit}>
        <input
          type="search" value={q} placeholder="Busque no catálogo" aria-label="Buscar produtos" autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
        />
        <button type="submit" aria-label="Buscar"><IconArrowRight size={20} /></button>
      </form>

      {open && has && (
        <div className="suggest" role="listbox">
          {res.collections?.length > 0 && (
            <div className="suggest-cats">
              {res.collections.map((c) => (
                <Link key={c.handle} href={`/categorias/${c.handle}`} className="cap" onClick={() => setOpen(false)}>{c.title}</Link>
              ))}
            </div>
          )}
          {res.products?.map((p) => (
            <Link key={p.handle} href={`/produtos/${p.handle}`} className="suggest-item" onClick={() => setOpen(false)}>
              <span className="suggest-img">{p.featuredImage && <Image src={p.featuredImage.url} alt="" fill sizes="44px" />}</span>
              <span className="suggest-title">{p.title}</span>
              <strong>{money(p.priceRange.minVariantPrice)}</strong>
            </Link>
          ))}
          <Link href={`/busca?q=${encodeURIComponent(q.trim())}`} className="suggest-all" onClick={() => setOpen(false)}>
            Ver todos os resultados para “{q.trim()}”
          </Link>
        </div>
      )}
    </div>
  );
}
