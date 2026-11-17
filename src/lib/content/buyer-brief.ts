import type { CitySeed, RegionSeed } from "../data/schema";
import type { DistrictEntry } from "../data/repository";
import { deriveDistrictStats, type MarketStats } from "./market-stats";
import { regionTax } from "./region-facts";
import { formatEurLocale, formatRateLocale } from "../utils/format";
import type { ContentBlock } from "./content-utils";
import type { Locale } from "../i18n/config";

/**
 * Unikalne bloki decyzyjne dla stron usług: scenariusze budżetowe, rankingi
 * dzielnic (ROI/wzrost/płynność/cena), ryzyko płynności i profil kupującego.
 * Wszystkie liczby pochodzą z modelu danych, żadne nie są wymyślone.
 */

const eur = (value: number, locale: Locale) => formatEurLocale(Math.round(value), locale);
const rate = (value: number, locale: Locale) => formatRateLocale(value, locale);

function labels(locale: Locale) {
  return locale === "es"
    ? { budget: "Presupuesto de compra", ranking: "Zonas según el objetivo", risk: "Riesgo y liquidez", profile: "Quién compra aquí", entry: "Entrada", mid: "Segmento medio", premium: "Gama alta" }
    : locale === "en"
      ? { budget: "Buying budget", ranking: "Areas by objective", risk: "Risk and liquidity", profile: "Who buys here", entry: "Entry", mid: "Mid-market", premium: "Premium" }
      : { budget: "Budżet zakupu", ranking: "Dzielnice pod cel", risk: "Ryzyko i płynność", profile: "Kto tu kupuje", entry: "Start", mid: "Środek rynku", premium: "Górna półka" };
}

function scenarioLine(
  locale: Locale,
  label: string,
  size: number,
  place: string,
  stats: MarketStats,
): string {
  const price = stats.pricePerM2 * size;
  const costs = price * stats.purchaseCostsRate;
  const total = price + costs;
  const rent = ((stats.pricePerM2 * stats.rentalYield) / 100 / 12) * size;
  const annualNet = rent * 12 * (stats.netYield / Math.max(stats.rentalYield, 0.1));
  if (locale === "es") {
    return `${label}: ${size} m² en ${place} - ${eur(price, locale)} + ${eur(costs, locale)} de gastos = ${eur(total, locale)}; alquiler ${eur(rent, locale)}/mes, ${rate(stats.rentalYield, locale)} bruto y ${rate(stats.netYield, locale)} neto (${eur(annualNet, locale)}/año).`;
  }
  if (locale === "en") {
    return `${label}: ${size} m² in ${place} - ${eur(price, locale)} + ${eur(costs, locale)} costs = ${eur(total, locale)}; rent ${eur(rent, locale)}/month, ${rate(stats.rentalYield, locale)} gross and ${rate(stats.netYield, locale)} net (${eur(annualNet, locale)}/year).`;
  }
  return `${label}: ${size} m² w ${place} - ${eur(price, locale)} + ${eur(costs, locale)} kosztów = ${eur(total, locale)}; czynsz ${eur(rent, locale)}/mies., ${rate(stats.rentalYield, locale)} brutto i ${rate(stats.netYield, locale)} netto (${eur(annualNet, locale)}/rok).`;
}

function topBy<T>(items: T[], value: (item: T) => number, count = 3): T[] {
  return [...items].sort((a, b) => value(b) - value(a)).slice(0, count);
}

function taxLine(region: RegionSeed, locale: Locale): string {
  const tax = regionTax(region.slug);
  return locale === "es"
    ? `ITP del ${tax.itp}% en ${tax.authority} para segunda mano, o IVA del 10% más AJD en obra nueva, más notaría, registro y abogado.`
    : locale === "en"
      ? `${tax.itp}% transfer tax in ${tax.authority} on resale, or 10% VAT plus stamp duty on new-build, plus notary, registry and legal fees.`
      : `ITP ${tax.itp}% w ${tax.authority} dla rynku wtórnego albo VAT 10% + AJD przy nowym budownictwie, plus notariusz, rejestr i prawnik.`;
}

