import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadEngine } from "@/components/lead/lead-engine";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { BuyingCosts } from "@/components/sections/buying-costs";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OwnershipCosts } from "@/components/sections/ownership-costs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { InternalLinks } from "@/components/sections/internal-links";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { getCities, getCitiesBySubregion, getAllDistrictEntries, getRegions } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { buildServiceFallbackVars, interpolateBenefits } from "@/lib/content/service-copy";
import { deriveDistrictStats } from "@/lib/content/market-stats";
import { interpolate } from "@/lib/content/interpolate";
import { assertLocale, isLocale, ROUTABLE_LOCALES, type Locale } from "@/lib/i18n/config";
import { getServiceCopy, getLocalizedContent } from "@/lib/i18n/content/builders";
import { HUB_COPY } from "@/lib/i18n/hub-copy";
import { getHomeDeepDiveCopy } from "@/lib/i18n/home-deep-dive";
import { OWNERSHIP_FAQ } from "@/lib/i18n/ownership-costs";
import { getUiCopy } from "@/lib/i18n/ui";
import { ADVISORY_KEYWORDS } from "@/lib/i18n/seo-copy";
import { translatePath } from "@/lib/i18n/paths";
import { resolveService } from "@/lib/i18n/resolve";
import { serviceSlug } from "@/lib/i18n/service-slugs";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, serviceNode, faqNode } from "@/lib/seo/schema-org";
import { SITE } from "@/lib/seo/site";
import { formatEur, formatRate } from "@/lib/utils/format";

interface RouteParams {
  lang: string;
  service: string;
}

/** Hub usługi: /{service}. Wejście dla fraz bez lokalizacji. */
export const revalidate = 86_400;
export const dynamicParams = false;

