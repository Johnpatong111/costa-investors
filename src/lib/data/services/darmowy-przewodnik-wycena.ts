import type { ServiceDefinition } from "./types";

export const darmowyPrzewodnikWycena: ServiceDefinition = {
  slug: "darmowy-przewodnik-wycena",
  kind: "lead-magnet",
  name: "Darmowy przewodnik i wycena",
  nameGenitive: "darmowego przewodnika i wyceny",
  propertyNoun: "nieruchomość",
  propertyNounGenitive: "nieruchomości",
  intent: "commercial",
  ctaLabel: "Pobierz przewodnik i wycenę",
  priceAnchor: "0 €. Bez zobowiązań",
  highlightLabel: "przewodnik PDF + analiza prawna",
  h1: [
    "Darmowy przewodnik zakupu w {districtLoc} ({cityLoc}) - {year}",
    "Wycena nieruchomości w {districtLoc} ({cityLoc}) + analiza prawna",
    "Ile kosztuje zakup w {districtLoc}, {cityLoc}? Przewodnik i koszty",
  ],
  metaTitle: [
    "Darmowy przewodnik zakupu {city} ({region}) {year}",
    "Wycena i analiza prawna - {district} {city}",
    "Zakup nieruchomości w {cityLoc}: przewodnik PDF",
  ],
  metaDescription: [
    "Pobierz bezpłatny przewodnik: koszty zakupu w {districtLoc}, podatki ITP/IVA, NIE i wycena. Średnia cena: {price} €/m². Bez zobowiązań.",
    "Planujesz zakup w {cityLoc}? Otrzymasz przewodnik PDF, kalkulację kosztów i wstępną wycenę nieruchomości. Bezpłatnie w 2026.",
    "Przewodnik dla Polaków kupujących w Hiszpanii: NIE, notariusz, podatki, ROI {yield}% w {cityLoc}. Pobierz PDF i umów kontakt z agentem.",
  ],
  synonyms: [
    "przewodnik zakupu nieruchomości w Hiszpanii",
    "koszty zakupu mieszkania w Hiszpanii",
    "jak kupić dom w Hiszpanii z Polski",
    "analiza prawna zakupu nieruchomości",
    "darmowa wycena nieruchomości w Hiszpanii",
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
      title: "Wycena zamiast „ceny z ogłoszenia”",
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
      title: "Wstępna wycena",
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
      q: "Czy przewodnik i wycena są naprawdę bezpłatne?",
      a: "Tak. Nie pobieramy opłat i nie wymagamy umowy. Jeśli zdecydujesz się na zakup z naszym wsparciem, warunki ustalamy osobno na piśmie.",
    },
    {
      q: "Jakie koszty poza ceną muszę doliczyć w {districtLoc}?",
      a: "Około 13-14% ceny: ITP 10% (rynek wtórny) lub IVA 10% + AJD (nowe), notariusz, rejestr, obsługa prawna. Do tego koszty utrzymania i podatki roczne.",
    },
    {
      q: "Czy potrzebuję numeru NIE do wyceny?",
      a: "Nie. NIE jest potrzebny do zakupu i rozliczeń podatkowych, ale nie do samej analizy czy wyceny nieruchomości.",
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
    "wstępna wycena na tle mediany {price} €/m²",
  ],
  linkLabel: "darmowy przewodnik i wycena",
};
