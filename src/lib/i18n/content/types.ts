import type { ServiceKind } from "../../data/services/types";

/**
 * Kontrakt warstwy TREŚCI (body). Odrębny od słowników UI:
 * tutaj są całe akapity generowane per lokalizacja.
 *
 * Każdy język musi dostarczyć komplet sekcji (`satisfies LocalizedContent`),
 * więc brak tłumaczenia bloku jest błędem kompilacji, a nie angielskim
 * tekstem w hiszpańskiej wersji.
 */

export interface LocalizedFaq {
  q: string;
  a: string;
}

export interface LocalizedStep {
  title: string;
  description: string;
  duration: string;
}

export interface LocalizedServiceCopy {
  name: string;
  propertyNoun: string;
  propertyNounGenitive: string;
  priceAnchor: string;
  highlightLabel: string;
  ctaLabel: string;
  h1: string[];
  metaTitle: string[];
  metaDescription: string[];
  benefits: { title: string; description: string }[];
  checklist: string[];
}

export interface LocalizedContent {
  district: {
    leads: string[];
    blocks: {
      rynek: { heading: string; p1: string; p2: string };
      roi: { heading: string; p1: string; p2: string };
      koszty: { heading: string; p1: string; bullets: string[] };
      kupujacy: { heading: string; p1: string; p2: string };
    };
    bullets: string[];
    faq: LocalizedFaq[];
    notes: string[];
  };
  city: {
    leads: string[];
    blocks: {
      rynek: { heading: string; p1: string; p2: string };
      dzielnice: { heading: string; p1: string };
      proces: { heading: string; p1: string };
      koszty: { heading: string; p1: string; bullets: string[] };
    };
    faq: LocalizedFaq[];
  };
  report: {
    h1: string[];
    metaTitle: string;
    metaDescription: string;
    lead: string;
    blocks: {
      ceny: { heading: string; p1: string; bullets: string[] };
      roi: { heading: string; p1: string; p2: string };
      podatki: { heading: string; p1: string; p2: string };
      metodologia: { heading: string; p1: string };
    };
    faq: LocalizedFaq[];
  };
  service: Record<ServiceKind, LocalizedServiceCopy>;
  process: LocalizedStep[];
}
