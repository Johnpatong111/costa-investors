"use client";

import { CheckCircle2, Clock, Mail, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { SUCCESS_COPY } from "@/lib/i18n/ui";
import { SITE } from "@/lib/seo/site";
import { formatEur } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface LeadSuccessProps {
  fullName: string;
  summary: string;
  budget: number;
  annualRent: number;
  locale: Locale;
  onReset: () => void;
  className?: string;
}

const STEP_ICONS = [Clock, Mail];

/**
 * Ekran potwierdzenia zgłoszenia.
 *
 * Uczciwy model lead-gen: pokazujemy wyłącznie dwa etapy, które faktycznie
 * realizujemy (weryfikacja zgłoszenia i kontakt agenta). Bez obietnic
 * dodatkowych usług, których portal nie świadczy. Jedynym kanałem kontaktu
 * jest e-mail, bez numeru telefonu.
 */
export function LeadSuccess({
  fullName,
  summary,
  budget,
  annualRent,
  locale,
  onReset,
  className,
}: LeadSuccessProps) {
  const copy = SUCCESS_COPY[locale] ?? SUCCESS_COPY.pl;
  const firstName = fullName.trim().split(" ")[0] ?? "";

  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200 bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 aria-hidden className="h-6 w-6 text-emerald-700" />
        </span>
        <div>
          <p className="text-lg font-bold text-brand-950">{copy.thanks(firstName)}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-700">{copy.body}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
        <p className="text-[11px] font-semibold tracking-wide text-brand-500 uppercase">
          {copy.summaryLabel}
        </p>
        <p className="mt-1 text-sm font-medium text-brand-900">{summary}</p>
        {budget > 0 ? (
          <p className="mt-1.5 text-xs text-brand-600">
            {copy.budgetLabel}: <strong>{formatEur(budget)}</strong>
            {annualRent > 0 ? (
              <>
                {" "}
                · {copy.rentLabel}: <strong>{formatEur(annualRent)}</strong>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <ol className="mt-5 space-y-3">
        {copy.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Mail;
          return (
            <li key={step.title} className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-900 text-white">
                <Icon aria-hidden className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-950">{step.title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-brand-600">
                  {step.description}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
        >
          <Mail aria-hidden className="h-4 w-4" />
          {copy.emailCta}: {SITE.email}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
        >
          <RotateCcw aria-hidden className="h-4 w-4" />
          {copy.reset}
        </button>
      </div>
    </div>
  );
}
