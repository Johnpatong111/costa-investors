/* eslint-disable no-console */
import { existsSync } from "node:fs";
import { SERVICES, PRICE_REPORT } from "../src/lib/data/services";
import { getCities } from "../src/lib/data/repository";
import { translatePath } from "../src/lib/i18n/paths";
import { LOCALES, localePath, type Locale } from "../src/lib/i18n/config";

/**
 * ===========================================================================
 * AUDYT LINKÓW W STOPCE (CI: `npm run audit:links`)
 * ===========================================================================
 * Stopka buduje adresy dynamicznie (sługi, miasta, raporty), więc łatwo o link
 * do trasy, która nie istnieje — np. `/ceny-m2/{miasto}` nie ma własnego route'a
 * (jest tylko `/ceny-m2/{miasto}/{dzielnica}`). Skrypt odtwarza listę linków
 * dokładnie tak, jak robi to `site-footer.tsx`, i sprawdza, czy dla każdego
 * adresu istnieje zbudowany plik HTML.
 */

const builtRoot = ".next/server/app";

function builtFile(path: string): string | null {
  const clean = path.split("#")[0] ?? path;
  const candidates = [
    `${builtRoot}${clean}.html`,
    `${builtRoot}${clean}/index.html`,
    clean === "/pl" || clean === "/en" || clean === "/es" ? `${builtRoot}${clean}.html` : "",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

const guideService = SERVICES.find((service) => service.kind === "lead-magnet") ?? SERVICES[0];
const allCities = getCities();
const reportCities = ["torrevieja", "alicante", "benidorm", "calpe", "cartagena", "denia"]
  .map((slug) => allCities.find((city) => city.slug === slug))
  .filter((city): city is (typeof allCities)[number] => Boolean(city));

interface FooterLink {
  label: string;
  href: string;
}

function footerLinks(locale: Locale): FooterLink[] {
  const links: FooterLink[] = [];

  for (const service of SERVICES) {
    links.push({ label: `usługa:${service.slug}`, href: translatePath(`/${service.slug}`, locale) });
  }
  links.push({ label: "raporty (kol. usługi)", href: translatePath(`/${PRICE_REPORT.slug}`, locale) });

  links.push({ label: "ceny m² (nagłówek)", href: localePath(locale, `/${PRICE_REPORT.slug}`) });
  for (const city of reportCities) {
    links.push({
      label: `raport miasta:${city.slug}`,
      href: translatePath(`/${PRICE_REPORT.slug}/${city.slug}`, locale),
    });
  }

  if (guideService) {
    links.push({ label: "poradnik", href: translatePath(`/${guideService.slug}`, locale) });
  }
  links.push({ label: "kalkulator ROI", href: `${localePath(locale, "/")}#lead-form` });
  links.push({ label: "o nas", href: localePath(locale, "/o-nas") });
  links.push({ label: "polityka", href: localePath(locale, "/polityka-prywatnosci") });
  links.push({ label: "regulamin", href: localePath(locale, "/regulamin") });

  return links;
}

const missing: string[] = [];
let checked = 0;

for (const locale of LOCALES) {
  for (const link of footerLinks(locale)) {
    checked += 1;
    if (!builtFile(link.href)) {
      missing.push(`${locale.toUpperCase()} ${link.href}  (${link.label})`);
    }
  }
}

console.log("=== AUDYT LINKÓW W STOPCE ===");
console.log(`Sprawdzono linków: ${checked} (${LOCALES.length} języki)`);

if (missing.length === 0) {
  console.log("Wszystkie linki stopki prowadzą do zbudowanych stron.");
} else {
  console.log(`\nLinki bez strony (${missing.length}):`);
  missing.forEach((item) => console.log(`• ${item}`));
  process.exitCode = 1;
}
