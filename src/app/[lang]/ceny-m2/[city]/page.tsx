import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadEngine } from "@/components/lead/lead-engine";
import { PriceHistorySection } from "@/components/sections/price-history";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { InternalLinks } from "@/components/sections/internal-links";
import { InvestorWorkbench } from "@/components/tools/investor-workbench";
import { PurchaseCostsCalculator } from "@/components/tools/purchase-costs-calculator";
import { PurchaseChecklist } from "@/components/tools/purchase-checklist";
import { ShortLetComparison } from "@/components/tools/short-let-comparison";
import { ToolTabs } from "@/components/tools/tool-tabs";
import { TOOLS_COPY } from "@/lib/i18n/tool-copy";
import { regionTax } from "@/lib/content/region-facts";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import { JsonLd } from "@/components/seo/json-ld";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { deriveCityStats, deriveDistrictStats, MARKET_YEAR } from "@/lib/content/market-stats";
import type { FaqItem } from "@/lib/content/content-utils";
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
import { breadcrumbNode, datasetNode, faqNode } from "@/lib/seo/schema-org";
import { formatEur, formatEurLocale, formatRate, formatRateLocale } from "@/lib/utils/format";

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
    metaTitle: (city: string, median: string, yieldValue: string) => string;
    metaDescription: (city: string, median: string, yieldValue: string) => string;
    faqTitle: (city: string) => string;
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
    metaTitle: (city, median, yieldValue) =>
      `Ceny nieruchomości ${city} ${MARKET_YEAR}: ${median}/m², ROI ${yieldValue}`,
    metaDescription: (city, median, yieldValue) =>
      `Ceny w ${city}: mediana ${median}/m², ROI najmu ${yieldValue} brutto. Sprawdź ceny, zwrot i czas ekspozycji w każdej dzielnicy oraz historię cen 2016-2026.`,
    faqTitle: (city) => `Pytania i odpowiedzi - ${city}`,
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
    metaTitle: (city, median, yieldValue) =>
      `Property prices ${city} ${MARKET_YEAR}: ${median}/m², ${yieldValue} yield`,
    metaDescription: (city, median, yieldValue) =>
      `Prices in ${city}: median ${median}/m² and ${yieldValue} gross yield. Check prices, returns and time on market in every area, plus the 2016-2026 history.`,
    faqTitle: (city) => `${city}: questions and answers`,
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
    metaTitle: (city, median, yieldValue) =>
      `Precio m² ${city} ${MARKET_YEAR}: ${median}/m² y ${yieldValue} rentabilidad`,
    metaDescription: (city, median, yieldValue) =>
      `Precios en ${city}: mediana ${median}/m² y rentabilidad bruta ${yieldValue}. Consulta precios, retorno y tiempo de venta por zona y la evolución 2016-2026.`,
    faqTitle: (city) => `${city}: preguntas y respuestas`,
    keywords: (city) => [
      `precio m2 ${city}`,
      `precios vivienda ${city} ${MARKET_YEAR}`,
      `rentabilidad alquiler ${city}`,
      PRICE_HISTORY_KEYWORD.es,
    ],
  },
};

/**
 * FAQ dla hubu miasta. Pytania są wspólne dla języka, ale odpowiedzi niosą
 * liczby tego miasta (mediana, czynsz, ROI, rozstrzał dzielnic, ITP), więc
 * każda strona dostaje unikalny blok pod long-tail i FAQPage.
 */
