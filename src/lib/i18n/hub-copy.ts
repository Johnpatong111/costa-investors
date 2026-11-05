import type { Locale } from "./config";

/**
 * ===========================================================================
 * COPY HUBÓW USŁUG (`/[lang]/[service]`)
 * ===========================================================================
 * Hub nie ma dzielnicy, więc teksty są „regionalne” i muszą istnieć w każdym
 * języku. Trzymamy je poza komponentem, żeby strona była czytelna i żeby QA
 * mogło sprawdzić komplet tłumaczeń (`satisfies Record<Locale, HubCopy>`).
 */
export interface HubCopy {
  home: string;
  h1: (name: string, region: string) => string;
  lead: (name: string, anchor: string, highlight: string) => string;
  chips: { median: string; cities: (count: number) => string; agent: string };
  footnote: (subregions: number) => string;
  leadHeading: string;
  leadSubheading: string;
  coverageEyebrow: string;
  coverageTitle: string;
  conditionsEyebrow: string;
  conditionsTitle: string;
  otherServices: string;
  servicesGroup: string;
  reportsGroup: string;
  reportLabel: string;
  notFound: string;
  metaDescription: (name: string, anchor: string) => string;
}

export const HUB_COPY: Record<Locale, HubCopy> = {
  pl: {
    home: "Strona główna",
    h1: (name, region) => `${name} na ${region}`,
    lead: (name, anchor, highlight) =>
      `${name}: ${anchor}, ${highlight}. Pokazujemy ceny €/m², realne ROI i pełne koszty zakupu (ITP/IVA, notariusz, prawnik) – a Twoje zgłoszenie trafia do certyfikowanego polskojęzycznego agenta z konkretnymi ofertami.`,
    chips: {
      median: "mediana",
      cities: (count) => `${count} miejscowości`,
      agent: "agent mówiący po polsku",
    },
    footnote: (subregions) =>
      `Obsługujemy ${subregions} subregionów Hiszpanii. Zgłoszenie przekazujemy do partnerskiej agencji – bez zobowiązania do zakupu.`,
    leadHeading: "Połącz się z ekspertem na Costa Blanca i Costa Cálida",
    leadSubheading:
      "Wypełnij preferencje – certyfikowany polskojęzyczny agent skontaktuje się z gotowymi ofertami.",
    coverageEyebrow: "Zasięg",
    coverageTitle: "Miejscowości na Costa Blanca i Costa Cálida",
    conditionsEyebrow: "Warunki",
    conditionsTitle: "Co dostajesz w ramach usługi",
    otherServices: "Pozostałe usługi",
    servicesGroup: "Usługi",
    reportsGroup: "Raporty inwestycyjne",
    reportLabel: "Ceny m² i ROI w Hiszpanii",
    notFound: "Nie znaleziono usługi",
    metaDescription: (name, anchor) =>
      `${name} na Costa Blanca i Costa Cálida: ${anchor}. Ceny €/m², ROI, koszty zakupu i kontakt z certyfikowanym polskojęzycznym agentem.`,
  },
  en: {
    home: "Home",
    h1: (name, region) => `${name} in ${region}`,
    lead: (name, anchor, highlight) =>
      `${name}: ${anchor}, ${highlight}. We show €/m² prices, real rental yields and the full cost of buying (ITP/IVA, notary, abogado) – your enquiry goes straight to a certified English-speaking agent with matched listings.`,
    chips: {
      median: "median",
      cities: (count) => `${count} locations`,
      agent: "English-speaking agent",
    },
    footnote: (subregions) =>
      `We cover ${subregions} subregions of Spain. Enquiries are passed to a partner agency – with no obligation to buy.`,
    leadHeading: "Talk to an expert on Costa Blanca and Costa Cálida",
    leadSubheading:
      "Share your preferences – a certified agent will come back with matched listings.",
    coverageEyebrow: "Coverage",
    coverageTitle: "Locations on Costa Blanca and Costa Cálida",
    conditionsEyebrow: "What you get",
    conditionsTitle: "Included in the service",
    otherServices: "Other services",
    servicesGroup: "Services",
    reportsGroup: "Investment reports",
    reportLabel: "€/m² prices and ROI in Spain",
    notFound: "Service not found",
    metaDescription: (name, anchor) =>
      `${name} on Costa Blanca and Costa Cálida: ${anchor}. €/m² prices, ROI, purchase costs and a certified English-speaking agent.`,
  },
  es: {
    home: "Inicio",
    h1: (name, region) => `${name} en ${region}`,
    lead: (name, anchor, highlight) =>
      `${name}: ${anchor}, ${highlight}. Mostramos precios €/m², rentabilidad real y todos los gastos de compra (ITP/IVA, notaría, abogado) – tu solicitud llega a un agente certificado con ofertas concretas.`,
    chips: {
      median: "mediana",
      cities: (count) => `${count} localidades`,
      agent: "agente en español",
    },
    footnote: (subregions) =>
      `Cubrimos ${subregions} subregiones de España. La solicitud se remite a una agencia asociada – sin obligación de compra.`,
    leadHeading: "Habla con un experto en Costa Blanca y Costa Cálida",
    leadSubheading:
      "Comparte tus preferencias – un agente certificado te enviará ofertas ajustadas.",
    coverageEyebrow: "Cobertura",
    coverageTitle: "Localidades en Costa Blanca y Costa Cálida",
    conditionsEyebrow: "Qué incluye",
    conditionsTitle: "Qué obtienes con el servicio",
    otherServices: "Otros servicios",
    servicesGroup: "Servicios",
    reportsGroup: "Informes de inversión",
    reportLabel: "Precios €/m² y ROI en España",
    notFound: "Servicio no encontrado",
    metaDescription: (name, anchor) =>
      `${name} en Costa Blanca y Costa Cálida: ${anchor}. Precios €/m², ROI, gastos de compra y agente certificado.`,
  },
};
