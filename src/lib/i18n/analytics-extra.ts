import type { Locale } from "./config";

/**
 * Dodatkowe wskaźniki inwestycyjne wyliczane z istniejących danych rynkowych
 * (bez zmian schematu i typów danych). Wszystkie etykiety w 3 językach.
 */
export interface ExtraIndicatorInput {
  pricePerM2: number;
  cityPricePerM2: number;
  regionPricePerM2: number;
  monthlyRentPerM2: number;
  rentalYield: number;
  netYield: number;
  avgDaysOnMarket: number;
  demandIndex: number;
  purchaseCostsRate: number;
  foreignBuyerShare: number;
  transactions12m?: number;
}

const fmt = (value: number, digits = 0) =>
  value.toLocaleString("pl-PL", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export function getExtraIndicators(
  locale: Locale,
  input: ExtraIndicatorInput,
): { label: string; value: string; hint: string }[] {
  const price70 = input.pricePerM2 * 70;
  const purchaseCosts = Math.round((price70 * input.purchaseCostsRate) / 1000) * 1000;
  const rent70 = Math.round(input.monthlyRentPerM2 * 70);
  const spread = input.rentalYield - input.netYield;
  const vsCity = input.cityPricePerM2 > 0 ? ((input.pricePerM2 - input.cityPricePerM2) / input.cityPricePerM2) * 100 : 0;
  const vsRegion =
    input.regionPricePerM2 > 0 ? ((input.pricePerM2 - input.regionPricePerM2) / input.regionPricePerM2) * 100 : 0;
  const liquidity =
    input.avgDaysOnMarket <= 60
      ? locale === "pl" ? "bardzo płynna" : locale === "es" ? "muy líquida" : "very liquid"
      : input.avgDaysOnMarket <= 120
        ? locale === "pl" ? "płynna" : locale === "es" ? "líquida" : "liquid"
        : locale === "pl" ? "wolna" : locale === "es" ? "lenta" : "slow";

  const L = {
    pl: {
      rent: "Czynsz najmu (mieszkanie 70 m²)",
      spread: "Różnica brutto/netto",
      vsCity: "Cena vs mediana miasta",
      vsRegion: "Cena vs mediana regionu",
      liquidity: "Płynność rynku",
      costs: "Koszty zakupu (mieszkanie 70 m²)",
      foreign: "Kupujący zagraniczni",
      hintRent: "Szacunkowy czynsz miesięczny przy 70 m² i medianie €/m².",
      hintSpread: "Klin kosztów utrzymania najmu: zarządzanie, podatki, pustostany.",
      hintLiquidity: "Średni czas ekspozycji oferty na rynku.",
      hintCosts: "ITP/IVA, notariusz, rejestr, obsługa prawna.",
    },
    en: {
      rent: "Rent (70 m² apartment)",
      spread: "Gross vs net yield gap",
      vsCity: "Price vs city median",
      vsRegion: "Price vs regional median",
      liquidity: "Market liquidity",
      costs: "Purchase costs (70 m² apartment)",
      foreign: "Foreign buyers",
      hintRent: "Estimated monthly rent for 70 m² at the local median €/m².",
      hintSpread: "Cost drag of letting: management, taxes, vacancy.",
      hintLiquidity: "Median time on market for a listing.",
      hintCosts: "ITP/VAT, notary, land registry, legal support.",
    },
    es: {
      rent: "Alquiler (piso de 70 m²)",
      spread: "Diferencia bruto/neto",
      vsCity: "Precio vs mediana de la ciudad",
      vsRegion: "Precio vs mediana regional",
      liquidity: "Liquidez del mercado",
      costs: "Gastos de compra (piso de 70 m²)",
      foreign: "Compradores extranjeros",
      hintRent: "Alquiler mensual estimado para 70 m² a la mediana €/m².",
      hintSpread: "Coste de explotación: gestión, impuestos, vacíos.",
      hintLiquidity: "Tiempo medio de exposición de la oferta.",
      hintCosts: "ITP/IVA, notaría, registro, soporte legal.",
    },
  }[locale];

  const items = [
    { label: L.rent, value: `${fmt(rent70)} €`, hint: L.hintRent },
    { label: L.spread, value: `${fmt(spread, 1)} pp`, hint: L.hintSpread },
    { label: L.vsCity, value: `${vsCity >= 0 ? "+" : ""}${fmt(vsCity, 1)}%`, hint: "" },
    { label: L.vsRegion, value: `${vsRegion >= 0 ? "+" : ""}${fmt(vsRegion, 1)}%`, hint: "" },
    { label: L.liquidity, value: `${liquidity}, ${input.avgDaysOnMarket} d`, hint: L.hintLiquidity },
    { label: L.costs, value: `${fmt(purchaseCosts)} €`, hint: L.hintCosts },
    { label: L.foreign, value: `${fmt(input.foreignBuyerShare)}%`, hint: "" },
  ];

  if (typeof input.transactions12m === "number") {
    items.push({
      label: locale === "pl" ? "Transakcje w 12 mies." : locale === "es" ? "Operaciones 12 meses" : "Transactions (12 m)",
      value: fmt(input.transactions12m),
      hint: "",
    });
  }

  return items;
}
