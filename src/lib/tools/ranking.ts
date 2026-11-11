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

/* ------------------------------- filtry --------------------------------- */

export interface RankingRow {
  districtName: string;
  cityName: string;
  pricePerM2: number;
  netYield: number;
  days: number;
  area: number;
}

export interface RankingFilters {
  /** Minimalny zwrot netto w procentach. */
  minNetYield: number;
  /** Maksymalny czas ekspozycji w dniach; 0 = bez limitu. */
  maxDays: number;
  /** Szukana fraza w nazwie dzielnicy lub gminy. */
  query: string;
}

export const DEFAULT_RANKING_FILTERS: RankingFilters = {
  minNetYield: 0,
  maxDays: 0,
  query: "",
};

/** Filtruje ranking bez zmiany kolejności. Puste filtry zwracają wszystkie wiersze. */
export function filterRankingRows<T extends RankingRow>(rows: T[], filters: RankingFilters): T[] {
  const query = filters.query.trim().toLowerCase();
  const minYield = Number.isFinite(filters.minNetYield) ? filters.minNetYield : 0;
  const maxDays = Number.isFinite(filters.maxDays) ? filters.maxDays : 0;

  return rows.filter((row) => {
    if (row.netYield < minYield) return false;
    if (maxDays > 0 && row.days > maxDays) return false;
    if (query.length > 0) {
      const haystack = `${row.districtName} ${row.cityName}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

/** Liczba aktywnych filtrów (do przycisku „wyczyść”). */
export function activeFilterCount(filters: RankingFilters): number {
  let count = 0;
  if (filters.minNetYield > 0) count += 1;
  if (filters.maxDays > 0) count += 1;
  if (filters.query.trim().length > 0) count += 1;
  return count;
}
