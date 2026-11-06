import Link from "next/link";
import RailScroller from "./RailScroller";
import { IconBolt, IconChevronRight } from "./Icons";

export default function Rail({ title, href, children }) {
  return (
    <section className="wrap-x rail" aria-label={title}>
      <div className="rail-inner">
        <div className="rail-head">
          <h2><IconBolt size={20} /><span className="cap">{title}</span></h2>
          {href && <Link href={href} className="more">ver mais <IconChevronRight size={16} /></Link>}
        </div>
        <RailScroller>{children}</RailScroller>
      </div>
    </section>
  );
}
