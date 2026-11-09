import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";
import { getSitemapUrls } from "@/lib/seo/sitemap-data";

/**
 * robots.txt generowany na buildzie. Zawsze spĂłjny z liczbÄ… chunkĂłw sitemapy.
 *
 * Czego tu NIE ma:
 *  - `Disallow: /` (katastrofa),
 *  - blokowania `/_next/static` (Google potrzebuje CSS/JS do renderu),
 *  - parametrĂłw UTM (nie generujÄ… duplikatĂłw, bo canonical je neutralizuje).
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/panel/",
          "/dziekujemy",
          // Cloudflare Email Obfuscation generuje te adresy (404 w crawlach).
          "/cdn-cgi/",
          "/*?utm_",
          "/*?fbclid=",
          "/*?gclid=",
        ],
      },
      {
        // Boty AI-owe: Ĺ›wiadoma decyzja biznesowa. TreĹ›ci pSEO chcemy
        // w wynikach wyszukiwania, ale nie jako darmowe ĹşrĂłdĹ‚o do trenowania modeli.
        userAgent: ["GPTBot", "CCBot", "Google-Extended"],
        disallow: "/",
      },
    ],
    // Jedna, płaska sitemapa – standardowy plik XML bez indeksów i XSL.
    sitemap: getSitemapUrls(),
    host: SITE.url,
  };
}
