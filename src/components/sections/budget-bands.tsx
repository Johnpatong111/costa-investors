import Link from "next/link";
import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { getCities } from "@/lib/data/repository";
import { translatePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { formatEur } from "@/lib/utils/format";

/**
 * ===========================================================================
 * APARTMENTS BY BUDGET (hub sprzedaży)
 * ===========================================================================
 * Sekcja odpowiada na realne zapytania GSC: „apartment for sale in costa
 * blanca”, „apartments for sale costa blanca spain” i „cheap apartments for
 * sale costa blanca”. Zamiast ogólnych zapewnień pokazujemy medianę budżetu
 * dla 70 m² w każdej miejscowości z bazy, przed kosztami zakupu.
 */

const BANDS = [
  { max: 150_000 },
  { max: 250_000 },
  { max: 400_000 },
  { max: Number.POSITIVE_INFINITY },
] as const;

type BudgetCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  count: (count: number) => string;
  prime: string;
  cta: string;
  bands: { label: string; body: string }[];
};

const COPY: Record<Locale, BudgetCopy> = {
  pl: {
    eyebrow: "Budżet zakupu",
    title: "Apartamenty na Costa Blanca według budżetu",
    lead: "Mediana budżetu za mieszkanie 70 m² w każdej miejscowości, przed kosztami zakupu (ITP/IVA, notariusz, rejestr, prawnik). To punkt startowy do wyboru lokalizacji, nie oferta konkretnego lokalu.",
    count: (count) => `${count} miejscowości z medianą w tym przedziale`,
    prime: "Pojedyncze oferty premium, nie mediana miejscowości.",
    cta: "Sprawdź oferty w swoim budżecie",
    bands: [
      {
        label: "Do 150 000 €",
        body: "Mniejsze mieszkania, starsze budynki i miejscowości w głębi lub na południu regionu. Dobry start pod najem lub bazę na część roku.",
      },
      {
        label: "150 000-250 000 €",
        body: "Rdzeń rynku Costa Blanca: mieszkania z 2 sypialniami, osiedla z basenem i lokalizacje w pobliżu plaży.",
      },
      {
        label: "250 000-400 000 €",
        body: "Nowe budownictwo, większe tarasy, widok na morze i droższe miasta północnej Costa Blanca.",
      },
      {
        label: "Powyżej 400 000 €",
        body: "Nieruchomości prime, wille i duże apartamenty z widokiem. Wycena wymaga analizy konkretnej oferty, nie średniej miasta.",
      },
    ],
  },
  en: {
    eyebrow: "Buying budget",
    title: "Apartments for sale in Costa Blanca by budget",
    lead: "The median budget for a 70 m² apartment in each town, before 13-14% purchase costs (ITP/IVA, notary, registry, lawyer). Use it to narrow the search, then check the exact district.",
    count: (count) => `${count} towns with a median in this band`,
    prime: "Individual premium listings, not a town median.",
    cta: "See apartments in your budget",
    bands: [
      {
        label: "Under €150,000",
        body: "Smaller units, older buildings and inland or southern towns. A practical start for a rental or a lock-up-and-leave base.",
      },
      {
        label: "€150,000-€250,000",
        body: "The core of the Costa Blanca market: two-bedroom apartments, resale estates with a pool and locations close to the beach.",
      },
      {
        label: "€250,000-€400,000",
        body: "New builds, larger terraces, sea views and the more expensive towns on the northern Costa Blanca.",
      },
      {
        label: "Above €400,000",
        body: "Prime properties, villas and large sea-view apartments. These need a property-level valuation, not a town average.",
      },
    ],
  },
  es: {
    eyebrow: "Presupuesto de compra",
    title: "Apartamentos en venta en la Costa Blanca por presupuesto",
    lead: "La mediana de presupuesto para un piso de 70 m² en cada localidad, antes del 13-14% de gastos de compra (ITP/IVA, notaría, registro, abogado). Sirve para acotar la búsqueda y después revisar la zona concreta.",
    count: (count) => `${count} localidades con mediana en esta franja`,
    prime: "Ofertas premium concretas, no la mediana de la localidad.",
    cta: "Ver apartamentos en tu presupuesto",
    bands: [
      {
        label: "Hasta 150.000 €",
        body: "Pisos más pequeños, edificios antiguos y localidades del interior o del sur. Un punto de partida práctico para alquilar o para una base de temporada.",
      },
      {
        label: "150.000-250.000 €",
        body: "El núcleo del mercado de la Costa Blanca: pisos de dos dormitorios, urbanizaciones con piscina y zonas cerca de la playa.",
      },
      {
        label: "250.000-400.000 €",
        body: "Obra nueva, terrazas más grandes, vistas al mar y las localidades más caras del norte de la Costa Blanca.",
      },
      {
        label: "Más de 400.000 €",
        body: "Inmuebles prime, villas y apartamentos grandes con vistas. Requieren una valoración de la vivienda concreta, no una media municipal.",
      },
    ],
  },
};

export function BudgetBands({ locale, serviceSlug }: { locale: Locale; serviceSlug: string }) {
  const copy = COPY[locale];
  const cities = getCities();

  const rows = BANDS.map((band, index) => {
    const previous = BANDS[index - 1];
    const min = previous ? previous.max : 0;
    const bandCopy = copy.bands[index] ?? copy.bands[0];
    const matches = cities
      .filter((city) => {
        const budget70 = city.pricePerM2 * 70;
        return budget70 > min && budget70 <= band.max;
      })
      .sort((a, b) => a.pricePerM2 - b.pricePerM2);

    return {
      ...bandCopy,
      count: matches.length,
      examples: matches.slice(0, 3).map((city) => ({
        city,
        budget: Math.round(city.pricePerM2 * 70),
      })),
    };
  });

  return (
    <Section className="bg-brand-50/60">
      <SectionHeading eyebrow={copy.eyebrow}>{copy.title}</SectionHeading>
      <p className="-mt-4 mb-6 max-w-3xl text-sm leading-relaxed text-brand-700">{copy.lead}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <Card key={row.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-bold text-brand-950">{row.label}</h3>
              <span className="text-xs font-semibold text-brand-500">
                {row.count > 0 ? copy.count(row.count) : copy.prime}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-brand-700">{row.body}</p>
            {row.examples.length > 0 ? (
              <ul className="mt-3 space-y-1 text-sm text-brand-700">
                {row.examples.map(({ city, budget }) => (
                  <li key={city.slug} className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link
                      href={translatePath(`/${serviceSlug}/${city.slug}`, locale)}
                      className="font-medium text-brand-900 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600"
                    >
                      {city.name}
                    </Link>
                    <span className="tabular-nums text-brand-500">{formatEur(budget)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Card>
        ))}
      </div>
      <p className="mt-5">
        <Link
          href="#lead-form"
          className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-5 py-3 text-sm font-bold text-white shadow-card transition-colors hover:bg-accent-600"
        >
          {copy.cta}
        </Link>
      </p>
    </Section>
  );
}

