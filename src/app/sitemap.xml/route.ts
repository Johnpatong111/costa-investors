import { getAllSitemapEntries } from "@/lib/seo/sitemap-data";
import { toSitemapUrlsetXml, XML_HEADERS } from "@/lib/seo/sitemap-xml";

/**
 * /sitemap.xml — jedna, płaska mapa witryny.
 *
 * Standard sitemaps.org: `<urlset>` z `<loc>`, `<lastmod>`, `<changefreq>`,
 * `<priority>` i `xhtml:link` dla wersji PL/EN/ES. Bez XSL, bez indeksu
 * i bez rewrite, więc Search Console pobiera plik bezpośrednio.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(toSitemapUrlsetXml(getAllSitemapEntries()), {
    headers: XML_HEADERS,
  });
}
