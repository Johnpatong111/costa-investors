import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { deriveCityStats, MARKET_YEAR } from "@/lib/content/market-stats";
import { getCities, getRegion, getSubregions } from "@/lib/data/repository";
import { PRICE_REPORT } from "@/lib/data/services";
import { assertLocale } from "@/lib/i18n/config";
import { getUiCopy } from "@/lib/i18n/ui";
import { translatePath } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatEur, formatRate } from "@/lib/utils/format";
import { PRICE_HUB_COPY, PRICE_HUB_META } from "@/lib/i18n/price-hub-copy";

/** Indeks raportów: /ceny-m2. Hub dla fraz „ceny m2 <miejscowość> Costa Blanca”. */
export const revalidate = 86_400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const cities = getCities().length;
  return buildMetadata({
    title: PRICE_HUB_META[locale].title,
    description: PRICE_HUB_META[locale].description,
    path: `/${PRICE_REPORT.slug}`,
    keywords: PRICE_HUB_META[locale].keywords,
    locale,
  });
}

export default async function PriceReportIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = assertLocale((await params).lang);
  const ui = getUiCopy(locale);
  const copy = PRICE_HUB_COPY[locale];

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: PRICE_REPORT.name, path: `/${PRICE_REPORT.slug}` },
  ];

  const cities = getCities().map((city) => {
    const region = getRegion(city.region);
    return {
      city,
      stats: deriveCityStats(
        city,
        region ?? {
          slug: "costa-blanca",
          name: "Costa Blanca",
          nameLocative: "Costa Blanca",
          country: "Hiszpania",
          currency: "EUR",
          medianPricePerM2: 2400,
        },
      ),
    };
  });

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-page py-10 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {copy.eyebrow} · {MARKET_YEAR}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
            {copy.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-700">
            {copy.lead}
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow={copy.citiesEyebrow}>{copy.chooseLocation}</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">
              {copy.caption(MARKET_YEAR)}
            </caption>
            <thead className="bg-brand-50 text-left text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3">
                  {copy.colCity}
                </th>
                <th scope="col" className="px-4 py-3">
                  {copy.colRegion}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colMedian}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  ROI
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colGrowth}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colDistricts}
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.map(({ city, stats }) => (
                <tr key={city.slug} className="odd:bg-white even:bg-brand-50/40">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <Link
                      href={translatePath(`/${PRICE_REPORT.slug}/${city.slug}/${city.districts[0]?.slug ?? ""}`, locale)}
                      className="text-brand-900 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                    >
                      {city.name}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-brand-600">{city.subregion}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatEur(city.pricePerM2)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(stats.rentalYield)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(stats.priceGrowth)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{city.districts.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow={copy.regionsEyebrow}>{copy.browseRegion}</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-3">
          {getSubregions().map((subregion) => (
            <div key={subregion}>
              <p className="text-sm font-bold text-brand-950">{subregion}</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-700">
                {getCities()
                  .filter((city) => city.subregion === subregion)
                  .map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={translatePath(`/${PRICE_REPORT.slug}/${city.slug}/${city.districts[0]?.slug ?? ""}`, locale)}
                        className="hover:text-brand-950 hover:underline"
                      >
                        Ceny i ROI - {city.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
