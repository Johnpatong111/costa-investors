"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import {
  GOALS,
  HORIZONS,
  PROPERTY_TYPES,
  REGIONS,
  REQUIREMENTS,
  defaultLeadValues,
  formatPhone,
  leadFormSchema,
  type LeadFormValues,
  type LeadLanguage,
} from "@/lib/leads/schema";
import type { ReturnEstimate } from "@/lib/leads/investment";
import { FORM_COPY } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils/cn";
import { LeadSuccess } from "./lead-success";
import { StepConfig } from "./step-config";
import { StepContact } from "./step-contact";

type Status = "idle" | "sending" | "success" | "error";

const STEP_ONE_FIELDS = ["goal", "propertyType", "horizon", "budget"] as const;

const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export interface MultiStepLeadFormProps {
  cityName: string;
  districtName?: string;
  sourceKey: string;
  /** Język wersji strony. Trafia do leada i decyduje o agencie. */
  language?: LeadLanguage;
  /** Budżet współdzielony z kalkulatorem ROI. */
  budget: string;
  onBudgetChange: (value: string) => void;
  /** Wynik kalkulatora. Trafia do leada jako prognoza dochodu. */
  estimate?: ReturnEstimate | null;
  className?: string;
  heading?: string;
  subheading?: string;
}

/**
 * ===========================================================================
 * DWUETAPOWY FORMULARZ - POLSKI INWESTOR NA COSTA BLANCA
 * ===========================================================================
 * Krok 1: cel zakupu, typ nieruchomości, horyzont, budżet (decyzje).
 * Krok 2: imię, telefon PL/EU, e-mail, preferowany kanał kontaktu.
 *
 * Numer telefonu pojawia się dopiero po „zainwestowaniu” decyzji -
 * standardowy mechanizm mikro-zobowiązań w high-ticket lead gen.
 */
