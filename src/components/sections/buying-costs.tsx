import { Section, SectionHeading } from "@/components/ui/primitives";
import type { HomeDeepDiveCopy } from "@/lib/i18n/home-deep-dive";

/**
 * Sekcja kosztów zakupu. Wypełnia lukę treściową strony głównej (583 → 1200+
 * słów) i odpowiada na pytanie, które inwestorzy zadają przed kontaktem.
 */
export function BuyingCosts({ copy }: { copy: HomeDeepDiveCopy }) {
  return (
    <Section id="koszty-zakupu" className="bg-white">
      <SectionHeading eyebrow={copy.costsEyebrow}>{copy.costsTitle}</SectionHeading>
      <p className="-mt-4 mb-6 max-w-3xl text-brand-700">{copy.costsLead}</p>

      <div className="overflow-x-auto rounded-2xl border border-brand-100">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                {copy.costsColItem}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {copy.costsColValue}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {copy.costsColNote}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {copy.costs.map((row) => (
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
                {copy.costsTotalLabel}
              </th>
              <td className="px-4 py-3 font-bold whitespace-nowrap text-brand-950">{copy.costsTotalValue}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-brand-600">{copy.costsFootnote}</p>
    </Section>
  );
}
