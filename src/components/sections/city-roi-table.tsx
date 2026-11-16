import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { PRICE_REPORT } from "@/lib/data/services";
import type { Locale } from "@/lib/i18n/config";
import type { HomeDeepDiveCopy } from "@/lib/i18n/home-deep-dive";
import { translatePath } from "@/lib/i18n/paths";
import { formatEur, formatRate } from "@/lib/utils/format";

export interface CityRoiRow {
  slug: string;
  name: string;
  pricePerM2: number;
  rentalYield: number;
  priceGrowth: number;
}

/**
 * Tabela ROI największych miejscowości. Linkuje do raportów cenowych, więc
 * wzmacnia wewnętrzne linkowanie huba (GSC pokazuje, że to one łapią ruch).
 */
export function CityRoiTable({
  copy,
  rows,
  locale,
}: {
  copy: HomeDeepDiveCopy;
  rows: CityRoiRow[];
  locale: Locale;
}) {
  return (
    <Section id="roi" className="bg-brand-50/60">
      <SectionHeading eyebrow={copy.roiEyebrow}>{copy.roiTitle}</SectionHeading>
      <p className="-mt-4 mb-6 max-w-3xl text-brand-700">{copy.roiLead(rows.length)}</p>

      <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                {copy.roiColCity}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {copy.roiColPrice}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {copy.roiColYield}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {copy.roiColGrowth}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                <span className="sr-only">{copy.roiView}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {rows.map((row) => (
              <tr key={row.slug}>
                <th scope="row" className="px-4 py-3 font-semibold">
                  <Link
                    href={translatePath(`/${PRICE_REPORT.slug}/${row.slug}`, locale)}
                    className="text-brand-950 underline-offset-2 hover:underline"
                  >
                    {row.name}
                  </Link>
                </th>
                <td className="px-4 py-3 whitespace-nowrap text-brand-700">{formatEur(row.pricePerM2)}/m²</td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap text-accent-700">
                  {formatRate(row.rentalYield)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-brand-700">{formatRate(row.priceGrowth)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    href={translatePath(`/${PRICE_REPORT.slug}/${row.slug}`, locale)}
                    className="text-xs font-semibold text-brand-900 underline underline-offset-2"
                  >
                    {copy.roiView} →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-sm">
        <Link
          href={translatePath("/ranking-roi", locale)}
          className="font-semibold text-brand-900 underline underline-offset-2"
        >
          {copy.roiCta} →
        </Link>
      </p>
    </Section>
  );
}
