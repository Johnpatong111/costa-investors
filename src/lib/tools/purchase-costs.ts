/**
 * ===========================================================================
 * MATEMATYKA KALKULATORA KOSZTÓW ZAKUPU
 * ===========================================================================
 * Wydzielone z komponentu, żeby dało się to przetestować bez przeglądarki.
 * Wszystkie funkcje są czyste: te same wejścia dają te same wyjścia, brak
 * zaokrągleń w środku (formatowanie dopiero w UI).
 */

export type Deal = "resale" | "new";
export type PropertyType = "flat" | "villa";
export type Residency = "nonEu" | "eu" | "resident";

export const IVA_RATE = 0.1;
export const AJD_RATE = 0.015;
export const NOTARY_RATE = 0.01;
export const LEGAL_RATE = 0.005;

export const IBI_RATE: Record<PropertyType, number> = { flat: 0.0035, villa: 0.0045 };
export const COMMUNITY_RATE: Record<PropertyType, number> = { flat: 0.009, villa: 0.003 };
export const INSURANCE_RATE: Record<PropertyType, number> = { flat: 0.0015, villa: 0.0025 };
export const RENT_TAX: Record<Residency, number> = { nonEu: 0.19, eu: 0.24, resident: 0.19 };

export interface PurchaseCostsInput {
  price: number;
  /** Stawka ITP dla wspólnoty autonomicznej w procentach. */
  itp: number;
  deal: Deal;
  property: PropertyType;
  residency: Residency;
  /** Rentowność brutto rynku w procentach. */
  rentalYield: number;
}

export interface PurchaseCostsResult {
  transferTax: number;
  ajd: number;
  notary: number;
  legal: number;
  transactionCosts: number;
  total: number;
  costsPercent: number;
  ibi: number;
  community: number;
  insurance: number;
  annual: number;
  annualPerMonth: number;
  rentGross: number;
  rentTax: number;
  rentNet: number;
  netYield: number;
}

/** Zamienia wejście z formularza na bezpieczną liczbę (NaN, ujemne → 0). */
export function sanitizeNumber(value: number, max = Number.MAX_SAFE_INTEGER): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, max);
}

export function computePurchaseCosts(input: PurchaseCostsInput): PurchaseCostsResult {
  const price = sanitizeNumber(input.price, 3_000_000);
  const itp = sanitizeNumber(input.itp, 30);
  const rentalYield = sanitizeNumber(input.rentalYield, 30);

  const transferTax = input.deal === "new" ? price * IVA_RATE : (price * itp) / 100;
  const ajd = input.deal === "new" ? price * AJD_RATE : 0;
  const notary = price * NOTARY_RATE;
  const legal = price * LEGAL_RATE;
  const transactionCosts = transferTax + ajd + notary + legal;

  const ibi = price * IBI_RATE[input.property];
  const community = price * COMMUNITY_RATE[input.property];
  const insurance = price * INSURANCE_RATE[input.property];
  const annual = ibi + community + insurance;

  const rentGross = (price * rentalYield) / 100;
  // Rezydent płaci od dochodu po kosztach, nierezydent od czynszu brutto.
  const taxableBase = input.residency === "resident" ? Math.max(0, rentGross - annual) : rentGross;
  const rentTax = taxableBase * RENT_TAX[input.residency];
  const rentNet = rentGross - rentTax;

  return {
    transferTax,
    ajd,
    notary,
    legal,
    transactionCosts,
    total: price + transactionCosts,
    costsPercent: price > 0 ? (transactionCosts / price) * 100 : 0,
    ibi,
    community,
    insurance,
    annual,
    annualPerMonth: annual / 12,
    rentGross,
    rentTax,
    rentNet,
    netYield: price > 0 ? (rentNet / price) * 100 : 0,
  };
}
