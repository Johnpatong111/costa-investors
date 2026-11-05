import type { Dictionary } from "../types";

export const pl = {
  meta: {
    titleTemplate: "{title} | Costa Investors",
    defaultTitle: "Nieruchomości w Hiszpanii dla Polaków",
    defaultDescription:
      "Apartamenty, wille i domy inwestycyjne na Costa Blanca i Costa Cálida. Ceny €/m², ROI, koszty zakupu i kontakt z certyfikowanym polskojęzycznym agentem.",
  },
  nav: {
    services: "Usługi",
    locations: "Lokalizacje",
    reports: "Raporty cenowe",
    about: "O nas",
    language: "Język",
    call: "Zadzwoń",
  },
  form: {
    heading: "Znajdź nieruchomość z polskim agentem w 24 h",
    subheading:
      "Wypełnij preferencje – certyfikowany polskojęzyczny agent skontaktuje się z gotowymi ofertami.",
    stepProperty: "Nieruchomość",
    stepContact: "Kontakt",
    stepLabel: "krok {step}/2",
    next: "Dalej – wybierz kontakt",
    back: "Wstecz",
    submit: "Wyślij i odbierz ofertę",
    sending: "Wysyłanie…",
    summaryEdit: "Zmień",
    details: "Dodaj szczegóły (opcjonalnie)",
    consent:
      "Wyrażam zgodę na kontakt telefoniczny, WhatsApp lub e-mail oraz na przekazanie moich danych partnerskiej agencji nieruchomości w Hiszpanii w celu przygotowania oferty zakupu.",
    marketing: "Chcę dostawać nowe oferty i analizy rynku w Hiszpanii (opcjonalnie).",
    labels: {
      goal: "Cel zakupu",
      propertyType: "Typ nieruchomości",
      horizon: "Kiedy kupujesz?",
      budget: "Budżet (EUR)",
      name: "Imię i nazwisko",
      phone: "Telefon / WhatsApp",
      email: "E-mail (opcjonalnie – wyślemy analizę PDF)",
      city: "Miejscowość",
      district: "Dzielnica / urbanizacja",
      contactMethod: "Preferowana forma kontaktu",
      message: "Dodatkowe informacje",
    },
    errors: {
      required: "To pole jest wymagane",
      phone: "Podaj numer PL (9 cyfr) lub międzynarodowy z +",
      email: "Podaj poprawny adres e-mail",
      budget: "Podaj budżet w EUR (np. 250 000)",
      generic: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub zadzwoń.",
      network: "Brak połączenia. Sprawdź internet i spróbuj ponownie.",
    },
  },
  calculator: {
    eyebrow: "Kalkulator ROI",
    title: "Ile zarobisz w {location}?",
    budgetLegend: "Budżet inwestycji",
    exactAmount: "Dokładna kwota (EUR)",
    areaHint: "Za tę kwotę kupisz ok. {area} m² · koszty zakupu (ok. 13,5%): {costs}",
    annualRent: "Czynsz rocznie",
    netRent: "netto ok. {value}",
    return5y: "Zwrot 5 lat",
    ofBudget: "{percent}% budżetu",
    value5y: "Prognozowana wartość po 5 latach: {value}",
    cta: "Chcę ofertę dla tego budżetu",
    disclaimer:
      "Model szacunkowy na podstawie median rynkowych. Nie stanowi gwarancji zwrotu ani oferty inwestycyjnej.",
  },
  success: {
    title: "Dziękujemy, {name}!",
    body:
      "Zgłoszenie przekazaliśmy do partnerskiej agencji nieruchomości w Hiszpanii. Certyfikowany agent skontaktuje się z Tobą na {phone} w ciągu 24 godzin.",
    summary: "Podsumowanie zgłoszenia",
    budget: "Budżet: {value}",
    rent: "prognozowany czynsz: {value}/rok",
    call: "Zadzwoń teraz",
    reset: "Nowe zgłoszenie",
    sla: "Średni czas przekazania leada do agencji: 8 minut.",
    steps: [
      {
        q: "Weryfikacja w 30 minut",
        a: "Sprawdzamy budżet i preferencje, dobieramy agenta z ofertami w wybranej miejscowości.",
      },
      {
        q: "Kontakt agenta w 24 h",
        a: "Polskojęzyczny agent dzwoni lub pisze na WhatsApp z 3–5 dopasowanymi ofertami.",
      },
      {
        q: "Oględziny i analiza prawna",
        a: "Wideo-oględziny lub wizyta na miejscu, potem weryfikacja Nota Simple.",
      },
    ],
  },
  legal: {
    nie: {
      q: "Czy Polak potrzebuje numeru NIE, żeby kupić nieruchomość?",
      a: "Tak. NIE (Número de Identificación de Extranjero) jest wymagany przy akcie notarialnym i przy rozliczeniach podatkowych. Wniosek składa się osobiście w Hiszpanii lub przez pełnomocnika – zwykle 1–3 tygodnie.",
    },
    itp: {
      q: "Jakie podatki zapłacę przy zakupie?",
      a: "Na rynku wtórnym ITP 10% (Comunidad Valenciana i Murcia), przy nowym lokalu IVA 10% + AJD. Razem z notariuszem i obsługą prawną to około 13–14% ceny. Dochodzą podatki roczne: IBI i podatek od najmu w IRPF.",
    },
    residency: {
      q: "Czy zakup nieruchomości daje prawo pobytu?",
      a: "Nie ma już „Golden Visa” dla inwestorów kupujących nieruchomość. Pobyt uzyskuje się innymi podstawami (praca, działalność, dochód pasywny w ramach wizy non-lucrative). Zakup sam w sobie nie daje prawa pobytu.",
    },
  },
  seo: {
    districtTitle: "Apartamenty na sprzedaż {district} ({city}) | Costa Investors",
    districtDescription:
      "Nieruchomości w {districtLoc}: mediana {price} €/m², ROI {yield}, wzrost {growth} r/r. Oferty, koszty zakupu i kontakt z polskim agentem.",
    cityTitle: "Nieruchomości {city} | ceny, ROI i oferty",
    cityDescription:
      "Ceny nieruchomości w {cityLoc}: mediana {price} €/m², ROI {yield}. Sprawdź dzielnice, koszty zakupu i uzyskaj kontakt z agentem w 24 h.",
  },
} satisfies Dictionary;
