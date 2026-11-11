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
};

export const RANKING_COPY: Record<Locale, RankingCopy> = { pl: PL, en: EN, es: ES };

