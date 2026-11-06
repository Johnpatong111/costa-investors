/**
 * ===========================================================================
 * KONFIGURACJA WITRYNY (jedno źródło prawdy dla SEO i schematów)
 * ===========================================================================
 * Wszystkie dane firmowe trafiają do JSON-LD (RealEstateAgent) i stopki.
 * UZUPEŁNIJ REALNYMI DANYMI przed produkcją - Google weryfikuje NAP
 * (Name, Address, Phone) z Wizytówką Google i innymi katalogami.
 */

const fallbackUrl = "https://costainvestors.eu";

function normalizeUrl(value: string | undefined): string {
  const raw = (value ?? fallbackUrl).trim().replace(/\/+$/, "");
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export const SITE = {
  brand: "Costa Investors",
  legalName: "Costa Investors",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "pl_PL",
  lang: "pl",
  /** Rok publikacji. Używany w title/description. Podnoś raz w roku. */
  year: 2026,
  tagline: "Nieruchomości w Hiszpanii dla Polaków",
  description:
    "Apartamenty, wille i domy inwestycyjne na Costa Blanca i Costa Cálida. Ceny €/m², analiza ROI, koszty zakupu i kontakt z certyfikowanym polskojęzycznym agentem.",
  phone: "+48 22 123 45 67",
  /** Format E.164. Wymagany przez schema.org i klik-to-call. */
  phoneHref: "+48221234567",
  email: "kontakt@costainvestors.eu",
  address: {
    street: "ul. Przykładowa 12/4",
    city: "Warszawa",
    postalCode: "00-001",
    region: "mazowieckie",
    country: "PL",
  },
  geo: { lat: 52.2297, lng: 21.0122 },
  openingHours: ["Mo-Fr 09:00-20:00", "Sa 10:00-14:00"],
  socials: ["https://www.facebook.com/", "https://www.linkedin.com/"],
  /**
   * Dynamiczny obraz OG generowany przez `next/og` (route `/og`).
   * W metadanych jest zawsze rozwijany do absolutnego URL-a domeny produkcyjnej.
   */
  ogImage: "/og" as string | null,
  /**
   * UWAGA: AggregateRating tylko dla prawdziwych, weryfikowalnych opinii.
   * Domyślnie wyłączone.
   */
  enableAggregateRating: false,
} as const;

export type SiteConfig = typeof SITE;

/** Absolutny URL. Używany w canonical, sitemapie i JSON-LD `@id`. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE.url : `${SITE.url}${normalized}`;
}
