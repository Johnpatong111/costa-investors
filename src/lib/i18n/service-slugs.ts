import type { ServiceKind } from "../data/services/types";
import type { Locale } from "./config";

/**
 * Slug usługi per język. Kanoniczny identyfikator to `ServiceKind`
 * (buy / villa / investment / lead-magnet); slug jest tylko warstwą URL.
 *
 * Dzięki temu:
 *  - routing i sitemapa nie znają treści, tylko mapę,
 *  - dodanie języka = dopisanie kolumny, nie nowego serwisu,
 *  - stare polskie URL-e pozostają nietknięte (SEO continuity).
 */
export const SERVICE_SLUGS: Record<ServiceKind, Record<Locale, string>> = {
  buy: {
    pl: "apartamenty-na-sprzedaz",
    en: "apartments-for-sale",
    es: "apartamentos-en-venta",
  },
  villa: {
    pl: "wille-z-basenem",
    en: "villas-with-pool",
    es: "villas-con-piscina",
  },
  investment: {
    pl: "domy-inwestycyjne",
    en: "investment-properties",
    es: "propiedades-de-inversion",
  },
  "lead-magnet": {
    pl: "darmowy-przewodnik-wycena",
    en: "free-buying-guide",
    es: "guia-gratis-compra",
  },
};

export function serviceSlug(kind: ServiceKind, locale: Locale): string {
  return SERVICE_SLUGS[kind][locale];
}

/** Odwrotne mapowanie: slug z URL-a → kanoniczny rodzaj usługi. */
export function serviceKindFromSlug(slug: string, locale?: Locale): ServiceKind | undefined {
  const entries = Object.entries(SERVICE_SLUGS) as [ServiceKind, Record<Locale, string>][];

  if (locale) {
    const direct = entries.find(([, slugs]) => slugs[locale] === slug);
    if (direct) return direct[0];
  }

  const any = entries.find(([, slugs]) => Object.values(slugs).includes(slug));
  return any?.[0];
}

/** Wszystkie slugi danej usługi (do walidacji kolizji i redirectów). */
export function allServiceSlugs(kind: ServiceKind): string[] {
  return Object.values(SERVICE_SLUGS[kind]);
}

/**
 * Hub raportów cenowych (`/ceny-m2`, `/property-prices`, `/precios-m2`).
 * To nie jest usługa, więc ma własną mapę slugów per język. Dzięki temu
 * angielskie i hiszpańskie strony nie mają polskiego segmentu w URL-u.
 */
export const PRICE_REPORT_SLUGS: Record<Locale, string> = {
  pl: "ceny-m2",
  en: "property-prices",
  es: "precios-m2",
};

/** Slug hubu cen dla języka (PL jest historycznym, kanonicznym wariantem). */
export function priceReportSlug(locale: Locale): string {
  return PRICE_REPORT_SLUGS[locale];
}

/** Czy segment URL-a należy do hubu cen (w dowolnym języku). */
export function isPriceReportSlug(slug: string): boolean {
  return Object.values(PRICE_REPORT_SLUGS).includes(slug);
}
