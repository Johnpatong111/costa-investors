/* eslint-disable no-console */
import { getMissingPlaceholders, resetMissingPlaceholders } from "../src/lib/content/interpolate";
import { contentToPlainText, type PageContent } from "../src/lib/content/content-utils";
import { buildDistrictContent } from "../src/lib/content/district-content";
import { buildCityContent } from "../src/lib/content/city-content";
import { buildPriceReport } from "../src/lib/content/report-content";
import { buildServiceFallbackVars, interpolateBenefits, interpolateChecklist } from "../src/lib/content/service-copy";
import {
  buildLocalizedCityContent,
  buildLocalizedDistrictContent,
  buildLocalizedPriceReport,
} from "../src/lib/i18n/content/builders";
import { getAllDistrictEntries, getCities, getRegion } from "../src/lib/data/repository";
import { SERVICES } from "../src/lib/data/services";
import { validateDataset } from "../src/lib/data/validate";
import type { Locale } from "../src/lib/i18n/config";
import { fitDescription, fitTitle, serpCompliance } from "../src/lib/seo/metadata";

/**
 * ===========================================================================
 * QA DANYCH I TREÅšCI (CI: `npm run validate:data`)
 * ===========================================================================
 * Sprawdza: integralnoÅ›Ä‡ danych, brakujÄ…ce placeholdery, duplikaty treÅ›ci
 * (Jaccard na 5-gramach sÅ‚Ã³w), limity title/description i powtÃ³rzone H1.
 */

/** ZbiÃ³r 5-gramÃ³w sÅ‚Ã³w; cyfry normalizowane, Å¼eby liczby nie maskowaÅ‚y duplikatu. */
function shingles(text: string, size = 5): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-zÄ…Ä‡Ä™Å‚Å„Ã³Å›ÅºÅ¼0-9\s]/g, " ")
    .replace(/\d+/g, "#")
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set<string>();
  for (let index = 0; index + size <= words.length; index += 1) {
    set.add(words.slice(index, index + size).join(" "));
  }
  return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const item of small) {
    if (large.has(item)) intersection += 1;
  }
  return intersection / (a.size + b.size - intersection);
}

