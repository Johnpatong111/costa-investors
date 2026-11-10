import type { Locale } from "./config";

/**
 * Historia cen 2016-2026 liczona deterministycznie z bieżącej mediany
 * i dynamiki r/r (`MarketStats`). Bez zmian schematu danych i bez zapytań
 * do API: ten sam wkład zawsze daje ten sam szereg.
 */
export interface PriceHistoryPoint {
  year: number;
  price: number;
  /** Zmiana r/r w %, null dla pierwszego roku. */
  change: number | null;
}

export interface PriceHistory {
  title: string;
  subtitle: string;
  note: string;
  yearsLabel: string;
  avgLabel: string;
  decadeLabel: string;
  points: PriceHistoryPoint[];
  avgChange: number;
  decadeChange: number;
}

/** Stabilny hash → wspólczynniki sezonowe (bez Math.random). */
function seededFactors(seed: string, count: number): number[] {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const factors: number[] = [];
  let state = hash >>> 0;
  for (let index = 0; index < count; index += 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const normalized = (state % 1000) / 1000;
    factors.push(0.72 + normalized * 0.56);
  }
  return factors;
}

const COPY: Record<
  Locale,
  { title: string; subtitle: string; note: string; yearsLabel: string; avgLabel: string; decadeLabel: string }
> = {
  pl: {
    title: "Dynamika cen w czasie (2016-2026)",
    subtitle: "Roczna zmiana mediany ceny za m² oraz skumulowany wzrost wartości.",
    note: "Szereg modelowany na podstawie bieżącej mediany i dynamiki r/r z bazy rynkowej. Wartości szacunkowe, nie stanowią wyceny.",
    yearsLabel: "Rok",
    avgLabel: "Średnia zmiana roczna",
    decadeLabel: "Wzrost 2016-2026",
  },
  en: {
    title: "Price dynamics over time (2016-2026)",
    subtitle: "Year-on-year change in the median €/m² and the cumulative value growth.",
    note: "Series modelled from the current median and the year-on-year growth in our market database. Estimates only, not a valuation.",
    yearsLabel: "Year",
    avgLabel: "Average annual change",
    decadeLabel: "Growth 2016-2026",
  },
  es: {
    title: "Evolución de precios (2016-2026)",
    subtitle: "Variación interanual de la mediana €/m² y crecimiento acumulado del valor.",
    note: "Serie modelada a partir de la mediana actual y del crecimiento interanual de nuestra base de mercado. Valores estimados, no una tasación.",
    yearsLabel: "Año",
    avgLabel: "Variación media anual",
    decadeLabel: "Crecimiento 2016-2026",
  },
};

export function getPriceHistory(
  locale: Locale,
  input: { current: number; growth: number; seed: string },
): PriceHistory {
  const copy = COPY[locale] ?? COPY.pl;
  const startYear = 2016;
  const endYear = 2026;
  const total = endYear - startYear;
  const factors = seededFactors(input.seed, total);

  // Cofamy się od ceny bieżącej: każdy rok miał dynamikę zbliżoną do r/r.
  const prices: number[] = new Array(total + 1);
  prices[total] = input.current;
  for (let index = total - 1; index >= 0; index -= 1) {
    const yearGrowth = (input.growth * (factors[index] ?? 1)) / 100;
    const nextPrice = prices[index + 1] ?? input.current;
    prices[index] = Math.round(nextPrice / (1 + yearGrowth));
  }

  const points: PriceHistoryPoint[] = prices.map((price, index) => {
    const previous = index === 0 ? null : (prices[index - 1] ?? price);
    return {
      year: startYear + index,
      price,
      change:
        previous === null || previous === 0
          ? null
          : Math.round(((price - previous) / previous) * 1000) / 10,
    };
  });

  const changes = points.filter((point) => point.change !== null).map((point) => point.change as number);
  const avgChange =
    Math.round((changes.reduce((sum, value) => sum + value, 0) / Math.max(changes.length, 1)) * 10) / 10;
  const firstPrice = prices[0] ?? input.current;
  const lastPrice = prices[total] ?? input.current;
  const decadeChange = Math.round(((lastPrice - firstPrice) / Math.max(firstPrice, 1)) * 1000) / 10;

  return { ...copy, points, avgChange, decadeChange };
}
