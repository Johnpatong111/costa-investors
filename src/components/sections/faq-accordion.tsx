import { Section, SectionHeading } from "@/components/ui/primitives";
import type { FaqItem } from "@/lib/content/content-utils";

/**
 * FAQ na natywnych `<details>` – zero JavaScriptu, działa bez hydratacji,
 * a treść jest widoczna w HTML (Google indeksuje ukryte answers).
 * Ten sam zestaw pytań trafia do JSON-LD FAQPage.
 */
export function FaqAccordion({
  items,
  title = "Najczęstsze pytania",
  subtitle,
}: {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section id="faq" className="bg-white">
      <SectionHeading eyebrow="FAQ">{title}</SectionHeading>
      {subtitle ? <p className="-mt-4 mb-6 max-w-2xl text-brand-700">{subtitle}</p> : null}

      <div className="max-w-3xl divide-y divide-brand-100 rounded-2xl border border-brand-100">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-semibold text-brand-950">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-accent-600 transition-transform group-open:rotate-45"
              >
                ＋
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-brand-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
