import type { CitySeed, DistrictSeed, RegionSeed } from "../data/schema";
import type { MarketStats } from "./market-stats";
import type { Locale } from "../i18n/config";
import { formatEur, formatRate } from "../utils/format";
import { hashString } from "./deterministic";

/**
 * ===========================================================================
 * DEEP DIVE DZIELNICY (PL / EN / ES)
 * ===========================================================================
 * Dlaczego ten moduł istnieje: strony tej samej usługi w dwóch różnych
 * dzielnicach dzieliły ten sam szkielet, a FAQ odpowiadało za ~45% tekstu
 * strony przy Jaccardzie 0.75-0.82. Same liczby nie różnicują, bo walidator
 * normalizuje cyfry do "#". Różnicują nazwy własne i sposób ujęcia.
 *
 * Dlatego każdy akapit składa się z:
 *  - nazw landmarków dzielnicy (unikalne w bazie),
 *  - pasm (relacja ceny do miasta, rentowność, popyt, ekspozycja oferty),
 *  - jednego z kilku wariantów zdania wybieranego hashem z URL-a,
 *  - porównania z realnym sąsiadem cenowym w tej samej gminie.
 *
 * Determinizm: ten sam URL zawsze daje ten sam tekst (hashString).
 */

export interface DistrictDeepDive {
  heading: string;
  paragraphs: string[];
}

export interface DistrictFaqExtra {
  question: string;
  answer: string;
}

const HEADINGS: Record<Locale, string[]> = {
  pl: [
    "Dzielnica od środka: ceny, ludzie, decyzje",
    "Ten adres w praktyce: co kupujesz i za co płacisz",
    "Mikrosąsiedztwo: kto tu kupuje i czego pilnować",
    "Adres pod lupą: cena, popyt, sąsiedzi",
  ],
  en: [
    "Inside the district: prices, people, decisions",
    "What this address actually buys you",
    "Micro-neighbourhood: who buys here and what to watch",
    "The address under review: price, demand, neighbours",
  ],
  es: [
    "El barrio por dentro: precios, gente, decisiones",
    "Qué compras de verdad en esta dirección",
    "Microrrodeo: quién compra aquí y de qué cuidarse",
    "La dirección a examen: precio, demanda, vecinos",
  ],
};

const PRICE_BAND_HEADINGS: Record<Locale, string[]> = {
  pl: ["Pozycja cenowa", "Cena na tle gminy", "Gdzie stoisz cenowo"],
  en: ["Where the price sits", "The price against the town", "Price position"],
  es: ["Posición de precio", "El precio frente al municipio", "Dónde está el precio"],
};

function pickOne<T>(items: readonly T[], key: string, salt: string): T {
  return items[hashString(`${key}::${salt}`) % items.length] as T;
}

/** Unikalne landmarki dzielnicy (w bazie zdarzają się powtórzenia). */
function landmarks(district: DistrictSeed): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of district.landmarks) {
    const key = item.trim();
    if (!key || seen.has(key.toLowerCase())) continue;
    seen.add(key.toLowerCase());
    out.push(key);
  }
  return out;
}

type PriceBand = "deep" | "below" | "inline" | "above" | "top";
type YieldBand = "low" | "mid" | "high" | "top";
type DemandBand = "soft" | "normal" | "hot";
type DaysBand = "fast" | "normal" | "slow";

function priceBand(ratio: number): PriceBand {
  if (ratio < 0.85) return "deep";
  if (ratio < 0.98) return "below";
  if (ratio < 1.08) return "inline";
  if (ratio < 1.3) return "above";
  return "top";
}

function yieldBand(value: number): YieldBand {
  if (value < 5.5) return "low";
  if (value < 6.2) return "mid";
  if (value < 6.9) return "high";
  return "top";
}

function demandBand(value: number): DemandBand {
  if (value < 7) return "soft";
  if (value < 8.5) return "normal";
  return "hot";
}

function daysBand(value: number): DaysBand {
  if (value <= 95) return "fast";
  if (value <= 130) return "normal";
  return "slow";
}

export function bandsFor(stats: MarketStats) {
  return {
    price: priceBand(stats.pricePerM2 / Math.max(1, stats.cityPricePerM2)),
    yield: yieldBand(stats.rentalYield),
    demand: demandBand(stats.demandIndex),
    days: daysBand(stats.avgDaysOnMarket),
    ratio: stats.pricePerM2 / Math.max(1, stats.cityPricePerM2),
  };
}

/** Najbliższy cenowo i najbardziej dochodowy sąsiad w tej samej gminie. */
function siblings(city: CitySeed, district: DistrictSeed) {
  const others = city.districts.filter((item) => item.slug !== district.slug);
  if (others.length === 0) return null;
  const byPrice = others
    .slice()
    .sort(
      (a, b) =>
        Math.abs(a.pricePerM2 - district.pricePerM2) - Math.abs(b.pricePerM2 - district.pricePerM2),
    )[0]!;
  const byYield = others.slice().sort((a, b) => b.rentalYield - a.rentalYield)[0]!;
  return { byPrice, byYield };
}

interface Ctx {
  key: string;
  city: CitySeed;
  district: DistrictSeed;
  stats: MarketStats;
  n: string;
  loc: string;
  gen: string;
  cityLoc: string;
  lm0: string;
  lm1: string;
  price: string;
  cityPrice: string;
  regionPrice: string;
  yieldRate: string;
  netRate: string;
  days: number;
  demand: number;
  rent: string;
  sibPrice: string;
  sibPriceVal: string;
  sibYieldName: string;
  sibYieldVal: string;
  bands: ReturnType<typeof bandsFor>;
}

function makeCtx(city: CitySeed, district: DistrictSeed, stats: MarketStats, key: string): Ctx {
  const lm = landmarks(district);
  const sib = siblings(city, district);
  return {
    key,
    city,
    district,
    stats,
    n: district.name,
    loc: district.nameLocative,
    gen: district.nameGenitive,
    cityLoc: city.nameLocative,
    lm0: lm[0] ?? city.name,
    lm1: lm[1] ?? "",
    price: formatEur(stats.pricePerM2),
    cityPrice: formatEur(stats.cityPricePerM2),
    regionPrice: formatEur(stats.regionPricePerM2),
    yieldRate: formatRate(stats.rentalYield),
    netRate: formatRate(stats.netYield),
    days: stats.avgDaysOnMarket,
    demand: stats.demandIndex,
    rent: stats.monthlyRentPerM2.toFixed(1).replace(".", ","),
    sibPrice: sib?.byPrice.name ?? city.name,
    sibPriceVal: formatEur(sib?.byPrice.pricePerM2 ?? city.pricePerM2),
    sibYieldName: sib?.byYield.name ?? city.name,
    sibYieldVal: formatRate(sib?.byYield.rentalYield ?? city.rentalYield),
    bands: bandsFor(stats),
  };
}

/** Kilka niezależnie rotowanych zdań = dużo kombinacji przy krótkich szablonach. */
function join(...parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const PL_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "{n} to najtańszy przedział cenowy w {cityLoc}: {price} €/m² przy medianie gminy {cityPrice} €/m².",
    "Za metr w {loc} płaci się {price} €, czyli wyraźnie mniej niż w {cityLoc} ({cityPrice} €/m²).",
    "{n} odstaje od reszty gminy w dół: {price} €/m² wobec {cityPrice} €/m² mediany.",
  ],
  below: [
    "{loc} wyceniany jest poniżej średniej gminy: {price} €/m² przy {cityPrice} €/m².",
    "W {loc} metr kosztuje {price} €, o kilkadziesiąt euro mniej niż w {cityLoc}.",
    "{n} trzyma cenę {price} €/m², czyli lekko pod medianą miasta ({cityPrice} €/m²).",
  ],
  inline: [
    "{loc} wyceniany jest jak średnia gminy: {price} €/m² przy {cityPrice} €/m².",
    "Cena w {loc} ({price} €/m²) nie odbiega od mediany {cityLoc}.",
    "{n} idzie łeb w łeb z miastem: {price} €/m² wobec {cityPrice} €/m².",
  ],
  above: [
    "{loc} należy do droższych części gminy: {price} €/m² przy {cityPrice} €/m² mediany.",
    "Za metr w {loc} płaci się {price} €, czyli powyżej średniej {cityLoc}.",
    "{n} wyceniany jest wyżej niż miasto: {price} €/m² wobec {cityPrice} €/m².",
  ],
  top: [
    "{loc} to górna półka cenowa gminy: {price} €/m² przy medianie {cityPrice} €/m².",
    "W {loc} metr kosztuje {price} €, najwięcej w {cityLoc} poza pojedynczymi wyjątkami.",
    "{n} wyznacza cenowy sufit miasta: {price} €/m² wobec {cityPrice} €/m².",
  ],
};

