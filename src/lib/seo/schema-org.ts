import { SITE, absoluteUrl } from "./site";
import type { ServiceDefinition } from "../data/services";
import type { FaqItem } from "../content/content-utils";
import type { Locale } from "../i18n/config";

/**
 * ===========================================================================
 * DANE STRUKTURALNE (schema.org / JSON-LD)
 * ===========================================================================
 * Emitujemy jeden graf `@graph` na stronę. Mniej powtórzeń, spójne `@id`,
 * a Google łączy encje (RealEstateAgent ↔ Service ↔ FAQPage).
 *
 * WAŻNE: dane muszą być zgodne z widoczną treścią (FAQPage = widoczne FAQ,
 * breadcrumb = widoczna nawigacja). Inaczej to spam strukturalny.
 */

export type JsonLdNode = Record<string, unknown>;

export const NODE_IDS = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  place: (path: string) => `${absoluteUrl(path)}#place`,
  localAgent: (path: string) => `${absoluteUrl(path)}#local-agent`,
} as const;

/** BCP-47 dla `inLanguage` w JSON-LD. */
const LOCALE_TAG: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en",
  es: "es-ES",
};

const languageTag = (locale?: Locale): string =>
  locale ? LOCALE_TAG[locale] : SITE.locale;

const DAY_ORDER = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
const DAY_MAP: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

/** "Mo-Fr 08:00-20:00" → lista OpeningHoursSpecification. */
function openingHoursNodes(specs: readonly string[]): JsonLdNode[] {
  return specs.flatMap((spec) => {
    const [daysPart, hoursPart] = spec.split(/\s+/);
    const [opens, closes] = (hoursPart ?? "").split("-");
    if (!daysPart || !opens || !closes) return [];

    const [startDay, endDay] = daysPart.split("-");
    const start = DAY_ORDER.indexOf((startDay ?? "Mo") as (typeof DAY_ORDER)[number]);
    const end = endDay
      ? DAY_ORDER.indexOf(endDay as (typeof DAY_ORDER)[number])
      : start;
    const from = Math.max(0, Math.min(start, end));
    const to = Math.max(start, end);

    return DAY_ORDER.slice(from, to + 1).map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP[day],
      opens,
      closes,
    }));
  });
}

/**
 * Opis organizacji w JSON-LD musi być w języku strony. Wcześniej wszystkie
 * wersje /en/ i /es/ dziedziczyły polski `SITE.description`, przez co każda
 * strona EN zawierała polskie zdanie w danych strukturalnych.
 */
const ORG_COPY: Record<"pl" | "en" | "es", {
  description: string;
  priceRange: string;
  paymentAccepted: string;
  country: string;
}> = {
  pl: {
    description: SITE.description,
    priceRange: "od 120 000 €",
    paymentAccepted: "Przelew bankowy",
    country: "Hiszpania",
  },
  en: {
    description:
      "Costa Investors helps investors from Poland and Europe buy property on Costa Blanca and Costa Cálida, with €/m² market data, rental yields and a licensed local buyer's agent.",
    priceRange: "from €120,000",
    paymentAccepted: "Bank transfer",
    country: "Spain",
  },
  es: {
    description:
      "Costa Investors ayuda a inversores de Polonia y Europa a comprar vivienda en Costa Blanca y Costa Cálida, con datos de €/m², rentabilidad de alquiler y agente comprador local.",
    priceRange: "desde 120.000 €",
    paymentAccepted: "Transferencia bancaria",
    country: "España",
  },
};

