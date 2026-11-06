import type { Locale } from "./config";

/**
 * ===========================================================================
 * SŁOWNIK UI (chrome serwisu: nawigacja, sekcje, CTA)
 * ===========================================================================
 * Wszystko, co powtarza się na każdej stronie i MUSI być w języku `[lang]`.
 * Treść merytoryczna (body, FAQ, opisy) żyje w `content/*` i builderach,
 * natomiast tutaj trzymamy etykiety interfejsu, żeby żaden polski ciąg nie
 * wyciekał do widoków EN i ES.
 */
export interface UiCopy {
  home: string;
  servicesNav: string;
  citiesNav: string;
  infoNav: string;
  reportsNav: string;
  ctaOffers: string;
  howItWorks: string;
  howItWorksSubtitle: string;
  howItWorksTitle: (serviceName: string, areaName: string) => string;
  faqTitle: (serviceName: string, areaName: string) => string;
  otherServices: (areaName: string) => string;
  otherDistricts: (serviceName: string) => string;
  investmentReport: string;
  reportLink: (areaName: string, dataAsOf: string) => string;
  dataFootnote: (areaName: string, dataAsOf: string) => string;
  marketDataLabel: string;
  stickyPreferences: string;
  stickyOffers: string;
}

export const UI_COPY: Record<Locale, UiCopy> = {
  pl: {
    home: "Strona główna",
    servicesNav: "Usługi",
    citiesNav: "Największe miasta",
    infoNav: "Informacje",
    reportsNav: "Raporty inwestycyjne",
    ctaOffers: "Odbierz oferty",
    howItWorks: "Jak to działa",
    howItWorksSubtitle: "Każdy etap potwierdzamy na piśmie, a dokumenty tłumaczymy na polski.",
    howItWorksTitle: (serviceName, areaName) => `${serviceName} w ${areaName} krok po kroku`,
    faqTitle: (serviceName, areaName) => `${serviceName} w ${areaName}, pytania i odpowiedzi`,
    otherServices: (areaName) => `Inne usługi w ${areaName}`,
    otherDistricts: (serviceName) => `Inne dzielnice, ${serviceName}`,
    investmentReport: "Raport inwestycyjny",
    reportLink: (areaName, dataAsOf) => `Ceny i ROI w ${areaName}, raport ${dataAsOf}`,
    dataFootnote: (areaName, dataAsOf) =>
      `Dane rynkowe: ${dataAsOf}. Mediany ofertowe dla ${areaName}; wartości szacunkowe, nie stanowią oferty inwestycyjnej ani tasación.`,
    marketDataLabel: "Dane rynkowe",
    stickyPreferences: "Preferencje",
    stickyOffers: "Odbierz oferty",
  },
  en: {
    home: "Home",
    servicesNav: "Services",
    citiesNav: "Main cities",
    infoNav: "Information",
    reportsNav: "Investment reports",
    ctaOffers: "Get offers",
    howItWorks: "How it works",
    howItWorksSubtitle: "Every stage is confirmed in writing and all documents are translated for you.",
    howItWorksTitle: (serviceName, areaName) => `${serviceName} in ${areaName}. Buying steps`,
    faqTitle: (serviceName, areaName) => `${serviceName} in ${areaName}. Questions and answers`,
    otherServices: (areaName) => `Other services in ${areaName}`,
    otherDistricts: (serviceName) => `Other districts, ${serviceName}`,
    investmentReport: "Investment report",
    reportLink: (areaName, dataAsOf) => `Prices and ROI in ${areaName}, report ${dataAsOf}`,
    dataFootnote: (areaName, dataAsOf) =>
      `Market data: ${dataAsOf}. Asking medians for ${areaName}; estimates only, not an investment offer or a tasación.`,
    marketDataLabel: "Market data",
    stickyPreferences: "Preferences",
    stickyOffers: "Get offers",
  },
  es: {
    home: "Inicio",
    servicesNav: "Servicios",
    citiesNav: "Principales ciudades",
    infoNav: "Información",
    reportsNav: "Informes de inversión",
    ctaOffers: "Ver ofertas",
    howItWorks: "Cómo funciona",
    howItWorksSubtitle: "Cada etapa se confirma por escrito y todos los documentos se traducen.",
    howItWorksTitle: (serviceName, areaName) => `${serviceName} en ${areaName}. Pasos de compra`,
    faqTitle: (serviceName, areaName) => `${serviceName} en ${areaName}. Preguntas y respuestas`,
    otherServices: (areaName) => `Otros servicios en ${areaName}`,
    otherDistricts: (serviceName) => `Otros barrios, ${serviceName}`,
    investmentReport: "Informe de inversión",
    reportLink: (areaName, dataAsOf) => `Precios y ROI en ${areaName}, informe ${dataAsOf}`,
    dataFootnote: (areaName, dataAsOf) =>
      `Datos de mercado: ${dataAsOf}. Medianas de oferta para ${areaName}; valores estimados, no constituyen oferta de inversión ni tasación.`,
    marketDataLabel: "Datos de mercado",
    stickyPreferences: "Preferencias",
    stickyOffers: "Ver ofertas",
  },
};

