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
import { StickyCta } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCityContent } from "@/lib/content/city-content";
import { getCities, getCity, getRegion } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { buildLocalizedCityContent } from "@/lib/i18n/content/builders";
import { assertLocale, isLocale, ROUTABLE_LOCALES } from "@/lib/i18n/config";
import { resolveService } from "@/lib/i18n/resolve";
import { serviceSlug } from "@/lib/i18n/service-slugs";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, faqNode, serviceNode } from "@/lib/seo/schema-org";
import { formatEur, formatRate } from "@/lib/utils/format";

interface RouteParams {
  lang: string;
  service: string;
  city: string;
}

/** Hub miasta: /{service}/{city}. Porównanie dzielnic i ROI. */
export const revalidate = 86_400;
export const dynamicParams = true;

export function generateStaticParams({
  params,
}: {
  params?: { lang?: string };
} = {}): Omit<RouteParams, "lang">[] {
  // Per prefiks języka emitujemy jego własne slugi usług → prerenderowane są
  // URL-e kanoniczne (/en/apartments-for-sale/torrevieja), a nie aliasy.
  const lang = params?.lang;
  const locales = lang && isLocale(lang) ? [lang] : ROUTABLE_LOCALES;

  return getCities().flatMap((city) =>
    locales.flatMap((locale) =>
      SERVICES.map((service) => ({
        service: serviceSlug(service.kind, locale),
        city: city.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, service: serviceSlug, city: citySlug } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlug);
  const city = getCity(citySlug);
  const region = city ? getRegion(city.region) : undefined;

  if (!resolved || !city || !region) {
    return { title: "Nie znaleziono strony", robots: { index: false, follow: false } };
  }

  const { service, kind } = resolved;
  const content =
    locale === "pl"
      ? buildCityContent(city, region, service)
      : buildLocalizedCityContent(city, region, kind, locale)!;

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/${service.slug}/${city.slug}`,
    keywords: content.keywords,
    noindex: !content.isIndexable,
    locale,
  });
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, service: serviceSlug, city: citySlug } = await params;
  const locale = assertLocale(lang);
  const resolved = resolveService(locale, serviceSlug);
  const city = getCity(citySlug);
  const region = city ? getRegion(city.region) : undefined;

  if (!resolved || !city || !region) notFound();

  const { service, kind } = resolved;
  const content =
    locale === "pl"
      ? buildCityContent(city, region, service)
      : buildLocalizedCityContent(city, region, kind, locale)!;
  const path = `/${service.slug}/${city.slug}`;

  const crumbs: Crumb[] = [
    { name: "Strona główna", path: "/" },
    { name: service.name, path: `/${service.slug}` },
    { name: city.name, path },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <Hero
        eyebrow={`${service.name} · ${city.name} (${region.name})`}
        h1={content.h1}
        lead={content.lead}
        chips={[
          service.priceAnchor,
          `ROI ${formatRate(content.stats.rentalYield)}`,
          `Wzrost ${formatRate(content.stats.priceGrowth)} r/r`,
          `${city.districts.length} dzielnic w bazie`,
        ]}
        footnote={`Dane rynkowe: ${content.stats.dataAsOf}. Wartości szacunkowe dla ${city.name}; nie stanowią oferty inwestycyjnej.`}
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            cityName={city.name}
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
        locationName={city.name}
        cityName={city.name}
        regionName={region.name}
      />

      <ContentBlocks blocks={content.blocks} />

      <HowItWorks
        steps={content.processSteps}
        title={`${service.name} w ${city.name}. Etapy zakupu`}
      />

      <FaqAccordion items={content.faq} title={`${service.name} w ${city.name} - FAQ`} />

      <InternalLinks
        groups={[
          {
            title: `Dzielnice ${city.nameGenitive}`,
            links: city.districts.map((district) => ({
              href: `/${service.slug}/${city.slug}/${district.slug}`,
              label: district.name,
              meta: `${formatEur(district.pricePerM2)}/m² · ROI ${formatRate(district.rentalYield)}`,
            })),
          },
          {
            title: `Inne usługi w ${city.nameLocative}`,
            links: SERVICES.filter((item) => item.slug !== service.slug).map((item) => ({
              href: `/${item.slug}/${city.slug}`,
              label: item.name,
              meta: item.priceAnchor,
            })),
          },
          {
            title: "Raport inwestycyjny",
            links: [
              {
                href: `/${PRICE_REPORT.slug}`,
                label: `Ceny m² i ROI w ${city.nameLocative}`,
                meta: `${formatEur(city.pricePerM2)}/m²`,
              },
            ],
          },
        ]}
      />

      <StickyCta targetId="lead-form" />

      <JsonLd
        nodes={[
          breadcrumbNode(crumbs),
          serviceNode({
            service,
            path,
            description: content.metaDescription,
            areaServed: [
              { name: city.name, type: "City" },
              { name: region.name, type: "AdministrativeArea" },
            ],
            priceRangeLabel: service.priceAnchor,
          }),
          faqNode(content.faq, path, locale),
        ]}
      />
    </>
  );
}
