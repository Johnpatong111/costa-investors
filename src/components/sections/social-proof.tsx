"use client";

import { usePathname } from "next/navigation";
import { Badge, Section, SectionHeading } from "@/components/ui/primitives";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";
import { getSocialCopy } from "@/lib/i18n/ui";

/**
 * Social proof oparty na FAKTACH operacyjnych (nie na wymyślonych opiniach).
 * Język wynika z prefiksu ścieżki, więc sekcja jest spójna na /pl, /en i /es.
 * Fikcyjne recenzje są wyłączone: `testimonials` domyślnie puste.
 */
export interface Testimonial {
  author: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Musi być true dopiero po realnej weryfikacji źródła opinii. */
  verified: boolean;
}

export function SocialProof({
  coverage,
  testimonials = [],
}: {
  coverage: { districts: number; cities: number; transactions: number };
  testimonials?: Testimonial[];
}) {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const copy = getSocialCopy(locale);

  const verified = testimonials.filter((item) => item.verified);
  const tiles = copy.tiles(coverage);

  return (
    <Section className="bg-white">
      <SectionHeading eyebrow={copy.eyebrow}>{copy.title}</SectionHeading>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/60 p-5"
          >
            <dt className="text-2xl font-bold text-brand-900">{tile.value}</dt>
            <dd className="mt-1 text-sm font-semibold text-brand-950">{tile.label}</dd>
            <dd className="mt-1 text-xs leading-relaxed text-brand-600">{tile.detail}</dd>
          </div>
        ))}
      </dl>

      {verified.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {verified.map((item) => (
            <figure key={`${item.author}-${item.city}`} className="rounded-2xl border border-brand-100 p-5">
              <div className="flex items-center gap-1 text-accent-500" aria-label={copy.rating(item.rating)}>
                {"★".repeat(item.rating)}
                <span className="sr-only">{copy.rating(item.rating)}</span>
              </div>
              <blockquote className="mt-2 text-sm leading-relaxed text-brand-800">
                {'"'}
                {item.quote}
                {'"'}
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-brand-600">
                {item.author}, {item.city}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-8 max-w-3xl rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-xs leading-relaxed text-brand-600">
          <Badge tone="warning" className="mb-2">
            {copy.noteBadge}
          </Badge>
          {copy.note}
        </div>
      )}
    </Section>
  );
}
