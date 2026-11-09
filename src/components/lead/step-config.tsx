"use client";

import {
  BadgeCheck,
  Building2,
  CalendarClock,
  Clock,
  Crown,
  Eye,
  Hotel,
  House,
  MapPin,
  MessageCircle,
  Palmtree,
  Search,
  TrendingUp,
  Umbrella,
  Waves,
  Zap,
} from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FORM_FIELD_COPY, translateFieldError } from "@/lib/i18n/form-copy";
import {
  GOALS,
  HORIZONS,
  PROPERTY_TYPES,
  REGIONS,
  REQUIREMENTS,
  type LeadFormValues,
} from "@/lib/leads/schema";
import { BUDGET_PRESETS, formatBudgetInput, parseBudget } from "@/lib/leads/investment";
import { cn } from "@/lib/utils/cn";
import { getFormOptions } from "@/lib/i18n/form-options";
import type { Locale } from "@/lib/i18n/config";
import { OptionChecklist, OptionTiles } from "./option-tiles";

const GOAL_ICONS = [TrendingUp, Palmtree, House];
const PROPERTY_ICONS = [Building2, House, Hotel, Crown];
const HORIZON_ICONS = [Zap, CalendarClock, Clock, Search];
const REGION_ICONS = [Palmtree, MapPin, Waves, MessageCircle];
const REQUIREMENT_ICONS = [Umbrella, Eye, BadgeCheck, Building2];

/** Widełki suwaka budżetu (EUR). Górna wartość = „1 mln € i więcej". */
const BUDGET_MIN = 100_000;
const BUDGET_MAX = 1_000_000;
const BUDGET_STEP = 25_000;
const BUDGET_DEFAULT = 250_000;

export interface StepConfigProps {
  locale: Locale;
  register: UseFormRegister<LeadFormValues>;
  control: Control<LeadFormValues>;
  errors: FieldErrors<LeadFormValues>;
  /** Budżet jest kontrolowany przez rodzica (wspólny z kalkulatorem). */
  budget: string;
  onBudgetChange: (value: string) => void;
  budgetError?: string;
}

/**
 * Krok 1. Decyzje inwestycyjne: cel, typ, horyzont, region, wymagania, budżet.
 * Wyłącznie szybkie wybory i jeden suwak. Zero pól tekstowych wymagających
 * pisania na telefonie, co utrzymuje wysoki completion rate.
 */
export function StepConfig({
  locale,
  register,
  control,
  errors,
  budget,
  onBudgetChange,
  budgetError,
}: StepConfigProps) {
  const copy = FORM_FIELD_COPY[locale];
  const budgetValue = parseBudget(budget) || BUDGET_DEFAULT;
  const sliderValue = Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, budgetValue));
  const hasBudgetError = Boolean(budgetError || errors.budget);
  const formOptions = getFormOptions(locale);

  return (
    <div className="space-y-5">
      <OptionTiles
        name="goal"
        legend={formOptions.labels.goal}
        options={formOptions.goals}
        icons={GOAL_ICONS}
        register={register}
        control={control}
        columns={3}
        size="sm"
      />

      {/* Typ nieruchomości: 2 kolumny zamiast 4. Dłuższe etykiety („Penthouse")
          dostają pełną szerokość i nie nachodzą na ikonę wyboru. */}
      <OptionTiles
        name="propertyType"
        legend={formOptions.labels.propertyType}
        options={formOptions.propertyTypes}
        icons={PROPERTY_ICONS}
        register={register}
        control={control}
        columns={2}
        size="sm"
      />

      <OptionTiles
        name="horizon"
        legend={formOptions.labels.horizon}
        options={formOptions.horizons}
        icons={HORIZON_ICONS}
        register={register}
        control={control}
        columns={2}
        size="sm"
      />

      <OptionChecklist
        name="regions"
        legend={formOptions.labels.regions}
        hint={formOptions.labels.regionsHint}
        options={formOptions.regions}
        icons={REGION_ICONS}
        register={register}
        control={control}
        columns={2}
        size="sm"
      />

      {/* Wymogi są opcjonalne, więc domyślnie schowane — na mobile skracają
          formularz o całą sekcję. Stan pól pozostaje w react-hook-form. */}
      <details className="group rounded-xl border border-brand-100 bg-brand-50/50 px-3.5 py-2.5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-semibold text-brand-800">
          <span>{copy.extraToggle}</span>
          <span aria-hidden className="text-brand-500 transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <p className="mt-1 text-[11px] text-brand-500">{copy.extraHint}</p>
        <div className="mt-3">
          <OptionChecklist
            name="requirements"
            legend={formOptions.labels.requirements}
            hint={formOptions.labels.requirementsHint}
            options={formOptions.requirements}
            icons={REQUIREMENT_ICONS}
            register={register}
            control={control}
            columns={2}
            size="sm"
          />
        </div>
      </details>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <label
            htmlFor="budget"
            className="block text-xs font-semibold tracking-wide text-brand-700 uppercase"
          >
            {formOptions.labels.budget}
          </label>
          <span className="text-xs font-semibold text-brand-500">
            {sliderValue >= BUDGET_MAX ? "1 000 000 € +" : `${formatBudgetInput(sliderValue)} €`}
          </span>
        </div>

        <div className="relative">
          <input
            id="budget"
            type="text"
            inputMode="numeric"
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value)}
            placeholder={copy.budgetPlaceholder}
            aria-invalid={hasBudgetError}
            aria-describedby={hasBudgetError ? "budget-error" : undefined}
            className={cn(
              "h-11 w-full rounded-lg border bg-white px-3 pr-10 text-center text-base font-semibold text-brand-950 outline-none transition-colors",
              hasBudgetError
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-brand-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
            )}
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-bold text-brand-500">
            €
          </span>
        </div>
        {hasBudgetError ? (
          <p id="budget-error" className="mt-1 text-xs font-medium text-red-600">
            {translateFieldError(budgetError ?? errors.budget?.message, locale)}
          </p>
        ) : null}

        {/* Suwak zsynchronizowany z polem tekstowym. Po kliknięciu presetu użytkownik
            widzi natychmiast, gdzie w widełkach 100 tys.: 1 mln € wylądował. */}
        <div className="mt-3">
          <input
            id="budget-range"
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={BUDGET_STEP}
            value={sliderValue}
            onChange={(event) => onBudgetChange(formatBudgetInput(Number(event.target.value)))}
            aria-label={copy.budgetAria}
            aria-valuetext={
              sliderValue >= BUDGET_MAX
                ? copy.budgetMax
                : `${formatBudgetInput(sliderValue)} euro`
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-700"
          />
          <div className="mt-1 flex justify-between text-[10px] font-medium text-brand-500">
            <span>100 tys. €</span>
            <span>1 mln € +</span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {BUDGET_PRESETS.map((preset: (typeof BUDGET_PRESETS)[number]) => {
            const selected = sliderValue === preset.value;
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
