"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, RotateCcw, Search } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import {
  activeFilterCount,
  DEFAULT_RANKING_FILTERS,
  filterRankingRows,
  type RankingFilters,
} from "@/lib/tools/ranking";
import { formatEur, formatRate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface RankingTableRow {
  rank: number;
  districtName: string;
  cityName: string;
  href: string;
  cityHref: string;
  pricePerM2: number;
  rentalYield: number;
  netYield: number;
  growth: number;
  days: number;
  demand: number;
  area: number;
}

/**
 * Tabela rankingu z filtrami po stronie klienta. Domyślnie renderuje wszystkie
 * 89 wierszy (SSR), więc crawler widzi pełną treść; filtry tylko ukrywają
 * wiersze, nie usuwają ich z HTML przy pierwszym renderze.
 */
export function RankingTable({ locale, rows }: { locale: Locale; rows: RankingTableRow[] }) {
  const copy = RANKING_COPY[locale];
  const [filters, setFilters] = useState<RankingFilters>(DEFAULT_RANKING_FILTERS);

  const visible = useMemo(() => filterRankingRows(rows, filters), [rows, filters]);
  const activeCount = activeFilterCount(filters);

  const update = (patch: Partial<RankingFilters>) =>
    setFilters((previous) => ({ ...previous, ...patch }));

  return (
    <div data-ranking-filters>
      <div className="rounded-xl border border-brand-100 bg-white p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase">
            <Filter aria-hidden className="h-3.5 w-3.5" />
            {copy.filtersTitle}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-brand-500" aria-live="polite">
              {copy.filterResults(visible.length, rows.length)}
            </span>
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_RANKING_FILTERS)}
                className="inline-flex min-h-[44px] items-center gap-1 rounded-full border border-brand-200 px-3 text-xs font-semibold text-brand-700 transition hover:border-brand-400"
              >
                <RotateCcw aria-hidden className="h-3 w-3" />
                {copy.filterReset}
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
            {copy.filterSearch}
            <span className="relative mt-1 block">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-400"
              />
              <input
                type="search"
                value={filters.query}
                onChange={(event) => update({ query: event.target.value })}
                className="h-11 w-full rounded-lg border border-brand-200 pl-9 pr-3 text-sm text-brand-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </span>
          </label>

          <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
            {copy.filterYield}
            <span className="mt-1 flex h-11 items-center gap-2">
              <input
                type="range"
                min={0}
                max={7}
                step={0.5}
                value={filters.minNetYield}
                onChange={(event) => update({ minNetYield: Number(event.target.value) })}
                className="w-full accent-emerald-600"
                aria-label={copy.filterYield}
              />
              <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-brand-950">
                {filters.minNetYield > 0
                  ? `${filters.minNetYield.toFixed(1).replace(".", locale === "en" ? "." : ",")}%`
                  : copy.filterAny}
              </span>
            </span>
          </label>

          <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
            {copy.filterDays}
            <span className="mt-1 flex h-11 items-center gap-2">
              <input
                type="range"
                min={0}
                max={240}
                step={10}
                value={filters.maxDays}
                onChange={(event) => update({ maxDays: Number(event.target.value) })}
                className="w-full accent-brand-700"
                aria-label={copy.filterDays}
              />
              <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-brand-950">
                {filters.maxDays > 0 ? filters.maxDays : copy.filterAny}
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-brand-100">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-brand-50 text-left text-[11px] uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.rank}
              </th>
              <th scope="col" className="px-3 py-3">
                {copy.columns.district}
              </th>
              <th scope="col" className="px-3 py-3">
                {copy.columns.city}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.price}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.roiGross}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.roiNet}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.growth}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.days}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.demand}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.area}
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={`${row.cityHref}/${row.districtName}`} className="odd:bg-white even:bg-brand-50/40">
                <td className="px-3 py-2 text-right tabular-nums text-brand-500">{row.rank}</td>
                <th scope="row" className="px-3 py-2 text-left font-medium">
                  <Link
                    href={row.href}
                    className="text-brand-900 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                  >
                    {row.districtName}
                  </Link>
                </th>
                <td className="px-3 py-2">
                  <Link
                    href={row.cityHref}
                    className="text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-900"
                  >
                    {row.cityName}
                  </Link>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{formatEur(row.pricePerM2)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatRate(row.rentalYield)}</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-emerald-700">
                  {formatRate(row.netYield)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{formatRate(row.growth)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{row.days}</td>
                <td className="px-3 py-2 text-right tabular-nums">{row.demand}/10</td>
                <td className="px-3 py-2 text-right tabular-nums">{row.area} m²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 ? (
        <p className="mt-3 rounded-lg border border-brand-100 bg-brand-50/60 px-3 py-2 text-sm text-brand-700">
          {copy.filterEmpty}
        </p>
      ) : null}
    </div>
  );
}
