import { Section, SectionHeading } from "@/components/ui/primitives";
import type { ProcessStep } from "@/lib/content/content-utils";

/** Proces sprzedaży. Redukuje niepewność, najczęstszy powód porzucenia formularza. */
export function HowItWorks({
  eyebrow,
  steps,
  title,
  subtitle,
}: {
  steps: ProcessStep[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Section className="bg-brand-50/60">
      <SectionHeading eyebrow={eyebrow}>{title}</SectionHeading>
      {subtitle ? <p className="-mt-4 mb-8 max-w-2xl text-brand-700">{subtitle}</p> : null}

      <ol className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-brand-100 bg-white p-5 shadow-card"
          >
            <span className="absolute -top-3 left-5 grid h-7 w-7 place-items-center rounded-full bg-brand-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="mt-1 text-base font-bold text-brand-950">{step.title}</h3>
              <span className="shrink-0 rounded-full bg-accent-50 px-2 py-0.5 text-[11px] font-semibold text-accent-700">
                {step.duration}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-brand-700">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
