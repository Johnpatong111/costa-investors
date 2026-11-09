import type { Locale } from "./config";

/**
 * ===========================================================================
 * NAWIGACJA W STOPCE (kolumny „dane” i „poradniki”)
 * ===========================================================================
 * Cel SEO: stopka linkuje nie tylko do hubów usług (które konkurują o te same
 * frazy „wille do kupienia”), ale też do stron danych (ceny m² per miasto,
 * historia cen 2016–2026) i treści poradnikowych. Dzięki temu każda strona
 * przekazuje link do kategorii o innej intencji: transakcyjnej, informacyjnej
 * i danych — a nie wyłącznie do listy ofert.
 */

export interface FooterNavCopy {
  dataNav: string;
  guidesNav: string;
  historyLabel: string;
  calculatorLabel: string;
  guideLabel: string;
  dataHubLabel: string;
}

export const FOOTER_NAV: Record<Locale, FooterNavCopy> = {
  pl: {
    dataNav: "Ceny m² i ROI",
    guidesNav: "Poradniki i narzędzia",
    historyLabel: "Historia cen 2016–2026",
    calculatorLabel: "Kalkulator ROI z najmu",
    guideLabel: "Jak kupić krok po kroku",
    dataHubLabel: "Wszystkie raporty cenowe",
  },
  en: {
    dataNav: "Prices & yields",
    guidesNav: "Guides & tools",
    historyLabel: "Price history 2016-2026",
    calculatorLabel: "Rental ROI calculator",
    guideLabel: "How to buy step by step",
    dataHubLabel: "All price reports",
  },
  es: {
    dataNav: "Precios y rentabilidad",
    guidesNav: "Guías y herramientas",
    historyLabel: "Evolución de precios 2016-2026",
    calculatorLabel: "Calculadora de rentabilidad",
    guideLabel: "Cómo comprar paso a paso",
    dataHubLabel: "Todos los informes de precios",
  },
};
