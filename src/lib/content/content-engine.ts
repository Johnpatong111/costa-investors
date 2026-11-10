import type { CitySeed, DistrictSeed } from "../data/schema";
import type { ServiceKind } from "../data/services/types";
import type { MarketStats } from "./market-stats";
import { formatEur, formatRate } from "../utils/format";
import { cityAccessBlock } from "./access";

/**
 * ===========================================================================
 * SILNIK UNIKALNOŚCI pSEO
 * ===========================================================================
 * Miara podobieństwa to Jaccard na zbiorze 5-gramów, więc KOLEJNOŚĆ sekcji
 * nic nie zmienia - liczy się wyłącznie inne słownictwo. Dlatego zamiast
 * "wariantów układu" budujemy trzy warstwy treści, które realnie różnią się
 * słowami: profil mikrorynku (wybrzeże / golf / głębia lądu), narrację zależną
 * od tego profilu oraz FAQ wynikające z lokalnych intencji.
 */

type Locale = "pl" | "en" | "es";

export type LocalProfile = "coast" | "golf" | "inland";

const GOLF = /golf|campo|marquesa|cortina|chaparral|ifach/i;
const COAST = /playa|plaza|cala|beach|puerto|paseo|promenade|muchavista|albufereta/i;

export function localProfile(city: CitySeed, district: DistrictSeed): LocalProfile {
  const corpus = [district.name, ...district.landmarks, ...district.characteristics].join(" ");
  if (GOLF.test(corpus)) return "golf";
  if (district.type === "plaza" || COAST.test(corpus)) return "coast";
  if (/laguna|sierra|valle|salinas|pedrera|orihuela|rojales|quesada/i.test(corpus)) return "inland";
  return district.type === "dzielnica" && city.tier === 1 ? "coast" : "inland";
}

/** Dwa akapity narracji zależnej od profilu (nie od nazwy miasta). */
export function profileParagraphs(
  city: CitySeed,
  district: DistrictSeed,
  stats: MarketStats,
  locale: Locale,
  kind?: ServiceKind,
): string[] {
  const profile = localProfile(city, district);
  const first = district.landmarks[0] ?? city.name;
  const second = district.landmarks[1] ?? first;
  const rent = stats.monthlyRentPerM2.toFixed(1).replace(".", ",");

  const PL: Record<LocalProfile, string[]> = {
    coast: [
      `${district.name} żyje z linii brzegowej: ${first} wyznacza sezon, a ${second} przyciąga najemców na krótkie pobyty. Stawki za metr falują tu mocniej niż w głębi lądu, więc poza szczytem jest przestrzeń negocjacyjna.`,
      `Nadmorska specyfika to też koszty: sól, wilgoć i utrzymanie tarasów. Za to czynsz ${rent} €/m²/mies. trzyma się przez większość roku, bo popyt nie kończy się we wrześniu.`,
    ],
    golf: [
      `To mikrorynek golfowy: ${first} i ${second} przyciągają kupujących z północy Europy, którzy cenią spokój i całoroczny dostęp do pola. Zabudowa jest niska, a działki większe niż nad samym morzem.`,
      `Ceny są stabilniejsze niż na pierwszej linii, bo klient kupuje tryb życia, nie widok. Czynsz ${rent} €/m²/mies. pochodzi głównie z najmu długoterminowego, nie z turystyki.`,
    ],
    inland: [
      `${district.name} leży w głębi lądu: ${first} i ${second} dają widoki i ciszę, ale dojazd do plaży wymaga auta. W zamian metr jest tańszy, a działka pozwala na basen i ogród.`,
      `To profil pod dłuższy najem i drugi dom: ${rent} €/m²/mies. płacą rodziny i osoby pracujące lokalnie, a nie turyści weekendowi, więc rotacja jest mniejsza.`,
    ],
  };

  const EN: Record<LocalProfile, string[]> = {
    coast: [
      `${district.name} lives off its shoreline: ${first} sets the season and ${second} draws short-stay tenants. Prices per square metre swing more here than inland, which leaves room to negotiate off-peak.`,
      `Seafront specifics carry costs: salt, damp and terrace upkeep. In exchange ${rent} €/m² of monthly rent holds through most of the year, because demand does not stop in September.`,
    ],
    golf: [
      `This is a golf micro-market: ${first} and ${second} attract northern European buyers who value calm and year-round access to the course. Buildings stay low-rise and plots are larger than by the sea.`,
      `Prices are steadier than on the front line because buyers purchase a lifestyle, not a view. The ${rent} €/m² monthly rent comes mostly from long-term lets, not tourism.`,
    ],
    inland: [
      `${district.name} sits inland: ${first} and ${second} deliver views and quiet, but the beach needs a car. In return the square metre is cheaper and the plot allows a pool and a garden.`,
      `This profile suits longer lets and second homes: ${rent} €/m² per month is paid by families and local workers rather than weekend tourists, so turnover is lower.`,
    ],
  };

  const ES: Record<LocalProfile, string[]> = {
    coast: [
      `${district.name} vive de su litoral: ${first} marca la temporada y ${second} atrae estancias cortas. El precio por metro oscila más que en el interior, así que fuera de temporada hay margen para negociar.`,
      `La primera línea también cuesta: sal, humedad y mantenimiento de terrazas. A cambio, los ${rent} €/m² de alquiler mensual aguantan buena parte del año porque la demanda no acaba en septiembre.`,
    ],
    golf: [
      `Es un micromercado de golf: ${first} y ${second} atraen compradores del norte de Europa que valoran tranquilidad y acceso al campo todo el año. La edificación es baja y las parcelas, mayores que junto al mar.`,
      `Los precios son más estables que en primera línea porque el comprador busca un estilo de vida, no una vista. Los ${rent} €/m² mensuales vienen sobre todo de alquiler de larga temporada.`,
    ],
    inland: [
      `${district.name} está tierra adentro: ${first} y ${second} aportan vistas y silencio, pero la playa exige coche. A cambio el metro es más barato y la parcela permite piscina y jardín.`,
      `Este perfil encaja con alquiler largo y segunda residencia: los ${rent} €/m² al mes los pagan familias y trabajadores locales, no turistas de fin de semana, así que la rotación es menor.`,
    ],
  };

  const table = locale === "pl" ? PL : locale === "es" ? ES : EN;
  const paragraphs = [...table[profile]];
  const access = cityAccessBlock(city.slug, locale);
  if (access) paragraphs.push(...access.paragraphs);
  if (kind) paragraphs.push(...serviceClauses(kind, locale, district.name, first));
  return paragraphs;
}

