"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { CHECKLIST_COPY } from "@/lib/i18n/tool-copy";
import { cn } from "@/lib/utils/cn";

export interface PurchaseChecklistProps {
  locale: Locale;
  citySlug: string;
  cityName: string;
  ctaHref: string;
}

/**
 * Lista kontrolna zakupu. Postęp trzymany w localStorage pod kluczem miasta,
 * więc klient wraca na tę samą stronę i widzi swoje odhaczenia.
 * Domyślnie (SSR) lista jest pusta, więc crawler widzi pełną treść.
 */
export function PurchaseChecklist({ locale, citySlug, cityName, ctaHref }: PurchaseChecklistProps) {
  const copy = CHECKLIST_COPY[locale];
  const storageKey = `checklist:v1:${citySlug}`;
  const total = copy.items.length;
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setDone(parsed.filter((item): item is string => typeof item === "string"));
        }
      }
    } catch {
      // Prywatny tryb przeglądarki: lista działa bez zapisu.
    }
    setReady(true);
  }, [storageKey]);

  const toggle = (id: string) => {
    setDone((previous) => {
      const next = previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Brak dostępu do storage: postęp zostaje tylko w pamięci.
      }
      return next;
    });
  };

  const reset = () => {
    setDone([]);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Bez zapisu nie ma czego usuwać.
    }
  };

  const percent = total > 0 ? Math.round((done.length / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-wide text-accent-600 uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(cityName)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead}</p>
        </div>
        <div className="min-w-[180px]">
          <p className="text-right text-sm font-bold text-brand-950">
            {copy.progress(done.length, total)}
          </p>
          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-100"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={copy.progress(done.length, total)}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          {ready && done.length > 0 ? (
            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-500 hover:text-brand-800"
            >
              <RotateCcw aria-hidden className="h-3 w-3" />
              {copy.reset}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {copy.groups.map((group) => (
          <div key={group.id} className="rounded-xl border border-brand-100 bg-brand-50/40 p-4">
            <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
              {group.label}
            </p>
            <ul className="mt-3 space-y-2">
              {copy.items
                .filter((item) => item.group === group.id)
                .map((item) => {
                  const checked = done.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-pressed={checked}
                        className={cn(
                          "flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition",
                          checked ? "bg-emerald-50" : "hover:bg-white",
                        )}
                      >
                        {checked ? (
                          <CheckCircle2
                            aria-hidden
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                          />
                        ) : (
                          <Circle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                        )}
                        <span>
                          <span
                            className={cn(
                              "block text-sm font-semibold",
                              checked ? "text-emerald-800 line-through" : "text-brand-900",
                            )}
                          >
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-snug text-brand-600">
                            {item.hint}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-brand-500">{copy.note}</p>
      <Link
        href={ctaHref}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-800"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
