"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { TOOLS_COPY } from "@/lib/i18n/tool-copy";
import { cn } from "@/lib/utils/cn";

export interface ToolTabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface ToolTabsProps {
  locale: Locale;
  placeName: string;
  tabs: ToolTabItem[];
  ctaHref: string;
}

/**
 * Jeden obszar narzędzi zamiast trzech kalkulatorów jeden pod drugim.
 * Wszystkie panele są w HTML (ukryte atrybutem `hidden`), więc crawler widzi
 * pełną treść, a użytkownik widzi tylko ten kalkulator, którego potrzebuje.
 */
export function ToolTabs({ locale, placeName, tabs, ctaHref }: ToolTabsProps) {
  const copy = TOOLS_COPY[locale];
  const baseId = useId();
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === active);
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : tabs.length - 1;
    const target = tabs[next];
    if (!target) return;
    setActive(target.id);
    buttonsRef.current[next]?.focus();
  };

  return (
    <div>
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
          <Calculator aria-hidden className="h-3.5 w-3.5" />
          {copy.eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(placeName)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead}</p>
      </div>

      <div
        role="tablist"
        aria-label={copy.tabListLabel}
        onKeyDown={onKeyDown}
        className="mt-4 flex gap-2 overflow-x-auto pb-1"
      >
        {tabs.map((tab, index) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                buttonsRef.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                selected
                  ? "border-brand-950 bg-brand-950 text-white"
                  : "border-brand-200 bg-white text-brand-700 hover:border-brand-400",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={active !== tab.id}
          className="mt-3"
        >
          {tab.content}
        </div>
      ))}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-950 px-4 py-3 text-white">
        <p className="max-w-xl text-xs leading-relaxed text-brand-100">{copy.ctaTitle}</p>
        <Link
          href={ctaHref}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-950 transition hover:bg-brand-50"
        >
          {copy.ctaButton}
        </Link>
      </div>
    </div>
  );
}
