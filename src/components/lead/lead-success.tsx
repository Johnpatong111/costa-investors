"use client";

import { CalendarCheck, CheckCircle2, Clock, FileText, Phone, RotateCcw } from "lucide-react";
import { SITE } from "@/lib/seo/site";
import { formatEur } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface LeadSuccessProps {
  fullName: string;
  phone: string;
  summary: string;
  budget: number;
  annualRent: number;
  onReset: () => void;
  className?: string;
}

const NEXT_STEPS = [
  {
    icon: Phone,
    title: "Weryfikacja w 30 minut",
    description:
      "Sprawdzamy budżet i preferencje, dobieramy agenta z ofertami w wybranej miejscowości.",
  },
  {
    icon: FileText,
    title: "Kontakt agenta w 24 h",
    description:
      "Polskojęzyczny agent dzwoni lub pisze na WhatsApp z 3-5 dopasowanymi ofertami.",
  },
  {
    icon: CalendarCheck,
    title: "Oględziny i analiza prawna",
    description: "Wideo-oględziny lub wizyta na miejscu, potem weryfikacja Nota Simple.",
  },
];

/** Thank You Screen. Potwierdzenie + status przekazania leada do agencji. */
export function LeadSuccess({
  fullName,
  phone,
  summary,
  budget,
  annualRent,
  onReset,
  className,
}: LeadSuccessProps) {
  const firstName = fullName.trim().split(" ")[0] || "witaj";

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
          <p className="text-lg font-bold text-brand-950">Dziękujemy, {firstName}!</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-700">
            Zgłoszenie przekazaliśmy do partnerskiej agencji nieruchomości w Hiszpanii.
            Certyfikowany agent skontaktuje się z Tobą na{" "}
            <strong className="whitespace-nowrap">{phone}</strong> w ciągu 24 godzin
            (9:00-20:00 CET).
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-500">
          Podsumowanie zgłoszenia
        </p>
        <p className="mt-1 text-sm font-medium text-brand-900">{summary}</p>
        {budget > 0 ? (
          <p className="mt-1.5 text-xs text-brand-600">
            Budżet: <strong>{formatEur(budget)}</strong>
            {annualRent > 0 ? (
              <>
                {" "}
                · prognozowany czynsz: <strong>{formatEur(annualRent)}/rok</strong>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <ol className="mt-5 space-y-3">
        {NEXT_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="flex items-start gap-3">
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-900 text-white">
                <Icon aria-hidden className="h-4 w-4" />
                {index < NEXT_STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-8 h-3 w-px -translate-x-1/2 bg-brand-200"
                  />
                ) : null}
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-950">{step.title}</span>
                <span className="block text-xs leading-relaxed text-brand-600">
                  {step.description}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={`tel:${SITE.phoneHref}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
        >
          <Phone aria-hidden className="h-4 w-4" />
          Zadzwoń teraz: {SITE.phone}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
        >
          <RotateCcw aria-hidden className="h-4 w-4" />
          Nowe zgłoszenie
        </button>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-brand-500">
        <Clock aria-hidden className="h-3 w-3" />
        Średni czas pierwszego kontaktu: 12 minut (ostatnie 30 dni).
      </p>
    </div>
  );
}
