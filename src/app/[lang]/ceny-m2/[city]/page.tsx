import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadEngine } from "@/components/lead/lead-engine";
import { PriceHistorySection } from "@/components/sections/price-history";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { InternalLinks } from "@/components/sections/internal-links";
import { InvestorWorkbench } from "@/components/tools/investor-workbench";
import { PurchaseCostsCalculator } from "@/components/tools/purchase-costs-calculator";
import { PurchaseChecklist } from "@/components/tools/purchase-checklist";
import { ShortLetComparison } from "@/components/tools/short-let-comparison";
import { regionTax } from "@/lib/content/region-facts";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import { JsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { deriveCityStats, deriveDistrictStats, MARKET_YEAR } from "@/lib/content/market-stats";
import { getCities, getCitiesBySubregion, getCity, getRegion } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { assertLocale, type Locale } from "@/lib/i18n/config";
import { getPriceHistory } from "@/lib/i18n/price-history";
import { translatePath } from "@/lib/i18n/paths";
import { PRICE_HISTORY_KEYWORD } from "@/lib/i18n/seo-copy";
import { getCityEditorial } from "@/lib/content/city-editorial";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { getUiCopy } from "@/lib/i18n/ui";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, datasetNode } from "@/lib/seo/schema-org";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * ===========================================================================
 * HUB RAPORTÓW MIASTA: /{lang}/ceny-m2/{miasto}
 * ===========================================================================
 * Brakujące ogniwo między hubem krajowym a raportami dzielnic. Zbiera frazy
 * „ceny m2 <miasto>", „ROI <miasto>", „property prices <city>", „precio m2
 * <ciudad>" bez zawężania do jednej dzielnicy i linkuje do wszystkich raportów
 * dzielnicowych (internal linking + sitemap).
 */

interface RouteParams {
  lang: string;
  city: string;
}

export const revalidate = 86_400;
export const dynamicParams = false;

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    h1: (city: string) => string;
    lead: (city: string, median: string, yieldValue: string, districts: number) => string;
    tableEyebrow: string;
    tableTitle: (city: string) => string;
    colDistrict: string;
    colMedian: string;
    colRoi: string;
    colGrowth: string;
    colDays: string;
    otherCities: string;
    ctaEyebrow: string;
    ctaTitle: (city: string) => string;
    ctaText: string;
    metaTitle: (city: string) => string;
    metaDescription: (city: string, median: string, yieldValue: string) => string;
    keywords: (city: string) => string[];
  }
> = {
  pl: {
    eyebrow: "Dane rynkowe",
    h1: (city) => `Ceny m² i ROI w ${city}`,
    lead: (city, median, yieldValue, districts) =>
      `Mediana ofertowa w ${city} to ${median} €/m² przy rentowności najmu ${yieldValue} brutto. Poniżej ceny, zwrot i czas ekspozycji ofert w ${districts} dzielnicach - kliknij nazwę, aby otworzyć pełny raport dzielnicy.`,
    tableEyebrow: "Porównanie",
    tableTitle: (city) => `Ceny i ROI w dzielnicach - ${city}`,
    colDistrict: "Dzielnica",
    colMedian: "Mediana €/m²",
    colRoi: "ROI brutto",
    colGrowth: "Wzrost r/r",
    colDays: "Ekspozycja",
    otherCities: "Inne miasta w regionie",
    ctaEyebrow: "Oferty",
    ctaTitle: (city) => `Chcesz kupić w ${city}?`,
    ctaText:
      "Wyślij budżet i preferencje. Przygotujemy 3-5 ofert z wyliczonym zwrotem i pełnymi kosztami zakupu.",
    metaTitle: (city) => `Ceny m² ${city} ${MARKET_YEAR} | ROI i dzielnice`,
    metaDescription: (city, median, yieldValue) =>
      `Ceny w ${city}: mediana ${median} €/m², ROI najmu ${yieldValue} brutto. Zobacz ceny i zwrot w każdej dzielnicy oraz historię cen 2016-2026.`,
    keywords: (city) => [
      `ceny m2 ${city}`,
      `ceny nieruchomości ${city} ${MARKET_YEAR}`,
      `ROI najmu ${city}`,
      PRICE_HISTORY_KEYWORD.pl,
    ],
  },
  en: {
    eyebrow: "Market data",
    h1: (city) => `Property prices and yields in ${city}`,
    lead: (city, median, yieldValue, districts) =>
      `The asking median in ${city} is ${median} €/m² with a gross rental yield of ${yieldValue}. Below: prices, returns and time on market across ${districts} areas - open any name for the full district report.`,
    tableEyebrow: "Comparison",
    tableTitle: (city) => `Prices and yields by area - ${city}`,
    colDistrict: "Area",
    colMedian: "Median €/m²",
    colRoi: "Gross yield",
    colGrowth: "Growth YoY",
    colDays: "Time on market",
    otherCities: "Other towns in the region",
    ctaEyebrow: "Listings",
    ctaTitle: (city) => `Want to buy in ${city}?`,
    ctaText:
      "Send your budget and preferences. We shortlist 3-5 properties with the return modelled and the full cost of buying.",
    metaTitle: (city) => `Property prices ${city} ${MARKET_YEAR} | Yields by area`,
    metaDescription: (city, median, yieldValue) =>
      `Prices in ${city}: median ${median} €/m² and ${yieldValue} gross yield. See every area, its return and the 2016-2026 price history.`,
    keywords: (city) => [
      `property prices ${city}`,
      `price per m2 ${city} ${MARKET_YEAR}`,
      `rental yield ${city}`,
      PRICE_HISTORY_KEYWORD.en,
    ],
  },
  es: {
    eyebrow: "Datos de mercado",
    h1: (city) => `Precios y rentabilidad en ${city}`,
    lead: (city, median, yieldValue, districts) =>
      `La mediana de oferta en ${city} es de ${median} €/m² con una rentabilidad bruta del ${yieldValue}. Abajo tienes precios, retorno y tiempo de venta en ${districts} zonas: pulsa el nombre para ver el informe completo.`,
    tableEyebrow: "Comparativa",
    tableTitle: (city) => `Precios y rentabilidad por zona - ${city}`,
    colDistrict: "Zona",
    colMedian: "Mediana €/m²",
    colRoi: "Rentabilidad bruta",
    colGrowth: "Crecimiento interanual",
    colDays: "Tiempo de venta",
    otherCities: "Otras localidades de la región",
    ctaEyebrow: "Ofertas",
    ctaTitle: (city) => `¿Quieres comprar en ${city}?`,
    ctaText:
      "Envíanos tu presupuesto y preferencias. Preparamos de 3 a 5 ofertas con retorno calculado y todos los gastos de compra.",
    metaTitle: (city) => `Precio m² ${city} ${MARKET_YEAR} | Rentabilidad por zona`,
    metaDescription: (city, median, yieldValue) =>
      `Precios en ${city}: mediana ${median} €/m² y rentabilidad bruta ${yieldValue}. Consulta cada zona, su retorno y la evolución de precios 2016-2026.`,
    keywords: (city) => [
      `precio m2 ${city}`,
      `precios vivienda ${city} ${MARKET_YEAR}`,
      `rentabilidad alquiler ${city}`,
      PRICE_HISTORY_KEYWORD.es,
    ],
  },
};

