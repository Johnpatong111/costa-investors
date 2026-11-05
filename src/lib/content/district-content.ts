import type { DistrictEntry } from "../data/repository";
import type { ServiceDefinition } from "../data/services";
import { deriveDistrictStats } from "./market-stats";
import {
  describeGrowth,
  describeLiquidity,
  describePricePosition,
  describeYield,
  estimateInvestment,
} from "./market-insights";
import { interpolate } from "./interpolate";
import { buildTemplateVars, type PageContext } from "./variables";
import { pick } from "./deterministic";
import { formatEur } from "../utils/format";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  assessIndexability,
  clip,
  countWords,
  type PageContent,
} from "./content-utils";
import { buildDistrictBlocks } from "./district-blocks";
import { buildDistrictFaq, buildKeywords } from "./district-faq";

/** Treść money page: usługa + miejscowość + urbanizacja. */
export function buildDistrictContent(
  entry: DistrictEntry,
  service: ServiceDefinition,
): PageContent {
  const { city, district, region } = entry;
  const key = `${service.slug}/${city.slug}/${district.slug}`;
  const stats = deriveDistrictStats(city, district, region);

  const example70 = estimateInvestment(stats, stats.pricePerM2 * 70);
  const example250 = estimateInvestment(stats, 250_000);

  const ctx: PageContext = { city, region, district, stats, service, key };
  const vars: Record<string, string> = {
    ...buildTemplateVars(ctx),
    pricePosition: describePricePosition(stats),
    growthSentence: describeGrowth(stats),
    yieldSentence: describeYield(stats),
    liquidity: describeLiquidity(stats),
    budget70: formatEur(stats.pricePerM2 * 70),
    rent70: formatEur(example70.annualRentGross),
    rentNet70: formatEur(example70.annualRentNet),
    return5y: formatEur(example250.totalReturn5y),
    returnPercent: String(example250.totalReturnPercent),
  };

  const t = (template: string) => interpolate(template, vars);

  const h1 = t(pick(service.h1, key, "h1"));
  const metaTitle = clip(t(pick(service.metaTitle, key, "title")), MAX_TITLE_LENGTH);
  const metaDescription = clip(
    t(pick(service.metaDescription, key, "desc")),
    MAX_DESCRIPTION_LENGTH,
  );

  const lead = t(
    pick(
      [
        "{service} w {districtLoc} ({cityLoc}, {region}): {price} €/m², ROI {yield} i wzrost {growth} r/r. Sprawdź oferty, policz zwrot i umów kontakt z agentem.",
        "Szukasz {propertyGen} w {districtLoc}? Mediana to {price} €/m², najem {rent} €/m²/mies., a sprzedaż zajmuje średnio {days} dni. Poniżej realne koszty zakupu i ROI.",
        "{districtLoc} ({region}): {price} €/m² przy ROI {yield}. Sprawdź, ile zarobisz na najmie i jakie podatki zapłacisz w Hiszpanii.",
      ],
      key,
      "lead",
    ),
  );

  const blocks = buildDistrictBlocks(service, t, vars);
  const faq = buildDistrictFaq(service, vars, key, stats, entry);
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
    keywords: buildKeywords(service, vars, key),
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