export function MultiStepLeadForm({
  cityName,
  districtName,
  sourceKey,
  language = "pl",
  budget,
  onBudgetChange,
  estimate,
  className,
  heading = "Znajdź nieruchomości i odbierz analizę ROI",
  subheading = "Wypełnij 4 krótkie pytania. W ciągu 15 minut prześlemy spersonalizowany zestaw wyselekcjonowanych ofert.",
}: MultiStepLeadFormProps) {
  const formCopy = FORM_COPY[language];
  const [step, setStep] = useState<0 | 1>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [budgetError, setBudgetError] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState<{ fullName: string; phone: string } | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      ...defaultLeadValues,
      city: cityName,
      district: districtName ?? "",
      budget,
    },
  });

  const { register, control, handleSubmit, trigger, setValue, setError, reset, formState } = form;
  const values = useWatch({ control });

  useEffect(() => {
    setValue("budget", budget);
    setBudgetError(undefined);
  }, [budget, setValue]);

  const summary = useMemo(() => {
    const parts = [
      labelOf(GOALS, String(values.goal ?? "inwestycja-najem")),
      labelOf(PROPERTY_TYPES, String(values.propertyType ?? "apartament")),
      labelOf(HORIZONS, String(values.horizon ?? "1-3-miesiace")),
      budget ? `${budget} €` : null,
      [values.city, values.district].filter(Boolean).join(" / "),
    ].filter(Boolean);

    // Regiony i wymogi są opcjonalne. Dokładamy je do podsumowania tylko,
    // gdy użytkownik faktycznie coś zaznaczył.
    const selectedRegions = Array.isArray(values.regions) ? (values.regions as string[]) : [];
    if (selectedRegions.length > 0) {
      parts.push(selectedRegions.map((value) => labelOf(REGIONS, value)).join(", "));
    }

    const selectedRequirements = Array.isArray(values.requirements)
      ? (values.requirements as string[])
      : [];
    if (selectedRequirements.length > 0) {
      parts.push(selectedRequirements.map((value) => labelOf(REQUIREMENTS, value)).join(", "));
    }

    return parts.join(" · ");
  }, [values, budget]);

  const goNext = async () => {
    const budgetCheck = leadFormSchema.shape.budget.safeParse(budget);
    setBudgetError(budgetCheck.success ? undefined : budgetCheck.error.issues[0]?.message);
    setValue("budget", budget);

    const valid = await trigger([...STEP_ONE_FIELDS]);
    if (!valid || !budgetCheck.success) return;
    setStep(1);
  };

  const onSubmit = handleSubmit(async (formValues) => {
    setStatus("sending");
    setServerError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          budget: formValues.budget,
          roiEstimate: estimate?.annualRentGross,
          language,
          source: sourceKey,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string; details?: { field: string; message: string }[] }
          | null;

        let backToFirstStep = false;
        for (const detail of data?.details ?? []) {
          const field = detail.field as keyof LeadFormValues;
          if (!(field in defaultLeadValues)) continue;
          setError(field, { message: detail.message });
          if ((STEP_ONE_FIELDS as readonly string[]).includes(field)) backToFirstStep = true;
        }
        if (backToFirstStep) setStep(0);

        setServerError(
          data?.error ?? "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.",
        );
        setStatus("error");
        return;
      }

      setSubmitted({ fullName: formValues.fullName, phone: formatPhone(formValues.phone) });
      setStatus("success");

      window.dispatchEvent(
        new CustomEvent("lead:submitted", {
          detail: {
            source: sourceKey,
            budget: Number(formValues.budget.replace(/\D/g, "")),
            horizon: formValues.horizon,
            goal: formValues.goal,
            step: 2,
          },
        }),
      );
    } catch {
      setServerError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
      setStatus("error");
    }
  });

  const handleReset = () => {
    reset({ ...defaultLeadValues, city: cityName, district: districtName ?? "", budget });
    setSubmitted(null);
    setStatus("idle");
    setStep(0);
  };

  if (status === "success" && submitted) {
    return (
      <LeadSuccess
        fullName={submitted.fullName}
        locale={language}
        summary={summary}
        budget={Number(budget.replace(/\D/g, "")) || 0}
        annualRent={estimate?.annualRentGross ?? 0}
        onReset={handleReset}
        className={className}
      />
    );
  }

  const progress = step === 0 ? 50 : 100;

  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-100 bg-white p-5 shadow-card sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-brand-950">{heading}</h2>
          <p className="mt-1 text-xs leading-relaxed text-brand-600">{subheading}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-50 px-2.5 py-1 text-[11px] font-bold text-accent-700">
          {formCopy.stepLabel(step + 1)}
        </span>
      </div>

      <div className="mt-4">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Postęp formularza"
        >
          <div
            className="h-full rounded-full bg-accent-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1.5 text-brand-900">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-900 text-[9px] text-white">
              {step === 0 ? "1" : <Check aria-hidden className="h-2.5 w-2.5" />}
            </span>
            {formCopy.stepOne}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5",
              step === 1 ? "text-brand-900" : "text-brand-400",
            )}
          >
            <span
              className={cn(
                "grid h-4 w-4 place-items-center rounded-full text-[9px]",
                step === 1 ? "bg-brand-900 text-white" : "bg-brand-100 text-brand-500",
              )}
            >
              2
            </span>
            {formCopy.stepTwo}
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-5" aria-busy={status === "sending"}>
        {step === 0 ? (
          <StepConfig
            locale={language}
            register={register}
            control={control}
            errors={formState.errors}
            budget={budget}
            onBudgetChange={onBudgetChange}
            budgetError={budgetError}
          />
        ) : (
          <StepContact
            locale={language}
            register={register}
            control={control}
            errors={formState.errors}
            summary={summary}
            onEdit={() => setStep(0)}
            cityLocked={Boolean(districtName)}
          />
        )}

        {serverError ? (
          <p
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
          >
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {serverError}
          </p>
        ) : null}

        <div className="mt-5 flex items-center gap-2">
          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              disabled={status === "sending"}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-brand-200 px-4 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 disabled:opacity-60"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Wstecz
            </button>
          ) : null}

          {step === 0 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 text-base font-bold text-white shadow-card transition-colors hover:bg-accent-600"
            >
              Przejdź do odbioru ofert (Krok 2/2)
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 text-base font-bold text-white shadow-card transition-colors hover:bg-accent-600 disabled:cursor-wait disabled:opacity-80"
            >
              {status === "sending" ? (
                <>
                  <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                  Wysyłanie…
                </>
              ) : (
                <>
                  Wyślij i odbierz ofertę
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>

        <p className="mt-3 flex items-start justify-center gap-1.5 text-[11px] leading-relaxed text-brand-500">
          <ShieldCheck aria-hidden className="mt-px h-3.5 w-3.5 shrink-0 text-accent-600" />
          <span>
            Bez prowizji od kupującego · weryfikacja prawna abogado i NIE · dane nie są
            odsprzedawane
          </span>
        </p>
      </form>
    </div>
  );
}
