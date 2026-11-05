import type { NextConfig } from "next";

/**
 * Uwaga architektoniczna:
 * - NIE używamy `output: "export"`, bo mamy API route /api/leads (webhooki) oraz ISR.
 * - Jeśli potrzebujesz czystego statycznego hostingu (S3/Cloudflare Pages),
 *   przenieś endpoint leadów do zewnętrznej funkcji (np. Cloudflare Worker)
 *   i dopiero wtedy ustaw `output: "export"` + `dynamicParams = false`.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  images: {
    // Dla zdjęć dzielnic/okolic dodaj tu swoje CDN, np. { protocol: "https", hostname: "cdn.costainvestors.eu" }
    remotePatterns: [],
  },
  async redirects() {
    // 301 ze starych, bezprefiksowych adresów PL na wersje /pl/... .
    // Middleware ogarnia resztę (308), ale te wpisy zostawiają czytelny,
    // jawny kontrakt dla najbardziej wartościowych ścieżek.
    const legacy = [
      ["apartamenty-na-sprzedaz", "/pl/apartamenty-na-sprzedaz"],
      ["wille-z-basenem", "/pl/wille-z-basenem"],
      ["domy-inwestycyjne", "/pl/domy-inwestycyjne"],
      ["darmowy-przewodnik-wycena", "/pl/darmowy-przewodnik-wycena"],
      ["ceny-m2", "/pl/ceny-m2"],
      ["o-nas", "/pl/o-nas"],
      ["polityka-prywatnosci", "/pl/polityka-prywatnosci"],
      ["regulamin", "/pl/regulamin"],
    ] as const;

    return legacy.flatMap(([source, destination]) => [
      { source: `/${source}`, destination, statusCode: 301 as const },
      { source: `/${source}/:path*`, destination: `${destination}/:path*`, statusCode: 301 as const },
    ]);
  },
  async rewrites() {
    // /sitemap.xml to adres zgłaszany w robots.txt i Search Console.
    // Next rezerwuje tę ścieżkę dla własnego metadata route (który przy
    // chunkowaniu generuje tylko /sitemap/{id}.xml), więc serwujemy pod nią
    // nasz indeks. Bez tego /sitemap.xml wpadał w trasę [lang] i zwracał 500.
    return [{ source: "/sitemap.xml", destination: "/sitemap-index.xml" }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Strony pSEO są statyczne/ISR – długi cache na CDN.
        source: "/:service/:city/:district",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
