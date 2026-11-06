"use client";

import { useId } from "react";
import { ArrowRight, Coins, Info, LineChart, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import {
  BUDGET_PRESETS,
  estimateReturns,
  formatBudgetInput,
  type MarketRates,
} from "@/lib/leads/investment";
import { formatEur } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface InvestmentCalculatorProps {
  rates: MarketRates;
  cityName: string;
  districtName?: string;
  /** Budżet jako string (spacje tysięczne). Wspólny stan z formularzem. */
  budget: string;
  onBudgetChange: (value: string) => void;
  onRequestOffer: () => void;
}

/**
 * Kalkulator budżetu i ROI (Costa Blanca).
 * Użytkownik wybiera budżet w EUR, a wynik liczy się natychmiast:
 * czynsz roczny, zwrot 5-letni i prognozowana wartość nieruchomości.
 */
export function InvestmentCalculator({
  rates,
  cityName,
  districtName,
  budget,
  onBudgetChange,
  onRequestOffer,
}: InvestmentCalculatorProps) {
  const budgetId = useId();
  const parsed = Number(budget.replace(/\D/g, "")) || 0;
  const result = estimateReturns(rates, parsed);
  const locationLabel = districtName ? `${districtName}, ${cityName}` : cityName;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent-600">
            <LineChart aria-hidden className="h-3.5 w-3.5" />
            Kalkulator ROI
          </p>
          <h2 className="mt-1 text-xl font-bold text-brand-950">
            Ile zarobisz w {locationLabel}?
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-brand-600">
            ROI brutto <strong>{rates.rentalYield.toFixed(1).replace(".", ",")}%</strong> · wzrost{" "}
            <strong>{rates.priceGrowth.toFixed(1).replace(".", ",")}% r/r</strong>
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100 ring-inset sm:inline">
          bez zobowiązań
        </span>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Budżet inwestycji
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {BUDGET_PRESETS.map((preset: (typeof BUDGET_PRESETS)[number]) => {
            const selected = parsed === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onBudgetChange(formatBudgetInput(preset.value))}
                aria-pressed={selected}
                className={cn(
                  "group rounded-xl border px-3 py-2.5 text-left transition-all",
                  selected
                    ? "border-brand-600 bg-brand-50 shadow-sm"
                    : "border-brand-200 bg-white hover:border-brand-400 hover:shadow-sm",
                )}
              >
                <span className="block text-[13px] font-bold text-brand-900">{preset.label}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-brand-500">
                  {preset.hint}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4">
        <label
          htmlFor={budgetId}
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-700"
        >
          Dokładna kwota (EUR)
        </label>
        <div className="relative">
          <Wallet
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id={budgetId}
            type="text"
            inputMode="numeric"
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value)}
            placeholder="250 000"
            className="h-11 w-full rounded-lg border border-brand-200 bg-white pl-10 pr-12 text-sm font-semibold text-brand-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            aria-describedby={`${budgetId}-hint`}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-500">
            €
          </span>
        </div>
        <p id={`${budgetId}-hint`} className="mt-1 text-[11px] text-brand-500">
          Za tę kwotę kupisz ok. {result.areaM2} m² · koszty zakupu (ok. 13,5%):{" "}
          {formatEur(result.purchaseCosts)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-200">
            <PiggyBank aria-hidden className="h-3 w-3" />
            Czynsz rocznie
          </p>
          <p className="mt-1 text-2xl font-bold leading-none tabular-nums">
            {parsed > 0 ? formatEur(result.annualRentGross) : "-"}
          </p>
          <p className="mt-1 text-[11px] text-brand-200">
            netto ok. {parsed > 0 ? formatEur(result.annualRentNet) : "-"}
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 p-4 text-white">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/80">
            <TrendingUp aria-hidden className="h-3 w-3" />
            Zwrot 5 lat
          </p>
          <p className="mt-1 text-2xl font-bold leading-none tabular-nums">
            {parsed > 0 ? formatEur(result.totalReturn5y) : "-"}
          </p>
          <p className="mt-1 text-[11px] text-white/80">
            {parsed > 0 ? `${result.totalReturnPercent}% budżetu` : "podaj budżet"}
          </p>
        </div>
      </div>

      {parsed > 0 ? (
        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-[11px] text-brand-600">
          <Coins aria-hidden className="h-3.5 w-3.5 shrink-0 text-accent-600" />
          Prognozowana wartość po 5 latach: <strong>{formatEur(result.valueIn5Years)}</strong>
        </p>
      ) : null}

      <button
        type="button"
        onClick={onRequestOffer}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-base font-bold text-white shadow-card transition-colors hover:bg-accent-600"
      >
        Chcę ofertę dla tego budżetu
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>

      <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-brand-500">
        <Info aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
        Model szacunkowy na podstawie median rynkowych. Nie stanowi gwarancji zwrotu ani oferty
        inwestycyjnej.
      </p>
    </div>
  );
}
