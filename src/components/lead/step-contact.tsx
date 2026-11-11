"use client";

import { Mail, MapPin, MessageCircle, Pencil, Phone, ShieldCheck, User } from "lucide-react";
import type { FieldErrors, UseFormRegister, Control } from "react-hook-form";
import { CONTACT_METHODS, type LeadFormValues } from "@/lib/leads/schema";
import { FORM_FIELD_COPY, translateFieldError } from "@/lib/i18n/form-copy";
import { cn } from "@/lib/utils/cn";
import { getFormOptions } from "@/lib/i18n/form-options";
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

/** Step 2: contact. Only two required fields: name and phone. */
export function StepContact({
  locale,
  register,
  control,
  errors,
  summary,
  onEdit,
  cityLocked,
}: StepContactProps) {
  const copy = FORM_FIELD_COPY[locale];
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
          {copy.edit}
        </button>
      </div>

      <OptionTiles
        name="contactMethod"
        legend={getFormOptions(locale).labels.contactMethod}
        options={getFormOptions(locale).contactMethods}
        icons={CONTACT_ICONS}
        register={register}
        control={control}
        columns={3}
        size="sm"
      />

      <div>
        <label htmlFor="fullName" className="mb-1 block text-xs font-semibold text-brand-700">
          {copy.fullName} *
        </label>
        <div className="relative">
          <User
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          />
          <input
            id="fullName"
            autoComplete="name"
            placeholder={copy.fullNamePlaceholder}
            className={fieldClass(Boolean(errors.fullName))}
            aria-invalid={Boolean(errors.fullName)}
            aria-required="true"
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
        </div>
        {errors.fullName ? (
          <p id="fullName-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
            {translateFieldError(errors.fullName.message, locale)}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-xs font-semibold text-brand-700">
          {copy.phone} *
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
            placeholder={copy.phonePlaceholder}
            className={fieldClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-required="true"
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            {...register("phone")}
          />
        </div>
        {errors.phone ? (
          <p id="phone-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
            {translateFieldError(errors.phone.message, locale)}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1 text-[11px] text-brand-500">
            {copy.phoneHint}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-semibold text-brand-700">
          {copy.email}{" "}
          <span className="font-normal text-brand-500">{copy.emailOptional}</span>
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
            placeholder={copy.emailPlaceholder}
            className={fieldClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </div>
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
            {translateFieldError(errors.email.message, locale)}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1 block text-xs font-semibold text-brand-700">
            {copy.city} *
          </label>
          <div className="relative">
            <MapPin
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
            />
            <input
              id="city"
              autoComplete="address-level2"
              readOnly={cityLocked}
              className={cn(fieldClass(Boolean(errors.city)), cityLocked && "bg-brand-50/60")}
              aria-invalid={Boolean(errors.city)}
              aria-required="true"
              aria-describedby={errors.city ? "city-error" : undefined}
              {...register("city")}
            />
          </div>
          {errors.city ? (
            <p id="city-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {translateFieldError(errors.city.message, locale)}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="district" className="mb-1 block text-xs font-semibold text-brand-700">
            {copy.district}
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
          {copy.detailsToggle}
        </summary>
        <textarea
          rows={3}
          placeholder={copy.messagePlaceholder}
          className="mt-2 w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          aria-label={copy.messageAria}
          {...register("message")}
        />
      </details>

      <label className="flex min-h-[44px] items-start gap-2 py-1 text-[11px] leading-relaxed text-brand-600">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 accent-brand-700"
          aria-required="true"
          aria-describedby={errors.consent ? "consent-error" : undefined}
          {...register("consent")}
        />
        <span>{copy.consent} *</span>
      </label>
      {errors.consent ? (
        <p id="consent-error" role="alert" className="text-xs font-medium text-red-600">
          {translateFieldError(errors.consent.message, locale)}
        </p>
      ) : null}

      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-brand-500">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 accent-brand-700"
          {...register("marketingConsent")}
        />
        <span>{copy.marketing}</span>
      </label>

      {/* Honeypot: bots fill the hidden field, humans never see it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">{copy.honeypotLabel}</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-brand-500">
        <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-emerald-600" />
        {copy.privacyNote}
      </p>
    </div>
  );
}
