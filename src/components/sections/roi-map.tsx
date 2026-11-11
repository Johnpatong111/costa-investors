import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { RANKING_COPY } from "@/lib/i18n/ranking-copy";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * Mapa zwrotu netto: czysty SVG liczony na serwerze.
 * Bez bibliotek i bez JS po stronie klienta, więc punkty i linki widzi crawler.
 * Rzut: liniowy na prostokąt (wystarcza dla 1,5 stopnia szerokości geograficznej).
 */

export interface RoiMapPoint {
  name: string;
  city: string;
  href: string;
  lat: number;
  lng: number;
  pricePerM2: number;
  netYield: number;
}

const WIDTH = 900;
const HEIGHT = 460;
const PAD = 46;

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

export function RoiMap({
  locale,
  points,
}: {
  locale: Locale;
  points: RoiMapPoint[];
}) {
  if (points.length === 0) return null;
  const copy = RANKING_COPY[locale];

  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const x = (lng: number) =>
    PAD + ((lng - minLng) / (maxLng - minLng || 1)) * (WIDTH - PAD * 2);
  const y = (lat: number) =>
    PAD + ((maxLat - lat) / (maxLat - minLat || 1)) * (HEIGHT - PAD * 2);

  const strongest = [...points].sort((a, b) => b.netYield - a.netYield).slice(0, 6);

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">{copy.mapTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-700">
        {copy.mapLead(points.length)}
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-b from-sky-50 to-brand-50/60">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={copy.mapTitle}
        >
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={PAD}
              x2={WIDTH - PAD}
              y1={PAD + ratio * (HEIGHT - PAD * 2)}
              y2={PAD + ratio * (HEIGHT - PAD * 2)}
              stroke="#0f766e"
              strokeOpacity={0.08}
              strokeDasharray="4 6"
            />
          ))}

          {points.map((point) => (
            <a
              key={`${point.href}-${point.name}`}
              href={point.href}
              aria-label={`${point.name}, ${point.city}: ${formatEur(point.pricePerM2)}/m², ${formatRate(point.netYield)}`}
            >
              <circle
                cx={x(point.lng)}
                cy={y(point.lat)}
                r={5.5}
                fill={colorFor(point.netYield)}
                fillOpacity={0.9}
                stroke="#ffffff"
                strokeWidth={1.2}
              />
              <title>
                {`${point.name} (${point.city}) · ${formatEur(point.pricePerM2)}/m² · ${formatRate(point.netYield)}`}
              </title>
            </a>
          ))}

          {strongest.map((point) => (
            <text
              key={`label-${point.href}`}
              x={x(point.lng) + 8}
              y={y(point.lat) + 3.5}
              fontSize={11}
              fontWeight={600}
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {point.name}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          {copy.mapLegend}
        </span>
        {SCALE.map((step, index) => (
          <span key={step.color} className="inline-flex items-center gap-1.5 text-[11px] text-brand-700">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: step.color }}
            />
            {bucketLabel(index, locale)}
          </span>
        ))}
      </div>
      <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-brand-500">{copy.mapNote}</p>
    </div>
  );
}
