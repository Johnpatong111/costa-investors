import type { Locale } from "./config";

/**
 * Kontrakt słownika. Każdy język musi dostarczyć KOMPLET kluczy
 * (wymuszone przez `satisfies Dictionary`), więc brak tłumaczenia jest
 * błędem kompilacji, a nie angielskim tekstem w hiszpańskiej wersji.
 *
 * Zasada: żadnych funkcji w słownikach. Obiekty muszą być serializowalne,
 * bo część copy trafia do komponentów klienckich (formularz, kalkulator).
 */

export interface FaqCopy {
  q: string;
  a: string;
}

export interface Dictionary {
  meta: {
    titleTemplate: string; // "{title} | Costa Invest"
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    services: string;
    locations: string;
    reports: string;
    about: string;
    language: string;
    call: string;
  };
  form: {
    heading: string;
    subheading: string;
    stepProperty: string;
    stepContact: string;
    stepLabel: string; // "krok {step}/2"
    next: string;
    back: string;
    submit: string;
    sending: string;
    summaryEdit: string;
    details: string;
    consent: string;
    marketing: string;
    labels: {
      goal: string;
      propertyType: string;
      horizon: string;
      budget: string;
      name: string;
      phone: string;
      email: string;
      city: string;
      district: string;
      contactMethod: string;
      message: string;
    };
    errors: {
      required: string;
      phone: string;
      email: string;
      budget: string;
      generic: string;
      network: string;
    };
  };
  calculator: {
    eyebrow: string;
    title: string;
    budgetLegend: string;
    exactAmount: string;
    areaHint: string;
    annualRent: string;
    netRent: string;
    return5y: string;
    ofBudget: string;
    value5y: string;
    cta: string;
    disclaimer: string;
  };
  success: {
    title: string; // "Thank you, {name}!"
    body: string; // "...{phone}..."
    summary: string;
    budget: string;
    rent: string;
    call: string;
    reset: string;
    sla: string;
    steps: [FaqCopy, FaqCopy, FaqCopy];
  };
  legal: {
    nie: FaqCopy;
    itp: FaqCopy;
    residency: FaqCopy;
  };
  seo: {
    districtTitle: string;
    districtDescription: string;
    cityTitle: string;
    cityDescription: string;
  };
}

export type DictionaryMap = Record<Locale, Dictionary>;

/** Proste podstawianie "{name}". Wspólne dla klienta i serwera. */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? "");
}
