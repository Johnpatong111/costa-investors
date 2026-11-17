import { Section, SectionHeading } from "@/components/ui/primitives";
import type { Locale } from "@/lib/i18n/config";
import { OWNERSHIP_COSTS } from "@/lib/i18n/ownership-costs";

/**
 * Roczne koszty utrzymania. Uzupełnia tabelę kosztów zakupu na hubie usługi:
 * inwestor widzi nie tylko cenę wejścia, ale też koszt utrzymania i realne
 * netto ROI. Te same liczby są opisane w FAQ i widoczne w treści.
 */
export function OwnershipCosts({ locale }: { locale: Locale }) {
  const copy = OWNERSHIP_COSTS[locale];

  return (
    <Section id="koszty-utrzymania" className="bg-brand-50/60">
      <SectionHeading eyebrow={copy.eyebrow}>{copy.title}</SectionHeading>
      <p className="-mt-4 mb-6 max-w-3xl text-brand-700">{copy.lead}</p>

      <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                {copy.colItem}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {copy.colValue}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {copy.colNote}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {copy.rows.map((row) => (
              <tr key={row.label} className="bg-white">
                <th scope="row" className="px-4 py-3 font-semibold text-brand-950">
                  {row.label}
                </th>
                <td className="px-4 py-3 font-semibold whitespace-nowrap text-accent-700">{row.value}</td>
                <td className="px-4 py-3 text-brand-700">{row.note}</td>
              </tr>
            ))}
            <tr className="bg-brand-50">
              <th scope="row" className="px-4 py-3 font-bold text-brand-950">
                {copy.totalLabel}
              </th>
              <td className="px-4 py-3 font-bold whitespace-nowrap text-brand-950">{copy.totalValue}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-brand-600">{copy.footnote}</p>
    </Section>
  );
}
