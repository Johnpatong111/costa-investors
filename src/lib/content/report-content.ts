import type { DistrictEntry } from "../data/repository";
import { deriveDistrictStats, MARKET_YEAR } from "./market-stats";
import {
  describeDemand,
  describeGrowth,
  describePricePosition,
  describeYield,
  estimateInvestment,
} from "./market-insights";
import { interpolate } from "./interpolate";
import { formatEur, formatPrice, formatRate } from "../utils/format";
import { pick } from "./deterministic";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  clip,
  countWords,
  type ContentBlock,
  type FaqItem,
  type PageContent,
} from "./content-utils";

/** Raport cenowo-inwestycyjny /ceny-m2/{city}/{district}. */
export interface PriceComparisonRow {
  name: string;
  pricePerM2: number;
  rentalYield: number;
  priceGrowth: number;
  isCurrent: boolean;
}

export interface PriceReport extends PageContent {
  comparison: PriceComparisonRow[];
}

export function buildPriceReport(entry: DistrictEntry): PriceReport {
  const { city, district, region } = entry;
  const key = `ceny-m2/${city.slug}/${district.slug}`;
  const stats = deriveDistrictStats(city, district, region);
  const example = estimateInvestment(stats, 250_000);

  const vars: Record<string, string> = {
    district: district.name,
    districtLoc: district.nameLocative,
    districtGen: district.nameGenitive,
    city: city.name,
    cityLoc: city.nameLocative,
    cityGen: city.nameGenitive,
    subregion: city.subregion,
    region: region.name,
    price: formatPrice(stats.pricePerM2),
    cityPrice: formatPrice(stats.cityPricePerM2),
    regionPrice: formatPrice(stats.regionPricePerM2),
    rent: stats.monthlyRentPerM2.toFixed(1).replace(".", ","),
    yield: formatRate(stats.rentalYield),
    netYield: formatRate(stats.netYield),
    growth: formatRate(stats.priceGrowth),
    days: String(stats.avgDaysOnMarket),
    volume: formatPrice(stats.transactions12m),
    demand: String(stats.demandIndex),
    demandLabel: describeDemand(stats.demandIndex),
    year: String(MARKET_YEAR),
    dataAsOf: stats.dataAsOf,
    pricePosition: describePricePosition(stats),
    growthSentence: describeGrowth(stats),
    yieldSentence: describeYield(stats),
    characteristic: district.characteristics[0] ?? "zróżnicowana zabudowa",
    purchaseCosts: formatRate(stats.purchaseCostsRate * 100),
    budget70: formatEur(stats.pricePerM2 * 70),
    budget70plus: formatEur(Math.round(stats.pricePerM2 * 70 * (1 + stats.purchaseCostsRate))),
    return5y: formatEur(example.totalReturn5y),
    returnPercent: String(example.totalReturnPercent),
    value5y: formatEur(example.valueIn5Years),
    rent250: formatEur(example.annualRentGross),
    rentNet250: formatEur(example.annualRentNet),
  };
  const t = (template: string) => interpolate(template, vars);

  const h1 = pick(
    [
      `Ceny i ROI w ${district.name} (${city.name}). Raport ${MARKET_YEAR}`,
      `Ceny m² ${district.nameLocative} (${city.name}). Analiza inwestycyjna`,
    ],
    key,
    "h1",
  );

  const metaTitle = clip(
    `Ceny m² i ROI ${district.name} (${city.name}) ${MARKET_YEAR}`,
    MAX_TITLE_LENGTH,
  );

  const metaDescription = clip(
    t(
      "Ceny w {districtLoc}: {price} €/m², ROI {yield}, wzrost {growth} r/r. Raport inwestycyjny: czynsz, koszty zakupu i zwrot z 5 lat.",
    ),
    MAX_DESCRIPTION_LENGTH,
  );

  const lead = t(
    "Mediana ofertowa w {districtLoc} to {price} €/m² (dane: {dataAsOf}), czyli {pricePosition}. Najem daje {yield} brutto i ok. {netYield} netto, a ceny rosną {growth} r/r. Poniżej stawki najmu, koszty zakupu i porównanie z dzielnicami {cityGen}.",
  );

  const ranking = city.districts
    .map((item) => ({ name: item.name, price: item.pricePerM2 }))
    .sort((a, b) => b.price - a.price);
  const priciest = ranking[0];
  const cheapest = ranking[ranking.length - 1];
  const position = ranking.findIndex((row) => row.name === district.name) + 1;

  const blocks: ContentBlock[] = [
    {
      id: "ceny",
      heading: `Ceny nieruchomości w ${district.nameLocative}: ${MARKET_YEAR}`,
      paragraphs: [
        t(
          "Cena zależy od odległości od plaży, roku budowy i standardu osiedla. Przy medianie {price} €/m² lokal 70 m² kosztuje około {budget70}, a po doliczeniu kosztów zakupu ({purchaseCosts}) budżet zamyka się bliżej {budget70plus}.",
        ),
        `Charakterystyka ${district.nameLocative}: ${district.characteristics[0]} oraz ${district.characteristics[1] ?? district.characteristics[0]}. W rankingu cen miasta ${city.nameGenitive} to ${position}. Miejsce (${formatEur(stats.pricePerM2)}/m²). Najdrożej jest w ${priciest?.name ?? city.name} (${formatEur(priciest?.price ?? 0)}/m²), a najtaniej w ${cheapest?.name ?? city.name} (${formatEur(cheapest?.price ?? 0)}/m²).`,
      ],
      bullets: [
        t("Mediana ofertowa: {price} €/m²"),
        t("Dynamika r/r: {growth}"),
        t("Czas ekspozycji oferty: {days} dni"),
        t("Transakcje 12 mies.: {volume}"),
      ],
    },
    {
      id: "roi",
      heading: `ROI i dochód z najmu w ${district.nameLocative}`,
      paragraphs: [
        t(
          "Mediana czynszu to {rent} €/m²/mies., co daje {yield} brutto. Przy budżecie 250 000 € oznacza to około {rent250} € przychodu rocznie i {rentNet250} € po kosztach zarządzania, podatku i pustostanach.",
        ),
        t(
          "Łącząc czynsz ze wzrostem wartości ({growth} r/r) inwestycja w {districtLoc} generuje w 5 lat około {return5y} € zwrotu, czyli {returnPercent}% budżetu. Prognozowana wartość nieruchomości po 5 latach: {value5y} €.",
        ),
      ],
    },
    {
      id: "podatki",
      heading: "Podatki i koszty zakupu w Hiszpanii",
      paragraphs: [
        t(
          "Zakup w {districtLoc} oznacza około {purchaseCosts} kosztów transakcyjnych: ITP 10% (rynek wtórny) lub IVA 10% i AJD (nowe), notariusz, wpis do rejestru i obsługa prawna. Dochodzą koszty roczne (IBI, comunidad, ubezpieczenie) oraz podatek od najmu rozliczany w IRPF.",
        ),
        t(
          "Jako nierezydent rozliczasz najem w Hiszpanii, a w Polsce korzystasz z metody unikania podwójnego opodatkowania. Numer NIE jest obowiązkowy. Bez niego nie kupisz nieruchomości ani nie rozliczysz dochodów.",
        ),
      ],
    },
    {
      id: "metodologia",
      heading: "Metodologia raportu",
      paragraphs: [
        t(
          "Dane pochodzą z median ofertowych i transakcji z ostatnich 12 miesięcy dla {districtLoc} ({volume} transakcji w modelu) i są aktualizowane miesięcznie. Nie stanowią wyceny w rozumieniu hiszpańskich przepisów. Do celów kredytowych wymagana jest tasación bankowa.",
        ),
      ],
    },
    {
      // Blok lokalny raportu: cechy, punkty orientacyjne i porównanie z resztą
      // gminy. Bez niego raporty dzielnic różniły się wyłącznie liczbami, które
      // walidator normalizuje do „#” (stąd Jaccard ~0,9).
      id: "okolica",
      heading: t(`Okolica i zabudowa: {district}`),
      paragraphs: [
        pick(
          [
            t(
              `W {districtLoc} dominują {characteristic}. Zabudowę uzupełniają ${district.characteristics
                .slice(1)
                .join(", ") || "starsze osiedla"}, a punktami orientacyjnymi w ogłoszeniach są ${district.landmarks.join(", ")}. Dla wyceny oznacza to, że dwie nieruchomości o tym samym metrażu mogą różnić się ceną o kilka procent — decyduje ${district.type} i odległość od ${district.landmarks[0] ?? city.name}.`,
            ),
            t(
              `Raport dotyczy ${district.type} w części {subregion}. Cechy rynkowe tej lokalizacji: {characteristic}. W najbliższym sąsiedztwie liczą się ${district.landmarks.join(", ")}, a najemcy zwracają uwagę przede wszystkim na ${district.characteristics[1] ?? district.characteristics[0] ?? "standard wykończenia"}.`,
            ),
          ],
          key,
          "rep-okolica",
        ),
        city.districts.length > 1
          ? `W obrębie ${city.nameGenitive} mediany rozkładają się od ${formatEur(
              Math.min(...city.districts.map((item) => item.pricePerM2)),
            )} €/m² do ${formatEur(Math.max(...city.districts.map((item) => item.pricePerM2)))} €/m². ${district.name} wypada ${describePricePosition(stats)}.`
          : `W modelu danych ${city.name} nie ma innych dzielnic, więc punktem odniesienia pozostaje mediana miasta.`,
      ],
      bullets: city.districts
        .slice()
        .sort((a, b) => b.pricePerM2 - a.pricePerM2)
        .map(
          (item) =>
            `${item.name}: ${formatEur(item.pricePerM2)}/m² · ROI ${formatRate(item.rentalYield)}`,
        ),
    },
  ];

  const faq: FaqItem[] = [
    {
      question: `Ile kosztuje metr kwadratowy w ${district.nameLocative} w ${MARKET_YEAR}?`,
      answer: `Mediana ofertowa wynosi ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}), przy medianie miasta ${city.nameGenitive} ${formatEur(stats.cityPricePerM2)}.`,
    },
    {
      question: `Jakie ROI daje najem w ${district.nameLocative}?`,
      answer: `Brutto ${formatRate(stats.rentalYield)}, netto ok. ${formatRate(stats.netYield)} po kosztach i podatku. Czynsz: ${stats.monthlyRentPerM2.toFixed(1).replace(".", ",")} €/m²/mies.`,
    },
    {
      question: `Czy ceny w ${district.nameLocative} rosną?`,
      answer: `Dynamika roczna to ${formatRate(stats.priceGrowth)}. ${describeGrowth(stats)}.`,
    },
    {
      question: "Jakie koszty poza ceną zapłacę przy zakupie?",
      answer: `Około ${formatRate(stats.purchaseCostsRate * 100)} ceny: ITP/IVA, notariusz, rejestr i obsługa prawna. Dodatkowo ok. 300-800 € rocznie kosztów stałych (IBI, comunidad).`,
    },
  ];

  return {
    key,
    h1,
    lead,
    metaTitle,
    metaDescription,
    keywords: [
      `ceny m2 ${city.name} ${district.name}`,
      `ceny nieruchomości ${district.nameLocative}`,
      `ROI ${city.name} ${district.name}`,
      `inwestycja Hiszpania ${district.name}`,
    ],
    blocks,
    faq,
    processSteps: [],
    stats,
    comparison: city.districts
      .map((item) => ({
        name: item.name,
        pricePerM2: item.pricePerM2,
        rentalYield: item.rentalYield,
        priceGrowth: city.priceGrowth,
        isCurrent: item.slug === district.slug,
      }))
      .sort((a, b) => b.pricePerM2 - a.pricePerM2),
    wordCount: countWords(
      [h1, lead, ...blocks.flatMap((block) => [block.heading, ...block.paragraphs])].join(" "),
    ),
    isIndexable: stats.reliable,
  };
}
