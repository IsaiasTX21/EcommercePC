"use client";

import { useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "./Icons";

export default function RailScroller({ children }) {
  const ref = useRef(null);
  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" });
  return (
    <div className="rail-wrap">
      <button className="nav-arrow left" onClick={() => go(-1)} aria-label="Anterior"><IconChevronLeft /></button>
      <div className="rail-track" ref={ref}>{children}</div>
      <button className="nav-arrow right" onClick={() => go(1)} aria-label="Próximos"><IconChevronRight /></button>
    </div>
  );
}
