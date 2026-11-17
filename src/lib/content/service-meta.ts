import type { Locale } from "../i18n/config";
import type { MarketStats } from "./market-stats";
import { formatEurLocale, formatRateLocale } from "../utils/format";

/**
 * Meta dla stron usług. Zamiast szablonu „Inwestycje i zakup: ...” tytuł
 * zawiera cenę i ROI, czyli to, co użytkownik widzi w SERP i co podnosi CTR.
 * Opisy mają jedno CTA, bez doklejonych ogonków typu „ROI i koszty.”.
 */

function fitTitle(value: string, max = 62): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

export function serviceCityMeta(
  cityName: string,
  stats: MarketStats,
  locale: Locale,
): { title: string; description: string } {
  const price = formatEurLocale(stats.pricePerM2, locale);
  const roi = formatRateLocale(stats.rentalYield, locale);
  const days = stats.avgDaysOnMarket;

  const title =
    locale === "es"
      ? `Apartamentos ${cityName}: ${price}/m² y ${roi} ROI (2026)`
      : locale === "en"
        ? `${cityName} apartments: ${price}/m², ${roi} yield (2026)`
        : `Apartamenty ${cityName}: ${price}/m², ROI ${roi} (2026)`;

  const description =
    locale === "es"
      ? `Apartamentos en ${cityName}: mediana ${price}/m², ${roi} bruto y ${days} días de venta. Compara zonas, gastos de compra y retorno del alquiler. Consulta ofertas y ROI.`
      : locale === "en"
        ? `Apartments in ${cityName}: ${price}/m² median, ${roi} gross yield and ${days} days on market. Compare areas, purchase costs and rental return. See listings and ROI.`
        : `Apartamenty w ${cityName}: mediana ${price}/m², ROI ${roi} brutto i ${days} dni ekspozycji. Porównaj dzielnice, koszty zakupu i zwrot z najmu. Sprawdź oferty i ROI.`;

  return { title: fitTitle(title), description: fitTitle(description, 158) };
}

export function serviceDistrictMeta(
  cityName: string,
  districtName: string,
  stats: MarketStats,
  locale: Locale,
): { title: string; description: string } {
  const price = formatEurLocale(stats.pricePerM2, locale);
  const roi = formatRateLocale(stats.rentalYield, locale);
  const days = stats.avgDaysOnMarket;

  const title =
    locale === "es"
      ? `${districtName} (${cityName}): ${price}/m² y ${roi} ROI (2026)`
      : locale === "en"
        ? `${districtName} (${cityName}): ${price}/m², ${roi} yield (2026)`
        : `${districtName} (${cityName}): ${price}/m², ROI ${roi} (2026)`;

  const description =
    locale === "es"
      ? `Apartamentos en ${districtName} (${cityName}): ${price}/m², ${roi} bruto y ${days} días. Compara con el resto del municipio y revisa los gastos. Consulta ofertas.`
      : locale === "en"
        ? `Apartments in ${districtName} (${cityName}): ${price}/m², ${roi} gross yield and ${days} days on market. Compare with the rest of the town and check costs. See listings.`
        : `Apartamenty w ${districtName} (${cityName}): ${price}/m², ROI ${roi} i ${days} dni ekspozycji. Porównaj z resztą miasta i policz koszty. Sprawdź oferty.`;

  return { title: fitTitle(title), description: fitTitle(description, 158) };
}