export function getUiCopy(locale: Locale): UiCopy {
  return UI_COPY[locale] ?? UI_COPY.pl;
}

/** Etykiety formularza leadowego (chrome: postęp, legendy, budżet, CTA). */
export const FORM_COPY: Record<
  Locale,
  {
    stepLabel: (index: number) => string;
    stepOne: string;
    stepTwo: string;
    budget: string;
    contactLegend: string;
    summaryEdit: string;
  }
> = {
  pl: {
    stepLabel: (index) => `krok ${index}/2`,
    stepOne: "Inwestycja",
    stepTwo: "Kontakt",
    budget: "Budżet (EUR)",
    contactLegend: "Preferowana forma kontaktu",
    summaryEdit: "Zmień",
  },
  en: {
    stepLabel: (index) => `step ${index}/2`,
    stepOne: "Investment",
    stepTwo: "Contact",
    budget: "Budget (EUR)",
    contactLegend: "Preferred contact method",
    summaryEdit: "Edit",
  },
  es: {
    stepLabel: (index) => `paso ${index}/2`,
    stepOne: "Inversión",
    stepTwo: "Contacto",
    budget: "Presupuesto (EUR)",
    contactLegend: "Forma de contacto preferida",
    summaryEdit: "Cambiar",
  },
};

/** Ekran sukcesu po wysłaniu formularza (Uczciwy model lead-gen: 2 kroki). */
export const SUCCESS_COPY: Record<
  Locale,
  {
    thanks: (name: string) => string;
    body: string;
    summaryLabel: string;
    budgetLabel: string;
    rentLabel: string;
    steps: { title: string; description: string }[];
    emailCta: string;
    reset: string;
  }
> = {
  pl: {
    thanks: (name) => `Dziękujemy, ${name}!`,
    body: "Zgłoszenie trafiło do naszego zespołu i do zweryfikowanego agenta w Hiszpanii. Kontakt następuje e-mailem lub przez WhatsApp, w godzinach 9:00-20:00 CET.",
    summaryLabel: "Podsumowanie zgłoszenia",
    budgetLabel: "Budżet",
    rentLabel: "prognozowany czynsz",
    steps: [
      {
        title: "Weryfikacja w 30 minut",
        description:
          "Analizujemy budżet i preferencje oraz dobieramy agentów z ofertami w wybranej lokalizacji.",
      },
      {
        title: "Kontakt od agenta w 24 h",
        description:
          "Polskojęzyczny agent przesyła dopasowane oferty bezpośrednio na podany e-mail lub WhatsApp.",
      },
    ],
    emailCta: "Napisz do nas",
    reset: "Nowe zgłoszenie",
  },
  en: {
    thanks: (name) => `Thank you, ${name}!`,
    body: "Your enquiry reached our team and a verified agent in Spain. We contact you by e-mail or WhatsApp, between 9:00 and 20:00 CET.",
    summaryLabel: "Your enquiry",
    budgetLabel: "Budget",
    rentLabel: "projected rent",
    steps: [
      {
        title: "Verification within 30 minutes",
        description:
          "We review your budget and preferences, then match agents with listings in your chosen area.",
      },
      {
        title: "Agent contact within 24 h",
        description:
          "An English-speaking agent sends matched listings straight to your e-mail or WhatsApp.",
      },
    ],
    emailCta: "Email us",
    reset: "New enquiry",
  },
  es: {
    thanks: (name) => `¡Gracias, ${name}!`,
    body: "Tu solicitud llegó a nuestro equipo y a un agente verificado en España. El contacto se realiza por e-mail o WhatsApp, de 9:00 a 20:00 CET.",
    summaryLabel: "Tu solicitud",
    budgetLabel: "Presupuesto",
    rentLabel: "alquiler estimado",
    steps: [
      {
        title: "Verificación en 30 minutos",
        description:
          "Analizamos tu presupuesto y preferencias y asignamos agentes con ofertas en la zona elegida.",
      },
      {
        title: "Contacto del agente en 24 h",
        description:
          "Un agente en español envía las ofertas ajustadas directamente a tu e-mail o WhatsApp.",
      },
    ],
    emailCta: "Escríbenos",
    reset: "Nueva solicitud",
  },
};
export const FOOTER_COPY: Record<
  Locale,
  { privacy: string; terms: string; about: string; tagline: string; rights: string }
> = {
  pl: {
    privacy: "Polityka prywatności",
    terms: "Regulamin",
    about: "O nas",
    tagline: "Nieruchomości w Hiszpanii dla inwestorów z Polski i Europy.",
    rights: "Wszystkie prawa zastrzeżone.",
  },
  en: {
    privacy: "Privacy policy",
    terms: "Terms of service",
    about: "About us",
    tagline: "Property in Spain for investors from Poland and Europe.",
    rights: "All rights reserved.",
  },
  es: {
    privacy: "Política de privacidad",
    terms: "Reglamento",
    about: "Sobre nosotros",
    tagline: "Inmuebles en España para inversores de Polonia y Europa.",
    rights: "Todos los derechos reservados.",
  },
};
