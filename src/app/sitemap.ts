import type { MetadataRoute } from "next";
import { getAllSitemapEntries } from "@/lib/seo/sitemap-data";

/**
 * ===========================================================================
 * /sitemap.xml — wbudowany mechanizm Next.js
 * ===========================================================================
 * Next serializuje `MetadataRoute.Sitemap` do poprawnego dokumentu XML
 * (`<urlset>`, `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
 * oraz `xhtml:link` dla hreflang) i serwuje go z `application/xml`.
 * Bez XSL, bez indeksów i bez ręcznego sklejania stringów.
 */
export const dynamic = "force-static";
export const revalidate = 86_400;

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries().map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.alternates ? { alternates: { languages: entry.alternates } } : {}),
  }));
}
