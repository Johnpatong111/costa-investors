import type { ServiceDefinition } from "./types";

export const darmowyPrzewodnikWycena: ServiceDefinition = {
  slug: "darmowy-przewodnik-analiza ofert",
  kind: "lead-magnet",
  name: "Przewodnik i oferty",
  nameGenitive: "przewodnika i ofert",
  propertyNoun: "nieruchomość",
  propertyNounGenitive: "nieruchomości",
  intent: "commercial",
  ctaLabel: "Pobierz przewodnik i analizę ofert",
  priceAnchor: "0 €. Bez zobowiązań",
  highlightLabel: "przewodnik PDF + analiza prawna",
  h1: [
    "Przewodnik zakupu w {districtLoc} ({cityLoc}) - {year}",
    "Dobór ofert w {districtLoc} ({cityLoc})",
    "Ile kosztuje zakup w {districtLoc}, {cityLoc}? Przewodnik i koszty",
  ],
  metaTitle: [
    "Przewodnik zakupu {city} ({region}) {year}",
    "Dobór ofert: {district} {city}",
    "Zakup nieruchomości w {cityLoc}: przewodnik PDF",
  ],
  metaDescription: [
    "Pobierz bezpłatny przewodnik: koszty zakupu w {districtLoc}, podatki ITP/IVA, NIE i analiza ofert. Średnia cena: {price} €/m². Bez zobowiązań.",
    "Planujesz zakup w {cityLoc}? Otrzymasz przewodnik PDF, kalkulację kosztów i wstępny dobór ofert nieruchomości. Bezpłatnie w 2026.",
    "Przewodnik dla Polaków kupujących w Hiszpanii: NIE, notariusz, podatki, ROI {yield}% w {cityLoc}. Pobierz PDF i umów kontakt z agentem.",
  ],
  synonyms: [
    "przewodnik zakupu nieruchomości w Hiszpanii",
    "koszty zakupu mieszkania w Hiszpanii",
    "jak kupić dom w Hiszpanii z Polski",
    "analiza prawna zakupu nieruchomości",
    "przewodnik zakupu nieruchomości w Hiszpanii",
  ],
  benefits: [
    {
      title: "Pełna lista kosztów zakupu",
      description:
        "ITP/IVA, notariusz, rejestr, prawnik, tłumaczenia, konto i NIE. Z kwotami dla nieruchomości w {districtLoc} ({price} €/m²).",
    },
    {
      title: "Analiza prawna bez prawniczego żargonu",
      description:
        "Czym jest Nota Simple, jakie obciążenia dyskwalifikują ofertę i co sprawdzić przed wpłatą zadatku (arras).",
    },
    {
      title: "Dobór ofert zamiast „ceny z ogłoszenia”",
      description:
        "Porównujemy nieruchomość z medianą {districtLoc} i realnymi transakcjami, żebyś wiedział, ile warto negocjować.",
    },
    {
      title: "Gotowe do rozmowy z agentem",
      description:
        "Dostajesz pytania, które trzeba zadać sprzedającemu, i listę dokumentów do weryfikacji.",
    },
  ],
  process: [
    {
      title: "Wypełnij formularz",
      description: "Podaj budżet i cel zakupu: 3 decyzje, bez danych wrażliwych.",
      duration: "2 minuty",
    },
    {
      title: "Przewodnik PDF",
      description:
        "Wysyłamy przewodnik dla {districtLoc} z kosztami, podatkami i checklistą prawną.",
      duration: "natychmiast",
    },
    {
      title: "Wstępna analiza ofert",
      description:
        "Jeśli masz konkretną nieruchomość, porównujemy jej cenę z medianą {price} €/m² i transakcjami w okolicy.",
      duration: "24-48 h",
    },
    {
      title: "Konsultacja (opcjonalnie)",
      description:
        "15 minut rozmowy o wynikach analizy. Bez zobowiązania do zakupu i bez presji sprzedażowej.",
      duration: "15 minut",
    },
  ],
  faq: [
    {
      q: "Czy przewodnik i analiza ofert są naprawdę bezpłatne?",
      a: "Tak. Nie pobieramy opłat i nie wymagamy umowy. Jeśli zdecydujesz się na zakup z naszym wsparciem, warunki ustalamy osobno na piśmie.",
    },
    {
      q: "Jakie koszty poza ceną muszę doliczyć w {districtLoc}?",
      a: "Około 13-14% ceny: ITP 10% (rynek wtórny) lub IVA 10% + AJD (nowe), notariusz, rejestr, obsługa prawna. Do tego koszty utrzymania i podatki roczne.",
    },
    {
      q: "Czy potrzebuję numeru NIE do analizy ofert?",
      a: "Nie. NIE jest potrzebny do zakupu i rozliczeń podatkowych, ale nie do samej analizy czy analizy ofert nieruchomości.",
    },
    {
      q: "Ile trwa zakup nieruchomości w Hiszpanii?",
      a: "Od rezerwacji do aktu notarialnego zwykle 3-6 tygodni, przy kredycie hiszpańskim 6-10 tygodni. W {cityLoc} notariusze są dostępni szybko, więc kluczowe jest due diligence.",
    },
  ],
  checklist: [
    "przewodnik PDF z kosztami zakupu",
    "kalkulacja podatków ITP/IVA i kosztów rocznych",
    "checklista dokumentów i pytań do sprzedającego",
    "wstępny dobór ofert na tle mediany {price} €/m²",
  ],
  linkLabel: "darmowy przewodnik i analiza ofert",
};
