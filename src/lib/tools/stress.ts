/**
 * ===========================================================================
 * STRESS TEST INWESTYCJI
 * ===========================================================================
 * Odpowiada na pytanie, którego nie zadaje żaden portal: co się stanie z cash
 * flow, jeśli stopa wzrośnie o 2 pkt proc., czynsz spadnie o 10%, a lokal
 * postoi dwa miesiące dłużej. Każdy scenariusz liczony osobno, żeby użytkownik
 * widział, który element psuje model.
 */

import { annuity } from "./investment";

export interface StressInput {
  /** Cena zakupu (budżet). */
  price: number;
  /** Udział kredytu w cenie, w procentach. */
  ltv: number;
  /** Oprocentowanie roczne w procentach. */
  rate: number;
  years: number;
  /** Czynsz netto miesięcznie (po kosztach zarządzania i podatku). */
  monthlyRent: number;
  /** Koszty stałe miesięcznie: IBI, comunidad, ubezpieczenie. */
  monthlyCosts: number;
}

export interface StressScenario {
  id: "base" | "rate" | "rent" | "vacancy" | "price" | "combo";
  payment: number;
  cashFlow: number;
  /** Pokrycie raty czynszem netto (DSCR). */
  dscr: number;
  /** Wartość nieruchomości po szoku. */
  value: number;
  /** Kapitał własny po szoku: wartość minus kredyt. */
  equity: number;
  /** LTV po szoku: kredyt podzielony przez nową wartość. */
  ltvAfter: number;
  /** Czy kapitał własny spadł poniżej zera. */
  underwater: boolean;
}

export interface StressResult {
  loan: number;
  payment: number;
  baseCashFlow: number;
  scenarios: StressScenario[];
}

const RATE_SHOCK = 2;
const RENT_SHOCK = 0.9;
const PRICE_SHOCK = 0.9;
const EXTRA_VACANCY_MONTHS = 2;

export function computeStress(input: StressInput): StressResult {
  const price = Number.isFinite(input.price) && input.price > 0 ? input.price : 0;
  const ltvPercent = Math.min(100, Math.max(0, Number.isFinite(input.ltv) ? input.ltv : 0));
  const rate = Math.max(0, Number.isFinite(input.rate) ? input.rate : 0);
  const years = Math.max(1, Number.isFinite(input.years) ? input.years : 25);
  const rent = Math.max(0, Number.isFinite(input.monthlyRent) ? input.monthlyRent : 0);
  const costs = Math.max(0, Number.isFinite(input.monthlyCosts) ? input.monthlyCosts : 0);

  const loan = Math.round((price * ltvPercent) / 100);
  const payment = Math.round(annuity(loan, rate, years * 12));
  const baseCashFlow = Math.round(rent - payment - costs);

  const build = (
    id: StressScenario["id"],
    paymentValue: number,
    rentValue: number,
    value: number,
  ): StressScenario => {
    const cashFlow = Math.round(rentValue - paymentValue - costs);
    const equity = Math.round(value - loan);
    return {
      id,
      payment: Math.round(paymentValue),
      cashFlow,
      dscr: paymentValue > 0 ? rentValue / paymentValue : Number.POSITIVE_INFINITY,
      value: Math.round(value),
      equity,
      ltvAfter: value > 0 ? (loan / value) * 100 : 0,
      underwater: equity < 0,
    };
  };

  const paymentAtHigherRate = Math.round(annuity(loan, rate + RATE_SHOCK, years * 12));
  // Dwa dodatkowe miesiące pustostanu: czynsz rozłożony na 10 z 12 miesięcy.
  const rentWithVacancy = rent * (10 / 12);

  const scenarios: StressScenario[] = [
    build("base", payment, rent, price),
    build("rate", paymentAtHigherRate, rent, price),
    build("rent", payment, rent * RENT_SHOCK, price),
    build("vacancy", payment, rentWithVacancy, price),
    build("price", payment, rent, price * PRICE_SHOCK),
    build("combo", paymentAtHigherRate, rent * RENT_SHOCK * (10 / 12), price * PRICE_SHOCK),
  ];

  return { loan, payment, baseCashFlow, scenarios };
}

/** Rezerwa w miesiącach czynszu potrzebna na pokrycie scenariusza łączonego. */
export function bufferMonths(scenario: StressScenario, monthlyRent: number): number {
  if (scenario.cashFlow >= 0) return 0;
  if (monthlyRent <= 0) return Number.POSITIVE_INFINITY;
  return Math.ceil(Math.abs(scenario.cashFlow) * 12 / monthlyRent);
}

export { EXTRA_VACANCY_MONTHS, RATE_SHOCK, RENT_SHOCK, PRICE_SHOCK };
