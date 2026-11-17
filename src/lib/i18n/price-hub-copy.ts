import type { Locale } from "./config";

/** Rok publikacji danych (spójny z market-stats). */
const MARKET_YEAR = 2026;

/**
 * ===========================================================================
 * COPY HUBY RAPORTÓW CENOWYCH (`/[lang]/ceny-m2`)
 * ===========================================================================
 * Metadane tego huba były już tłumaczone, ale CAŁA WIDOCZNA TREŚĆ strony
 * (nagłówek, lead, nagłówki tabeli, eyebrow sekcji) była zaszyta po polsku -
 * użytkownik /en/ i /es/ widział polską tabelę danych.
 */

export interface PriceHubCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  citiesEyebrow: string;
  chooseLocation: string;
  caption: (year: number) => string;
  colCity: string;
  colRegion: string;
  colMedian: string;
  colRoi: string;
  colGrowth: string;
  colDistricts: string;
  regionsEyebrow: string;
  browseRegion: string;
  runningCostsHeading: string;
  runningCostsIntro: string;
  runningCostsBullets: string[];
  costsCta: string;
  methodologyHeading: string;
  methodologyText: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
}

export const PRICE_HUB_COPY: Record<Locale, PriceHubCopy> = {
  pl: {
    eyebrow: "Dane rynkowe",
    h1: "Ceny m² i ROI w Hiszpanii",
    lead: "Zestawienie median cen ofertowych, rentowności najmu, dynamiki rocznej i czasu sprzedaży. Każdy raport zawiera porównanie dzielnic i wyliczenie zwrotu dla budżetu inwestora.",
    citiesEyebrow: "Miejscowości",
    chooseLocation: "Wybierz lokalizację",
    caption: (year) => `Mediany cen, ROI i dynamika w miejscowościach Costa Blanca i Costa Cálida - ${year}`,
    colCity: "Miejscowość",
    colRegion: "Region",
    colMedian: "Mediana €/m²",
    colRoi: "ROI",
    colGrowth: "r/r",
    colDistricts: "Dzielnice",
    regionsEyebrow: "Regiony",
    browseRegion: "Przeglądaj po regionie",
    runningCostsHeading: "Koszty utrzymania mieszkania w Hiszpanii",
    runningCostsIntro:
      "Cena zakupu to nie cały koszt. Rocznie dochodzą IBI (podatek od nieruchomości), wspólnota, wywóz śmieci, ubezpieczenie i utrzymanie lokalu. W osiedlach z basenem i windą sama wspólnota potrafi wynieść 60-120 € miesięcznie, a w wieżowcach w Benidormie jeszcze więcej. Przed zakupem policz te koszty razem z czynszem, a nie dopiero po podpisaniu aktu.",
    runningCostsBullets: [
      "IBI: zależy od wartości katastralnej, zwykle kilkaset euro rocznie",
      "Wspólnota: 40-120 €/miesiąc, więcej przy basenie, windzie i ochronie",
      "Wywóz śmieci (basura) i ubezpieczenie: około 200-500 € rocznie",
      "Utrzymanie i rezerwa remontowa: około 1% wartości nieruchomości rocznie",
    ],
    costsCta: "Zobacz pełne koszty zakupu i utrzymania mieszkania",
    methodologyHeading: "Jak liczymy ceny i ROI",
    methodologyText:
      "Podajemy medianę cen ofertowych, nie cen transakcyjnych, więc realna cena może być niższa o kilka procent. ROI brutto to roczny czynsz podzielony przez cenę zakupu; ROI netto odejmuje koszty utrzymania, podatki i założone pustostany. Dane aktualizujemy razem z bazą rynku i traktujemy jako punkt wyjścia do analizy konkretnej nieruchomości, a nie wycenę.",
    faqTitle: "Ceny i ROI w Hiszpanii - pytania i odpowiedzi",
    faq: [
      {
        question: "Czym różni się ROI brutto od netto?",
        answer:
          "ROI brutto to roczny czynsz podzielony przez cenę zakupu. ROI netto odejmuje koszty utrzymania, podatki, ubezpieczenie, zarządzanie i założone pustostany, więc jest zwykle o 1-2 punkty procentowe niższe.",
      },
      {
        question: "Czy podane ceny to ceny transakcyjne?",
        answer:
          "Nie. Publikujemy mediany cen ofertowych z rynku. Cena transakcyjna bywa niższa, szczególnie w starszych blokach i przy dłuższej ekspozycji oferty.",
      },
      {
        question: "Jakie koszty utrzymania mieszkania w Hiszpanii trzeba doliczyć?",
        answer:
          "IBI, wspólnotę, wywóz śmieci, ubezpieczenie i utrzymanie lokalu. W osiedlach z basenem i windą wspólnota to często 60-120 € miesięcznie; w wieżowcach wypoczynkowych bywa wyższa.",
      },
      {
        question: "Dlaczego ceny w dzielnicach tego samego miasta tak się różnią?",
        answer:
          "O cenie decyduje odległość od plaży, linia zabudowy, rok budowy, widok i standard osiedla. Rozstrzał w jednej gminie potrafi sięgnąć kilkuset euro za metr, dlatego średnia miasta nie wystarcza do wyceny.",
      },
      {
        question: "Czy dane obejmują nowe budownictwo?",
        answer:
          "Tak, jeśli trafia do bazy ofert. Nowe inwestycje mają zwykle wyższą cenę za metr i wyższą wspólnotę, ale też dłuższą gwarancję i niższe ryzyko remontu.",
      },
      {
        question: "Jak często aktualizujecie dane?",
        answer:
          "Bazę odświeżamy razem z nowymi danymi rynkowymi; rok publikacji i data danych są podane przy każdym raporcie. Historia cen obejmuje lata 2016-2026.",
      },
    ],
  },
  en: {
    eyebrow: "Market data",
    h1: "Spanish property prices and rental yields",
    lead: "Median asking prices, rental yields, annual growth and time on market. Every report includes a district comparison and a return calculation for your budget.",
    citiesEyebrow: "Locations",
    chooseLocation: "Choose a location",
    caption: (year) => `Median prices, yields and growth across Costa Blanca and Costa Cálida - ${year}`,
    colCity: "Location",
    colRegion: "Region",
    colMedian: "Median €/m²",
    colRoi: "Yield",
    colGrowth: "YoY",
    colDistricts: "Areas",
    regionsEyebrow: "Regions",
    browseRegion: "Browse by region",
    runningCostsHeading: "Running costs of a Spanish apartment",
    runningCostsIntro:
      "The purchase price is not the full cost. Every year you also pay IBI property tax, community fees, refuse collection, insurance and maintenance. In estates with a pool and lift the community alone can reach €60-120 per month, and in Benidorm high-rises more. Count these costs together with the rent before you sign, not after.",
    runningCostsBullets: [
      "IBI: based on cadastral value, usually a few hundred euros a year",
      "Community: €40-120/month, higher with pool, lift and security",
      "Refuse collection and insurance: around €200-500 a year",
      "Maintenance and sinking fund: around 1% of property value a year",
    ],
    costsCta: "See the full purchase and running costs",
    methodologyHeading: "How we calculate prices and yields",
    methodologyText:
      "We publish the median asking price, not transaction prices, so the final price can be several percent lower. Gross yield is annual rent divided by purchase price; net yield deducts running costs, taxes and assumed voids. Data is refreshed with the market dataset and is a starting point for analysing a specific property, not a valuation.",
    faqTitle: "Spanish prices and yields - questions and answers",
    faq: [
      {
        question: "What is the difference between gross and net yield?",
        answer:
          "Gross yield is annual rent divided by the purchase price. Net yield deducts running costs, taxes, insurance, management and assumed voids, so it is usually one to two percentage points lower.",
      },
      {
        question: "Are these transaction prices?",
        answer:
          "No. We publish median asking prices. The transaction price can be lower, especially in older blocks and when a listing has been on the market for a long time.",
      },
      {
        question: "What running costs should I budget for in Spain?",
        answer:
          "IBI, community fees, refuse collection, insurance and maintenance. In estates with a pool and lift the community is often €60-120 per month; in holiday high-rises it can be higher.",
      },
      {
        question: "Why do prices vary so much between areas of the same town?",
        answer:
          "Distance to the beach, building line, year of construction, view and estate standard drive the price. The spread inside one municipality can reach several hundred euros per square metre, so a town average is not enough for a valuation.",
      },
      {
        question: "Does the data include new-build homes?",
        answer:
          "Yes, when they reach the listings dataset. New developments usually carry a higher price per square metre and higher community fees, but also a longer warranty and lower refurbishment risk.",
      },
      {
        question: "How often is the data updated?",
        answer:
          "The dataset is refreshed with new market data; the publication year and data date appear in every report. Price history covers 2016-2026.",
      },
    ],
  },
  es: {
    eyebrow: "Datos de mercado",
    h1: "Precios de la vivienda y rentabilidad en España",
    lead: "Medianas de precio de oferta, rentabilidad del alquiler, crecimiento anual y tiempo de venta. Cada informe incluye comparativa por zonas y cálculo del retorno para tu presupuesto.",
    citiesEyebrow: "Localidades",
    chooseLocation: "Elige una localidad",
    caption: (year) => `Medianas de precio, rentabilidad y crecimiento en Costa Blanca y Costa Cálida - ${year}`,
    colCity: "Localidad",
    colRegion: "Región",
    colMedian: "Mediana €/m²",
    colRoi: "Rentabilidad",
    colGrowth: "Interanual",
    colDistricts: "Zonas",
    regionsEyebrow: "Regiones",
    browseRegion: "Explorar por región",
    runningCostsHeading: "Gastos de mantenimiento de un piso en España",
    runningCostsIntro:
      "El precio de compra no es el coste total. Cada año se suman el IBI, la comunidad, la basura, el seguro y el mantenimiento. En urbanizaciones con piscina y ascensor la comunidad puede llegar a 60-120 € al mes, y en los rascacielos de Benidorm más. Calcula estos gastos junto al alquiler antes de firmar.",
    runningCostsBullets: [
      "IBI: según el valor catastral, normalmente unos cientos de euros al año",
      "Comunidad: 40-120 €/mes, más con piscina, ascensor y seguridad",
      "Basura y seguro: unos 200-500 € al año",
      "Mantenimiento y reserva: alrededor del 1% del valor al año",
    ],
    costsCta: "Ver todos los gastos de compra y mantenimiento",
    methodologyHeading: "Cómo calculamos precios y rentabilidad",
    methodologyText:
      "Publicamos la mediana de precios de oferta, no de transacción, así que el precio final puede ser varios puntos menor. La rentabilidad bruta es el alquiler anual dividido por el precio; la neta descuenta gastos, impuestos y vacíos. Los datos se actualizan con la base de mercado y son un punto de partida para analizar una vivienda concreta, no una tasación.",
    faqTitle: "Precios y rentabilidad en España: preguntas y respuestas",
    faq: [
      {
        question: "¿Qué diferencia hay entre rentabilidad bruta y neta?",
        answer:
          "La bruta es el alquiler anual dividido por el precio de compra. La neta descuenta gastos, impuestos, seguro, gestión y vacíos, así que suele ser uno o dos puntos menor.",
      },
      {
        question: "¿Son precios de transacción?",
        answer:
          "No. Publicamos medianas de precios de oferta. El precio de transacción puede ser inferior, sobre todo en bloques antiguos y cuando el anuncio lleva mucho tiempo en el mercado.",
      },
      {
        question: "¿Qué gastos anuales debo prever en España?",
        answer:
          "IBI, comunidad, basura, seguro y mantenimiento. En urbanizaciones con piscina y ascensor la comunidad suele ser de 60-120 € al mes; en torres turísticas puede ser mayor.",
      },
      {
        question: "¿Por qué varían tanto los precios dentro del mismo municipio?",
        answer:
          "La distancia a la playa, la línea de edificación, el año de construcción, las vistas y el estándar de la urbanización marcan el precio. La horquilla en un municipio puede superar varios cientos de euros por metro, así que la media municipal no basta para valorar.",
      },
      {
        question: "¿Los datos incluyen obra nueva?",
        answer:
          "Sí, cuando entra en la base de ofertas. La obra nueva suele tener mayor precio por metro y mayor comunidad, pero también más garantía y menos riesgo de reforma.",
      },
      {
        question: "¿Con qué frecuencia se actualizan los datos?",
        answer:
          "La base se actualiza con nuevos datos de mercado; el año y la fecha aparecen en cada informe. La evolución cubre 2016-2026.",
      },
    ],
  },
};

