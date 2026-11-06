import { getMenu } from "./shopify";
import { localHref } from "./links";
import { site } from "@/site.config";

// Departamentos: menu da Shopify (handle em site.nav.menuHandle) ou, se não existir, as coleções.
export async function getDepartments(collections) {
  if (site.nav.menuHandle) {
    const menu = await getMenu(site.nav.menuHandle).catch(() => null);
    if (menu?.items?.length) {
      return menu.items.map((i) => ({
        title: i.title,
        ...localHref(i.url),
        children: (i.items ?? []).map((c) => ({ title: c.title, ...localHref(c.url) })),
      }));
    }
  }
  return collections.map((c) => ({ title: c.title, href: `/categorias/${c.handle}`, external: false, children: [] }));
}
