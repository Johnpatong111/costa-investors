import type { Locale } from "./config";

/**
 * ===========================================================================
 * COPY FORMULARZA LEADOWEGO (pola, placeholdery, ARIA)
 * ===========================================================================
 * Powód istnienia: komponenty `step-contact`, `step-config` i
 * `multi-step-lead-form` miały zaszyte polskie napisy („Imię i nazwisko”,
 * „Numer PL lub międzynarodowy…”, aria-label „Postęp formularza”), więc
 * formularz na /en/ i /es/ zawierał polskie elementy — także dla czytników
 * ekranu. Wszystko, co widzi lub słyszy użytkownik, jest tutaj per język.
 */

export interface FormFieldCopy {
  edit: string;
  fullName: string;
  fullNamePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  phoneHint: string;
  email: string;
  emailOptional: string;
  emailPlaceholder: string;
  city: string;
  district: string;
  detailsToggle: string;
  messagePlaceholder: string;
  messageAria: string;
  consent: string;
  marketing: string;
  privacyNote: string;
  honeypotLabel: string;
  progressAria: string;
  budgetAria: string;
  budgetPlaceholder: string;
  budgetMax: string;
  extraToggle: string;
  extraHint: string;
  trustLine: string;
  defaultHeading: string;
  defaultSubheading: string;
}

export const FORM_FIELD_COPY: Record<Locale, FormFieldCopy> = {
  pl: {
    edit: "Zmień",
    fullName: "Imię i nazwisko",
    fullNamePlaceholder: "Jan Kowalski",
    phone: "Telefon / WhatsApp",
    phonePlaceholder: "+48 600 123 456",
    phoneHint: "Numer PL lub międzynarodowy (8-15 cyfr). Dzwoni agent mówiący po polsku.",
    email: "E-mail",
    emailOptional: "(opcjonalnie. Wyślemy analizę PDF)",
    emailPlaceholder: "jan@example.com",
    city: "Miejscowość",
    district: "Dzielnica / urbanizacja",
    detailsToggle: "Dodaj szczegóły (opcjonalnie)",
    messagePlaceholder: "Widok na morze, liczba sypialni, finansowanie, termin…",
    messageAria: "Dodatkowe informacje",
    consent:
      "Wyrażam zgodę na kontakt telefoniczny, WhatsApp lub e-mail oraz na przekazanie moich danych partnerskiej agencji nieruchomości w Hiszpanii w celu przygotowania oferty zakupu. Administratorem danych jest operator serwisu.",
    marketing: "Chcę dostawać nowe oferty i analizy rynku w Hiszpanii (opcjonalnie).",
    privacyNote: "Dane szyfrowane, nieodsprzedawane. Kontakt wyłącznie w sprawie zakupu.",
    honeypotLabel: "Strona internetowa",
    progressAria: "Postęp formularza",
    budgetAria: "Budżet w EUR. Suwak",
    budgetPlaceholder: "250 000",
    budgetMax: "1 000 000 euro i więcej",
    extraToggle: "+ Dodatkowe preferencje (opcjonalnie)",
    extraHint: "Zawęź wybór: blisko plaży, widok na morze, licencja turystyczna, rynek pierwotny.",
    trustLine:
      "Bez prowizji od kupującego · weryfikacja prawna abogado i NIE · dane nie są odsprzedawane",
    defaultHeading: "Znajdź nieruchomości i odbierz analizę ROI",
    defaultSubheading:
      "Wypełnij 4 krótkie pytania. W ciągu 15 minut prześlemy spersonalizowany zestaw ofert.",
  },
  en: {
    edit: "Edit",
    fullName: "Full name",
    fullNamePlaceholder: "John Smith",
    phone: "Phone / WhatsApp",
    phonePlaceholder: "+44 7700 900123",
    phoneHint: "UK, EU or international number (8-15 digits). An English-speaking agent calls you.",
    email: "Email",
    emailOptional: "(optional. We email the PDF analysis)",
    emailPlaceholder: "john@example.com",
    city: "Location",
    district: "District / urbanisation",
    detailsToggle: "Add details (optional)",
    messagePlaceholder: "Sea view, number of bedrooms, financing, timeline…",
    messageAria: "Additional information",
    consent:
      "I agree to be contacted by phone, WhatsApp or email, and to my details being passed to a partner estate agency in Spain so that a purchase offer can be prepared. The site operator is the data controller.",
    marketing: "Send me new listings and Spanish market analysis (optional).",
    privacyNote: "Data encrypted, never resold. Contacted only about your purchase.",
    honeypotLabel: "Website",
    progressAria: "Form progress",
    budgetAria: "Budget in EUR. Slider",
    budgetPlaceholder: "250,000",
    budgetMax: "€1,000,000 or more",
    extraToggle: "+ Extra preferences (optional)",
    extraHint: "Narrow it down: near the beach, sea view, tourist licence, new build.",
    trustLine: "No buyer commission · abogado legal check and NIE · data never resold",
    defaultHeading: "Find properties and get an ROI analysis",
    defaultSubheading:
      "Four quick questions. Within 15 minutes we send a personalised shortlist.",
  },
  es: {
    edit: "Cambiar",
    fullName: "Nombre y apellidos",
    fullNamePlaceholder: "Juan García",
    phone: "Teléfono / WhatsApp",
    phonePlaceholder: "+34 600 123 456",
    phoneHint: "Número español o internacional (8-15 dígitos). Te llama un agente en español.",
    email: "Correo electrónico",
    emailOptional: "(opcional. Enviamos el análisis en PDF)",
    emailPlaceholder: "juan@example.com",
    city: "Localidad",
    district: "Zona / urbanización",
    detailsToggle: "Añadir detalles (opcional)",
    messagePlaceholder: "Vistas al mar, número de dormitorios, financiación, plazos…",
    messageAria: "Información adicional",
    consent:
      "Acepto el contacto por teléfono, WhatsApp o correo electrónico y la cesión de mis datos a una agencia inmobiliaria asociada en España para preparar una oferta de compra. El operador del sitio es el responsable del tratamiento.",
    marketing: "Quiero recibir nuevas ofertas y análisis del mercado español (opcional).",
    privacyNote: "Datos cifrados, nunca revendidos. Contacto solo sobre tu compra.",
    honeypotLabel: "Sitio web",
    progressAria: "Progreso del formulario",
    budgetAria: "Presupuesto en EUR. Control deslizante",
    budgetPlaceholder: "250.000",
    budgetMax: "1.000.000 € o más",
    extraToggle: "+ Preferencias adicionales (opcional)",
    extraHint: "Concreta: cerca de la playa, vistas al mar, licencia turística, obra nueva.",
    trustLine:
      "Sin comisión al comprador · revisión legal con abogado y NIE · datos nunca revendidos",
    defaultHeading: "Encuentra viviendas y recibe un análisis de rentabilidad",
    defaultSubheading:
      "Cuatro preguntas rápidas. En 15 minutos enviamos una selección personalizada.",
  },
};

