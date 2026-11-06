const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const S = ({ size = 24, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...P} aria-hidden="true" {...rest}>{children}</svg>
);
export const IconUser = (p) => <S {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" /></S>;
export const IconCart = (p) => <S {...p}><path d="M3 4h2l2.4 11h10.2l2-8H6.2" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></S>;
export const IconSearch = (p) => <S {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></S>;
export const IconChevronDown = (p) => <S {...p}><path d="M6 9l6 6 6-6" /></S>;
export const IconChevronLeft = (p) => <S {...p}><path d="M15 6l-6 6 6 6" /></S>;
export const IconChevronRight = (p) => <S {...p}><path d="M9 6l6 6-6 6" /></S>;
export const IconArrowRight = (p) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>;
export const IconClose = (p) => <S {...p}><path d="M5 5l14 14M19 5L5 19" /></S>;
export const IconBolt = (p) => <S {...p} fill="currentColor" stroke="none"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></S>;
export const IconMenu = (p) => <S {...p}><path d="M4 7h16M4 12h16M4 17h16" /></S>;
