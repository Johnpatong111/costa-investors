import { roundToStep } from "./deterministic";
import { formatEur, formatRate } from "../utils/format";
import type { MarketStats } from "./market-stats";

/**
 * Wnioski i kalkulacje inwestycyjne oparte wyłącznie na `MarketStats`.
 * Te same funkcje zasilają kalkulator ROI (klient) i treść (serwer).
 */

export interface InvestmentEstimate {
  budget: number;
  /** Czynsz roczny brutto (€). */
  annualRentGross: number;
  /** Czynsz roczny netto po kosztach i podatku (€). */
  annualRentNet: number;
  monthlyRentNet: number;
  /** Prognozowana wartość po 5 latach. */
  valueIn5Years: number;
  capitalGain5y: number;
  /** Suma: 5 lat czynszu netto + wzrost wartości. */
  totalReturn5y: number;
  /** Zwrot łączny w % budżetu. */
  totalReturnPercent: number;
  yieldNet: number;
  purchaseCosts: number;
}

export function estimatePurchaseCosts(budget: number, rate: number): number {
  return roundToStep(budget * rate, 500);
}

export function estimateInvestment(stats: MarketStats, budget: number): InvestmentEstimate {
  const safeBudget = Math.max(0, budget);
  const annualRentGross = roundToStep((safeBudget * stats.rentalYield) / 100, 100);
  const annualRentNet = roundToStep((safeBudget * stats.netYield) / 100, 100);
  const valueIn5Years = roundToStep(
    safeBudget * Math.pow(1 + stats.priceGrowth / 100, 5),
    1000,
  );
  const capitalGain5y = valueIn5Years - safeBudget;
  const totalReturn5y = capitalGain5y + annualRentNet * 5;

  return {
    budget: safeBudget,
    annualRentGross,
    annualRentNet,
    monthlyRentNet: roundToStep(annualRentNet / 12, 10),
    valueIn5Years,
    capitalGain5y,
    totalReturn5y,
    totalReturnPercent: safeBudget > 0 ? Math.round((totalReturn5y / safeBudget) * 100) : 0,
    yieldNet: stats.netYield,
    purchaseCosts: estimatePurchaseCosts(safeBudget, stats.purchaseCostsRate),
  };
}

/** "wzrost 9,4% r/r". Jeden wariant zdania na stronę. */
export function describeGrowth(stats: MarketStats): string {
  if (stats.priceGrowth >= 9) {
    return `rynek w fazie dynamicznego wzrostu: ${formatRate(stats.priceGrowth)} r/r`;
  }
  if (stats.priceGrowth >= 4) {
    return `stabilny wzrost cen: ${formatRate(stats.priceGrowth)} r/r`;
  }
  if (stats.priceGrowth > 0) {
    return `umiarkowany wzrost ${formatRate(stats.priceGrowth)} r/r`;
  }
  return `korekta cen ${formatRate(stats.priceGrowth)} r/r. Większe pole do negocjacji`;
}

export function describeYield(stats: MarketStats): string {
  if (stats.rentalYield >= 6) {
    return `wysoka rentowność brutto ${formatRate(stats.rentalYield)} (netto ok. ${formatRate(stats.netYield)})`;
  }
  if (stats.rentalYield >= 5) {
    return `rentowność brutto ${formatRate(stats.rentalYield)} (netto ok. ${formatRate(stats.netYield)})`;
  }
  return `niższa rentowność brutto ${formatRate(stats.rentalYield)}. Lokalizacja broni się wzrostem wartości`;
}

export function describeDemand(index: number): string {
  if (index >= 9) return "bardzo wysoki";
  if (index >= 7.5) return "wysoki";
  if (index >= 6) return "umiarkowany";
  if (index >= 4.5) return "poniżej średniej";
  return "niski";
}

export function describeLiquidity(stats: MarketStats): string {
  return `mediana czasu ekspozycji oferty to ${stats.avgDaysOnMarket} dni przy popycie ${describeDemand(stats.demandIndex)}`;
}

export function describePricePosition(
  stats: MarketStats,
  locale: "pl" | "en" | "es" = "pl",
): string {
  const diff = (stats.pricePerM2 - stats.cityPricePerM2) / stats.cityPricePerM2;
  const pct = formatRate(Math.abs(diff) * 100, 0);

  if (locale === "en") {
    if (Math.abs(diff) < 0.02) return "in line with the city median";
    return diff > 0 ? `${pct} above the city median` : `${pct} below the city median`;
  }
  if (locale === "es") {
    if (Math.abs(diff) < 0.02) return "en línea con la mediana del municipio";
    return diff > 0
      ? `${pct} por encima de la mediana del municipio`
      : `${pct} por debajo de la mediana del municipio`;
  }
  if (Math.abs(diff) < 0.02) return "cena €/m² jest zbliżona do mediany całego miasta";
  return diff > 0
    ? `cena €/m² jest o ${pct} wyższa od mediany miasta`
    : `cena €/m² jest o ${pct} niższa od mediany miasta`;
}

/** Ile mieszkań/domów kupisz za budżet. Konkret zamiast ogólników. */
export function describeBudgetFit(stats: MarketStats, budget: number, areaM2 = 70): string {
  const units = Math.max(1, Math.floor(budget / (stats.pricePerM2 * areaM2)));
  return units === 1
    ? `budżet ${formatEur(budget)} wystarcza na lokal ok. ${areaM2} m²`
    : `budżet ${formatEur(budget)} pozwala na ${units} lokale po ok. ${areaM2} m²`;
}
