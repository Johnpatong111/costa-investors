import type { ServiceKind } from "../../data/services/types";
import { SERVICES } from "../../data/services";
import type { Locale } from "../config";
import type { CitySeed, RegionSeed } from "../../data/schema";
import type { DistrictEntry } from "../../data/repository";
import { getNearbyCities } from "../../data/repository";
import { deriveCityStats, deriveDistrictStats, MARKET_YEAR } from "../../content/market-stats";
import { regionTax } from "../../content/region-facts";
import {
  describeGrowth,
  describePricePosition,
  describeYield,
  estimateInvestment,
} from "../../content/market-insights";
import { buildTemplateVars, type PageContext } from "../../content/variables";
import { interpolate } from "../../content/interpolate";
import { hashString, pick } from "../../content/deterministic";
/** Rotacja deterministyczna: wybiera `count` elementów od pozycji zależnej od URL. */
function pickSome<T>(items: readonly T[], key: string, salt: string, count: number): T[] {
  if (items.length <= count) return [...items];
  const start = hashString(`${key}::${salt}`) % items.length;
  const rotated = [...items.slice(start), ...items.slice(0, start)];
  return rotated.slice(0, count);
}

import {
  demandTier,
  liquidityTier,
  pickByTier,
  yieldTier,
} from "../../content/content-tiers";
import { cityAccessBlock } from "../../content/access";
import { formatEur, formatRate } from "../../utils/format";
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
import { buildLocalizedDistrictBlocks, buildLocalizedDistrictFaq, TYPE_LABELS } from "./district-blocks";
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
    pricePosition: describePricePosition(stats, ctx.key.endsWith("/en") ? "en" : ctx.key.endsWith("/es") ? "es" : "pl"),
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

  const blocks: ContentBlock[] = buildLocalizedDistrictBlocks({
    locale: locale as "en" | "es",
    service,
    stats,
    city,
    district,
    region,
    key,
    vars,
    t,
  });

  const faq = buildLocalizedDistrictFaq(
    { locale: locale as "en" | "es", service, stats, city, district, region, key, vars, t },
    dict.district.faq,
  );

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

  const districtBullets = city.districts
    .slice()
    .sort((a, z) => z.pricePerM2 - a.pricePerM2)
    .map((item) => `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${item.rentalYield}%`);

  const neighbours = getNearbyCities(city, 3);
  const cheaper = neighbours.filter((item) => item.pricePerM2 < city.pricePerM2);
  const pricier = neighbours.filter((item) => item.pricePerM2 > city.pricePerM2);
  const spread =
    city.districts.length > 1
      ? Math.max(...city.districts.map((item) => item.pricePerM2)) -
        Math.min(...city.districts.map((item) => item.pricePerM2))
      : 0;

  const cityOpeners =
    locale === "es"
      ? [
          `La mediana de oferta en ${city.name} es de ${formatEur(stats.pricePerM2)}/m² (datos: ${stats.dataAsOf}) con un crecimiento del ${formatRate(stats.priceGrowth)} interanual. Frente a la región ${region.name} (${formatEur(stats.regionPricePerM2)}/m²) el municipio se sitúa ${describePricePosition(stats, locale)}. La exposición media es de ${stats.avgDaysOnMarket} días.`,
          `En ${city.nameLocative} el metro cuesta unos ${formatEur(stats.pricePerM2)} (datos: ${stats.dataAsOf}). Con ${formatRate(stats.priceGrowth)} de subida anual y ${stats.avgDaysOnMarket} días de exposición, el mercado trabaja a ritmo normal: hay tiempo para analizar, pero no para semanas de negociación.`,
          `${city.name} concentra ${stats.transactions12m} operaciones al año en nuestro modelo, con una mediana de ${formatEur(stats.pricePerM2)}/m² frente a ${formatEur(stats.regionPricePerM2)}/m² de ${region.name}. La demanda se sostiene en ${stats.demandIndex}/10 y el alquiler rinde ${formatRate(stats.rentalYield)} bruto.`,
        ]
      : [
          `The asking median in ${city.name} is ${formatEur(stats.pricePerM2)}/m² (data: ${stats.dataAsOf}) with ${formatRate(stats.priceGrowth)} year-on-year growth. Against the ${region.name} median of ${formatEur(stats.regionPricePerM2)}/m², the town sits ${describePricePosition(stats, locale)}. Average time on market is ${stats.avgDaysOnMarket} days.`,
          `A square metre in ${city.nameLocative} costs around ${formatEur(stats.pricePerM2)} (data: ${stats.dataAsOf}). With ${formatRate(stats.priceGrowth)} annual growth and ${stats.avgDaysOnMarket} days on market, the market moves at a normal pace: time to analyse, but not weeks to negotiate.`,
          `${city.name} accounts for ${stats.transactions12m} transactions a year in our model, at a median of ${formatEur(stats.pricePerM2)}/m² against ${formatEur(stats.regionPricePerM2)}/m² across ${region.name}. Demand holds at ${stats.demandIndex}/10 and rental yield stands at ${formatRate(stats.rentalYield)} gross.`,
        ];

  const buyerLine =
    locale === "es"
      ? `El ${formatRate(stats.foreignBuyerShare, 0)} de los compradores en ${city.nameLocative} viene del extranjero, y el ${formatRate(stats.polishBuyerShare, 0)} son polacos. Esa base garantiza un mercado secundario líquido y precios menos dependientes de una sola nacionalidad.`
      : `${formatRate(stats.foreignBuyerShare, 0)} of buyers in ${city.nameLocative} come from abroad, ${formatRate(stats.polishBuyerShare, 0)} of them Polish. That base keeps the resale market liquid and prices less dependent on a single nationality.`;

  const comparisonText =
    locale === "es"
      ? [
          cheaper.length > 0
            ? `Más barato: ${cheaper.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" y ")}.`
            : "",
          pricier.length > 0
            ? `Más caro: ${pricier.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" y ")}.`
            : "",
          spread > 0
            ? `Dentro del municipio la diferencia entre la zona más cara y la más barata alcanza ${formatEur(spread)} €/m².`
            : `El modelo de datos no divide este municipio en zonas.`,
        ]
          .filter(Boolean)
          .join(" ")
      : [
          cheaper.length > 0
            ? `Cheaper nearby: ${cheaper.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" and ")}.`
            : "",
          pricier.length > 0
            ? `Pricier nearby: ${pricier.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" and ")}.`
            : "",
          spread > 0
            ? `Inside the municipality the gap between the most and least expensive area reaches ${formatEur(spread)} €/m².`
            : `The dataset does not split this municipality into areas.`,
        ]
          .filter(Boolean)
          .join(" ");

  const tax = regionTax(region.slug);
  const costText =
    locale === "es"
      ? `Añade un ${formatRate(stats.purchaseCostsRate * 100)} de gastos: ITP del ${tax.itp}% en ${tax.authority} para segunda mano, o IVA del 10% y AJD en obra nueva, más notaría, registro y abogado. Cada año se suman IBI, comunidad y seguro.`
      : `Add ${formatRate(stats.purchaseCostsRate * 100)} in costs: ${tax.itp}% transfer tax in ${tax.authority} for resale, or 10% VAT plus stamp duty on new-build, plus notary, registry and lawyer. Every year you also pay IBI, community fees and insurance.`;

  // Argumentacja pod intencję usługi - różnicuje huby tej samej miejscowości.
  const cityAngle =
    locale === "es"
      ? ({
          buy: `Para comprar y usar: con ${formatEur(stats.pricePerM2)}/m² una vivienda de 70 m² ronda ${formatEur(stats.pricePerM2 * 70)} antes de gastos, e incluye ${city.districts.length} zonas con precios distintos.`,
          villa: `Para chalet con piscina: en ${city.name} la parcela pesa tanto como la vivienda; conviene revisar ${city.districts[0]?.name ?? city.name} y comparar el precio del metro con el coste de construir.`,
          investment: `Para inversión: ${formatRate(stats.rentalYield)} bruto y ${formatRate(stats.netYield)} neto con ${stats.avgDaysOnMarket} días de salida; el reparto por zonas de ${city.name} decide el retorno final.`,
          "lead-magnet": `Para valorar: empieza por la mediana municipal (${formatEur(stats.pricePerM2)}/m²), los gastos de entrada (${formatRate(stats.purchaseCostsRate * 100)}) y el desglose por zonas antes de pedir el análisis.`,
        } as Record<string, string>)[service.kind] ?? ""
      : ({
          buy: `For owner-occupiers: at ${formatEur(stats.pricePerM2)}/m² a 70 m² unit costs around ${formatEur(stats.pricePerM2 * 70)} before costs, and ${city.name} spans ${city.districts.length} areas at different price points.`,
          villa: `For villa buyers: in ${city.name} the plot weighs as much as the house, so compare ${city.districts[0]?.name ?? city.name} against the cost of building new.`,
          investment: `For investors: ${formatRate(stats.rentalYield)} gross and ${formatRate(stats.netYield)} net with ${stats.avgDaysOnMarket} days to sell; how the ${city.name} areas are priced decides the final return.`,
          "lead-magnet": `For valuations: start with the municipal median (${formatEur(stats.pricePerM2)}/m²), entry costs (${formatRate(stats.purchaseCostsRate * 100)}) and the area breakdown before ordering an analysis.`,
        } as Record<string, string>)[service.kind] ?? "";

  // Konkret dzielnicowy: nazwy i ceny skrajnych osiedli. Huby miast tej samej
  // usługi (np. /es/buy/villajoyosa vs /es/buy/l-albir) zbiegały się do 0.80,
  // bo dzieliły cały szkielet i różniły się tylko liczbami.
  const byPrice = city.districts.slice().sort((a, b) => b.pricePerM2 - a.pricePerM2);
  const byYield = city.districts.slice().sort((a, b) => b.rentalYield - a.rentalYield);
  const priciest = byPrice[0];
  const cheapest = byPrice[byPrice.length - 1];
  const bestYield = byYield[0];
  const cityHighlights =
    locale === "es"
      ? [
          priciest
            ? `La zona más cara es ${priciest.name} (${formatEur(priciest.pricePerM2)} €/m²) y la más asequible ${cheapest?.name ?? city.name} (${formatEur(cheapest?.pricePerM2 ?? city.pricePerM2)} €/m²).`
            : "",
          bestYield
            ? `La mejor rentabilidad bruta está en ${bestYield.name}: ${formatRate(bestYield.rentalYield)} sobre una mediana de ${formatEur(bestYield.pricePerM2)} €/m².`
            : "",
          `Diferencia de precio dentro del municipio: ${formatEur(Math.max(...city.districts.map((item) => item.pricePerM2)) - Math.min(...city.districts.map((item) => item.pricePerM2)))} €/m²; eso explica por qué dos viviendas parecidas pueden costar muy distinto.`,
        ]
          .filter(Boolean)
          .join(" ")
      : [
          priciest
            ? `The priciest area is ${priciest.name} (${formatEur(priciest.pricePerM2)} €/m²) and the most affordable is ${cheapest?.name ?? city.name} (${formatEur(cheapest?.pricePerM2 ?? city.pricePerM2)} €/m²).`
            : "",
          bestYield
            ? `The best gross yield sits in ${bestYield.name}: ${formatRate(bestYield.rentalYield)} on a median of ${formatEur(bestYield.pricePerM2)} €/m².`
            : "",
          `Price spread inside the municipality: ${formatEur(Math.max(...city.districts.map((item) => item.pricePerM2)) - Math.min(...city.districts.map((item) => item.pricePerM2)))} €/m² - which is why two similar homes can cost very differently.`,
        ]
          .filter(Boolean)
          .join(" ");

  const blocks: ContentBlock[] = [
    {
      id: "rynek",
      heading:
        locale === "es"
          ? `Mercado inmobiliario en ${city.nameLocative}: ${MARKET_YEAR}`
          : `Property market in ${city.nameLocative}: ${MARKET_YEAR}`,
      paragraphs: [pick(cityOpeners, key, "city-open"), buyerLine, cityAngle],
      bullets: [
        `${locale === "es" ? "Mediana" : "Median"}: ${formatEur(stats.pricePerM2)}/m²`,
        `${locale === "es" ? "Crecimiento" : "Growth"}: ${formatRate(stats.priceGrowth)}`,
        `ROI: ${formatRate(stats.rentalYield)} (${locale === "es" ? "neto" : "net"} ${formatRate(stats.netYield)})`,
        `${locale === "es" ? "Alquiler" : "Rent"}: ${stats.monthlyRentPerM2} €/m²`,
        `${locale === "es" ? "Compradores extranjeros" : "Foreign buyers"}: ${formatRate(stats.foreignBuyerShare, 0)}`,
      ],
    },
    {
      id: "dzielnice",
      heading:
        locale === "es"
          ? `Precios y rentabilidad por zona de ${city.name}`
          : `Prices and yields across ${city.name} areas`,
      paragraphs: [
        locale === "es"
          ? "Los precios varían según la distancia a la playa, el año de construcción y el estándar de la urbanización. Abajo tienes la mediana €/m² y la rentabilidad de cada zona; pulsa el nombre para ver el informe completo."
          : "Prices vary with distance to the beach, year of construction and the standard of the development. Below are the €/m² median and rental yield for each area; open a name for the full report.",
        comparisonText,
      ],
      bullets: districtBullets,
    },
    {
      id: "konkret",
      heading:
        locale === "es"
          ? `Qué zona elegir en ${city.name}`
          : `Which area to choose in ${city.name}`,
      paragraphs: [cityHighlights],
    },
    {
      id: "koszty",
      heading: locale === "es" ? "Gastos de compra e impuestos" : "Purchase costs and taxes",
      paragraphs: [costText],
      bullets: service.checklist.map((item) => t(item)),
    },
    {
      id: "usluga",
      heading: service.name,
      paragraphs: service.benefits
        .slice(0, 2)
        .map((benefit) => `${t(benefit.title)}: ${t(benefit.description)}`),
      bullets: service.checklist.slice(0, 3).map((item) => t(item)),
    },
    {
      id: "proces",
      heading:
        locale === "es"
          ? `Cómo comprar en ${city.nameLocative} paso a paso`
          : `How to buy in ${city.nameLocative}, step by step`,
      paragraphs: [
        locale === "es"
          ? "La compra en España exige NIE, cuenta bancaria española y traductor jurado en la notaría. Estos son los pasos que gestionamos por ti."
          : "Buying in Spain requires an NIE, a Spanish bank account and a sworn translator at the notary. These are the steps we handle for you.",
      ],
      bullets: dict.process.map((step) => `${step.title} (${step.duration}): ${t(step.description)}`),
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

  // Nota cenowa per lokalizacja: wariant zależny od pozycji ceny wobec miasta.
  // Bez niej raporty nowych, podobnie wycenionych dzielnic zbiegały się do 0.81.
  const priceRatio = stats.pricePerM2 / Math.max(1, stats.cityPricePerM2);
  const priceNoteIndex = priceRatio < 0.92 ? 0 : priceRatio < 1.06 ? 1 : priceRatio < 1.3 ? 2 : 3;
  const priceNote =
    locale === "es"
      ? [
          `${district.name} se sitúa por debajo de la mediana de ${city.name} (${formatEur(stats.cityPricePerM2)} €/m²): el presupuesto rinde más metros, normalmente a cambio de obra más antigua o más distancia a la playa.`,
          `${district.name} cotiza en línea con la mediana de ${city.name} (${formatEur(stats.cityPricePerM2)} €/m²). La diferencia entre dos viviendas la marcan el año de construcción y el estándar de la urbanización.`,
          `${district.name} supera la mediana de ${city.name} (${formatEur(stats.cityPricePerM2)} €/m²). La prima se paga por ubicación: cercanía a ${district.landmarks[0] ?? city.name} y calidad del entorno.`,
          `${district.name} está en la gama alta de ${region.name} (${formatEur(stats.regionPricePerM2)} €/m² de mediana regional). Aquí el precio lo fijan las vistas, la línea de edificación y el año de entrega.`,
        ][priceNoteIndex]
      : [
          `${district.name} sits below the ${city.name} median (${formatEur(stats.cityPricePerM2)} €/m²): the same budget buys more square metres, usually at the cost of older stock or a longer walk to the beach.`,
          `${district.name} trades in line with the ${city.name} median (${formatEur(stats.cityPricePerM2)} €/m²). Between two similar units, the year of construction and the standard of the development decide the price.`,
          `${district.name} sits above the ${city.name} median (${formatEur(stats.cityPricePerM2)} €/m²). The premium buys location: proximity to ${district.landmarks[0] ?? city.name} and the quality of the surroundings.`,
          `${district.name} is in the top range of ${region.name} (${formatEur(stats.regionPricePerM2)} €/m² regional median). Here views, the building line and the completion year set the price.`,
        ][priceNoteIndex] ?? "";

  const blocks: ContentBlock[] = [
    {
      id: "ceny",
      heading: t(b.ceny.heading),
      paragraphs: [t(b.ceny.p1), priceNote ?? ""],
      bullets: [
        ...b.ceny.bullets.map((bullet) => t(bullet)),
        // Lista dzielnic miasta. Dane różnicujące raporty o tej samej nazwie.
        ...city.districts.map(
          (item) => `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${item.rentalYield}%`,
        ),
      ],
    },
    { id: "roi", heading: t(b.roi.heading), paragraphs: [t(b.roi.p1), t(b.roi.p2)] },
    { id: "podatki", heading: t(b.podatki.heading), paragraphs: [t(b.podatki.p1)] },
    {
      // Kontekst lokalny (cechy, punkty orientacyjne, porównanie w gminie).
      // Statyczny słownik dawał identyczne raporty na 70 dzielnicach.
      id: "okolica",
      heading:
        locale === "es"
          ? `Entorno y parque residencial: ${district.name}`
          : `Area and housing stock: ${district.name}`,
      paragraphs: [
        pick(
          locale === "es"
            ? [
                `Tipo de ubicación: ${TYPE_LABELS.es[district.type] ?? "residencial"}. Puntos de referencia de los anuncios: ${district.landmarks.join(", ")}. Para la valoración esto significa que dos viviendas con los mismos metros pueden diferir varios puntos porcentuales: manda la distancia a ${district.landmarks[0] ?? city.name} y la línea de edificación.`,
                `El informe cubre una ${TYPE_LABELS.es[district.type] ?? "zona residencial"} de ${city.subregion}. En el entorno inmediato cuentan ${district.landmarks.join(", ")}, y el inquilino mira primero la distancia a ${district.landmarks[0] ?? city.name}.`,
              ]
            : [
                `Location type: ${TYPE_LABELS.en[district.type] ?? "residential"}. Landmarks quoted in listings: ${district.landmarks.join(", ")}. For valuation this means two units of identical floor area can differ by several per cent: distance to ${district.landmarks[0] ?? city.name} and the building line decide it.`,
                `This report covers a ${TYPE_LABELS.en[district.type] ?? "residential area"} within ${city.subregion}. Nearby, ${district.landmarks.join(", ")} matter most, and tenants look first at the distance to ${district.landmarks[0] ?? city.name}.`,
              ],
          key,
          "rep-okolica",
        ),
        city.districts.length > 1
          ? locale === "es"
            ? `Dentro de ${city.name} las medianas van de ${formatEur(Math.min(...city.districts.map((item) => item.pricePerM2)))} €/m² a ${formatEur(Math.max(...city.districts.map((item) => item.pricePerM2)))} €/m². ${district.name} se sitúa ${describePricePosition(stats, locale)}.`
            : `Within ${city.name} medians range from ${formatEur(Math.min(...city.districts.map((item) => item.pricePerM2)))} €/m² to ${formatEur(Math.max(...city.districts.map((item) => item.pricePerM2)))} €/m². ${district.name} sits ${describePricePosition(stats, locale)}.`
          : locale === "es"
            ? `El modelo de datos no incluye otras zonas de ${city.name}, así que la referencia es la mediana municipal.`
            : `The dataset contains no other areas in ${city.name}, so the municipal median is the reference.`,
      ],
      bullets: city.districts
        .slice()
        .sort((a, b) => b.pricePerM2 - a.pricePerM2)
        .map(
          (item) =>
            `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${locale === "es" ? "ROI" : "yield"} ${formatRate(item.rentalYield)}`,
        ),
    },
  ];


  // Profil dzielnicy w raporcie. Raporty nowych, podobnie wycenionych dzielnic
  // ("centro" w Villajoyosa / El Campello / L'Albir) zbiegały się do 0.79-0.80,
  // bo dzieliły cały szkielet. Ten blok wnosi słownictwo zależne od danych:
  // ROI, popytu, płynności, typu zabudowy i punktów orientacyjnych.
  const profileYield =
    locale === "es"
      ? pickByTier(
          [
            `La rentabilidad del ${formatRate(stats.rentalYield)} es moderada: en ${district.name} el retorno lo sostiene más la revalorización que la renta.`,
            `Con ${formatRate(stats.rentalYield)} bruto el alquiler cubre gastos y deja margen; es un nivel típico de ${TYPE_LABELS.es[district.type] ?? "zona residencial"}.`,
            `${formatRate(stats.rentalYield)} bruto y ${formatRate(stats.netYield)} neto: el alquiler de ${stats.monthlyRentPerM2} €/m² al mes pesa de verdad en el retorno total.`,
            `Rentabilidad alta para la región: ${formatRate(stats.rentalYield)} bruto sobre una mediana de ${formatEur(stats.pricePerM2)} €/m².`,
          ],
          yieldTier(stats),
        )
      : pickByTier(
          [
            `A ${formatRate(stats.rentalYield)} gross yield is moderate: in ${district.name} capital growth does more work than rent.`,
            `At ${formatRate(stats.rentalYield)} gross the rent covers costs and leaves a margin - a typical level for a ${TYPE_LABELS.en[district.type] ?? "residential area"}.`,
            `${formatRate(stats.rentalYield)} gross and ${formatRate(stats.netYield)} net: rent of ${stats.monthlyRentPerM2} €/m² per month genuinely moves the total return.`,
            `Strong for the region: ${formatRate(stats.rentalYield)} gross on a median of ${formatEur(stats.pricePerM2)} €/m².`,
          ],
          yieldTier(stats),
        );

  const profileMarket =
    locale === "es"
      ? pickByTier(
          [
            `La demanda es contenida (${stats.demandIndex}/10) y los anuncios permanecen ${stats.avgDaysOnMarket} días: hay margen para negociar.`,
            `Demanda estable (${stats.demandIndex}/10) y ${stats.avgDaysOnMarket} días de exposición: mercado de segunda residencia que se mueve sin prisa.`,
            `Demanda alta (${stats.demandIndex}/10) con ${stats.avgDaysOnMarket} días en mercado: las viviendas bien tasadas se venden rápido.`,
            `Demanda muy alta (${stats.demandIndex}/10) y solo ${stats.avgDaysOnMarket} días de exposición: el comprador decide con poca antelación.`,
          ],
          demandTier(stats),
        )
      : pickByTier(
          [
            `Demand is contained (${stats.demandIndex}/10) and listings stay ${stats.avgDaysOnMarket} days - there is room to negotiate.`,
            `Steady demand (${stats.demandIndex}/10) and ${stats.avgDaysOnMarket} days on market: a second-home market that moves without haste.`,
            `High demand (${stats.demandIndex}/10) with ${stats.avgDaysOnMarket} days on market: correctly priced units sell quickly.`,
            `Very high demand (${stats.demandIndex}/10) and only ${stats.avgDaysOnMarket} days on market: buyers decide at short notice.`,
          ],
          demandTier(stats),
        );

  const profilePlace =
    locale === "es"
      ? `Contexto urbano: ${TYPE_LABELS.es[district.type] ?? "zona residencial"} en la comarca de ${city.subregion}. Referencias del anuncio: ${district.landmarks.join(", ")}. ${liquidityTier(stats) >= 2 ? "La rotación es más lenta, así que conviene comparar varias unidades antes de ofertar." : "La rotación es rápida, por lo que el precio de salida debe ser realista desde el primer día."}`
      : `Urban context: a ${TYPE_LABELS.en[district.type] ?? "residential area"} in the ${city.subregion} part of the coast. Listing references: ${district.landmarks.join(", ")}. ${liquidityTier(stats) >= 2 ? "Turnover is slower, so compare several units before making an offer." : "Turnover is fast, so the asking price must be realistic from day one."}`;

  const siblingDistricts = entry.city.districts
    .filter((item) => item.slug !== district.slug)
    .slice()
    .sort(
      (a, b) => Math.abs(a.pricePerM2 - stats.pricePerM2) - Math.abs(b.pricePerM2 - stats.pricePerM2),
    )
    .slice(0, 3);

  const profileNeighbours = siblingDistricts.length
    ? locale === "es"
      ? `Para comparar: ${siblingDistricts
          .map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m², ${formatRate(item.rentalYield)})`)
          .join("; ")}. Son las zonas más cercanas en precio dentro de ${entry.city.name}, así que marcan el rango realista de negociación en ${district.name}.`
      : `For comparison: ${siblingDistricts
          .map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m², ${formatRate(item.rentalYield)})`)
          .join("; ")}. These are the closest price neighbours within ${entry.city.name}, so they set the realistic negotiating range in ${district.name}.`
    : "";

  blocks.push({
    id: "profil",
    heading: locale === "es" ? `Perfil de ${district.name}` : `Profile: ${district.name}`,
    paragraphs: [profileYield, profileMarket, profilePlace, profileNeighbours],
  });

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
