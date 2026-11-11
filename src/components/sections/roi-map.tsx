"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import { buildLandPolygon, SEA_NAME, shiftedCoastline } from "@/lib/tools/coastline";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * Mapa zwrotu netto: SVG renderowane na serwerze, interakcja po stronie klienta.
 * Ma kontekst geograficzny (linia brzegowa, morze, skala, północ), bo bez tego
 * rozrzut punktów wyglądał jak chmura kropek, a nie mapa.
 */

export interface RoiMapPoint {
  name: string;
  city: string;
  href: string;
  lat: number;
  lng: number;
  pricePerM2: number;
  netYield: number;
  days: number;
  area: number;
}

const WIDTH = 900;
const HEIGHT = 460;
const PAD = 46;
const KM_PER_DEGREE_LAT = 111.32;
const SCALE_KM = 25;

const SCALE = [
  { max: 4.8, color: "#f97316" },
  { max: 5.4, color: "#fbbf24" },
  { max: 6.0, color: "#34d399" },
  { max: 6.6, color: "#10b981" },
  { max: Infinity, color: "#047857" },
] as const;

function colorFor(netYield: number): string {
  return SCALE.find((step) => netYield < step.max)?.color ?? "#047857";
}

function bucketLabel(index: number, locale: Locale): string {
  const separator = locale === "en" ? "." : ",";
  const fmt = (value: number) => value.toFixed(1).replace(".", separator);
  const lower = index === 0 ? 0 : SCALE[index - 1]!.max;
  const upper = SCALE[index]!.max;
  if (index === 0) return `<${fmt(upper)}`;
  if (!Number.isFinite(upper)) return `${fmt(lower)}+`;
  const joiner = locale === "en" ? " to " : locale === "es" ? " a " : " do ";
  return `${fmt(lower)}${joiner}${fmt(upper)}`;
}

