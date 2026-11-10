import type { CitySeed, DistrictSeed, RegionSeed } from "../../data/schema";
import type { MarketStats } from "../../content/market-stats";
import type { ContentBlock, FaqItem } from "../../content/content-utils";
import { hashString, pick, rotate } from "../../content/deterministic";
/** Rotacja deterministyczna: wybiera `count` elementów od pozycji zależnej od URL. */
function pickSome<T>(items: readonly T[], key: string, salt: string, count: number): T[] {
  if (items.length <= count) return [...items];
  const start = hashString(`${key}::${salt}`) % items.length;
  const rotated = [...items.slice(start), ...items.slice(0, start)];
  return rotated.slice(0, count);
}

import {
  demandTier,
  foreignTier,
  growthTier,
  liquidityTier,
  pickByTier,
  priceTier,
  yieldTier,
} from "../../content/content-tiers";
import { regionTax } from "../../content/region-facts";
import { interpolate } from "../../content/interpolate";
import { formatEur, formatRate } from "../../utils/format";
import type { ServiceCopyView } from "./builders";

/**
 * ===========================================================================
 * BLOKI I FAQ DZIELNIC (EN / ES)
 * ===========================================================================
 * Odpowiednik polskiego `content/district-blocks.ts`. Powód istnienia: słownik
 * EN/ES miał JEDEN zestaw akapitów dla wszystkich dzielnic, więc po normalizacji
 * cyfr strony różniły się tylko nazwą miejscowości (Jaccard 0,85-0,87).
 *
 * Tutaj: 3-4 warianty frazy per slot, wybierane przez kubełek danych
 * (faktograficznie) albo deterministycznie per URL. Nazwy cech, punktów
 * orientacyjnych i dzielnic siostrzanych wnoszą słowa unikalne dla lokalizacji.
 */

export interface LocalizedDistrictInput {
  locale: "en" | "es";
  service: ServiceCopyView;
  stats: MarketStats;
  city: CitySeed;
  district: DistrictSeed;
  region: RegionSeed;
  key: string;
  vars: Record<string, string>;
  t: (template: string) => string;
}

export interface DistrictCopy {
  rynek: string;
  okolica: string;
  roi: string;
  koszty: string;
  kupujacy: string;
  dane: string;
  openers: string[];
  okolicaParagraphs: string[];
  priceByTier: string[];
  growthByTier: string[];
  yieldByTier: string[];
  costVariants: string[];
  buyerByTier: string[];
  demandByTier: string[];
  liquidityByTier: string[];
  cheaperSibling: string;
  pricierSibling: string;
  siblingSummary: string;
  monthlyNote: string;
  faqPrice: string;
  faqRoi: string;
  faqLiquidity: string;
  faqBuyers: string;
  faqIdentity: string[];
  faqTax: string[];
}

