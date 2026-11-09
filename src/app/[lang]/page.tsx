import type { Metadata } from "next";
import Link from "next/link";
import { LeadEngine } from "@/components/lead/lead-engine";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { getCities } from "@/lib/data/repository";
import { PRICE_REPORT, PRIMARY_SERVICE, SERVICES } from "@/lib/data/services";
import { buildServiceFallbackVars, interpolateBenefits } from "@/lib/content/service-copy";
import { assertLocale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { getHomeCopy } from "@/lib/i18n/ui";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { HOME_SEO } from "@/lib/i18n/seo-copy";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatEur, formatRate } from "@/lib/utils/format";

/** Strona główna. Hub dla 4 usług i 15 miejscowości (Costa Blanca + Cálida). */
export const revalidate = 86_400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const seo = HOME_SEO[locale];
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: "/",
    keywords: seo.keywords,
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = assertLocale((await params).lang);
  const home = getHomeCopy(locale);
  const allCities = getCities();
  const topCities = allCities.filter((city) => city.tier === 1).slice(0, 9);
  const avgMedian = Math.round(
    allCities.reduce((sum, city) => sum + city.pricePerM2, 0) / Math.max(allCities.length, 1),
  );
  const avgYield =
    allCities.reduce((sum, city) => sum + city.rentalYield, 0) / Math.max(allCities.length, 1);
  const avgGrowth =
    allCities.reduce((sum, city) => sum + city.priceGrowth, 0) / Math.max(allCities.length, 1);

  const copyVars = buildServiceFallbackVars({
    areaName: "Hiszpania",
    medianPricePerM2: avgMedian,
    rentalYield: avgYield,
    priceGrowth: avgGrowth,
  });

  const serviceCards = SERVICES.map((service) => ({
    service,
    benefit: interpolateBenefits(service, copyVars)[0],
  }));

  return (
    <>
      <Hero
        eyebrow={home.heroEyebrow}
        h1={home.heroH1}
        lead={home.heroLead(allCities.length)}
        chips={home.heroChips(formatEur(120_000), formatRate(6.9), allCities.length)}
        footnote={home.heroFootnote}
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            cityName=""
            language={locale}
            sourceKey="home"
            heading={home.leadHeading}
            subheading={home.leadSubheading}
          />
        </div>
      </Hero>

      <Section>
        <SectionHeading eyebrow={home.servicesEyebrow}>{home.servicesTitle}</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {serviceCards.map(({ service, benefit }) => (
            <Link
              key={service.slug}
              href={translatePath(`/${service.slug}`, locale)}
              className="group rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-colors hover:border-brand-300"
            >
              <p className="text-base font-bold text-brand-950 group-hover:underline">
                {getServiceCopy(service.kind, locale).name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">
                {getServiceCopy(service.kind, locale).benefits[0]?.description ?? getServiceCopy(service.kind, locale).priceAnchor}
              </p>
              <p className="mt-3 text-xs font-semibold text-accent-600">
                {getServiceCopy(service.kind, locale).priceAnchor} → {home.cardCta}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow={home.marketsEyebrow}>{home.marketsTitle}</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={translatePath(`/${PRIMARY_SERVICE.slug}/${city.slug}`, locale)}
              className="rounded-xl border border-brand-100 bg-white px-4 py-3 transition-colors hover:border-brand-300"
            >
              <p className="font-semibold text-brand-950">{city.name}</p>
              <p className="text-xs text-brand-600">
                {formatEur(city.pricePerM2)}/m² · ROI {formatRate(city.rentalYield)} ·{" "}
                {home.districts(city.districts.length)}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-brand-700">
          {home.reportsLine}{" "}
          <Link
            href={translatePath(`/${PRICE_REPORT.slug}`, locale)}
            className="font-semibold text-brand-900 underline underline-offset-2"
          >
            {locale === "pl"
              ? PRICE_REPORT.name
              : locale === "es"
                ? "Precios m² y ROI en España"
                : "Prices m² and ROI in Spain"}
          </Link>
        </p>
      </Section>

      <SocialProof
        coverage={{ districts: getCities().reduce((sum, city) => sum + city.districts.length, 0), cities: getCities().length, transactions: 21_400 }}
      />
    </>
  );
}