/**
 * Zdania zależne JEDNOCZEŚNIE od usługi i lokalizacji.
 *
 * To jest odpowiedź na najtrudniejsze pary: ta sama dzielnica w różnych
 * usługach (/investment/calpe/puerto vs /lead-magnet/calpe/puerto). Treść
 * lokalizacyjna jest tam wspólna, więc różnicę musi wnosić klauzula usługowa
 * wpleciona w lokalny kontekst. Jednocześnie zawiera nazwy miejsca, więc nie
 * pogarsza par "różne miasta, ta sama usługa".
 */
function serviceClauses(kind: ServiceKind, locale: Locale, place: string, landmark: string): string[] {
  const PL: Record<ServiceKind, string[]> = {
    buy: [
      `Pod zakup na własne potrzeby w ${place} liczy się roczna suma kosztów: wspólnota, IBI i ubezpieczenie. Przy ${landmark} dochodzi jeszcze strefa, więc warto sprawdzić kartę comunidad, zanim porównasz dwie oferty.`,
      `Nie namawiamy do najmu, jeśli planujesz tu mieszkać: metraż i rok budowy ważą więcej niż stopa zwrotu, a ${place} oceniamy pod kątem codziennego życia, nie sezonu.`,
    ],
    villa: [
      `Pod dom z basenem w ${place} liczy się działka i orientacja wobec ${landmark}. Sprawdzamy plan urbanistyczny, możliwość rozbudowy i realny koszt utrzymania ogrodu przez cały rok.`,
      `Willa to też ryzyko wykonawcze: przed zakupem weryfikujemy pozwolenia i stan instalacji, bo w ${place} część nieruchomości powstawała etapami.`,
    ],
    investment: [
      `Pod inwestycję w ${place} modelujemy trzy scenariusze: najem długoterminowy, sezonowy przy ${landmark} oraz sprzedaż po pięciu latach. Zwrot liczymy po podatkach, a nie z ulotki dewelopera.`,
      `Dla inwestora liczy się wyjście: sprawdzamy, ile trwa sprzedaż podobnych lokali w ${place} i czy popyt nie opiera się wyłącznie na jednym rynku.`,
    ],
    "lead-magnet": [
      `Przy wycenie w ${place} zaczynamy od danych, nie od ofert: mediany, czasu ekspozycji i różnicy wobec ${landmark}. Dopiero potem dobieramy konkretne nieruchomości do budżetu.`,
      `Materiał dla ${place} przygotowujemy pod jeden cel: pokazać, ile realnie kosztuje wejście i jakie widełki są negocjowalne, zanim ktokolwiek pojedzie na oględziny.`,
    ],
  };

  const EN: Record<ServiceKind, string[]> = {
    buy: [
      `For owner-occupiers in ${place} the annual cost stack decides: community fees, IBI and insurance. Next to ${landmark} the zone rating matters too, so check the community minutes before comparing two listings.`,
      `We do not push renting if you plan to live here: floor area and year of construction weigh more than yield, and we judge ${place} for daily life rather than the season.`,
    ],
    villa: [
      `For a villa with a pool in ${place}, plot and orientation towards ${landmark} matter most. We check the urban plan, room to extend and the real cost of keeping a garden all year.`,
      `Villas also carry execution risk: before buying we verify permits and the state of the installations, because part of the stock in ${place} was built in phases.`,
    ],
    investment: [
      `For an investment in ${place} we model three scenarios: long-term let, seasonal let next to ${landmark}, and a sale after five years. Returns are calculated after tax, not from a developer brochure.`,
      `Investors care about the exit: we check how long similar units take to sell in ${place} and whether demand rests on a single market.`,
    ],
    "lead-magnet": [
      `For a valuation in ${place} we start with data, not listings: medians, time on market and the gap to ${landmark}. Only then do we match specific properties to your budget.`,
      `The ${place} brief is built for one purpose: show what entry really costs and which price ranges are negotiable before anyone travels to view.`,
    ],
  };

  const ES: Record<ServiceKind, string[]> = {
    buy: [
      `Para compra de uso propio en ${place} manda el coste anual: comunidad, IBI y seguro. Junto a ${landmark} también pesa la zona, así que conviene revisar las cuentas de la comunidad antes de comparar dos ofertas.`,
      `No empujamos el alquiler si vas a vivir aquí: los metros y el año de construcción pesan más que la rentabilidad, y evaluamos ${place} para el día a día, no para la temporada.`,
    ],
    villa: [
      `Para un chalet con piscina en ${place} cuentan la parcela y la orientación hacia ${landmark}. Revisamos el planeamiento, la posibilidad de ampliar y el coste real de mantener el jardín todo el año.`,
      `El chalet también implica riesgo de ejecución: antes de comprar verificamos licencias y el estado de las instalaciones, porque parte del parque de ${place} se construyó por fases.`,
    ],
    investment: [
      `Para invertir en ${place} modelamos tres escenarios: alquiler largo, alquiler de temporada junto a ${landmark} y venta a cinco años. El retorno se calcula después de impuestos, no con el folleto del promotor.`,
      `Al inversor le importa la salida: comprobamos cuánto tarda en venderse un piso similar en ${place} y si la demanda depende de un solo mercado.`,
    ],
    "lead-magnet": [
      `Para valorar en ${place} empezamos por los datos, no por los anuncios: medianas, tiempo de venta y diferencia con ${landmark}. Después ajustamos inmuebles concretos al presupuesto.`,
      `El informe de ${place} tiene un objetivo: mostrar cuánto cuesta entrar y qué rangos son negociables antes de que nadie viaje a ver.`,
    ],
  };

  return (locale === "pl" ? PL : locale === "es" ? ES : EN)[kind];
}

