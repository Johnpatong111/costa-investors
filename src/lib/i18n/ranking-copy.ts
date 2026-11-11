import type { Locale } from "./config";

/**
 * Ranking ROI: jedna strona, która porządkuje 89 dzielnic po zwrocie netto.
 * Copy trzymane osobno, bo strona jest wspólna dla PL/EN/ES.
 */
export interface RankingCopy {
  eyebrow: string;
  h1: string;
  lead: (count: number, cities: number) => string;
  summary: {
    median: string;
    best: string;
    worst: string;
    medianPrice: string;
  };
  columns: {
    rank: string;
    district: string;
    city: string;
    price: string;
    roiGross: string;
    roiNet: string;
    growth: string;
    days: string;
    demand: string;
    area: string;
  };
  note: string;
  teaserTitle: string;
  teaserText: string;
  mapTitle: string;
  mapLead: (count: number) => string;
  mapLegend: string;
  mapNote: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  backToReports: string;
  metaTitle: string;
  metaDescription: (count: number) => string;
  filtersTitle: string;
  filterYield: string;
  filterDays: string;
  filterSearch: string;
  filterReset: string;
  filterAny: string;
  filterResults: (shown: number, total: number) => string;
  filterEmpty: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  keywords: string[];
}

const PL: RankingCopy = {
  eyebrow: "Ranking danych",
  h1: "Ranking ROI: 89 dzielnic Costa Blanca i Costa Cálida",
  lead: (count, cities) =>
    `${count} dzielnic w ${cities} gminach, uszeregowanych po zwrocie netto z najmu. Obok ceny i zwrotu brutto podajemy dynamikę, czas ekspozycji oferty i metraż, jaki kupisz za 250 000 €.`,
  summary: {
    median: "Mediana zwrotu netto",
    best: "Najwyższy zwrot netto",
    worst: "Najniższy zwrot netto",
    medianPrice: "Metraż za 250 tys. €",
  },
  columns: {
    rank: "#",
    district: "Dzielnica",
    city: "Gmina",
    price: "€/m²",
    roiGross: "ROI brutto",
    roiNet: "ROI netto",
    growth: "Wzrost r/r",
    days: "Ekspozycja",
    demand: "Popyt",
    area: "m² za 250 tys. €",
  },
  note:
    "Zwrot netto to model: rentowność brutto minus koszty zarządzania, podatku i pustostanów (1,9 pkt proc.). Ranking nie jest rekomendacją konkretnej nieruchomości.",
  teaserTitle: "Ranking ROI: 89 dzielnic w jednej tabeli",
  teaserText:
    "Zwrot brutto i netto, dynamika, czas ekspozycji i metraż za 250 tys. €, uszeregowane od najlepszej dzielnicy.",
  mapTitle: "Mapa zwrotu netto",
  mapLead: (count) =>
    `Każde z ${count} miejsc to jedna dzielnica. Kolor pokazuje zwrot netto, a położenie liczy się przy najmie sezonowym: bliżej plaży rośnie obłożenie, dalej rosną metry.`,
  mapLegend: "Zwrot netto",
  mapNote:
    "Mapa poglądowa: punkty oznaczają współrzędne dzielnicy, nie granice administracyjne. Najedź na punkt, aby zobaczyć cenę i zwrot.",
  ctaTitle: "Chcesz zobaczyć te liczby dla swojego budżetu?",
  ctaText:
    "Na stronach miast działa kalkulator: wpisujesz budżet, wybierasz profil najmu i widzisz metraż, czynsz po kosztach i zwrot po pięciu latach.",
  ctaButton: "Otwórz kalkulator",
  backToReports: "Wróć do raportów cenowych",
  metaTitle: "Ranking ROI nieruchomości Costa Blanca 2026 | 89 dzielnic",
  metaDescription: (count) =>
    `Ranking ${count} dzielnic Costa Blanca i Costa Cálida po zwrocie netto z najmu: ceny €/m², ROI brutto i netto, dynamika, czas ekspozycji i metraż za 250 tys. €.`,
  keywords: [
    "ranking ROI nieruchomości Costa Blanca",
    "najwyższy zwrot z najmu Hiszpania",
    "ROI netto dzielnice Costa Blanca",
    "gdzie kupić mieszkanie pod wynajem",
  ],
  faqTitle: "Jak czytać ten ranking",
  filtersTitle: "Filtruj ranking",
  filterYield: "Minimalny zwrot netto",
  filterDays: "Maksymalny czas ekspozycji (dni)",
  filterSearch: "Szukaj dzielnicy lub gminy",
  filterReset: "Wyczyść filtry",
  filterAny: "Dowolnie",
  filterResults: (shown, total) => `Pokazano ${shown} z ${total} dzielnic`,
  filterEmpty: "Brak dzielnic dla tych kryteriów. Poluzuj filtry, żeby zobaczyć więcej.",
  faq: [
    {
      question: "Jak liczony jest zwrot netto w rankingu?",
      answer:
        "Bierzemy rentowność brutto z bazy i odejmujemy 1,9 pkt proc. na zarządzanie, podatek i pustostany. Dzielnica z 6,6% brutto trafia więc do tabeli z 4,7% netto. To model, nie wynik konkretnej nieruchomości.",
    },
    {
      question: "Dlaczego dzielnice przy plaży mają czasem niższy zwrot?",
      answer:
        "Cena za metr rośnie szybciej niż czynsz. W pierwszej linii płacisz za lokalizację, a najemca nie płaci za widok proporcjonalnie do ceny zakupu, więc zwrot procentowy spada mimo wyższych stawek za dobę.",
    },
    {
      question: "Czy ranking uwzględnia podatki od zakupu?",
      answer:
        "Nie, podatki są poza zwrotem. ITP wynosi 10% w Comunitat Valenciana i 8% w Región de Murcia, a przy nowym budownictwie dochodzi IVA 10% i AJD. Pełne rozbicie pokazuje kalkulator kosztów na stronie każdego miasta.",
    },
    {
      question: "Skąd pochodzą dane i jak często się zmieniają?",
      answer:
        "Ceny, czynsze, dynamika i czas ekspozycji pochodzą z naszej bazy rynkowej dla 21 gmin i 89 dzielnic. Strona odświeża się raz na dobę, a wartości są szacunkowe i nie stanowią oferty inwestycyjnej.",
    },
  ],
};