const EN: DistrictCopy = {
  rynek: "Property market in {districtLoc}: {year}",
  okolica: "Area and housing stock",
  roi: "What the rent actually returns",
  koszty: "Purchase costs, taxes and paperwork",
  kupujacy: "Who buys in {districtLoc}",
  dane: "Key figures at a glance",
  openers: [
    "{districtLoc} is a {districtType} within {subregion}; {landmark} is the reference point buyers ask about first, and it is what separates this micro-market from the rest of {city}.",
    "Ask about {districtLoc} and locals mention {landmark} before anything else. The stock here is mostly a {districtType} built around that landmark, which narrows the buyer pool to people looking for one specific standard rather than square metres alone.",
    "Before comparing prices in {districtLoc}, note the defining trait: a {districtType} within {subregion}. Proximity to {landmark} and {landmark2} supports rental demand, but it also lifts community fees, and those often decide the real return.",
  ],
  okolicaParagraphs: [
    "Location type: {districtType}. Landmarks quoted in listings: {landmark}, {landmark2}. In practice these are what separate two properties with identical floor area in {district}: distance to {landmark}, the building line and the year of completion.",
    "In {district} the frame of reference is {landmark} and {landmark2} - the places tenants check first. Administratively and logistically the area is served by {city}, in the {subregion} part of the coast, which matters for both lettings and resale.",
    "Two lines are enough: a {districtType} with direct access to {landmark}. That combination gives the area a {subregion} profile, where seasonal and long-term lets complement each other instead of competing.",
  ],
  priceByTier: [
    "The asking median of {price} €/m² sits clearly below the city average of {cityPrice} €/m². You get more square metres for the same budget, usually at the cost of a longer walk to the beach or an older building.",
    "The median of {price} €/m² runs level with the city median of {cityPrice} €/m², so the choice comes down to build quality and year of construction rather than location.",
    "At {price} €/m² the asking median is above the city median of {cityPrice} €/m². You are paying for a specific spot: proximity to {landmark} and the standard of the development.",
    "A median of {price} €/m² puts this address in the top tier of {region} ({regionPrice} €/m² for the region). Here views, the building line and completion year drive the price, not floor area.",
  ],
  growthByTier: [
    "Prices are broadly flat year on year ({growth}), which leaves room to negotiate.",
    "The market is rising steadily at {growth} year on year, with no pressure on buyers.",
    "Momentum is visible: {growth} year on year, above the regional average.",
    "This is one of the fastest-appreciating addresses around: {growth} year on year.",
  ],
  yieldByTier: [
    "A gross yield of {yield} is not spectacular, but the location defends itself through capital growth. With rent at {rent} €/m² per month, the net figure lands near {netYield}.",
    "A gross yield of {yield} on rent of {rent} €/m² per month translates into roughly {netYield} net after costs.",
    "{yield} gross and {netYield} net on a median rent of {rent} €/m² per month - in this part of {city} the rent covers most of the holding costs.",
    "At {yield} gross ({netYield} net) this is one of the strongest results in the region. Rent of {rent} €/m² per month holds up because demand around {landmark} runs all year, not only in summer.",
  ],
  costVariants: [
    "Add {purchaseCosts} in transaction costs. Transfer tax in {authority} is {itp}% on resale, plus notary, Land Registry and legal fees.",
    "Transfer tax in {authority} ({itp}% on resale) is the largest single item; total entry costs land near {purchaseCosts}. The rest is notary, registry and lawyer.",
    "The budget closes only after adding {purchaseCosts}. On resale you pay {itp}% transfer tax in {authority}; new-build adds 10% VAT plus stamp duty.",
  ],
  buyerByTier: [
    "Foreign buyers account for {foreign} of purchases in {cityLoc}, so the market stays largely local and prices are less exposed to fashion.",
    "International buyers make up {foreign} of transactions in {cityLoc}, and Polish buyers represent {polish} of that group - enough for a liquid resale market.",
    "In {cityLoc} {foreign} of buyers come from abroad, with Polish buyers at {polish}. That mix means your exit does not depend on a single market.",
    "Foreign demand is strong here: {foreign} of purchases, {polish} of them Polish. Buyers come for the location around {landmark}, which is why listings move faster than average.",
  ],
  demandByTier: [
    "Demand reads as moderate (index {demand}/10), so there is room to negotiate.",
    "Demand is steady (index {demand}/10) - a classic second-home market.",
    "Demand is high (index {demand}/10) and listings move quickly.",
    "Demand is very high (index {demand}/10); good units leave the portals within weeks.",
  ],
  liquidityByTier: [
    "The median time on market is {days} days - among the fastest in the region.",
    "The median time on market is {days} days, in line with the regional average.",
    "Listings sit on the market for {days} days on average, which usually means the asking price started too high.",
    "The median is {days} days, so either patience or realistic pricing from day one is required.",
  ],
  cheaperSibling: "Cheaper within the same municipality: {name} at {price} €/m² (yield {yield}).",
  pricierSibling: "The pricier segment is {name} with a median of {price} €/m².",
  siblingSummary:
    "The gap to neighbouring areas shows how much you pay for the address and how much for the property itself.",
  monthlyNote:
    "A 70 m² unit needs roughly {budget70} before transaction costs; every extra 10 m² moves the budget by about {step}.",
  faqPrice: "What does a square metre cost in {districtLoc} in {year}?",
  faqRoi: "What rental return does {districtLoc} offer?",
  faqLiquidity: "How quickly do properties sell in {districtLoc}?",
  faqBuyers: "Who buys property in {districtLoc}?",
  faqIdentity: [
    "Yes, without restrictions. EU citizens have the same property rights as Spanish nationals. You need an NIE number for the deed and tax filings, plus a Spanish bank account or proof of transfer from Poland.",
    "Yes. Polish buyers purchase in {districtLoc} on the same terms as Spanish buyers: an NIE, a Spanish bank account and a sworn translator at the notary. The deal can close in a single trip if financing is arranged in advance.",
    "No obstacles. You need an NIE, a Spanish bank account and a translator present when the public deed is signed. In {cityLoc} we handle the process in Polish from reservation to keys.",
  ],
  faqTax: [
    "On resale you pay {itp}% transfer tax in {authority}; new-build is 10% VAT plus stamp duty. Including notary, Land Registry and legal fees, entry costs reach about {purchaseCosts} of the price. Annual charges are IBI and rental income tax under IRPF.",
    "{itp}% transfer tax applies on resale in {authority}, 10% VAT plus stamp duty on new-build. Total entry costs come to roughly {purchaseCosts}. Afterwards you pay IBI and declare rental income in IRPF.",
    "Resale: {itp}% transfer tax in {authority}. New-build: 10% VAT and stamp duty. With notary, registry and lawyer the total is about {purchaseCosts}; annual costs are IBI plus IRPF on rental income, and capital gains tax on exit.",
  ],
};

