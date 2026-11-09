import type { ServiceKind } from "../../data/services/types";
import { SERVICES } from "../../data/services";
import type { Locale } from "../config";
import type { CitySeed, RegionSeed } from "../../data/schema";
import type { DistrictEntry } from "../../data/repository";
import { deriveCityStats, deriveDistrictStats } from "../../content/market-stats";
import {
  describeGrowth,
  describePricePosition,
  describeYield,
  estimateInvestment,
} from "../../content/market-insights";
import { buildTemplateVars, type PageContext } from "../../content/variables";
import { interpolate } from "../../content/interpolate";
import { pick } from "../../content/deterministic";
import { cityAccessBlock } from "../../content/access";
import { formatEur } from "../../utils/format";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  assessIndexability,
  clip,
  countWords,
  type ContentBlock,
  type PageContent,
} from "../../content/content-utils";
import { en } from "./en";
import { es } from "./es";
import type { LocalizedContent, LocalizedServiceCopy } from "./types";

/**
 * ZLOKALIZOWANE BUILDERY TREŚCI (EN / ES).
 * PL pozostaje na dotychczasowych generatorach. Zero regresji.
 * Moduł nie jest jeszcze podpięty do routingu.
 */

const CONTENT: Record<"en" | "es", LocalizedContent> = { en, es };

export function getLocalizedContent(locale: Locale): LocalizedContent | null {
  return locale === "en" || locale === "es" ? CONTENT[locale] : null;
}

export interface ServiceCopyView extends LocalizedServiceCopy {
  kind: ServiceKind;
}

/** Jednolity widok copy usługi: PL z definicji, EN/ES ze słownika treści. */
export function getServiceCopy(kind: ServiceKind, locale: Locale): ServiceCopyView {
  if (locale === "en" || locale === "es") {
    return { kind, ...CONTENT[locale].service[kind] };
  }

  const service = SERVICES.find((item) => item.kind === kind);
  if (!service) throw new Error(`Brak usługi dla kind="${kind}"`);

  return {
    kind,
    name: service.name,
    propertyNoun: service.propertyNoun,
    propertyNounGenitive: service.propertyNounGenitive,
    priceAnchor: service.priceAnchor,
    highlightLabel: service.highlightLabel,
    ctaLabel: service.ctaLabel,
    h1: service.h1,
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    benefits: service.benefits,
    checklist: service.checklist,
  };
}

type Vars = Record<string, string>;

/**
 * Usuwa sąsiadujące duplikaty słów („Torrevieja Torrevieja”) i podwójne spacje.
 * W kontekście miasta szablony usług używają i `{city}`, i `{district}` -
 * podstawienie obu tą samą nazwą dawałoby powtórzenie w title/H1.
 */
