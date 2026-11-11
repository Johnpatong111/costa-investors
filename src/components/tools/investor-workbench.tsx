"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Calculator, Check, Copy, Info } from "lucide-react";
import type { MarketRates } from "@/lib/leads/investment";
import type { Locale } from "@/lib/i18n/config";
import { WORKBENCH_COPY } from "@/lib/i18n/tool-copy";
import { formatEur } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface WorkbenchDistrict {
  slug: string;
  name: string;
  pricePerM2: number;
  rentalYield: number;
  netYield: number;
  demandIndex: number;
  days: number;
}

export interface InvestorWorkbenchProps {
  locale: Locale;
  cityName: string;
  rates: MarketRates;
  districts: WorkbenchDistrict[];
  /** Ścieżka bazowa raportów dzielnic, np. "/ceny-m2/alicante". */
  districtBasePath: string;
  ctaHref: string;
}

const PURCHASE_COSTS = 0.135;
const PRESETS = [150_000, 250_000, 350_000, 500_000];

type Scenario = "year" | "season";
type Financing = "cash" | "mortgage";
type SortKey = "price" | "yield" | "demand" | "days" | "area" | "rent";

/** Rata annuitetowa: kapitał, stopa roczna %, liczba miesięcy. */
function annuity(paymentBase: number, annualRate: number, months: number): number {
  if (paymentBase <= 0 || months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return paymentBase / months;
  return (paymentBase * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export function InvestorWorkbench({
  locale,
  cityName,
  rates,
  districts,
  districtBasePath,
  ctaHref,
}: InvestorWorkbenchProps) {
  const copy = WORKBENCH_COPY[locale];
  const [budget, setBudget] = useState(250_000);
  const [scenario, setScenario] = useState<Scenario>("year");
  const [financing, setFinancing] = useState<Financing>("cash");
  const [ltv, setLtv] = useState(70);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(25);
  const [sortKey, setSortKey] = useState<SortKey>("rent");
  const [sortDesc, setSortDesc] = useState(true);
  const [copied, setCopied] = useState(false);

  // Parametry w URL: wyliczenie można wysłać klientowi i do niego wrócić.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlBudget = Number(params.get("budzet"));
    if (Number.isFinite(urlBudget) && urlBudget >= 50_000) {
      setBudget(Math.min(urlBudget, 2_000_000));
    }
    const urlScenario = params.get("profil");
    if (urlScenario === "sezon" || urlScenario === "season") setScenario("season");
    const urlFinancing = params.get("finansowanie");
    if (urlFinancing === "kredyt" || urlFinancing === "mortgage") setFinancing("mortgage");
    const urlLtv = Number(params.get("ltv"));
    if (Number.isFinite(urlLtv) && urlLtv >= 10 && urlLtv <= 80) setLtv(urlLtv);
  }, []);

  const months = scenario === "season" ? 8 : 12;

  const result = useMemo(() => {
    const areaM2 = rates.pricePerM2 > 0 ? Math.round(budget / rates.pricePerM2) : 0;
    const purchaseCosts = Math.round(budget * PURCHASE_COSTS);
    const rentGross = Math.round(((budget * rates.rentalYield) / 100) * (months / 12));
    const netRatio = rates.rentalYield > 0 ? rates.netYield / rates.rentalYield : 0.7;
    const rentNet = Math.round(rentGross * netRatio);
    const netYieldPct = budget > 0 ? (rentNet / budget) * 100 : 0;
    const value5 = Math.round(budget * Math.pow(1 + rates.priceGrowth / 100, 5));
    const totalReturn = value5 - budget + rentNet * 5;
    const loan = financing === "mortgage" ? Math.round((budget * ltv) / 100) : 0;
    const payment = financing === "mortgage" ? Math.round(annuity(loan, rate, years * 12)) : 0;
    const cashInvested = Math.max(1, budget - loan + purchaseCosts);
    const cashOnCash = ((rentNet - payment * 12) / cashInvested) * 100;
    const cashFlow = Math.round(rentNet / 12 - payment);
    return {
      areaM2,
      purchaseCosts,
      rentGross,
      rentNet,
      netYieldPct,
      value5,
      totalReturn,
      payment,
      cashInvested,
      cashOnCash,
      cashFlow,
    };
  }, [budget, months, financing, ltv, rate, years, rates]);

  const rows = useMemo(() => {
    const netRatio = rates.rentalYield > 0 ? rates.netYield / rates.rentalYield : 0.7;
    const computed = districts.map((district) => {
      const area = district.pricePerM2 > 0 ? Math.round(budget / district.pricePerM2) : 0;
      const rentNet = Math.round(
        ((budget * (district.rentalYield * netRatio)) / 100) * (months / 12),
      );
      return { ...district, area, rentNet, netYield: district.rentalYield * netRatio };
    });
    const best = computed.reduce<WorkbenchDistrict & { area: number; rentNet: number; netYield: number } | null>(
      (winner, row) => (!winner || row.netYield > winner.netYield ? row : winner),
      null,
    );
    const sorted = [...computed].sort((a, b) => {
      const delta =
        sortKey === "price"
          ? a.pricePerM2 - b.pricePerM2
          : sortKey === "yield"
            ? a.rentalYield - b.rentalYield
            : sortKey === "demand"
              ? a.demandIndex - b.demandIndex
              : sortKey === "days"
                ? a.days - b.days
                : sortKey === "area"
                  ? a.area - b.area
                  : a.rentNet - b.rentNet;
      return sortDesc ? -delta : delta;
    });
    return { sorted, bestSlug: best?.slug ?? "" };
  }, [districts, budget, months, sortKey, sortDesc, rates]);

  function toggleSort(next: SortKey) {
    if (next === sortKey) {
      setSortDesc((value) => !value);
      return;
    }
    setSortKey(next);
    setSortDesc(next !== "price" && next !== "days");
  }

  async function copyLink() {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("budzet", String(budget));
    params.set("profil", scenario === "season" ? "sezon" : "rok");
    params.set("finansowanie", financing === "mortgage" ? "kredyt" : "gotowka");
    if (financing === "mortgage") params.set("ltv", String(ltv));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const money = (value: number) => formatEur(Math.round(value));
  const percent = (value: number, digits = 1) =>
    `${value.toFixed(digits).replace(".", locale === "en" ? "." : ",")}%`;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
            <Calculator aria-hidden className="h-3.5 w-3.5" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(cityName)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead(cityName)}</p>
        </div>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-900"
        >
          {copied ? (
            <Check aria-hidden className="h-3.5 w-3.5" />
          ) : (
            <Copy aria-hidden className="h-3.5 w-3.5" />
          )}
          {copied ? copy.shareCopied : copy.shareLabel}
        </button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <fieldset>
            <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
              {copy.budgetLegend}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBudget(preset)}
                  aria-pressed={budget === preset}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold tabular-nums transition",
                    budget === preset
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-brand-200 text-brand-700 hover:border-brand-400",
                  )}
                >
                  {money(preset)}
                </button>
              ))}
            </div>
            <label className="mt-3 block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
              {copy.budgetLabel}
              <input
                type="number"
                inputMode="numeric"
                min={50_000}
                max={2_000_000}
                step={10_000}
                value={budget}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setBudget(Number.isFinite(next) ? Math.max(0, Math.min(next, 2_000_000)) : 0);
                }}
                className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2 text-base font-semibold tabular-nums text-brand-950 focus:border-brand-500 focus:outline-none"
              />
            </label>
            <input
              type="range"
              min={80_000}
              max={900_000}
              step={10_000}
              value={Math.min(Math.max(budget, 80_000), 900_000)}
              onChange={(event) => setBudget(Number(event.target.value))}
              aria-label={copy.budgetLabel}
              className="mt-3 w-full accent-brand-600"
            />
          </fieldset>
          <fieldset>
            <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
              {copy.scenarioLegend}
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {copy.scenarios.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setScenario(item.id)}
                  aria-pressed={scenario === item.id}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left transition",
                    scenario === item.id
                      ? "border-brand-600 bg-brand-50"
                      : "border-brand-200 hover:border-brand-400",
                  )}
                >
                  <span className="block text-sm font-bold text-brand-900">{item.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-brand-600">
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
              {copy.financingLegend}
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {copy.financing.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFinancing(item.id)}
                  aria-pressed={financing === item.id}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left transition",
                    financing === item.id
                      ? "border-brand-600 bg-brand-50"
                      : "border-brand-200 hover:border-brand-400",
                  )}
                >
                  <span className="block text-sm font-bold text-brand-900">{item.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-brand-600">
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
            {financing === "mortgage" ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <label className="text-[11px] font-semibold text-brand-600 uppercase">
                  {copy.ltvLabel}
                  <input
                    type="number"
                    min={10}
                    max={80}
                    step={5}
                    value={ltv}
                    onChange={(event) =>
                      setLtv(Math.min(80, Math.max(10, Number(event.target.value) || 0)))
                    }
                    className="mt-1 w-full rounded-lg border border-brand-200 px-2 py-1.5 text-sm tabular-nums text-brand-950"
                  />
                </label>
                <label className="text-[11px] font-semibold text-brand-600 uppercase">
                  {copy.rateLabel}
                  <input
                    type="number"
                    min={0.5}
                    max={8}
                    step={0.1}
                    value={rate}
                    onChange={(event) =>
                      setRate(Math.min(8, Math.max(0.5, Number(event.target.value) || 0)))
                    }
                    className="mt-1 w-full rounded-lg border border-brand-200 px-2 py-1.5 text-sm tabular-nums text-brand-950"
                  />
                </label>
                <label className="text-[11px] font-semibold text-brand-600 uppercase">
                  {copy.yearsLabel}
                  <input
                    type="number"
                    min={5}
                    max={35}
                    step={1}
                    value={years}
                    onChange={(event) =>
                      setYears(Math.min(35, Math.max(5, Number(event.target.value) || 0)))
                    }
                    className="mt-1 w-full rounded-lg border border-brand-200 px-2 py-1.5 text-sm tabular-nums text-brand-950"
                  />
                </label>
              </div>
            ) : null}
          </fieldset>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.resultsTitle}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {[
              { label: copy.results.area, value: `${result.areaM2} m²` },
              { label: copy.results.purchaseCosts, value: money(result.purchaseCosts) },
              { label: copy.results.rentGross, value: money(result.rentGross) },
              { label: copy.results.rentNet, value: money(result.rentNet) },
              { label: copy.results.yieldNet, value: percent(result.netYieldPct) },
              { label: copy.results.value5, value: money(result.value5) },
              { label: copy.results.totalReturn, value: money(result.totalReturn) },
              financing === "mortgage"
                ? {
                    label: copy.results.mortgage,
                    value: `${money(result.payment)} / ${copy.perMonth}`,
                  }
                : { label: copy.results.cashOnCash, value: percent(result.cashOnCash) },
              ...(financing === "mortgage"
                ? [
                    {
                      label: copy.results.cashFlow,
                      value: `${result.cashFlow > 0 ? "+" : ""}${money(result.cashFlow)} / ${copy.perMonth}`,
                    },
                    { label: copy.results.cashOnCash, value: percent(result.cashOnCash) },
                  ]
                : []),
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white px-3 py-2 ring-1 ring-brand-100 ring-inset"
              >
                <dt className="text-[10px] uppercase tracking-wide text-brand-500">{item.label}</dt>
                <dd className="mt-0.5 text-sm font-bold tabular-nums text-brand-950">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-brand-500">
            <Info aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
            {copy.disclaimer}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-bold text-brand-950">{copy.tableTitle}</h3>
          <p className="text-xs text-brand-500">{copy.budgetFits(rows.sorted.length, districts.length)}</p>
        </div>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-brand-600">{copy.tableHint}</p>

        <div className="mt-3 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-brand-50 text-left text-[11px] uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-3 py-2">
                  {copy.columns.district}
                </th>
                {(
                  [
                    ["price", copy.columns.price],
                    ["yield", copy.columns.yield],
                    ["demand", copy.columns.demand],
                    ["days", copy.columns.days],
                    ["area", copy.columns.area],
                    ["rent", copy.columns.rentNet],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th key={key} scope="col" className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort(key)}
                      className="inline-flex items-center gap-1 font-semibold uppercase hover:text-brand-900"
                    >
                      {label}
                      <ArrowUpDown aria-hidden className="h-3 w-3 opacity-60" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.sorted.map((row) => {
                const isBest = row.slug === rows.bestSlug;
                return (
                  <tr
                    key={row.slug}
                    className={cn(
                      "odd:bg-white even:bg-brand-50/40",
                      isBest && "bg-emerald-50/60",
                    )}
                  >
                    <th scope="row" className="px-3 py-2 text-left font-medium">
                      <Link
                        href={`${districtBasePath}/${row.slug}`}
                        className="text-brand-900 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                      >
                        {row.name}
                      </Link>
                      {isBest ? (
                        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {copy.bestBadge}
                        </span>
                      ) : null}
                    </th>
                    <td className="px-3 py-2 text-right tabular-nums">{money(row.pricePerM2)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{percent(row.rentalYield)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.demandIndex}/10</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.days}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.area} m²</td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums">
                      {money(row.rentNet)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-950 px-4 py-4 text-white sm:px-5">
        <div>
          <p className="text-sm font-bold">{copy.ctaTitle}</p>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-brand-100">{copy.ctaText}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-950 transition hover:bg-brand-50"
        >
          {copy.ctaButton}
        </Link>
      </div>
    </div>
  );
}
