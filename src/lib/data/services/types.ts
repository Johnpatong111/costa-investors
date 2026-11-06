/**
 * Kontrakt usługi. Jedna usługa = jedna intencja zakupowa.
 * Synonimy rotują w treści, nie w routingu (ochrona przed kanibalizacją).
 *
 * Placeholdery: {city} {cityLoc} {cityGen} {district} {districtLoc}
 * {price} {growth} {yield} {rent} {year} {budget} {return} {landmark}
 */

export type ServiceKind = "buy" | "villa" | "investment" | "lead-magnet";

export interface ServiceFaqSeed {
  q: string;
  a: string;
}

export interface ServiceDefinition {
  slug: string;
  kind: ServiceKind;
  /** Mianownik: "Apartamenty na sprzedaż". */
  name: string;
  /** Dopełniacz: "apartamentów na sprzedaż". */
  nameGenitive: string;
  propertyNoun: string;
  propertyNounGenitive: string;
  intent: "transactional" | "commercial";
  ctaLabel: string;
  /** Widełki cenowe w EUR. Budują oczekiwania i filtrują leady. */
  priceAnchor: string;
  /** Drugi wyróżnik oferty (ROI, doradztwo, analiza prawna). */
  highlightLabel: string;
  h1: string[];
  metaTitle: string[];
  metaDescription: string[];
  synonyms: string[];
  benefits: { title: string; description: string }[];
  process: { title: string; description: string; duration: string }[];
  faq: ServiceFaqSeed[];
  /** Lista kontrolna / dokumenty. Zależy od typu usługi. */
  checklist: string[];
  linkLabel: string;
}