function main() {
  resetMissingPlaceholders();

  const datasetReport = validateDataset();
  const pages: { key: string; content: PageContent }[] = [];

  for (const entry of getAllDistrictEntries()) {
    for (const service of SERVICES) {
      pages.push({
        key: `${service.slug}/${entry.city.slug}/${entry.district.slug}`,
        content: buildDistrictContent(entry, service),
      });
    }
    pages.push({
      key: `ceny-m2/${entry.city.slug}/${entry.district.slug}`,
      content: buildPriceReport(entry),
    });
  }

  for (const city of getCities()) {
    const region = getRegion(city.region);
    if (!region) continue;
    for (const service of SERVICES) {
      pages.push({
        key: `${service.slug}/${city.slug}`,
        content: buildCityContent(city, region, service),
      });
    }
  }

  const issues: string[] = [];
  const warnings: string[] = [];
  const h1Index = new Map<string, string[]>();
  const signatures: { key: string; shingles: Set<string> }[] = [];

  for (const missing of getMissingPlaceholders()) {
    issues.push(`Brak placeholdera "{${missing}}" w szablonach treÅ›ci.`);
  }

  for (const page of pages) {
    const { key, content } = page;

    if (content.metaTitle.length > 62) {
      warnings.push(`${key}: title ${content.metaTitle.length} znakÃ³w (>62).`);
    }
    if (content.metaDescription.length > 165) {
      warnings.push(`${key}: description ${content.metaDescription.length} znakÃ³w (>165).`);
    }
    if (!content.isIndexable) {
      warnings.push(`${key}: noindex â€“ ${content.noindexReason ?? "brak powodu"}.`);
    }

    h1Index.set(content.h1, [...(h1Index.get(content.h1) ?? []), key]);
    signatures.push({ key, shingles: shingles(contentToPlainText(content)) });
  }

  // Brama: ¿aden wygenerowany tekst nie mo¿e zawieraæ surowego {placeholder}.
  // Ten b³¹d pojawi³ siê realnie na hubie us³ugi (opisy korzyœci bez interpolacji).
  const PLACEHOLDER = /\{[a-zA-Z][a-zA-Z0-9]*\}/g;
  const scanForPlaceholders = (key: string, text: string) => {
    const found = text.match(PLACEHOLDER);
    if (found && found.length > 0) {
      const unique = [...new Set(found)].join(", ");
      issues.push(`${key}: niepodmienione placeholdery › ${unique}`);
    }
  };

  for (const page of pages) {
    scanForPlaceholders(page.key, contentToPlainText(page.content));
  }

  // Copy us³ug na stronach zbiorczych (hub us³ugi, strona g³ówna).
  const fallbackVars = buildServiceFallbackVars({
    areaName: "Hiszpania",
    medianPricePerM2: 2400,
    rentalYield: 5.9,
    priceGrowth: 8.5,
  });
  for (const service of SERVICES) {
    scanForPlaceholders(
      `service-copy/${service.slug}`,
      interpolateBenefits(service, fallbackVars)
        .flatMap((benefit) => [benefit.title, benefit.description])
        .join(" "),
    );
    scanForPlaceholders(
      `service-checklist/${service.slug}`,
      interpolateChecklist(service, fallbackVars).join(" "),
    );
  }

  // ---------------------------------------------------------------------
  // EN / ES: ta sama brama jakoœci dla zlokalizowanych builderów.
  // ---------------------------------------------------------------------
  const localized = new Map<"en" | "es", { key: string; text: string }[]>();

  for (const locale of ["en", "es"] as const) {
    const collected: { key: string; text: string }[] = [];

    for (const entry of getAllDistrictEntries()) {
      for (const service of SERVICES) {
        const page = buildLocalizedDistrictContent(entry, service.kind, locale);
        if (page) collected.push({ key: `${locale}/${page.key}`, text: contentToPlainText(page) });
      }
      const report = buildLocalizedPriceReport(entry, locale);
      if (report) collected.push({ key: `${locale}/${report.key}`, text: contentToPlainText(report) });
    }

    for (const city of getCities()) {
      const region = getRegion(city.region);
      if (!region) continue;
      for (const service of SERVICES) {
        const page = buildLocalizedCityContent(city, region, service.kind, locale);
        if (page) collected.push({ key: `${locale}/${page.key}`, text: contentToPlainText(page) });
      }
    }

    for (const item of collected) scanForPlaceholders(item.key, item.text);
    localized.set(locale, collected);
  }

  for (const [locale, items] of localized) {
    const signatures = items.map((item) => ({ key: item.key, shingles: shingles(item.text) }));
    let worst = 0;
    let pair = "";
    for (let i = 0; i < signatures.length; i += 1) {
      for (let j = i + 1; j < signatures.length; j += 1) {
        const a = signatures[i];
        const b = signatures[j];
        if (!a || !b) continue;
        const score = jaccard(a.shingles, b.shingles);
        if (score > worst) {
          worst = score;
          pair = `${a.key} ? ${b.key}`;
        }
      }
    }
    console.log(`${locale.toUpperCase()}: stron ${items.length}, max podobieñstwo ${worst.toFixed(2)} (${pair || "—"})`);
    if (worst >= 0.88) {
      issues.push(`${locale}: para stron >= 0.88 › ${pair}`);
    }
  }

  for (const [h1, keys] of h1Index) {
    if (keys.length > 1) {
      warnings.push(
        `PowtÃ³rzony H1 (${keys.length}Ã—): "${h1.slice(0, 60)}â€¦" â†’ ${keys.slice(0, 3).join(", ")}`,
      );
    }
  }

  const REVIEW_THRESHOLD = 0.62;
  // Prog zaostrzony po przebudowie generatorow: max zbieznosci spadl z 0.88 do ~0.78.
const ERROR_THRESHOLD = 0.8;

  const duplicates: { a: string; b: string; score: number }[] = [];
  for (let i = 0; i < signatures.length; i += 1) {
    for (let j = i + 1; j < signatures.length; j += 1) {
      const a = signatures[i];
      const b = signatures[j];
      if (!a || !b) continue;
      const score = jaccard(a.shingles, b.shingles);
      if (score >= REVIEW_THRESHOLD) duplicates.push({ a: a.key, b: b.key, score });
    }
  }
  duplicates.sort((x, y) => y.score - x.score);

  const severe = duplicates.filter((duplicate) => duplicate.score >= ERROR_THRESHOLD);
  if (severe.length > 0) {
    issues.push(
      `${severe.length} par stron przekracza prÃ³g podobieÅ„stwa ${ERROR_THRESHOLD} (ryzyko duplicate content).`,
    );
  }

  // === SERP: title 55–60 znaków, description 145–155 znaków ===
  const serpFailures: string[] = [];
  const serpLocales: Locale[] = ["pl", "en", "es"];

  for (const entry of getAllDistrictEntries()) {
    for (const service of SERVICES) {
      const key = `${service.slug}/${entry.city.slug}/${entry.district.slug}`;
      for (const locale of serpLocales) {
        const localized =
          locale === "pl"
            ? buildDistrictContent(entry, service)
            : buildLocalizedDistrictContent(entry, service.kind, locale);
        if (!localized) continue;

        const title = serpCompliance(fitTitle(localized.metaTitle, locale), "title");
        const description = serpCompliance(
          fitDescription(localized.metaDescription, locale),
          "description",
        );
        if (!title.ok) serpFailures.push(`${locale.toUpperCase()} title ${title.length} – ${key}`);
        if (!description.ok) {
          serpFailures.push(`${locale.toUpperCase()} description ${description.length} – ${key}`);
        }
      }
    }
  }

  if (serpFailures.length > 0) {
    console.log(`\n=== SERP POZA WIDE£KAMI (${serpFailures.length}) ===`);
    serpFailures.slice(0, 20).forEach((item) => console.log(`• ${item}`));
    issues.push(
      `${serpFailures.length} meta tagów poza wide³kami SERP (title 55–60, description 145–155).`,
    );
  }

  console.log("\n=== RAPORT DANYCH ===");
  console.log(`Regiony:     ${datasetReport.stats.regions}`);
  console.log(`Miasta:      ${datasetReport.stats.cities}`);
  console.log(`Dzielnice:   ${datasetReport.stats.districts}`);
  console.log(`Strony usÅ‚ug (miasto):    ${datasetReport.stats.serviceCityPages}`);
  console.log(`Strony usÅ‚ug (dzielnica): ${datasetReport.stats.serviceDistrictPages}`);
  console.log(`Raporty cenowe:           ${datasetReport.stats.reportPages}`);
  console.log(`Wygenerowanych stron:     ${pages.length}`);
  console.log(
    `Indeksowalne: ${pages.filter((page) => page.content.isIndexable).length} / ${pages.length}`,
  );

  if (datasetReport.warnings.length > 0) {
    console.log("\n=== OSTRZEÅ»ENIA DANYCH ===");
    datasetReport.warnings.forEach((warning) => console.log(`â€¢ ${warning}`));
  }

  if (duplicates.length > 0) {
    console.log(`\n=== DUPLIKATY TREÅšCI (prÃ³g 0.62, ${duplicates.length} par) ===`);
    duplicates.slice(0, 10).forEach((duplicate) => {
      console.log(`â€¢ ${duplicate.score.toFixed(2)}  ${duplicate.a}  âŸ·  ${duplicate.b}`);
    });
  } else {
    console.log("\nBrak par stron o podobieÅ„stwie >= 0.62.");
  }

  if (warnings.length > 0) {
    console.log(`\n=== OSTRZEÅ»ENIA TREÅšCI (${warnings.length}) ===`);
    warnings.slice(0, 15).forEach((warning) => console.log(`â€¢ ${warning}`));
    if (warnings.length > 15) console.log(`â€¦ i ${warnings.length - 15} wiÄ™cej.`);
  }

  if (datasetReport.errors.length > 0 || issues.length > 0) {
    console.error("\n=== BÅÄ˜DY ===");
    [...datasetReport.errors, ...issues].forEach((error) => console.error(`âœ– ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("\nâœ” Walidacja zakoÅ„czona bez bÅ‚Ä™dÃ³w krytycznych.");
}

main();
