import type { Locale } from "./config";

/**
 * Teksty narzędzia inwestora (kalkulator + porównywarka dzielnic).
 * Trzymane osobno od copy stron, bo komponent jest wspólny dla PL/EN/ES.
 */
export interface WorkbenchCopy {
  eyebrow: string;
  title: (city: string) => string;
  lead: (city: string) => string;
  budgetLegend: string;
  budgetLabel: string;
  scenarioLegend: string;
  scenarios: { id: "year" | "season"; label: string; hint: string; months: number }[];
  financingLegend: string;
  financing: { id: "cash" | "mortgage"; label: string; hint: string }[];
  ltvLabel: string;
  rateLabel: string;
  yearsLabel: string;
  resultsTitle: string;
  results: {
    area: string;
    purchaseCosts: string;
    rentGross: string;
    rentNet: string;
    yieldNet: string;
    value5: string;
    totalReturn: string;
    mortgage: string;
    cashFlow: string;
    cashOnCash: string;
  };
  tableTitle: string;
  tableHint: string;
  columns: {
    district: string;
    price: string;
    yield: string;
    demand: string;
    days: string;
    area: string;
    rentNet: string;
  };
  bestBadge: string;
  budgetFits: (count: number, total: number) => string;
  shareLabel: string;
  shareCopied: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  disclaimer: string;
  perMonth: string;
  perYear: string;
  months: (value: number) => string;
  emptyBudget: string;
}

const PL: WorkbenchCopy = {
  eyebrow: "Narzędzie inwestora",
  title: (city) => `Policz inwestycję w ${city}`,
  lead: (city) =>
    `Ustaw budżet i profil najmu, a zobaczysz, ile metrów kupisz w ${city}, jaki czynsz zostaje po kosztach i jak wygląda zwrot po pięciu latach. Wszystko na danych z tego raportu.`,
  budgetLegend: "Budżet zakupu",
  budgetLabel: "Kwota (EUR)",
  scenarioLegend: "Profil najmu",
  scenarios: [
    { id: "year", label: "Cały rok", hint: "12 miesięcy, najem długoterminowy", months: 12 },
    { id: "season", label: "Sezon", hint: "8 miesięcy, najem krótkoterminowy", months: 8 },
  ],
  financingLegend: "Finansowanie",
  financing: [
    { id: "cash", label: "Gotówka", hint: "bez kredytu" },
    { id: "mortgage", label: "Kredyt", hint: "hipoteka hiszpańska" },
  ],
  ltvLabel: "Udział kredytu",
  rateLabel: "Oprocentowanie",
  yearsLabel: "Okres",
  resultsTitle: "Wynik kalkulacji",
  results: {
    area: "Metraż za budżet",
    purchaseCosts: "Koszty zakupu (13,5%)",
    rentGross: "Czynsz brutto",
    rentNet: "Czynsz netto",
    yieldNet: "ROI netto",
    value5: "Wartość po 5 latach",
    totalReturn: "Zwrot 5-letni",
    mortgage: "Rata kredytu",
    cashFlow: "Cash flow miesięcznie",
    cashOnCash: "Zwrot z kapitału",
  },
  tableTitle: "Co kupisz w każdej dzielnicy",
  tableHint:
    "Metraż i czynsz netto policzone dla twojego budżetu. Kliknij nagłówek, aby sortować. Zaznaczona dzielnica ma najwyższy zwrot netto.",
  columns: {
    district: "Dzielnica",
    price: "€/m²",
    yield: "ROI brutto",
    demand: "Popyt",
    days: "Ekspozycja",
    area: "Metraż za budżet",
    rentNet: "Czynsz netto / rok",
  },
  bestBadge: "Najwyższy zwrot",
  budgetFits: (count, total) => `${count} z ${total} dzielnic mieści się w budżecie`,
  shareLabel: "Kopiuj link do wyliczenia",
  shareCopied: "Link skopiowany",
  ctaTitle: "Chcesz, żebyśmy sprawdzili konkretne oferty?",
  ctaText:
    "Wyślij budżet i dzielnicę. Przygotujemy krótką listę nieruchomości z policzonym zwrotem, kosztami zakupu i podatkami.",
  ctaButton: "Poproś o oferty",
  disclaimer:
    "Model szacunkowy na medianach z tego raportu. Nie jest wyceną konkretnej nieruchomości ani gwarancją zwrotu.",
  perMonth: "mies.",
  perYear: "rok",
  months: (value) => `${value} mies.`,
  emptyBudget: "Podaj budżet, aby zobaczyć wyliczenie.",
};

