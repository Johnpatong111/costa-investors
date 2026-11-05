"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { useWatch, type Control, type UseFormRegister } from "react-hook-form";
import type { LeadFormValues } from "@/lib/leads/schema";
import { cn } from "@/lib/utils/cn";

/**
 * Kafelki wyboru (micro-commitments).
 *
 * Implementacja na natywnych `<input type="radio">` ukrytych wizualnie:
 *  - pełna obsługa klawiatury i czytników ekranu bez własnego JS,
 *  - React Hook Form rejestruje pole jak zwykły input,
 *  - jeden komponent wizualny (`TileCard`) używany też przez kalkulator.
 */

export interface TileOption {
  value: string;
  label: string;
  description?: string;
}

/**
 * JEDNO ŹRÓDŁO PRAWDY dla pól renderowanych jako kafelki.
 *
 * `satisfies readonly (keyof LeadFormValues)[]` sprawia, że zmiana nazwy pola
 * w schemacie (albo powrót do pola usuniętego podczas pivotu na rynek
 * hiszpański) natychmiast wywala kompilację z czytelnym błędem — zamiast
 * cichego rozjechania typów w komponentach.
 */
export const TILE_FIELDS = [
  "goal",
  "propertyType",
  "horizon",
  "contactMethod",
] as const satisfies readonly (keyof LeadFormValues)[];

export type TileField = (typeof TILE_FIELDS)[number];

export function TileCard({
  icon: Icon,
  label,
  description,
  selected,
  size = "md",
  className,
}: {
  icon?: LucideIcon;
  label: string;
  description?: string;
  selected: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex w-full items-start gap-2.5 rounded-xl border bg-white text-left transition-all duration-150",
        size === "sm" ? "px-3 py-2.5" : "px-3.5 py-3",
        selected
          ? "border-brand-600 bg-brand-50 shadow-sm"
          : "border-brand-200 group-hover:border-brand-400 group-hover:shadow-sm",
        className,
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden
          className={cn(
            "mt-0.5 shrink-0 transition-colors",
            selected ? "text-brand-700" : "text-brand-400",
            size === "sm" ? "h-4 w-4" : "h-5 w-5",
          )}
        />
      ) : null}

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-semibold text-brand-900",
            size === "sm" ? "text-[13px] leading-tight" : "text-sm",
          )}
        >
          {label}
        </span>
        {description && size !== "sm" ? (
          <span className="mt-0.5 block text-[11px] leading-snug text-brand-500">
            {description}
          </span>
        ) : null}
      </span>

      <Check
        aria-hidden
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 text-brand-600 transition-opacity",
          selected ? "opacity-100" : "opacity-0",
        )}
      />
    </span>
  );
}

export interface OptionTilesProps {
  name: TileField;
  options: readonly TileOption[];
  register: UseFormRegister<LeadFormValues>;
  control: Control<LeadFormValues>;
  /** Ikony w kolejności zgodnej z listą opcji. */
  icons?: LucideIcon[];
  columns?: 2 | 3 | 4;
  size?: "sm" | "md";
  legend: string;
  hint?: string;
  className?: string;
}

export function OptionTiles({
  name,
  options,
  register,
  control,
  icons = [],
  columns = 2,
  size = "md",
  legend,
  hint,
  className,
}: OptionTilesProps) {
  const current = useWatch({ control, name });
  const columnClass =
    columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-2 text-xs font-semibold tracking-wide text-brand-700 uppercase">
        {legend}
      </legend>
      {hint ? <p className="mb-2 text-xs text-brand-500">{hint}</p> : null}

      <div className={cn("grid grid-cols-1 gap-2", columnClass)}>
        {options.map((option: TileOption, index: number) => (
          <label
            key={option.value}
            className="group relative cursor-pointer rounded-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500"
          >
            <input
              type="radio"
              value={option.value}
              className="sr-only"
              {...register(name)}
            />
            <TileCard
              icon={icons[index]}
              label={option.label}
              description={option.description}
              size={size}
              selected={current === option.value}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
