import type { CitySeed } from "../data/schema";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import { formatEur, formatRate } from "../utils/format";
import type { ContentBlock, FaqItem } from "./content-utils";
import { pick } from "./deterministic";
import { getNearbyCities } from "../data/repository";

/**
 * Bloki strony miejskiej. Porównanie lokalizacji i danych inwestycyjnych.
 *
 * Warianty fraz + porównanie z sąsiednimi gminami: strony tej samej usługi w
 * różnych miastach miały identyczny szkielet (różniły się tylko liczbami, które
 * walidator normalizuje), więc schodziły do Jaccarda ~0,85.
 */
export function buildCityBlocks(
  city: CitySeed,
  service: ServiceDefinition,
  t: (template: string) => string,
  vars: Record<string, string>,
  key: string,
  stats: MarketStats,
): ContentBlock[] {
  const districtBullets = city.districts
    .slice()
    .sort((a, b) => b.pricePerM2 - a.pricePerM2)
    .map(
      (district) =>
        `${district.name}: ${formatEur(district.pricePerM2)}/m² · ROI ${formatRate(district.rentalYield)}`,
    );

  const neighbours = getNearbyCities(city, 3);
  const cheaper = neighbours.filter((item) => item.pricePerM2 < city.pricePerM2);
  const pricier = neighbours.filter((item) => item.pricePerM2 > city.pricePerM2);

  const openers = [
    t(
      `Mediana ofertowa w {cityLoc} to {cityPrice} €/m² przy dynamice {growth} r/r. Na tle regionu {region} ({regionPrice} €/m²) miasto wypada ${pricePositionLabel(stats)}. Ekspozycja oferty to średnio {days} dni, a rocznie zawieranych jest około {volume} transakcji.`,
    ),
    t(
      `Za metr w {cityLoc} płaci się około {cityPrice} €/m² (dane: 2026-01). Wzrost {growth} r/r i {days} dni średniej ekspozycji oznaczają, że rynek pracuje w normalnym tempie: jest czas na analizę, ale nie na wielotygodniowe negocjacje. Punktem odniesienia pozostaje {regionPrice} €/m² w regionie {region}.`,
    ),
    t(
      `{city} to jeden z filarów regionu {region}, gdzie mediana {cityPrice} €/m² kontrastuje z {regionPrice} €/m² dla całego wybrzeża. Popyt zagraniczny ({foreign}, w tym {polish} z Polski) i {growth} wzrostu r/r tworzą rynek głęboki, ale coraz mniej okazyjny.`,
    ),
  ];

  const comparison = [
    cheaper.length > 0
      ? `Taniej jest w ${cheaper.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" i ")}.`
      : "",
    pricier.length > 0
      ? `Wyżej wyceniane są ${pricier.map((item) => `${item.name} (${formatEur(item.pricePerM2)} €/m²)`).join(" i ")}.`
      : "",
    city.districts.length > 1
      ? `W samej gminie rozstrzał sięga ${formatEur(
          Math.max(...city.districts.map((item) => item.pricePerM2)) -
            Math.min(...city.districts.map((item) => item.pricePerM2)),
        )} €/m² między najdroższą a najtańszą dzielnicą.`
      : `Gmina nie jest podzielona na dzielnice w naszym modelu danych.`,
  ]
    .filter(Boolean)
    .join(" ");

  const serviceAngle: Record<string, string> = {
    buy: t(
      `Dla kupującego na własne potrzeby: przy medianie {cityPrice} €/m² lokal 70 m² to około ${formatEur(city.pricePerM2 * 70)} przed kosztami, a miasto dzieli się na ${city.districts.length} stref cenowych.`,
    ),
    villa: t(
      `Dla kupującego dom z basenem: w ${city.name} działka waży tyle samo co budynek, więc warto porównać ${city.districts[0]?.name ?? city.name} z kosztem budowy nowego domu.`,
    ),
    investment: t(
      `Dla inwestora: {yield} brutto i {netYield} netto przy ekspozycji {days} dni. O zwrocie decyduje rozkład cen w dzielnicach ${city.nameGenitive}, a nie sama mediana miasta.`,
    ),
    "lead-magnet": t(
      `Dla wyceny: zacznij od mediany miasta ({cityPrice} €/m²), kosztów wejścia ({purchaseCosts}) i rozkładu cen po dzielnicach - dopiero potem zamawiaj analizę konkretnego lokalu.`,
    ),
  };

  return [
    {
      id: "rynek",
      heading: `Rynek nieruchomości w ${city.nameLocative}: ${vars.year}`,
      paragraphs: [
        pick(openers, key, "city-open"),
        t(
          "Kupujący zagraniczni stanowią {foreign} rynku, w tym {polish} to Polacy. To istotne przy wyjściu z inwestycji: miasto ma płynny rynek wtórny, bo kupują tu zarówno mieszkańcy Europy Zachodniej, jak i inwestorzy z Polski.",
        ),
        t(
          `Popyt w mieście oceniamy na ${stats.demandIndex}/10, a najem daje {yield} brutto przy czynszu {rent} €/m²/mies. Koszty wejścia (ITP, notariusz, rejestr, prawnik) to około {purchaseCosts} ceny zakupu.`,
        ),
        serviceAngle[service.kind] ?? "",
      ],
      bullets: [
        t("Mediana: {cityPrice} €/m²"),
        t("Wzrost cen: {growth} r/r"),
        t("ROI brutto: {yield} (netto ok. {netYield})"),
        t("Czynsz: {rent} €/m²/mies."),
        t("Kupujący zagraniczni: {foreign}"),
      ],
    },
    {
      id: "dzielnice",
      heading: `Ceny i ROI w dzielnicach ${city.nameGenitive}`,
      paragraphs: [
        t(
          "Ceny w {cityLoc} różnią się w zależności od odległości od plaży, roku budowy i standardu osiedla. Poniżej mediana €/m² i rentowność najmu w poszczególnych dzielnicach i urbanizacjach. Kliknij nazwę, aby zobaczyć pełny raport.",
        ),
        comparison,
      ],
      bullets:
        districtBullets.length > 0
          ? districtBullets
          : ["Miasto nie jest podzielone na dzielnice w naszym modelu danych."],
    },
    {
      id: "proces",
      heading: `Jak kupić ${vars.property} w ${city.nameLocative}`,
      paragraphs: [
        t(
          "Zakup w Hiszpanii różni się od polskiego: potrzebujesz numeru NIE, konta w hiszpańskim banku, a przy akcie notarialnym obecny jest tłumacz. Poniżej etapy, które prowadzimy za Ciebie.",
        ),
      ],
      bullets: service.process.map(
        (step) => `${step.title} (${step.duration}): ${t(step.description)}`,
      ),
    },
    {
      id: "koszty",
      heading: "Koszty zakupu i podatki",
      paragraphs: [
        t(
          "Do ceny dolicz około {purchaseCosts}: ITP 10% przy rynku wtórnym lub IVA 10% i AJD przy nowym lokalu, notariusz, rejestr i obsługa prawna. Do tego dochodzą koszty roczne: IBI, comunidad i ubezpieczenie.",
        ),
      ],
      bullets: service.checklist.map((item) => t(item)),
    },
  ];
}

