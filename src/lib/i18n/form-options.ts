import type { Locale } from "./config";

/**
 * ZLOKALIZOWANE OPCJE FORMULARZA.
 * Wartości (`value`) pochodzą z `lib/leads/schema.ts` (API i scoring),
 * tłumaczymy wyłącznie etykiety i opisy.
 */

export interface LocalizedOption {
  value: string;
  label: string;
  description?: string;
}

export interface FormOptions {
  goals: LocalizedOption[];
  propertyTypes: LocalizedOption[];
  horizons: LocalizedOption[];
  contactMethods: LocalizedOption[];
  regions: LocalizedOption[];
  requirements: LocalizedOption[];
  labels: Record<
    | "goal"
    | "propertyType"
    | "horizon"
    | "regions"
    | "regionsHint"
    | "requirements"
    | "requirementsHint"
    | "contactMethod"
    | "budget"
    | "name"
    | "phone"
    | "email"
    | "summary"
    | "edit"
    | "back"
    | "next"
    | "submit"
    | "sending"
    | "trust"
    | "errorGeneric"
    | "errorNetwork",
    string
  >;
}

const PL: FormOptions = {
  goals: [
    { value: "inwestycja-najem", label: "Inwestycja pod najem", description: "Liczy się ROI" },
    { value: "dom-wakacyjny", label: "Dom wakacyjny", description: "Własne miejsce na urlop" },
    { value: "przeprowadzka", label: "Przeprowadzka", description: "Osiedlenie na stałe" },
  ],
  propertyTypes: [
    { value: "apartament", label: "Apartament", description: "Mieszkanie w budynku" },
    { value: "villa", label: "Villa", description: "Dom z basenem" },
    { value: "bungalow", label: "Bungalow", description: "Parter lub segment" },
    { value: "penthouse", label: "Penthouse", description: "Ostatnie piętro z tarasem" },
  ],
  horizons: [
    { value: "1-3-miesiace", label: "Kupuję w 1-3 mies.", description: "Gotowy do transakcji" },
    { value: "3-6-miesiecy", label: "W ciągu 3-6 mies.", description: "Aktywnie szukam" },
    { value: "powyzej-6-miesiecy", label: "Powyżej 6 mies.", description: "Planuję spokojnie" },
    { value: "tylko-badamy", label: "Tylko badam rynek", description: "Zbieram informacje" },
  ],
  contactMethods: [
    { value: "telefon", label: "Telefon", description: "Kontakt w 30 minut" },
    { value: "whatsapp", label: "WhatsApp", description: "Wygodne za granicą" },
    { value: "email", label: "E-mail", description: "Oferty i analizy PDF" },
  ],
  regions: [
    { value: "costa-blanca-poludnie", label: "Costa Blanca Południe", description: "Torrevieja, Orihuela Costa" },
    { value: "costa-blanca-polnoc", label: "Costa Blanca Północ", description: "Alicante, Calpe, Jávea" },
    { value: "costa-calida", label: "Costa Cálida", description: "Murcia, Mazarrón, Águilas" },
    { value: "doradztwo", label: "Szukam doradztwa", description: "Pomóżcie wybrać region" },
  ],
  requirements: [
    { value: "blisko-plazy", label: "Blisko plaży" },
    { value: "widok-na-morze", label: "Widok na morze" },
    { value: "licencja-turystyczna", label: "Licencja turystyczna" },
    { value: "rynek-pierwotny", label: "Rynek pierwotny" },
  ],
  labels: {
    goal: "Cel zakupu",
    propertyType: "Typ nieruchomości",
    horizon: "Kiedy kupujesz?",
    regions: "Lokalizacja / region",
    regionsHint: "Możesz wybrać kilka regionów lub poprosić o doradztwo.",
    requirements: "Kluczowe wymogi (opcjonalnie)",
    requirementsHint: "Zaznacz, co jest dla Ciebie ważne. Zawęzi to listę ofert.",
    contactMethod: "Preferowana forma kontaktu",
    budget: "Budżet (EUR)",
    name: "Imię i nazwisko",
    phone: "Telefon / WhatsApp",
    email: "E-mail (otrzymasz zestaw ofert)",
    summary: "Podsumowanie",
    edit: "Zmień",
    back: "Wstecz",
    next: "Przejdź do odbioru ofert (Krok 2/2)",
    submit: "Wyślij i odbierz oferty",
    sending: "Wysyłanie…",
    trust: "Bez prowizji od kupującego. Dane nie są odsprzedawane.",
    errorGeneric: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.",
    errorNetwork: "Brak połączenia. Sprawdź internet i spróbuj ponownie.",
  },
};

