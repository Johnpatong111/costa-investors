import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadEngine } from "@/components/lead/lead-engine";
import { Breadcrumbs, type Crumb } from "@/components/sections/breadcrumbs";
import { ContentBlocks } from "@/components/sections/content-blocks";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { PriceHistorySection } from "@/components/sections/price-history";
import { InternalLinks } from "@/components/sections/internal-links";
import { InvestorWorkbench } from "@/components/tools/investor-workbench";
import { PurchaseCostsCalculator } from "@/components/tools/purchase-costs-calculator";
import { regionTax } from "@/lib/content/region-facts";
import { getPriceHistory } from "@/lib/i18n/price-history";
import { PRICE_HISTORY_KEYWORD } from "@/lib/i18n/seo-copy";
import { PRICE_HUB_COPY } from "@/lib/i18n/price-hub-copy";
import { buildPriceReport } from "@/lib/content/report-content";
import { deriveDistrictStats } from "@/lib/content/market-stats";
import { COUNTRY_MEDIAN_PRICE_PER_M2 } from "@/lib/content/market-stats";
import { getAllDistrictEntries, getDistrict } from "@/lib/data/repository";
import { PRICE_REPORT, SERVICES } from "@/lib/data/services";
import { buildLocalizedPriceReport, getServiceCopy } from "@/lib/i18n/content/builders";
import { getUiCopy } from "@/lib/i18n/ui";
import { translatePath } from "@/lib/i18n/paths";
import { assertLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbNode, datasetNode, faqNode } from "@/lib/seo/schema-org";
import { formatEur, formatPrice, formatRate } from "@/lib/utils/format";

interface RouteParams {
  lang: string;
  city: string;
  district: string;
}

/** Raport cenowo-inwestycyjny: /ceny-m2/{city}/{district}. */
export const revalidate = 86_400;
export const dynamicParams = true;

