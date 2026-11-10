import type { ServiceDefinition } from "./types";
import { apartamentyNaSprzedaz } from "./apartamenty-na-sprzedaz";
import { domyInwestycyjne } from "./domy-inwestycyjne";

export type { ServiceDefinition, ServiceKind, ServiceFaqSeed } from "./types";

/** Pierwsza usługa jest flagowa (nawigacja + główne CTA). */
export const SERVICES: readonly ServiceDefinition[] = [
  apartamentyNaSprzedaz,
  domyInwestycyjne,
] as const;

/** Slug-i zarezerwowane dla segmentów statycznych (kolizja = 404 / nadpisanie route). */
export const RESERVED_SLUGS = [
  "api",
  "ceny-m2",
  "costa-blanca",
  "o-nas",
  "kontakt",
  "blog",
  "polityka-prywatnosci",
  "regulamin",
  "sitemap",
  "robots",
  "_next",
] as const;

/** Raport cenowo-inwestycyjny (osobna intencja: dane, nie sprzedaż). */
export const PRICE_REPORT = {
  slug: "ceny-m2",
  name: "Ceny m² i ROI w Hiszpanii",
  linkLabel: "ceny m² i ROI",
} as const;

const serviceIndex = new Map(SERVICES.map((service) => [service.slug, service]));

export function getService(slug: string): ServiceDefinition | undefined {
  return serviceIndex.get(slug);
}

export function getServiceOrThrow(slug: string): ServiceDefinition {
  const service = serviceIndex.get(slug);
  if (!service) {
    throw new Error(
      `Nieznana usługa "${slug}". Dostępne: ${SERVICES.map((s) => s.slug).join(", ")}`,
    );
  }
  return service;
}

export const PRIMARY_SERVICE = SERVICES[0] as ServiceDefinition;