const ES: DistrictCopy = {
  rynek: "Mercado inmobiliario en {districtLoc}: {year}",
  okolica: "Entorno y parque residencial",
  roi: "Lo que realmente renta el alquiler",
  koszty: "Gastos de compra, impuestos y trámites",
  kupujacy: "Quién compra en {districtLoc}",
  dane: "Cifras clave de un vistazo",
  openers: [
    "En {districtLoc} estamos ante una {districtType} de {subregion}; {landmark} es el punto de referencia que los compradores preguntan primero y lo que separa este micromercado del resto de {city}.",
    "Si preguntas por {districtLoc}, lo primero que aparece es {landmark}. El parque residencial se organiza como {districtType} en torno a ese punto, lo que reduce el comprador tipo a quien busca un estándar concreto y no solo metros.",
    "Antes de comparar precios en {districtLoc} conviene saber esto: es una {districtType} de {subregion}. La cercanía de {landmark} y {landmark2} sostiene la demanda de alquiler, pero también eleva la comunidad de propietarios, y ese gasto decide la rentabilidad real.",
  ],
  okolicaParagraphs: [
    "Tipo de ubicación: {districtType}. Puntos de referencia que aparecen en los anuncios: {landmark}, {landmark2}. En la práctica son los que marcan la diferencia entre dos viviendas con los mismos metros en {district}: distancia a {landmark}, línea de edificación y año de entrega.",
    "En {district} la referencia es {landmark} y {landmark2} - los lugares que el inquilino comprueba primero. Administrativa y logísticamente la zona depende de {city}, en la parte de {subregion}, y eso pesa tanto en el alquiler como en la reventa.",
    "Dos líneas bastan: una {districtType} con acceso directo a {landmark}. Esa combinación da a la zona un perfil de {subregion}, donde el alquiler vacacional y el de larga temporada se complementan.",
  ],
  priceByTier: [
    "La mediana de oferta de {price} €/m² está claramente por debajo de la media de la ciudad ({cityPrice} €/m²). Compras más metros con el mismo presupuesto, normalmente a cambio de más distancia a la playa o de un edificio más antiguo.",
    "La mediana de {price} €/m² va en línea con la del municipio ({cityPrice} €/m²), así que la decisión depende de la calidad y del año de construcción, no de la ubicación.",
    "Los {price} €/m² superan la mediana del municipio ({cityPrice} €/m²). Esa prima se paga por un punto concreto: la cercanía de {landmark} y el estándar de la urbanización.",
    "Una mediana de {price} €/m² sitúa la zona en la gama alta de {region} ({regionPrice} €/m² en la región). Aquí el precio lo marcan las vistas, la línea de edificación y el año de entrega, no los metros.",
  ],
  growthByTier: [
    "Los precios están prácticamente planos interanual ({growth}), así que hay margen de negociación.",
    "El mercado sube con calma: {growth} interanual, sin presión sobre el comprador.",
    "El impulso es claro: {growth} interanual, por encima de la media regional.",
    "Es una de las zonas que más se revaloriza: {growth} interanual.",
  ],
  yieldByTier: [
    "Una rentabilidad bruta de {yield} no es espectacular, pero la ubicación se defiende con revalorización. Con un alquiler de {rent} €/m² al mes, el neto baja a {netYield}.",
    "Una rentabilidad bruta de {yield} con alquiler de {rent} €/m² al mes equivale a un {netYield} neto después de gastos.",
    "{yield} bruto y {netYield} neto con alquiler mediano de {rent} €/m² al mes: en esta parte de {city} el alquiler cubre buena parte de los gastos de mantenimiento.",
    "Con {yield} bruto ({netYield} neto) el resultado está entre los mejores de la región. El alquiler de {rent} €/m² al mes se sostiene porque la demanda en torno a {landmark} no es solo de temporada.",
  ],
  costVariants: [
    "Añade un {purchaseCosts} en gastos de compra. El ITP en {authority} es del {itp}% en segunda mano, más notaría, Registro de la Propiedad y abogado.",
    "El ITP de {authority} ({itp}% en segunda mano) es la partida más grande; el coste total de entrada ronda el {purchaseCosts}. El resto es notaría, registro y abogado.",
    "El presupuesto se cierra al añadir el {purchaseCosts}. En segunda mano pagas el {itp}% de ITP en {authority}; la obra nueva añade IVA del 10% y AJD.",
  ],
  buyerByTier: [
    "Los compradores extranjeros representan el {foreign} de las compras en {cityLoc}, así que el mercado sigue siendo local y los precios dependen menos de las modas.",
    "Los compradores internacionales suponen el {foreign} de las operaciones en {cityLoc}, y los polacos son el {polish} de ese grupo: suficiente para un mercado secundario líquido.",
    "En {cityLoc} el {foreign} de los compradores viene del extranjero y el {polish} son polacos. Esa mezcla hace que tu salida no dependa de un solo mercado.",
    "La demanda extranjera es fuerte: el {foreign} de las compras, de las cuales el {polish} son polacas. Buscan la zona de {landmark}, y por eso los anuncios se mueven más rápido que la media.",
  ],
  demandByTier: [
    "La demanda es moderada (índice {demand}/10), así que hay margen para negociar.",
    "La demanda es estable (índice {demand}/10): un mercado clásico de segunda residencia.",
    "La demanda es alta (índice {demand}/10) y los anuncios se mueven rápido.",
    "La demanda es muy alta (índice {demand}/10); las buenas viviendas desaparecen de los portales en pocas semanas.",
  ],
  liquidityByTier: [
    "La mediana de tiempo en mercado es de {days} días, una de las más rápidas de la región.",
    "La mediana de tiempo en mercado es de {days} días, en línea con la media regional.",
    "Los anuncios permanecen {days} días de media, lo que suele indicar un precio de salida alto.",
    "La mediana es de {days} días: hace falta paciencia o un precio realista desde el primer día.",
  ],
  cheaperSibling: "Más barato en el mismo municipio: {name} con {price} €/m² (rentabilidad {yield}).",
  pricierSibling: "El segmento más caro es {name}, con una mediana de {price} €/m².",
  siblingSummary:
    "La diferencia con las zonas vecinas muestra cuánto pagas por la dirección y cuánto por la vivienda en sí.",
  monthlyNote:
    "Una vivienda de 70 m² requiere unos {budget70} antes de gastos; cada 10 m² adicionales mueven el presupuesto en torno a {step}.",
  faqPrice: "¿Cuánto cuesta el metro cuadrado en {districtLoc} en {year}?",
  faqRoi: "¿Qué rentabilidad ofrece el alquiler en {districtLoc}?",
  faqLiquidity: "¿Con qué rapidez se vende una vivienda en {districtLoc}?",
  faqBuyers: "¿Quién compra vivienda en {districtLoc}?",
  faqIdentity: [
    "Sí, sin restricciones. Los ciudadanos de la UE tienen los mismos derechos que los españoles. Necesitas el NIE para la escritura y los impuestos, además de una cuenta bancaria española o justificante de transferencia desde Polonia.",
    "Sí. Los compradores polacos compran en {districtLoc} en las mismas condiciones que los españoles: NIE, cuenta bancaria española y traductor jurado en la notaría. La operación puede cerrarse en un solo viaje si la financiación está preparada.",
    "Sin obstáculos. Hacen falta el NIE, una cuenta en un banco español y un traductor en la firma de la escritura pública. En {cityLoc} gestionamos todo el proceso en polaco, desde la reserva hasta las llaves.",
  ],
  faqTax: [
    "En segunda mano pagas el ITP del {itp}% en {authority}; en obra nueva, IVA del 10% y AJD. Con notaría, Registro de la Propiedad y abogado, los gastos de entrada rondan el {purchaseCosts} del precio. Cada año se suman el IBI y el IRPF del alquiler.",
    "El ITP en {authority} es del {itp}% en segunda mano; la obra nueva tributa al 10% de IVA más AJD. El coste total de entrada se queda en torno al {purchaseCosts}. Después llegan el IBI y la declaración del alquiler en el IRPF.",
    "Segunda mano: ITP del {itp}% en {authority}. Obra nueva: IVA del 10% y AJD. Con notaría, registro y abogado el total es aproximadamente el {purchaseCosts}; cada año, IBI más IRPF del alquiler, y plusvalía al vender.",
  ],
};