export function organizationNode(locale: "pl" | "en" | "es" = "pl"): JsonLdNode {
  const org = ORG_COPY[locale];
  return {
    "@type": "RealEstateAgent",
    "@id": NODE_IDS.organization,
    name: SITE.brand,
    legalName: SITE.legalName,
    url: SITE.url,
    description: org.description,
    email: SITE.email,
    priceRange: org.priceRange,
    currenciesAccepted: "EUR, PLN",
    paymentAccepted: org.paymentAccepted,
    areaServed: [
      { "@type": "Country", name: org.country },
      { "@type": "AdministrativeArea", name: "Costa Blanca" },
      { "@type": "AdministrativeArea", name: "Costa Cálida" },
      { "@type": "AdministrativeArea", name: "Costa del Sol" },
      { "@type": "AdministrativeArea", name: "Comunidad Valenciana" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: openingHoursNodes(SITE.openingHours),
    sameAs: [...SITE.socials],
    knowsLanguage: ["pl-PL", "en"],
  };
}

export function websiteNode(locale: "pl" | "en" | "es" = "pl"): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": NODE_IDS.website,
    url: SITE.url,
    name: SITE.brand,
    inLanguage: SITE.locale,
    publisher: { "@id": NODE_IDS.organization },
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(input: {
  service: ServiceDefinition;
  path: string;
  description: string;
  areaServed: { name: string; type: "City" | "AdministrativeArea" }[];
  priceRangeLabel: string;
  locale?: Locale;
}): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.service.name,
    serviceType: input.service.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: languageTag(input.locale),
    provider: { "@id": NODE_IDS.organization },
    areaServed: input.areaServed.map((area) => ({
      "@type": area.type,
      name: area.name,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      description: input.priceRangeLabel,
      availability: "https://schema.org/InStock",
      seller: { "@id": NODE_IDS.organization },
    },
  };
}

export function faqNode(faq: FaqItem[], path: string, locale?: Locale): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    inLanguage: languageTag(locale),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Encja geograficzna podstrony pSEO: dzielnica/urbanizacja z współrzędnymi.
 * `containedInPlace` buduje łańcuch Place → City → Region → Country (ES),
 * co daje Google jednoznaczny kontekst geograficzny Hiszpanii.
 */
export function placeNode(input: {
  path: string;
  name: string;
  cityName: string;
  regionName: string;
  lat: number;
  lng: number;
  postalCode?: string;
}): JsonLdNode {
  return {
    "@type": "Place",
    "@id": NODE_IDS.place(input.path),
    name: `${input.name}, ${input.cityName}`,
    url: absoluteUrl(input.path),
    geo: {
      "@type": "GeoCoordinates",
      latitude: input.lat,
      longitude: input.lng,
    },
    address: {
      "@type": "PostalAddress",
      ...(input.postalCode ? { postalCode: input.postalCode } : {}),
      addressLocality: input.cityName,
      addressRegion: input.regionName,
      addressCountry: "ES",
    },
    containedInPlace: [
      {
        "@type": "City",
        name: input.cityName,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: input.regionName,
          containedInPlace: { "@type": "Country", name: "Spain" },
        },
      },
    ],
  };
}

/**
 * Lokalny agent (RealEstateAgent) w kontekście konkretnej podstrony:
 * `parentOrganization` → główna encja firmy, `areaServed` → `Place` z tej strony.
 * Dzięki wspólnym `@id` Google scala encje w graf wiedzy zamiast duplikować NAP.
 */
export function localAgentNode(input: {
  path: string;
  placePath: string;
  areaName: string;
  cityName: string;
  regionName: string;
  lat: number;
  lng: number;
  languages?: readonly string[];
}): JsonLdNode {
  return {
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": NODE_IDS.localAgent(input.path),
    name: `${SITE.brand}, ${input.areaName}`,
    url: absoluteUrl(input.path),
    parentOrganization: { "@id": NODE_IDS.organization },
    email: SITE.email,
    priceRange: "€120,000 - €2,500,000",
    currenciesAccepted: "EUR",
    paymentAccepted: "Przelew bankowy / Transferencia / Bank transfer",
    areaServed: { "@id": NODE_IDS.place(input.placePath) },
    address: {
      "@type": "PostalAddress",
      addressLocality: input.cityName,
      addressRegion: input.regionName,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: input.lat,
      longitude: input.lng,
    },
    knowsLanguage: [...(input.languages ?? ["pl-PL", "en", "es-ES"])],
    openingHoursSpecification: openingHoursNodes(SITE.openingHours),
    sameAs: [...SITE.socials],
  };
}

/** Raport cenowy. Encja Dataset (Google traktuje ją jako dane, nie artykuł). */
export function datasetNode(input: {
  name: string;
  description: string;
  path: string;
  spatialName: string;
  temporalCoverage: string;
}): JsonLdNode {
  return {
    "@type": "Dataset",
    "@id": `${absoluteUrl(input.path)}#dataset`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    creator: { "@id": NODE_IDS.organization },
    publisher: { "@id": NODE_IDS.organization },
    inLanguage: SITE.locale,
    temporalCoverage: input.temporalCoverage,
    spatialCoverage: {
      "@type": "Place",
      name: input.spatialName,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.spatialName,
        addressCountry: "ES",
      },
    },
    variableMeasured: [
      { "@type": "PropertyValue", name: "Mediana ceny ofertowej (zł/m²)" },
      { "@type": "PropertyValue", name: "Dynamika cen r/r (%)" },
      { "@type": "PropertyValue", name: "Mediana czasu sprzedaży (dni)" },
      { "@type": "PropertyValue", name: "Liczba transakcji (12 mies.)" },
    ],
  };
}

/** Serializacja grafu do skryptu JSON-LD (escape `<` chroni przed XSS). */
export function serializeGraph(nodes: JsonLdNode[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
}