function buildCityFaq(
  locale: Locale,
  cityName: string,
  stats: ReturnType<typeof deriveCityStats>,
  rows: { name: string; pricePerM2: number }[],
  tax: ReturnType<typeof regionTax>,
): FaqItem[] {
  const median = formatEur(stats.pricePerM2);
  const rent = `${stats.monthlyRentPerM2} €/m²`;
  const roi = formatRate(stats.rentalYield);
  const net = formatRate(stats.netYield);
  const growth = formatRate(stats.priceGrowth);
  const priciest = rows[0];
  const cheapest = rows[rows.length - 1];
  const priciestName = priciest?.name ?? cityName;
  const cheapestName = cheapest?.name ?? cityName;
  const priciestPrice = priciest ? formatEur(priciest.pricePerM2) : median;
  const cheapestPrice = cheapest ? formatEur(cheapest.pricePerM2) : median;
  const spread = priciest && cheapest ? formatEur(priciest.pricePerM2 - cheapest.pricePerM2) : "0";
  const itp = `${tax.itp}%`;

  if (locale === "es") {
    return [
      {
        question: `¿Cuánto cuesta el metro cuadrado en ${cityName} en ${MARKET_YEAR}?`,
        answer: `La mediana de oferta es ${median} €/m² (datos: ${stats.dataAsOf}); la rentabilidad bruta es ${roi} y el crecimiento ${growth} interanual.`,
      },
      {
        question: `¿Merece la pena comprar en ${cityName} para alquilar?`,
        answer: `Con una mediana de ${median} €/m² y un alquiler de ${rent} al mes, la rentabilidad bruta es ${roi} y la neta ronda ${net}. En la tabla superior ves las zonas con mejor retorno.`,
      },
      {
        question: `¿Qué zonas de ${cityName} son las más caras y las más baratas?`,
        answer: `La más cara es ${priciestName} (${priciestPrice} €/m²) y la más barata ${cheapestName} (${cheapestPrice} €/m²). La diferencia de ${spread} €/m² muestra cuánto cambia el presupuesto según la zona.`,
      },
      {
        question: `¿Qué gastos de compra se suman al precio en ${cityName}?`,
        answer: `En ${tax.authority} el ITP es del ${itp}. Añade notaría, registro, abogado y traducción: en total suele ser un 7-13% del precio. La calculadora de gastos está en esta misma página.`,
      },
    ];
  }

  if (locale === "en") {
    return [
      {
        question: `How much does a square metre cost in ${cityName} in ${MARKET_YEAR}?`,
        answer: `The asking median is ${median} €/m² (data: ${stats.dataAsOf}); gross yield is ${roi} and growth ${growth} year on year.`,
      },
      {
        question: `Is buying in ${cityName} worth it for rental income?`,
        answer: `At a median of ${median} €/m² and rent of ${rent} per month, gross yield is ${roi} and net yield around ${net}. The table above shows the areas with the best return.`,
      },
      {
        question: `Which areas of ${cityName} are the most and least expensive?`,
        answer: `${priciestName} is the priciest (${priciestPrice} €/m²) and ${cheapestName} the cheapest (${cheapestPrice} €/m²). The ${spread} €/m² spread shows how much the area changes the budget.`,
      },
      {
        question: `What purchase costs apply in ${cityName}?`,
        answer: `In ${tax.authority} transfer tax (ITP) is ${itp}. Add notary, land registry, legal advice and translation - typically 7-13% of the price. The cost calculator is on this page.`,
      },
    ];
  }

  return [
    {
      question: `Ile kosztuje metr kwadratowy w ${cityName} w ${MARKET_YEAR}?`,
      answer: `Mediana ofertowa to ${median} €/m² (dane: ${stats.dataAsOf}); rentowność brutto ${roi}, wzrost ${growth} r/r.`,
    },
    {
      question: `Czy zakup mieszkania w ${cityName} pod wynajem się opłaca?`,
      answer: `Przy medianie ${median} €/m² i czynszu ${rent} miesięcznie ROI brutto wynosi ${roi}, a netto około ${net}. W tabeli powyżej widać dzielnice z najlepszym zwrotem.`,
    },
    {
      question: `Które dzielnice w ${cityName} są najdroższe, a które najtańsze?`,
      answer: `Najdroższa jest ${priciestName} (${priciestPrice} €/m²), najtańsza ${cheapestName} (${cheapestPrice} €/m²). Rozstrzał ${spread} €/m² pokazuje, jak mocno lokalizacja zmienia budżet.`,
    },
    {
      question: `Jakie koszty zakupu dochodzą do ceny mieszkania w ${cityName}?`,
      answer: `W regionie ${tax.authority} ITP wynosi ${itp}. Do tego notariusz, rejestr, prawnik i tłumacz - łącznie zwykle 7-13% ceny. Kalkulator kosztów jest na tej stronie.`,
    },
  ];
}

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
  const price = formatEurLocale(stats.pricePerM2, locale);
  const yieldValue = formatRateLocale(stats.rentalYield, locale);

  const keywords = copy.keywords(city.name);

  return buildMetadata({
    title: copy.metaTitle(city.name, price, yieldValue),
    description: copy.metaDescription(city.name, price, yieldValue),
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

  const tax = regionTax(city.region);
  const faq = buildCityFaq(locale, city.name, stats, rows, tax);
  const path = translatePath(`/${PRICE_REPORT.slug}/${city.slug}`, locale);

  const neighbours = getCitiesBySubregion(city.subregion).filter((item) => item.slug !== city.slug);

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: ui.reportsNav, path: `/${PRICE_REPORT.slug}` },
    { name: city.name, path: `/${PRICE_REPORT.slug}/${city.slug}` },
  ];
  const jsonLdCrumbs = crumbs.map((item) => ({
    ...item,
    path: translatePath(item.path, locale),
  }));

  return (
    <>
      <Breadcrumbs items={crumbs} locale={locale} />

      <JsonLd
        nodes={[
          breadcrumbNode(jsonLdCrumbs),
          datasetNode({
            locale,
            name: copy.h1(city.name),
            description: copy.metaDescription(
              city.name,
              formatEur(stats.pricePerM2),
              formatRate(stats.rentalYield),
            ),
            path,
            spatialName: city.name,
            temporalCoverage: `${stats.dataAsOf}/2026`,
          }),
          faqNode(faq, path, locale),
        ]}
      />

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

          {SERVICES[0] ? (
            <Link
              href={translatePath(`/${SERVICES[0].slug}/${city.slug}`, locale)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-800 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700"
            >
              {locale === "es"
                ? `Ver apartamentos en venta en ${city.name}`
                : locale === "en"
                  ? `See apartments for sale in ${city.name}`
                  : `Zobacz apartamenty na sprzedaż w ${city.name}`}
              <span aria-hidden>→</span>
            </Link>
          ) : null}

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

      <Section className="bg-brand-50/40">
        <ToolTabs
          locale={locale}
          placeName={city.name}
          ctaHref="#formularz"
          tabs={[
            {
              id: "investment",
              label: TOOLS_COPY[locale].tabs.investment,
              content: (
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
                  headingLevel="h3"
                />
              ),
            },
            {
              id: "costs",
              label: TOOLS_COPY[locale].tabs.costs,
              content: (
                <PurchaseCostsCalculator
                  locale={locale}
                  cityName={city.name}
                  itp={regionTax(city.region).itp}
                  authority={regionTax(city.region).authority}
                  rentalYield={stats.rentalYield}
                  headingLevel="h3"
                />
              ),
            },
            {
              id: "season",
              label: TOOLS_COPY[locale].tabs.season,
              content: (
                <ShortLetComparison
                  locale={locale}
                  cityName={city.name}
                  pricePerM2={stats.pricePerM2}
                  rentalYield={stats.rentalYield}
                  headingLevel="h3"
                />
              ),
            },
          ]}
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

      <FaqAccordion items={faq} title={copy.faqTitle(city.name)} />

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