function dedupeWords(text: string): string {
  const tidy = text.replace(/\s+/g, " ").trim();
  return tidy.replace(/\b([\p{L}][\p{L}'-]*)(?:\s+\1\b)+/giu, "$1");
}

function extendVars(ctx: PageContext): Vars {
  const { stats } = ctx;
  const example = estimateInvestment(stats, stats.pricePerM2 * 70);
  const example250 = estimateInvestment(stats, 250_000);

  return {
    ...buildTemplateVars(ctx),
    pricePosition: describePricePosition(stats),
    growthSentence: describeGrowth(stats),
    yieldSentence: describeYield(stats),
    budget70: formatEur(stats.pricePerM2 * 70),
    budget70plus: formatEur(Math.round(stats.pricePerM2 * 70 * (1 + stats.purchaseCostsRate))),
    rent70: formatEur(example.annualRentGross),
    rentNet70: formatEur(example.annualRentNet),
    rent250: formatEur(example250.annualRentGross),
    rentNet250: formatEur(example250.annualRentNet),
    return5y: formatEur(example250.totalReturn5y),
    returnPercent: String(example250.totalReturnPercent),
    value5y: formatEur(example250.valueIn5Years),
  };
}

function finish(
  content: Omit<PageContent, "isIndexable" | "wordCount">,
  parts: string[],
): PageContent {
  const base: PageContent = { ...content, wordCount: countWords(parts.join(" ")), isIndexable: true };
  const verdict = assessIndexability(base);
  return { ...base, isIndexable: verdict.isIndexable, noindexReason: verdict.reason };
}

function buildKeywords(
  locale: Locale,
  service: ServiceCopyView,
  city: string,
  district: string,
): string[] {
  return locale === "es"
    ? [
        `${service.name} ${city}`,
        `${service.name} ${district}`,
        `precio m2 ${city} ${district}`,
        `inversion ${city} rentabilidad`,
      ]
    : [
        `${service.name} ${city}`,
        `${service.name} ${district}`,
        `price per m2 ${city} ${district}`,
        `investment ${city} yield`,
      ];
}

/** Usługa PL użyta jako nośnik kontekstu dla buildTemplateVars (bez wpływu na treść). */
function contextService(copy: ServiceCopyView) {
  const base = SERVICES[0];
  if (!base) throw new Error("Brak zdefiniowanych usług");
  return { ...base, ...copy } as typeof base;
}

export function buildLocalizedDistrictContent(
  entry: DistrictEntry,
  kind: ServiceKind,
  locale: Locale,
): PageContent | null {
  const dict = getLocalizedContent(locale);
  if (!dict) return null;

  const service = getServiceCopy(kind, locale);
  const { city, district, region } = entry;
  const key = `${kind}/${city.slug}/${district.slug}/${locale}`;
  const stats = deriveDistrictStats(city, district, region);
  const ctx: PageContext = { city, region, district, stats, service: contextService(service), key };
  const vars = extendVars(ctx);
  const t = (template: string) => interpolate(template, vars);

  const h1 = t(pick(service.h1, key, "h1"));
  const metaTitle = clip(t(pick(service.metaTitle, key, "title")), MAX_TITLE_LENGTH);
  const metaDescription = clip(t(pick(service.metaDescription, key, "desc")), MAX_DESCRIPTION_LENGTH);
  const lead = t(pick(dict.district.leads, key, "lead"));

  const b = dict.district.blocks;
  const blocks: ContentBlock[] = [
    { id: "rynek", heading: t(b.rynek.heading), paragraphs: [t(b.rynek.p1), t(b.rynek.p2)] },
    {
      id: "roi",
      heading: t(b.roi.heading),
      paragraphs: [t(b.roi.p1), t(b.roi.p2)],
      bullets: dict.district.bullets.map((bullet) => t(bullet)),
    },
    {
      id: "koszty",
      heading: t(b.koszty.heading),
      paragraphs: [t(b.koszty.p1)],
      bullets: b.koszty.bullets.map((bullet) => t(bullet)),
    },
    { id: "kupujacy", heading: t(b.kupujacy.heading), paragraphs: [t(b.kupujacy.p1), t(b.kupujacy.p2)] },
    {
      // Blok usługi. Różnicuje strony tej samej lokalizacji dla różnych usług
      // (bez niego buy/villa/investment były w 99% identyczne).
      id: "usluga",
      heading: service.name,
      paragraphs: service.benefits.map((benefit) => `${t(benefit.title)}: ${t(benefit.description)}`),
      bullets: service.checklist.map((item) => t(item)),
    },
  ];

  const faq = dict.district.faq.map((item) => ({ question: t(item.q), answer: t(item.a) }));

  return finish(
    {
      key,
      h1,
      lead,
      metaTitle,
      metaDescription,
      keywords: buildKeywords(locale, service, city.name, district.name),
      blocks,
      faq,
      processSteps: dict.process.map((step) => ({
        title: step.title,
        description: t(step.description),
        duration: step.duration,
      })),
      stats,
    },
    [h1, lead, ...blocks.flatMap((block) => [block.heading, ...block.paragraphs])],
  );
}

export function buildLocalizedCityContent(
  city: CitySeed,
  region: RegionSeed,
  kind: ServiceKind,
  locale: Locale,
): PageContent | null {
  const dict = getLocalizedContent(locale);
  if (!dict) return null;

  const service = getServiceCopy(kind, locale);
  const key = `${kind}/${city.slug}/${locale}`;
  const stats = deriveCityStats(city, region);
  const ctx: PageContext = { city, region, stats, service: contextService(service), key };
  const vars = extendVars(ctx);
  const t = (template: string) => interpolate(template, vars);

  const h1 = dedupeWords(t(pick(service.h1, key, "h1"))).replace(
    /\b([\p{L}][\p{L}' -]*?) \(\1\)/giu,
    "$1",
  );
  // Kontekst miasta nie ma dzielnicy: `{district}` = nazwa miasta dublowałaby
  // `{city}` w tagu title, dlatego w szablonach SERP zostawiamy je puste.
  const serpVars: Vars = { ...vars, district: "", districtLoc: "", districtGen: "", districtType: "" };
  const serp = (template: string) => dedupeWords(interpolate(template, serpVars));
  const metaTitle = clip(serp(pick(service.metaTitle, key, "title")), MAX_TITLE_LENGTH);
  // Opis używa PEŁNYCH zmiennych: {districtLoc} musi wskazywać miasto.
  const metaDescription = clip(
    dedupeWords(interpolate(pick(service.metaDescription, key, "desc"), vars)),
    MAX_DESCRIPTION_LENGTH,
  );
  const lead = dedupeWords(t(pick(dict.city.leads, key, "lead")));

  const b = dict.city.blocks;
  const districtBullets = city.districts
    .slice()
    .sort((a, z) => z.pricePerM2 - a.pricePerM2)
    .map((item) => `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${item.rentalYield}%`);

  const blocks: ContentBlock[] = [
    { id: "rynek", heading: t(b.rynek.heading), paragraphs: [t(b.rynek.p1), t(b.rynek.p2)] },
    { id: "dzielnice", heading: t(b.dzielnice.heading), paragraphs: [t(b.dzielnice.p1)], bullets: districtBullets },
    {
      id: "proces",
      heading: t(b.proces.heading),
      paragraphs: [t(b.proces.p1)],
      bullets: dict.process.map((step) => `${step.title} (${step.duration}): ${t(step.description)}`),
    },
    {
      id: "koszty",
      heading: t(b.koszty.heading),
      paragraphs: [t(b.koszty.p1)],
      bullets: b.koszty.bullets.map((bullet) => t(bullet)),
    },
    {
      // Blok usługi. Różnicuje miasta dla różnych usług (buy vs villa vs investment).
      id: "usluga",
      heading: service.name,
      paragraphs: service.benefits.map((benefit) => `${t(benefit.title)}: ${t(benefit.description)}`),
      bullets: service.checklist.map((item) => t(item)),
    },
  ];

  const faq = dict.city.faq.map((item) => ({ question: t(item.q), answer: t(item.a) }));

  // Konkret infrastrukturalny: lotnisko z kodem IATA i dostęp do AP-7.
  const access = cityAccessBlock(city.slug, locale);
  if (access) {
    blocks.push({ id: "dojazd", heading: access.heading, paragraphs: access.paragraphs });
  }

  return finish(
    {
      key,
      h1,
      lead,
      metaTitle,
      metaDescription,
      keywords: buildKeywords(locale, service, city.name, city.name),
      blocks,
      faq,
      processSteps: dict.process.map((step) => ({
        title: step.title,
        description: t(step.description),
        duration: step.duration,
      })),
      stats,
    },
    [h1, lead, ...blocks.flatMap((block) => [block.heading, ...block.paragraphs])],
  );
}

export function buildLocalizedPriceReport(
  entry: DistrictEntry,
  locale: Locale,
): PageContent | null {
  const dict = getLocalizedContent(locale);
  if (!dict) return null;

  const { city, district, region } = entry;
  const service = getServiceCopy("buy", locale);
  const key = `report/${city.slug}/${district.slug}/${locale}`;
  const stats = deriveDistrictStats(city, district, region);
  const ctx: PageContext = { city, region, district, stats, service: contextService(service), key };
  const vars = extendVars(ctx);
  const t = (template: string) => interpolate(template, vars);

  const r = dict.report;
  const h1 = t(pick(r.h1, key, "h1"));
  const lead = t(r.lead);
  const b = r.blocks;

  const blocks: ContentBlock[] = [
    {
      id: "ceny",
      heading: t(b.ceny.heading),
      paragraphs: [t(b.ceny.p1)],
      bullets: [
        ...b.ceny.bullets.map((bullet) => t(bullet)),
        // Lista dzielnic miasta. Dane różnicujące raporty o tej samej nazwie.
        ...city.districts.map(
          (item) => `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${item.rentalYield}%`,
        ),
      ],
    },
    { id: "roi", heading: t(b.roi.heading), paragraphs: [t(b.roi.p1), t(b.roi.p2)] },
    { id: "podatki", heading: t(b.podatki.heading), paragraphs: [t(b.podatki.p1), t(b.podatki.p2)] },
    { id: "metodologia", heading: t(b.metodologia.heading), paragraphs: [t(b.metodologia.p1)] },
    {
      // Kontekst lokalny (cechy + punkt orientacyjny). Różnicuje raporty
      // dzielnic o tej samej nazwie w różnych miastach.
      id: "okolica",
      heading: t(dict.district.blocks.rynek.heading),
      paragraphs: dict.district.notes.map((note) => t(note)),
    },
  ];

  const faq = r.faq.map((item) => ({ question: t(item.q), answer: t(item.a) }));

  return finish(
    {
      key,
      h1,
      lead,
      metaTitle: clip(t(r.metaTitle), MAX_TITLE_LENGTH),
      metaDescription: clip(t(r.metaDescription), MAX_DESCRIPTION_LENGTH),
      keywords: buildKeywords(locale, service, city.name, district.name),
      blocks,
      faq,
      processSteps: [],
      stats,
    },
    [h1, lead, ...blocks.flatMap((block) => [block.heading, ...block.paragraphs])],
  );
}
