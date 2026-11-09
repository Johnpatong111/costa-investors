import { getAllSitemapEntries } from "../src/lib/seo/sitemap-data";
import { getAllDistrictEntries, getCities, getRegion } from "../src/lib/data/repository";
import { SERVICES } from "../src/lib/data/services";
import { buildDistrictContent } from "../src/lib/content/district-content";
import { buildCityContent } from "../src/lib/content/city-content";
import { buildPriceReport } from "../src/lib/content/report-content";
import {
  buildLocalizedCityContent,
  buildLocalizedDistrictContent,
  buildLocalizedPriceReport,
} from "../src/lib/i18n/content/builders";
import { fitDescription, fitTitle } from "../src/lib/seo/metadata";
import { LOCALES, type Locale } from "../src/lib/i18n/config";

type Row = { url: string; title: string; description: string };

const rows: Row[] = [];

const add = (locale: Locale, path: string, title: string, description: string) => {
  rows.push({
    url: `https://costainvestors.eu/${locale}${path}`,
    title: fitTitle(title, locale),
    description: fitDescription(description, locale),
  });
};

for (const entry of getAllDistrictEntries()) {
  const path = (slug: string) => `/${slug}/${entry.city.slug}/${entry.district.slug}`;
  for (const service of SERVICES) {
    const pl = buildDistrictContent(entry, service);
    add("pl", path(service.slug), pl.metaTitle, pl.metaDescription);
    for (const locale of ["en", "es"] as const) {
      const localized = buildLocalizedDistrictContent(entry, service.kind, locale);
      if (localized) add(locale, path(service.slug), localized.metaTitle, localized.metaDescription);
    }
  }
  const reportPl = buildPriceReport(entry);
  add("pl", `/ceny-m2/${entry.city.slug}/${entry.district.slug}`, reportPl.metaTitle, reportPl.metaDescription);
  for (const locale of ["en", "es"] as const) {
    const report = buildLocalizedPriceReport(entry, locale);
    if (report) add(locale, `/ceny-m2/${entry.city.slug}/${entry.district.slug}`, report.metaTitle, report.metaDescription);
  }
}

for (const city of getCities()) {
  const region = getRegion(city.region);
  if (!region) continue;
  for (const service of SERVICES) {
    const pl = buildCityContent(city, region, service);
    add("pl", `/${service.slug}/${city.slug}`, pl.metaTitle, pl.metaDescription);
    for (const locale of ["en", "es"] as const) {
      const localized = buildLocalizedCityContent(city, region, service.kind, locale);
      if (localized) add(locale, `/${service.slug}/${city.slug}`, localized.metaTitle, localized.metaDescription);
    }
  }
}

const sitemapUrls = getAllSitemapEntries().map((entry) => entry.url);

const group = <T>(items: T[], key: (item: T) => string) => {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const value = key(item);
    map.set(value, [...(map.get(value) ?? []), item]);
  }
  return map;
};

const duplicates = (map: Map<string, Row[]>) =>
  [...map.entries()].filter(([, list]) => list.length > 1).sort((a, b) => b[1].length - a[1].length);

const titleDupes = duplicates(group(rows, (row) => row.title));
const descDupes = duplicates(group(rows, (row) => row.description));
const urlDupes = new Set(sitemapUrls).size !== sitemapUrls.length;

console.log(`Wyrenderowanych stron (treść): ${rows.length}`);
console.log(`URL-i w sitemapie: ${sitemapUrls.length} | duplikaty URL: ${urlDupes ? "TAK" : "nie"}`);
console.log(`Tytuły: unikalne ${rows.length - titleDupes.reduce((sum, [, list]) => sum + list.length, 0)} | grup duplikatów: ${titleDupes.length}`);
console.log(`Opisy:  unikalne ${rows.length - descDupes.reduce((sum, [, list]) => sum + list.length, 0)} | grup duplikatów: ${descDupes.length}`);

for (const [title, list] of titleDupes.slice(0, 8)) {
  console.log(`\nDUP TITLE (${list.length}x): ${title}`);
  list.slice(0, 3).forEach((row) => console.log(`   ${row.url}`));
}
for (const [desc, list] of descDupes.slice(0, 5)) {
  console.log(`\nDUP DESC (${list.length}x): ${desc.slice(0, 90)}…`);
  list.slice(0, 3).forEach((row) => console.log(`   ${row.url}`));
}
