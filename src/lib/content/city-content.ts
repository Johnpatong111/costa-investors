import type { CitySeed, RegionSeed } from "../data/schema";
import type { ServiceDefinition } from "../data/services";
import { deriveCityStats, MARKET_YEAR } from "./market-stats";
import {
  describeGrowth,
  describeLiquidity,
  describePricePosition,
  describeYield,
} from "./market-insights";
import { interpolate } from "./interpolate";
import { buildTemplateVars, type PageContext } from "./variables";
import { pick } from "./deterministic";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  assessIndexability,
  clip,
  countWords,
  type PageContent,
} from "./content-utils";
import { buildCityBlocks, buildCityFaq } from "./city-blocks";
import { cityAccessBlock } from "./access";
import { cityMarketNote } from "./city-market-notes";

/**
 * Hub miasta: /{service}/{city}. Intencja: porównanie lokalizacji na Costa Blanca,
 * więc strona agreguje dane po dzielnicach i linkuje głębiej.
 */
export function buildCityContent(
  city: CitySeed,
  region: RegionSeed,
  service: ServiceDefinition,
): PageContent {
  const key = `${service.slug}/${city.slug}`;
  const stats = deriveCityStats(city, region);

  const ctx: PageContext = { city, region, stats, service, key };
  const vars: Record<string, string> = {
    ...buildTemplateVars(ctx),
    pricePosition: describePricePosition(stats),
    growthSentence: describeGrowth(stats),
    yieldSentence: describeYield(stats),
    liquidity: describeLiquidity(stats),
  };
  const t = (template: string) => interpolate(template, vars);

  const h1 = t(
    pick(
      [
        `${service.name} ${city.name}: ${region.name} ${MARKET_YEAR}`,
        `${service.name} w ${city.nameLocative}. Ceny i ROI`,
        `${service.name} ${city.nameLocative}. Oferty i inwestycja`,
      ],
      key,
      "h1",
    ),
  );

  const metaTitle = clip(
    t(
      pick(
        [
          `${service.name} ${city.name} (${region.name}) | od 120k €`,
          `${service.name} ${city.nameLocative}. Ceny i ROI`,
          `Inwestycja w ${city.nameLocative}: ${service.name}`,
        ],
        key,
        "title",
      ),
    ),
    MAX_TITLE_LENGTH,
  );

  const metaDescription = clip(
    t(
      pick(
        [
          `${service.name} w ${city.nameLocative}: mediana {cityPrice} €/m², ROI {yield}, wzrost {growth} r/r. Zobacz oferty i policz zwrot w 2026!`,
          `Szukasz ${service.nameGenitive} w ${city.nameLocative}? Średnia cena: {cityPrice} €/m². Sprawdź dzielnice, koszty zakupu i uzyskaj konsultację.`,
          `Nieruchomości w ${city.nameLocative} dla Polaków: {cityPrice} €/m², czynsz {rent} €/m², ROI {yield}. Bezpłatna analiza zakupu.`,
        ],
        key,
        "desc",
      ),
    ),
    MAX_DESCRIPTION_LENGTH,
  );

  const lead = t(
    pick(
      [
        "{city} to jeden z najważniejszych rynków w regionie {region}: {cityPrice} €/m², ROI {yield} i wzrost {growth} r/r. Porównaj dzielnice i sprawdź, ile zarobisz na najmie.",
        "W {cityLoc} mediana ofertowa to {cityPrice} €/m², a najem daje średnio {yield} brutto. Przejrzyj dzielnice i policz zwrot dla swojego budżetu.",
      ],
      key,
      "lead",
    ),
  );

  const blocks = buildCityBlocks(city, service, t, vars, key, stats);

// Nota rynkowa: autorski akapit per miasto, żeby strony tej samej usługi
// w różnych miastach nie dzieliły identycznego szkieletu (Jaccard 0.76).
const marketNote = cityMarketNote(city.slug, "pl");
if (marketNote) {
  blocks.push({ id: "ocena-rynku", heading: marketNote.heading, paragraphs: marketNote.paragraphs });
}

// Blok infrastrukturalny: lotnisko (IATA) i AP-7, twarde dane zamiast ogólników.
const access = cityAccessBlock(city.slug, "pl");
if (access) {
  blocks.push({ id: "dojazd", heading: access.heading, paragraphs: access.paragraphs });
}
  const faq = buildCityFaq(city, service, t, vars, stats);
  const processSteps = service.process.map((step) => ({
    title: step.title,
    description: t(step.description),
    duration: step.duration,
  }));

  const content: PageContent = {
    key,
    h1,
    lead,
    metaTitle,
    metaDescription,
    keywords: [
      `${service.name} ${city.name}`,
      `${service.name} ${city.nameLocative}`,
      `${vars.synonym} ${city.name}`,
      `cena m2 ${city.name}`,
      `inwestycja ${city.nameLocative} ROI`,
    ],
    blocks,
    faq,
    processSteps,
    stats,
    wordCount: countWords(
      [
        h1,
        lead,
        ...blocks.flatMap((block) => [
          block.heading,
          ...block.paragraphs,
          ...(block.bullets ?? []),
        ]),
        ...faq.flatMap((item) => [item.question, item.answer]),
      ].join(" "),
    ),
    isIndexable: true,
  };

  const verdict = assessIndexability(content);
  return { ...content, isIndexable: verdict.isIndexable, noindexReason: verdict.reason };
}