export function RoiMap({ locale, points }: { locale: Locale; points: RoiMapPoint[] }) {
  const copy = RANKING_COPY[locale];
  const strongest = useMemo(() => [...points].sort((a, b) => b.netYield - a.netYield), [points]);
  const [selected, setSelected] = useState<RoiMapPoint | null>(strongest[0] ?? null);
  const clipId = useId();

  const bounds = useMemo(() => {
    const lats = points.map((point) => point.lat);
    const lngs = points.map((point) => point.lng);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [points]);

  if (points.length === 0) return null;

  const { minLat, maxLat, minLng, maxLng } = bounds;
  const x = (lng: number) => PAD + ((lng - minLng) / (maxLng - minLng || 1)) * (WIDTH - PAD * 2);
  const y = (lat: number) => PAD + ((maxLat - lat) / (maxLat - minLat || 1)) * (HEIGHT - PAD * 2);

  const toPath = (list: readonly (readonly [number, number])[]) =>
    list
      .map(([lng, lat], index) => `${index === 0 ? "M" : "L"}${x(lng).toFixed(1)},${y(lat).toFixed(1)}`)
      .join(" ");

  const coastPath = toPath(shiftedCoastline());
  const landPath = `${toPath(buildLandPolygon(bounds))} Z`;

  const pxPerKm = (HEIGHT - PAD * 2) / (maxLat - minLat || 1) / KM_PER_DEGREE_LAT;
  const scaleWidth = SCALE_KM * pxPerKm;
  const labels = strongest.slice(0, 6);
  const active = selected ?? strongest[0] ?? null;


  return (
    <div data-roi-map>
      <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">{copy.mapTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-700">
        {copy.mapLead(points.length)}
      </p>
      <p className="mt-1 text-[11px] text-brand-500">{copy.mapSelectHint}</p>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-brand-100">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full min-w-[620px]"
          role="img"
          aria-label={copy.mapTitle}
        >
          <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#e0f2fe" />
          <defs>
            <clipPath id={clipId}>
              <rect x={PAD} y={PAD} width={WIDTH - PAD * 2} height={HEIGHT - PAD * 2} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <path d={landPath} fill="#f8fafc" />
            <path d={coastPath} fill="none" stroke="#64748b" strokeWidth={1.6} strokeLinejoin="round" />
          </g>
          <text
            x={WIDTH * 0.6}
            y={HEIGHT * 0.76}
            fill="#0369a1"
            fillOpacity={0.7}
            fontSize={13}
            fontWeight={600}
            letterSpacing={1}
            transform={`rotate(-12 ${WIDTH * 0.6} ${HEIGHT * 0.76})`}
          >
            {copy.mapSea || SEA_NAME}
          </text>
          <g aria-hidden>
            <text
              x={WIDTH - PAD}
              y={PAD - 12}
              textAnchor="end"
              fontSize={11}
              fontWeight={700}
              fill="#475569"
            >
              N
            </text>
            <path d={`M${WIDTH - PAD - 4},${PAD - 24} l4,-8 l4,8 z`} fill="#475569" />
            <line
              x1={PAD + 8}
              x2={PAD + 8 + scaleWidth}
              y1={HEIGHT - 22}
              y2={HEIGHT - 22}
              stroke="#334155"
              strokeWidth={2}
            />
            <line
              x1={PAD + 8}
              x2={PAD + 8}
              y1={HEIGHT - 26}
              y2={HEIGHT - 18}
              stroke="#334155"
              strokeWidth={2}
            />
            <line
              x1={PAD + 8 + scaleWidth}
              x2={PAD + 8 + scaleWidth}
              y1={HEIGHT - 26}
              y2={HEIGHT - 18}
              stroke="#334155"
              strokeWidth={2}
            />
            <text x={PAD + 8} y={HEIGHT - 30} fontSize={10} fontWeight={600} fill="#334155">
              {copy.mapScale(SCALE_KM)}
            </text>
          </g>

          {points.map((point) => {
            const isActive = active?.href === point.href;
            return (
              <a
                key={`${point.href}-${point.name}`}
                href={point.href}
                aria-label={`${point.name}, ${point.city}: ${formatEur(point.pricePerM2)}/m², ${formatRate(point.netYield)}`}
                onClick={(event) => {
                  event.preventDefault();
                  setSelected(point);
                }}
              >
                <circle
                  cx={x(point.lng)}
                  cy={y(point.lat)}
                  r={isActive ? 8 : 6.5}
                  fill={colorFor(point.netYield)}
                  fillOpacity={0.9}
                  stroke={isActive ? "#0f172a" : "#ffffff"}
                  strokeWidth={isActive ? 2.2 : 1.4}
                />
                <title>
                  {`${point.name} (${point.city}) · ${formatEur(point.pricePerM2)}/m² · ${formatRate(point.netYield)}`}
                </title>
              </a>
            );
          })}

          {labels.map((point, index) => {
            const anchorEnd = point.lng > 0.3;
            return (
              <text
                key={`label-${point.href}`}
                x={x(point.lng) + (anchorEnd ? -10 : 10)}
                y={y(point.lat) + (index % 2 === 0 ? 4 : -6)}
                textAnchor={anchorEnd ? "end" : "start"}
                fontSize={12}
                fontWeight={600}
                fill="#0f172a"
                stroke="#ffffff"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {point.name}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          {copy.mapLegend}
        </span>
        {SCALE.map((step, index) => (
          <span
            key={step.color}
            className="inline-flex items-center gap-1.5 text-[11px] text-brand-700"
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: step.color }}
            />
            {bucketLabel(index, locale)}
          </span>
        ))}
      </div>

      {active ? (
        <div
          data-map-detail
          className="mt-3 rounded-xl border border-brand-100 bg-white p-4 shadow-card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-brand-950">
                {active.name} <span className="font-normal text-brand-600">· {active.city}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-brand-500">{copy.mapNote}</p>
            </div>
            <Link
              href={active.href}
              className="inline-flex min-h-[44px] items-center rounded-full bg-brand-950 px-4 text-xs font-bold text-white transition hover:bg-brand-800"
            >
              {copy.mapOpenReport}
            </Link>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: copy.mapMetrics.price, value: `${formatEur(active.pricePerM2)}/m²` },
              { label: copy.mapMetrics.net, value: formatRate(active.netYield) },
              { label: copy.mapMetrics.days, value: `${active.days}` },
              { label: copy.mapMetrics.area, value: `${active.area} m²` },
            ].map((metric) => (
              <div key={metric.label} className="rounded-lg bg-brand-50/60 px-3 py-2">
                <dt className="text-[10px] uppercase tracking-wide text-brand-500">{metric.label}</dt>
                <dd className="mt-0.5 text-sm font-bold tabular-nums text-brand-950">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
