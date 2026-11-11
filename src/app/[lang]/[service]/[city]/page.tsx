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
import { InvestorWorkbench } from "@/components/tools/investor-workbench";
import { deriveDistrictStats } from "@/lib/content/market-stats";
import { StickyCta } from "@/components/sections/sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCityContent } from "@/lib/content/city-content";
import { getCities, getCity, getRegion } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { buildLocalizedCityContent } from "@/lib/i18n/content/builders";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { getUiCopy } from "@/lib/i18n/ui";
import { translatePath } from "@/lib/i18n/paths";
import { assertLocale, isLocale, ROUTABLE_LOCALES } from "@/lib/i18n/config";
import { resolveService } from "@/lib/i18n/resolve";
import { serviceSlug } from "@/lib/i18n/service-slugs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";
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
  const serviceName = getServiceCopy(kind, locale).name;
  const ui = getUiCopy(locale);
  const content =
    locale === "pl"
      ? buildCityContent(city, region, service)
      : buildLocalizedCityContent(city, region, kind, locale)!;

  return buildMetadata({
    title:
      locale === "es"
        ? `Inversión y compra: ${getServiceCopy(kind, locale).name} en ${city.name} | Precios y rentabilidad`
        : locale === "en"
          ? `Buy ${getServiceCopy(kind, locale).name} in ${city.name} | Investment & ROI ${SITE.year} | Costa Investors`
          : `Inwestycje i zakup: ${getServiceCopy(kind, locale).name} w ${city.name} | Ceny i ROI ${SITE.year}`,
    // Opis łączy nazwę USŁUGI i dane miasta - inaczej wszystkie usługi
    // w tym samym mieście miały identyczny meta description.
    description:
      locale === "es"
        ? `${getServiceCopy(kind, locale).name} en ${city.name}: mediana ${formatEur(content.stats.pricePerM2)}/m², ROI ${formatRate(content.stats.rentalYield)}, ${formatRate(content.stats.priceGrowth)} interanual. Selección de ofertas y gastos de compra.`
        : locale === "en"
          ? `${getServiceCopy(kind, locale).name} in ${city.name}: median ${formatEur(content.stats.pricePerM2)}/m², ${formatRate(content.stats.rentalYield)} yield, ${formatRate(content.stats.priceGrowth)} YoY. Shortlist and purchase costs.`
          : `${getServiceCopy(kind, locale).name} w ${city.name}: mediana ${formatEur(content.stats.pricePerM2)}/m², ROI ${formatRate(content.stats.rentalYield)}, wzrost ${formatRate(content.stats.priceGrowth)} r/r. Selekcja ofert i koszty zakupu.`,
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
  const serviceName = getServiceCopy(kind, locale).name;
  const ui = getUiCopy(locale);
  const content =
    locale === "pl"
      ? buildCityContent(city, region, service)
      : buildLocalizedCityContent(city, region, kind, locale)!;
  const path = `/${service.slug}/${city.slug}`;

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: serviceName, path: `/${service.slug}` },
    { name: city.name, path },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <Hero
        locale={locale}
        eyebrow={`${serviceName} · ${city.name} (${region.name})`}
        h1={content.h1}
        lead={content.lead}
        chips={[
          getServiceCopy(service.kind, locale).priceAnchor,
          `ROI ${formatRate(content.stats.rentalYield)}`,
          locale === "es" ? `Crecimiento ${formatRate(content.stats.priceGrowth)} interanual` : locale === "en" ? `Growth ${formatRate(content.stats.priceGrowth)} YoY` : `Wzrost ${formatRate(content.stats.priceGrowth)} r/r`,
          locale === "es" ? `${city.districts.length} zonas en la base` : locale === "en" ? `${city.districts.length} areas in the dataset` : `${city.districts.length} dzielnic w bazie`,
        ]}
        footnote={locale === "es" ? `Datos de mercado: ${content.stats.dataAsOf}. Valores estimados para ${city.name}; no constituyen una oferta de inversión.` : locale === "en" ? `Market data: ${content.stats.dataAsOf}. Estimates for ${city.name}; not an investment offer.` : `Dane rynkowe: ${content.stats.dataAsOf}. Wartości szacunkowe dla ${city.name}; nie stanowią oferty inwestycyjnej.`}
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            language={locale}
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

      <section className="border-t border-brand-100 bg-brand-50/40">
        <div className="container-page py-10 lg:py-14">
          <InvestorWorkbench
            locale={locale}
            cityName={city.name}
            rates={{
              pricePerM2: content.stats.pricePerM2,
              rentalYield: content.stats.rentalYield,
              netYield: content.stats.netYield,
              priceGrowth: content.stats.priceGrowth,
            }}
            districts={city.districts.map((district) => {
              const districtStats = deriveDistrictStats(city, district, region);
              return {
                slug: district.slug,
                name: district.name,
                pricePerM2: districtStats.pricePerM2,
                rentalYield: districtStats.rentalYield,
                netYield: districtStats.netYield,
                demandIndex: district.demandIndex,
                days: districtStats.avgDaysOnMarket,
              };
            })}
            districtBasePath={translatePath(`/${PRICE_REPORT.slug}/${city.slug}`, locale)}
            ctaHref="#lead-form"
          />
        </div>
      </section>

      <HowItWorks
        eyebrow={ui.howItWorks}
        steps={content.processSteps}
        title={ui.howItWorksTitle(serviceName, city.name)}
      />

      <FaqAccordion items={content.faq} title={ui.faqTitle(serviceName, city.name)} />

      <InternalLinks
        groups={[
          {
            title: ui.otherDistricts(serviceName),
            links: city.districts.map((district) => ({
              href: translatePath(`/${service.slug}/${city.slug}/${district.slug}`, locale),
              label: district.name,
              meta: `${formatEur(district.pricePerM2)}/m² · ROI ${formatRate(district.rentalYield)}`,
            })),
          },
          {
            title: locale === "es" ? `Otros servicios en ${city.nameLocative}` : locale === "en" ? `Other services in ${city.nameLocative}` : `Inne usługi w ${city.nameLocative}`,
            links: SERVICES.filter((item) => item.slug !== service.slug).map((item) => ({
              href: translatePath(`/${item.slug}/${city.slug}`, locale),
              label: getServiceCopy(item.kind, locale).name,
              meta: getServiceCopy(item.kind, locale).priceAnchor,
            })),
          },
          {
            title: ui.investmentReport,
            links: [
              {
                href: translatePath(`/${PRICE_REPORT.slug}`, locale),
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
            service: { ...service, name: getServiceCopy(service.kind, locale).name },
            path,
            description: content.metaDescription,
            areaServed: [
              { name: city.name, type: "City" },
              { name: region.name, type: "AdministrativeArea" },
            ],
            priceRangeLabel: getServiceCopy(service.kind, locale).priceAnchor,
          }),
          faqNode(content.faq, path, locale),
        ]}
      />
    </>
  );
}
