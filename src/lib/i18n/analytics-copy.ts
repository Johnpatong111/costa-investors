import type { Locale } from "./config";

/** Kopie kalkulatora ROI i sekcji danych rynkowych (PL/EN/ES). */
export interface CalcCopy {
  eyebrow: string;
  title: (location: string) => string;
  yields: (roi: string, growth: string) => string;
  badge: string;
  budgetLegend: string;
  exactLabel: string;
  hint: (area: number, costs: string) => string;
  rentLabel: string;
  netLabel: string;
  returnLabel: string;
  ofBudget: (percent: number) => string;
  provideBudget: string;
  value5: string;
  cta: string;
  disclaimer: string;
  presets: { value: number; label: string; hint: string }[];
}

export const CALC_COPY: Record<Locale, CalcCopy> = {
  pl: {
    eyebrow: "Kalkulator ROI",
    title: (location) => `Ile zarobisz w ${location}?`,
    yields: (roi, growth) => `ROI brutto ${roi} · wzrost ${growth} r/r`,
    badge: "bez zobowiązań",
    budgetLegend: "Budżet inwestycji",
    exactLabel: "Dokładna kwota (EUR)",
    hint: (area, costs) => `Za tę kwotę kupisz ok. ${area} m² · koszty zakupu (ok. 13,5%): ${costs}`,
    rentLabel: "Czynsz rocznie",
    netLabel: "netto ok.",
    returnLabel: "Zwrot 5 lat",
    ofBudget: (percent) => `${percent}% budżetu`,
    provideBudget: "podaj budżet",
    value5: "Prognozowana wartość po 5 latach",
    cta: "Chcę ofertę dla tego budżetu",
    disclaimer:
      "Model szacunkowy na podstawie median rynkowych. Nie stanowi gwarancji zwrotu ani oferty inwestycyjnej.",
    presets: [
      { value: 150_000, label: "do 150 tys. €", hint: "kawalerka lub mały apartament" },
      { value: 300_000, label: "150-300 tys. €", hint: "apartament 2 pokoje blisko plaży" },
      { value: 500_000, label: "300-500 tys. €", hint: "apartament premium lub bungalow" },
      { value: 750_000, label: "500 tys. € +", hint: "villa z basenem" },
    ],
  },
  en: {
    eyebrow: "ROI calculator",
    title: (location) => `How much can you earn in ${location}?`,
    yields: (roi, growth) => `Gross ROI ${roi} · growth ${growth} YoY`,
    badge: "no obligation",
    budgetLegend: "Investment budget",
    exactLabel: "Exact amount (EUR)",
    hint: (area, costs) => `For this budget you can buy about ${area} m² · purchase costs (approx. 13.5%): ${costs}`,
    rentLabel: "Annual rent",
    netLabel: "net approx.",
    returnLabel: "5-year return",
    ofBudget: (percent) => `${percent}% of budget`,
    provideBudget: "enter budget",
    value5: "Projected value after 5 years",
    cta: "Get offers for this budget",
    disclaimer:
      "Estimate based on market medians. Not a guarantee of returns or an investment offer.",
    presets: [
      { value: 150_000, label: "up to €150k", hint: "studio or small apartment" },
      { value: 300_000, label: "€150-300k", hint: "two-bedroom near the beach" },
      { value: 500_000, label: "€300-500k", hint: "premium apartment or bungalow" },
      { value: 750_000, label: "€500k +", hint: "villa with a pool" },
    ],
  },
  es: {
    eyebrow: "Calculadora de ROI",
    title: (location) => `¿Cuánto puedes ganar en ${location}?`,
    yields: (roi, growth) => `ROI bruto ${roi} · crecimiento ${growth} interanual`,
    badge: "sin compromiso",
    budgetLegend: "Presupuesto de inversión",
    exactLabel: "Importe exacto (EUR)",
    hint: (area, costs) => `Con este presupuesto compras unos ${area} m² · gastos de compra (aprox. 13,5%): ${costs}`,
    rentLabel: "Renta anual",
    netLabel: "neto aprox.",
    returnLabel: "Retorno a 5 años",
    ofBudget: (percent) => `${percent}% del presupuesto`,
    provideBudget: "indica presupuesto",
    value5: "Valor proyectado a 5 años",
    cta: "Quiero ofertas para este presupuesto",
    disclaimer:
      "Estimación basada en medianas de mercado. No garantiza rentabilidad ni constituye una oferta de inversión.",
    presets: [
      { value: 150_000, label: "hasta 150 mil €", hint: "estudio o piso pequeño" },
      { value: 300_000, label: "150-300 mil €", hint: "piso de 2 dormitorios cerca de la playa" },
      { value: 500_000, label: "300-500 mil €", hint: "piso premium o bungalow" },
      { value: 750_000, label: "500 mil € +", hint: "villa con piscina" },
    ],
  },
};

export function getCalcCopy(locale: Locale): CalcCopy {
  return CALC_COPY[locale] ?? CALC_COPY.pl;
}