export function generateStaticParams(): Omit<RouteParams, "lang">[] {
  return getCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  const locale = assertLocale(lang);
  const city = getCity(citySlug);
  const region = city ? getRegion(city.region) : undefined;
  if (!city || !region) return { title: "Not found", robots: { index: false } };

  const stats = deriveCityStats(city, region);
  const copy = COPY[locale];

  const keywords = copy.keywords(city.name);

  return buildMetadata({
    title: copy.metaTitle(city.name),
    description: copy.metaDescription(
      city.name,
      formatEur(stats.pricePerM2),
      formatRate(stats.rentalYield),
    ),
    path: `/${PRICE_REPORT.slug}/${city.slug}`,
    keywords,
    locale,
  });
}

export default async function PriceCityPage({ params }: { params: Promise<RouteParams> }) {
  const { lang, city: citySlug } = await params;
  const locale = assertLocale(lang);
  const city = getCity(citySlug);
  const region = city ? getRegion(city.region) : undefined;
  if (!city || !region) notFound();

  const ui = getUiCopy(locale);
  const copy = COPY[locale];
  const editorial = getCityEditorial(city.slug, locale);
  const stats = deriveCityStats(city, region);

  const rows = city.districts
    .map((district) => {
      const districtStats = deriveDistrictStats(city, district, region);
      return {
        slug: district.slug,
        name: district.name,
        pricePerM2: districtStats.pricePerM2,
        rentalYield: districtStats.rentalYield,
        priceGrowth: districtStats.priceGrowth,
        days: districtStats.avgDaysOnMarket,
      };
    })
    .sort((a, b) => b.pricePerM2 - a.pricePerM2);

  const neighbours = getCitiesBySubregion(city.subregion).filter((item) => item.slug !== city.slug);

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: ui.reportsNav, path: `/${PRICE_REPORT.slug}` },
    { name: city.name, path: `/${PRICE_REPORT.slug}/${city.slug}` },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-page py-10 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {copy.eyebrow} · {MARKET_YEAR}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
            {copy.h1(city.name)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-700">
            {copy.lead(
              city.name,
              formatEur(stats.pricePerM2),
              formatRate(stats.rentalYield),
              rows.length,
            )}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: copy.colMedian, value: formatEur(stats.pricePerM2) },
              { label: copy.colRoi, value: formatRate(stats.rentalYield) },
              { label: copy.colGrowth, value: formatRate(stats.priceGrowth) },
              { label: copy.colDays, value: String(stats.avgDaysOnMarket) },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-brand-100 bg-white px-4 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-brand-500">{item.label}</dt>
                <dd className="mt-1 text-lg font-bold tabular-nums text-brand-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {editorial ? (
        <Section>
          <SectionHeading eyebrow={copy.eyebrow}>
            {locale === "es"
              ? `Análisis de ${city.name}`
              : locale === "en"
                ? `${city.name} market analysis`
                : `Analiza rynku: ${city.name}`}
          </SectionHeading>
          <div className="max-w-3xl space-y-4">
            {editorial.map((section) => (
              <div key={section.title}>
                <h3 className="text-base font-semibold text-brand-950">{section.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-800">{section.body}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}


      <Section>
        <SectionHeading eyebrow={copy.tableEyebrow}>{copy.tableTitle(city.name)}</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-brand-50 text-left text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3">
                  {copy.colDistrict}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colMedian}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colRoi}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colGrowth}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {copy.colDays}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug} className="odd:bg-white even:bg-brand-50/40">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <Link
                      href={translatePath(`/${PRICE_REPORT.slug}/${city.slug}/${row.slug}`, locale)}
                      className="text-brand-900 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                    >
                      {row.name}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{formatEur(row.pricePerM2)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(row.rentalYield)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(row.priceGrowth)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{row.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {neighbours.length > 0 ? (
          <p className="mt-6 text-sm text-brand-700">
            <span className="font-semibold text-brand-900">{copy.otherCities}: </span>
            {neighbours.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? " · " : ""}
                <Link
                  href={translatePath(`/${PRICE_REPORT.slug}/${item.slug}`, locale)}
                  className="underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                >
                  {item.name}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </Section>

      {/* Historia cen 2016-2026 dla TEGO miasta - każdy URL /ceny-m2/... ją ma. */}
      <PriceHistorySection
        history={getPriceHistory(locale, {
          current: stats.pricePerM2,
          growth: stats.priceGrowth,
          seed: city.slug,
        })}
      />

      <Section>
        <InvestorWorkbench
          locale={locale}
          cityName={city.name}
          rates={{
            rentalYield: stats.rentalYield,
            netYield: stats.netYield,
            priceGrowth: stats.priceGrowth,
            pricePerM2: stats.pricePerM2,
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
          ctaHref="#formularz"
        />
      </Section>

      <Section className="bg-brand-50/40">
        <PurchaseCostsCalculator
          locale={locale}
          cityName={city.name}
          itp={regionTax(city.region).itp}
          authority={regionTax(city.region).authority}
          rentalYield={stats.rentalYield}
          ctaHref="#formularz"
        />
      </Section>

      <Section className="pt-0">
        <ShortLetComparison
          locale={locale}
          cityName={city.name}
          pricePerM2={stats.pricePerM2}
          rentalYield={stats.rentalYield}
          ctaHref="#formularz"
        />
      </Section>

      <Section className="pt-0">
        <Link
          href={translatePath("/ranking-roi", locale)}
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-500 hover:text-brand-950"
        >
          {RANKING_COPY[locale].teaserTitle}
          <span aria-hidden>→</span>
        </Link>
      </Section>

      <Section className="pt-0">
        <PurchaseChecklist
          locale={locale}
          citySlug={city.slug}
          cityName={city.name}
          ctaHref="#formularz"
        />
      </Section>

      <InternalLinks
        groups={[
          {
            title:
              locale === "es"
                ? `Servicios en ${city.name}`
                : locale === "en"
                  ? `Services in ${city.name}`
                  : `Usługi w ${city.nameLocative}`,
            links: SERVICES.map((item) => ({
              href: translatePath(`/${item.slug}/${city.slug}`, locale),
              label: getServiceCopy(item.kind, locale).name,
            })),
          },
          {
            title:
              locale === "es"
                ? "Informes de otras localidades"
                : locale === "en"
                  ? "Reports for other towns"
                  : "Raporty innych miast",
            links: neighbours.slice(0, 6).map((item) => ({
              href: translatePath(`/${PRICE_REPORT.slug}/${item.slug}`, locale),
              label: item.name,
            })),
          },
          {
            title:
              locale === "es"
                ? "Zonas de la localidad"
                : locale === "en"
                  ? "Areas in this town"
                  : "Dzielnice w tym mieście",
            links: rows.slice(0, 5).map((row) => ({
              href: translatePath(`/${PRICE_REPORT.slug}/${city.slug}/${row.slug}`, locale),
              label: row.name,
            })),
          },
        ]}
      />

      <Section className="bg-brand-50/60" id="formularz">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={copy.ctaEyebrow}>{copy.ctaTitle(city.name)}</SectionHeading>
            <p className="max-w-xl text-sm leading-relaxed text-brand-700">{copy.ctaText}</p>
          </div>
          <div className="scroll-mt-24">
            <LeadEngine language={locale} cityName={city.name} sourceKey={`report-${city.slug}`} />
          </div>
        </div>
      </Section>
    </>
  );
}


