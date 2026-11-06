import type { ServiceDefinition } from "../data/services";
import { interpolate } from "./interpolate";
import { MARKET_YEAR } from "./market-stats";
import { formatEur, formatPrice, formatRate } from "../utils/format";

/**
 * ===========================================================================
 * COPY USŁUG NA STRONACH BEZ LOKALIZACJI (hub usługi, strona główna)
 * ===========================================================================
 * Szablony usług zawierają placeholdery ({districtLoc}, {rent}, {price}…),
 * które mają sens tylko w kontekście konkretnej miejscowości. Na stronach
 * zbiorczych NIE MAMY dzielnicy, więc podstawiamy bezpieczne, uśrednione
 * wartości regionalne. Zamiast wypuszczać surowe `{districtLoc}` do UI.
 *
 * Każdy tekst przechodzi przez `interpolate`, a QA (`validate:data`) dodatkowo
 * skanuje wynik pod kątem pozostałych nawiasów klamrowych.
 */

export interface ServiceCopyInput {
  /** Nazwa regionu lub "Hiszpania". Używana w miejscownikach. */
  areaName: string;
  /** Mediana €/m² dla obszaru (region lub cała Hiszpania). */
  medianPricePerM2: number;
  /** Średnia rentowność brutto w %. */
  rentalYield?: number;
  /** Średnia dynamika cen r/r w %. */
  priceGrowth?: number;
}

const PURCHASE_COSTS = 13.5;

export function buildServiceFallbackVars(input: ServiceCopyInput): Record<string, string> {
  const { areaName, medianPricePerM2 } = input;
  const rentalYield = input.rentalYield ?? 5.9;
  const priceGrowth = input.priceGrowth ?? 8.5;
  const monthlyRent = (medianPricePerM2 * rentalYield) / 100 / 12;
  const rent = monthlyRent.toFixed(1).replace(".", ",");
  const netYield = Math.max(1.5, rentalYield - 1.9);

  return {
    city: areaName,
    cityLoc: areaName,
    cityGen: areaName,
    district: areaName,
    districtLoc: areaName,
    districtGen: areaName,
    region: areaName,
    regionLoc: areaName,
    subregion: areaName,
    province: "Hiszpania",
    districtType: "lokalizacja",

    price: formatPrice(medianPricePerM2),
    thePrice: formatEur(medianPricePerM2),
    cityPrice: formatPrice(medianPricePerM2),
    regionPrice: formatPrice(medianPricePerM2),
    rent,
    rentEur: `${rent} €`,
    yield: formatRate(rentalYield),
    netYield: formatRate(netYield),
    growth: formatRate(priceGrowth),
    purchaseCosts: formatRate(PURCHASE_COSTS),
    days: "105",
    volume: "1 200",
    demand: "7",
    foreign: "35%",
    polish: "6%",
    tier: "2",

    budget: formatEur(150_000),
    budget60: formatEur(Math.round(medianPricePerM2 * 60)),
    budget70: formatEur(Math.round(medianPricePerM2 * 70)),
    budget80: formatEur(Math.round(medianPricePerM2 * 80)),
    value5y: formatEur(Math.round(medianPricePerM2 * 70 * Math.pow(1 + priceGrowth / 100, 5))),
    rent70: formatEur(Math.round(medianPricePerM2 * 70 * (rentalYield / 100))),
    rentNet70: formatEur(Math.round((medianPricePerM2 * 70 * netYield) / 100)),
    rent250: formatEur(Math.round(250_000 * (rentalYield / 100))),
    rentNet250: formatEur(Math.round(250_000 * (netYield / 100))),
    return5y: formatEur(Math.round(250_000 * 0.62)),
    returnPercent: "62",
    landlordCosts: formatRate(1.9),

    year: String(MARKET_YEAR),
    service: "",
    serviceGen: "",
    property: "nieruchomość",
    propertyGen: "nieruchomości",
    synonym: "nieruchomości w Hiszpanii",
    landmark: areaName,
    landmark2: areaName,
    characteristic: "zróżnicowana zabudowa",
    characteristic2: "bliskość plaży",
  };
}

/** Opisy korzyści z podstawionymi zmiennymi. Zawsze gotowe do renderu. */
export function interpolateBenefits(
  service: ServiceDefinition,
  vars: Record<string, string>,
): { title: string; description: string }[] {
  const merged = { ...vars, service: service.name, serviceGen: service.nameGenitive };
  return service.benefits.map((benefit) => ({
    title: interpolate(benefit.title, merged),
    description: interpolate(benefit.description, merged),
  }));
}

/** Lista kontrolna / dokumenty. Także bez surowych placeholderów. */
export function interpolateChecklist(
  service: ServiceDefinition,
  vars: Record<string, string>,
): string[] {
  return service.checklist.map((item) => interpolate(item, vars));
}