const PL_ANCHOR: string[] = [
  "Codzienny punkt odniesienia to {lm0}.",
  "Adres zaczyna się przy {lm0}, a kończy tam, gdzie kończy się zabudowa.",
  "Przechodząc przez dzielnicę, mija się {lm0}, więc lokalizację łatwo pokazać gościowi.",
  "Na mapie życia tej dzielnicy są dwa punkty: {lm0} i {lm1}.",
  "Wszystko, co ważne, dzieje się w promieniu {lm0}.",
];


const PL_YIELD: Record<YieldBand, string[]> = {
  low: [
    "ROI {yieldRate} brutto ({netRate} netto) to dolna strefa w tej gminie: płacisz za lokalizację, nie za przepływ gotówki.",
    "Rentowność {yieldRate} brutto nie powala, za to najemcy w tym segmencie zostają na dłużej.",
    "Przy {yieldRate} brutto zwrot liczy się latami, a nie sezonami.",
  ],
  mid: [
    "ROI {yieldRate} brutto ({netRate} netto) to środek stawki w gminie.",
    "{yieldRate} brutto i {netRate} netto to wynik, którego nie trzeba tłumaczyć inwestorowi.",
    "Rentowność {yieldRate} brutto plasuje adres w środku lokalnej tabeli.",
  ],
  high: [
    "ROI {yieldRate} brutto ({netRate} netto) należy do najlepszych w {cityLoc}.",
    "{yieldRate} brutto to wynik powyżej średniej gminy, a {netRate} netto zostawia margines.",
    "Rentowność {yieldRate} brutto wyróżnia ten adres na tle miasta.",
  ],
  top: [
    "ROI {yieldRate} brutto ({netRate} netto) to czołówka gminy.",
    "{yieldRate} brutto to najlepszy wynik, jaki w {cityLoc} da się osiągnąć przy tej cenie wejścia.",
    "Rentowność {yieldRate} brutto przy {price} €/m² to kombinacja, której szukają inwestorzy.",
  ],
};

const PL_DEMAND: Record<DemandBand, string[]> = {
  soft: [
    "Popyt oceniamy na {demand}/10, więc mieszkanie nie zniknie w tydzień.",
    "Rynek pracuje spokojnie: {demand}/10 w naszej skali popytu.",
    "Popyt {demand}/10 oznacza, że najemcę trzeba czasem poszukać.",
  ],
  normal: [
    "Popyt {demand}/10 to zdrowa równowaga między podażą a kupującymi.",
    "Przy popycie {demand}/10 decyzję podejmuje się w tygodniach, nie w miesiącach.",
    "Popyt {demand}/10 utrzymuje ceny, ale nie tworzy kolejek.",
  ],
  hot: [
    "Popyt {demand}/10 sprawia, że dobre lokale schodzą z rynku w kilka dni.",
    "Przy {demand}/10 najlepsze mieszkania sprzedają się przed ogłoszeniem.",
    "Popyt {demand}/10 to rynek sprzedającego, więc negocjuj twardo, ale szybko.",
  ],
};

const PL_DAYS: Record<DaysBand, string[]> = {
  fast: [
    "Ekspozycja oferty to średnio {days} dni, czyli krótko jak na ten region.",
    "Sprzedaż zajmuje średnio {days} dni, więc rynek nie czeka na wahających się.",
  ],
  normal: [
    "Ekspozycja oferty to średnio {days} dni, typowo dla Costa Blanca.",
    "Na sprzedaż trzeba liczyć około {days} dni.",
  ],
  slow: [
    "Ekspozycja oferty to średnio {days} dni, więc cena musi być realna od pierwszego dnia.",
    "Sprzedaż zajmuje tu około {days} dni, a to wymaga cierpliwości albo rabatu.",
  ],
};

const PL_NEIGHBOURS: string[] = [
  "Najbliżej cenowo jest {sibPrice} ({sibPriceVal} €/m²), więc to on wyznacza granicę negocjacji.",
  "Za punkt odniesienia weź {sibPrice} z medianą {sibPriceVal} €/m²: podobny standard, inna ulica.",
  "Konkurencyjny adres to {sibPrice} za {sibPriceVal} €/m², więc porównuj metraż i rok budowy, nie tylko cenę.",
  "W tej samej gminie kupujący zestawiają ten adres z {sibPrice} ({sibPriceVal} €/m²).",
];

const PL_NEIGHBOURS_YIELD: string[] = [
  "Najwyższe ROI w gminie daje {sibYieldName} ({sibYieldVal}), więc pytanie brzmi, czy warto dopłacać za lokalizację.",
  "Dla porównania {sibYieldName} osiąga {sibYieldVal} brutto, co pokazuje koszt tego adresu.",
  "Jeśli liczy się tylko zwrot, uwaga idzie na {sibYieldName} z wynikiem {sibYieldVal}.",
];

const PL_CHECKS: string[] = [
  "Zanim podpiszesz, sprawdź kartę budynku i uchwały wspólnoty z ostatnich dwóch lat.",
  "Poproś o nota simple i zaświadczenie o braku zaległości w comunidad.",
  "Zweryfikuj, czy taras lub basen są wpisane do licencji i do rejestru nieruchomości.",
  "Obejrzyj okolicę w środku tygodnia, a nie w sobotę, żeby usłyszeć normalny poziom hałasu.",
  "Sprawdź, czy dojazd prowadzi drogą gminną, a nie prywatnym odcinkiem sąsiedzkim.",
  "Zapytaj o IBI i koszty roczne, bo w Hiszpanii dochodzą one do kilku procent czynszu.",
  "Ustal, kto zarządza najmem w tej strefie i ile bierze za obsługę gościa.",
];

const PL_TYPE: Record<DistrictSeed["type"], string[]> = {
  dzielnica: ["To dzielnica mieszkaniowa, w której sezon zmienia natężenie ruchu, ale nie charakter.", "Tu mieszkają ludzie na stałe, a nie tylko w lipcu."],
  urbanizacja: ["To urbanizacja z własnymi zasadami: wspólnota, ochrona i drogi wewnętrzne decydują o kosztach.", "Osiedle rządzi się regulaminem, więc przeczytaj go przed ofertą."],
  plaza: ["To strefa plażowa, gdzie cena podąża za odległością od piasku, a nie za metrażem.", "Plaża jest tu produktem, więc pierwsza linia płaci się osobno."],
  osiedle: ["Zabudowa osiedlowa oznacza powtarzalny standard i przewidywalne koszty utrzymania.", "To osiedle, w którym o wartości decyduje numer klatki i widok, nie dzielnica."],
};


const EN_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "{n} is the cheapest band in {cityLoc}: {price} per m² against a town median of {cityPrice}.",
    "A square metre in {loc} costs {price}, clearly below the {cityLoc} figure of {cityPrice}.",
    "{n} sits well under the rest of the town: {price} per m² versus {cityPrice}.",
  ],
  below: [
    "{loc} is priced below the town average: {price} per m² against {cityPrice}.",
    "In {loc} a square metre runs {price}, a little under the {cityLoc} median.",
    "{n} holds at {price} per m², just below the {cityPrice} town figure.",
  ],
  inline: [
    "{loc} trades at the town average: {price} per m² against {cityPrice}.",
    "The {loc} price of {price} per m² does not stray from the {cityLoc} median.",
    "{n} moves in step with the town: {price} per m² against {cityPrice}.",
  ],
  above: [
    "{loc} belongs to the dearer part of the town: {price} per m² against a {cityPrice} median.",
    "A square metre in {loc} costs {price}, above the {cityLoc} average.",
    "{n} is priced above the town: {price} per m² against {cityPrice}.",
  ],
  top: [
    "{loc} is the top price band in the municipality: {price} per m² against a {cityPrice} median.",
    "In {loc} a square metre reaches {price}, the highest in {cityLoc} bar a few exceptions.",
    "{n} sets the town's price ceiling: {price} per m² against {cityPrice}.",
  ],
};

