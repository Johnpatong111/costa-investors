/**
 * ===========================================================================
 * KONFIGURACJA i18n (PL / EN / ES)
 * ===========================================================================
 * Jeden język = jeden prefiks URL. Każda wersja jest osobnym adresem
 * (bez negocjacji treści po nagłówku Accept-Language po pierwszym wejściu) –
 * to warunek poprawnego indeksowania i hreflang.
 *
 * PL jest językiem domyślnym i JEDYNYM, który ma historyczne URL-e bez
 * prefiksu → middleware robi 301 na /pl/... (bez utraty link equity).
 */

export const LOCALES = ["pl", "en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pl";

/**
 * Języki, które mają FAKTYCZNIE wdrożone trasy `app/[lang]/...`.
 * Etap migracji: dopóki trasa EN/ES nie istnieje, nie wolno emitować
 * hreflang ani przekierowań – Google dostałby 404.
 * Po przeniesieniu routingu zmień na `[...LOCALES]`.
 */
export const ROUTABLE_LOCALES: Locale[] = ["pl", "en", "es"];

/**
 * Języki z PRZETŁUMACZONĄ treścią body (nie tylko UI).
 * Wszystkie trzy języki mają komplet treści (`content/en.ts`, `content/es.ts`)
 * oraz wpięty routing po lokalizowanych slugach, więc hreflang może być
 * emitowany bez ryzyka 404.
 */
export const LOCALIZED_LOCALES: Locale[] = ["pl", "en", "es"];

/** Etykiety dla przełącznika języka i schema.org inLanguage. */
export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  pl: { label: "Polski", htmlLang: "pl", ogLocale: "pl_PL" },
  en: { label: "English", htmlLang: "en", ogLocale: "en_GB" },
  es: { label: "Español", htmlLang: "es", ogLocale: "es_ES" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Nieobsługiwany język: "${value}". Dostępne: ${LOCALES.join(", ")}`);
  }
  return value;
}

/** "/apartamenty-na-sprzedaz/torrevieja" → "/en/apartments-for-sale/torrevieja". */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/**
 * Usuwa prefiks języka ze ścieżki: "/en/apartments-for-sale" → "/apartments-for-sale".
 * Zwraca też informację, czy prefiks istniał.
 */
export function stripLocale(pathname: string): { locale: Locale | null; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  if (first && isLocale(first)) {
    return { locale: first, path: rest.length > 0 ? `/${rest.join("/")}` : "/" };
  }
  return { locale: null, path: pathname || "/" };
}

/**
 * Kompletny blok `alternates` dla Next Metadata: każdy język + x-default.
 * `buildPath` dostaje locale i zwraca ścieżkę bez prefiksu (np. "/torrevieja").
 */
export function languageAlternates(
  buildPath: (locale: Locale) => string,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[LOCALE_META[locale].htmlLang] = localePath(locale, buildPath(locale));
  }
  alternates["x-default"] = localePath(DEFAULT_LOCALE, buildPath(DEFAULT_LOCALE));
  return alternates;
}

/** Wszystkie warianty językowe danego zasobu – do sitemapy (xhtml:link). */
export function localeVariants(buildPath: (locale: Locale) => string): {
  locale: Locale;
  url: string;
}[] {
  return LOCALES.map((locale) => ({ locale, url: localePath(locale, buildPath(locale)) }));
}