const EN: WorkbenchCopy = {
  eyebrow: "Investor tool",
  title: (city) => `Model an investment in ${city}`,
  lead: (city) =>
    `Set a budget and a letting profile to see how many square metres it buys in ${city}, what rent survives costs and what the five-year return looks like. All on the data in this report.`,
  budgetLegend: "Purchase budget",
  budgetLabel: "Amount (EUR)",
  scenarioLegend: "Letting profile",
  scenarios: [
    { id: "year", label: "All year", hint: "12 months, long-term letting", months: 12 },
    { id: "season", label: "Season", hint: "8 months, short-term letting", months: 8 },
  ],
  financingLegend: "Financing",
  financing: [
    { id: "cash", label: "Cash", hint: "no mortgage" },
    { id: "mortgage", label: "Mortgage", hint: "Spanish loan" },
  ],
  ltvLabel: "Loan to value",
  rateLabel: "Interest rate",
  yearsLabel: "Term",
  resultsTitle: "Your numbers",
  results: {
    area: "Floor area for budget",
    purchaseCosts: "Purchase costs (13.5%)",
    rentGross: "Gross rent",
    rentNet: "Net rent",
    yieldNet: "Net yield",
    value5: "Value after 5 years",
    totalReturn: "5-year return",
    mortgage: "Monthly payment",
    cashFlow: "Monthly cash flow",
    cashOnCash: "Return on capital",
  },
  tableTitle: "What your budget buys in each area",
  tableHint:
    "Floor area and net rent are calculated for your budget. Click a header to sort. The marked area has the highest net yield.",
  columns: {
    district: "Area",
    price: "€/m²",
    yield: "Gross yield",
    demand: "Demand",
    days: "Time on market",
    area: "Floor area",
    rentNet: "Net rent / year",
  },
  bestBadge: "Best yield",
  budgetFits: (count, total) => `${count} of ${total} areas fit your budget`,
  shareLabel: "Copy link to these numbers",
  shareCopied: "Link copied",
  ctaTitle: "Want us to check specific listings?",
  ctaText:
    "Send the budget and the area. We will shortlist properties with the return, purchase costs and taxes already modelled.",
  ctaButton: "Request listings",
  disclaimer:
    "An estimate based on the medians in this report. It is not a valuation of a specific property nor a guarantee of return.",
  perMonth: "mo.",
  perYear: "yr",
  months: (value) => `${value} mo.`,
  emptyBudget: "Enter a budget to see the numbers.",
};


const ES: WorkbenchCopy = {
  eyebrow: "Herramienta del inversor",
  title: (city) => `Calcula una inversión en ${city}`,
  lead: (city) =>
    `Fija un presupuesto y un perfil de alquiler para ver cuántos metros compras en ${city}, qué renta queda tras gastos y cómo se ve el retorno a cinco años. Todo con los datos de este informe.`,
  budgetLegend: "Presupuesto de compra",
  budgetLabel: "Importe (EUR)",
  scenarioLegend: "Perfil de alquiler",
  scenarios: [
    { id: "year", label: "Todo el año", hint: "12 meses, alquiler largo", months: 12 },
    { id: "season", label: "Temporada", hint: "8 meses, alquiler corto", months: 8 },
  ],
  financingLegend: "Financiación",
  financing: [
    { id: "cash", label: "Contado", hint: "sin hipoteca" },
    { id: "mortgage", label: "Hipoteca", hint: "préstamo español" },
  ],
  ltvLabel: "Porcentaje financiado",
  rateLabel: "Tipo de interés",
  yearsLabel: "Plazo",
  resultsTitle: "Tus cifras",
  results: {
    area: "Metros por presupuesto",
    purchaseCosts: "Gastos de compra (13,5%)",
    rentGross: "Renta bruta",
    rentNet: "Renta neta",
    yieldNet: "Rentabilidad neta",
    value5: "Valor a 5 años",
    totalReturn: "Retorno a 5 años",
    mortgage: "Cuota mensual",
    cashFlow: "Flujo mensual",
    cashOnCash: "Retorno del capital",
  },
  tableTitle: "Qué compras en cada zona",
  tableHint:
    "Metros y renta neta calculados para tu presupuesto. Pulsa una cabecera para ordenar. La zona marcada tiene la mejor rentabilidad neta.",
  columns: {
    district: "Zona",
    price: "€/m²",
    yield: "Rentabilidad bruta",
    demand: "Demanda",
    days: "Exposición",
    area: "Metros",
    rentNet: "Renta neta / año",
  },
  bestBadge: "Mejor rentabilidad",
  budgetFits: (count, total) => `${count} de ${total} zonas entran en el presupuesto`,
  shareLabel: "Copiar enlace con estas cifras",
  shareCopied: "Enlace copiado",
  ctaTitle: "¿Quieres que revisemos ofertas concretas?",
  ctaText:
    "Envía presupuesto y zona. Prepararemos una lista corta con retorno, gastos de compra e impuestos ya calculados.",
  ctaButton: "Pedir ofertas",
  disclaimer:
    "Estimación sobre las medianas de este informe. No es una valoración de una vivienda concreta ni una garantía de retorno.",
  perMonth: "mes",
  perYear: "año",
  months: (value) => `${value} meses`,
  emptyBudget: "Introduce un presupuesto para ver las cifras.",
};

export const WORKBENCH_COPY: Record<Locale, WorkbenchCopy> = { pl: PL, en: EN, es: ES };

