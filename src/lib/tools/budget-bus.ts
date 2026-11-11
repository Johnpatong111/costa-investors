/**
 * ===========================================================================
 * MOSTEK BUDŻETU: NARZĘDZIA → FORMULARZ LEADOWY
 * ===========================================================================
 * Użytkownik liczy 350 000 € w kalkulatorze, klika „Przejdź do formularza”
 * i widzi tę samą kwotę w polu budżetu. Bez tego musiałby wpisać ją drugi raz,
 * co jest najczęstszym miejscem porzucania formularza.
 */

export const BUDGET_EVENT = "budget:changed";

/** Dopuszczalny zakres budżetu (spójny z suwakiem i walidacją). */
export const BUDGET_MIN = 50_000;
export const BUDGET_MAX = 3_000_000;

export function isBudgetInRange(value: number): boolean {
  return Number.isFinite(value) && value >= BUDGET_MIN && value <= BUDGET_MAX;
}

/** Wysyła budżet do formularza (nasłuchuje go LeadEngine). */
export function publishBudget(value: number): void {
  if (typeof window === "undefined" || !isBudgetInRange(value)) return;
  window.dispatchEvent(new CustomEvent(BUDGET_EVENT, { detail: Math.round(value) }));
}
