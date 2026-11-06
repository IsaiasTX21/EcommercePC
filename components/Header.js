"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { IconCart, IconChevronDown, IconMenu, IconUser } from "./Icons";
import SearchBox from "./SearchBox";

function DLink({ d, className }) {
  return d.external ? (
    <a href={d.href} className={className} target="_blank" rel="noopener noreferrer">{d.title}</a>
  ) : (
    <Link href={d.href} className={className}>{d.title}</Link>
  );
}

function Departments({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!items.length) return null;
  return (
    <div className="dept" ref={ref}>
      <button className="dept-btn" aria-expanded={open} aria-controls="dept-panel" onClick={() => setOpen((o) => !o)}>
        <IconMenu size={18} /> Departamentos <IconChevronDown size={16} />
      </button>
      {open && (
        <div className="dept-panel" id="dept-panel">
          {items.map((d) => (
            <div className="dept-col" key={d.title + d.href}>
              <DLink d={d} className="dept-title cap" />
              {d.children.length > 0 && (
                <ul>
                  {d.children.map((c) => <li key={c.title + c.href}><DLink d={c} /></li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ name, departments, navLinks, collections, promo, account }) {
  const { count, openCart } = useCart();

  return (
    <>
      <header className="hdr">
        <div className="wrap-x hdr-in">
          <Link href="/" className="logo">{name}</Link>
          <SearchBox />
          <div className="hdr-actions">
            {/* <a> comum: a rota de login faz redirecionamento e não deve ser pré-carregada */}
            <a className="acct" href={account.href}>
              <IconUser size={28} />
              <span className="acct-text">
                <small>{account.loggedIn ? `Olá, ${account.name || "cliente"}` : "Entre ou"}</small>
                <strong>{account.loggedIn ? "Minha conta" : "Cadastre-se"}</strong>
              </span>
            </a>
            {account.loggedIn && <a className="acct-out" href="/api/auth/logout">Sair</a>}
            <button className="cart-btn" onClick={openCart} aria-label={`Abrir carrinho, ${count} ${count === 1 ? "produto" : "produtos"}`}>
              <IconCart size={26} />
              {count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <nav className="subnav" aria-label="Principal">
        <div className="wrap-x subnav-in">
          <Departments items={departments} />
          {navLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          {collections.slice(0, 6).map((c) => (
            <Link key={c.handle} href={`/categorias/${c.handle}`} className="cap">{c.title}</Link>
          ))}
          {promo?.enabled && <Link href={promo.href} className="subnav-promo">{promo.label}</Link>}
        </div>
      </nav>
    </>
  );
}
