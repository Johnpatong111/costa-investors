import { LOCATIONS } from "../data/load";
import { getAllDistrictEntries, getCities } from "../data/repository";
import { PRICE_REPORT, SERVICES } from "../data/services";
import { deriveCityStats, deriveDistrictStats } from "../content/market-stats";
import { absoluteUrl, SITE } from "./site";
import { DEFAULT_LOCALE, ROUTABLE_LOCALES, type Locale } from "../i18n/config";
import { translatePath } from "../i18n/paths";

/**
 * ===========================================================================
 * DANE SITEMAPY
 * ===========================================================================
 * Zasady:
 *  - limit protokołu to 50 000 URL / 50 MB, więc dzielimy na chunki po 5 000,
 *  - do sitemapy trafiają TYLKO strony indeksowalne (`stats.reliable`),
 *  - `alternates.languages` (hreflang) emitowane są wyłącznie dla języków,
 *    które mają wdrożone trasy (ROUTABLE_LOCALES). Brak 404 dla robotów.
 */

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  /** Warianty językowe (hreflang). Obecne dopiero po migracji tras. */
  alternates?: Record<string, string>;
}

export const SITEMAP_CHUNK_SIZE = 5_000;

/** Adres z prefiksem języka. Sitemapa musi wskazywać finalne URL-e (bez redirectów). */
interface LogicalEntry {
  path: string;
  lastModified: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}

/** Wpis logiczny (polski slug usługi). Rozwijany na języki w getAllSitemapEntries. */
const logical = (
  path: string,
  options: { changeFrequency: SitemapEntry["changeFrequency"]; priority: number },
): LogicalEntry => ({ path, lastModified: LAST_MODIFIED, ...options });

const LAST_MODIFIED = LOCATIONS.updatedAt;

function servicePaths(): LogicalEntry[] {
  return SERVICES.map((service) =>
    logical(`/${service.slug}`, { changeFrequency: "weekly", priority: 0.9 }),
  );
}

function cityPaths(): LogicalEntry[] {
  const entries: LogicalEntry[] = [];
  for (const city of getCities()) {
    const region = LOCATIONS.regions.find((item) => item.slug === city.region);
    if (!region) continue;
    const stats = deriveCityStats(city, region);
    if (!stats.reliable) continue;

    for (const service of SERVICES) {
      entries.push(
        logical(`/${service.slug}/${city.slug}`, {
          changeFrequency: "weekly",
          priority: city.tier === 1 ? 0.9 : city.tier === 2 ? 0.8 : 0.7,
        }),
      );
    }
  }
  return entries;
}

function districtPaths(): LogicalEntry[] {
  const entries: LogicalEntry[] = [];
  for (const entry of getAllDistrictEntries()) {
    const stats = deriveDistrictStats(entry.city, entry.district, entry.region);
    if (!stats.reliable) continue;

    for (const service of SERVICES) {
      entries.push(
        logical(`/${service.slug}/${entry.city.slug}/${entry.district.slug}`, {
          changeFrequency: entry.city.tier === 1 ? "weekly" : "monthly",
          priority: entry.city.tier === 1 ? 0.8 : 0.6,
        }),
      );
    }

    entries.push(
      logical(`/${PRICE_REPORT.slug}/${entry.city.slug}/${entry.district.slug}`, {
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    );
  }
  return entries;
}

/** Statyczne strony informacyjne i prawne. */
function staticPaths(): LogicalEntry[] {
  return [
    logical("/", { changeFrequency: "daily", priority: 1 }),
    logical("/o-nas", { changeFrequency: "monthly", priority: 0.5 }),
    // Hub raportów cenowych. Wejście do 70 raportów dzielnicowych.
    logical(`/${PRICE_REPORT.slug}`, { changeFrequency: "monthly", priority: 0.7 }),
    logical("/polityka-prywatnosci", { changeFrequency: "yearly", priority: 0.2 }),
    logical("/regulamin", { changeFrequency: "yearly", priority: 0.2 }),
  ];
}

/**
 * Rozwija wpisy logiczne na wszystkie wdrożone języki.
 * Każdy URL dostaje komplet `alternates` (hreflang) + `x-default` → PL,
 * dzięki czemu Google widzi spójną klastrę językową bez 404.
 */
function expandAndLocalize(entries: LogicalEntry[]): SitemapEntry[] {
  const locales = ROUTABLE_LOCALES.length > 0 ? ROUTABLE_LOCALES : [DEFAULT_LOCALE];

  return entries.flatMap((entry) => {
    const alternates: Record<string, string> = Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(translatePath(entry.path, locale as Locale))]),
    );
    alternates["x-default"] = absoluteUrl(translatePath(entry.path, DEFAULT_LOCALE));

    return locales.map((locale) => ({
      url: absoluteUrl(translatePath(entry.path, locale as Locale)),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: locales.length > 1 ? { ...alternates } : undefined,
    }));
  });
}

/** Pełna lista URL. Używana przez QA i robots.ts do policzenia chunków. */
export function getAllSitemapEntries(): SitemapEntry[] {
  return expandAndLocalize([
    ...staticPaths(),
    ...servicePaths(),
    ...cityPaths(),
    ...districtPaths(),
  ]);
}

export function getSitemapIds(): number[] {
  const total = getAllSitemapEntries().length;
  const chunks = Math.max(1, Math.ceil(total / SITEMAP_CHUNK_SIZE));
  return Array.from({ length: chunks }, (_value, index) => index);
}

export function getSitemapChunk(id: number): SitemapEntry[] {
  if (!Number.isFinite(id) || id < 0) return [];
  const entries = getAllSitemapEntries();
  const start = Math.floor(id) * SITEMAP_CHUNK_SIZE;
  return entries.slice(start, start + SITEMAP_CHUNK_SIZE);
}

export function getSitemapUrls(): string[] {
  return getSitemapIds().map((id) => `${SITE.url}/sitemaps/${id}.xml`);
}