const EN_ANCHOR: string[] = [
  "The everyday reference point is {lm0}.",
  "The address starts at {lm0} and ends where the built-up area stops.",
  "Walking the district you pass {lm0}, which makes the location easy to show a guest.",
  "Two points define daily life here: {lm0} and {lm1}.",
  "Everything that matters sits within reach of {lm0}.",
];

const EN_YIELD: Record<YieldBand, string[]> = {
  low: [
    "A {yieldRate} gross yield ({netRate} net) is the low end for this town: you pay for location, not cash flow.",
    "The {yieldRate} gross return is modest, but tenants in this segment stay longer.",
    "At {yieldRate} gross the payback is measured in years rather than seasons.",
  ],
  mid: [
    "A {yieldRate} gross yield ({netRate} net) is the middle of the local range.",
    "{yieldRate} gross and {netRate} net need no explaining to an investor.",
    "The {yieldRate} gross return puts this address mid-table for the town.",
  ],
  high: [
    "A {yieldRate} gross yield ({netRate} net) ranks among the best in {cityLoc}.",
    "{yieldRate} gross beats the town average, and {netRate} net still leaves headroom.",
    "The {yieldRate} gross return sets this address apart from the town.",
  ],
  top: [
    "A {yieldRate} gross yield ({netRate} net) is top of the town.",
    "{yieldRate} gross is the best result available in {cityLoc} at this entry price.",
    "{yieldRate} gross on {price} per m² is the combination investors look for.",
  ],
};

const EN_DEMAND: Record<DemandBand, string[]> = {
  soft: [
    "We rate demand at {demand} out of 10, so a flat will not vanish in a week.",
    "The market moves calmly: {demand} of 10 on our demand scale.",
    "Demand of {demand} of 10 means you may have to look for a tenant.",
  ],
  normal: [
    "Demand of {demand} of 10 is a healthy balance between supply and buyers.",
    "At {demand} of 10 decisions take weeks rather than months.",
    "Demand of {demand} of 10 supports prices without creating queues.",
  ],
  hot: [
    "Demand of {demand} of 10 means good units leave the market within days.",
    "At {demand} of 10 the best flats sell before the listing goes live.",
    "Demand of {demand} of 10 is a seller's market, so negotiate firmly but fast.",
  ],
};

const EN_DAYS: Record<DaysBand, string[]> = {
  fast: [
    "Time on market averages {days} days, short for this region.",
    "A sale takes around {days} days, so the market does not wait for hesitating buyers.",
  ],
  normal: [
    "Time on market averages {days} days, typical for the Costa Blanca.",
    "Expect roughly {days} days to sell.",
  ],
  slow: [
    "Time on market averages {days} days, so the price has to be realistic from day one.",
    "Selling takes about {days} days here, which calls for patience or a discount.",
  ],
};


const EN_NEIGHBOURS: string[] = [
  "The closest price neighbour is {sibPrice} at {sibPriceVal} per m², and that sets your negotiating range.",
  "Use {sibPrice} at {sibPriceVal} per m² as the benchmark: similar standard, different street.",
  "The competing address is {sibPrice} at {sibPriceVal} per m², so compare floor area and build year, not only price.",
  "Buyers in this municipality weigh this address against {sibPrice} ({sibPriceVal} per m²).",
];

const EN_NEIGHBOURS_YIELD: string[] = [
  "The best yield in town comes from {sibYieldName} at {sibYieldVal}, which frames the question of paying for location.",
  "For comparison {sibYieldName} reaches {sibYieldVal} gross, which is the price of this address.",
  "If only the return matters, attention goes to {sibYieldName} with {sibYieldVal}.",
];

const EN_CHECKS: string[] = [
  "Before signing, read the building file and the community minutes from the last two years.",
  "Ask for a nota simple and a certificate showing no arrears in the community.",
  "Verify that the terrace or pool appears in the licence and in the land registry.",
  "View the area midweek rather than on a Saturday so you hear the normal noise level.",
  "Confirm access runs along a council road and not a private neighbours' track.",
  "Ask for the IBI bill and annual costs, which in Spain reach several percent of the rent.",
  "Find out who manages lettings in this area and what they charge per guest.",
];

const EN_TYPE: Record<DistrictSeed["type"], string[]> = {
  dzielnica: [
    "This is a residential district where the season changes traffic, not character.",
    "People live here all year rather than only in July.",
  ],
  urbanizacja: [
    "This is an urbanisation with its own rules: community, security and internal roads drive the costs.",
    "The estate runs by its own regulations, so read them before making an offer.",
  ],
  plaza: [
    "This is beach territory, where the price follows the walk to the sand rather than the floor area.",
    "The beach is the product here, and the front line is paid for separately.",
  ],
  osiedle: [
    "Estate housing means a repeatable standard and predictable running costs.",
    "In an estate like this the stairwell and the view set the value, not the district.",
  ],
};

const ES_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "{n} es la banda más barata de {cityLoc}: {price} por m² frente a una mediana de {cityPrice}.",
    "El metro en {loc} cuesta {price}, claramente por debajo de los {cityPrice} de {cityLoc}.",
    "{n} se queda muy por debajo del resto del municipio: {price} por m² frente a {cityPrice}.",
  ],
  below: [
    "{loc} cotiza por debajo de la media del municipio: {price} por m² frente a {cityPrice}.",
    "En {loc} el metro sale a {price}, algo menos que la mediana de {cityLoc}.",
    "{n} aguanta en {price} por m², justo bajo los {cityPrice} del pueblo.",
  ],
  inline: [
    "{loc} cotiza como la media del municipio: {price} por m² frente a {cityPrice}.",
    "El precio de {loc} ({price} por m²) no se separa de la mediana de {cityLoc}.",
    "{n} va al mismo paso que el pueblo: {price} por m² frente a {cityPrice}.",
  ],
  above: [
    "{loc} está en la parte cara del municipio: {price} por m² frente a una mediana de {cityPrice}.",
    "El metro en {loc} cuesta {price}, por encima de la media de {cityLoc}.",
    "{n} cotiza por encima del pueblo: {price} por m² frente a {cityPrice}.",
  ],
  top: [
    "{loc} es la banda alta del municipio: {price} por m² frente a una mediana de {cityPrice}.",
    "En {loc} el metro llega a {price}, lo más alto de {cityLoc} salvo excepciones.",
    "{n} marca el techo del pueblo: {price} por m² frente a {cityPrice}.",
  ],
};

const ES_ANCHOR: string[] = [
  "El punto de referencia diario es {lm0}.",
  "La dirección empieza en {lm0} y termina donde acaba lo construido.",
  "Al recorrer el barrio se pasa por {lm0}, así que la ubicación se enseña fácil.",
  "Dos puntos definen la vida aquí: {lm0} y {lm1}.",
  "Todo lo importante queda al alcance de {lm0}.",
];


