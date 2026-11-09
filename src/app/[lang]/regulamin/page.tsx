import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { assertLocale } from "@/lib/i18n/config";
import { getLegal } from "@/lib/i18n/legal";
import { buildMetadata } from "@/lib/seo/metadata";

/** Regulamin serwisu. Treść w trzech językach z `lib/i18n/legal.ts`. */
export const revalidate = 86_400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const doc = getLegal(locale).terms;
  return buildMetadata({
    title: doc.title,
    description: doc.intro,
    path: "/regulamin",
    locale,
    noindex: true,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = assertLocale((await params).lang);
  const doc = getLegal(locale).privacy;

  return (
    <Section className="pt-10">
      <article className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-brand-800">
        <h1 className="text-3xl font-bold text-brand-950">{doc.title}</h1>
        <p className="text-sm text-brand-600">{doc.updated}</p>
        <p>{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="pt-4 text-xl font-bold text-brand-950">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </Section>
  );
}