/** Metadane huba raportów (title/description/keywords per język). */
export const PRICE_HUB_META: Record<
  Locale,
  { title: string; description: string; keywords: string[] }
> = {
  pl: {
    title: "Ceny m² i ROI w Hiszpanii 2026 | 15 miast, 89 dzielnic",
    description:
      "Mediany cen, rentowność najmu i dynamika r/r w 15 miejscowościach Costa Blanca i Costa Cálida. Historia cen 2016-2026 w każdej dzielnicy.",
    keywords: [
      "ceny m2 Costa Blanca",
      "ceny m2 Costa Cálida",
      "historia cen nieruchomości 2016-2026",
      "ceny nieruchomości 2026",
    ],
  },
  en: {
    title: "Spanish property prices & yields 2026 | 15 cities",
    description:
      "Median €/m², rental yields and annual growth across 15 locations on Costa Blanca and Costa Cálida. Price history 2016-2026 for every district.",
    keywords: [
      "property prices Costa Blanca",
      "price per m2 Costa Cálida",
      "Spanish property price history 2016-2026",
      "rental yield Spain 2026",
    ],
  },
  es: {
    title: "Precios y rentabilidad inmobiliaria 2026 | 15 ciudades",
    description:
      "Mediana €/m², rentabilidad de alquiler y crecimiento anual en 15 localidades de Costa Blanca y Costa Cálida. Evolución de precios 2016-2026 por zona.",
    keywords: [
      "precio m2 Costa Blanca",
      "precio m2 Costa Cálida",
      "evolución de precios 2016-2026",
      "rentabilidad alquiler España 2026",
    ],
  },
};
