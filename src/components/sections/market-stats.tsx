import { Badge, Section, SectionHeading } from "@/components/ui/primitives";
import type { MarketStats } from "@/lib/content/market-stats";
import { describeDemand } from "@/lib/content/market-insights";
import { formatEur, formatPrice, formatRate } from "@/lib/utils/format";

/**
 * Pasek statystyk + tabela porównawcza (Costa Blanca, EUR).
 * Te same liczby zasilają JSON-LD i meta description – spójność danych
 * w obrębie strony jest sygnałem jakości dla Google i użytkownika.
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
  const cards = [
    { label: "Mediana ofertowa", value: `${formatPrice(stats.pricePerM2)} €/m²` },
    { label: "Wzrost r/r", value: formatRate(stats.priceGrowth) },
    { label: "ROI brutto", value: formatRate(stats.rentalYield) },
    { label: "ROI netto", value: formatRate(stats.netYield) },
    { label: "Czynsz", value: `${formatPrice(stats.monthlyRentPerM2)} €/m²` },
    { label: "Czas sprzedaży", value: `${stats.avgDaysOnMarket} dni` },
  ];

  const rows = [
    { name: locationName, price: stats.pricePerM2, highlight: true },
    { name: cityName, price: stats.cityPricePerM2, highlight: false },
    { name: `${regionName} (mediana)`, price: stats.regionPricePerM2, highlight: false },
  ];

  return (
    <Section className="bg-white pt-10">
      <SectionHeading eyebrow={`Dane: ${stats.dataAsOf}`}>
        Ceny i rentowność – {locationName}
      </SectionHeading>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-brand-500">
              {card.label}
            </dt>
            <dd className="mt-1 text-lg font-bold text-brand-950">{card.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Porównanie mediany ceny za metr kwadratowy: {locationName} na tle miasta i Costa
              Blanca
            </caption>
            <thead className="bg-brand-50 text-left text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Obszar
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Mediana €/m²
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Różnica
                </th>
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
                    <th scope="row" className="px-4 py-3 text-left font-medium">
                      {row.name}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{formatEur(row.price)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {row.highlight ? "—" : formatRate(diff * 100, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-brand-100 bg-white p-5">
          <p className="text-sm font-semibold text-brand-950">Co to oznacza dla inwestora</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-brand-700">
            <li>
              Popyt w tej lokalizacji jest{" "}
              <strong>{describeDemand(stats.demandIndex)}</strong>, a mediana ekspozycji oferty to{" "}
              <strong>{stats.avgDaysOnMarket} dni</strong>.
            </li>
            <li>
              Najem brutto <strong>{formatRate(stats.rentalYield)}</strong>, netto po kosztach i
              podatku <strong>{formatRate(stats.netYield)}</strong>.
            </li>
            <li>
              Koszty zakupu (ITP/IVA, notariusz, prawnik):{" "}
              <strong>{formatRate(stats.purchaseCostsRate * 100)}</strong> ceny.
            </li>
            <li>
              Kupujący zagraniczni: <strong>{formatRate(stats.foreignBuyerShare, 0)}</strong>, w
              tym Polacy {formatRate(stats.polishBuyerShare, 0)}.
            </li>
          </ul>
          <div className="mt-4">
            <Badge tone={stats.reliable ? "positive" : "warning"}>
              {stats.reliable
                ? "Dane wystarczające do samodzielnej analizy"
                : "Mała próba – wymagana weryfikacja"}
            </Badge>
          </div>
        </div>
      </div>
    </Section>
  );
}
