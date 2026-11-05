import type { CitySeed, DistrictSeed, RegionSeed } from "../data/schema";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import { MARKET_YEAR } from "./market-stats";
import { formatEur, formatPrice, formatRate } from "../utils/format";
import { pick } from "./deterministic";

/** Kontekst renderowania strony (meta, H1, treść) – jeden obiekt dla spójności. */
export interface PageContext {
  city: CitySeed;
  region: RegionSeed;
  district?: DistrictSeed;
  stats: MarketStats;
  service: ServiceDefinition;
  key: string;
}

/**
 * Słownik zmiennych dla szablonów `{placeholder}`.
 * Wartości sformatowane pod publikację (EUR, przecinki, twarde spacje).
 */
export function buildTemplateVars(ctx: PageContext): Record<string, string> {
  const { city, district, region, service, stats, key } = ctx;

  const districtName = district?.name ?? city.name;
  const districtLoc = district?.nameLocative ?? city.nameLocative;
  const districtGen = district?.nameGenitive ?? city.nameGenitive;

  const landmarks = district?.landmarks ?? [];
  const primaryLandmark = landmarks.length > 0 ? pick(landmarks, key, "lm1") : city.name;
  const secondaryLandmark = landmarks.length > 1 ? pick(landmarks, key, "lm2") : primaryLandmark;
  const characteristic = district?.characteristics[0] ?? "zróżnicowana zabudowa";
  const characteristic2 = district?.characteristics[1] ?? characteristic;

  const rentFormatted = stats.monthlyRentPerM2.toFixed(1).replace(".", ",");

  return {
    city: city.name,
    cityLoc: city.nameLocative,
    cityGen: city.nameGenitive,
    district: districtName,
    districtLoc,
    districtGen,
    region: region.name,
    regionLoc: region.nameLocative,
    subregion: city.subregion,
    province: city.province,

    price: formatPrice(stats.pricePerM2),
    thePrice: formatEur(stats.pricePerM2),
    cityPrice: formatPrice(stats.cityPricePerM2),
    regionPrice: formatPrice(stats.regionPricePerM2),
    growth: formatRate(stats.priceGrowth),
    yield: formatRate(stats.rentalYield),
    netYield: formatRate(stats.netYield),
    rent: rentFormatted,
    rentEur: `${rentFormatted} €`,
    days: String(stats.avgDaysOnMarket),
    volume: formatPrice(stats.transactions12m),
    demand: String(stats.demandIndex),
    foreign: formatRate(stats.foreignBuyerShare, 0),
    polish: formatRate(stats.polishBuyerShare, 0),
    purchaseCosts: formatRate(stats.purchaseCostsRate * 100),

    year: String(MARKET_YEAR),
    service: service.name,
    serviceGen: service.nameGenitive,
    property: service.propertyNoun,
    propertyGen: service.propertyNounGenitive,
    synonym: pick(service.synonyms, key, "syn"),
    landmark: primaryLandmark,
    landmark2: secondaryLandmark,
    characteristic,
    characteristic2,
    districtType: district?.type ?? "urbanizacja",

    budget: formatEur(150_000),
    budget60: formatEur(stats.pricePerM2 * 60),
    budget80: formatEur(stats.pricePerM2 * 80),
    value5y: formatEur(Math.round(stats.pricePerM2 * 70 * Math.pow(1 + stats.priceGrowth / 100, 5))),
    tier: String(city.tier),
  };
}
