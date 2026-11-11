import { Section, SectionHeading } from "@/components/ui/primitives";
import type { PriceHistory } from "@/lib/i18n/price-history";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * Moduł historii cen: czytelny wykres słupkowy z CSS (bez bibliotek)
 * plus tabela roczna. Zero JS po stronie klienta, więc nie wpływa na LCP.
 */
export function PriceHistorySection({ history }: { history: PriceHistory }) {
  const max = Math.max(...history.points.map((point) => point.price));

  return (
    <Section className="bg-white pt-10">
      <SectionHeading eyebrow={history.avgLabel}>{history.title}</SectionHeading>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-brand-700">{history.subtitle}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <p className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm text-brand-800">
          {history.avgLabel}: <strong className="text-brand-950">{formatRate(history.avgChange)}</strong>
        </p>
        <p className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm text-brand-800">
          {history.decadeLabel}: <strong className="text-brand-950">+{formatRate(history.decadeChange)}</strong>
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-[560px] items-end gap-2" role="img" aria-label={history.title}>
          {history.points.map((point) => (
            <div key={point.year} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] tabular-nums text-brand-500">{Math.round(point.price)}</span>
              <div
                className="w-full rounded-t bg-gradient-to-t from-brand-700 to-brand-400"
                style={{ height: `${Math.max(8, Math.round((point.price / max) * 140))}px` }}
              />
              <span className="text-[10px] font-semibold text-brand-700">{point.year}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
        <table className="w-full text-sm">
          <thead className="bg-brand-50 text-left text-xs tracking-wide text-brand-600 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">{history.yearsLabel}</th>
              <th scope="col" className="px-4 py-3 text-right">€/m²</th>
              <th scope="col" className="px-4 py-3 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {history.points.map((point) => (
              <tr key={point.year} className="odd:bg-white even:bg-brand-50/40">
                <th scope="row" className="px-4 py-2 text-left font-medium">{point.year}</th>
                <td className="px-4 py-2 text-right tabular-nums">{formatEur(point.price)}</td>
                <td className="px-4 py-2 text-right tabular-nums">
                  {point.change === null ? "-" : `${point.change > 0 ? "+" : ""}${formatRate(point.change)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 max-w-3xl text-[11px] leading-relaxed text-brand-500">{history.note}</p>
    </Section>
  );
}
