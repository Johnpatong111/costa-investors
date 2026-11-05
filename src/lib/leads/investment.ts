/**
 * Kalkulacja ROI po stronie klienta – czysta funkcja, zero I/O.
 * Wejście: dane rynku przekazane z serwera (ROI, wzrost) + budżet użytkownika.
 */

export interface MarketRates {
  rentalYield: number;
  netYield: number;
  priceGrowth: number;
  pricePerM2: number;
}

export interface ReturnEstimate {
  budget: number;
  /** Ile m² kupisz za budżet (przybliżenie). */
  areaM2: number;
  annualRentGross: number;
  annualRentNet: number;
  monthlyRentNet: number;
  valueIn5Years: number;
  capitalGain5y: number;
  totalReturn5y: number;
  totalReturnPercent: number;
  /** Koszty transakcyjne (ITP/IVA, notariusz, prawnik). */
  purchaseCosts: number;
}

export const PURCHASE_COSTS_RATE = 0.135;

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

/** "250 000" | "250000" → 250000 (0 dla niepoprawnych). */
export function parseBudget(raw: string | number): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const value = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

/** 250000 → "250 000" (bez waluty – walutę dodaje warstwa prezentacji). */
export function formatBudgetInput(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function estimateReturns(rates: MarketRates, budget: number): ReturnEstimate {
  const safeBudget = Math.max(0, budget);
  const annualRentGross = roundTo((safeBudget * rates.rentalYield) / 100, 100);
  const annualRentNet = roundTo((safeBudget * rates.netYield) / 100, 100);
  const valueIn5Years = roundTo(safeBudget * Math.pow(1 + rates.priceGrowth / 100, 5), 1000);
  const capitalGain5y = valueIn5Years - safeBudget;
  const totalReturn5y = capitalGain5y + annualRentNet * 5;

  return {
    budget: safeBudget,
    areaM2: rates.pricePerM2 > 0 ? Math.round(safeBudget / rates.pricePerM2) : 0,
    annualRentGross,
    annualRentNet,
    monthlyRentNet: roundTo(annualRentNet / 12, 10),
    valueIn5Years,
    capitalGain5y,
    totalReturn5y,
    totalReturnPercent: safeBudget > 0 ? Math.round((totalReturn5y / safeBudget) * 100) : 0,
    purchaseCosts: roundTo(safeBudget * PURCHASE_COSTS_RATE, 500),
  };
}

/** Progi budżetu – kafelki w kalkulatorze (mikro-zobowiązania). */
export const BUDGET_PRESETS = [
  { value: 150_000, label: "do 150 tys. €", hint: "kawalerka lub mały apartament" },
  { value: 300_000, label: "150–300 tys. €", hint: "apartament 2 pokoje blisko plaży" },
  { value: 500_000, label: "300–500 tys. €", hint: "apartament premium lub bungalow" },
  { value: 750_000, label: "500 tys. € +", hint: "villa z basenem" },
] as const;