export function generateStaticParams(): Omit<RouteParams, "lang">[] {
  return getAllDistrictEntries().map((entry) => ({
    city: entry.city.slug,
    district: entry.district.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, city, district } = await params;
  const locale = assertLocale(lang);
  const entry = getDistrict(city, district);

  if (!entry) {
    return { title: "Nie znaleziono raportu", robots: { index: false, follow: false } };
  }

  const copy = PRICE_HUB_COPY[locale];
  const report =
    locale === "pl" ? buildPriceReport(entry) : buildLocalizedPriceReport(entry, locale)!;

  return buildMetadata({
    title: report.metaTitle,
    description: report.metaDescription,
    path: `/${PRICE_REPORT.slug}/${entry.city.slug}/${entry.district.slug}`,
    keywords: [...report.keywords, PRICE_HISTORY_KEYWORD[locale]],
    noindex: !report.isIndexable,
    locale,
  });
}

export default async function PriceReportPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, city, district } = await params;
  const locale = assertLocale(lang);
  const copy = PRICE_HUB_COPY[locale];
  const ui = getUiCopy(locale);
  const entry = getDistrict(city, district);
  if (!entry) notFound();

  const report =
    locale === "pl" ? buildPriceReport(entry) : buildLocalizedPriceReport(entry, locale)!;
  const path = `/${PRICE_REPORT.slug}/${entry.city.slug}/${entry.district.slug}`;

  // Tabela porównawcza: PL dostaje gotowe wiersze z buildera, EN/ES liczymy
  // z tych samych seedów, więc liczby są identyczne w każdym języku.
  type ComparisonRow = {
    name: string;
    isCurrent: boolean;
    pricePerM2: number;
    rentalYield: number;
    priceGrowth: number;
  };
  const comparison: ComparisonRow[] =
    (report as { comparison?: ComparisonRow[] }).comparison ??
    entry.city.districts.map((item) => {
      const stats = deriveDistrictStats(entry.city, item, entry.region);
      return {
        name: item.name,
        isCurrent: item.slug === entry.district.slug,
        pricePerM2: stats.pricePerM2,
        rentalYield: stats.rentalYield,
        priceGrowth: stats.priceGrowth,
      };
    });

  const tableUi =
    locale === "es"
      ? {
          eyebrow: "Comparativa",
          title: `Precios y ROI en los barrios de ${entry.city.name}`,
          district: "Barrio",
          median: "Mediana €/m²",
          roi: "ROI",
          growth: "Interanual",
          current: " (este barrio)",
        }
      : locale === "en"
        ? {
            eyebrow: "Comparison",
            title: `Prices and ROI in ${entry.city.name} districts`,
            district: "District",
            median: "Median €/m²",
            roi: "ROI",
            growth: "YoY",
            current: " (this district)",
          }
        : {
            eyebrow: "Porównanie",
            title: `Ceny i ROI w dzielnicach ${entry.city.nameGenitive}`,
            district: "Dzielnica",
            median: "Mediana €/m²",
            roi: "ROI",
            growth: "r/r",
            current: " (ta dzielnica)",
          };

  // Nazwa dzielnicy w tabeli → link do jej raportu (mapowanie po nazwie).
  const slugByName = new Map(entry.city.districts.map((item) => [item.name, item.slug]));

  const crumbs: Crumb[] = [
    { name: ui.home, path: "/" },
    { name: PRICE_REPORT.name, path: `/${PRICE_REPORT.slug}` },
    { name: entry.city.name, path: `/${PRICE_REPORT.slug}` },
    { name: entry.district.name, path },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-page py-10 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {locale === "es" ? "Informe de mercado" : locale === "en" ? "Market report" : "Raport rynkowy"} ·{" "}
            {report.stats.dataAsOf}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-brand-950 sm:text-4xl">
            {report.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-700">{report.lead}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: copy.colMedian, value: `${formatPrice(report.stats.pricePerM2)} €/m²` },
              { label: locale === "es" ? "Rentabilidad bruta" : locale === "en" ? "Gross yield" : "ROI brutto", value: formatRate(report.stats.rentalYield) },
              { label: locale === "es" ? "Crecimiento interanual" : locale === "en" ? "Growth YoY" : "Wzrost r/r", value: formatRate(report.stats.priceGrowth) },
              { label: locale === "es" ? "Tiempo de venta" : locale === "en" ? "Time to sell" : "Czas sprzedaży", value: `${report.stats.avgDaysOnMarket} ${locale === "es" ? "días" : locale === "en" ? "days" : "dni"}` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-brand-100 bg-white px-4 py-3"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-brand-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-bold text-brand-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContentBlocks blocks={report.blocks} />

      <Section className="bg-brand-50/40">
        <InvestorWorkbench
          locale={locale}
          cityName={entry.district.name}
          rates={{
            pricePerM2: report.stats.pricePerM2,
            rentalYield: report.stats.rentalYield,
            netYield: report.stats.netYield,
            priceGrowth: report.stats.priceGrowth,
          }}
          districts={entry.city.districts.map((item) => {
            const itemStats = deriveDistrictStats(entry.city, item, entry.region);
            return {
              slug: item.slug,
              name: item.name,
              pricePerM2: itemStats.pricePerM2,
              rentalYield: itemStats.rentalYield,
              netYield: itemStats.netYield,
              demandIndex: item.demandIndex,
              days: itemStats.avgDaysOnMarket,
            };
          })}
          districtBasePath={translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}`, locale)}
          ctaHref="#formularz"
        />
      </Section>

      <Section className="pt-0">
        <PurchaseCostsCalculator
          locale={locale}
          cityName={entry.district.name}
          itp={regionTax(entry.city.region).itp}
          authority={regionTax(entry.city.region).authority}
          rentalYield={report.stats.rentalYield}
          ctaHref="#formularz"
        />
      </Section>

      <Section className="bg-white pt-0">
        <SectionHeading eyebrow={tableUi.eyebrow}>{tableUi.title}</SectionHeading>
        <div className="overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full min-w-[560px] text-sm">
            <caption className="sr-only">
              {locale === "es"
                ? `Mediana del precio por metro, rentabilidad del alquiler y evolución en las zonas de ${entry.city.name}`
                : locale === "en"
                  ? `Median price per square metre, rental yield and price growth across areas of ${entry.city.name}`
                  : `Mediana ceny za metr kwadratowy, rentowność najmu i dynamika cen w dzielnicach miasta ${entry.city.name}`}
            </caption>
            <thead className="bg-brand-50 text-left text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3">
                  {tableUi.district}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {tableUi.median}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {tableUi.roi}
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  {tableUi.growth}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.name}
                  className={
                    row.isCurrent ? "bg-accent-50 font-semibold" : "odd:bg-white even:bg-brand-50/40"
                  }
                >
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    {slugByName.get(row.name) ? (
                      <Link
                        href={translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}/${slugByName.get(row.name)}`, locale)}
                        className="text-brand-900 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                      >
                        {row.name}
                      </Link>
                    ) : (
                      row.name
                    )}
                    {row.isCurrent ? tableUi.current : null}
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{formatEur(row.pricePerM2)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(row.rentalYield)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatRate(row.priceGrowth)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-600">
          {locale === "es"
            ? `Contexto de mercado: la mediana de ${entry.region.name} es ${formatEur(entry.region.medianPricePerM2)}/m² y la media de España ronda ${formatEur(COUNTRY_MEDIAN_PRICE_PER_M2)}/m². La diferencia refleja la prima de ubicación de la costa.`
            : locale === "en"
              ? `Market context: the median for ${entry.region.name} is ${formatEur(entry.region.medianPricePerM2)}/m², while the Spanish average is about ${formatEur(COUNTRY_MEDIAN_PRICE_PER_M2)}/m². The gap reflects the coastal location premium.`
              : `Kontekst rynkowy: mediana ofertowa w ${entry.region.name} to ${formatEur(entry.region.medianPricePerM2)}/m², a średnia dla Hiszpanii około ${formatEur(COUNTRY_MEDIAN_PRICE_PER_M2)}/m². Różnica pokazuje premię lokalizacyjną wybrzeża.`}
        </p>
      </Section>

      <FaqAccordion
        items={report.faq}
        title={
          locale === "es"
            ? `FAQ. Precios y rentabilidad en ${entry.district.nameLocative}`
            : locale === "en"
              ? `FAQ. Prices and yields in ${entry.district.nameLocative}`
              : `FAQ. Ceny i ROI w ${entry.district.nameLocative}`
        }
      />

      <Section className="bg-brand-50/60">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading eyebrow={locale === "es" ? "Ofertas" : locale === "en" ? "Listings" : "Oferty"}>
              {locale === "es" ? `¿Quieres comprar en ${entry.district.nameLocative}?` : locale === "en" ? `Want to buy in ${entry.district.nameLocative}?` : `Chcesz kupić w ${entry.district.nameLocative}?`}
            </SectionHeading>
            <p className="max-w-xl text-sm leading-relaxed text-brand-700">
              {locale === "es"
              ? "Ya conoces los precios y la rentabilidad. Envía tu presupuesto: preparamos de 3 a 5 ofertas con retorno calculado y todos los gastos de compra."
              : locale === "en"
                ? "You know the prices and yields. Send your budget: we shortlist 3-5 properties with the return modelled and the full cost of buying."
                : "Znasz już ceny i ROI. Wyślij zgłoszenie z budżetem. Przygotujemy 3-5 ofert z wyliczonym zwrotem i pełnymi kosztami zakupu."}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-700">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={translatePath(`/${service.slug}/${entry.city.slug}/${entry.district.slug}`, locale)}
                    className="font-medium text-brand-900 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700"
                  >
                    {getServiceCopy(service.kind, locale).name} - {entry.district.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id="formularz" className="scroll-mt-24">
            <LeadEngine
              language={locale}
              cityName={entry.city.name}
              districtName={entry.district.name}
              sourceKey={report.key}
              hideCalculator
              rates={{
                rentalYield: report.stats.rentalYield,
                netYield: report.stats.netYield,
                priceGrowth: report.stats.priceGrowth,
                pricePerM2: report.stats.pricePerM2,
              }}
            />
          </div>
        </div>
      </Section>

      <InternalLinks
        groups={[
          {
            title:
              locale === "es"
                ? `Otras zonas de ${entry.city.name}`
                : locale === "en"
                  ? `Other areas of ${entry.city.name}`
                  : `Inne dzielnice ${entry.city.nameGenitive}`,
            links: entry.city.districts
              .filter((item) => item.slug !== entry.district.slug)
              .map((item) => ({
                href: translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}/${item.slug}`, locale),
                label: item.name,
              })),
          },
          {
            title:
              locale === "es"
                ? `Servicios en ${entry.city.name}`
                : locale === "en"
                  ? `Services in ${entry.city.name}`
                  : `Usługi w ${entry.city.nameLocative}`,
            links: SERVICES.map((item) => ({
              href: translatePath(`/${item.slug}/${entry.city.slug}`, locale),
              label: getServiceCopy(item.kind, locale).name,
            })),
          },
          {
            title: locale === "es" ? "Informes" : locale === "en" ? "Reports" : "Raporty",
            links: [
              {
                href: translatePath(`/${PRICE_REPORT.slug}/${entry.city.slug}`, locale),
                label:
                  locale === "es"
                    ? `Precios en ${entry.city.name}`
                    : locale === "en"
                      ? `Prices in ${entry.city.name}`
                      : `Ceny w ${entry.city.nameLocative}`,
              },
              { href: translatePath(`/${PRICE_REPORT.slug}`, locale), label: PRICE_REPORT.name },
            ],
          },
        ]}
      />

      <PriceHistorySection
        history={getPriceHistory(locale, {
          current: report.stats.pricePerM2,
          growth: report.stats.priceGrowth,
          seed: `${entry.city.slug}/${entry.district.slug}`,
        })}
      />

      <JsonLd
        nodes={[
          breadcrumbNode(crumbs),
          datasetNode({
            locale,
            name: report.h1,
            description: report.metaDescription,
            path,
            spatialName: `${entry.district.name}, ${entry.city.name}`,
            temporalCoverage: `${report.stats.dataAsOf}/2026`,
          }),
          faqNode(report.faq, path, locale),
        ]}
      />
    </>
  );
}
