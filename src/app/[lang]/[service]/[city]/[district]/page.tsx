import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadEngine } from "@/components/lead/lead-engine";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { ContentBlocks } from "@/components/sections/content-blocks";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InternalLinks } from "@/components/sections/internal-links";
import { MarketStatsSection } from "@/components/sections/market-stats";
import { SocialProof } from "@/components/sections/social-proof";
import { StickyCta } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildDistrictContent } from "@/lib/content/district-content";
import { buildLocalizedDistrictContent } from "@/lib/i18n/content/builders";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { getUiCopy } from "@/lib/i18n/ui";
import { assertLocale, isLocale, ROUTABLE_LOCALES } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { resolveService } from "@/lib/i18n/resolve";
import { serviceSlug } from "@/lib/i18n/service-slugs";
import { getAllDistrictEntries, getDistrict, getNearbyDistricts } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { PRICE_HISTORY_KEYWORD } from "@/lib/i18n/seo-copy";
import { SITE } from "@/lib/seo/site";
import {
  breadcrumbNode,
  faqNode,
  localAgentNode,
  placeNode,
  serviceNode,
} from "@/lib/seo/schema-org";
import { formatEur, formatRate } from "@/lib/utils/format";

interface RouteParams {
  lang: string;
  service: string;
  city: string;
  district: string;
}

/** MONEY PAGE: /{service}/{city}/{district}. */
export const revalidate = 86_400;
export const dynamicParams = true;

