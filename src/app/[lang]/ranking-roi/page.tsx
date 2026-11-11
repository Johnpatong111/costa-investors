import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { RoiMap } from "@/components/sections/roi-map";
import { RankingTable } from "@/components/sections/ranking-table";
import { Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { deriveDistrictStats, MARKET_YEAR } from "@/lib/content/market-stats";
import { getAllDistrictEntries } from "@/lib/data/repository";
import { PRICE_REPORT } from "@/lib/data/services";
import { assertLocale } from "@/lib/i18n/config";
import { getUiCopy } from "@/lib/i18n/ui";
import { translatePath } from "@/lib/i18n/paths";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, datasetNode, faqNode } from "@/lib/seo/schema-org";
import { areaForBudget, median } from "@/lib/tools/ranking";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * RANKING ROI: /ranking-roi. 89 dzielnic po zwrocie netto, z linkami do
 * raportów dzielnic i hubów miast. Unikalny zasób danych, nie lista linków.
 */

export const revalidate = 86_400;

const PATH = "/ranking-roi";
const BUDGET = 250_000;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const copy = RANKING_COPY[locale];
  const count = getAllDistrictEntries().length;

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription(count),
    path: PATH,
    keywords: copy.keywords,
    locale,
  });
}

export default async function RankingPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = assertLocale((await params).lang);
  const ui = getUiCopy(locale);
  const copy = RANKING_COPY[locale];

  const rows = getAllDistrictEntries()
    .map((entry) => {
      const stats = deriveDistrictStats(entry.city, entry.district, entry.region);
      return {
        citySlug: entry.city.slug,
        cityName: entry.city.name,
        districtSlug: entry.district.slug,
        districtName: entry.district.name,
        pricePerM2: stats.pricePerM2,
        rentalYield: stats.rentalYield,
        netYield: stats.netYield,
        growth: stats.priceGrowth,
        days: stats.avgDaysOnMarket,
        demand: entry.district.demandIndex,
        area: areaForBudget(BUDGET, stats.pricePerM2),
        lat: entry.district.lat,
        lng: entry.district.lng,
        href: translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}/${entry.district.slug}`, locale),
      };
    })
    .sort((a, b) => b.netYield - a.netYield);

  const cities = new Set(rows.map((row) => row.citySlug)).size;
  const middleYield = median(rows.map((row) => row.netYield));
  const middleArea = median(rows.map((row) => row.area));
  const best = rows[0];
  const worst = rows[rows.length - 1];

  // Wiersze dla tabeli z filtrami: pozycja w rankingu i gotowe linki.
  const rankingRows = rows.map((row, index) => ({
    rank: index + 1,
    districtName: row.districtName,
    cityName: row.cityName,
    href: row.href,
    cityHref: translatePath(`/${PRICE_REPORT.slug}/${row.citySlug}`, locale),
    pricePerM2: row.pricePerM2,
    rentalYield: row.rentalYield,
    netYield: row.netYield,
    growth: row.growth,
    days: row.days,
    demand: row.demand,
    area: row.area,
  }));

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: PRICE_REPORT.name, path: `/${PRICE_REPORT.slug}` },
    { name: copy.h1, path: PATH },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-page py-10 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {copy.eyebrow} · {MARKET_YEAR}
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-brand-950 sm:text-4xl">{copy.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-700">
            {copy.lead(rows.length, cities)}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: copy.summary.median, value: formatRate(middleYield) },
              {
                label: copy.summary.best,
                value: best ? `${formatRate(best.netYield)} · ${best.districtName}` : "-",
              },
              {
                label: copy.summary.worst,
                value: worst ? `${formatRate(worst.netYield)} · ${worst.districtName}` : "-",
              },
              { label: copy.summary.medianPrice, value: `${middleArea} m²` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-brand-100 bg-white px-4 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-brand-500">{item.label}</dt>
                <dd className="mt-1 text-sm font-bold text-brand-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <RoiMap
          locale={locale}
          points={rows.map((row) => ({
            name: row.districtName,
            city: row.cityName,
            href: row.href,
            lat: row.lat,
            lng: row.lng,
            pricePerM2: row.pricePerM2,
            netYield: row.netYield,
          }))}
        />
      </Section>

            <Section>
        <div id="ranking">
          <RankingTable locale={locale} rows={rankingRows} />
          <p className="mt-3 max-w-3xl text-[11px] leading-relaxed text-brand-500">{copy.note}</p>
        </div>
      </Section>

      <FaqAccordion items={copy.faq} title={copy.faqTitle} />

      <Section className="bg-brand-50/60">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-950 px-5 py-5 text-white">
          <div className="max-w-2xl">
            <p className="text-base font-bold">{copy.ctaTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-100">{copy.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${translatePath(`/${PRICE_REPORT.slug}/${best?.citySlug ?? ""}`, locale)}?budzet=${BUDGET}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-950 transition hover:bg-brand-50"
            >
              {copy.ctaButton}
            </Link>
            <Link
              href={translatePath(`/${PRICE_REPORT.slug}`, locale)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
            >
              {copy.backToReports}
            </Link>
          </div>
        </div>
      </Section>

      <JsonLd
        nodes={[
          breadcrumbNode(crumbs),
          datasetNode({
            locale,
            name: copy.h1,
            description: copy.metaDescription(rows.length),
            path: PATH,
            spatialName: "Costa Blanca, Costa Cálida",
            temporalCoverage: `${MARKET_YEAR}/2026`,
          }),
          faqNode(copy.faq, PATH, locale),
        ]}
      />
    </>
  );
}
