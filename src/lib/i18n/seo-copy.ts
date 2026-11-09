import type { Locale } from "./config";

/**
 * ===========================================================================
 * SEO COPY STRON HUBOWYCH (strona główna, indeks raportów)
 * ===========================================================================
 * Powód istnienia: metadane strony głównej i `/ceny-m2` były zaszyte po polsku
 * w komponencie strony, więc wersje `/en/` i `/es/` serwowały polski title
 * i polskie słowa kluczowe (wyciek językowy + zerowe pokrycie fraz EN/ES).
 *
 * Każdy zestaw obsadza trzy filary:
 *  1. inwestycyjny — property investment / inversión inmobiliaria / inwestycja,
 *  2. doradczy — buyer's agent / agente comprador / agencja kupującego,
 *  3. dane — historia cen 2016–2026 / price history / evolución de precios.
 */

export interface SeoCopy {
  title: string;
  description: string;
  keywords: string[];
}

export const HOME_SEO: Record<Locale, SeoCopy> = {
  pl: {
    title: "Nieruchomości Costa Blanca i Cálida | ROI i ceny 2026",
    description:
      "Apartamenty, wille i domy inwestycyjne w 15 miejscowościach Hiszpanii. Ceny od 120 000 €, ROI z najmu do 6,9%, historia cen 2016–2026. Agencja kupującego po polsku.",
    keywords: [
      "nieruchomości Costa Blanca",
      "inwestycja w nieruchomości Hiszpania",
      "ROI z najmu Alicante",
      "agencja kupującego Hiszpania",
      "buyer's agent Costa Blanca",
      "ceny m2 Costa Blanca 2026",
      "historia cen nieruchomości Hiszpania 2016–2026",
    ],
  },
  en: {
    title: "Property investment Costa Blanca & Cálida | Buyer's agent",
    description:
      "Apartments, villas and investment homes in 15 Spanish locations. Prices from €120,000, gross yields to 6.9%, full 2016–2026 price history. Independent buyer's agent.",
    keywords: [
      "property investment Costa Blanca",
      "buy property in Spain",
      "rental yield Alicante",
      "buyer's agent Spain",
      "Costa Blanca property prices 2026",
      "Spanish property price history 2016-2026",
      "investment homes Costa Cálida",
    ],
  },
  es: {
    title: "Inversión inmobiliaria Costa Blanca y Cálida | Agente",
    description:
      "Apartamentos, chalets y viviendas de inversión en 15 localidades. Precios desde 120.000 €, rentabilidad bruta hasta 6,9%, evolución de precios 2016–2026. Agente comprador.",
    keywords: [
      "inversión inmobiliaria Costa Blanca",
      "comprar vivienda en España",
      "rentabilidad alquiler Alicante",
      "agente comprador España",
      "precio m2 Costa Blanca 2026",
      "evolución precios vivienda 2016-2026",
      "viviendas de inversión Costa Cálida",
    ],
  },
};

/** Fraza „danych” doklejana do raportów cenowych (filar 3). */
export const PRICE_HISTORY_KEYWORD: Record<Locale, string> = {
  pl: "historia cen nieruchomości 2016–2026",
  en: "property price history 2016-2026",
  es: "evolución de precios 2016-2026",
};

/** Frazy doradcze doklejane do hubów usług (filar 2). */
export const ADVISORY_KEYWORDS: Record<Locale, string[]> = {
  pl: ["agencja kupującego Costa Blanca", "buyer's agent Hiszpania", "jak kupić nieruchomość w Hiszpanii krok po kroku"],
  en: ["buyer's agent Costa Blanca", "how to buy property in Spain step by step", "independent buying agent Spain"],
  es: ["agente comprador Costa Blanca", "cómo comprar una vivienda en España paso a paso", "asesor de compra inmobiliaria"],
};
