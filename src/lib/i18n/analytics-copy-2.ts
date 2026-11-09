import type { Locale } from "./config";

/** Kopie sekcji danych rynkowych (kafelki, tabela, wnioski dla inwestora). */
export interface StatsCopy {
  eyebrow: (dataAsOf: string) => string;
  title: (location: string) => string;
  cards: {
    median: string;
    growth: string;
    roiGross: string;
    roiNet: string;
    rent: string;
    days: string;
  };
  daysUnit: (days: number) => string;
  caption: (location: string) => string;
  thArea: string;
  thMedian: string;
  thDiff: string;
  regionRow: (regionName: string) => string;
  insightTitle: string;
  demand: (index: number) => string;
  insightDemand: (demand: string, days: number) => string;
  insightRent: (gross: string, net: string) => string;
  insightCosts: (rate: string) => string;
  insightBuyers: (foreign: string, polish: string) => string;
  badgeOk: string;
  badgeWarn: string;
}

const demandWord = (index: number, locale: Locale): string => {
  if (index >= 8) return locale === "pl" ? "wysoki" : locale === "es" ? "alto" : "high";
  if (index >= 5) return locale === "pl" ? "umiarkowany" : locale === "es" ? "moderado" : "moderate";
  return locale === "pl" ? "niski" : locale === "es" ? "bajo" : "low";
};

export const STATS_COPY: Record<Locale, StatsCopy> = {
  pl: {
    eyebrow: (dataAsOf) => `Dane: ${dataAsOf}`,
    title: (location) => `Ceny i rentowność, ${location}`,
    cards: {
      median: "Mediana ofertowa",
      growth: "Wzrost r/r",
      roiGross: "ROI brutto",
      roiNet: "ROI netto",
      rent: "Czynsz",
      days: "Czas sprzedaży",
    },
    daysUnit: (days) => `${days} dni`,
    caption: (location) =>
      `Porównanie mediany ceny za metr kwadratowy: ${location} na tle miasta i regionu`,
    thArea: "Obszar",
    thMedian: "Mediana €/m²",
    thDiff: "Różnica",
    regionRow: (regionName) => `${regionName} (mediana)`,
    insightTitle: "Co to oznacza dla inwestora",
    demand: (index) => demandWord(index, "pl"),
    insightDemand: (demand, days) =>
      `Popyt w tej lokalizacji jest ${demand}, a mediana ekspozycji oferty to ${days} dni.`,
    insightRent: (gross, net) => `Najem brutto ${gross}, netto po kosztach i podatku ${net}.`,
    insightCosts: (rate) => `Koszty zakupu (ITP/IVA, notariusz, prawnik): ${rate} ceny.`,
    insightBuyers: (foreign, polish) =>
      `Kupujący zagraniczni: ${foreign}, w tym Polacy ${polish}.`,
    badgeOk: "Dane wystarczające do samodzielnej analizy",
    badgeWarn: "Mała próba. Wymagana weryfikacja",
  },
  en: {
    eyebrow: (dataAsOf) => `Data: ${dataAsOf}`,
    title: (location) => `Prices and yields, ${location}`,
    cards: {
      median: "Asking median",
      growth: "Growth YoY",
      roiGross: "Gross ROI",
      roiNet: "Net ROI",
      rent: "Rent",
      days: "Time to sell",
    },
    daysUnit: (days) => `${days} days`,
    caption: (location) =>
      `Median price per square metre compared: ${location} against the city and the region`,
    thArea: "Area",
    thMedian: "Median €/m²",
    thDiff: "Difference",
    regionRow: (regionName) => `${regionName} (median)`,
    insightTitle: "What it means for an investor",
    demand: (index) => demandWord(index, "en"),
    insightDemand: (demand, days) =>
      `Demand in this location is ${demand}, and the median time on market is ${days} days.`,
    insightRent: (gross, net) => `Gross rent ${gross}, net after costs and tax ${net}.`,
    insightCosts: (rate) => `Purchase costs (ITP/IVA, notary, lawyer): ${rate} of the price.`,
    insightBuyers: (foreign, polish) =>
      `Foreign buyers: ${foreign}, including Polish buyers ${polish}.`,
    badgeOk: "Data sufficient for independent analysis",
    badgeWarn: "Small sample. Verification required",
  },
  es: {
    eyebrow: (dataAsOf) => `Datos: ${dataAsOf}`,
    title: (location) => `Precios y rentabilidad, ${location}`,
    cards: {
      median: "Mediana de oferta",
      growth: "Crecimiento interanual",
      roiGross: "ROI bruto",
      roiNet: "ROI neto",
      rent: "Renta",
      days: "Tiempo de venta",
    },
    daysUnit: (days) => `${days} días`,
    caption: (location) =>
      `Comparación de la mediana por metro cuadrado: ${location} frente a la ciudad y la región`,
    thArea: "Zona",
    thMedian: "Mediana €/m²",
    thDiff: "Diferencia",
    regionRow: (regionName) => `${regionName} (mediana)`,
    insightTitle: "Qué significa para el inversor",
    demand: (index) => demandWord(index, "es"),
    insightDemand: (demand, days) =>
      `La demanda en esta zona es ${demand} y la mediana de exposición de la oferta es ${days} días.`,
    insightRent: (gross, net) => `Alquiler bruto ${gross}, neto tras gastos e impuestos ${net}.`,
    insightCosts: (rate) => `Gastos de compra (ITP/IVA, notaría, abogado): ${rate} del precio.`,
    insightBuyers: (foreign, polish) =>
      `Compradores extranjeros: ${foreign}, de ellos polacos ${polish}.`,
    badgeOk: "Datos suficientes para un análisis propio",
    badgeWarn: "Muestra pequeña. Requiere verificación",
  },
};

export function getStatsCopy(locale: Locale): StatsCopy {
  return STATS_COPY[locale] ?? STATS_COPY.pl;
}
