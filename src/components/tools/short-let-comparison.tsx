"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BedDouble, Info, KeyRound } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { SHORTLET_COPY } from "@/lib/i18n/tool-copy";
import { computeShortLet } from "@/lib/tools/short-let";
import { formatEur, formatRate } from "@/lib/utils/format";

export interface ShortLetProps {
  locale: Locale;
  cityName: string;
  pricePerM2: number;
  rentalYield: number;
  ctaHref: string;
}

const REFERENCE_M2 = 70;

export function ShortLetComparison({ locale, cityName, pricePerM2, rentalYield, ctaHref }: ShortLetProps) {
  const copy = SHORTLET_COPY[locale];
  const price = Math.round(pricePerM2 * REFERENCE_M2);
  const defaultRent = Math.max(400, Math.round(((price * rentalYield) / 100) / 12));
  const defaultNightly = Math.max(40, Math.round((defaultRent / 30) * 2.4));

  const [nightly, setNightly] = useState(defaultNightly);
  const [occupancy, setOccupancy] = useState(65);
  const [monthlyRent, setMonthlyRent] = useState(defaultRent);

  const model = useMemo(
    () => computeShortLet({ price, nightly, occupancy, monthlyRent }),
    [occupancy, nightly, monthlyRent, price],
  );

  const money = (value: number) => formatEur(Math.round(value));
  const percent = (value: number) =>
    `${value.toFixed(1).replace(".", locale === "en" ? "." : ",")}%`;

  const winner =
    Math.abs(model.diff) < 250
      ? copy.result.tie
      : model.diff > 0
        ? copy.result.winnerShort(money(model.diff))
        : copy.result.winnerLong(money(Math.abs(model.diff)));

  const breakEvenLabel =
    Number.isFinite(model.breakEven) && model.breakEven > 0 && model.breakEven <= 100
      ? percent(model.breakEven)
      : null;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
          <BedDouble aria-hidden className="h-3.5 w-3.5" />
          {copy.eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(cityName)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead}</p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
          {copy.inputs.nightly}
          <input
            type="number"
            inputMode="numeric"
            min={20}
            max={1200}
            step={5}
            value={nightly}
            onChange={(event) => {
              const next = Number(event.target.value);
              setNightly(Number.isFinite(next) ? Math.max(0, Math.min(next, 1200)) : 0);
            }}
            className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2.5 text-base font-semibold tabular-nums text-brand-950 focus:border-brand-500 focus:outline-none"
          />
        </label>

        <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
          {copy.inputs.occupancy}
          <span className="mt-1 flex items-center gap-2">
            <input
              type="range"
              min={10}
              max={95}
              step={1}
              value={occupancy}
              onChange={(event) => setOccupancy(Number(event.target.value))}
              className="w-full accent-emerald-600"
              aria-label={copy.inputs.occupancy}
            />
            <span className="w-12 text-right text-base font-bold tabular-nums text-brand-950">
              {occupancy}%
            </span>
          </span>
        </label>

        <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
          {copy.inputs.monthlyRent}
          <input
            type="number"
            inputMode="numeric"
            min={200}
            max={6000}
            step={25}
            value={monthlyRent}
            onChange={(event) => {
              const next = Number(event.target.value);
              setMonthlyRent(Number.isFinite(next) ? Math.max(0, Math.min(next, 6000)) : 0);
            }}
            className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2.5 text-base font-semibold tabular-nums text-brand-950 focus:border-brand-500 focus:outline-none"
          />
        </label>
      </div>
      <div className="mt-5 overflow-x-auto rounded-xl border border-brand-100">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-brand-50 text-left text-[11px] uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-3 py-2.5">
                {copy.columns.item}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right">
                {copy.columns.short}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right">
                {copy.columns.long}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: copy.rows.income, short: money(model.shortGross), long: money(model.longGross) },
              { label: copy.rows.costs, short: `-${money(model.shortCosts)}`, long: `-${money(model.longCosts)}` },
              { label: copy.rows.net, short: money(model.shortNet), long: money(model.longNet), strong: true },
              { label: copy.rows.monthly, short: money(model.shortMonthly), long: money(model.longMonthly) },
              { label: copy.rows.yield, short: percent(model.shortYield), long: percent(model.longYield) },
              { label: copy.rows.nightCost, short: money(model.shortPerNight), long: money(model.longPerNight) },
            ].map((row) => (
              <tr key={row.label} className="odd:bg-white even:bg-brand-50/40">
                <th scope="row" className="px-3 py-2 text-left font-medium text-brand-700">
                  {row.label}
                </th>
                <td
                  className={
                    row.strong
                      ? "px-3 py-2 text-right font-bold tabular-nums text-emerald-700"
                      : "px-3 py-2 text-right tabular-nums text-brand-900"
                  }
                >
                  {row.short}
                </td>
                <td
                  className={
                    row.strong
                      ? "px-3 py-2 text-right font-bold tabular-nums text-emerald-700"
                      : "px-3 py-2 text-right tabular-nums text-brand-900"
                  }
                >
                  {row.long}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-brand-950 px-4 py-3 text-white">
        <p className="text-sm font-bold">{winner}</p>
        {breakEvenLabel ? (
          <p className="mt-1 text-xs leading-relaxed text-brand-100">
            {copy.result.breakEven(breakEvenLabel)} {copy.result.breakEvenHint}
          </p>
        ) : null}
      </div>

      <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/40 p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase">
          <KeyRound aria-hidden className="h-3.5 w-3.5" />
          {copy.assumptionsTitle}
        </p>
        <ul className="mt-2 grid gap-1 text-[11px] leading-snug text-brand-600 sm:grid-cols-2">
          {copy.assumptions.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-brand-500">
        <Info aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
        {copy.note}
      </p>

      <Link
        href={ctaHref}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-800"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