const EN: FormOptions = {
  goals: [
    { value: "inwestycja-najem", label: "Rental investment", description: "ROI first" },
    { value: "dom-wakacyjny", label: "Holiday home", description: "Your own place in the sun" },
    { value: "przeprowadzka", label: "Relocation", description: "Moving for good" },
  ],
  propertyTypes: [
    { value: "apartament", label: "Apartment", description: "Flat in a building" },
    { value: "villa", label: "Villa", description: "House with a pool" },
    { value: "bungalow", label: "Bungalow", description: "Ground floor or townhouse" },
    { value: "penthouse", label: "Penthouse", description: "Top floor with terrace" },
  ],
  horizons: [
    { value: "1-3-miesiace", label: "Buying in 1-3 months", description: "Ready to transact" },
    { value: "3-6-miesiecy", label: "Within 3-6 months", description: "Actively searching" },
    { value: "powyzej-6-miesiecy", label: "More than 6 months", description: "Planning calmly" },
    { value: "tylko-badamy", label: "Just researching", description: "Gathering information" },
  ],
  contactMethods: [
    { value: "telefon", label: "Phone", description: "Call within 30 minutes" },
    { value: "whatsapp", label: "WhatsApp", description: "Handy abroad" },
    { value: "email", label: "E-mail", description: "Listings and PDF reports" },
  ],
  regions: [
    { value: "costa-blanca-poludnie", label: "Costa Blanca South", description: "Torrevieja, Orihuela Costa" },
    { value: "costa-blanca-polnoc", label: "Costa Blanca North", description: "Alicante, Calpe, Jávea" },
    { value: "costa-calida", label: "Costa Cálida", description: "Murcia, Mazarrón, Águilas" },
    { value: "doradztwo", label: "I need advice", description: "Help me choose a region" },
  ],
  requirements: [
    { value: "blisko-plazy", label: "Close to the beach" },
    { value: "widok-na-morze", label: "Sea view" },
    { value: "licencja-turystyczna", label: "Tourist licence" },
    { value: "rynek-pierwotny", label: "New build" },
  ],
  labels: {
    goal: "Purchase goal",
    propertyType: "Property type",
    horizon: "When are you buying?",
    regions: "Location / region",
    regionsHint: "You can pick several regions or ask for advice.",
    requirements: "Key requirements (optional)",
    requirementsHint: "Tick what matters to you. It narrows the shortlist.",
    contactMethod: "Preferred contact method",
    budget: "Budget (EUR)",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "E-mail (you will receive the shortlist)",
    summary: "Summary",
    edit: "Edit",
    back: "Back",
    next: "Continue to offers (Step 2/2)",
    submit: "Send and get offers",
    sending: "Sending…",
    trust: "No buyer commission. Your data is never resold.",
    errorGeneric: "We could not send your enquiry. Please try again.",
    errorNetwork: "No connection. Check your internet and try again.",
  },
};
const ES: FormOptions = {
  goals: [
    { value: "inwestycja-najem", label: "Inversión en alquiler", description: "Prioridad al ROI" },
    { value: "dom-wakacyjny", label: "Segunda residencia", description: "Tu lugar de vacaciones" },
    { value: "przeprowadzka", label: "Traslado", description: "Mudanza definitiva" },
  ],
  propertyTypes: [
    { value: "apartament", label: "Apartamento", description: "Piso en edificio" },
    { value: "villa", label: "Villa", description: "Casa con piscina" },
    { value: "bungalow", label: "Bungalow", description: "Planta baja o adosado" },
    { value: "penthouse", label: "Ático", description: "Última planta con terraza" },
  ],
  horizons: [
    { value: "1-3-miesiace", label: "Compro en 1-3 meses", description: "Listo para comprar" },
    { value: "3-6-miesiecy", label: "En 3-6 meses", description: "Buscando activamente" },
    { value: "powyzej-6-miesiecy", label: "Más de 6 meses", description: "Planificando" },
    { value: "tylko-badamy", label: "Solo investigo", description: "Recopilando información" },
  ],
  contactMethods: [
    { value: "telefon", label: "Teléfono", description: "Llamada en 30 minutos" },
    { value: "whatsapp", label: "WhatsApp", description: "Cómodo en el extranjero" },
    { value: "email", label: "E-mail", description: "Ofertas e informes PDF" },
  ],
  regions: [
    { value: "costa-blanca-poludnie", label: "Costa Blanca Sur", description: "Torrevieja, Orihuela Costa" },
    { value: "costa-blanca-polnoc", label: "Costa Blanca Norte", description: "Alicante, Calpe, Jávea" },
    { value: "costa-calida", label: "Costa Cálida", description: "Murcia, Mazarrón, Águilas" },
    { value: "doradztwo", label: "Necesito asesoramiento", description: "Ayúdenme a elegir" },
  ],
  requirements: [
    { value: "blisko-plazy", label: "Cerca de la playa" },
    { value: "widok-na-morze", label: "Vistas al mar" },
    { value: "licencja-turystyczna", label: "Licencia turística" },
    { value: "rynek-pierwotny", label: "Obra nueva" },
  ],
  labels: {
    goal: "Objetivo de compra",
    propertyType: "Tipo de inmueble",
    horizon: "¿Cuándo compras?",
    regions: "Ubicación / región",
    regionsHint: "Puedes elegir varias regiones o pedir asesoramiento.",
    requirements: "Requisitos clave (opcional)",
    requirementsHint: "Marca lo que te importa. Reduce la lista de ofertas.",
    contactMethod: "Forma de contacto preferida",
    budget: "Presupuesto (EUR)",
    name: "Nombre y apellidos",
    phone: "Teléfono / WhatsApp",
    email: "E-mail (recibirás la selección)",
    summary: "Resumen",
    edit: "Cambiar",
    back: "Atrás",
    next: "Continuar a las ofertas (Paso 2/2)",
    submit: "Enviar y recibir ofertas",
    sending: "Enviando…",
    trust: "Sin comisión para el comprador. Tus datos no se revenden.",
    errorGeneric: "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
    errorNetwork: "Sin conexión. Comprueba tu internet e inténtalo de nuevo.",
  },
};

const OPTIONS: Record<Locale, FormOptions> = { pl: PL, en: EN, es: ES };

export function getFormOptions(locale: Locale): FormOptions {
  return OPTIONS[locale] ?? OPTIONS.pl;
}

/** Etykieta opcji na podstawie wartości (np. podsumowanie leada). */
export function labelFor(
  locale: Locale,
  group: "goals" | "propertyTypes" | "horizons" | "regions" | "requirements",
  value: string,
): string {
  return (
    getFormOptions(locale)[group].find((option) => option.value === value)?.label ?? value
  );
}

