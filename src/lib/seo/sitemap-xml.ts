import { SITE } from "./site";
import type { SitemapEntry } from "./sitemap-data";

/**
 * ===========================================================================
 * SERIALIZACJA XML SITEMAP
 * ===========================================================================
 * Nextowe `app/sitemap.ts` nie pozwala wstrzyknąć deklaracji arkusza stylów,
 * dlatego mapy generujemy ręcznie. Dzięki temu każdy plik (indeks i chunki)
 * zaczyna się od `<?xml-stylesheet?>`, a przeglądarka renderuje czytelny UI
 * z `public/sitemap.xsl` zamiast surowego drzewa XML.
 */

const XSL_HREF = "/sitemap.xsl";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const declaration = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<?xml-stylesheet type="text/xsl" href="${XSL_HREF}"?>`,
].join("\n");

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
} as const;

/** Indeks: lista plików chunkowanych map. */
export function toSitemapIndexXml(chunkUrls: string[], lastModified: string): string {
  return [
    declaration,
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...chunkUrls.map(
      (url) =>
        `  <sitemap><loc>${escapeXml(url)}</loc><lastmod>${lastModified}</lastmod></sitemap>`,
    ),
    "</sitemapindex>",
    "",
  ].join("\n");
}

/** Pojedynczy chunk: URL-e z alternatywami językowymi. */
export function toSitemapUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const lines = [
      "  <url>",
      `    <loc>${escapeXml(entry.url)}</loc>`,
      `    <lastmod>${entry.lastModified}</lastmod>`,
      `    <changefreq>${entry.changeFrequency}</changefreq>`,
      `    <priority>${entry.priority.toFixed(1)}</priority>`,
    ];

    for (const [locale, href] of Object.entries(entry.alternates ?? {})) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}"/>`,
      );
    }

    lines.push("  </url>");
    return lines.join("\n");
  });

  return [
    declaration,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** Absolutny adres indeksu. Używany w robots.txt. */
export const sitemapIndexUrl = `${SITE.url}/sitemap.xml`;
