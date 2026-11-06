import { LOCATIONS } from "@/lib/data/load";
import { getSitemapUrls } from "@/lib/seo/sitemap-data";
import { toSitemapIndexXml, XML_HEADERS } from "@/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * /sitemap.xml → INDEKS MAP (rewrite na /sitemap-index.xml)
 * ===========================================================================
 * Serwowany pod adresem zgłaszanym w robots.txt i Search Console.
 * Zawiera deklarację `<?xml-stylesheet?>` → przeglądarka renderuje UI
 * z `public/sitemap.xsl` zamiast surowego XML-a.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(toSitemapIndexXml(getSitemapUrls(), LOCATIONS.updatedAt), {
    headers: XML_HEADERS,
  });
}
