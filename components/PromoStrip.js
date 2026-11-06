import BannerLink from "./BannerLink";

export default function PromoStrip({ banner }) {
  if (!banner) return null;
  return (
    <section className="wrap-x">
      <BannerLink s={banner} className="strip" sizes="100vw" />
    </section>
  );
}