const EN: RankingCopy = {
  eyebrow: "Data ranking",
  h1: "ROI ranking: 89 districts across Costa Blanca and Costa Cálida",
  lead: (count, cities) =>
    `${count} districts in ${cities} municipalities, ordered by net letting yield. Alongside price and gross yield we show growth, time on market and the floor area 250,000 buys.`,
  summary: {
    median: "Median net yield",
    best: "Highest net yield",
    worst: "Lowest net yield",
    medianPrice: "Floor area for 250,000",
  },
  columns: {
    rank: "#",
    district: "District",
    city: "Municipality",
    price: "€/m²",
    roiGross: "Gross yield",
    roiNet: "Net yield",
    growth: "Growth YoY",
    days: "Time on market",
    demand: "Demand",
    area: "m² for 250,000",
  },
  note:
    "Net yield is a model: gross yield minus management, tax and vacancy costs (1.9 percentage points). The ranking is not a recommendation of any specific property.",
  teaserTitle: "ROI ranking: 89 districts in one table",
  teaserText:
    "Gross and net yield, growth, time on market and floor area for 250,000, ordered from the strongest district down.",
  mapTitle: "Net yield map",
  mapLead: (count) =>
    `Each of the ${count} dots is one district. Colour shows net yield, and location matters for seasonal letting: closer to the beach occupancy rises, further inland the floor area grows.`,
  mapLegend: "Net yield",
  mapNote:
    "Illustrative map: dots are district coordinates, not administrative boundaries. Hover a dot to see price and yield.",
  ctaTitle: "Want these numbers for your own budget?",
  ctaText:
    "Every city page carries a calculator: enter a budget, pick a letting profile and see floor area, rent after costs and the five-year return.",
  ctaButton: "Open the calculator",
  backToReports: "Back to price reports",
  metaTitle: "Property ROI ranking Costa Blanca 2026 | 89 districts",
  metaDescription: (count) =>
    `Ranking of ${count} districts across Costa Blanca and Costa Cálida by net rental yield: price per m², gross and net ROI, growth, time on market and floor area for 250,000.`,
  keywords: [
    "property ROI ranking Costa Blanca",
    "highest rental yield Spain",
    "net yield by district Costa Blanca",
    "where to buy to let in Spain",
  ],
  faqTitle: "How to read this ranking",
  filtersTitle: "Filter the ranking",
  filterYield: "Minimum net yield",
  filterDays: "Maximum time on market (days)",
  filterSearch: "Search district or municipality",
  filterReset: "Clear filters",
  filterAny: "Any",
  filterResults: (shown, total) => `Showing ${shown} of ${total} districts`,
  filterEmpty: "No districts match these criteria. Loosen the filters to see more.",
  faq: [
    {
      question: "How is the net yield in the ranking calculated?",
      answer:
        "We take the gross yield from the database and subtract 1.9 percentage points for management, tax and vacancy. A district at 6.6% gross therefore appears at 4.7% net. It is a model, not the result of any single property.",
    },
    {
      question: "Why do beachfront districts sometimes show a lower return?",
      answer:
        "The price per square metre rises faster than the rent. On the front line you pay for the location, while a tenant does not pay for the view in proportion to the purchase price, so the percentage return falls even with higher nightly rates.",
    },
    {
      question: "Does the ranking include purchase taxes?",
      answer:
        "No, taxes sit outside the yield. Transfer tax is 10% in the Valencia region and 8% in Murcia, and new builds add 10% VAT plus AJD duty. The full breakdown is in the costs calculator on every city page.",
    },
    {
      question: "Where does the data come from and how often does it change?",
      answer:
        "Prices, rents, growth and time on market come from our market database covering 21 municipalities and 89 districts. The page refreshes once a day; values are estimates and not an investment offer.",
    },
  ],
};


