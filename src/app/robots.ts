import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";
import { getSitemapUrls } from "@/lib/seo/sitemap-data";

/**
 * robots.txt generowany na buildzie – zawsze spójny z liczbą chunków sitemapy.
 *
 * Czego tu NIE ma:
 *  - `Disallow: /` (katastrofa),
 *  - blokowania `/_next/static` (Google potrzebuje CSS/JS do renderu),
 *  - parametrów UTM (nie generują duplikatów, bo canonical je neutralizuje).
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
          "/*?utm_",
          "/*?fbclid=",
          "/*?gclid=",
        ],
      },
      {
        // Boty AI-owe: świadoma decyzja biznesowa – treści pSEO chcemy
        // w wynikach wyszukiwania, ale nie jako darmowe źródło do trenowania modeli.
        userAgent: ["GPTBot", "CCBot", "Google-Extended"],
        disallow: "/",
      },
    ],
    // Indeks sitemap – jeden adres dla Search Console, spina wszystkie chunki.
    sitemap: [`${SITE.url}/sitemap.xml`, ...getSitemapUrls()],
    host: SITE.url,
  };
}
