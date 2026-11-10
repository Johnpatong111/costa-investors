import type { CitySeed, DistrictSeed, RegionSeed } from "../data/schema";
import type { MarketStats } from "./market-stats";
import { localProfile, type LocalProfile } from "./content-engine";
import { estimateInvestment } from "./market-insights";
import { cityAccessBlock } from "./access";
import { formatEur, formatRate } from "../utils/format";

/**
 * ANALIZA RYNKOWA DLA STRON m2: wprowadzenie, strefy i segmenty, czynniki
 * lokalne, wnioski inwestycyjne. Każde zdanie zależy od danych i profilu
 * rynku (wybrzeże / golf / głębia lądu), nie od nazwy miasta.
 */

type Locale = "pl" | "en" | "es";

export interface MarketAnalysis {
  heading: string;
  intro: string;
  zones: string;
  factors: string;
  conclusions: string;
}

export function marketAnalysis(input: {
  city: CitySeed;
  district: DistrictSeed;
  region: RegionSeed;
  stats: MarketStats;
  locale: Locale;
}): MarketAnalysis {
  const { city, district, region, stats, locale } = input;
  const profile: LocalProfile = localProfile(city, district);
  const median = formatEur(stats.pricePerM2);
  const growth = formatRate(stats.priceGrowth);
  const yGross = formatRate(stats.rentalYield);
  const yNet = formatRate(stats.netYield);
  const landmark = district.landmarks[0] ?? city.name;
  const access = cityAccessBlock(city.slug, locale);
  const ranked = city.districts.slice().sort((a, b) => b.pricePerM2 - a.pricePerM2);
  const rank = ranked.findIndex((item) => item.slug === district.slug) + 1;
  const cheapest = ranked[ranked.length - 1];
  const priciest = ranked[0];
  const spread = Math.abs((priciest?.pricePerM2 ?? 0) - (cheapest?.pricePerM2 ?? 0));
  const example = estimateInvestment(stats, 250_000);
  const dCity = stats.pricePerM2 - stats.cityPricePerM2;
  const dRegion = stats.pricePerM2 - stats.regionPricePerM2;
  const segment =
    stats.pricePerM2 >= 3200 ? "premium" : stats.pricePerM2 >= 2500 ? "mid" : "entry";

  const heading =
    locale === "pl" ? "Analiza rynku" : locale === "es" ? "Análisis de mercado" : "Market analysis";

  const intro =
    locale === "pl"
      ? `${district.name}: ${median} €/m², ${growth} r/r. ${dCity >= 0 ? "Powyżej" : "Poniżej"} mediany ${city.nameGenitive} o ${formatEur(Math.abs(dCity))} €/m², wobec regionu ${region.name} ${dRegion >= 0 ? "wyżej" : "niżej"} o ${formatEur(Math.abs(dRegion))}. Segment ${segment === "premium" ? "premium: decyduje widok i rok oddania" : segment === "mid" ? "średni: decyduje standard i rok budowy" : "wejściowy: decyduje metraż i koszty stałe"}.`
      : locale === "es"
        ? `${district.name}: ${median} €/m², ${growth} interanual. ${dCity >= 0 ? "Por encima" : "Por debajo"} de la mediana de ${city.name} en ${formatEur(Math.abs(dCity))} €/m² y ${dRegion >= 0 ? "por encima" : "por debajo"} de ${region.name} en ${formatEur(Math.abs(dRegion))}. Segmento ${segment === "premium" ? "premium: manda vista y año de entrega" : segment === "mid" ? "medio: mandan acabados y año de construcción" : "de entrada: mandan superficie y gastos fijos"}.`
        : `${district.name}: ${median} €/m², ${growth} YoY. ${dCity >= 0 ? "Above" : "Below"} the ${city.name} median by ${formatEur(Math.abs(dCity))} €/m² and ${dRegion >= 0 ? "above" : "below"} ${region.name} by ${formatEur(Math.abs(dRegion))}. ${segment === "premium" ? "Premium segment: views and completion year decide" : segment === "mid" ? "Mid segment: finishes and year of construction decide" : "Entry segment: floor area and running costs decide"}.`;

  const zones =
    locale === "pl"
      ? `W gminie rozstrzał sięga ${formatEur(spread)} €/m²: od ${formatEur(cheapest?.pricePerM2 ?? 0)} €/m² w ${cheapest?.name ?? city.name} do ${formatEur(priciest?.pricePerM2 ?? 0)} €/m² w ${priciest?.name ?? city.name}. ${district.name} to ${rank}. z ${ranked.length} stref. Typ ${district.type}: ${profile === "coast" ? "apartamenty z tarasem i wyższa wspólnota" : profile === "golf" ? "wille i lokale z basenem na większych działkach" : "domy z działką i niższa cena wejścia"}.`
      : locale === "es"
        ? `En el municipio el diferencial llega a ${formatEur(spread)} €/m²: de ${formatEur(cheapest?.pricePerM2 ?? 0)} €/m² en ${cheapest?.name ?? city.name} a ${formatEur(priciest?.pricePerM2 ?? 0)} €/m² en ${priciest?.name ?? city.name}. ${district.name} es la ${rank} de ${ranked.length} zonas. Tipo ${district.type}: ${profile === "coast" ? "pisos con terraza y comunidad más alta" : profile === "golf" ? "chalets y pisos con piscina en parcelas mayores" : "casas con parcela y entrada más barata"}.`
        : `Inside the municipality the spread reaches ${formatEur(spread)} €/m²: from ${formatEur(cheapest?.pricePerM2 ?? 0)} €/m² in ${cheapest?.name ?? city.name} to ${formatEur(priciest?.pricePerM2 ?? 0)} €/m² in ${priciest?.name ?? city.name}. ${district.name} ranks ${rank} of ${ranked.length} areas. ${district.type}: ${profile === "coast" ? "flats with terraces and higher community fees" : profile === "golf" ? "villas and pool flats on larger plots" : "houses with plots and a lower entry price"}.`;

  const factors =
    locale === "pl"
      ? `Cenę podtrzymuje ${landmark}; ${stats.foreignBuyerShare}% kupujących to obcokrajowcy, w tym ${stats.polishBuyerShare}% Polacy. Popyt ${stats.demandIndex}/10, ekspozycja ${stats.avgDaysOnMarket} dni. ${access ? access.paragraphs[0] : ""} ${profile === "coast" ? "Sezon mocny: czynsze rosną od czerwca do września." : profile === "golf" ? "Sezon złagodzony: goście golfowi przyjeżdżają też zimą." : "Sezon ograniczony: popyt opiera się na mieszkańcach i pracy zdalnej."}`
      : locale === "es"
        ? `El precio lo sostiene ${landmark}; el ${stats.foreignBuyerShare}% de compradores es extranjero, con ${stats.polishBuyerShare}% de polacos. Demanda ${stats.demandIndex}/10 y ${stats.avgDaysOnMarket} días en mercado. ${access ? access.paragraphs[0] : ""} ${profile === "coast" ? "Temporada fuerte: las rentas suben de junio a septiembre." : profile === "golf" ? "Temporada suave: el cliente de golf también llega en invierno." : "Temporada limitada: la demanda viene de residentes y teletrabajo."}`
        : `Pricing is held by ${landmark}; ${stats.foreignBuyerShare}% of buyers are foreign, ${stats.polishBuyerShare}% Polish. Demand ${stats.demandIndex}/10, ${stats.avgDaysOnMarket} days on market. ${access ? access.paragraphs[0] : ""} ${profile === "coast" ? "Strong season: rents rise from June to September." : profile === "golf" ? "Soft season: golf guests also arrive in winter." : "Limited season: demand comes from residents and remote work."}`;

  const conclusions =
    locale === "pl"
      ? `ROI ${yGross} brutto (${yNet} netto) przy ${median} €/m²: 250 000 € daje po pięciu latach około ${formatEur(example.totalReturn5y)} € z czynszem i wzrostem wartości. Wyjście zależy od ceny startowej; sprawdź finanse wspólnoty, obciążenia w rejestrze i czynsz z trzech porównywalnych ogłoszeń.`
      : locale === "es"
        ? `ROI ${yGross} bruto (${yNet} neto) con ${median} €/m²: 250.000 € generan unos ${formatEur(example.totalReturn5y)} € a cinco años con alquiler y revalorización. La salida depende del precio inicial; revisa cuentas de la comunidad, cargas registrales y la renta de tres anuncios comparables.`
        : `ROI ${yGross} gross (${yNet} net) at ${median} €/m²: 250 000 € returns about ${formatEur(example.totalReturn5y)} € over five years in rent plus appreciation. The exit depends on the starting price; check community finances, registry charges and rent from three comparable listings.`;

  return { heading, intro, zones, factors, conclusions };
}
