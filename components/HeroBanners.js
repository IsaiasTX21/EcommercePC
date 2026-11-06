"use client";

import { useRef } from "react";
import BannerLink from "./BannerLink";
import { IconChevronLeft, IconChevronRight } from "./Icons";

export default function HeroBanners({ slides }) {
  const ref = useRef(null);
  if (!slides?.length) return null;
  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.5, behavior: "smooth" });

  return (
    <div className="hero">
      <button className="nav-arrow left" onClick={() => go(-1)} aria-label="Banner anterior"><IconChevronLeft /></button>
      <div className="hero-track" ref={ref} role="group" aria-label="Destaques" tabIndex={0}>
        {slides.map((s, i) => <BannerLink key={i} s={s} priority={i < 2} />)}
      </div>
      <button className="nav-arrow right" onClick={() => go(1)} aria-label="Próximo banner"><IconChevronRight /></button>
    </div>
  );
}
