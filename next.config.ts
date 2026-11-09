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
      // Historyczne i błędne warianty slugów lead magnetu (Screaming Frog: 404).
      ["darmowy-przewodnik-analiza-ofert", "/pl/darmowy-przewodnik-wycena"],
      ["darmowy-przewodnik", "/pl/darmowy-przewodnik-wycena"],
      ["przewodnik-i-oferty", "/pl/darmowy-przewodnik-wycena"],
      ["przewodnik-zakupu", "/pl/darmowy-przewodnik-wycena"],
      ["free-buying-guide", "/pl/darmowy-przewodnik-wycena"],
      ["guia-gratis-compra", "/pl/darmowy-przewodnik-wycena"],
      // Slugi EN/ES bez prefiksu języka → kanoniczne wersje PL (DEFAULT_LOCALE).
      ["apartments-for-sale", "/pl/apartamenty-na-sprzedaz"],
      ["apartamentos-en-venta", "/pl/apartamenty-na-sprzedaz"],
      ["villas-with-pool", "/pl/wille-z-basenem"],
      ["villas-con-piscina", "/pl/wille-z-basenem"],
      ["investment-properties", "/pl/domy-inwestycyjne"],
      ["inmuebles-de-inversion", "/pl/domy-inwestycyjne"],
      ["propiedades-de-inversion", "/pl/domy-inwestycyjne"],
      ["ceny-m2", "/pl/ceny-m2"],
      ["o-nas", "/pl/o-nas"],
      ["polityka-prywatnosci", "/pl/polityka-prywatnosci"],
      ["regulamin", "/pl/regulamin"],
    ] as const;

    // Uszkodzone warianty slugu (spacja w adresie) trafiały na 404.
    const legacyPrefixed = [
      ["/pl/darmowy-przewodnik-analiza ofert", "/pl/darmowy-przewodnik-wycena"],
      ["/pl/darmowy-przewodnik-analiza-ofert", "/pl/darmowy-przewodnik-wycena"],
      ["/en/darmowy-przewodnik-analiza ofert", "/en/free-buying-guide"],
      ["/en/darmowy-przewodnik-analiza-ofert", "/en/free-buying-guide"],
      ["/es/darmowy-przewodnik-analiza ofert", "/es/guia-gratis-compra"],
      ["/es/darmowy-przewodnik-analiza-ofert", "/es/guia-gratis-compra"],
    ] as const;

    return [
      ...legacy.flatMap(([source, destination]) => [
        { source: `/${source}`, destination, statusCode: 301 as const },
        {
          source: `/${source}/:path*`,
          destination: `${destination}/:path*`,
          statusCode: 301 as const,
        },
      ]),
      ...legacyPrefixed.flatMap(([source, destination]) => [
        { source, destination, statusCode: 301 as const },
        { source: `${source}/:path*`, destination: `${destination}/:path*`, statusCode: 301 as const },
      ]),
    ];
  },
  async rewrites() {
    return [];
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
        // Google i przeglądarki muszą dostać czysty XML, nigdy text/plain.
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Bez `filename=`, żeby przeglądarka renderowała XML zamiast pobierać plik.
          { key: "Content-Disposition", value: "inline" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
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
