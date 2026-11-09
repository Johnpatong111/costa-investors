"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

export interface InternalLink {
  href: string;
  label: string;
  meta?: string;
}

export interface InternalLinkGroup {
  title: string;
  links: InternalLink[];
}

const DEFAULT_TITLE: Record<Locale, string> = {
  pl: "Sprawdź też w okolicy",
  en: "Also worth checking nearby",
  es: "También cerca de aquí",
};

const EYEBROW: Record<Locale, string> = {
  pl: "Powiązane lokalizacje",
  en: "Related locations",
  es: "Ubicaciones relacionadas",
};

/**
 * Linkowanie wewnętrzne. Nagłówek sekcji i domyślny tytuł pobierają język
 * z prefiksu ścieżki, więc na /en i /es nie ma polskich etykiet.
 */
export function InternalLinks({
  title,
  groups,
  className,
}: {
  title?: string;
  groups: InternalLinkGroup[];
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;

  return (
    <Section className={className}>
      <SectionHeading eyebrow={EYEBROW[locale]}>{title ?? DEFAULT_TITLE[locale]}</SectionHeading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-brand-950">{group.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-brand-700">
              {group.links.map((link) => (
                <li key={link.href} className="flex items-baseline justify-between gap-2">
                  <Link href={link.href} className="hover:text-brand-950 hover:underline">
                    {link.label}
                  </Link>
                  {link.meta ? (
                    <span className="shrink-0 text-xs tabular-nums text-brand-500">{link.meta}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
