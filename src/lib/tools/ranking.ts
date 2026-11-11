/**
 * ===========================================================================
 * POMOCNICZE FUNKCJE RANKINGU
 * ===========================================================================
 * Median i metraż za budżet. Trzymane osobno, bo ranking liczy je dla 89
 * dzielnic i te wartości trafiają do nagłówka strony oraz do schema.org.
 */

/** Mediana; przy parzystej liczbie elementów średnia dwóch środkowych. */
export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
    : (sorted[middle] ?? 0);
}

/** Ile metrów kupisz za budżet przy danej cenie za metr (zaokrąglone w dół). */
export function areaForBudget(budget: number, pricePerM2: number): number {
  if (!Number.isFinite(budget) || budget <= 0) return 0;
  if (!Number.isFinite(pricePerM2) || pricePerM2 <= 0) return 0;
  return Math.round(budget / pricePerM2);
}
