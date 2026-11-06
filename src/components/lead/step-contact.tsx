"use client";

import { Mail, MapPin, MessageCircle, Pencil, Phone, ShieldCheck, User } from "lucide-react";
import type { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { CONTACT_METHODS, type LeadFormValues } from "@/lib/leads/schema";
import { cn } from "@/lib/utils/cn";
import { FORM_COPY } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";
import { OptionTiles } from "./option-tiles";

const baseField =
  "h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-brand-950 outline-none transition-colors placeholder:text-brand-400";

function fieldClass(hasError: boolean) {
  return cn(
    baseField,
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-brand-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
  );
}

const CONTACT_ICONS = [Phone, MessageCircle, Mail];

export interface StepContactProps {
  locale: Locale;
  register: UseFormRegister<LeadFormValues>;
  control: Control<LeadFormValues>;
  errors: FieldErrors<LeadFormValues>;
  summary: string;
  onEdit: () => void;
  cityLocked: boolean;
}

/** Krok 2. Kontakt. Prosimy tylko o 2 pola obowiązkowe: imię i telefon. */
export function StepContact({
  locale,
  register,
  control,
  errors,
  summary,
  onEdit,
  cityLocked,
}: StepContactProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 rounded-xl border border-brand-100 bg-brand-50/70 px-3.5 py-2.5">
        <p className="text-xs leading-relaxed text-brand-700">{summary}</p>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-950"
        >
          <Pencil aria-hidden className="h-3 w-3" />
          Zmień
        </button>
      </div>

      <OptionTiles
        name="contactMethod"
        legend={FORM_COPY[locale].contactLegend}
        options={CONTACT_METHODS}
        icons={CONTACT_ICONS}
        register={register}
        control={control}
        columns={3}
        size="sm"
      />

      <div>
        <label htmlFor="fullName" className="mb-1 block text-xs font-semibold text-brand-700">
          Imię i nazwisko *
        </label>
        <div className="relative">
          <User
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id="fullName"
            autoComplete="name"
            placeholder="Jan Kowalski"
            className={fieldClass(Boolean(errors.fullName))}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </div>
        {errors.fullName ? (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.fullName.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-xs font-semibold text-brand-700">
          Telefon / WhatsApp *
        </label>
        <div className="relative">
          <Phone
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+48 600 123 456"
            className={fieldClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </div>
        {errors.phone ? (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.phone.message}</p>
        ) : (
          <p className="mt-1 text-[11px] text-brand-500">
            Numer PL lub międzynarodowy (8-15 cyfr). Dzwoni agent mówiący po polsku.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-semibold text-brand-700">
          E-mail{" "}
          <span className="font-normal text-brand-500">(opcjonalnie. Wyślemy analizę PDF)</span>
        </label>
        <div className="relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jan@example.com"
            className={fieldClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </div>
        {errors.email ? (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1 block text-xs font-semibold text-brand-700">
            Miejscowość *
          </label>
          <div className="relative">
            <MapPin
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
            />
            <input
              id="city"
              readOnly={cityLocked}
              className={cn(fieldClass(Boolean(errors.city)), cityLocked && "bg-brand-50/60")}
              aria-invalid={Boolean(errors.city)}
              {...register("city")}
            />
          </div>
          {errors.city ? (
            <p className="mt-1 text-xs font-medium text-red-600">{errors.city.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="district" className="mb-1 block text-xs font-semibold text-brand-700">
            Dzielnica / urbanizacja
          </label>
          <input
            id="district"
            readOnly={cityLocked}
            className={cn(
              "h-11 w-full rounded-lg border border-brand-200 bg-white px-3 text-sm text-brand-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
              cityLocked && "bg-brand-50/60",
            )}
            {...register("district")}
          />
        </div>
      </div>

      <details className="rounded-lg border border-brand-100 bg-brand-50/40 px-3.5 py-2.5">
        <summary className="cursor-pointer text-xs font-semibold text-brand-700">
          Dodaj szczegóły (opcjonalnie)
        </summary>
        <textarea
          rows={3}
          placeholder="Widok na morze, liczba sypialni, finansowanie, termin…"
          className="mt-2 w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          aria-label="Dodatkowe informacje"
          {...register("message")}
        />
      </details>

      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-brand-600">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 accent-brand-700"
          {...register("consent")}
        />
        <span>
          Wyrażam zgodę na kontakt telefoniczny, WhatsApp lub e-mail oraz na przekazanie moich
          danych partnerskiej agencji nieruchomości w Hiszpanii w celu przygotowania oferty
          zakupu. Administratorem danych jest operator serwisu. *
        </span>
      </label>
      {errors.consent ? (
        <p className="text-xs font-medium text-red-600">{errors.consent.message}</p>
      ) : null}

      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-brand-500">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 accent-brand-700"
          {...register("marketingConsent")}
        />
        <span>Chcę dostawać nowe oferty i analizy rynku w Hiszpanii (opcjonalnie).</span>
      </label>

      {/* Honeypot. Boty wypełniają ukryte pole, ludzie go nie widzą. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Strona internetowa</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-brand-500">
        <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-emerald-600" />
        Dane szyfrowane, nieodsprzedawane. Kontakt wyłącznie w sprawie zakupu.
      </p>
    </div>
  );
}