export async function generateStaticParams({
  params,
}: {
  params?: { lang?: string };
} = {}): Promise<Omit<RouteParams, "lang">[]> {
  // Money page: dla każdego prefiksu języka generujemy jego natywne slugi usług,
  // żeby statycznie powstawały URL-e kanoniczne (a nie aliasy PL-slugowe).
  const lang = params?.lang;
  const locales = lang && isLocale(lang) ? [lang] : ROUTABLE_LOCALES;

  return getAllDistrictEntries().flatMap((entry) =>
    locales.flatMap((locale) =>
      SERVICES.map((service) => ({
        service: serviceSlug(service.kind, locale),
        city: entry.city.slug,
        district: entry.district.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, service: serviceSlug, city, district } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlug);
  const entry = getDistrict(city, district);

  if (!resolved || !entry) {
    return { title: "Nie znaleziono strony", robots: { index: false, follow: false } };
  }

  const { service, kind } = resolved;
  const serviceName = getServiceCopy(kind, locale).name;
  const ui = getUiCopy(locale);
  const content =
    locale === "pl"
      ? buildDistrictContent(entry, service)
      : buildLocalizedDistrictContent(entry, kind, locale)!;

  return buildMetadata({
    // Tytuł MUSI zawierać nazwę dzielnicy, inaczej wszystkie dzielnice
    // jednego miasta mają identyczny title (duplikat w Google).
    title:
      locale === "es"
        ? `${getServiceCopy(kind, locale).name} en ${entry.district.name} (${entry.city.name}) | Precios y ROI ${SITE.year}`
        : locale === "en"
          ? `${getServiceCopy(kind, locale).name} in ${entry.district.name}, ${entry.city.name} | Investment & ROI ${SITE.year}`
          : `${getServiceCopy(kind, locale).name} ${entry.district.name} (${entry.city.name}) | Ceny i ROI ${SITE.year}`,
    // Opis z danymi WYŁĄCZNIE tej dzielnicy (mediana, ROI, dynamika), więc
    // każdy meta description jest unikalny w obrębie miasta i języka.
    description:
      locale === "es"
        ? `${getServiceCopy(kind, locale).name} en ${entry.district.name} (${entry.city.name}): mediana ${formatEur(content.stats.pricePerM2)}/m², ROI ${formatRate(content.stats.rentalYield)}, ${formatRate(content.stats.priceGrowth)} interanual. Consulta ofertas y gastos de compra.`
        : locale === "en"
          ? `${getServiceCopy(kind, locale).name} in ${entry.district.name} (${entry.city.name}): median ${formatEur(content.stats.pricePerM2)}/m², ${formatRate(content.stats.rentalYield)} yield, ${formatRate(content.stats.priceGrowth)} YoY. See listings and purchase costs.`
          : `${getServiceCopy(kind, locale).name} ${entry.district.name} (${entry.city.name}): mediana ${formatEur(content.stats.pricePerM2)}/m², ROI ${formatRate(content.stats.rentalYield)}, wzrost ${formatRate(content.stats.priceGrowth)} r/r. Sprawdź oferty i koszty zakupu.`,
    path: `/${service.slug}/${entry.city.slug}/${entry.district.slug}`,
    keywords: [...content.keywords, PRICE_HISTORY_KEYWORD[locale]],
    noindex: !content.isIndexable,
    locale,
  });
}

export default async function DistrictServicePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, service: serviceSlug, city, district } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlug);
  const entry = getDistrict(city, district);

  if (!resolved || !entry) notFound();

  const { service, kind } = resolved;
  const serviceName = getServiceCopy(kind, locale).name;
  const ui = getUiCopy(locale);
  const content =
    locale === "pl"
      ? buildDistrictContent(entry, service)
      : buildLocalizedDistrictContent(entry, kind, locale)!;
  const path = `/${service.slug}/${entry.city.slug}/${entry.district.slug}`;
  const districtName = entry.district.name;
  const cityName = entry.city.name;

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: serviceName, path: `/${service.slug}` },
    { name: cityName, path: `/${service.slug}/${entry.city.slug}` },
    { name: districtName, path },
  ];

  const nearby = getNearbyDistricts(entry, 4);
  const otherServices = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <Hero
        locale={locale}
        eyebrow={`${service.name} · ${districtName}, ${cityName} (${entry.region.name})`}
        h1={content.h1}
        lead={content.lead}
        chips={[
          service.priceAnchor,
          `ROI ${formatRate(content.stats.rentalYield)}`,
          `Wzrost ${formatRate(content.stats.priceGrowth)} r/r`,
          `Mediana ${formatEur(content.stats.pricePerM2)}/m²`,
        ]}
        footnote={`Dane rynkowe: ${content.stats.dataAsOf}. Mediany ofertowe dla ${districtName}; wartości szacunkowe, nie stanowią oferty inwestycyjnej ani tasación.`}
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            language={locale}
            cityName={cityName}
            districtName={districtName}
            sourceKey={content.key}
            rates={{
              rentalYield: content.stats.rentalYield,
              netYield: content.stats.netYield,
              priceGrowth: content.stats.priceGrowth,
              pricePerM2: content.stats.pricePerM2,
            }}
          />
        </div>
      </Hero>

      <MarketStatsSection
        stats={content.stats}
        locationName={`${districtName}, ${cityName}`}
        cityName={cityName}
        regionName={entry.region.name}
      />

      <ContentBlocks blocks={content.blocks} />

      <HowItWorks
        eyebrow={ui.howItWorks}
        steps={content.processSteps}
        title={`${ui.howItWorksTitle(serviceName, districtName)}`}
        subtitle={ui.howItWorksSubtitle}
      />

      <SocialProof
        coverage={{ districts: 50, cities: 10, transactions: content.stats.transactions12m }}
      />

      <FaqAccordion
        items={content.faq}
        title={`${service.name} w ${districtName}. Pytania i odpowiedzi`}
      />

      <InternalLinks
        groups={[
          {
            title: ui.otherServices(districtName),
            links: otherServices.map((item) => ({
              href: translatePath(`/${item.slug}/${entry.city.slug}/${entry.district.slug}`, locale),
              label: getServiceCopy(item.kind, locale).name,
              meta: item.priceAnchor,
            })),
          },
          {
            title: `Inne dzielnice: ${service.name}`,
            links: nearby.map((item) => ({
              href: translatePath(`/${service.slug}/${item.city.slug}/${item.district.slug}`, locale),
              label: `${item.district.name} (${item.city.name})`,
              meta: `${formatEur(item.district.pricePerM2)}/m²`,
            })),
          },
          {
            title: ui.investmentReport,
            links: [
              {
                href: translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}/${entry.district.slug}`, locale),
                label: `Ceny i ROI w ${districtName}. Raport ${content.stats.dataAsOf}`,
                meta: `ROI ${formatRate(content.stats.rentalYield)}`,
              },
            ],
          },
        ]}
      />

      <StickyCta targetId="lead-form" />

      <JsonLd
        nodes={[
          breadcrumbNode(crumbs),
          placeNode({
            path,
            name: districtName,
            cityName,
            regionName: entry.region.name,
            lat: entry.district.lat,
            lng: entry.district.lng,
          }),
          localAgentNode({
            path,
            placePath: path,
            areaName: `${districtName}, ${cityName}`,
            cityName,
            regionName: entry.region.name,
            lat: entry.district.lat,
            lng: entry.district.lng,
          }),
          serviceNode({
            service,
            path,
            description: content.metaDescription,
            areaServed: [
              { name: districtName, type: "AdministrativeArea" },
              { name: cityName, type: "City" },
              { name: entry.region.name, type: "AdministrativeArea" },
            ],
            priceRangeLabel: service.priceAnchor,
            locale,
          }),
          faqNode(content.faq, path, locale),
        ]}
      />
    </>
  );
}
