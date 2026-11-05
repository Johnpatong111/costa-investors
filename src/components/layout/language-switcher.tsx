"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils/cn";

/**
 * Przełącznik języka.
 *
 * Zasada: przełączenie NIE przenosi na stronę główną – tłumaczy bieżącą
 * ścieżkę na wariant językowy, w tym **segment usługi**
 * (`/pl/apartamenty-na-sprzedaz/...` → `/en/apartments-for-sale/...`).
 * Cała logika siedzi w `translatePath` – tym samym, którego używają
 * canonical i hreflang, więc nie ma rozjazdu między nimi.
 */
export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Language" className="flex items-center gap-0.5">
      {LOCALES.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={translatePath(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              // Zapamiętujemy wybór – middleware używa go bez prefiksu języka.
              document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={cn(
              "rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-900 text-white"
                : "text-brand-600 hover:bg-brand-50 hover:text-brand-900",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