export function buildCityBuyerBrief(
  city: CitySeed,
  region: RegionSeed,
  stats: MarketStats,
  locale: Locale,
): ContentBlock[] {
  const l = labels(locale);
  const ranked = city.districts.map((district) => ({
    district,
    stats: deriveDistrictStats(city, district, region),
  }));
  const byPrice = [...ranked].sort((a, b) => a.stats.pricePerM2 - b.stats.pricePerM2);
  const byYield = topBy(ranked, (item) => item.stats.rentalYield);
  const byGrowth = topBy(ranked, (item) => item.stats.priceGrowth);
  const bySpeed = [...ranked]
    .sort((a, b) => a.stats.avgDaysOnMarket - b.stats.avgDaysOnMarket)
    .slice(0, 3);
  const entry = byPrice[0];
  const premium = byPrice[byPrice.length - 1];
  const spread = entry && premium ? premium.stats.pricePerM2 - entry.stats.pricePerM2 : 0;

  const scenarios = [
    scenarioLine(locale, l.entry, 60, entry?.district.name ?? city.name, entry?.stats ?? stats),
    scenarioLine(locale, l.mid, 75, city.name, stats),
    scenarioLine(
      locale,
      l.premium,
      95,
      premium?.district.name ?? city.name,
      premium?.stats ?? stats,
    ),
  ];

  const intro =
    locale === "es"
      ? `La mediana es ${eur(stats.pricePerM2, locale)}/m² y los gastos de entrada rondan el ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Abajo tienes tres umbrales de presupuesto, de la zona más barata a la más cara.`
      : locale === "en"
        ? `The median is ${eur(stats.pricePerM2, locale)}/m² and entry costs are about ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Below are three budget thresholds, from the cheapest area to the most expensive.`
        : `Mediana to ${eur(stats.pricePerM2, locale)}/m², a koszty wejścia około ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Poniżej trzy progi budżetowe, od najtańszej dzielnicy po najdroższą.`;

  const rankLine =
    locale === "es"
      ? `Mayor rentabilidad: ${byYield.map((item) => `${item.district.name} (${rate(item.stats.rentalYield, locale)})`).join(", ")}. Mayor crecimiento: ${byGrowth.map((item) => `${item.district.name} (${rate(item.stats.priceGrowth, locale)})`).join(", ")}. Venta más rápida: ${bySpeed.map((item) => `${item.district.name} (${item.stats.avgDaysOnMarket} días)`).join(", ")}. Entrada más barata: ${byPrice.slice(0, 2).map((item) => `${item.district.name} (${eur(item.stats.pricePerM2, locale)}/m²)`).join(" y ")}; la más cara: ${premium?.district.name ?? city.name} (${eur(premium?.stats.pricePerM2 ?? stats.pricePerM2, locale)}/m²).`
      : locale === "en"
        ? `Highest yield: ${byYield.map((item) => `${item.district.name} (${rate(item.stats.rentalYield, locale)})`).join(", ")}. Fastest growth: ${byGrowth.map((item) => `${item.district.name} (${rate(item.stats.priceGrowth, locale)})`).join(", ")}. Quickest sales: ${bySpeed.map((item) => `${item.district.name} (${item.stats.avgDaysOnMarket} days)`).join(", ")}. Cheapest entry: ${byPrice.slice(0, 2).map((item) => `${item.district.name} (${eur(item.stats.pricePerM2, locale)}/m²)`).join(" and ")}; the most expensive: ${premium?.district.name ?? city.name} (${eur(premium?.stats.pricePerM2 ?? stats.pricePerM2, locale)}/m²).`
        : `Najwyższe ROI: ${byYield.map((item) => `${item.district.name} (${rate(item.stats.rentalYield, locale)})`).join(", ")}. Największa dynamika: ${byGrowth.map((item) => `${item.district.name} (${rate(item.stats.priceGrowth, locale)})`).join(", ")}. Najszybciej sprzedają się: ${bySpeed.map((item) => `${item.district.name} (${item.stats.avgDaysOnMarket} dni)`).join(", ")}. Najtaniej wejść: ${byPrice.slice(0, 2).map((item) => `${item.district.name} (${eur(item.stats.pricePerM2, locale)}/m²)`).join(" i ")}; najdrożej: ${premium?.district.name ?? city.name} (${eur(premium?.stats.pricePerM2 ?? stats.pricePerM2, locale)}/m²).`;

  const riskLine =
    locale === "es"
      ? `Exposición media ${stats.avgDaysOnMarket} días, ${stats.transactions12m} operaciones al año, ${rate(stats.foreignBuyerShare, locale)} de compradores extranjeros (${rate(stats.polishBuyerShare, locale)} de Polonia), demanda ${stats.demandIndex}/10 y una horquilla interna de ${eur(spread, locale)}/m². ${stats.avgDaysOnMarket > 140 ? "El ritmo es lento: hay margen para negociar, pero revisa por qué una vivienda lleva tanto tiempo en el mercado." : stats.avgDaysOnMarket > 100 ? "El ritmo es normal: compara varias unidades antes de ofertar." : "El mercado está líquido: una vivienda bien priced desaparece rápido."}`
      : locale === "en"
        ? `Average time on market ${stats.avgDaysOnMarket} days, ${stats.transactions12m} sales a year, ${rate(stats.foreignBuyerShare, locale)} foreign buyers (${rate(stats.polishBuyerShare, locale)} from Poland), demand ${stats.demandIndex}/10 and an internal spread of ${eur(spread, locale)}/m². ${stats.avgDaysOnMarket > 140 ? "The pace is slow: room to negotiate, but check why a home has been listed for so long." : stats.avgDaysOnMarket > 100 ? "The pace is normal: compare several units before offering." : "The market is liquid: a well-priced home disappears quickly."}`
        : `Ekspozycja ${stats.avgDaysOnMarket} dni, ${stats.transactions12m} transakcji rocznie, ${rate(stats.foreignBuyerShare, locale)} kupujących z zagranicy (${rate(stats.polishBuyerShare, locale)} z Polski), popyt ${stats.demandIndex}/10 i rozstrzał ${eur(spread, locale)}/m². ${stats.avgDaysOnMarket > 140 ? "Tempo jest wolne: jest miejsce na negocjacje, ale sprawdź, dlaczego lokal tak długo jest w ofercie." : stats.avgDaysOnMarket > 100 ? "Tempo jest normalne: porównaj kilka lokali przed ofertą." : "Rynek jest płynny: dobrze wyceniony lokal znika szybko."}`;

  const ratio = stats.pricePerM2 / Math.max(1, stats.regionPricePerM2);
  const position =
    ratio < 0.9
      ? locale === "es" ? "por debajo de la media regional" : locale === "en" ? "below the regional average" : "poniżej średniej regionu"
      : ratio < 1.1
        ? locale === "es" ? "en línea con la media regional" : locale === "en" ? "in line with the regional average" : "na poziomie średniej regionu"
        : locale === "es" ? "por encima de la media regional" : locale === "en" ? "above the regional average" : "powyżej średniej regionu";
  const buyerType =
    stats.rentalYield >= 6
      ? locale === "es" ? "inversores de alquiler" : locale === "en" ? "long-term rental investors" : "inwestorów na najem"
      : stats.priceGrowth >= 8
        ? locale === "es" ? "segunda vivienda y capital" : locale === "en" ? "second-home and capital buyers" : "kupujących drugi dom i kapitał"
        : locale === "es" ? "compradores para uso propio" : locale === "en" ? "owner-occupiers" : "kupujących do własnego użytku";
  const profile =
    locale === "es"
      ? `Con ${eur(stats.pricePerM2, locale)}/m², ${city.name} está ${position}. Mejor perfil: ${buyerType}, con ${rate(stats.rentalYield, locale)} bruto, ${rate(stats.netYield, locale)} neto y ${rate(stats.priceGrowth, locale)} de crecimiento. Para cash flow mira las zonas con más ROI; para revalorización, las de mayor crecimiento.`
      : locale === "en"
        ? `At ${eur(stats.pricePerM2, locale)}/m², ${city.name} sits ${position}. Best-fit profile: ${buyerType}, with ${rate(stats.rentalYield, locale)} gross, ${rate(stats.netYield, locale)} net and ${rate(stats.priceGrowth, locale)} growth. For cash flow see the highest-yield areas; for appreciation, the fastest-growing ones.`
        : `Przy ${eur(stats.pricePerM2, locale)}/m² ${city.name} jest ${position}. Najlepszy profil: ${buyerType}, przy ${rate(stats.rentalYield, locale)} brutto, ${rate(stats.netYield, locale)} netto i ${rate(stats.priceGrowth, locale)} wzrostu. Pod cash flow patrz na dzielnice z najwyższym ROI; pod wzrost wartości - na te z największą dynamiką.`;

  const microGuide =
    locale === "pl"
      ? `Mikroprzewodnik po gminie: ${byPrice
          .slice(0, 5)
          .map(
            (item) =>
              `${item.district.name} - ${item.district.characteristics[0] ?? item.district.landmarks[0]} (${eur(item.stats.pricePerM2, locale)}/m², ROI ${rate(item.stats.rentalYield, locale)})`,
          )
          .join("; ")}.`
      : locale === "en"
        ? `Micro-guide: ${byPrice
            .slice(0, 5)
            .map(
              (item) =>
                `${item.district.name} - ${item.district.landmarks[0] ?? item.district.name} (${eur(item.stats.pricePerM2, locale)}/m², ${rate(item.stats.rentalYield, locale)} yield)`,
            )
            .join("; ")}.`
        : `Microguía: ${byPrice
            .slice(0, 5)
            .map(
              (item) =>
                `${item.district.name} - ${item.district.landmarks[0] ?? item.district.name} (${eur(item.stats.pricePerM2, locale)}/m², ${rate(item.stats.rentalYield, locale)} bruto)`,
            )
            .join("; ")}.`;

  return [
    {
      id: "budzet",
      heading: `${l.budget} - ${city.name}`,
      paragraphs: [intro],
      bullets: [...scenarios, locale === "es" ? "Cifras estimadas para una vivienda estándar; no incluyen IBI, comunidad ni seguro." : locale === "en" ? "Estimates for a standard home; they exclude IBI, community fees and insurance." : "Kwoty szacunkowe dla standardowego mieszkania; nie obejmują IBI, wspólnoty ani ubezpieczenia."],
    },
    { id: "rankingi", heading: `${l.ranking} - ${city.name}`, paragraphs: [rankLine, microGuide] },
    { id: "ryzyko", heading: `${l.risk} - ${city.name}`, paragraphs: [riskLine] },
    { id: "profil-kupujacego", heading: `${l.profile} - ${city.name}`, paragraphs: [profile] },
  ];
}

