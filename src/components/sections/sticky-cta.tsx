"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUiCopy } from "@/lib/i18n/ui";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Sticky CTA na mobile. Pasek prowadzi wyłącznie do formularza (bez telefonu).
 * Język etykiet wynika z prefiksu ścieżki, więc działa też w komponentach
 * klienckich bez przekazywania propsów przez całe drzewo.
 */
export function StickyCta({ targetId = "lead-form" }: { targetId?: string }) {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const ui = getUiCopy(locale);

  // Pasek chowamy, gdy formularz leadowy jest na ekranie. Inaczej zasłaniał
  // przycisk „Wyślij zgłoszenie” (pasek formularza jest sticky na mobile),
  // co realnie blokowało wysłanie leada.
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll("[data-lead-form]"));
    if (forms.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => setFormVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.15 },
    );
    forms.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (formVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`#${targetId}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-3 text-sm font-bold text-brand-900"
        >
          <span aria-hidden>☰</span> {ui.stickyPreferences}
        </a>
        <a
          href={`#${targetId}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white"
        >
          {ui.stickyOffers}
        </a>
      </div>
      {/* Zapas miejsca, żeby pasek nie zasłaniał stopki. */}
      <div aria-hidden className="h-0" />
    </div>
  );
}

