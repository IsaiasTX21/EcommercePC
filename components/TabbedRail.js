"use client";

import Link from "next/link";
import { useState } from "react";
import RailScroller from "./RailScroller";
import { IconBolt, IconChevronRight } from "./Icons";

// tabs: [{ label, href, node }]  (node = cartões já renderizados no servidor)
export default function TabbedRail({ title, tabs }) {
  const [i, setI] = useState(0);
  const t = tabs[i];
  return (
    <section className="wrap-x rail" aria-label={title}>
      <div className="rail-inner">
        <div className="rail-head">
          <h2><IconBolt size={20} /><span className="cap">{title}</span></h2>
          {t.href && <Link href={t.href} className="more">ver mais <IconChevronRight size={16} /></Link>}
        </div>
        <div className="tabs" role="tablist">
          {tabs.map((x, k) => (
            <button key={x.label} role="tab" aria-selected={k === i} className={`cap ${k === i ? "is-active" : ""}`} onClick={() => setI(k)}>
              {x.label}
            </button>
          ))}
        </div>
        <RailScroller key={i}>{t.node}</RailScroller>
      </div>
    </section>
  );
}
