import type { SitemapEntry } from "./sitemap-data";

/**
 * Serializacja sitemapy: czysty, standardowy XML zgodny ze specyfikacją
 * sitemaps.org. Bez arkuszy XSL, bez indeksów i bez deklaracji stylów,
 * żeby Googlebot pobierał plik bezpośrednio, bez przekierowań.
 */

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
} as const;

/** Pojedyncza, płaska sitemapa z alternatywami językowymi (hreflang). */
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
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}