const ES_YIELD: Record<YieldBand, string[]> = {
  low: [
    "Un {yieldRate} bruto ({netRate} neto) es la banda baja del municipio: se paga ubicación, no flujo de caja.",
    "El {yieldRate} bruto es modesto, aunque el inquilino de este segmento dura más.",
    "Con {yieldRate} bruto el retorno se mide en años y no en temporadas.",
  ],
  mid: [
    "Un {yieldRate} bruto ({netRate} neto) es el centro de la tabla local.",
    "{yieldRate} bruto y {netRate} neto no necesitan explicación ante un inversor.",
    "El {yieldRate} bruto deja esta dirección en mitad de la tabla del pueblo.",
  ],
  high: [
    "Un {yieldRate} bruto ({netRate} neto) entra entre los mejores de {cityLoc}.",
    "{yieldRate} bruto supera la media del municipio y {netRate} neto deja margen.",
    "El {yieldRate} bruto distingue esta dirección del resto del pueblo.",
  ],
  top: [
    "Un {yieldRate} bruto ({netRate} neto) está en cabeza del municipio.",
    "{yieldRate} bruto es el mejor resultado posible en {cityLoc} con este precio de entrada.",
    "{yieldRate} bruto sobre {price} por m² es la combinación que buscan los inversores.",
  ],
};

const ES_DEMAND: Record<DemandBand, string[]> = {
  soft: [
    "La demanda es de {demand} sobre 10, así que el piso no desaparece en una semana.",
    "El mercado va tranquilo: {demand} de 10 en nuestra escala.",
    "Una demanda de {demand} sobre 10 implica que a veces hay que buscar inquilino.",
  ],
  normal: [
    "Una demanda de {demand} sobre 10 es equilibrio sano entre oferta y compradores.",
    "Con {demand} sobre 10 la decisión se toma en semanas y no en meses.",
    "La demanda de {demand} sobre 10 sostiene precios sin crear colas.",
  ],
  hot: [
    "Una demanda de {demand} sobre 10 hace que las buenas viviendas salgan en días.",
    "Con {demand} sobre 10 los mejores pisos se venden antes del anuncio.",
    "Una demanda de {demand} sobre 10 es mercado de vendedor: negocia firme y rápido.",
  ],
};

const ES_DAYS: Record<DaysBand, string[]> = {
  fast: [
    "La exposición media es de {days} días, poco para esta zona.",
    "La venta tarda unos {days} días, así que el mercado no espera dudas.",
  ],
  normal: [
    "La exposición media es de {days} días, lo habitual en Costa Blanca.",
    "Cuenta con unos {days} días para vender.",
  ],
  slow: [
    "La exposición media es de {days} días, así que el precio debe ser realista desde el inicio.",
    "Vender aquí lleva unos {days} días, lo que exige paciencia o descuento.",
  ],
};

const ES_NEIGHBOURS: string[] = [
  "El vecino más cercano en precio es {sibPrice}, con {sibPriceVal} por m², y eso marca el rango de negociación.",
  "Toma {sibPrice} con {sibPriceVal} por m² como referencia: mismo estándar, otra calle.",
  "La dirección rival es {sibPrice} a {sibPriceVal} por m², así que compara metros y año, no solo precio.",
  "En este municipio el comprador compara esta dirección con {sibPrice} ({sibPriceVal} por m²).",
];

const ES_NEIGHBOURS_YIELD: string[] = [
  "La mejor rentabilidad del pueblo la da {sibYieldName} con {sibYieldVal}, y ahí se mide el coste de esta ubicación.",
  "Para comparar, {sibYieldName} alcanza {sibYieldVal} bruto, que es el precio de esta dirección.",
  "Si solo importa el retorno, la mirada va a {sibYieldName} con {sibYieldVal}.",
];

const ES_CHECKS: string[] = [
  "Antes de firmar, lee el expediente del edificio y las actas de comunidad de los últimos dos años.",
  "Pide nota simple y certificado de estar al corriente con la comunidad.",
  "Verifica que la terraza o la piscina consten en licencia y en el registro.",
  "Visita la zona entre semana y no un sábado, para oír el ruido habitual.",
  "Confirma que el acceso es camino municipal y no un tramo privado de vecinos.",
  "Pide el recibo del IBI y los gastos anuales, que en España llegan a varios puntos del alquiler.",
  "Averigua quién gestiona alquileres en la zona y cuánto cobra por huésped.",
];

const ES_TYPE: Record<DistrictSeed["type"], string[]> = {
  dzielnica: [
    "Es un barrio residencial donde la temporada cambia el tráfico y no el carácter.",
    "Aquí vive gente todo el año y no solo en julio.",
  ],
  urbanizacja: [
    "Es una urbanización con reglas propias: comunidad, seguridad y caminos interiores marcan los gastos.",
    "La urbanización se rige por su reglamento, así que léelo antes de ofertar.",
  ],
  plaza: [
    "Es zona de playa, donde el precio sigue el paseo hasta la arena y no los metros.",
    "La playa es el producto, y la primera línea se paga aparte.",
  ],
  osiedle: [
    "La vivienda de urbanización implica un estándar repetible y gastos previsibles.",
    "En este tipo de conjunto el portal y las vistas fijan el valor, no el barrio.",
  ],
};


function fill(template: string, ctx: Ctx): string {
  const table: Record<string, string> = {
    n: ctx.n,
    loc: ctx.loc,
    gen: ctx.gen,
    cityLoc: ctx.cityLoc,
    lm0: ctx.lm0,
    lm1: ctx.lm1 || ctx.lm0,
    price: ctx.price,
    cityPrice: ctx.cityPrice,
    regionPrice: ctx.regionPrice,
    yieldRate: ctx.yieldRate,
    netRate: ctx.netRate,
    days: String(ctx.days),
    demand: String(ctx.demand),
    rent: ctx.rent,
    growth: formatRate(ctx.stats.priceGrowth),
    sibPrice: ctx.sibPrice,
    sibPriceVal: ctx.sibPriceVal,
    sibYieldName: ctx.sibYieldName,
    sibYieldVal: ctx.sibYieldVal,
  };
  return template.replace(/\{(\w+)\}/g, (whole, token: string) => table[token] ?? whole);
}

interface Pool {
  price: Record<PriceBand, string[]>;
  anchor: string[];
  yield: Record<YieldBand, string[]>;
  demand: Record<DemandBand, string[]>;
  days: Record<DaysBand, string[]>;
  neighbours: string[];
  neighboursYield: string[];
  checks: string[];
  type: Record<DistrictSeed["type"], string[]>;
  faqPrice: string[];
  faqYield: string[];
}

const POOLS: Record<Locale, Pool> = {
  pl: {
    price: PL_PRICE,
    anchor: PL_ANCHOR,
    yield: PL_YIELD,
    demand: PL_DEMAND,
    days: PL_DAYS,
    neighbours: PL_NEIGHBOURS,
    neighboursYield: PL_NEIGHBOURS_YIELD,
    checks: PL_CHECKS,
    type: PL_TYPE,
    faqPrice: [
      "Ile kosztuje metr w {loc} na tle całego miasta?",
      "Czy {loc} jest droższy czy tańszy od średniej w {cityLoc}?",
      "Jak wypada cena w {loc} wobec innych dzielnic?",
      "Gdzie szukać tańszej alternatywy w pobliżu {gen}?",
    ],
    faqYield: [
      "Ile realnie zarobię na najmie w {loc}?",
      "Jakie ROI daje {n} przy obecnych czynszach?",
      "Czy {loc} opłaca się bardziej niż sąsiednie dzielnice?",
      "Od czego zależy dochód z najmu w {loc}?",
    ],
  },
  en: {
    price: EN_PRICE,
    anchor: EN_ANCHOR,
    yield: EN_YIELD,
    demand: EN_DEMAND,
    days: EN_DAYS,
    neighbours: EN_NEIGHBOURS,
    neighboursYield: EN_NEIGHBOURS_YIELD,
    checks: EN_CHECKS,
    type: EN_TYPE,
    faqPrice: [
      "How does the square metre in {loc} compare with the rest of the town?",
      "Is {loc} dearer or cheaper than the {cityLoc} average?",
      "Where does the price in {loc} sit against other districts?",
      "Where is the cheaper alternative near {n}?",
    ],
    faqYield: [
      "What will letting in {loc} actually earn?",
      "What yield does {n} give at current rents?",
      "Is {loc} a better bet than neighbouring districts?",
      "What drives rental income in {loc}?",
    ],
  },
  es: {
    price: ES_PRICE,
    anchor: ES_ANCHOR,
    yield: ES_YIELD,
    demand: ES_DEMAND,
    days: ES_DAYS,
    neighbours: ES_NEIGHBOURS,
    neighboursYield: ES_NEIGHBOURS_YIELD,
    checks: ES_CHECKS,
    type: ES_TYPE,
    faqPrice: [
      "¿Cómo está el metro en {loc} frente al resto del municipio?",
      "¿Es {loc} más caro o más barato que la media de {cityLoc}?",
      "¿Dónde queda el precio de {loc} frente a otros barrios?",
      "¿Dónde está la alternativa más barata cerca de {n}?",
    ],
    faqYield: [
      "¿Cuánto se gana de verdad alquilando en {loc}?",
      "¿Qué rentabilidad da {n} con los alquileres actuales?",
      "¿Conviene más {loc} que los barrios vecinos?",
      "¿De qué depende el ingreso por alquiler en {loc}?",
    ],
  },
};


