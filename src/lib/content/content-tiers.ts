import type { MarketStats } from "./market-stats";

/**
 * ===========================================================================
 * KUBEŁKI DANYCH → WARIANTY SŁOWNE
 * ===========================================================================
 * Walidator treści normalizuje cyfry do „#”, więc dwie strony różniące się
 * wyłącznie liczbami są dla niego duplikatem (i tak samo ocenia je Google).
 * Unikalność musi siedzieć w SŁOWACH.
 *
 * Rozwiązanie: każdy wymiar rynku (cena vs miasto, ROI, dynamika, popyt,
 * płynność, udział obcokrajowców) mapujemy na 4 kubełki. Kubełek wybiera
 * wariant zdania pasujący FAKTOGRAFICZNIE („tanie, ale starsze budownictwo”
 * tylko tam, gdzie cena jest realnie niższa), a różne kombinacje kubełków
 * dają różne brzmienie strony - bez losowości i bez utraty prawdy.
 */

export type Tier = 0 | 1 | 2 | 3;

/** Wybór wariantu po kubełku. Kubełek spoza zakresu obcinamy do końca listy. */
export function pickByTier<T>(pool: readonly T[], tier: number): T {
  if (pool.length === 0) throw new Error("pickByTier(): pusta lista wariantów");
  const index = Math.min(pool.length - 1, Math.max(0, Math.round(tier)));
  return pool[index] as T;
}

/** Cena €/m² względem mediany miasta. */
export function priceTier(stats: MarketStats): Tier {
  const ratio = stats.pricePerM2 / Math.max(1, stats.cityPricePerM2);
  if (ratio < 0.88) return 0;
  if (ratio < 1.06) return 1;
  if (ratio < 1.3) return 2;
  return 3;
}

/** Rentowność brutto z najmu. */
export function yieldTier(stats: MarketStats): Tier {
  if (stats.rentalYield < 5) return 0;
  if (stats.rentalYield < 6) return 1;
  if (stats.rentalYield < 7) return 2;
  return 3;
}

/** Dynamika cen r/r. */
export function growthTier(stats: MarketStats): Tier {
  if (stats.priceGrowth < 2) return 0;
  if (stats.priceGrowth < 5.5) return 1;
  if (stats.priceGrowth < 9) return 2;
  return 3;
}

/** Presja popytu (1-10). */
export function demandTier(stats: MarketStats): Tier {
  if (stats.demandIndex < 6) return 0;
  if (stats.demandIndex < 7.5) return 1;
  if (stats.demandIndex < 8.8) return 2;
  return 3;
}

/** Płynność: mediana czasu ekspozycji oferty. */
export function liquidityTier(stats: MarketStats): Tier {
  if (stats.avgDaysOnMarket <= 60) return 0;
  if (stats.avgDaysOnMarket <= 100) return 1;
  if (stats.avgDaysOnMarket <= 150) return 2;
  return 3;
}

/** Udział kupujących zagranicznych. */
export function foreignTier(stats: MarketStats): Tier {
  if (stats.foreignBuyerShare < 25) return 0;
  if (stats.foreignBuyerShare < 40) return 1;
  if (stats.foreignBuyerShare < 55) return 2;
  return 3;
}
