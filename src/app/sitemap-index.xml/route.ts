import { getSitemapUrls } from "@/lib/seo/sitemap-data";

/**
 * ===========================================================================
 * INDEKS SITEMAP (serwowany jako /sitemap.xml przez rewrite)
 * ===========================================================================
 * Next rezerwuje /sitemap.xml dla własnego metadata route, dlatego fizyczny
 * plik żyje pod /sitemap-index.xml, a `next.config.ts` mapuje na niego
 * /sitemap.xml. Efekt: jeden adres do zgłoszenia w Search Console.
 */
export const dynamic = "force-static";

export function GET() {
  const urls = getSitemapUrls();

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <sitemap><loc>${url}</loc></sitemap>`),
    "</sitemapindex>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
