import type { ServiceDefinition } from "./types";

export const domyInwestycyjne: ServiceDefinition = {
  slug: "domy-inwestycyjne",
  kind: "investment",
  name: "Domy inwestycyjne",
  nameGenitive: "domów inwestycyjnych",
  propertyNoun: "dom",
  propertyNounGenitive: "domu",
  intent: "transactional",
  ctaLabel: "Policz ROI dla tej lokalizacji",
  priceAnchor: "ROI 4,6-6,6% brutto",
  highlightLabel: "dochód z najmu i wzrost wartości",
  h1: [
    "Domy inwestycyjne {districtLoc} ({cityLoc}) - ROI {yield}",
    "Nieruchomości pod wynajem w {districtLoc} ({cityLoc})",
    "Inwestycja w dom w {districtLoc}, {cityLoc}. Ceny i zwrot",
  ],
  metaTitle: [
    "Domy inwestycyjne {city} ({region}) | ROI {yield}",
    "Inwestycja w {district} {city} - ROI i ceny {year}",
    "Nieruchomości pod wynajem {city}. Policz zwrot",
  ],
  metaDescription: [
    "Domy inwestycyjne w {districtLoc}: cena {price} €/m², czynsz {rent} €/m², ROI {yield}% brutto. Policz zwrot dla swojego budżetu w 2026.",
    "Inwestycja w nieruchomość w {cityLoc}. Wzrost {growth}% r/r i ROI {yield}%. Zobacz koszty zakupu, podatki i realne stawki najmu.",
    "Szukasz domu pod wynajem w Hiszpanii? Sprawdź ROI w {cityLoc}, koszty utrzymania i potencjał wzrostu wartości.",
  ],
  synonyms: [
    "nieruchomości inwestycyjne Hiszpania",
    "mieszkania pod wynajem Hiszpania",
    "inwestycja w nieruchomość nad morzem",
    "domy na wynajem długoterminowy",
    "zwrot z najmu w Hiszpanii",
  ],
  benefits: [
    {
      title: "ROI liczone na realnych stawkach",
      description:
        "Podstawa to mediana czynszu {rent} €/m²/mies. W {districtLoc}, obłożenie i koszty. Nie „potencjał” z ogłoszenia.",
    },
    {
      title: "Podatki i koszty po polsku",
      description:
        "Pokazujemy, jak rozliczać najem w Hiszpanii (IRPF dla nierezydenta), jakie są koszty zarządzania i jak uniknąć podwójnego opodatkowania w Polsce.",
    },
    {
      title: "Dwa scenariusze: najem i flip",
      description:
        "Modelujemy zwrot z najmu długoterminowego i krótkoterminowego oraz scenariusz zakupu, remontu i odsprzedaży.",
    },
    {
      title: "Wybór lokalizacji pod zwrot, nie pod widok",
      description:
        "Porównujemy dzielnice pod kątem ROI: {districtLoc} ma {yield}% brutto przy cenie {price} €/m². Pokazujemy alternatywy z lepszym stosunkiem.",
    },
  ],
  process: [
    {
      title: "Ustalenie kryteriów inwestycji",
      description:
        "Budżet, oczekiwany zwrot, horyzont (3/5/10 lat) i dopuszczalne ryzyko. Bez tego każda oferta wygląda dobrze.",
      duration: "1 dzień",
    },
    {
      title: "Model zwrotu",
      description:
        "Liczby dla {districtLoc}: cena {price} €/m², czynsz {rent} €/m², koszty, podatki i pustostany. Otrzymujesz arkusz, nie slajd.",
      duration: "2-3 dni",
    },
    {
      title: "Weryfikacja nieruchomości",
      description:
        "Stan techniczny, legalność, perspektywa najmu i płynność wyjścia. Odrzucamy oferty, których nie sprzedasz w 90 dni.",
      duration: "1-2 tygodnie",
    },
    {
      title: "Zakup i uruchomienie najmu",
      description:
        "Notariusz, NIE, konto, ubezpieczenie, umowa z agencją zarządzającą i pierwszy najemca.",
      duration: "4-8 tygodni",
    },
  ],
  faq: [
    {
      q: "Jakie ROI daje najem w {districtLoc}?",
      a: "Model dla {districtLoc}: {yield}% brutto rocznie przy medianie {price} €/m² i czynszu {rent} €/m²/mies. Po kosztach zarządzania, podatku i pustostanach realny zwrot netto jest zwykle o 1,5-2,5 pkt proc. Niższy.",
    },
    {
      q: "Czy najem krótkoterminowy jest bardziej opłacalny?",
      a: "W {cityLoc} krótki najem daje wyższy przychód w sezonie, ale wymaga licencji turystycznej i generuje wyższe koszty. W analizie zawsze pokazujemy oba warianty.",
    },
    {
      q: "Jak Polak rozlicza najem w Hiszpanii?",
      a: "Nierezydent rozlicza się z hiszpańskiego podatku dochodowego (IRPF) od najmu. Zwykle raz na kwartał i w deklaracji rocznej. W Polsce stosujesz metodę unikania podwójnego opodatkowania.",
    },
    {
      q: "Ile wynoszą koszty zakupu inwestycyjnego?",
      a: "Około 13-14% ceny nieruchomości: ITP 10% (rynek wtórny) lub IVA 10% + AJD (nowe), notariusz, rejestr, obsługa prawna i ewentualne tłumaczenia.",
    },
  ],
  checklist: [
    "arkusz ROI z kosztami i podatkami",
    "Nota Simple i weryfikacja obciążeń",
    "stawki najmu i obłożenie w okolicy",
    "plan wyjścia z inwestycji (kto kupi i kiedy)",
  ],
  linkLabel: "domy inwestycyjne",
};