function districtTypeLabel(type: string, locale: Locale): string {
  const map: Record<Locale, Record<string, string>> = {
    pl: { plaza: "plaża", urbanizacja: "urbanizacja", dzielnica: "dzielnica", osiedle: "osiedle" },
    en: { plaza: "beachfront area", urbanizacja: "residential estate", dzielnica: "urban district", osiedle: "housing estate" },
    es: { plaza: "zona de playa", urbanizacja: "urbanización", dzielnica: "barrio", osiedle: "residencial" },
  };
  return map[locale][type] ?? type;
}

export function buildDistrictBuyerBrief(
  entry: DistrictEntry,
  stats: MarketStats,
  locale: Locale,
): ContentBlock[] {
  const l = labels(locale);
  const { city, district, region } = entry;
  const siblings = city.districts
    .filter((item) => item.slug !== district.slug)
    .map((item) => ({ district: item, stats: deriveDistrictStats(city, item, region) }));
  const byPrice = [...siblings].sort((a, b) => a.stats.pricePerM2 - b.stats.pricePerM2);
  const cheaper = byPrice[0];
  const pricier = byPrice[byPrice.length - 1];
  const bestYield = topBy(siblings, (item) => item.stats.rentalYield, 1)[0];
  const citySpread =
    city.districts.length > 1
      ? Math.max(...city.districts.map((item) => item.pricePerM2)) -
        Math.min(...city.districts.map((item) => item.pricePerM2))
      : 0;

  const scenarios = [45, 70, 95].map((size, index) =>
    scenarioLine(
      locale,
      [l.entry, l.mid, l.premium][index] ?? l.mid,
      size,
      district.name,
      stats,
    ),
  );

  const intro =
    locale === "es"
      ? `En ${district.name} la mediana es ${eur(stats.pricePerM2, locale)}/m², frente a ${eur(stats.cityPricePerM2, locale)}/m² en ${city.name}. Los gastos de entrada rondan el ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Abajo tienes tres tamaños típicos para ver el presupuesto total, no solo el precio del metro.`
      : locale === "en"
        ? `In ${district.name} the median is ${eur(stats.pricePerM2, locale)}/m², against ${eur(stats.cityPricePerM2, locale)}/m² across ${city.name}. Entry costs are about ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Below are three typical sizes so you see the full budget, not just the price per metre.`
        : `W ${district.name} mediana to ${eur(stats.pricePerM2, locale)}/m², przy ${eur(stats.cityPricePerM2, locale)}/m² dla całego ${city.name}. Koszty wejścia to około ${rate(stats.purchaseCostsRate * 100, locale)}: ${taxLine(region, locale)} Poniżej trzy typowe metraże, żeby zobaczyć cały budżet, a nie tylko cenę metra.`;

  const vsCity = (stats.pricePerM2 / Math.max(1, stats.cityPricePerM2) - 1) * 100;
  const comparison =
    locale === "es"
      ? `Frente a la media municipal, ${district.name} está ${vsCity >= 0 ? "un " + rate(Math.abs(vsCity), locale) + " por encima" : "un " + rate(Math.abs(vsCity), locale) + " por debajo"}. ${cheaper ? `Más barato: ${cheaper.district.name} (${eur(cheaper.stats.pricePerM2, locale)}/m²).` : ""} ${pricier ? `Más caro: ${pricier.district.name} (${eur(pricier.stats.pricePerM2, locale)}/m²).` : ""} ${bestYield ? `Mejor rentabilidad: ${bestYield.district.name} (${rate(bestYield.stats.rentalYield, locale)}).` : ""} La horquilla del municipio es ${eur(citySpread, locale)}/m², así que la dirección exacta pesa más que la media de ${city.name}.`
      : locale === "en"
        ? `Against the municipal average, ${district.name} sits ${vsCity >= 0 ? rate(Math.abs(vsCity), locale) + " above" : rate(Math.abs(vsCity), locale) + " below"}. ${cheaper ? `Cheaper: ${cheaper.district.name} (${eur(cheaper.stats.pricePerM2, locale)}/m²).` : ""} ${pricier ? `More expensive: ${pricier.district.name} (${eur(pricier.stats.pricePerM2, locale)}/m²).` : ""} ${bestYield ? `Best yield: ${bestYield.district.name} (${rate(bestYield.stats.rentalYield, locale)}).` : ""} The municipal spread is ${eur(citySpread, locale)}/m², so the exact address matters more than the ${city.name} average.`
        : `Na tle średniej miasta ${district.name} jest ${vsCity >= 0 ? "o " + rate(Math.abs(vsCity), locale) + " droższa" : "o " + rate(Math.abs(vsCity), locale) + " tańsza"}. ${cheaper ? `Taniej: ${cheaper.district.name} (${eur(cheaper.stats.pricePerM2, locale)}/m²).` : ""} ${pricier ? `Drożej: ${pricier.district.name} (${eur(pricier.stats.pricePerM2, locale)}/m²).` : ""} ${bestYield ? `Najwyższe ROI: ${bestYield.district.name} (${rate(bestYield.stats.rentalYield, locale)}).` : ""} Rozstrzał gminy to ${eur(citySpread, locale)}/m², więc konkretny adres waży więcej niż średnia ${city.name}.`;

  const landmarks = district.landmarks.join(", ");
  const riskLine =
    locale === "es"
      ? `Exposición ${stats.avgDaysOnMarket} días, demanda ${stats.demandIndex}/10 y ${rate(stats.foreignBuyerShare, locale)} de compradores extranjeros en el municipio. Referencias de los anuncios: ${landmarks}. ${stats.avgDaysOnMarket > 140 ? "Ritmo lento: negocia precio y plazo, pero revisa por qué lleva tanto tiempo en el mercado." : stats.avgDaysOnMarket > 100 ? "Ritmo normal: compara varias unidades antes de ofertar." : "Mercado líquido: una vivienda bien priced desaparece rápido."}`
      : locale === "en"
        ? `Time on market ${stats.avgDaysOnMarket} days, demand ${stats.demandIndex}/10 and ${rate(stats.foreignBuyerShare, locale)} foreign buyers in the municipality. Listing landmarks: ${landmarks}. ${stats.avgDaysOnMarket > 140 ? "Slow pace: negotiate price and timing, but check why it has been listed so long." : stats.avgDaysOnMarket > 100 ? "Normal pace: compare several units before offering." : "Liquid market: a well-priced home disappears quickly."}`
        : `Ekspozycja ${stats.avgDaysOnMarket} dni, popyt ${stats.demandIndex}/10 i ${rate(stats.foreignBuyerShare, locale)} kupujących z zagranicy w gminie. Punkty odniesienia z ogłoszeń: ${landmarks}. ${stats.avgDaysOnMarket > 140 ? "Tempo wolne: negocjuj cenę i termin, ale sprawdź, dlaczego lokal tak długo jest w ofercie." : stats.avgDaysOnMarket > 100 ? "Tempo normalne: porównaj kilka lokali przed ofertą." : "Rynek płynny: dobrze wyceniony lokal znika szybko."}`;

  const profile =
    locale === "es"
      ? `${district.name} es una ${districtTypeLabel(district.type, locale)} junto a ${landmarks}. ${stats.rentalYield >= 6 ? `Con ${rate(stats.rentalYield, locale)} brutto es una zona de alquiler: el comprador busca cash flow.` : `Con ${rate(stats.rentalYield, locale)} brutto y ${rate(stats.priceGrowth, locale)} de crecimiento pesa más la revalorización.`} Revisa estado del edificio, comunidad y distancia real a ${district.landmarks[0] ?? city.name}.`
      : locale === "en"
        ? `${district.name} is a ${districtTypeLabel(district.type, locale)} next to ${landmarks}. ${stats.rentalYield >= 6 ? `At ${rate(stats.rentalYield, locale)} gross it is a rental area: buyers want cash flow.` : `At ${rate(stats.rentalYield, locale)} gross and ${rate(stats.priceGrowth, locale)} growth, appreciation matters more.`} Check building condition, community fees and the real distance to ${district.landmarks[0] ?? city.name}.`
        : `${district.name} to ${districtTypeLabel(district.type, locale)} przy ${landmarks}. ${stats.rentalYield >= 6 ? `Przy ${rate(stats.rentalYield, locale)} brutto to strefa najmu: kupujący szuka cash flow.` : `Przy ${rate(stats.rentalYield, locale)} brutto i ${rate(stats.priceGrowth, locale)} wzrostu większe znaczenie ma wzrost wartości.`} Sprawdź stan budynku, koszty wspólnoty i realną odległość od ${district.landmarks[0] ?? city.name}.`;

  return [
    {
      id: "budzet",
      heading: `${l.budget} - ${district.name}`,
      paragraphs: [intro],
      bullets: scenarios,
    },
    {
      id: "porownanie",
      heading: locale === "es" ? `Frente a ${city.name}` : locale === "en" ? `Against ${city.name}` : `Na tle ${city.name}`,
      paragraphs: [comparison],
    },
    {
      id: "ryzyko",
      heading: `${l.risk} - ${district.name}`,
      paragraphs: [riskLine],
      bullets:
        locale === "pl"
          ? [`Ekspozycja: ${stats.avgDaysOnMarket} dni`, `Popyt: ${stats.demandIndex}/10`, `Charakter zabudowy: ${district.characteristics.join(", ")}`]
          : [locale === "es" ? `Exposición: ${stats.avgDaysOnMarket} días` : `Time on market: ${stats.avgDaysOnMarket} days`, locale === "es" ? `Demanda: ${stats.demandIndex}/10` : `Demand: ${stats.demandIndex}/10`],
    },
    { id: "profil-kupujacego", heading: `${l.profile} - ${district.name}`, paragraphs: [profile] },
  ];
}




