import type { Locale } from "./config";

/** Rok publikacji danych (spójny z market-stats). */
const MARKET_YEAR = 2026;

/**
 * ===========================================================================
 * COPY HUBY RAPORTÓW CENOWYCH (`/[lang]/ceny-m2`)
 * ===========================================================================
 * Metadane tego huba były już tłumaczone, ale CAŁA WIDOCZNA TREŚĆ strony
 * (nagłówek, lead, nagłówki tabeli, eyebrow sekcji) była zaszyta po polsku —
 * użytkownik /en/ i /es/ widział polską tabelę danych.
 */

export interface PriceHubCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  citiesEyebrow: string;
  chooseLocation: string;
  caption: (year: number) => string;
  colCity: string;
  colRegion: string;
  colMedian: string;
  colRoi: string;
  colGrowth: string;
  colDistricts: string;
  regionsEyebrow: string;
  browseRegion: string;
}

export const PRICE_HUB_COPY: Record<Locale, PriceHubCopy> = {
  pl: {
    eyebrow: "Dane rynkowe",
    h1: "Ceny m² i ROI w Hiszpanii",
    lead: "Zestawienie median cen ofertowych, rentowności najmu, dynamiki rocznej i czasu sprzedaży. Każdy raport zawiera porównanie dzielnic i wyliczenie zwrotu dla budżetu inwestora.",
    citiesEyebrow: "Miejscowości",
    chooseLocation: "Wybierz lokalizację",
    caption: (year) => `Mediany cen, ROI i dynamika w miejscowościach Costa Blanca i Costa Cálida — ${year}`,
    colCity: "Miejscowość",
    colRegion: "Region",
    colMedian: "Mediana €/m²",
    colRoi: "ROI",
    colGrowth: "r/r",
    colDistricts: "Dzielnice",
    regionsEyebrow: "Regiony",
    browseRegion: "Przeglądaj po regionie",
  },
  en: {
    eyebrow: "Market data",
    h1: "Spanish property prices and rental yields",
    lead: "Median asking prices, rental yields, annual growth and time on market. Every report includes a district comparison and a return calculation for your budget.",
    citiesEyebrow: "Locations",
    chooseLocation: "Choose a location",
    caption: (year) => `Median prices, yields and growth across Costa Blanca and Costa Cálida — ${year}`,
    colCity: "Location",
    colRegion: "Region",
    colMedian: "Median €/m²",
    colRoi: "Yield",
    colGrowth: "YoY",
    colDistricts: "Areas",
    regionsEyebrow: "Regions",
    browseRegion: "Browse by region",
  },
  es: {
    eyebrow: "Datos de mercado",
    h1: "Precios de la vivienda y rentabilidad en España",
    lead: "Medianas de precio de oferta, rentabilidad del alquiler, crecimiento anual y tiempo de venta. Cada informe incluye comparativa por zonas y cálculo del retorno para tu presupuesto.",
    citiesEyebrow: "Localidades",
    chooseLocation: "Elige una localidad",
    caption: (year) => `Medianas de precio, rentabilidad y crecimiento en Costa Blanca y Costa Cálida — ${year}`,
    colCity: "Localidad",
    colRegion: "Región",
    colMedian: "Mediana €/m²",
    colRoi: "Rentabilidad",
    colGrowth: "Interanual",
    colDistricts: "Zonas",
    regionsEyebrow: "Regiones",
    browseRegion: "Explorar por región",
  },
};

/** Metadane huba raportów (title/description/keywords per język). */
export const PRICE_HUB_META: Record<
  Locale,
  { title: string; description: string; keywords: string[] }
> = {
  pl: {
    title: "Ceny m² i ROI w Hiszpanii. Raporty 2026",
    description:
      "Mediany cen, rentowność najmu i dynamika r/r w 15 miejscowościach Costa Blanca i Costa Cálida. Historia cen 2016–2026 w każdej dzielnicy.",
    keywords: [
      "ceny m2 Costa Blanca",
      "ceny m2 Costa Cálida",
      "historia cen nieruchomości 2016–2026",
      "ceny nieruchomości 2026",
    ],
  },
  en: {
    title: "Spanish property prices & yields 2026 | Reports",
    description:
      "Median €/m², rental yields and annual growth across 15 locations on Costa Blanca and Costa Cálida. Price history 2016–2026 for every district.",
    keywords: [
      "property prices Costa Blanca",
      "price per m2 Costa Cálida",
      "Spanish property price history 2016-2026",
      "rental yield Spain 2026",
    ],
  },
  es: {
    title: "Precios y rentabilidad inmobiliaria 2026 | Informes",
    description:
      "Mediana €/m², rentabilidad de alquiler y crecimiento anual en 15 localidades de Costa Blanca y Costa Cálida. Evolución de precios 2016–2026 por zona.",
    keywords: [
      "precio m2 Costa Blanca",
      "precio m2 Costa Cálida",
      "evolución de precios 2016-2026",
      "rentabilidad alquiler España 2026",
    ],
  },
};
