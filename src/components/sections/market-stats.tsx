"use client";

import { usePathname } from "next/navigation";
import { Badge, Section, SectionHeading } from "@/components/ui/primitives";
import type { MarketStats } from "@/lib/content/market-stats";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";
import { getStatsCopy } from "@/lib/i18n/analytics-copy-2";
import { getExtraIndicators } from "@/lib/i18n/analytics-extra";
import { formatEur, formatPrice, formatRate } from "@/lib/utils/format";

/**
 * Kafelki statystyk, tabela porównawcza i wnioski dla inwestora.
 * Wszystkie etykiety pochodzą ze słownika dopasowanego do `/[lang]/`.
 */
export function MarketStatsSection({
  stats,
  locationName,
  cityName,
  regionName = "Region",
}: {
  stats: MarketStats;
  locationName: string;
  cityName: string;
  regionName?: string;
}) {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const copy = getStatsCopy(locale);

  const cards = [
    { label: copy.cards.median, value: `${formatPrice(stats.pricePerM2)} €/m²` },
    { label: copy.cards.growth, value: formatRate(stats.priceGrowth) },
    { label: copy.cards.roiGross, value: formatRate(stats.rentalYield) },
    { label: copy.cards.roiNet, value: formatRate(stats.netYield) },
    { label: copy.cards.rent, value: `${formatPrice(stats.monthlyRentPerM2)} €/m²` },
    { label: copy.cards.days, value: copy.daysUnit(stats.avgDaysOnMarket) },
  ];

  const rows = [
    { name: locationName, price: stats.pricePerM2, highlight: true },
    { name: cityName, price: stats.cityPricePerM2, highlight: false },
    { name: copy.regionRow(regionName), price: stats.regionPricePerM2, highlight: false },
  ];

  const extra = getExtraIndicators(locale, {
    pricePerM2: stats.pricePerM2,
    cityPricePerM2: stats.cityPricePerM2,
    regionPricePerM2: stats.regionPricePerM2,
    monthlyRentPerM2: stats.monthlyRentPerM2,
    rentalYield: stats.rentalYield,
    netYield: stats.netYield,
    avgDaysOnMarket: stats.avgDaysOnMarket,
    demandIndex: stats.demandIndex,
    purchaseCostsRate: stats.purchaseCostsRate,
    foreignBuyerShare: stats.foreignBuyerShare,
    transactions12m: stats.transactions12m,
  });

  return (
    <Section className="bg-white pt-10">
      <SectionHeading eyebrow={copy.eyebrow(stats.dataAsOf)}>
        {copy.title(locationName)}
      </SectionHeading>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3">
            <dt className="text-[11px] font-semibold tracking-wide text-brand-500 uppercase">
              {card.label}
            </dt>
            <dd className="mt-1 text-lg font-bold text-brand-950">{card.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/40 p-4">
        <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
          {copy.insightTitle}
        </p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {extra.map((item) => (
            <div key={item.label} className="rounded-lg bg-white px-3 py-2.5">
              <dt className="text-[11px] font-semibold text-brand-500">{item.label}</dt>
              <dd className="mt-0.5 text-base font-bold tabular-nums text-brand-950">{item.value}</dd>
              {item.hint ? (
                <dd className="mt-0.5 text-[10px] leading-snug text-brand-500">{item.hint}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <caption className="sr-only">{copy.caption(locationName)}</caption>
            <thead className="bg-brand-50 text-left text-xs tracking-wide text-brand-600 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">{copy.thArea}</th>
                <th scope="col" className="px-4 py-3 text-right">{copy.thMedian}</th>
                <th scope="col" className="px-4 py-3 text-right">{copy.thDiff}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const diff =
                  row.highlight || row.price === 0 ? 0 : (stats.pricePerM2 - row.price) / row.price;
                return (
                  <tr
                    key={row.name}
                    className={
                      row.highlight ? "bg-accent-50 font-semibold" : "odd:bg-white even:bg-brand-50/40"
                    }
                  >
                    <th scope="row" className="px-4 py-3 text-left font-medium">{row.name}</th>
                    <td className="px-4 py-3 text-right tabular-nums">{formatEur(row.price)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {row.highlight ? "-" : formatRate(diff * 100, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5">
          <p className="text-sm font-semibold text-brand-950">{copy.insightTitle}</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-brand-700">
            <li>{copy.insightDemand(copy.demand(stats.demandIndex), stats.avgDaysOnMarket)}</li>
            <li>{copy.insightRent(formatRate(stats.rentalYield), formatRate(stats.netYield))}</li>
            <li>{copy.insightCosts(formatRate(stats.purchaseCostsRate * 100))}</li>
            <li>
              {copy.insightBuyers(
                formatRate(stats.foreignBuyerShare, 0),
                formatRate(stats.polishBuyerShare, 0),
              )}
            </li>
          </ul>
          <div className="mt-4">
            <Badge tone={stats.reliable ? "positive" : "warning"}>
              {stats.reliable ? copy.badgeOk : copy.badgeWarn}
            </Badge>
          </div>
        </div>
      </div>
    </Section>
  );
}
