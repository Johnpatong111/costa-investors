import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/primitives";

export interface LinkGroup {
  title: string;
  links: { href: string; label: string; meta?: string }[];
}

/**
 * Internal linking money page → money page.
 * Google potrzebuje ścieżek dojścia do każdej strony pSEO (max 3 kliknięcia),
 * a użytkownik – alternatyw w pobliżu, zanim opuści witrynę.
 */
export function InternalLinks({
  groups,
  title = "Sprawdź też w okolicy",
}: {
  groups: LinkGroup[];
  title?: string;
}) {
  return (
    <Section className="bg-brand-50/60">
      <SectionHeading eyebrow="Powiązane lokalizacje">{title}</SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-brand-100 bg-white p-5">
            <p className="text-sm font-bold text-brand-950">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-brand-50"
                  >
                    <span className="font-medium text-brand-800 group-hover:text-brand-950 group-hover:underline">
                      {link.label}
                    </span>
                    {link.meta ? (
                      <span className="shrink-0 tabular-nums text-xs text-brand-500">
                        {link.meta}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