const ES: RankingCopy = {
  eyebrow: "Ranking de datos",
  h1: "Ranking de rentabilidad: 89 zonas de Costa Blanca y Costa Cálida",
  lead: (count, cities) =>
    `${count} zonas en ${cities} municipios, ordenadas por rentabilidad neta del alquiler. Junto al precio y la rentabilidad bruta mostramos crecimiento, días de exposición y los metros que compran 250.000.`,
  summary: {
    median: "Rentabilidad neta mediana",
    best: "Mayor rentabilidad neta",
    worst: "Menor rentabilidad neta",
    medianPrice: "Metros por 250.000",
  },
  columns: {
    rank: "#",
    district: "Zona",
    city: "Municipio",
    price: "€/m²",
    roiGross: "Rent. bruta",
    roiNet: "Rent. neta",
    growth: "Crecimiento",
    days: "Exposición",
    demand: "Demanda",
    area: "m² por 250.000",
  },
  note:
    "La rentabilidad neta es un modelo: bruta menos gestión, impuestos y vacancia (1,9 puntos). El ranking no es recomendación de una vivienda concreta.",
  teaserTitle: "Ranking de rentabilidad: 89 zonas en una tabla",
  teaserText:
    "Rentabilidad bruta y neta, crecimiento, exposición y metros por 250.000, ordenadas desde la mejor zona.",
  mapTitle: "Mapa de rentabilidad neta",
  mapLead: (count) =>
    `Cada uno de los ${count} puntos es una zona. El color indica la rentabilidad neta y la ubicación importa en el alquiler de temporada: cerca de la playa sube la ocupación, tierra adentro suben los metros.`,
  mapLegend: "Rentabilidad neta",
  mapNote:
    "Mapa orientativo: los puntos son coordenadas de la zona, no límites administrativos. Pasa el cursor por un punto para ver precio y rentabilidad.",
  ctaTitle: "¿Quieres estas cifras con tu presupuesto?",
  ctaText:
    "Cada página de municipio incluye calculadora: introduces presupuesto, eliges perfil de alquiler y ves metros, renta tras gastos y retorno a cinco años.",
  ctaButton: "Abrir la calculadora",
  backToReports: "Volver a los informes de precios",
  metaTitle: "Ranking de rentabilidad inmobiliaria Costa Blanca 2026 | 89 zonas",
  metaDescription: (count) =>
    `Ranking de ${count} zonas de Costa Blanca y Costa Cálida por rentabilidad neta: precio por m², rentabilidad bruta y neta, crecimiento, exposición y metros por 250.000.`,
  keywords: [
    "ranking rentabilidad inmobiliaria Costa Blanca",
    "mayor rentabilidad alquiler España",
    "rentabilidad neta por zona Costa Blanca",
    "dónde comprar para alquilar",
  ],
  faqTitle: "Cómo leer este ranking",
  filtersTitle: "Filtrar el ranking",
  filterYield: "Rentabilidad neta mínima",
  filterDays: "Exposición máxima (días)",
  filterSearch: "Buscar zona o municipio",
  filterReset: "Borrar filtros",
  filterAny: "Cualquiera",
  filterResults: (shown, total) => `Mostrando ${shown} de ${total} zonas`,
  filterEmpty: "Ninguna zona cumple estos criterios. Suelta los filtros para ver más.",
  faq: [
    {
      question: "¿Cómo se calcula la rentabilidad neta del ranking?",
      answer:
        "Tomamos la rentabilidad bruta de la base y restamos 1,9 puntos por gestión, impuestos y vacancia. Una zona con 6,6% bruto aparece con 4,7% neto. Es un modelo, no el resultado de un inmueble concreto.",
    },
    {
      question: "¿Por qué algunas zonas de playa rinden menos?",
      answer:
        "El precio por metro sube más rápido que el alquiler. En primera línea pagas la ubicación y el inquilino no paga las vistas en proporción al precio de compra, así que el porcentaje baja aunque la noche se cobre más cara.",
    },
    {
      question: "¿Incluye los impuestos de la compra?",
      answer:
        "No, los impuestos quedan fuera de la rentabilidad. El ITP es del 10% en la Comunitat Valenciana y del 8% en Murcia, y en obra nueva se suma IVA del 10% más AJD. El desglose completo está en la calculadora de cada municipio.",
    },
    {
      question: "¿De dónde salen los datos y cada cuánto cambian?",
      answer:
        "Precios, alquileres, crecimiento y días de exposición vienen de nuestra base de mercado con 21 municipios y 89 zonas. La página se actualiza una vez al día y los valores son estimaciones, no una oferta de inversión.",
    },
  ],
};

export const RANKING_COPY: Record<Locale, RankingCopy> = { pl: PL, en: EN, es: ES };

