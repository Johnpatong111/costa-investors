import type { ServiceDefinition } from "./types";

export const apartamentyNaSprzedaz: ServiceDefinition = {
  slug: "apartamenty-na-sprzedaz",
  kind: "buy",
  name: "Apartamenty na sprzedaż",
  nameGenitive: "apartamentów na sprzedaż",
  propertyNoun: "apartament",
  propertyNounGenitive: "apartamentu",
  intent: "transactional",
  ctaLabel: "Zobacz oferty i policz ROI",
  priceAnchor: "od 120 000 €",
  highlightLabel: "z widokiem na morze lub basenem",
  h1: [
    "Apartamenty na sprzedaż {districtLoc} ({cityLoc}) - {region} {year}",
    "Apartamenty w {districtLoc} ({cityLoc}) od {price} €/m²",
    "Kup apartament w {districtLoc}, {cityLoc}. Ceny i ROI",
  ],
  metaTitle: [
    "Apartamenty na sprzedaż {city} ({region}) | od 120k €",
    "Apartament {district} {city}. Ceny i ROI {year}",
    "Mieszkania w {cityLoc}. Oferty od 120 tys. €",
  ],
  metaDescription: [
    "Szukasz apartamentu w {districtLoc}? Średnia cena: {price} €/m², ROI {yield}%, wzrost {growth}% r/r. Zobacz oferty i policz zwrot w 2026!",
    "Apartamenty na sprzedaż w {cityLoc} od 120 000 €. Ceny w {districtLoc}: {price} €/m². Kontakt z polskim agentem i analiza prawna zakupu.",
    "Kup mieszkanie w {cityLoc} ({region}): {price} €/m², czynsz {rent} €/m², ROI {yield}%. Sprawdź oferty i koszty zakupu.",
  ],
  synonyms: [
    "mieszkania na sprzedaż w Hiszpanii",
    "apartamenty nad morzem",
    "kupno mieszkania Costa Blanca",
    "apartamenty z basenem",
    "nieruchomości dla Polaków w Hiszpanii",
  ],
  benefits: [
    {
      title: "Oferty weryfikowane pod kątem najmu",
      description:
        "Sprawdzamy nie tylko stan lokalu, ale i realną stawkę najmu w {districtLoc} ({rent} €/m²/mies.), by ROI z oferty nie było liczbą z broszury dewelopera.",
    },
    {
      title: "Koszty zakupu policzone z góry",
      description:
        "ITP 10% (lub IVA 10% przy nowym lokalu), notariusz, rejestr, obsługa prawna i konto w Hiszpanii. Pełny budżet transakcji przed podpisaniem umowy.",
    },
    {
      title: "Ochrona przed złym stanem prawnym",
      description:
        "Weryfikujemy Nota Simple, obciążenia, zgodność zabudowy z katastrem i zaległości wobec wspólnoty (comunidad).",
    },
    {
      title: "Wsparcie po zakupie",
      description:
        "Pomagamy w umowie z agencją zarządzającą najmem, ubezpieczeniu i rozliczeniu podatku od najmu w Hiszpanii.",
    },
  ],
  process: [
    {
      title: "Rozmowa o budżecie i celu",
      description:
        "Ustalamy budżet w EUR, oczekiwane ROI i horyzont. Na tej podstawie wybieramy 3-5 lokalizacji, nie odwrotnie.",
      duration: "1 dzień",
    },
    {
      title: "Selekcja ofert i oględziny",
      description:
        "Wysyłamy shortlistę z ceną za m² na tle mediany {districtLoc} ({price} €/m²). Oględziny na miejscu lub wideo z agentem.",
      duration: "3-10 dni",
    },
    {
      title: "Analiza prawna i NIE",
      description:
        "Prawnik sprawdza Nota Simple i obciążenia. Uzyskujesz numer NIE. Bez niego nie sfinalizujesz zakupu.",
      duration: "1-2 tygodnie",
    },
    {
      title: "Notariusz i odbiór kluczy",
      description:
        "Akt notarialny (escritura), wpis do Registro de la Propiedad i przeniesienie opłat. Umowę tłumaczymy na polski.",
      duration: "1 dzień + 2-6 tygodni",
    },
  ],
  faq: [
    {
      q: "Ile kosztuje apartament w {districtLoc}?",
      a: "Mediana ofertowa w {districtLoc} to {price} €/m², czyli przy 60 m² ok. {budget60}. Do ceny należy doliczyć ok. 13-14% kosztów transakcyjnych (ITP, notariusz, rejestr, prawnik).",
    },
    {
      q: "Czy Polak może kupić mieszkanie w Hiszpanii?",
      a: "Tak, bez żadnych ograniczeń. Obywatele UE mają takie same prawa jak Hiszpanie. Potrzebujesz numeru NIE (Número de Identificación de Extranjero) oraz konta w hiszpańskim banku lub potwierdzenia przelewu z Polski.",
    },
    {
      q: "Jakie podatki zapłacę przy zakupie?",
      a: "Przy rynku wtórnym podatek ITP (Comunidad Valenciana: 10%), przy nowym lokalu IVA 10% + AJD. Do tego notariusz, wpis do rejestru i opłata za obsługę prawną. Łącznie zwykle 13-14% ceny.",
    },
    {
      q: "Czy apartament z basenem generuje wyższy czynsz?",
      a: "Tak, w {cityLoc} basen i bliskość plaży podnoszą stawkę najmu o 10-20% w sezonie, ale zwiększają koszty wspólnoty (comunidad). W analizie liczymy oba efekty.",
    },
  ],
  checklist: [
    "budżet własny i ewentualne finansowanie w EUR",
    "numer NIE (do zakupu i do podatków)",
    "potwierdzenie pochodzenia środków (bank w Hiszpanii)",
    "paszport/ID i zaświadczenie o stanie cywilnym (do notariusza)",
  ],
  linkLabel: "apartamenty na sprzedaż",
};
