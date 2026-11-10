import { SITE } from "@/lib/seo/site";
import { getSitemapIds } from "@/lib/seo/sitemap-data";
import { XML_HEADERS } from "@/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * SITEMAP INDEX: /sitemap-index.xml
 * ===========================================================================
 * Indeks wskazuje na chunki `/sitemaps/{id}.xml` (po 5 000 URL-i). Dzięki temu
 * każdy plik jest mały i szybki do pobrania, a Google dostaje standardowy
 * `<sitemapindex>`. Wcześniej ten adres zwracał 500, bo katalog routy był pusty.
 */

export const dynamic = "force-static";

export function GET() {
  const chunks = getSitemapIds();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...chunks.map(
      (id) => `  <sitemap>\n    <loc>${SITE.url}/sitemaps/${id}.xml</loc>\n  </sitemap>`,
    ),
    "</sitemapindex>",
    "",
  ].join("\n");

  return new Response(body, { headers: XML_HEADERS });
}
