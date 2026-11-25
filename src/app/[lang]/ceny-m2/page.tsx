import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { deriveCityStats, MARKET_YEAR } from "@/lib/content/market-stats";
import { getCities, getRegion, getSubregions } from "@/lib/data/repository";
import { PRICE_REPORT, PRIMARY_SERVICE } from "@/lib/data/services";
import { assertLocale } from "@/lib/i18n/config";
import { getUiCopy } from "@/lib/i18n/ui";
import { translatePath } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, faqNode } from "@/lib/seo/schema-org";
import { formatEur, formatRate } from "@/lib/utils/format";
import { PRICE_HUB_COPY, PRICE_HUB_META } from "@/lib/i18n/price-hub-copy";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";

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
    rawSerp: true,
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
  const path = `/${PRICE_REPORT.slug}`;

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: PRICE_REPORT.name, path },
  ];
  const jsonLdCrumbs = crumbs.map((item) => ({
    ...item,
    path: translatePath(item.path, locale),
  }));

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

  const cityPrices = cities
    .map((item) => item.city.pricePerM2)
    .sort((a, b) => a - b);
  const middle = Math.floor(cityPrices.length / 2);
  const medianPrice =
    cityPrices.length % 2 === 1
      ? cityPrices[middle] ?? 0
      : Math.round(((cityPrices[middle - 1] ?? 0) + (cityPrices[middle] ?? 0)) / 2);

  const leaderGroups = [
    {
      title: copy.leadersYield,
      rows: [...cities]
        .sort((a, b) => b.stats.rentalYield - a.stats.rentalYield)
        .slice(0, 3)
        .map(({ city, stats }) => ({ city, value: formatRate(stats.rentalYield) })),
    },
    {
      title: copy.leadersCheap,
      rows: [...cities]
        .sort((a, b) => a.city.pricePerM2 - b.city.pricePerM2)
        .slice(0, 3)
        .map(({ city }) => ({ city, value: `${formatEur(city.pricePerM2)}/m²` })),
    },
    {
      title: copy.leadersGrowth,
      rows: [...cities]
        .sort((a, b) => b.stats.priceGrowth - a.stats.priceGrowth)
        .slice(0, 3)
        .map(({ city, stats }) => ({ city, value: formatRate(stats.priceGrowth) })),
    },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} locale={locale} />

      <JsonLd
        nodes={[
          breadcrumbNode(jsonLdCrumbs),
          faqNode(copy.faq, path, locale),
        ]}
      />

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
          <div className="mt-5 max-w-3xl rounded-2xl border border-brand-200 bg-white p-5">
            <h2 className="text-base font-bold text-brand-950">{copy.answerHeading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-700">
              {copy.answerText(formatEur(medianPrice), formatEur(Math.round(medianPrice * 70)))}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Link
          href={translatePath("/ranking-roi", locale)}
          className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-white px-5 py-4 transition hover:border-brand-400"
        >
          <span>
            <span className="block text-sm font-bold text-brand-950">
              {RANKING_COPY[locale].teaserTitle}
            </span>
            <span className="mt-1 block max-w-2xl text-xs leading-relaxed text-brand-600">
              {RANKING_COPY[locale].teaserText}
            </span>
          </span>
          <span className="text-sm font-bold text-brand-700 underline decoration-brand-300 underline-offset-4 group-hover:text-brand-950">
            →
          </span>
        </Link>
      </Section>

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

      <Section>
        <SectionHeading eyebrow={copy.leadersEyebrow}>{copy.leadersTitle}</SectionHeading>
        <p className="-mt-4 mb-6 max-w-3xl text-sm leading-relaxed text-brand-700">{copy.leadersLead}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {leaderGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-brand-100 bg-white p-5">
              <h3 className="text-sm font-bold text-brand-950">{group.title}</h3>
              <ol className="mt-3 space-y-2">
                {group.rows.map(({ city, value }) => (
                  <li key={city.slug} className="flex items-baseline justify-between gap-3 text-sm">
                    <Link
                      href={translatePath(`/${PRICE_REPORT.slug}/${city.slug}`, locale)}
                      className="font-medium text-brand-800 underline decoration-brand-200 underline-offset-2 hover:text-brand-950 hover:decoration-brand-600"
                    >
                      {city.name}
                    </Link>
                    <span className="shrink-0 font-semibold tabular-nums text-accent-700">{value}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={copy.eyebrow}>{copy.runningCostsHeading}</SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <p className="text-sm leading-relaxed text-brand-700">{copy.runningCostsIntro}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-700">
            {copy.runningCostsBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-5 text-sm">
          <Link
            href={translatePath(`/${PRIMARY_SERVICE.slug}`, locale)}
            className="font-semibold text-brand-900 underline underline-offset-2 hover:text-brand-950"
          >
            {copy.costsCta} →
          </Link>
        </p>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow={copy.eyebrow}>{copy.methodologyHeading}</SectionHeading>
        <p className="max-w-3xl text-sm leading-relaxed text-brand-700">{copy.methodologyText}</p>
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

      <FaqAccordion items={copy.faq} title={copy.faqTitle} />
    </>
  );
}
