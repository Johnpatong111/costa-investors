"use client";

import {
  Building2,
  CalendarClock,
  Crown,
  Hotel,
  House,
  Palmtree,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { GOALS, HORIZONS, PROPERTY_TYPES, type LeadFormValues } from "@/lib/leads/schema";
import { BUDGET_PRESETS, formatBudgetInput } from "@/lib/leads/investment";
import { cn } from "@/lib/utils/cn";
import { OptionTiles } from "./option-tiles";

const GOAL_ICONS = [TrendingUp, Palmtree, House];
const PROPERTY_ICONS = [Building2, House, Hotel, Crown];
const HORIZON_ICONS = [Zap, CalendarClock, Search];

export interface StepConfigProps {
  register: UseFormRegister<LeadFormValues>;
  control: Control<LeadFormValues>;
  errors: FieldErrors<LeadFormValues>;
  /** Budżet jest kontrolowany przez rodzica (wspólny z kalkulatorem). */
  budget: string;
  onBudgetChange: (value: string) => void;
  budgetError?: string;
}

/**
 * Krok 1 – decyzje inwestycyjne (cel, typ, horyzont, budżet).
 * Cztery szybkie wybory, zero pól tekstowych poza kwotą.
 */
export function StepConfig({
  register,
  control,
  errors,
  budget,
  onBudgetChange,
  budgetError,
}: StepConfigProps) {
  return (
    <div className="space-y-5">
      <OptionTiles
        name="goal"
        legend="Cel zakupu"
        options={GOALS}
        icons={GOAL_ICONS}
        register={register}
        control={control}
        columns={3}
        size="sm"
      />

      <OptionTiles
        name="propertyType"
        legend="Typ nieruchomości"
        options={PROPERTY_TYPES}
        icons={PROPERTY_ICONS}
        register={register}
        control={control}
        columns={4}
        size="sm"
      />

      <OptionTiles
        name="horizon"
        legend="Kiedy kupujesz?"
        options={HORIZONS}
        icons={HORIZON_ICONS}
        register={register}
        control={control}
        columns={3}
        size="sm"
      />

      <div>
        <label
          htmlFor="budget"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-brand-700"
        >
          Budżet (EUR)
        </label>
        <div className="relative">
          <input
            id="budget"
            type="text"
            inputMode="numeric"
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value)}
            placeholder="250 000"
            aria-invalid={Boolean(budgetError || errors.budget)}
            aria-describedby={budgetError ? "budget-error" : undefined}
            className={cn(
              "h-11 w-full rounded-lg border bg-white px-3 pr-10 text-center text-base font-semibold text-brand-950 outline-none transition-colors",
              budgetError || errors.budget
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-brand-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
            )}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-500">
            €
          </span>
        </div>
        {budgetError || errors.budget ? (
          <p id="budget-error" className="mt-1 text-xs font-medium text-red-600">
            {budgetError ?? errors.budget?.message}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {BUDGET_PRESETS.map((preset: (typeof BUDGET_PRESETS)[number]) => {
            const selected = budget === formatBudgetInput(preset.value);
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onBudgetChange(formatBudgetInput(preset.value))}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
                  selected
                    ? "border-brand-600 bg-brand-50 text-brand-900"
                    : "border-brand-200 text-brand-600 hover:border-brand-400 hover:text-brand-900",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
