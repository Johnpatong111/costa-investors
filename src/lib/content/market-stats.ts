import type { CitySeed, DistrictSeed, RegionSeed } from "../data/schema";
import dataset from "../data/locations.json";
import { createRngFromKey, roundToStep } from "./deterministic";

/**
 * ===========================================================================
 * MODEL RYNKU COSTA BLANCA (EUR, ROI)
 * ===========================================================================
 * Wszystkie liczby wyliczane deterministycznie z seeda (cena €/m², ROI miasta,
 * dynamika r/r, popyt w urbanizacji). Ten sam URL = te same wartości, więc
 * cache CDN i ISR działają poprawnie.
 *
 * PRODUKCJA: podmień `deriveDistrictStats()` na feed (Idealista/Fotocasa,
 * Colegio de Registradores) zachowując kształt `MarketStats`.
 */

export const MARKET_YEAR = 2026;
/**
 * Data snapshotu danych rynkowych w formacie RRRR-MM. Bierzemy ją z datasetu
 * (`updatedAt`), żeby po każdej aktualizacji cen strony nie deklarowały
 * starego miesiąca - wcześniej była tu zaszyta stała „2026-01”.
 */
export const DATA_AS_OF = dataset.updatedAt.slice(0, 7);
/** Mediana regionu. Punkt odniesienia w tabelach (seed 2026). */
export const REGION_MEDIAN_PRICE_PER_M2 = 2_950;
/** Mediana ofertowa Hiszpanii (€/m²) dla kontekstu porównawczego. */
export const COUNTRY_MEDIAN_PRICE_PER_M2 = 2_100;
/** Koszty transakcyjne: ITP 10% + notariusz, rejestr, prawnik. */
export const PURCHASE_COSTS_RATE = 0.135;
/** Koszty utrzymania najmu: zarządzanie, podatki, pustostany (pkt proc.). */
export const RENT_COST_RATE = 1.9;

export interface MarketStats {
  /** Mediana ofertowa €/m² w lokalizacji. */
  pricePerM2: number;
  cityPricePerM2: number;
  regionPricePerM2: number;
  /** Dynamika cen r/r w % (np. 9.4). */
  priceGrowth: number;
  /** Rentowność brutto najmu w % (np. 6.1). */
  rentalYield: number;
  /** Rentowność netto po kosztach i podatkach (%). */
  netYield: number;
  /** Mediana czynszu €/m²/mies. */
  monthlyRentPerM2: number;
  avgDaysOnMarket: number;
  transactions12m: number;
  demandIndex: number;
  foreignBuyerShare: number;
  polishBuyerShare: number;
  purchaseCostsRate: number;
  dataAsOf: string;
  reliable: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const round1 = (value: number) => Math.round(value * 10) / 10;

/** Udział dzielnicy w transakcjach miasta. Ważony popytem. */
function transactionShare(districts: DistrictSeed[], district: DistrictSeed): number {
  const weight = (item: DistrictSeed) => Math.pow(item.demandIndex, 1.6);
  const total = districts.reduce((sum, item) => sum + weight(item), 0);
  if (total === 0) return 1 / Math.max(districts.length, 1);
  return weight(district) / total;
}

export function deriveDistrictStats(
  city: CitySeed,
  district: DistrictSeed,
  region: RegionSeed,
): MarketStats {
  const key = `${city.slug}/${district.slug}`;
  const rng = createRngFromKey(`market::${key}`);

  // Dynamika: baza miasta korygowana popytem urbanizacji (rynek hiszpański
  // rósł mocniej tam, gdzie kupują obcokrajowcy).
  const priceGrowth = clamp(
    city.priceGrowth + (district.demandIndex - 7) * 0.5 + (rng() - 0.5) * 0.8,
    -4,
    20,
  );

  const avgDaysOnMarket = clamp(
    Math.round(city.avgDaysOnMarket * (1 + (7 - district.demandIndex) * 0.035) + (rng() - 0.5) * 8),
    30,
    300,
  );

  const transactions12m = Math.max(8, Math.round(city.transactions12m * transactionShare(city.districts, district)));
  const rentalYield = district.rentalYield;
  const monthlyRentPerM2 = round1((district.pricePerM2 * rentalYield) / 100 / 12);

  return {
    pricePerM2: district.pricePerM2,
    cityPricePerM2: city.pricePerM2,
    regionPricePerM2: region.medianPricePerM2,
    priceGrowth: round1(priceGrowth),
    rentalYield: round1(rentalYield),
    netYield: round1(clamp(rentalYield - RENT_COST_RATE, 1.5, 8)),
    monthlyRentPerM2,
    avgDaysOnMarket,
    transactions12m,
    demandIndex: district.demandIndex,
    foreignBuyerShare: Math.round(clamp(city.foreignBuyerShare + (district.demandIndex - 7) * 1.5, 5, 80)),
    polishBuyerShare: city.polishBuyerShare,
    purchaseCostsRate: PURCHASE_COSTS_RATE,
    dataAsOf: DATA_AS_OF,
    reliable: transactions12m >= 20 && district.characteristics.length >= 2,
  };
}

export function deriveCityStats(city: CitySeed, region: RegionSeed): MarketStats {
  const rng = createRngFromKey(`market::${city.slug}`);
  const weightedDemand =
    city.districts.length > 0
      ? city.districts.reduce((sum, district) => sum + district.demandIndex, 0) /
        city.districts.length
      : 6.5;

  return {
    pricePerM2: city.pricePerM2,
    cityPricePerM2: city.pricePerM2,
    regionPricePerM2: region.medianPricePerM2,
    priceGrowth: round1(clamp(city.priceGrowth + (rng() - 0.5) * 0.4, -4, 20)),
    rentalYield: round1(city.rentalYield),
    netYield: round1(clamp(city.rentalYield - RENT_COST_RATE, 1.5, 8)),
    monthlyRentPerM2: round1((city.pricePerM2 * city.rentalYield) / 100 / 12),
    avgDaysOnMarket: city.avgDaysOnMarket,
    transactions12m: city.transactions12m,
    demandIndex: round1(weightedDemand),
    foreignBuyerShare: city.foreignBuyerShare,
    polishBuyerShare: city.polishBuyerShare,
    purchaseCostsRate: PURCHASE_COSTS_RATE,
    dataAsOf: DATA_AS_OF,
    reliable: city.transactions12m >= 50,
  };
}
