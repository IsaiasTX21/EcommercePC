import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import CartDrawer from "@/components/CartDrawer";
import CartProvider from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import { accountsEnabled } from "@/lib/customer";
import { getFooter } from "@/lib/footer";
import { getDepartments } from "@/lib/nav";
import { readSession } from "@/lib/session";
import { getCart, getCollections } from "@/lib/shopify";
import { site } from "@/site.config";
import "./globals.css";

const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const cond = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-cond" });

export const metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: `Compre online em ${site.name}.`,
};

export default async function RootLayout({ children }) {
  const cartId = (await cookies()).get("cartId")?.value;
  const [cart, collections, footer, session] = await Promise.all([
    getCart(cartId).catch(() => null),
    getCollections(20).catch(() => []),
    getFooter().catch(() => ({ columns: [], policies: [] })),
    readSession(),
  ]);
  const departments = await getDepartments(collections).catch(() => []);

  // Login pela Customer Account API; sem Client ID, o ícone abre /conta (que explica a configuração)
  const account = {
    loggedIn: session.loggedIn,
    name: session.name,
    href: session.loggedIn || !accountsEnabled ? "/conta" : "/api/auth/login?returnTo=/conta",
  };

  return (
    <html lang="pt-BR" className={`${body.variable} ${cond.variable}`}>
      <body>
        <CartProvider initialCart={cart}>
          <Header
            name={site.name}
            departments={departments}
            navLinks={site.nav.links}
            collections={collections}
            promo={site.nav.promo}
            account={account}
          />
          <main>{children}</main>
          <Newsletter />
          <Footer accountHref={account.href} columns={footer.columns} policies={footer.policies} />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
