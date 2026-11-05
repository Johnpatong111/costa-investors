import { Badge, Section, SectionHeading } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/utils/format";

/**
 * Social proof oparty na FAKTACH operacyjnych (nie na wymyślonych opiniach).
 *
 * Opinie klientów dodajesz dopiero, gdy są prawdziwe i weryfikowalne –
 * fikcyjne recenzje to naruszenie wytycznych Google i polskiego prawa
 * (nieuczciwe praktyki rynkowe). Dlatego `testimonials` domyślnie jest puste.
 */
export interface Testimonial {
  author: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Musi być true dopiero po realnej weryfikacji źródła opinii. */
  verified: boolean;
}

export function SocialProof({
  coverage,
  testimonials = [],
}: {
  coverage: { districts: number; cities: number; transactions: number };
  testimonials?: Testimonial[];
}) {
  const verified = testimonials.filter((item) => item.verified);

  const tiles = [
    {
      value: "24 h",
      label: "Lista ofert z ROI",
      detail: "3–5 nieruchomości z ceną €/m² na tle mediany",
    },
    {
      value: "13,5%",
      label: "Koszty zakupu policzone z góry",
      detail: "ITP/IVA, notariusz, rejestr i obsługa prawna",
    },
    {
      value: "0 €",
      label: "Prowizji od kupującego",
      detail: "wynagrodzenie rozliczamy z agencją po transakcji",
    },
    {
      value: `${coverage.districts}`,
      label: "Dzielnic i urbanizacji w bazie",
      detail: `${coverage.cities} miejscowości, ${formatPrice(coverage.transactions)} transakcji w modelu`,
    },
  ];

  return (
    <Section className="bg-white">
      <SectionHeading eyebrow="Jak pracujemy">Konkretne liczby zamiast obietnic</SectionHeading>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/60 p-5"
          >
            <dt className="text-2xl font-bold text-brand-900">{tile.value}</dt>
            <dd className="mt-1 text-sm font-semibold text-brand-950">{tile.label}</dd>
            <dd className="mt-1 text-xs leading-relaxed text-brand-600">{tile.detail}</dd>
          </div>
        ))}
      </dl>

      {verified.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {verified.map((item) => (
            <figure
              key={`${item.author}-${item.city}`}
              className="rounded-2xl border border-brand-100 p-5"
            >
              <div className="flex items-center gap-1 text-accent-500" aria-label={`Ocena ${item.rating} na 5`}>
                {"★".repeat(item.rating)}
                <span className="sr-only">{item.rating} z 5</span>
              </div>
              <blockquote className="mt-2 text-sm leading-relaxed text-brand-800">
                „{item.quote}”
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-brand-600">
                {item.author}, {item.city}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-8 max-w-3xl rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-xs leading-relaxed text-brand-600">
          <Badge tone="warning" className="mb-2">
            Sekcja opinii nieaktywna
          </Badge>
          Publikujemy wyłącznie zweryfikowane opinie klientów. Do momentu zebrania
          pierwszych realizacji ta sekcja pozostaje ukryta – nie generujemy fikcyjnych
          recenzji.
        </div>
      )}
    </Section>
  );
}
