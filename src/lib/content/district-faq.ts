import type { DistrictEntry } from "../data/repository";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import { describePricePosition } from "./market-insights";
import { interpolate } from "./interpolate";
import { hashString, pick, rotate } from "./deterministic";
import { formatEur, formatRate } from "../utils/format";
import { foreignTier, liquidityTier, pickByTier, priceTier, yieldTier } from "./content-tiers";
import { regionTax } from "./region-facts";
import type { FaqItem } from "./content-utils";

/**
 * ===========================================================================
 * FAQ GENEROWANE Z DANYCH (PL)
 * ===========================================================================
 * FAQ to 30–40% objętości strony dzielnicy, więc identyczne odpowiedzi na
 * wszystkich stronach są największym źródłem near-duplicate content. Dlatego
 * każda odpowiedź ma warianty frazy wybierane przez kubełek danych (kubełek
 * pilnuje prawdziwości), a kolejność bloków rotuje się per URL.
 */

export function buildDistrictFaq(
  service: ServiceDefinition,
  vars: Record<string, string>,
  key: string,
  stats: MarketStats,
  entry: DistrictEntry,
): FaqItem[] {
  const t = (template: string) => interpolate(template, vars);
  const { district, city, region } = entry;
  const tax = regionTax(region.slug);
  const rent = stats.monthlyRentPerM2.toFixed(1).replace(".", ",");
  const pricePosition = describePricePosition(stats);
  const pricePositionSentence = `${pricePosition.charAt(0).toUpperCase()}${pricePosition.slice(1)}`;

  const localNotes = [
    `W ${district.nameLocative} dominują ${district.characteristics[0] ?? "zróżnicowane nieruchomości"}, co przekłada się na profil najemcy i stawkę czynszu.`,
    `Bliskość ${district.landmarks[0] ?? city.name} podnosi atrakcyjność najmu w sezonie, ale zwiększa też koszty wspólnoty (comunidad).`,
    `Zabudowa typu ${district.type} oznacza zwykle mniejszą podaż nowych lokali, więc rotacja ofert jest tu wolniejsza niż w centrum ${city.nameGenitive}.`,
    `W części ${city.subregion} to jedna z lokalizacji, gdzie ${district.characteristics[1] ?? "standard wykończenia"} realnie wpływa na wycenę.`,
    `Punkty orientacyjne wymieniane w ogłoszeniach (${district.landmarks.slice(0, 2).join(", ")}) są tu lepszym wyznacznikiem ceny niż sam metraż.`,
    `Dla kupującego z Polski istotne jest to, że ${district.nameLocative} obsługuje ${city.name} — polskojęzyczny notariusz i zarządca najmu są dostępni lokalnie.`,
  ];

  const serviceFaq: FaqItem[] = service.faq.map((item, index) => {
    const answer = t(item.a);
    const note = localNotes[hashString(`${key}::note${index}`) % localNotes.length] ?? "";
    return {
      question: t(item.q),
      answer: index % 2 === 0 ? `${answer} ${note}` : answer,
    };
  });

  const priceAnswers = [
    `Mediana ofertowa w ${district.nameLocative} to ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}). To ${describePricePosition(stats)}; dla całego miasta ${city.nameGenitive} mediana wynosi ${formatEur(stats.cityPricePerM2)}, a dla regionu ${region.name} ${formatEur(stats.regionPricePerM2)}. Niższa stawka zwykle oznacza starsze budownictwo albo większą odległość od plaży.`,
    `Za metr w ${district.nameLocative} płaci się około ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}), czyli ${describePricePosition(stats)}. Mediana ${city.nameGenitive} to ${formatEur(stats.cityPricePerM2)}, więc różnica jest czytelna w budżecie: lokal 70 m² kosztuje tu około ${formatEur(stats.pricePerM2 * 70)}.`,
    `Mediana w ${district.nameLocative} wynosi ${formatEur(stats.pricePerM2)} za metr (dane: ${stats.dataAsOf}), czyli ${describePricePosition(stats)}. Stawki rozciągają się od lokali do remontu po nowe osiedla, dlatego mediana miasta (${formatEur(stats.cityPricePerM2)}) jest tu wyłącznie punktem odniesienia.`,
    `Tu metr kosztuje około ${formatEur(stats.pricePerM2)} (dane: ${stats.dataAsOf}). ${pricePositionSentence}. Przy medianie regionu ${formatEur(stats.regionPricePerM2)} mówimy o segmencie premium, w którym o cenie decyduje widok, linia zabudowy i standard osiedla, a nie sam metraż.`,
  ];

  const yieldAnswers = [
    `Rentowność brutto w ${district.nameLocative} to ${formatRate(stats.rentalYield)} (netto około ${formatRate(stats.netYield)}). Przy medianie czynszu ${rent} €/m²/mies. lokal 70 m² przynosi około ${formatEur(Math.round((stats.pricePerM2 * 70 * stats.rentalYield) / 100))} € rocznie brutto. W tym segmencie zwrot buduje raczej wzrost wartości niż sam czynsz.`,
    `ROI brutto wynosi ${formatRate(stats.rentalYield)}, a po kosztach zarządzania, podatku i pustostanach zostaje około ${formatRate(stats.netYield)} netto. Czynsz ${rent} €/m²/mies. to wynik typowy dla lokalizacji z ${district.characteristics[0] ?? "mieszaną zabudową"}.`,
    `Najem w ${district.nameLocative} daje ${formatRate(stats.rentalYield)} brutto i ${formatRate(stats.netYield)} netto przy medianie ${rent} €/m²/mies. To poziom, przy którym inwestycja pokrywa koszty utrzymania i generuje nadwyżkę — pod warunkiem realnej wyceny zakupu.`,
    `Tu rentowność jest ponadprzeciętna: ${formatRate(stats.rentalYield)} brutto, ${formatRate(stats.netYield)} netto. Czynsz ${rent} €/m²/mies. utrzymuje się dzięki popytowi ${stats.demandIndex}/10 i krótkiej ekspozycji ofert (${stats.avgDaysOnMarket} dni).`,
  ];

  const identityAnswers = [
    `Tak, bez ograniczeń. Obywatele UE mają w Hiszpanii takie same prawa jak Hiszpanie. Potrzebujesz numeru NIE (do aktu notarialnego i rozliczeń podatkowych) oraz konta w hiszpańskim banku lub potwierdzenia przelewu z Polski.`,
    `Tak. Polacy kupują w ${district.nameLocative} na tych samych zasadach co Hiszpanie — wystarczy NIE, hiszpańskie konto i tłumacz przysięgły przy akcie notarialnym. Zakup można sfinalizować podczas jednego wyjazdu, jeśli finansowanie jest przygotowane wcześniej.`,
    `Bez przeszkód. Potrzebny jest numer NIE, konto w banku hiszpańskim i obecność tłumacza przy podpisaniu escritura pública. W ${city.nameLocative} obsługę po polsku prowadzimy od rezerwacji po odbiór kluczy.`,
  ];

  const legalAnswers = [
    `Na rynku wtórnym płacisz ITP ${tax.itp}% (${tax.authority}), a przy nowym lokalu IVA 10% i AJD. Razem z notariuszem, wpisem do Registro de la Propiedad i obsługą prawną to około ${formatRate(stats.purchaseCostsRate * 100)} ceny. Do tego dochodzą podatki roczne: IBI (gmina) i podatek od najmu rozliczany w IRPF.`,
    `Podatek transferowy w ${tax.authority} to ITP ${tax.itp}% na rynku wtórnym; nowe budownictwo to IVA 10% plus AJD. Łączne koszty wejścia zamykają się w około ${formatRate(stats.purchaseCostsRate * 100)} ceny nieruchomości. Po zakupie dochodzi IBI oraz rozliczenie najmu w IRPF.`,
    `ITP ${tax.itp}% (${tax.authority}) przy odsprzedaży, IVA 10% i AJD przy nowym lokalu — plus notariusz, rejestr i prawnik, razem około ${formatRate(stats.purchaseCostsRate * 100)}. Podatki roczne to IBI i IRPF od dochodu z najmu. Przy sprzedaży liczy się też podatek od zysku oraz plusvalía municipal.`,
  ];

  const buyerAnswers = [
    `W ${city.nameLocative} kupujący zagraniczni to ${formatRate(stats.foreignBuyerShare, 0)} rynku. To udział, który gwarantuje płynne wyjście z inwestycji, ale nie na tyle wysoki, by ceny zależały wyłącznie od popytu z zagranicy.`,
    `Obcokrajowcy odpowiadają za ${formatRate(stats.foreignBuyerShare, 0)} nabywców w ${city.nameLocative}, w tym ${formatRate(stats.polishBuyerShare, 0)} to Polacy. Rynek jest mieszany: część transakcji to zakupy drugiego domu, część inwestycje pod najem.`,
    `Tu ${formatRate(stats.foreignBuyerShare, 0)} nabywców przyjeżdża z zagranicy (Polacy to ${formatRate(stats.polishBuyerShare, 0)}). W praktyce oznacza to dostęp do polskojęzycznych usług i realną konkurencję o najlepsze lokale.`,
    `Popyt zagraniczny jest bardzo wysoki: ${formatRate(stats.foreignBuyerShare, 0)} transakcji, z czego ${formatRate(stats.polishBuyerShare, 0)} to Polacy. Konsekwencja jest podwójna — szybka sprzedaż, ale i mniejsza przestrzeń negocjacyjna.`,
  ];

  const liquidityAnswers = [
    `Oferty w ${district.nameLocative} znikają z rynku średnio w ${stats.avgDaysOnMarket} dni — jedno z najkrótszych temp w regionie. Sprzedający zwykle nie schodzą z ceny, jeśli nieruchomość jest wyceniona rynkowo.`,
    `Mediana ekspozycji oferty to ${stats.avgDaysOnMarket} dni, czyli tempo zbliżone do średniej regionalnej. To dobra informacja dla kupującego: jest czas na due diligence, ale nie na wielotygodniowe negocjacje.`,
    `Sprzedaż w ${district.nameLocative} zajmuje średnio ${stats.avgDaysOnMarket} dni. Dłuższa ekspozycja oznacza, że oferty z ogłoszeń bywają przeszacowane o kilka procent — warto porównać kilka nieruchomości przed złożeniem propozycji.`,
    `Mediana ${stats.avgDaysOnMarket} dni to jeden z dłuższych wyników w regionie. Wynika to z charakteru zabudowy (${district.characteristics[0] ?? "zróżnicowana"}) i zawężonego grona kupujących — cena wyjściowa ma tu większe znaczenie niż w centrum miasta.`,
  ];

  const localFaq: FaqItem[] = [
    {
      question: `Ile kosztuje metr kwadratowy w ${district.nameLocative} w ${vars.year} roku?`,
      answer: pickByTier(priceAnswers, priceTier(stats)),
    },
    {
      question: `Jakie ROI daje najem w ${district.nameLocative}?`,
      answer: pickByTier(yieldAnswers, yieldTier(stats)),
    },
    {
      question: `Czy Polak może kupić nieruchomość w ${district.nameLocative}?`,
      answer: pick(identityAnswers, key, "identity"),
    },
    {
      question: `Jakie podatki zapłacę przy zakupie w ${district.nameLocative}?`,
      answer: pick(legalAnswers, key, "tax"),
    },
    {
      question: `Kto kupuje nieruchomości w ${district.nameLocative}?`,
      answer: pickByTier(buyerAnswers, foreignTier(stats)),
    },
    {
      question: `Jak szybko sprzedam nieruchomość w ${district.nameLocative}?`,
      answer: pickByTier(liquidityAnswers, liquidityTier(stats)),
    },
  ];

  // Rotacja układu FAQ: kolejny czynnik różnicujący układ strony.
  const merged = pick([true, false], key, "faqorder")
    ? [...localFaq, ...serviceFaq]
    : [...serviceFaq, ...localFaq];

  return rotate(merged, hashString(`${key}::faq`) % merged.length);
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