const COPY: Record<"en" | "es", DistrictCopy> = { en: EN, es: ES };

/**
 * Typ lokalizacji w słowach danego języka. W danych `district.type` jest po
 * polsku (dzielnica/urbanizacja/plaza/osiedle) - bez mapowania angielska
 * strona mówiłaby „a urbanizacja”, a hiszpańska mieszałaby języki.
 */
export const TYPE_LABELS: Record<"en" | "es", Record<string, string>> = {
  en: {
    dzielnica: "city district",
    urbanizacja: "residential development",
    plaza: "beach area",
    osiedle: "residential estate",
  },
  es: {
    dzielnica: "zona urbana",
    urbanizacja: "urbanización residencial",
    plaza: "zona de playa",
    osiedle: "residencial",
  },
};

export function buildLocalizedDistrictBlocks(input: LocalizedDistrictInput): ContentBlock[] {
  const { locale, service, stats, city, district, region, key, vars } = input;
  const copy = COPY[locale];
  const tax = regionTax(region.slug);
  const step = formatEur(Math.round(stats.pricePerM2 * 10));
  const typeLabel = TYPE_LABELS[locale][district.type] ?? district.type;

  const localT = (template: string, extra: Record<string, string> = {}) =>
    interpolate(template, {
      ...vars,
      itp: String(tax.itp),
      authority: tax.authority,
      step,
      districtType: typeLabel,
      ...extra,
    });

  const siblings = city.districts
    .filter((item) => item.slug !== district.slug)
    .slice()
    .sort(
      (a, b) =>
        Math.abs(a.pricePerM2 - stats.pricePerM2) - Math.abs(b.pricePerM2 - stats.pricePerM2),
    )
    .slice(0, 3);

  const siblingBullets = siblings.map(
    (item) =>
      `${item.name}: ${formatEur(item.pricePerM2)}/m² · ${locale === "es" ? "ROI" : "yield"} ${formatRate(item.rentalYield)}`,
  );

  const cheaper = siblings.find((item) => item.pricePerM2 < stats.pricePerM2);
  const pricier = siblings.find((item) => item.pricePerM2 > stats.pricePerM2);
  const siblingText = [
    cheaper
      ? localT(copy.cheaperSibling, {
          name: cheaper.name,
          price: formatEur(cheaper.pricePerM2),
          yield: formatRate(cheaper.rentalYield),
        })
      : "",
    pricier
      ? localT(copy.pricierSibling, { name: pricier.name, price: formatEur(pricier.pricePerM2) })
      : "",
    copy.siblingSummary,
  ]
    .filter(Boolean)
    .join(" ");

  // Zdanie „pod intencję” usługi: strony tej samej dzielnicy dla różnych usług
  // dzielą ~85% treści lokalizacyjnej, więc bez niego wypadają najwyżej.
  const angle =
    locale === "es"
      ? ({
          buy: `Enfoque para quien compra para uso propio: compara ${formatEur(stats.pricePerM2)}/m² con los gastos de mantenimiento y comprueba si el presupuesto de 70 m² (${formatEur(stats.pricePerM2 * 70)}) es realista en {districtLoc}.`,
          villa: `Enfoque chalet con piscina: en {districtLoc} la parcela y la piscina elevan la entrada, pero también la renta de temporada; por eso el ROI se calcula sobre el valor del inmueble y no sobre el metro.`,
          investment: `Enfoque inversor: en {districtLoc} importa el ${formatRate(stats.rentalYield)} bruto y también la salida - con ${stats.avgDaysOnMarket} días de exposición y demanda ${stats.demandIndex}/10 la liquidez es ${stats.avgDaysOnMarket <= 100 ? "superior a la media" : "media para la región"}.`,
          "lead-magnet": `Punto de partida para la valoración: antes de pedir el análisis de una vivienda concreta en {districtLoc}, revisa la mediana (${formatEur(stats.pricePerM2)}/m²), los gastos de entrada (${formatRate(stats.purchaseCostsRate * 100)}) y el rango de alquiler (${stats.monthlyRentPerM2} €/m² al mes).`,
        } as Record<string, string>)[service.kind] ?? ""
      : ({
          buy: `Written for owner-occupiers: compare ${formatEur(stats.pricePerM2)}/m² with holding costs and check whether a 70 m² budget (${formatEur(stats.pricePerM2 * 70)}) is realistic in {districtLoc}.`,
          villa: `Villa-and-pool angle: in {districtLoc} the plot and pool raise entry costs but also seasonal rent, which is why ROI here is calculated on property value rather than floor area.`,
          investment: `Investor angle: in ${district.name} the ${formatRate(stats.rentalYield)} gross yield matters, but so does the exit - with ${stats.avgDaysOnMarket} days on market and demand at ${stats.demandIndex}/10, liquidity is ${stats.avgDaysOnMarket <= 100 ? "above average" : "average for the region"}.`,
          "lead-magnet": `Starting point for a valuation: before ordering an analysis of a specific unit in {districtLoc}, check the median (${formatEur(stats.pricePerM2)}/m²), entry costs (${formatRate(stats.purchaseCostsRate * 100)}) and rent range (${stats.monthlyRentPerM2} €/m² per month).`,
        } as Record<string, string>)[service.kind] ?? "";

  const scorecard =
    locale === "es"
      ? `Precio ${formatEur(stats.pricePerM2)}/m², alquiler ${stats.monthlyRentPerM2} €/m² al mes, ROI bruto ${formatRate(stats.rentalYield)} y neto ${formatRate(stats.netYield)}, revalorización ${formatRate(stats.priceGrowth)} anual, tiempo de venta ${stats.avgDaysOnMarket} días, gastos de compra ${formatRate(stats.purchaseCostsRate * 100)}, presupuesto para 70 m² ${formatEur(stats.pricePerM2 * 70)}, operaciones en 12 meses: ${stats.transactions12m}.`
      : `Price ${formatEur(stats.pricePerM2)}/m², rent ${stats.monthlyRentPerM2} €/m² per month, gross yield ${formatRate(stats.rentalYield)} and net ${formatRate(stats.netYield)}, capital growth ${formatRate(stats.priceGrowth)} a year, time to sell ${stats.avgDaysOnMarket} days, purchase costs ${formatRate(stats.purchaseCostsRate * 100)}, budget for 70 m² ${formatEur(stats.pricePerM2 * 70)}, transactions in 12 months: ${stats.transactions12m}.`;

  const comparison =
    locale === "es"
      ? `Referencia: ${formatEur(stats.cityPricePerM2)}/m² en ${city.name} y ${formatEur(stats.regionPricePerM2)}/m² en ${region.name}. Demanda ${stats.demandIndex}/10, compradores extranjeros ${formatRate(stats.foreignBuyerShare, 0)}, polacos ${formatRate(stats.polishBuyerShare, 0)}. Datos: ${stats.dataAsOf} (modelo de oferta, sustituible por Idealista/Fotocasa).`
      : `Reference points: ${formatEur(stats.cityPricePerM2)}/m² in ${city.name} and ${formatEur(stats.regionPricePerM2)}/m² across ${region.name}. Demand ${stats.demandIndex}/10, foreign buyers ${formatRate(stats.foreignBuyerShare, 0)}, Polish buyers ${formatRate(stats.polishBuyerShare, 0)}. Data: ${stats.dataAsOf} (asking-price model, replaceable with an Idealista/Fotocasa feed).`;

  const grossRent = Math.round((stats.pricePerM2 * 70 * stats.rentalYield) / 100);
  const netRent = Math.round((stats.pricePerM2 * 70 * stats.netYield) / 100);

  const scenario =
    locale === "es"
      ? `Escenario real: 70 m² en {districtLoc} generan unos ${formatEur(grossRent)} € de alquiler bruto al año y ${formatEur(netRent)} € netos tras gestión, impuestos y vacíos. Una inversión de 250 000 € devuelve en cinco años alrededor de {return5y} € entre alquiler neto y revalorización, es decir, {returnPercent}% del presupuesto.`
      : `Real scenario: a 70 m² unit in {districtLoc} produces about ${formatEur(grossRent)} € of gross rent a year and ${formatEur(netRent)} € net after management, tax and voids. A 250 000 € investment returns roughly {return5y} € over five years in net rent plus appreciation, i.e. {returnPercent}% of the budget.`;

  const shortLet =
    locale === "es"
      ? "El alquiler vacacional eleva los ingresos en temporada, pero exige licencia turística y multiplica los costes operativos. Para muchos inversores el alquiler de larga temporada, con menos riesgo de vacío, resulta más rentable."
      : "Short-term letting lifts seasonal income but requires a tourist licence and multiplies operating costs. For many investors long-term letting, with lower void risk, proves more profitable.";

  const holding =
    locale === "es"
      ? `Después de la compra llegan los gastos fijos: IBI, comunidad de propietarios y seguro. En ${district.name} la comunidad depende del estándar de la urbanización y de los servicios comunes, una partida que los anuncios suelen omitir.`
      : `After completion come the fixed costs: IBI, community fees and insurance. In ${district.name} the community charge depends on the standard of the development and its shared facilities - an item listings tend to omit.`;

  const tenantProfile = typeLabel;
  const tenant =
    locale === "es"
      ? `El inquilino en {districtLoc} sale de dos grupos: quien trabaja en {cityLoc} y familias que buscan una ${tenantProfile} cerca de ${district.landmarks[0] ?? city.name}. Dos perfiles con distinta tolerancia al estándar y al tamaño, y distinta sensibilidad al precio.`
      : `Tenants in {districtLoc} come from two groups: people working in {cityLoc} and families looking for a ${tenantProfile} near ${district.landmarks[0] ?? city.name}. Two profiles with different tolerance for specification and floor area, and different price sensitivity.`;

  return [
    {
      id: "rynek",
      heading: localT(copy.rynek),
      paragraphs: [
        localT(pick(copy.openers, key, "open")),
        `${localT(pickByTier(copy.priceByTier, priceTier(stats)))} ${localT(
          pickByTier(copy.growthByTier, growthTier(stats)),
        )}`,
        localT(copy.monthlyNote),
        localT(angle),
      ],
    },
    {
      id: "okolica",
      heading: localT(copy.okolica),
      paragraphs: [localT(pick(copy.okolicaParagraphs, key, "okolica")), siblingText],
      bullets: siblingBullets.length > 0 ? siblingBullets : undefined,
    },
    {
      id: "roi",
      heading: localT(copy.roi),
      paragraphs: [localT(pickByTier(copy.yieldByTier, yieldTier(stats))), localT(scenario), shortLet],
    },
    {
      id: "koszty",
      heading: localT(copy.koszty),
      paragraphs: [localT(pick(copy.costVariants, key, "cost")), localT(holding)],
      bullets: service.checklist.map((item) => localT(item)),
    },
    {
      id: "kupujacy",
      heading: localT(copy.kupujacy),
      paragraphs: [
        `${localT(pickByTier(copy.buyerByTier, foreignTier(stats)))} ${localT(
          pickByTier(copy.demandByTier, demandTier(stats)),
        )}`,
        localT(pickByTier(copy.liquidityByTier, liquidityTier(stats))),
        localT(tenant),
      ],
    },
    {
      // Blok usługi. Różnicuje strony tej samej lokalizacji dla różnych usług
      // (buy / villa / investment / lead magnet). Bez niego pary „ta sama
      // dzielnica, inna usługa” wypadały najwyżej w audycie podobieństwa.
      id: "usluga",
      heading: service.name,
      paragraphs: service.benefits
        .slice(0, 2)
        .map((benefit) => `${localT(benefit.title)}: ${localT(benefit.description)}`),
      bullets: service.checklist.slice(0, 3).map((item) => localT(item)),
    },
    {
      id: "dane",
      heading: localT(copy.dane),
      paragraphs: [scorecard, comparison],
    },
  ];
}