export function generateStaticParams({
  params,
}: {
  params?: { lang?: string };
} = {}): Omit<RouteParams, "lang">[] {
  // Next wywołuje tę funkcję dla każdego prefiksu języka i przekazuje `lang`
  // z segmentu rodzica. Emitujemy wyłącznie slug NATYWNY dla języka, więc
  // w prerenderze nie ma aliasów (`/pl/apartments-for-sale`). Te nadal
  // działają, ale middleware odsyła z nich 308 na wersję kanoniczną.
  const lang = params?.lang;
  if (lang && isLocale(lang)) {
    return SERVICES.map((service) => ({ service: serviceSlug(service.kind, lang) }));
  }

  // Fallback, gdyby Next nie przekazał parametrów rodzica: pełny przekrój.
  return SERVICES.flatMap((service) =>
    ROUTABLE_LOCALES.map((locale) => ({ service: serviceSlug(service.kind, locale) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, service: serviceSlugParam } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlugParam);
  if (!resolved) {
    return { title: HUB_COPY[locale].notFound, robots: { index: false } };
  }

  const { service, kind } = resolved;
  const copy = getServiceCopy(kind, locale);
  const ui = HUB_COPY[locale];
  const regions = getRegions().map((region) => region.name).join(", ");

  return buildMetadata({
    title: ui.metaTitle(copy.name),
    description: ui.metaDescription(copy.name, copy.priceAnchor),
    path: `/${service.slug}`,
    keywords: [copy.name, `${copy.name} Costa Blanca`, `${copy.name} Costa Cálida`, ...ADVISORY_KEYWORDS[locale]],
    locale,
    rawSerp: true,
    // Dedykowany holenderski landing dla kupujących. Hreflang musi być
    // dwustronny, więc huby kupna linkują do NL, a NL do hubów.
    extraLanguages:
      kind === "buy" ? { nl: "/nl/appartement-kopen-costa-blanca" } : undefined,
  });
}

export default async function ServiceHubPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, service: serviceSlugParam } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlugParam);
  if (!resolved) notFound();

  const { service, kind } = resolved;
  const copy = getServiceCopy(kind, locale);
  const ui = HUB_COPY[locale];
  const deepDive = getHomeDeepDiveCopy(locale);

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: copy.name, path: `/${service.slug}` },
  ];
  const path = translatePath(`/${service.slug}`, locale);
  const jsonLdCrumbs = crumbs.map((item) => ({
    ...item,
    path: translatePath(item.path, locale),
  }));

  const cities = getCities();
  const regions = getRegions();
  const subregions = [...new Set(cities.map((city) => city.subregion))];
  const topDistricts = getAllDistrictEntries()
    .map((entry) => {
      const stats = deriveDistrictStats(entry.city, entry.district, entry.region);
      return {
        city: entry.city,
        district: entry.district,
        stats,
        href: translatePath(
          `/${service.slug}/${entry.city.slug}/${entry.district.slug}`,
          locale,
        ),
      };
    })
    .filter((entry) => entry.stats.reliable)
    .sort((a, b) => b.stats.netYield - a.stats.netYield)
    .slice(0, 8);

  // Strony zbiorcze nie mają jednej dzielnicy. Podstawiamy medianę rynku,
  // żeby opisy korzyści nie zawierały surowych placeholderów.
  const avgMedian = Math.round(
    cities.reduce((sum, city) => sum + city.pricePerM2, 0) / Math.max(cities.length, 1),
  );
  const avgYield =
    cities.reduce((sum, city) => sum + city.rentalYield, 0) / Math.max(cities.length, 1);
  const avgGrowth =
    cities.reduce((sum, city) => sum + city.priceGrowth, 0) / Math.max(cities.length, 1);

  const copyVars = buildServiceFallbackVars({
    areaName: locale === "pl" ? "Hiszpanii" : locale === "es" ? "España" : "Spain",
    medianPricePerM2: avgMedian,
    rentalYield: avgYield,
    priceGrowth: avgGrowth,
  });

  const uiCopy = getUiCopy(locale);
  const localized = locale === "pl" ? null : getLocalizedContent(locale);
  const processSteps =
    locale === "pl"
      ? service.process.map((step) => ({
          title: step.title,
          description: interpolate(step.description, copyVars),
          duration: step.duration,
        }))
      : (localized?.process ?? []).map((step) => ({
          title: step.title,
          description: interpolate(step.description, copyVars),
          duration: step.duration,
        }));

  const benefits =
    locale === "pl"
      ? interpolateBenefits(service, copyVars)
      : copy.benefits.map((benefit) => ({
          title: interpolate(benefit.title, copyVars),
          description: interpolate(benefit.description, copyVars),
        }));

  const localizedService = locale === "pl" ? null : getLocalizedContent(locale)?.service[kind];
  const hubFaq =
    locale === "pl"
      ? service.faq.map((item) => ({
          question: interpolate(item.q, copyVars),
          answer: interpolate(item.a, copyVars),
        }))
      : (localizedService?.faq ?? []).map((item) => ({
          question: interpolate(item.q, copyVars),
          answer: interpolate(item.a, copyVars),
        }));

  const allFaq = kind === "buy" ? [...hubFaq, ...OWNERSHIP_FAQ[locale]] : hubFaq;

  const JOINERS: Record<Locale, string> = { pl: " i ", en: " and ", es: " y " };
  const regionLabel = regions.map((region) => region.name).join(JOINERS[locale]);

  return (
    <>
      <Breadcrumbs items={crumbs} locale={locale} />

      <Hero
        locale={locale}
        eyebrow={`${copy.name} · ${regionLabel}`}
        h1={ui.h1(copy.name, regionLabel)}
        lead={ui.lead(copy.name, copy.priceAnchor, copy.highlightLabel)}
        chips={[
          copy.priceAnchor,
          `${ui.chips.median} ${formatEur(avgMedian)}/m²`,
          ui.chips.cities(cities.length),
          ui.chips.agent,
        ]}
        footnote={ui.footnote(subregions.length)}
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            language={locale}
            cityName=""
            sourceKey={kind}
            heading={ui.leadHeading}
            subheading={ui.leadSubheading}
          />
        </div>
      </Hero>

      <HowItWorks
        eyebrow={uiCopy.howItWorks}
        steps={processSteps}
        title={uiCopy.howItWorksTitle(copy.name, regionLabel)}
        subtitle={uiCopy.howItWorksSubtitle}
      />

      {kind === "buy" ? (
        <>
          <BuyingCosts copy={deepDive} />

          <OwnershipCosts locale={locale} />
        </>
      ) : null}

      <Section>
        <SectionHeading eyebrow={ui.coverageEyebrow}>{ui.coverageTitle}</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subregions.map((subregion) => {
            const subregionCities = getCitiesBySubregion(subregion);
            if (subregionCities.length === 0) return null;
            return (
              <div key={subregion}>
                <p className="text-sm font-bold text-brand-950">{subregion}</p>
                <ul className="mt-2 space-y-1 text-sm text-brand-700">
                  {subregionCities.map((city) => (
                    <li key={city.slug} className="flex items-baseline justify-between gap-2">
                      <a
                        href={translatePath(`/${service.slug}/${city.slug}`, locale)}
                        className="hover:text-brand-950 hover:underline"
                      >
                        {copy.name} {city.name}
                      </a>
                      <span className="shrink-0 text-xs tabular-nums text-brand-500">
                        {formatEur(city.pricePerM2)}/m²
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={ui.bestAreasEyebrow}>{ui.bestAreasTitle}</SectionHeading>
        <p className="-mt-4 mb-6 max-w-3xl text-sm leading-relaxed text-brand-700">{ui.bestAreasLead}</p>
        <div className="overflow-x-auto rounded-2xl border border-brand-100">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {ui.bestAreasDistrict}
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  {ui.bestAreasPrice}
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  {ui.bestAreasYield}
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  {ui.bestAreasDays}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {topDistricts.map(({ city, district, stats, href }) => (
                <tr key={`${city.slug}/${district.slug}`} className="bg-white">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <a
                      href={href}
                      className="text-brand-900 underline decoration-brand-200 underline-offset-2 hover:text-brand-950 hover:decoration-brand-600"
                    >
                      {district.name}
                    </a>
                    <span className="block text-xs text-brand-500">{city.name}</span>
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{formatEur(stats.pricePerM2)}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-accent-700">
                    {formatRate(stats.netYield)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{stats.avgDaysOnMarket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow={ui.conditionsEyebrow}>{ui.conditionsTitle}</SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-brand-100 bg-white p-5">
              <h3 className="text-base font-bold text-brand-950">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <FaqAccordion items={allFaq} title={uiCopy.faqTitle(copy.name, regionLabel)} />

      <InternalLinks
        title={ui.otherServices}
        groups={[
          {
            title: ui.servicesGroup,
            links: SERVICES.filter((item) => item.kind !== kind).map((item) => ({
              href: translatePath(`/${item.slug}`, locale),
              label: getServiceCopy(item.kind, locale).name,
              meta: getServiceCopy(item.kind, locale).priceAnchor,
            })),
          },
          {
            title: ui.reportsGroup,
            links: [
              {
                href: translatePath(`/${PRICE_REPORT.slug}`, locale),
                label: ui.reportLabel,
                meta: `ROI do ${formatRate(6.9)}`,
              },
              ...getCities().map((city) => ({
                href: translatePath(`/${PRICE_REPORT.slug}/${city.slug}`, locale),
                label: `${ui.reportLabel} ${city.name}`,
                meta: `${formatEur(city.pricePerM2)}/m² · ROI ${formatRate(city.rentalYield)}`,
              })),
            ],
          },
        ]}
      />

      <JsonLd
        nodes={[
          breadcrumbNode(jsonLdCrumbs),
          serviceNode({
            service: { ...service, name: copy.name },
            path,
            description: ui.metaDescription(copy.name, copy.priceAnchor),
            areaServed: [
              { name: "Costa Blanca", type: "AdministrativeArea" },
              { name: "Costa Cálida", type: "AdministrativeArea" },
            ],
            priceRangeLabel: copy.priceAnchor,
            locale,
          }),
          faqNode(allFaq, path, locale),
        ]}
      />
    </>
  );
}
