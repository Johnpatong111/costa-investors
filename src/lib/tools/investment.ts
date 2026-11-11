/**
 * ===========================================================================
 * MATEMATYKA WORKBENCHA INWESTORA
 * ===========================================================================
 * Rata annuitetowa, cash flow i zwrot z kapitału własnego. Wydzielone z
 * komponentu, żeby tę samą formułę mogły sprawdzić testy i kalkulator w leadach.
 */

export const PURCHASE_COSTS_RATE = 0.135;

export type Scenario = "year" | "season";
export type Financing = "cash" | "mortgage";

/** Rata annuitetowa: kapitał, stopa roczna w procentach, liczba miesięcy. */
export function annuity(principal: number, annualRate: number, months: number): number {
  if (!Number.isFinite(principal) || principal <= 0) return 0;
  if (!Number.isFinite(months) || months <= 0) return 0;
  const rate = Number.isFinite(annualRate) && annualRate > 0 ? annualRate : 0;
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export interface InvestmentInput {
  budget: number;
  pricePerM2: number;
  rentalYield: number;
  netYield: number;
  priceGrowth: number;
  scenario: Scenario;
  financing: Financing;
  /** Udział kredytu w cenie, w procentach. */
  ltv: number;
  /** Oprocentowanie roczne w procentach. */
  rate: number;
  years: number;
}

export interface InvestmentResult {
  areaM2: number;
  purchaseCosts: number;
  rentGross: number;
  rentNet: number;
  netYieldPct: number;
  value5: number;
  totalReturn: number;
  loan: number;
  payment: number;
  cashInvested: number;
  cashOnCash: number;
  cashFlow: number;
}

export function computeInvestment(input: InvestmentInput): InvestmentResult {
  const budget = Number.isFinite(input.budget) && input.budget > 0 ? input.budget : 0;
  const months = input.scenario === "season" ? 8 : 12;
  const areaM2 = input.pricePerM2 > 0 ? Math.round(budget / input.pricePerM2) : 0;
  const purchaseCosts = Math.round(budget * PURCHASE_COSTS_RATE);
  const rentGross = Math.round(((budget * input.rentalYield) / 100) * (months / 12));
  // Proporcja netto/brutto z rynku: zachowuje różnicę kosztów między miastami.
  const netRatio = input.rentalYield > 0 ? input.netYield / input.rentalYield : 0.7;
  const rentNet = Math.round(rentGross * netRatio);
  const netYieldPct = budget > 0 ? (rentNet / budget) * 100 : 0;
  const value5 = Math.round(budget * Math.pow(1 + input.priceGrowth / 100, 5));

  const loan =
    input.financing === "mortgage" ? Math.round((budget * Math.min(100, Math.max(0, input.ltv))) / 100) : 0;
  const payment = input.financing === "mortgage" ? Math.round(annuity(loan, input.rate, input.years * 12)) : 0;
  const cashInvested = Math.max(1, budget - loan + purchaseCosts);
  const cashOnCash = ((rentNet - payment * 12) / cashInvested) * 100;

  return {
    areaM2,
    purchaseCosts,
    rentGross,
    rentNet,
    netYieldPct,
    value5,
    totalReturn: value5 - budget + rentNet * 5,
    loan,
    payment,
    cashInvested,
    cashOnCash,
    cashFlow: Math.round(rentNet / 12 - payment),
  };
}
