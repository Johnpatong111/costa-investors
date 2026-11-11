"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BUDGET_EVENT, isBudgetInRange } from "@/lib/tools/budget-bus";
import { estimateReturns, type MarketRates } from "@/lib/leads/investment";
import { InvestmentCalculator } from "./investment-calculator";
import { MultiStepLeadForm } from "./multi-step-lead-form";

export interface LeadEngineProps {
  cityName: string;
  districtName?: string;
  /** Klucz strony pSEO, np. "apartamenty-na-sprzedaz/torrevieja/la-mata". */
  sourceKey: string;
  /** Język wersji strony (domyślnie PL). Trafia do leada i routingu agenta. */
  language?: "pl" | "en" | "es";
  /**
   * Dane rynku do kalkulatora ROI. Brak = kalkulator ukryty
   * (strony bez konkretnej lokalizacji).
   */
  rates?: MarketRates;
  hideCalculator?: boolean;
  defaultBudget?: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

/**
 * ===========================================================================
 * LEAD ENGINE. Jeden stan budżetu, dwa komponenty
 * ===========================================================================
 * Budżet wybrany w kalkulatorze ROI trafia do formularza (krok 1) i do
 * payloadu leada. Dzięki temu agent od razu wie, o jakiej transakcji rozmawia,
 * a scoring może nadać priorytet bez dodatkowych pytań.
 */
export function LeadEngine({
  cityName,
  districtName,
  sourceKey,
  language = "pl",
  rates,
  hideCalculator = false,
  defaultBudget = "250 000",
  heading,
  subheading,
  className,
}: LeadEngineProps) {
  const [budget, setBudget] = useState(defaultBudget);
  const formRef = useRef<HTMLDivElement>(null);

  // Budżet z linku (np. z rankingu: ?budzet=250000) wchodzi od razu do
  // formularza i kalkulatora, więc użytkownik nie wpisuje go dwa razy.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("budzet");
    const value = Number(raw);
    if (!isBudgetInRange(value)) return;
    setBudget(String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  }, []);

  // Budżet z narzędzi (workbench, koszty, stress) trafia do formularza na żywo.
  useEffect(() => {
    const handler = (event: Event) => {
      const value = Number((event as CustomEvent<number>).detail);
      if (!isBudgetInRange(value)) return;
      setBudget(String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    };
    window.addEventListener(BUDGET_EVENT, handler);
    return () => window.removeEventListener(BUDGET_EVENT, handler);
  }, []);

  const estimate = useMemo(() => {
    if (!rates) return null;
    const parsed = Number(budget.replace(/\D/g, "")) || 0;
    return estimateReturns(rates, parsed);
  }, [rates, budget]);

  const showCalculator = Boolean(rates) && !hideCalculator;

  return (
    <div className={className}>
      {showCalculator && rates ? (
        <InvestmentCalculator
          rates={rates}
          cityName={cityName}
          districtName={districtName}
          budget={budget}
          onBudgetChange={setBudget}
          onRequestOffer={() =>
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        />
      ) : null}

      <div ref={formRef} className={showCalculator ? "mt-4 scroll-mt-24" : "scroll-mt-24"}>
        <MultiStepLeadForm
          cityName={cityName}
          districtName={districtName}
          sourceKey={sourceKey}
          language={language}
          budget={budget}
          onBudgetChange={setBudget}
          estimate={estimate}
          heading={heading}
          subheading={subheading}
        />
      </div>
    </div>
  );
}