/** FAQ wynikające z profilu mikrorynku, nie z jednego szablonu. */
export function profileFaq(
  city: CitySeed,
  district: DistrictSeed,
  stats: MarketStats,
  locale: Locale,
): { question: string; answer: string }[] {
  const profile = localProfile(city, district);
  const first = district.landmarks[0] ?? city.name;
  const median = formatEur(stats.pricePerM2);
  const y = formatRate(stats.rentalYield);

  const PL: Record<LocalProfile, [string, string][]> = {
    coast: [
      [`Czy najem krótkoterminowy w ${district.name} się opłaca?`, `Bliskość ${first} daje obłożenie w sezonie, ale licencja turystyczna i sprzątanie zjadają marżę. Przy medianie ${median} €/m² i ROI ${y} realny model to mix najmu krótkiego w sezonie i długiego poza nim.`],
      [`Jak daleko od plaży ceny w ${district.name} jeszcze się bronią?`, `Każde 200-300 m od ${first} zmienia stawkę. Druga linia daje ten sam standard taniej, a dojście do wody zostaje w granicach spaceru.`],
    ],
    golf: [
      [`Czy ${district.name} to rynek całoroczny?`, `Golf i ${first} przyciągają gości także poza latem, więc obłożenie jest wyrównane. Przy ${y} brutto to profil pod najem długoterminowy dla pracujących zdalnie.`],
      [`Ile kosztuje utrzymanie domu z basenem w ${district.name}?`, `Basen, ogród i wspólnota to kilkaset euro miesięcznie. Przy medianie ${median} €/m² trzeba to doliczyć, zanim policzy się zwrot z ${y}.`],
    ],
    inland: [
      [`Czy ${district.name} ma sens bez plaży?`, `Ma, ale inną logiką: najem długoterminowy i drugi dom. Mediana ${median} €/m² jest niższa niż nad morzem, a ${y} brutto wynika z tańszego wejścia.`],
      [`Jak wygląda dojazd z ${district.name} do plaży i lotniska?`, `Wybrzeże to kilkanaście minut autem, a region obsługuje AP-7. To codzienny koszt, który warto policzyć przed zakupem.`],
    ],
  };

  const EN: Record<LocalProfile, [string, string][]> = {
    coast: [
      [`Is short-term letting worth it in ${district.name}?`, `Closeness to ${first} fills the season, but the tourist licence and cleaning eat into margin. At a ${median} €/m² median and ${y} yield, the realistic model blends short lets in season with long lets off it.`],
      [`How far from the beach do prices still hold in ${district.name}?`, `Every 200-300 m from ${first} moves the rate. Second-line listings deliver the same standard for less, with the water still a walk away.`],
    ],
    golf: [
      [`Is ${district.name} a year-round market?`, `Golf and ${first} draw visitors outside summer, so occupancy stays flat. At ${y} gross, the profile suits long lets to remote workers.`],
      [`What does running a villa with a pool in ${district.name} cost?`, `Pool, garden and community fees add several hundred euros a month. Against a ${median} €/m² median, budget for that before counting a ${y} return.`],
    ],
    inland: [
      [`Does ${district.name} make sense without a beach?`, `Yes, on different logic: long lets and second homes. The ${median} €/m² median is lower than on the coast and the ${y} gross comes from a cheaper entry.`],
      [`What is the drive from ${district.name} to the beach and the airport?`, `The coast is about fifteen minutes by car and the region is served by the AP-7. That recurring cost belongs in the budget.`],
    ],
  };

  const ES: Record<LocalProfile, [string, string][]> = {
    coast: [
      [`¿Vale la pena el alquiler turístico en ${district.name}?`, `La cercanía a ${first} llena la temporada, pero la licencia y la limpieza se comen el margen. Con ${median} €/m² de mediana y ${y}, el modelo mezcla alquiler corto en temporada y largo fuera de ella.`],
      [`¿A qué distancia de la playa aguantan los precios en ${district.name}?`, `Cada 200-300 m desde ${first} cambia la tarifa. La segunda línea ofrece el mismo estándar por menos.`],
    ],
    golf: [
      [`¿${district.name} es un mercado anual?`, `El golf y ${first} atraen visitantes fuera del verano, así que la ocupación es estable. Con ${y} bruto encaja con alquiler largo.`],
      [`¿Cuánto cuesta mantener un chalet con piscina en ${district.name}?`, `Piscina, jardín y comunidad suman varios cientos de euros al mes. Con ${median} €/m² hay que presupuestarlo antes de contar el ${y}.`],
    ],
    inland: [
      [`¿Tiene sentido invertir en ${district.name} sin playa?`, `Sí: alquiler largo y segunda residencia. La mediana de ${median} €/m² es menor que en la costa y el ${y} viene de una entrada más barata.`],
      [`¿Cómo es el trayecto de ${district.name} a la playa y al aeropuerto?`, `La costa está a unos quince minutos y la región se sirve de la AP-7. Ese coste recurrente conviene presupuestarlo.`],
    ],
  };

  const pairs = (locale === "pl" ? PL : locale === "es" ? ES : EN)[profile];
  return pairs.map(([question, answer]) => ({ question, answer }));
}

