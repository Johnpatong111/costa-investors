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
  return buildMetadata({
  title: "Nieruchomości na Costa Blanca i Cálida dla Polaków | 2026",
  description: `Apartamenty, wille i domy inwestycyjne w Hiszpanii. Ceny od ${formatEur(120_000)}, ROI do ${formatRate(6.9)}. Zgłoszenie trafia do certyfikowanego polskojęzycznego agenta.`,
  path: "/",
  keywords: [
    "nieruchomości Costa Blanca",
    "nieruchomości Costa Cálida",
    "mieszkanie w Hiszpanii dla Polaka",
    "inwestycja w nieruchomości Hiszpania",
    "apartament Torrevieja",
  ],
    locale,
  });
}

export default function HomePage() {
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
        eyebrow="Costa Blanca i Costa Cálida · Hiszpania"
        h1="Kup nieruchomość w Hiszpanii z polskim agentem. Z analizą ROI"
        lead={`Apartamenty, wille z basenem i domy inwestycyjne w ${allCities.length} miejscowościach na dwóch wybrzeżach. Pokazujemy realne ceny €/m², zwrot z najmu i pełne koszty zakupu. A Twoje zgłoszenie przekazujemy certyfikowanemu agentowi z gotowymi ofertami.`}
        chips={[
          `ceny od ${formatEur(120_000)}`,
          `ROI do ${formatRate(6.9)}`,
          `${allCities.length} miejscowości`,
          "agent mówiący po polsku",
        ]}
        footnote="Wartości szacunkowe na podstawie median ofertowych. Nie stanowią oferty inwestycyjnej ani gwarancji zwrotu."
      >
        <div id="lead-form" className="scroll-mt-24">
          <LeadEngine
            cityName=""
            sourceKey="home"
            heading="Znajdź nieruchomość z polskim agentem w 24 h"
            subheading="Wypełnij preferencje. Certyfikowany polskojęzyczny agent skontaktuje się z gotowymi ofertami."
          />
        </div>
      </Hero>

      <Section>
        <SectionHeading eyebrow="Usługi">Wybierz, czego szukasz</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {serviceCards.map(({ service, benefit }) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-colors hover:border-brand-300"
            >
              <p className="text-base font-bold text-brand-950 group-hover:underline">
                {service.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">
                {benefit?.description ?? service.priceAnchor}
              </p>
              <p className="mt-3 text-xs font-semibold text-accent-600">
                {service.priceAnchor} → sprawdź szczegóły
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow="Lokalizacje">Największe rynki Hiszpanii</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${PRIMARY_SERVICE.slug}/${city.slug}`}
              className="rounded-xl border border-brand-100 bg-white px-4 py-3 transition-colors hover:border-brand-300"
            >
              <p className="font-semibold text-brand-950">{city.name}</p>
              <p className="text-xs text-brand-600">
                {formatEur(city.pricePerM2)}/m² · ROI {formatRate(city.rentalYield)} ·{" "}
                {city.districts.length} dzielnic
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-brand-700">
          Wszystkie raporty cenowe i ROI:{" "}
          <Link
            href={`/${PRICE_REPORT.slug}`}
            className="font-semibold text-brand-900 underline underline-offset-2"
          >
            {PRICE_REPORT.name}
          </Link>
        </p>
      </Section>

      <SocialProof
        coverage={{ districts: getCities().reduce((sum, city) => sum + city.districts.length, 0), cities: getCities().length, transactions: 21_400 }}
      />
    </>
  );
}