/**
 * Cztery akapity deep dive: pozycja cenowa, rentowność i popyt, sąsiedzi
 * i ekspozycja oferty, oraz praktyczne kontrole przed zakupem.
 */
function priceRankPhrase(rank: number, total: number, locale: Locale): string {
  if (total <= 1) return "";
  const first = rank === 1;
  const last = rank === total;
  if (locale === "pl") {
    if (first) return "najtańsza w gminie";
    if (last) return "najdroższa w gminie";
    if (rank === 2) return "druga najtańsza w gminie";
    if (rank === total - 1) return "druga najdroższa w gminie";
    return "w środku gminnej stawki";
  }
  if (locale === "es") {
    if (first) return "la más barata del municipio";
    if (last) return "la más cara del municipio";
    if (rank === 2) return "la segunda más barata";
    if (rank === total - 1) return "la segunda más cara";
    return "en la mitad de la tabla local";
  }
  if (first) return "the cheapest in the municipality";
  if (last) return "the dearest in the municipality";
  if (rank === 2) return "the second cheapest in town";
  if (rank === total - 1) return "the second dearest in town";
  return "mid-table for the town";
}

function yieldRankPhrase(rank: number, total: number, locale: Locale): string {
  if (total <= 1) return "";
  if (locale === "pl") {
    if (rank === 1) return "najwyższa rentowność w gminie";
    if (rank === total) return "najniższa rentowność w gminie";
    return rank <= 3 ? "górna trójka pod względem ROI" : "środek tabeli rentowności";
  }
  if (locale === "es") {
    if (rank === 1) return "la mejor rentabilidad del municipio";
    if (rank === total) return "la peor rentabilidad del municipio";
    return rank <= 3 ? "el top tres por rentabilidad" : "la zona media de rentabilidad";
  }
  if (rank === 1) return "the best yield in the municipality";
  if (rank === total) return "the weakest yield in the municipality";
  return rank <= 3 ? "top three on yield" : "mid-table on yield";
}

function rankSentence(city: CitySeed, district: DistrictSeed, locale: Locale): string {
  const byPrice = city.districts.slice().sort((a, b) => a.pricePerM2 - b.pricePerM2);
  const byYield = city.districts.slice().sort((a, b) => b.rentalYield - a.rentalYield);
  const total = city.districts.length;
  if (total <= 1) return "";
  const priceRank = byPrice.findIndex((item) => item.slug === district.slug) + 1;
  const yieldRank = byYield.findIndex((item) => item.slug === district.slug) + 1;
  const priceText = priceRankPhrase(priceRank, total, locale);
  const yieldText = yieldRankPhrase(yieldRank, total, locale);
  if (!priceText || !yieldText) return "";
  if (locale === "pl") {
    return `W rankingu gminnym ten adres jest ${priceText} pod względem ceny i ${yieldText} pod względem zwrotu - dwie różne osie decyzji.`;
  }
  if (locale === "es") {
    return `En el ranking municipal esta dirección es ${priceText} por precio y ${yieldText} por retorno: dos ejes distintos de decisión.`;
  }
  return `In the municipal ranking this address is ${priceText} on price and ${yieldText} on return, two different decision axes.`;
}

export function districtDeepDive(
  city: CitySeed,
  district: DistrictSeed,
  stats: MarketStats,
  locale: Locale,
  key: string,
): DistrictDeepDive {
  const ctx = makeCtx(city, district, stats, key);
  const pool = POOLS[locale];
  const rentPool = locale === "pl" ? PL_RENT : locale === "en" ? EN_RENT : ES_RENT;
  const timingPool = locale === "pl" ? PL_TIMING : locale === "en" ? EN_TIMING : ES_TIMING;
  const t = (template: string) => fill(template, ctx);
  const one = <T,>(items: readonly T[], salt: string): T =>
    items[hashString(`${key}::dd-${salt}`) % items.length] as T;

  const paragraphs = [
    join(t(one(pool.anchor, "anchor")), t(one(pool.price[ctx.bands.price], "price"))),
    join(t(one(pool.yield[ctx.bands.yield], "yield")), t(one(pool.demand[ctx.bands.demand], "demand"))),
    join(t(one(pool.days[ctx.bands.days], "days")), t(one(pool.neighbours, "sib")), t(one(pool.neighboursYield, "siby"))),
    join(t(one(pool.type[district.type], "type")), t(one(pool.checks, "check"))),
    join(t(one(rentPool, "rent")), t(one(timingPool, "timing"))),
    rankSentence(city, district, locale),
  ].filter((text) => text.length > 0);

  // Jedna z warstw wypada rotacyjnie: strony różnią się nie tylko doborem zdań,
  // ale i tym, którą warstwę pokazują. Reszta zostaje, więc treść się nie kurczy
  // poniżej progu indeksacji.
  if (paragraphs.length > 4) {
    paragraphs.splice(hashString(`${key}::dd-drop`) % paragraphs.length, 1);
  }

  return {
    heading: one(HEADINGS[locale], "heading"),
    paragraphs,
  };
}

/**
 * Dwa pytania FAQ generowane z danych dzielnicy. Zastępują część wspólnego
 * szablonu, który na wszystkich stronach miał Jaccard 0.75-0.82.
 */
export function districtDeepFaq(
  city: CitySeed,
  district: DistrictSeed,
  stats: MarketStats,
  locale: Locale,
  key: string,
): DistrictFaqExtra[] {
  const ctx = makeCtx(city, district, stats, key);
  const pool = POOLS[locale];
  const t = (template: string) => fill(template, ctx);
  const one = <T,>(items: readonly T[], salt: string): T =>
    items[hashString(`${key}::faq-${salt}`) % items.length] as T;

  const priceAnswer = join(
    t(one(pool.price[ctx.bands.price], "faqprice")),
    t(one(pool.neighbours, "faqsib")),
  );
  const yieldAnswer = join(
    t(one(pool.yield[ctx.bands.yield], "faqyield")),
    t(one(pool.demand[ctx.bands.demand], "faqdemand")),
  );

  return [
    { question: t(one(pool.faqPrice, "faqq1")), answer: priceAnswer },
    { question: t(one(pool.faqYield, "faqq2")), answer: yieldAnswer },
  ];
}


// ---------------------------------------------------------------------------
// Wariant miejski: te same zasady, ale rozmowa idzie o gminie, nie o ulicy.
// ---------------------------------------------------------------------------

const PL_CITY_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "Na tle regionu {region} ({regionPrice} €/m²) {city} jest wyraźnie tanie: {price} €/m².",
    "{city} kupuje się dziś za {price} €/m², czyli grubo poniżej regionalnej mediany {regionPrice} €/m².",
    "Cena {price} €/m² stawia {city} w dolnej części rynku {region}.",
  ],
  below: [
    "{city} wyceniane jest poniżej mediany {region} ({regionPrice} €/m²): {price} €/m².",
    "Za metr w {city} płaci się {price} €, mniej niż {regionPrice} €/m² w regionie.",
    "{price} €/m² to cena poniżej średniej {region}, gdzie mediana wynosi {regionPrice} €/m².",
  ],
  inline: [
    "{city} trzyma poziom regionu: {price} €/m² wobec {regionPrice} €/m².",
    "Cena {price} €/m² nie odbiega od mediany {region} ({regionPrice} €/m²).",
    "Rynek {gen} idzie równo z regionem: {price} €/m² przy {regionPrice} €/m².",
  ],
  above: [
    "{city} jest droższe niż region: {price} €/m² wobec {regionPrice} €/m².",
    "Za metr w {city} płaci się {price} €, czyli powyżej {regionPrice} €/m² w {region}.",
    "{price} €/m² ustawia {city} w górnej połowie rynku {region}.",
  ],
  top: [
    "{city} to najdroższa półka {region}: {price} €/m² wobec {regionPrice} €/m² mediany.",
    "Cena {price} €/m² stawia {city} w czołówce {region}.",
    "{city} wyznacza górną granicę {region}: {price} €/m² przy {regionPrice} €/m².",
  ],
};

