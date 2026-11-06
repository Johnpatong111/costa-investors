import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

/**
 * ===========================================================================
 * IDENTYFIKACJA WIZUALNA – SYGNET + ZNAK SŁOWNY
 * ===========================================================================
 * Sygnet: geometryczny dach (architektura) + wschodzące słońce nad horyzontem
 * (lokalizacja Costa Blanca / Cálida, nowy początek inwestycji).
 * Rysowany jako inline SVG w `currentColor`, więc skaluje się bez utraty
 * ostrości i dziedziczy kolor z klasy na kontenerze.
 *
 * Warianty:
 *  - `tone="dark"`  → ciemnoniebieski kwadrat + biały sygnet (jasne tło: header),
 *  - `tone="light"` → półprzezroczysty kwadrat + biały sygnet (ciemne tło: footer).
 */

type LogoSize = "sm" | "md" | "lg";
type LogoTone = "dark" | "light";

const SIZES = {
  sm: {
    mark: "h-9 w-9 rounded-lg",
    glyph: "h-[22px] w-[22px]",
    name: "text-[15px]",
    role: "text-[10px]",
    gap: "gap-2",
  },
  md: {
    mark: "h-11 w-11 rounded-xl",
    glyph: "h-[26px] w-[26px]",
    name: "text-lg",
    role: "text-[11px]",
    gap: "gap-2.5",
  },
  lg: {
    mark: "h-14 w-14 rounded-2xl",
    glyph: "h-8 w-8",
    name: "text-2xl",
    role: "text-xs",
    gap: "gap-3",
  },
} as const;

/** Sam sygnet – używany też w faviconie (patrz `src/app/icon.svg`). */
export function LogoMark({
  size = "sm",
  tone = "dark",
  className,
}: {
  size?: LogoSize;
  tone?: LogoTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center",
        SIZES[size].mark,
        tone === "dark"
          ? "bg-brand-900 text-white ring-1 ring-inset ring-white/10"
          : "bg-white/10 text-white ring-1 ring-inset ring-white/25",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={SIZES[size].glyph}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Dach – geometryczna bryła budynku. */}
        <path d="M6 13.8 16 6l10 7.8" strokeWidth="2.6" />
        {/* Horyzont – linia ziemi/morza. */}
        <path d="M7.5 20.6h17" strokeWidth="2.2" opacity="0.45" />
        {/* Wschodzące słońce nad horyzontem. */}
        <path d="M11 20.6a5 5 0 0 1 10 0" strokeWidth="2.6" />
      </svg>
    </span>
  );
}

/**
 * Pełne logo: sygnet + dwuwierszowy znak słowny („Costa" bold / „Investors"
 * medium). Całość jest linkiem do strony głównej **w bieżącym języku**,
 * dzięki czemu nawigacja nie gubi prefiksu /pl, /en, /es.
 */
export function Logo({
  locale,
  size = "sm",
  tone = "dark",
  className,
}: {
  locale: Locale;
  size?: LogoSize;
  tone?: LogoTone;
  className?: string;
}) {
  return (
    <Link
      href={localePath(locale, "/")}
      className={cn("group inline-flex items-center", SIZES[size].gap, className)}
    >
      <LogoMark
        size={size}
        tone={tone}
        className="transition-transform duration-200 group-hover:scale-[1.04]"
      />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "font-bold tracking-tight",
            SIZES[size].name,
            tone === "dark" ? "text-brand-950" : "text-white",
          )}
        >
          Costa
        </span>
        <span
          className={cn(
            "mt-0.5 font-medium uppercase tracking-[0.16em]",
            SIZES[size].role,
            tone === "dark" ? "text-brand-600" : "text-brand-200",
          )}
        >
          Investors
        </span>
      </span>
    </Link>
  );
}
