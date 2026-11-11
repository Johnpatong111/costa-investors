"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { publishBudget } from "@/lib/tools/budget-bus";
import type { Locale } from "@/lib/i18n/config";
import { STRESS_COPY } from "@/lib/i18n/tool-copy";
import { bufferMonths, computeStress } from "@/lib/tools/stress";
import { formatEur } from "@/lib/utils/format";

export interface StressTestProps {
  locale: Locale;
  placeName: string;
  /** Cena referencyjna: 70 m² po cenie z rynku. */
  price: number;
  /** Czynsz netto miesięcznie dla tej ceny. */
  netRentMonthly: number;
  /** Koszty stałe miesięcznie: IBI, comunidad, ubezpieczenie. */
  monthlyCosts: number;
  /** Poziom nagłówka: h2 samodzielnie, h3 w zakładkach. */
  headingLevel?: "h2" | "h3";
}

export function StressTest({
  locale,
  placeName,
  price,
  netRentMonthly,
  monthlyCosts,
  headingLevel = "h2",
}: StressTestProps) {
  const copy = STRESS_COPY[locale];
  const Heading = headingLevel;
  const [purchasePrice, setPurchasePrice] = useState(Math.round(price));
  const [ltv, setLtv] = useState(70);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(25);
  const [rent, setRent] = useState(Math.round(netRentMonthly));
  const [costs, setCosts] = useState(Math.round(monthlyCosts));

  const pricePublished = useRef(false);
  useEffect(() => {
    if (!pricePublished.current) {
      pricePublished.current = true;
      return;
    }
    publishBudget(purchasePrice);
  }, [purchasePrice]);

  const model = useMemo(
    () =>
      computeStress({
        price: purchasePrice,
        ltv,
        rate,
        years,
        monthlyRent: rent,
        monthlyCosts: costs,
      }),
    [purchasePrice, ltv, rate, years, rent, costs],
  );

  const combo = model.scenarios.find((scenario) => scenario.id === "combo");
  const buffer = combo ? bufferMonths(combo, rent) : 0;
  const priceDrop = model.scenarios.find((scenario) => scenario.id === "price");
  const money = (value: number) => formatEur(Math.round(value));

  const scenarioLabels: Record<string, string> = {
    base: copy.scenarios.base,
    rate: copy.scenarios.rate,
    rent: copy.scenarios.rent,
    vacancy: copy.scenarios.vacancy,
    price: copy.scenarios.price,
    combo: copy.scenarios.combo,
  };

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
          <ShieldCheck aria-hidden className="h-3.5 w-3.5" />
          {copy.eyebrow}
        </p>
        <Heading className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(placeName)}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            label: copy.inputs.price,
            value: purchasePrice,
            set: setPurchasePrice,
            min: 50_000,
            max: 3_000_000,
            step: 10_000,
          },
          { label: copy.inputs.ltv, value: ltv, set: setLtv, min: 0, max: 100, step: 5 },
          { label: copy.inputs.rate, value: rate, set: setRate, min: 0, max: 12, step: 0.1 },
          { label: copy.inputs.years, value: years, set: setYears, min: 5, max: 40, step: 1 },
          { label: copy.inputs.rent, value: rent, set: setRent, min: 0, max: 8_000, step: 25 },
          { label: copy.inputs.costs, value: costs, set: setCosts, min: 0, max: 2_000, step: 10 },
        ].map((field) => (
          <label
            key={field.label}
            className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase"
          >
            {field.label}
            <input
              type="number"
              inputMode="decimal"
              min={field.min}
              max={field.max}
              step={field.step}
              value={field.value}
              onChange={(event) => {
                const next = Number(event.target.value);
                field.set(
                  Number.isFinite(next) ? Math.max(field.min, Math.min(next, field.max)) : field.min,
                );
              }}
              className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2.5 text-base font-semibold tabular-nums text-brand-950 focus:border-brand-500 focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[
          { label: copy.summary.loan, value: money(model.loan) },
          { label: copy.summary.payment, value: money(model.payment) },
          {
            label: copy.summary.cashFlow,
            value: money(model.baseCashFlow),
            tone: model.baseCashFlow >= 0 ? "good" : "bad",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-brand-500">{item.label}</p>
            <p
              className={
                item.tone === "bad"
                  ? "mt-1 text-lg font-bold tabular-nums text-rose-700"
                  : item.tone === "good"
                    ? "mt-1 text-lg font-bold tabular-nums text-emerald-700"
                    : "mt-1 text-lg font-bold tabular-nums text-brand-950"
              }
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-brand-100">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-brand-50 text-left text-[11px] uppercase tracking-wide text-brand-600">
            <tr>
              <th scope="col" className="px-3 py-3">
                {copy.columns.scenario}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.payment}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.cashFlow}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.dscr}
              </th>
              <th scope="col" className="px-3 py-3 text-right">
                {copy.columns.equity}
              </th>
            </tr>
          </thead>
          <tbody>
            {model.scenarios.map((scenario) => (
              <tr
                key={scenario.id}
                className={scenario.id === "base" ? "bg-white" : "odd:bg-white even:bg-brand-50/40"}
              >
                <th scope="row" className="px-3 py-2 text-left font-medium text-brand-800">
                  {scenarioLabels[scenario.id] ?? scenario.id}
                </th>
                <td className="px-3 py-2 text-right tabular-nums">{money(scenario.payment)}</td>
                <td
                  className={
                    scenario.cashFlow >= 0
                      ? "px-3 py-2 text-right font-semibold tabular-nums text-emerald-700"
                      : "px-3 py-2 text-right font-semibold tabular-nums text-rose-700"
                  }
                >
                  {money(scenario.cashFlow)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {Number.isFinite(scenario.dscr) ? scenario.dscr.toFixed(2) : "-"}
                </td>
                <td
                  className={
                    scenario.underwater
                      ? "px-3 py-2 text-right tabular-nums text-rose-700"
                      : "px-3 py-2 text-right tabular-nums"
                  }
                >
                  {money(scenario.equity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="text-xs leading-relaxed text-brand-700">
          {buffer > 0 ? copy.summary.buffer(buffer) : copy.summary.bufferNone}
        </p>
        {priceDrop?.underwater ? (
          <p className="inline-flex items-start gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800">
            <AlertTriangle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {copy.summary.underwater}
          </p>
        ) : null}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-brand-500">{copy.note}</p>
    </div>
  );
}