const PL_CITY_BUYERS: string[] = [
  "Kupujący zagraniczni to {foreign}, a Polacy {polish} - to wystarczy, żeby w okolicy działały usługi po polsku.",
  "Struktura popytu: {foreign} nabywców z zagranicy, {polish} z Polski, resztę stanowi rynek lokalny.",
  "Zagranica odpowiada za {foreign} transakcji, polscy klienci za {polish}, więc negocjujesz z rynkiem, który zna te ceny.",
  "Polacy to {polish} kupujących, obcokrajowcy łącznie {foreign}: to wpływa na standard wykończenia i oczekiwania najemców.",
];

const PL_CITY_YIELD: Record<YieldBand, string[]> = {
  low: ["ROI {yieldRate} brutto ({netRate} netto) to niska półka regionu, typowa dla adresów prestiżowych.", "{yieldRate} brutto nie kupi inwestora liczącego na szybki zwrot."],
  mid: ["ROI {yieldRate} brutto ({netRate} netto) mieści się w środku regionalnej stawki.", "{yieldRate} brutto to wynik, który w {region} uchodzi za standard."],
  high: ["ROI {yieldRate} brutto ({netRate} netto) jest ponad średnią regionu.", "{yieldRate} brutto wyróżnia {city} na tle {region}, a {netRate} netto wciąż się broni."],
  top: ["ROI {yieldRate} brutto ({netRate} netto) to czołówka {region}.", "{yieldRate} brutto przy {price} €/m² to jedna z lepszych kombinacji w regionie."],
};

const PL_CITY_SCALE: Record<DemandBand, string[]> = {
  soft: ["Około {volume} transakcji rocznie i {days} dni ekspozycji: rynek nie pędzi, więc jest czas na analizę.", "{volume} transakcji w roku to spokojny obrót, a {days} dni ekspozycji pozwala negocjować."],
  normal: ["{volume} transakcji rocznie i {days} dni ekspozycji to typowy rytm {region}.", "Przy {volume} transakcjach rocznie sprzedaż zajmuje średnio {days} dni."],
  hot: ["{volume} transakcji rocznie i tylko {days} dni ekspozycji: to jeden z bardziej płynnych rynków {region}.", "{volume} transakcji w roku sprawia, że dobre lokale schodzą w {days} dni."],
};

const PL_CITY_DISTRICTS: string[] = [
  "Wewnątrz gminy rozstrzał sięga {spread} €/m²: od {cheap} ({cheapPrice} €/m²) do {dear} ({dearPrice} €/m²).",
  "Adres w {city} zmienia cenę o {spread} €/m², bo {cheap} kosztuje {cheapPrice}, a {dear} {dearPrice} €/m².",
  "Zanim wybierzesz ulicę, porównaj {cheap} ({cheapPrice} €/m²) z {dear} ({dearPrice} €/m²): to {spread} €/m² różnicy.",
];

const EN_CITY_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "Against the {region} median of {regionPrice} per m², {city} is clearly cheap at {price}.",
    "{city} trades at {price} per m², well under the regional figure of {regionPrice}.",
    "At {price} per m², {city} sits in the lower part of the {region} market.",
  ],
  below: [
    "{city} is priced below the {region} median of {regionPrice}: {price} per m².",
    "A square metre in {city} costs {price}, less than the {regionPrice} regional figure.",
    "{price} per m² puts {city} under the {region} average of {regionPrice}.",
  ],
  inline: [
    "{city} matches the region: {price} per m² against {regionPrice}.",
    "The {price} per m² in {city} does not stray from the {region} median of {regionPrice}.",
    "{city} moves in step with {region}: {price} per m² against {regionPrice}.",
  ],
  above: [
    "{city} is dearer than the region: {price} per m² against {regionPrice}.",
    "A square metre in {city} runs {price}, above the {regionPrice} regional median.",
    "{price} per m² places {city} in the upper half of the {region} market.",
  ],
  top: [
    "{city} is the top shelf of {region}: {price} per m² against a {regionPrice} median.",
    "At {price} per m², {city} ranks among the priciest spots in {region}.",
    "{city} sets the ceiling for {region}: {price} per m² against {regionPrice}.",
  ],
};

const EN_CITY_BUYERS: string[] = [
  "Foreign buyers account for {foreign}, and Polish buyers for {polish}, enough to keep Polish-language services nearby.",
  "Demand structure: {foreign} international buyers, {polish} from Poland, the rest local.",
  "Abroad accounts for {foreign} of purchases and Polish clients for {polish}, so you negotiate in a market that knows these prices.",
  "Polish buyers make up {polish} and all foreign buyers {foreign}, which shapes finishes and tenant expectations.",
];


const EN_CITY_YIELD: Record<YieldBand, string[]> = {
  low: ["A {yieldRate} gross yield ({netRate} net) is the low band for the region, typical of prestige addresses.", "{yieldRate} gross will not convince an investor hunting a fast payback."],
  mid: ["A {yieldRate} gross yield ({netRate} net) sits in the middle of the regional range.", "{yieldRate} gross is what {region} treats as standard."],
  high: ["A {yieldRate} gross yield ({netRate} net) beats the regional average.", "{yieldRate} gross sets {city} apart in {region}, and {netRate} net still holds."],
  top: ["A {yieldRate} gross yield ({netRate} net) is the top of {region}.", "{yieldRate} gross on {price} per m² is one of the better combinations in the region."],
};

const EN_CITY_SCALE: Record<DemandBand, string[]> = {
  soft: ["Around {volume} sales a year and {days} days on market: the market is not rushing, so there is time to analyse.", "{volume} sales a year is calm turnover, and {days} days on market leaves room to negotiate."],
  normal: ["{volume} sales a year and {days} days on market is the normal rhythm for {region}.", "With {volume} sales a year, selling takes {days} days on average."],
  hot: ["{volume} sales a year and only {days} days on market: this is one of the more liquid markets in {region}.", "{volume} sales a year means good units leave in {days} days."],
};

const EN_CITY_DISTRICTS: string[] = [
  "Inside the municipality the spread reaches {spread} per m², from {cheap} at {cheapPrice} to {dear} at {dearPrice}.",
  "The address within {city} shifts the price by {spread} per m², since {cheap} costs {cheapPrice} and {dear} {dearPrice}.",
  "Before choosing a street, compare {cheap} ({cheapPrice} per m²) with {dear} ({dearPrice} per m²): {spread} per m² apart.",
];

const ES_CITY_PRICE: Record<PriceBand, string[]> = {
  deep: [
    "Frente a la mediana de {region} ({regionPrice} por m²), {city} es claramente barato: {price} por m².",
    "{city} cotiza a {price} por m², muy por debajo de los {regionPrice} de la región.",
    "Con {price} por m², {city} está en la parte baja del mercado de {region}.",
  ],
  below: [
    "{city} cotiza por debajo de la mediana de {region} ({regionPrice}): {price} por m².",
    "El metro en {city} cuesta {price}, menos que los {regionPrice} de la región.",
    "{price} por m² deja {city} bajo la media regional de {regionPrice}.",
  ],
  inline: [
    "{city} va al nivel de la región: {price} por m² frente a {regionPrice}.",
    "El precio de {city} ({price} por m²) no se separa de la mediana de {region}.",
    "{city} avanza al ritmo de {region}: {price} por m² frente a {regionPrice}.",
  ],
  above: [
    "{city} es más caro que la región: {price} por m² frente a {regionPrice}.",
    "El metro en {city} cuesta {price}, por encima de los {regionPrice} de {region}.",
    "{price} por m² coloca {city} en la mitad alta del mercado de {region}.",
  ],
  top: [
    "{city} es la gama alta de {region}: {price} por m² frente a una mediana de {regionPrice}.",
    "Con {price} por m², {city} está entre lo más caro de {region}.",
    "{city} marca el techo de {region}: {price} por m² frente a {regionPrice}.",
  ],
};

