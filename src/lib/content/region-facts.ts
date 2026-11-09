import type { Locale } from "../i18n/config";

/**
 * ===========================================================================
 * FAKTY PODATKOWE PER WSPÓLNOTA AUTONOMICZNA
 * ===========================================================================
 * ITP (Impuesto de Transmisiones Patrimoniales) różni się między regionami:
 * Comunidad Valenciana 10%, Región de Murcia 8% (stawka ogólna 2026).
 * Ta różnica jest prawdziwa, wpływa na kalkulację zwrotu i realnie różnicuje
 * treść stron Costa Blanca vs Costa Cálida — nie jest zabiegiem SEO.
 */

export interface RegionTaxFacts {
  /** Stawka ITP na rynku wtórnym w %. */
  itp: number;
  /** Nazwa wspólnoty autonomicznej pobierającej podatek. */
  authority: string;
  /** Czy region pobiera AJD przy nowym budownictwie. */
  ajd: boolean;
}

const REGION_TAX: Record<string, RegionTaxFacts> = {
  "costa-blanca": { itp: 10, authority: "Comunidad Valenciana", ajd: true },
  "costa-calida": { itp: 8, authority: "Región de Murcia", ajd: true },
};

export function regionTax(regionSlug: string): RegionTaxFacts {
  return REGION_TAX[regionSlug] ?? { itp: 10, authority: "Comunidad Valenciana", ajd: true };
}

/** Nazwa wspólnoty w formie do zdania per język. */
export function authorityLabel(authority: string, locale: Locale): string {
  if (locale === "en") return `the ${authority} region`;
  if (locale === "es") return `la ${authority}`;
  return authority;
}