/**
 * Tłumaczenie komunikatów walidacji Zod. Schemat `leadFormSchema` jest wspólny
 * dla wszystkich języków, więc jego komunikaty były po polsku również na /en/
 * i /es/. Mapujemy je po treści; nieznany komunikat wraca bez zmian.
 */
const ERROR_TRANSLATIONS: Record<Exclude<Locale, "pl">, Record<string, string>> = {
  en: {
    "Podaj imię": "Enter your name",
    "Maksymalnie 80 znaków": "Maximum 80 characters",
    "Numer jest za krótki": "Phone number is too short",
    "Numer jest za długi": "Phone number is too long",
    "Dozwolone są cyfry, spacje, myślniki i +": "Use digits, spaces, hyphens or +",
    "Podaj poprawny adres e-mail": "Enter a valid email address",
    "Podaj miejscowość": "Enter a location",
    "Podaj budżet w EUR": "Enter a budget in EUR",
    "Maksymalnie 1000 znaków": "Maximum 1000 characters",
    "Zgoda jest wymagana": "Consent is required",
  },
  es: {
    "Podaj imię": "Indica tu nombre",
    "Maksymalnie 80 znaków": "Máximo 80 caracteres",
    "Numer jest za krótki": "El número es demasiado corto",
    "Numer jest za długi": "El número es demasiado largo",
    "Dozwolone są cyfry, spacje, myślniki i +": "Solo dígitos, espacios, guiones y +",
    "Podaj poprawny adres e-mail": "Indica un correo válido",
    "Podaj miejscowość": "Indica la localidad",
    "Podaj budżet w EUR": "Indica el presupuesto en EUR",
    "Maksymalnie 1000 znaków": "Máximo 1000 caracteres",
    "Zgoda jest wymagana": "El consentimiento es obligatorio",
  },
};

export function translateFieldError(
  message: string | undefined,
  locale: Locale,
): string | undefined {
  if (!message || locale === "pl") return message;
  return ERROR_TRANSLATIONS[locale][message] ?? message;
}