const ES_CITY_BUYERS: string[] = [
  "Los compradores extranjeros son el {foreign} y los polacos el {polish}, suficiente para que haya servicios en polaco cerca.",
  "Estructura de demanda: {foreign} de compradores internacionales, {polish} de Polonia y el resto local.",
  "El exterior aporta el {foreign} de las compras y los clientes polacos el {polish}, así que se negocia en un mercado que conoce estos precios.",
  "Los polacos son el {polish} y todos los extranjeros el {foreign}, lo que influye en acabados y expectativas del inquilino.",
];


const ES_CITY_YIELD: Record<YieldBand, string[]> = {
  low: ["Un {yieldRate} bruto ({netRate} neto) es la banda baja de la región, típica de direcciones de prestigio.", "Un {yieldRate} bruto no convence a quien busca retorno rápido."],
  mid: ["Un {yieldRate} bruto ({netRate} neto) está en el centro de la tabla regional.", "El {yieldRate} bruto es lo que {region} considera estándar."],
  high: ["Un {yieldRate} bruto ({netRate} neto) supera la media regional.", "El {yieldRate} bruto distingue a {city} en {region} y el {netRate} neto aún aguanta."],
  top: ["Un {yieldRate} bruto ({netRate} neto) está en cabeza de {region}.", "{yieldRate} bruto sobre {price} por m² es una de las mejores combinaciones de la región."],
};

const ES_CITY_SCALE: Record<DemandBand, string[]> = {
  soft: ["Unas {volume} operaciones al año y {days} días de exposición: el mercado no corre, así que hay tiempo para analizar.", "{volume} operaciones al año es un ritmo tranquilo y {days} días permiten negociar."],
  normal: ["{volume} operaciones al año y {days} días de exposición es el ritmo normal de {region}.", "Con {volume} operaciones al año, vender lleva {days} días de media."],
  hot: ["{volume} operaciones al año y solo {days} días de exposición: es uno de los mercados más líquidos de {region}.", "{volume} operaciones al año hacen que las buenas viviendas salgan en {days} días."],
};

const ES_CITY_DISTRICTS: string[] = [
  "Dentro del municipio la horquilla llega a {spread} por m²: de {cheap} ({cheapPrice}) a {dear} ({dearPrice}).",
  "La dirección dentro de {city} cambia el precio en {spread} por m², porque {cheap} cuesta {cheapPrice} y {dear} {dearPrice}.",
  "Antes de elegir calle, compara {cheap} ({cheapPrice} por m²) con {dear} ({dearPrice} por m²): {spread} por m² de diferencia.",
];

const CITY_CHECKS: Record<Locale, string[]> = {
  pl: PL_CHECKS,
  en: EN_CHECKS,
  es: ES_CHECKS,
};

const CITY_FAQ_PRICE: Record<Locale, string[]> = {
  pl: [
    "Czy {city} jest droższe od reszty regionu?",
    "Jak kształtuje się cena metra w {cityLoc} wobec {region}?",
    "Ile trzeba zapłacić za metr w {cityLoc} w tym roku?",
    "Które dzielnice {gen} są tańsze, a które droższe?",
  ],
  en: [
    "Is {city} dearer than the rest of the region?",
    "How does the square metre in {cityLoc} compare with {region}?",
    "What does a square metre in {cityLoc} cost this year?",
    "Which {city} districts are cheaper and which are dearer?",
  ],
  es: [
    "¿Es {city} más caro que el resto de la región?",
    "¿Cómo está el metro en {cityLoc} frente a {region}?",
    "¿Cuánto cuesta el metro en {cityLoc} este año?",
    "¿Qué barrios de {city} son más baratos y cuáles más caros?",
  ],
};

const CITY_FAQ_YIELD: Record<Locale, string[]> = {
  pl: [
    "Ile zarobię na najmie w {cityLoc}?",
    "Jakie ROI daje najem w {city} przy obecnych cenach?",
    "Czy w {cityLoc} warto kupować pod najem?",
    "Co decyduje o dochodzie z najmu w {cityLoc}?",
  ],
  en: [
    "What will letting in {cityLoc} earn?",
    "What yield does {city} give at current prices?",
    "Is buying to let in {cityLoc} worth it?",
    "What drives rental income in {cityLoc}?",
  ],
  es: [
    "¿Cuánto se gana alquilando en {cityLoc}?",
    "¿Qué rentabilidad da {city} con los precios actuales?",
    "¿Merece la pena comprar para alquilar en {cityLoc}?",
    "¿Qué determina el ingreso por alquiler en {cityLoc}?",
  ],
};


const CITY_CLOSING: Record<Locale, string[]> = {
  pl: [
    "Decyzję w {cityLoc} oprzyj na trzech liczbach: medianie, ROI netto i czasie ekspozycji - reszta to emocje.",
    "W {cityLoc} pytaj o trzy rzeczy: ile realnie kosztuje remont, kto płaci IBI i jak długo trwa sprzedaż w tej strefie.",
    "Kupując w {cityLoc}, porównaj ofertę z {districtA} i {districtB}: to dwa najczęstsze punkty odniesienia w tej gminie.",
  ],
  en: [
    "Base the {cityLoc} decision on three numbers: the median, the net yield and time on market; the rest is emotion.",
    "In {cityLoc} ask three questions: what renovation really costs, who pays the IBI and how long a sale takes in this area.",
    "When buying in {cityLoc}, compare the offer with {districtA} and {districtB}, the two usual benchmarks in this town.",
  ],
  es: [
    "Apoya la decisión en {cityLoc} en tres cifras: la mediana, la rentabilidad neta y los días de exposición; el resto es emoción.",
    "En {cityLoc} pregunta tres cosas: cuánto cuesta de verdad la reforma, quién paga el IBI y cuánto tarda una venta en esta zona.",
    "Al comprar en {cityLoc} compara la oferta con {districtA} y {districtB}, las dos referencias habituales del municipio.",
  ],
};

function fillCity(template: string, table: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, token: string) => table[token] ?? whole);
}

function cityTable(city: CitySeed, region: RegionSeed, stats: MarketStats): Record<string, string> {
  const districts = city.districts.slice().sort((a, b) => a.pricePerM2 - b.pricePerM2);
  const cheap = districts[0];
  const dear = districts[districts.length - 1];
  return {
    city: city.name,
    cityLoc: city.nameLocative,
    gen: city.nameGenitive,
    region: region.name,
    price: formatEur(stats.pricePerM2),
    regionPrice: formatEur(stats.regionPricePerM2),
    yieldRate: formatRate(stats.rentalYield),
    netRate: formatRate(stats.netYield),
    days: String(stats.avgDaysOnMarket),
    volume: String(stats.transactions12m),
    foreign: formatRate(stats.foreignBuyerShare, 0),
    polish: formatRate(stats.polishBuyerShare, 0),
    spread: formatEur(dear && cheap ? dear.pricePerM2 - cheap.pricePerM2 : 0),
    cheap: cheap?.name ?? city.name,
    cheapPrice: formatEur(cheap?.pricePerM2 ?? city.pricePerM2),
    dear: dear?.name ?? city.name,
    dearPrice: formatEur(dear?.pricePerM2 ?? city.pricePerM2),
    districtA: districts[0]?.name ?? city.name,
    districtB: districts[districts.length - 1]?.name ?? city.name,
  };
}

