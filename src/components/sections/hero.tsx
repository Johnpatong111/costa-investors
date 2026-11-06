import type { ReactNode } from "react";
import { Badge, Container } from "@/components/ui/primitives";
import { SITE } from "@/lib/seo/site";

export interface HeroProps {
  eyebrow: string;
  h1: string;
  lead: string;
  chips: string[];
  /** Formularz / kalkulator. Wstrzykiwany z serwera jako slot. */
  children: ReactNode;
  footnote?: string;
}

/**
 * Hero money page: nagłówek z intencją + dowód (chips) + formularz powyżej
 * zgięcia. Na mobile formularz ląduje bezpośrednio pod nagłówkiem.
 */
export function Hero({ eyebrow, h1, lead, chips, children, footnote }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
      />
      <Container className="relative grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold tracking-wide text-accent-300 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.7rem]">
            {h1}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">{lead}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip}>
                <Badge tone="brand" className="bg-white/10 ring-white/20">
                  <span aria-hidden className="text-accent-300">
                    ✓
                  </span>
                  {chip}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-brand-200">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <span aria-hidden>☎</span> {SITE.phone}
            </a>
            <span>Pon.. Pt. 8:00-20:00, sob. 9:00-14:00</span>
          </div>

          {footnote ? (
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-brand-300">{footnote}</p>
          ) : null}
        </div>

        <div className="lg:pl-4">{children}</div>
      </Container>
    </section>
  );
}