/**
 * FAQ EN/ES generowane z danych. Zastępuje statyczny słownik, który dawał
 * identyczne odpowiedzi na wszystkich 70 dzielnicach (po normalizacji cyfr).
 */
export function buildLocalizedDistrictFaq(
  input: LocalizedDistrictInput,
  serviceFaq: { q: string; a: string }[],
): FaqItem[] {
  const { locale, stats, city, district, region, key, vars } = input;
  const copy = COPY[locale];

  const localT = (template: string) => interpolate(template, vars);

  const priceAnswers =
    locale === "es"
      ? [
          `La mediana de oferta en ${district.nameLocative} es de ${formatEur(stats.pricePerM2)} (datos: ${stats.dataAsOf}), por debajo de la media del municipio (${formatEur(stats.cityPricePerM2)}) y de la región ${region.name} (${formatEur(stats.regionPricePerM2)}). Un precio inferior suele implicar obra más antigua o mayor distancia a la playa.`,
          `El metro en ${district.nameLocative} cuesta unos ${formatEur(stats.pricePerM2)} (datos: ${stats.dataAsOf}), en línea con la mediana de ${city.name} (${formatEur(stats.cityPricePerM2)}). La diferencia se juega en el estándar y el año de construcción: una vivienda de 70 m² ronda los ${formatEur(stats.pricePerM2 * 70)}.`,
          `Con ${formatEur(stats.pricePerM2)}/m² (datos: ${stats.dataAsOf}) la zona supera la mediana del municipio y se acerca a la gama alta de ${region.name} (${formatEur(stats.regionPricePerM2)}). Aquí el precio lo fijan las vistas, la línea de edificación y el estándar de la urbanización.`,
        ]
      : [
          `The asking median in ${district.nameLocative} is ${formatEur(stats.pricePerM2)} (data: ${stats.dataAsOf}), below the city average of ${formatEur(stats.cityPricePerM2)} and the ${region.name} median of ${formatEur(stats.regionPricePerM2)}. A lower price usually means an older building or a longer walk to the beach.`,
          `A square metre in ${district.nameLocative} costs around ${formatEur(stats.pricePerM2)} (data: ${stats.dataAsOf}), level with the ${city.name} median of ${formatEur(stats.cityPricePerM2)}. The difference is build quality and year of construction: a 70 m² unit comes to roughly ${formatEur(stats.pricePerM2 * 70)}.`,
          `At ${formatEur(stats.pricePerM2)}/m² (data: ${stats.dataAsOf}) the area sits above the city median and close to the top of the ${region.name} range (${formatEur(stats.regionPricePerM2)}). Views, the building line and the standard of the development set the price here.`,
        ];

  const yieldAnswers =
    locale === "es"
      ? [
          `La rentabilidad bruta es del ${formatRate(stats.rentalYield)} (neta en torno al ${formatRate(stats.netYield)}). Con un alquiler mediano de ${stats.monthlyRentPerM2} €/m² al mes, una vivienda de 70 m² genera unos ${formatEur(Math.round((stats.pricePerM2 * 70 * stats.rentalYield) / 100))} € brutos al año: en este segmento el retorno lo aporta más la revalorización que la renta.`,
          `Con ${formatRate(stats.rentalYield)} bruto y ${formatRate(stats.netYield)} neto tras gastos de gestión, impuestos y vacíos, el alquiler de ${stats.monthlyRentPerM2} €/m² al mes cubre el mantenimiento y deja margen. Es un nivel habitual en ${TYPE_LABELS[locale][district.type] ?? "la zona"}.`,
          `El resultado está entre los mejores de la región: ${formatRate(stats.rentalYield)} bruto y ${formatRate(stats.netYield)} neto sobre ${stats.monthlyRentPerM2} €/m² al mes, sostenido por una demanda de ${stats.demandIndex}/10 y una rotación de ${stats.avgDaysOnMarket} días.`,
        ]
      : [
          `Gross yield is ${formatRate(stats.rentalYield)} (net around ${formatRate(stats.netYield)}). On a median rent of ${stats.monthlyRentPerM2} €/m² per month, a 70 m² unit produces about ${formatEur(Math.round((stats.pricePerM2 * 70 * stats.rentalYield) / 100))} € a year gross: in this segment appreciation, not rent, does most of the work.`,
          `At ${formatRate(stats.rentalYield)} gross and ${formatRate(stats.netYield)} net after management, tax and voids, rent of ${stats.monthlyRentPerM2} €/m² per month covers costs and leaves a margin. That is a normal level for a ${TYPE_LABELS[locale][district.type] ?? "residential area"}.`,
          `This is one of the strongest results in the region: ${formatRate(stats.rentalYield)} gross and ${formatRate(stats.netYield)} net on ${stats.monthlyRentPerM2} €/m² per month, supported by demand of ${stats.demandIndex}/10 and ${stats.avgDaysOnMarket} days on market.`,
        ];

  const liquidityAnswers =
    locale === "es"
      ? [
          `Las viviendas desaparecen del mercado en ${stats.avgDaysOnMarket} días de media, uno de los ritmos más rápidos de la región. El vendedor apenas baja el precio si la tasación es realista.`,
          `La mediana de exposición es de ${stats.avgDaysOnMarket} días, en línea con la media regional: hay tiempo para la debida diligencia, pero no para semanas de negociación.`,
          `La venta tarda ${stats.avgDaysOnMarket} días de media. Un plazo más largo suele indicar anuncios sobrevalorados, así que conviene comparar varias viviendas antes de presentar una oferta.`,
        ]
      : [
          `Properties leave the market in ${stats.avgDaysOnMarket} days on average - one of the fastest rates in the region. Sellers rarely cut the price when the valuation is realistic.`,
          `The median time on market is ${stats.avgDaysOnMarket} days, in line with the regional average: there is time for due diligence, but not for weeks of negotiation.`,
          `A sale takes ${stats.avgDaysOnMarket} days on average. A longer period usually signals overpriced listings, so compare several properties before making an offer.`,
        ];

  const buyerAnswers =
    locale === "es"
      ? [
          `El ${formatRate(stats.foreignBuyerShare, 0)} de las compras en ${city.nameLocative} corresponde a extranjeros, y los polacos son el ${formatRate(stats.polishBuyerShare, 0)}. Es una demanda mixta: segunda residencia e inversión para alquiler.`,
          `La demanda extranjera es muy alta: ${formatRate(stats.foreignBuyerShare, 0)} de las operaciones, con ${formatRate(stats.polishBuyerShare, 0)} de compradores polacos. Eso acelera la venta y reduce el margen de negociación.`,
        ]
      : [
          `${formatRate(stats.foreignBuyerShare, 0)} of purchases in ${city.nameLocative} are made by foreign buyers, with Polish buyers at ${formatRate(stats.polishBuyerShare, 0)}. Demand is mixed: second homes and buy-to-let investment.`,
          `Foreign demand is very high: ${formatRate(stats.foreignBuyerShare, 0)} of transactions, ${formatRate(stats.polishBuyerShare, 0)} of them Polish. That speeds up sales and narrows the room to negotiate.`,
        ];

  const localFaq: FaqItem[] = [
    {
      question:
        locale === "es"
          ? `¿Qué hace un agente comprador en ${district.nameLocative} y cuánto cuesta?`
          : `What does a buyer's agent do in ${district.nameLocative} and what does it cost?`,
      answer:
        locale === "es"
          ? `El agente comprador representa solo al comprador: contrasta el precio con la mediana (${formatEur(stats.pricePerM2)} €/m²), revisa la situación registral y las cargas, negocia y acompaña la compra hasta la notaría. Los honorarios se acuerdan por adelantado y no los paga el vendedor, así que no hay incentivo para inflar el precio. En ${district.nameLocative} además abre acceso a ofertas que no llegan a los portales.`
          : `A buyer's agent represents you alone: it benchmarks the price against the median (${formatEur(stats.pricePerM2)} €/m²), checks title and charges at the Land Registry, negotiates and sees the purchase through to the notary. The fee is agreed upfront and is not paid by the seller, so there is no incentive to inflate the price. In ${district.nameLocative} it also opens access to stock that never reaches the portals.`,
    },
    { question: localT(copy.faqPrice), answer: pickByTier(priceAnswers, priceTier(stats)) },
    { question: localT(copy.faqRoi), answer: pickByTier(yieldAnswers, yieldTier(stats)) },
    { question: localT(copy.faqBuyers), answer: pickByTier(buyerAnswers, foreignTier(stats)) },
    { question: localT(copy.faqLiquidity), answer: pickByTier(liquidityAnswers, liquidityTier(stats)) },
    {
      question:
        locale === "es"
          ? `¿Un polaco puede comprar en ${district.nameLocative}?`
          : `Can a Polish buyer purchase in ${district.nameLocative}?`,
      answer: localT(pick(copy.faqIdentity, key, "identity")),
    },
    {
      question:
        locale === "es"
          ? `¿Qué impuestos se pagan al comprar en ${district.nameLocative}?`
          : `What taxes apply when buying in ${district.nameLocative}?`,
      answer: localT(pick(copy.faqTax, key, "tax")),
    },
  ];

  const notes =
    locale === "es"
      ? [
          `En ${district.nameLocative} el producto dominante es ${TYPE_LABELS.es[district.type] ?? "vivienda residencial"}, lo que define el perfil del inquilino y la renta mensual.`,
          `La cercanía de ${district.landmarks[0] ?? city.name} sostiene la demanda de alquiler en temporada, pero también eleva la comunidad de propietarios.`,
          `El tipo de ubicación limita la oferta de obra nueva, de modo que la rotación de anuncios es más lenta que en el centro de ${city.name}.`,
        ]
      : [
          `In ${district.nameLocative} the dominant product is a ${TYPE_LABELS.en[district.type] ?? "residential property"}, which shapes the tenant profile and the monthly rent.`,
          `Closeness to ${district.landmarks[0] ?? city.name} supports seasonal rental demand but also pushes up community fees.`,
          `The location type limits new-build supply, so listings turn over more slowly than in central ${city.name}.`,
        ];

  const localizedServiceFaq: FaqItem[] = serviceFaq.map((item, index) => {
    const answer = localT(item.a);
    const note = notes[hashString(`${key}::note${index}`) % notes.length] ?? "";
    return {
      question: localT(item.q),
      answer: index % 2 === 0 ? `${answer} ${note}` : answer,
    };
  });

  const merged = pick([true, false], key, "faqorder")
    ? [...localFaq, ...localizedServiceFaq]
    : [...localizedServiceFaq, ...localFaq];

  return rotate(merged, hashString(`${key}::faq`) % merged.length);
}








