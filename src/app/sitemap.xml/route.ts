import { getAllSitemapEntries } from "@/lib/seo/sitemap-data";
import { toSitemapUrlsetXml, XML_HEADERS } from "@/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * /sitemap.xml — CZYTELNY XML (pretty print)
 * ===========================================================================
 * Wbudowany `MetadataRoute.Sitemap` minifikuje dokument do jednej linii.
 * Ten handler buduje XML ręcznie: deklaracja, `<urlset>` z `xmlns:xhtml`,
 * każdy `<url>` w osobnych liniach z wcięciem, `xhtml:link` dla pl/en/es
 * oraz `x-default`. Nagłówek: `application/xml; charset=utf-8`.
 */
export const dynamic = "force-static";
export const revalidate = 86_400;

export function GET() {
  return new Response(toSitemapUrlsetXml(getAllSitemapEntries()), {
    headers: XML_HEADERS,
  });
}
