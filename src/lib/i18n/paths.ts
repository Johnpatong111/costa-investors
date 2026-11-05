import { DEFAULT_LOCALE, LOCALES, stripLocale, type Locale } from "./config";
import { serviceKindFromSlug, serviceSlug } from "./service-slugs";

/**
 * ===========================================================================
 * TŁUMACZENIE ŚCIEŻEK (jedno źródło prawdy)
 * ===========================================================================
 * Ścieżka „logiczna” w tym projekcie zawsze używa polskiego sluga usługi
 * (bo tak zapisane są definicje i buildery PL). Ten moduł zamienia ją na
 * wariant językowy: segment usługi → slug z SERVICE_SLUGS, reszta bez zmian
 * (miasto i dzielnica są nieprzetłumaczalne).
 *
 * Używany przez: generateMetadata (canonical + hreflang), LanguageSwitcher
 * oraz sitemap.ts. Dzięki temu nie ma rozjazdu między tymi trzema miejscami.
 */

/** "/apartamenty-na-sprzedaz/torrevieja/la-mata" + "en" → "/en/apartments-for-sale/torrevieja/la-mata". */
export function translatePath(path: string, locale: Locale): string {
  const { path: bare } = stripLocale(path);
  const segments = bare.split("/").filter(Boolean);

  const first = segments[0];
  if (first) {
    const kind = serviceKindFromSlug(first);
    if (kind) segments[0] = serviceSlug(kind, locale);
  }

  return segments.length === 0 ? `/${locale}` : `/${locale}/${segments.join("/")}`;
}

/** Komplet wariantów językowych danej ścieżki (do hreflang). */
export function alternatePaths(path: string): Record<string, string> {
  const entries = LOCALES.map((locale) => [locale, translatePath(path, locale)] as const);
  return {
    ...Object.fromEntries(entries),
    "x-default": translatePath(path, DEFAULT_LOCALE),
  };
}

/** Wykrycie usługi z segmentu URL-a (dla przełącznika i routingu). */
export function serviceKindFromPath(path: string) {
  const { path: bare } = stripLocale(path);
  const first = bare.split("/").filter(Boolean)[0];
  return first ? serviceKindFromSlug(first) : undefined;
}
