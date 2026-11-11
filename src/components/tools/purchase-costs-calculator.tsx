"use client";

import { useState } from "react";
import { Info, Receipt } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { COSTS_COPY } from "@/lib/i18n/tool-copy";
import { computePurchaseCosts, type Deal, type PropertyType, type Residency } from "@/lib/tools/purchase-costs";
import { formatEur } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface PurchaseCostsCalculatorProps {
  locale: Locale;
  cityName: string;
  /** Stawka ITP dla wspólnoty autonomicznej (%). */
  itp: number;
  /** Nazwa wspólnoty, np. "Comunidad Valenciana". */
  authority: string;
  /** Rentowność brutto z tego rynku (%). */
  rentalYield: number;
  /** Poziom nagłówka: h2 samodzielnie, h3 w zakładkach. */
  headingLevel?: "h2" | "h3";
}

type DealType = Deal;
type Property = PropertyType;
type ResidencyType = Residency;

const RENT_TAX_LABEL: Record<ResidencyType, number> = { nonEu: 19, eu: 24, resident: 19 };

export function PurchaseCostsCalculator({
  locale,
  cityName,
  itp,
  authority,
  rentalYield,
  headingLevel = "h2",
}: PurchaseCostsCalculatorProps) {
  const copy = COSTS_COPY[locale];
  const Heading = headingLevel;
  const [price, setPrice] = useState(250_000);
  const [deal, setDeal] = useState<DealType>("resale");
  const [property, setProperty] = useState<Property>("flat");
  const [residency, setResidency] = useState<ResidencyType>("nonEu");

  const model = computePurchaseCosts({ price, itp, deal, property, residency, rentalYield });
  const {
    transferTax,
    ajd,
    notary,
    legal,
    transactionCosts,
    total,
    ibi,
    community,
    insurance,
    annual,
    rentGross,
    rentTax,
    rentNet,
    netYield,
  } = model;

  const money = (value: number) => formatEur(Math.round(value));
  const percent = (value: number) =>
    `${value.toFixed(1).replace(".", locale === "en" ? "." : ",")}%`;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-accent-600 uppercase">
          <Receipt aria-hidden className="h-3.5 w-3.5" />
          {copy.eyebrow}
        </p>
        <Heading className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl">{copy.title(cityName)}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-brand-700">{copy.lead(authority, itp)}</p>
      </div>

      <div className="mt-4">
        <label className="block text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
          {copy.priceLabel}
          <input
            type="number"
            inputMode="numeric"
            min={50_000}
            max={3_000_000}
            step={10_000}
            value={price}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPrice(Number.isFinite(next) ? Math.max(0, Math.min(next, 3_000_000)) : 0);
            }}
            className="mt-1 w-full max-w-xs rounded-xl border border-brand-200 px-3 py-2.5 text-base font-semibold tabular-nums text-brand-950 focus:border-brand-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <fieldset>
          <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.dealLegend}
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {copy.deals.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDeal(item.id)}
                aria-pressed={deal === item.id}
                className={cn(
                  "min-h-[44px] rounded-xl border px-3 py-2 text-left transition",
                  deal === item.id
                    ? "border-brand-600 bg-brand-50"
                    : "border-brand-200 hover:border-brand-400",
                )}
              >
                <span className="block text-sm font-bold text-brand-900">{item.label}</span>
                <span className="mt-0.5 block text-[11px] text-brand-600">{item.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.propertyLegend}
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {copy.properties.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setProperty(item.id)}
                aria-pressed={property === item.id}
                className={cn(
                  "min-h-[44px] rounded-xl border px-3 py-2 text-left transition",
                  property === item.id
                    ? "border-brand-600 bg-brand-50"
                    : "border-brand-200 hover:border-brand-400",
                )}
              >
                <span className="block text-sm font-bold text-brand-900">{item.label}</span>
                <span className="mt-0.5 block text-[11px] text-brand-600">{item.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="md:col-span-2">
          <legend className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.residencyLegend}
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {copy.residency.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setResidency(item.id)}
                aria-pressed={residency === item.id}
                className={cn(
                  "min-h-[44px] rounded-xl border px-3 py-2 text-left transition",
                  residency === item.id
                    ? "border-brand-600 bg-brand-50"
                    : "border-brand-200 hover:border-brand-400",
                )}
              >
                <span className="block text-sm font-bold text-brand-900">{item.label}</span>
                <span className="mt-0.5 block text-[11px] text-brand-600">{item.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.breakdownTitle}
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rows.price}</dt>
              <dd className="font-semibold tabular-nums text-brand-950">{money(price)}</dd>
            </div>
            {deal === "new" ? (
              <>
                <div className="flex justify-between gap-2">
                  <dt className="text-brand-600">{copy.rows.iva} 10%</dt>
                  <dd className="tabular-nums text-brand-900">{money(transferTax)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-brand-600">{copy.rows.ajd} 1,5%</dt>
                  <dd className="tabular-nums text-brand-900">{money(ajd)}</dd>
                </div>
              </>
            ) : (
              <div className="flex justify-between gap-2">
                <dt className="text-brand-600">
                  {copy.rows.itp} {itp}%
                </dt>
                <dd className="tabular-nums text-brand-900">{money(transferTax)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rows.notary} 1%</dt>
              <dd className="tabular-nums text-brand-900">{money(notary)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rows.legal} 0,5%</dt>
              <dd className="tabular-nums text-brand-900">{money(legal)}</dd>
            </div>
            <div className="mt-2 flex justify-between gap-2 border-t border-brand-200 pt-2">
              <dt className="font-semibold text-brand-900">{copy.rows.total}</dt>
              <dd className="font-bold tabular-nums text-brand-950">{money(total)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rows.totalPercent}</dt>
              <dd className="tabular-nums text-brand-900">{percent(model.costsPercent)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.annualTitle}
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.annual.ibi}</dt>
              <dd className="tabular-nums text-brand-900">{money(ibi)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.annual.community}</dt>
              <dd className="tabular-nums text-brand-900">{money(community)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.annual.insurance}</dt>
              <dd className="tabular-nums text-brand-900">{money(insurance)}</dd>
            </div>
            <div className="mt-2 flex justify-between gap-2 border-t border-brand-200 pt-2">
              <dt className="font-semibold text-brand-900">{copy.annual.total}</dt>
              <dd className="font-bold tabular-nums text-brand-950">{money(annual)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.perMonth}</dt>
              <dd className="tabular-nums text-brand-900">{money(annual / 12)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {copy.rentTitle}
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rent.gross}</dt>
              <dd className="tabular-nums text-brand-900">{money(rentGross)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">
                {copy.rent.tax} {RENT_TAX_LABEL[residency]}%
              </dt>
              <dd className="tabular-nums text-brand-900">{money(rentTax)}</dd>
            </div>
            <div className="mt-2 flex justify-between gap-2 border-t border-brand-200 pt-2">
              <dt className="font-semibold text-brand-900">{copy.rent.net}</dt>
              <dd className="font-bold tabular-nums text-brand-950">{money(rentNet)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-brand-600">{copy.rent.yield}</dt>
              <dd className="font-semibold tabular-nums text-emerald-700">{percent(netYield)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-brand-500">
        <Info aria-hidden className="mt-0.5 h-3 w-3 shrink-0" />
        {copy.note}
      </p>

      <p className="mt-4 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-xs leading-relaxed text-brand-700">
        {copy.noteItp(authority, itp)}
      </p>
    </div>
  );
}
