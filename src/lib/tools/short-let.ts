/**
 * ===========================================================================
 * MATEMATYKA PORÓWNANIA: NAJEM KRÓTKOTERMINOWY VS DŁUGOTERMINOWY
 * ===========================================================================
 * Czynsz zależy od obłożenia liniowo, sprzątanie od liczby pobytów, a koszty
 * stałe (IBI, comunidad, ubezpieczenie) nie zależą od modelu. Dzięki temu próg
 * rentowności da się policzyć analitycznie, bez pętli i bez przybliżeń.
 */

export interface ShortLetInput {
  /** Cena referencyjna nieruchomości (70 m² × cena za metr). */
  price: number;
  nightly: number;
  /** Obłożenie w procentach (0-100). */
  occupancy: number;
  monthlyRent: number;
}

export interface ShortLetResult {
  shortGross: number;
  shortCosts: number;
  shortNet: number;
  shortMonthly: number;
  shortYield: number;
  shortPerNight: number;
  longGross: number;
  longCosts: number;
  longNet: number;
  longMonthly: number;
  longYield: number;
  longPerNight: number;
  /** Obłożenie w procentach, przy którym oba modele dają ten sam wynik. */
  breakEven: number;
  diff: number;
}

export const PLATFORM_FEE = 0.15;
export const MGMT_SHORT = 0.2;
export const MGMT_LONG = 0.08;
export const CLEAN_COST = 55;
export const AVG_STAY = 6;
export const UTILITIES_MONTH = 130;
export const FIXED_RATE = 0.012;
export const LONG_VACANCY_MONTHS = 1;

export function computeShortLet(input: ShortLetInput): ShortLetResult {
  const price = Number.isFinite(input.price) && input.price > 0 ? input.price : 0;
  const nightly = Number.isFinite(input.nightly) && input.nightly > 0 ? input.nightly : 0;
  const occupancy = Math.min(100, Math.max(0, Number.isFinite(input.occupancy) ? input.occupancy : 0));
  const monthlyRent =
    Number.isFinite(input.monthlyRent) && input.monthlyRent > 0 ? input.monthlyRent : 0;

  const fixedAnnual = price * FIXED_RATE;
  const nights = (365 * occupancy) / 100;
  const shortGross = nights * nightly;
  const shortPlatform = shortGross * PLATFORM_FEE;
  const shortMgmt = shortGross * MGMT_SHORT;
  const shortCleaning = (nights / AVG_STAY) * CLEAN_COST;
  const shortUtilities = UTILITIES_MONTH * 12;
  const shortCosts = shortPlatform + shortMgmt + shortCleaning + shortUtilities + fixedAnnual;
  const shortNet = shortGross - shortCosts;

  const longGross = monthlyRent * (12 - LONG_VACANCY_MONTHS);
  const longCosts = longGross * MGMT_LONG + fixedAnnual;
  const longNet = longGross - longCosts;

  // Dochód netto z sezonu: occ × (365 × stawka × marża - 365 / pobyt × sprzątanie) - stałe.
  const perNightFactor = 365 * nightly * (1 - PLATFORM_FEE - MGMT_SHORT) - (365 / AVG_STAY) * CLEAN_COST;
  const breakEven =
    perNightFactor > 0 ? ((longNet + shortUtilities + fixedAnnual) / perNightFactor) * 100 : Number.POSITIVE_INFINITY;

  return {
    shortGross,
    shortCosts,
    shortNet,
    shortMonthly: shortNet / 12,
    shortYield: price > 0 ? (shortNet / price) * 100 : 0,
    shortPerNight: shortCosts / 365,
    longGross,
    longCosts,
    longNet,
    longMonthly: longNet / 12,
    longYield: price > 0 ? (longNet / price) * 100 : 0,
    longPerNight: longCosts / 365,
    breakEven,
    diff: shortNet - longNet,
  };
}
