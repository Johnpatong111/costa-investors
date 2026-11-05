import type { CitySeed } from "../data/schema";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import { formatEur, formatRate } from "../utils/format";
import type { ContentBlock, FaqItem } from "./content-utils";

/** Bloki strony miejskiej – porównanie lokalizacji i danych inwestycyjnych. */
export function buildCityBlocks(
  city: CitySeed,
  service: ServiceDefinition,
  t: (template: string) => string,
  vars: Record<string, string>,
): ContentBlock[] {
  const districtBullets = city.districts
    .slice()
    .sort((a, b) => b.pricePerM2 - a.pricePerM2)
    .map(
      (district) =>
        `${district.name} – ${formatEur(district.pricePerM2)}/m² · ROI ${formatRate(district.rentalYield)}`,
    );

  return [
    {
      id: "rynek",
      heading: `Rynek nieruchomości w ${city.nameLocative} – ${vars.year}`,
      paragraphs: [
        t(
          "Mediana ofertowa w {cityLoc} to {cityPrice} €/m², czyli {growth} r/r. Na tle regionu {region} ({regionPrice} €/m²) miasto wypada {pricePosition}. Średni czas ekspozycji oferty to {days} dni, a rocznie zawieranych jest około {volume} transakcji.",
        ),
        t(
          "Kupujący zagraniczni stanowią {foreign} rynku, w tym {polish} to Polacy. To ważna informacja przy wyjściu z inwestycji: {cityLoc} ma płynny rynek wtórny, bo kupują tu zarówno mieszkańcy Europy Zachodniej, jak i inwestorzy z Polski.",
        ),
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
          "Ceny w {cityLoc} różnią się w zależności od odległości od plaży, roku budowy i standardu osiedla. Poniżej mediana €/m² i rentowność najmu w poszczególnych dzielnicach i urbanizacjach – kliknij nazwę, aby zobaczyć pełny raport.",
        ),
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
        (step) => `${step.title} (${step.duration}) – ${t(step.description)}`,
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
      answer: `Najniższa mediana cen jest w ${cheapest?.name ?? city.name} (${formatEur(cheapest?.pricePerM2 ?? city.pricePerM2)}/m²), a najwyższa rentowność najmu w ${bestRoi?.name ?? city.name} (${formatRate(bestRoi?.rentalYield ?? city.rentalYield)} brutto). Rzadko pokrywają się one z najdroższymi lokalizacjami – i to jest sedno decyzji inwestycyjnej.`,
    },
    {
      question: `Czy Polacy kupują nieruchomości w ${city.nameLocative}?`,
      answer: `Tak – kupujący z Polski stanowią około ${formatRate(city.polishBuyerShare, 0)} nabywców w ${city.nameLocative}. Oznacza to dostęp do polskojęzycznych usług (prawnik, tłumacz, zarządzanie najmem) bez konieczności znajomości hiszpańskiego.`,
    },
  ];
}