const CITY_HEADINGS: Record<Locale, string[]> = {
  pl: [
    "Rynek gminy w liczbach i konsekwencjach",
    "Jak czytać ten rynek: pieniądze, ludzie, ryzyko",
    "Gmina od środka: cena, płynność, sąsiedzi",
  ],
  en: [
    "The municipal market in numbers and consequences",
    "How to read this market: money, people, risk",
    "The town from the inside: price, liquidity, neighbours",
  ],
  es: [
    "El mercado municipal en cifras y consecuencias",
    "Cómo leer este mercado: dinero, gente, riesgo",
    "El municipio por dentro: precio, liquidez, vecinos",
  ],
};

export function cityDeepDive(
  city: CitySeed,
  region: RegionSeed,
  stats: MarketStats,
  locale: Locale,
  key: string,
): DistrictDeepDive {
  const bands = bandsFor(stats);
  const table = cityTable(city, region, stats);
  const t = (template: string) => fillCity(template, table);
  const one = <T,>(items: readonly T[], salt: string): T =>
    items[hashString(`${key}::cd-${salt}`) % items.length] as T;

  const pricePool = locale === "pl" ? PL_CITY_PRICE : locale === "en" ? EN_CITY_PRICE : ES_CITY_PRICE;
  const yieldPool = locale === "pl" ? PL_CITY_YIELD : locale === "en" ? EN_CITY_YIELD : ES_CITY_YIELD;
  const scalePool = locale === "pl" ? PL_CITY_SCALE : locale === "en" ? EN_CITY_SCALE : ES_CITY_SCALE;
  const buyersPool = locale === "pl" ? PL_CITY_BUYERS : locale === "en" ? EN_CITY_BUYERS : ES_CITY_BUYERS;
  const districtPool =
    locale === "pl" ? PL_CITY_DISTRICTS : locale === "en" ? EN_CITY_DISTRICTS : ES_CITY_DISTRICTS;
  const timingPool = locale === "pl" ? PL_TIMING : locale === "en" ? EN_TIMING : ES_TIMING;

  const paragraphs = [
    join(t(one(pricePool[bands.price], "price")), t(one(districtPool, "districts"))),
    join(t(one(yieldPool[bands.yield], "yield")), t(one(scalePool[bands.demand], "scale"))),
    join(t(one(buyersPool, "buyers")), t(one(CITY_CHECKS[locale], "check"))),
    t(one(CITY_CLOSING[locale], "closing")),
    t(one(timingPool, "timing")),
  ].filter((text) => text.length > 0);

  return { heading: one(CITY_HEADINGS[locale], "heading"), paragraphs };
}


export function cityDeepFaq(
  city: CitySeed,
  region: RegionSeed,
  stats: MarketStats,
  locale: Locale,
  key: string,
): DistrictFaqExtra[] {
  const bands = bandsFor(stats);
  const table = cityTable(city, region, stats);
  const t = (template: string) => fillCity(template, table);
  const one = <T,>(items: readonly T[], salt: string): T =>
    items[hashString(`${key}::cfaq-${salt}`) % items.length] as T;

  const pricePool = locale === "pl" ? PL_CITY_PRICE : locale === "en" ? EN_CITY_PRICE : ES_CITY_PRICE;
  const yieldPool = locale === "pl" ? PL_CITY_YIELD : locale === "en" ? EN_CITY_YIELD : ES_CITY_YIELD;
  const scalePool = locale === "pl" ? PL_CITY_SCALE : locale === "en" ? EN_CITY_SCALE : ES_CITY_SCALE;
  const districtPool =
    locale === "pl" ? PL_CITY_DISTRICTS : locale === "en" ? EN_CITY_DISTRICTS : ES_CITY_DISTRICTS;

  return [
    {
      question: t(one(CITY_FAQ_PRICE[locale], "q1")),
      answer: join(t(one(pricePool[bands.price], "a1")), t(one(districtPool, "a1b"))),
    },
    {
      question: t(one(CITY_FAQ_YIELD[locale], "q2")),
      answer: join(t(one(yieldPool[bands.yield], "a2")), t(one(scalePool[bands.demand], "a2b"))),
    },
  ];
}


/**
 * Rotacja listy: wybiera `count` elementów od pozycji zależnej od URL-a.
 * Używane do FAQ, bo pełna lista pytań szablonowych na każdej stronie była
 * największym źródłem podobieństwa (Jaccard 0.75-0.82 na samym FAQ).
 */
export function rotateItems<T>(
  items: readonly T[],
  key: string,
  salt: string,
  count: number,
): T[] {
  if (items.length <= count) return [...items];
  const start = hashString(`${key}::rot-${salt}`) % items.length;
  return [...items.slice(start), ...items.slice(0, start)].slice(0, count);
}


// ---------------------------------------------------------------------------
// Warstwy dodatkowe: pieniądze z czynszu i timing rynku.
// ---------------------------------------------------------------------------

const PL_RENT: string[] = [
  "Czynsz {rent} €/m²/mies. daje {yieldRate} brutto i {netRate} netto, a to kwota, którą realnie zostaje w kieszeni.",
  "Przy czynszu {rent} €/m²/mies. brutto wychodzi {yieldRate}, netto {netRate} - i to jest punkt startowy do rozmowy z zarządcą.",
  "Rynek płaci tu {rent} €/m²/mies., co przekłada się na {yieldRate} brutto; po kosztach zostaje {netRate}.",
  "Wynajem w tej strefie to {rent} €/m²/mies., czyli {yieldRate} brutto, z którego po podatkach i obsłudze zostaje {netRate}.",
];

const PL_TIMING: string[] = [
  "Dynamika {growth} r/r mówi, że rynek jeszcze rośnie, ale wolniej niż rok temu - to czas na wybór, nie na pośpiech.",
  "Ceny rosną o {growth} r/r, więc negocjujesz na rynku, który wciąż idzie w górę, ale bez presji licytacji.",
  "Przy {growth} wzrostu rocznie nie ma sensu czekać na spadek: kupujesz lokalizację, nie moment.",
  "Wzrost {growth} r/r to sygnał dojrzałego rynku: mniej okazji, ale też mniej ryzyka nagłej korekty.",
];

const EN_RENT: string[] = [
  "Rent of {rent} per m² per month gives {yieldRate} gross and {netRate} net, which is what actually stays in your pocket.",
  "At {rent} per m² per month the gross figure is {yieldRate} and the net {netRate}, the starting point for talks with a manager.",
  "The market pays {rent} per m² per month here, which converts to {yieldRate} gross and {netRate} after costs.",
  "Letting in this area brings {rent} per m² per month, so {yieldRate} gross, of which {netRate} survives tax and management.",
];

const EN_TIMING: string[] = [
  "Growth of {growth} year on year says the market is still rising, just slower than last year, so this is a time to choose rather than rush.",
  "Prices are up {growth} year on year, so you negotiate in a rising market without an auction atmosphere.",
  "At {growth} annual growth there is no point waiting for a fall: you buy a location, not a moment.",
  "Growth of {growth} signals a mature market: fewer bargains, but also less risk of a sudden correction.",
];

const ES_RENT: string[] = [
  "Un alquiler de {rent} por m² al mes da {yieldRate} bruto y {netRate} neto, que es lo que de verdad queda.",
  "Con {rent} por m² al mes el bruto es {yieldRate} y el neto {netRate}, el punto de partida para hablar con un gestor.",
  "El mercado paga aquí {rent} por m² al mes, lo que se traduce en {yieldRate} bruto y {netRate} tras gastos.",
  "Alquilar en esta zona aporta {rent} por m² al mes, es decir {yieldRate} bruto, del que sobrevive {netRate} tras impuestos y gestión.",
];

const ES_TIMING: string[] = [
  "Un crecimiento del {growth} interanual indica que el mercado sigue subiendo, más despacio que el año pasado, así que toca elegir sin prisa.",
  "Los precios suben un {growth} anual, así que se negocia en un mercado al alza pero sin subasta.",
  "Con un {growth} anual no tiene sentido esperar una bajada: se compra ubicación, no momento.",
  "Un {growth} de subida apunta a un mercado maduro: menos gangas y también menos riesgo de corrección brusca.",
];

