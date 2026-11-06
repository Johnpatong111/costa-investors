import type { DistrictEntry } from "../data/repository";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import { describePricePosition } from "./market-insights";
import { interpolate } from "./interpolate";
import { hashString, pick } from "./deterministic";
import { formatEur, formatRate } from "../utils/format";
import type { FaqItem } from "./content-utils";

/**
 * FAQ generowane z danych + blok prawny (NIE, ITP/IVA, zakup przez Polaków).
 * Odpowiedzi zawsze zawierają liczby dla konkretnej lokalizacji. To główna
 * obrona przed duplicate content przy 200+ stronach.
 */
export function buildDistrictFaq(
  service: ServiceDefinition,
  vars: Record<string, string>,
  key: string,
  stats: MarketStats,
  entry: DistrictEntry,
): FaqItem[] {
  const t = (template: string) => interpolate(template, vars);
  const { district, city } = entry;

  const localNotes = [
    `W ${district.nameLocative} dominują ${district.characteristics[0] ?? "zróżnicowane nieruchomości"}, co wpływa na stawkę najmu i profil najemcy.`,
    `Bliskość ${district.landmarks[0] ?? city.name} podnosi atrakcyjność najmu w sezonie, ale zwiększa też koszty wspólnoty (comunidad).`,
  ];

  const serviceFaq: FaqItem[] = service.faq.map((item, index) => {
    const answer = t(item.a);
    const note = localNotes[index % localNotes.length] ?? "";
    return {
      question: t(item.q),
      answer: index % 2 === 0 ? `${answer} ${note}` : answer,
    };
  });

  const localFaq: FaqItem[] = [
    {
      question: `Ile kosztuje metr kwadratowy w ${district.nameLocative} w ${vars.year} roku?`,
      answer: `Mediana ofertowa w ${district.nameLocative} wynosi ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}). To ${describePricePosition(stats)}; mediana dla całego miasta ${city.nameGenitive} to ${formatEur(stats.cityPricePerM2)}.`,
    },
    {
      question: `Jakie ROI daje najem w ${district.nameLocative}?`,
      answer: `Rentowność brutto to ${formatRate(stats.rentalYield)}, a po kosztach zarządzania, podatku i pustostanach ok. ${formatRate(stats.netYield)} netto. Mediana czynszu wynosi ${stats.monthlyRentPerM2.toFixed(1).replace(".", ",")} €/m² miesięcznie.`,
    },
    {
      question: `Czy Polak może kupić nieruchomość w ${district.nameLocative}?`,
      answer: `Tak, bez ograniczeń. Obywatele UE mają w Hiszpanii takie same prawa jak Hiszpanie. Potrzebujesz numeru NIE (do aktu notarialnego i rozliczeń podatkowych) oraz konta w hiszpańskim banku lub potwierdzenia przelewu z Polski.`,
    },
    {
      question: `Jakie podatki zapłacę przy zakupie w ${district.nameLocative}?`,
      answer: `Na rynku wtórnym ITP 10% (Comunidad Valenciana), przy nowym lokalu IVA 10% + AJD. Razem z notariuszem, rejestrem i obsługą prawną to około 13-14% ceny. Do tego dochodzą podatki roczne: IBI (gmina) i podatek od najmu rozliczany w IRPF.`,
    },
  ];

  // Rotacja układu FAQ. Dodatkowy czynnik różnicujący układ strony.
  return pick([true, false], key, "faqorder")
    ? [...localFaq, ...serviceFaq]
    : [...serviceFaq, ...localFaq];
}

export function buildKeywords(
  service: ServiceDefinition,
  vars: Record<string, string>,
  key: string,
): string[] {
  const base = [
    `${service.name} ${vars.city}`,
    `${service.name} ${vars.district}`,
    `${vars.synonym} ${vars.cityLoc}`,
    `cena m2 ${vars.city} ${vars.district}`,
    `inwestycja ${vars.cityLoc} ROI`,
    `nieruchomości Hiszpania ${vars.city}`,
  ];
  if (hashString(key) % 2 === 0) {
    base.push(`${vars.propertyGen} ${vars.district} cena €`);
  }
  return [...new Set(base)];
}