function pricePositionLabel(stats: MarketStats): string {
  const ratio = stats.pricePerM2 / Math.max(1, stats.regionPricePerM2);
  if (ratio < 0.9) return "poniżej średniej regionalnej";
  if (ratio < 1.1) return "na poziomie średniej regionalnej";
  if (ratio < 1.35) return "powyżej średniej regionalnej";
  return "w górnej części rynku regionalnego";
}

export function buildCityFaq(
  city: CitySeed,
  service: ServiceDefinition,
  t: (template: string) => string,
  vars: Record<string, string>,
  stats: MarketStats,
): FaqItem[] {
  const cheapest = city.districts.slice().sort((a, b) => a.pricePerM2 - b.pricePerM2)[0];
  const bestRoi = city.districts.slice().sort((a, b) => b.rentalYield - a.rentalYield)[0];

  return [
    ...service.faq.map((item) => ({ question: t(item.q), answer: t(item.a) })),
    {
      question: `Ile kosztuje metr kwadratowy w ${city.nameLocative} w ${vars.year} roku?`,
      answer: `Mediana ofertowa w ${city.nameLocative} to ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}), przy medianie regionu ${vars.region} ${formatEur(stats.regionPricePerM2)}.`,
    },
    {
      question: `Gdzie w ${city.nameGenitive} jest najtaniej, a gdzie najlepsze ROI?`,
      answer: `Najniższa mediana cen jest w ${cheapest?.name ?? city.name} (${formatEur(cheapest?.pricePerM2 ?? city.pricePerM2)}/m²), a najwyższa rentowność najmu w ${bestRoi?.name ?? city.name} (${formatRate(bestRoi?.rentalYield ?? city.rentalYield)} brutto). Rzadko pokrywają się one z najdroższymi lokalizacjami. I to jest sedno decyzji inwestycyjnej.`,
    },
    {
      question: `Czy Polacy kupują nieruchomości w ${city.nameLocative}?`,
      answer: `Tak. Kupujący z Polski stanowią około ${formatRate(city.polishBuyerShare, 0)} nabywców w ${city.nameLocative}. Oznacza to dostęp do polskojęzycznych usług (prawnik, tłumacz, zarządzanie najmem) bez konieczności znajomości hiszpańskiego.`,
    },
  ];
}
