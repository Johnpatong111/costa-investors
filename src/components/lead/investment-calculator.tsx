"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Coins, Info, LineChart, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { estimateReturns, formatBudgetInput, type MarketRates } from "@/lib/leads/investment";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";
import { getCalcCopy } from "@/lib/i18n/analytics-copy";
import { formatEur, formatRate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface InvestmentCalculatorProps {
  rates: MarketRates;
  cityName: string;
  districtName?: string;
  budget: string;
  onBudgetChange: (value: string) => void;
  onRequestOffer: () => void;
}

/** Kalkulator ROI. Etykiety w języku strony (PL/EN/ES). */
export function InvestmentCalculator({
  rates,
  cityName,
  districtName,
  budget,
  onBudgetChange,
  onRequestOffer,
}: InvestmentCalculatorProps) {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const copy = getCalcCopy(locale);

  const budgetId = useId();
  const parsed = Number(budget.replace(/\D/g, "")) || 0;
  const result = estimateReturns(rates, parsed);
  const locationLabel = districtName ? `${districtName}, ${cityName}` : cityName;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
            <LineChart aria-hidden className="h-3.5 w-3.5" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-lg font-bold text-brand-950 sm:text-xl">
            {copy.title(locationLabel)}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-brand-600">
            {copy.yields(formatRate(rates.rentalYield), formatRate(rates.priceGrowth))}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100 ring-inset sm:inline">
          {copy.badge}
        </span>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-semibold tracking-wide text-brand-700 uppercase">
          {copy.budgetLegend}
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {copy.presets.map((preset) => {
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
          className="mb-1 block text-xs font-semibold tracking-wide text-brand-700 uppercase"
        >
          {copy.exactLabel}
        </label>
        <div className="relative">
          <Wallet
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id={budgetId}
            type="text"
            inputMode="numeric"
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value)}
            placeholder="250 000"
            className="h-11 w-full rounded-lg border border-brand-200 bg-white pr-12 pl-10 text-sm font-semibold text-brand-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            aria-describedby={`${budgetId}-hint`}
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-bold text-brand-500">
            €
          </span>
        </div>
        <p id={`${budgetId}-hint`} className="mt-1 text-[11px] text-brand-500">
          {copy.hint(result.areaM2, formatEur(result.purchaseCosts))}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-900 to-brand-800 p-4 text-white">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-brand-200 uppercase">
            <PiggyBank aria-hidden className="h-3 w-3" />
            {copy.rentLabel}
          </p>
          <p className="mt-1 text-xl leading-none font-bold tabular-nums sm:text-2xl">
            {parsed > 0 ? formatEur(result.annualRentGross) : "-"}
          </p>
          <p className="mt-1 text-[11px] text-brand-200">
            {copy.netLabel} {parsed > 0 ? formatEur(result.annualRentNet) : "-"}
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 p-4 text-white">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/80 uppercase">
            <TrendingUp aria-hidden className="h-3 w-3" />
            {copy.returnLabel}
          </p>
          <p className="mt-1 text-xl leading-none font-bold tabular-nums sm:text-2xl">
            {parsed > 0 ? formatEur(result.totalReturn5y) : "-"}
          </p>
          <p className="mt-1 text-[11px] text-white/80">
            {parsed > 0 ? copy.ofBudget(result.totalReturnPercent) : copy.provideBudget}
          </p>
        </div>
      </div>

      {parsed > 0 ? (
        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-[11px] text-brand-600">
          <Coins aria-hidden className="h-3.5 w-3.5 shrink-0 text-accent-600" />
          {copy.value5}: <strong>{formatEur(result.valueIn5Years)}</strong>
        </p>
      ) : null}

      <button
        type="button"
        onClick={onRequestOffer}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-accent-600 sm:px-5 sm:text-base"
      >
        {copy.cta}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>

      <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-brand-500">
        <Info aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
        {copy.disclaimer}
      </p>
    </div>
  );
}

