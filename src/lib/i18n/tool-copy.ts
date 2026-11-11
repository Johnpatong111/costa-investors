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


export interface CostsCopy {
  eyebrow: string;
  title: (city: string) => string;
  lead: (authority: string, itp: number) => string;
  priceLabel: string;
  dealLegend: string;
  deals: { id: "resale" | "new"; label: string; hint: string }[];
  propertyLegend: string;
  properties: { id: "flat" | "villa"; label: string; hint: string }[];
  residencyLegend: string;
  residency: { id: "nonEu" | "eu" | "resident"; label: string; hint: string }[];
  breakdownTitle: string;
  rows: {
    price: string;
    itp: string;
    iva: string;
    ajd: string;
    notary: string;
    legal: string;
    total: string;
    totalPercent: string;
  };
  annualTitle: string;
  annual: {
    ibi: string;
    community: string;
    insurance: string;
    total: string;
  };
  rentTitle: string;
  rent: {
    gross: string;
    tax: string;
    net: string;
    yield: string;
  };
  note: string;
  noteItp: (authority: string, rate: number) => string;
  perMonth: string;
  cta: string;
}

const COSTS_PL: CostsCopy = {
  eyebrow: "Koszty i podatki",
    title: (city) => `Ile naprawdę kosztuje zakup w ${city}`,
    lead: (authority, itp) =>
      `Cena z ogłoszenia to nie cały koszt. Poniżej rozbicie na podatki (ITP ${itp}% w ${authority}), opłaty notarialne i prawne, koszty roczne oraz podatek od najmu.`,
    priceLabel: "Cena nieruchomości (EUR)",
    dealLegend: "Rynek",
    deals: [
      { id: "resale", label: "Rynek wtórny", hint: "podatek ITP" },
      { id: "new", label: "Nowe budownictwo", hint: "IVA + AJD" },
    ],
    propertyLegend: "Typ nieruchomości",
    properties: [
      { id: "flat", label: "Mieszkanie", hint: "wspólnota z windą i basenem" },
      { id: "villa", label: "Willa lub dom", hint: "działka, mniejsza wspólnota" },
    ],
    residencyLegend: "Status podatkowy najemcy",
    residency: [
      { id: "nonEu", label: "Nierezydent UE", hint: "19% od czynszu brutto" },
      { id: "eu", label: "Nierezydent poza UE", hint: "24% od czynszu brutto" },
      { id: "resident", label: "Rezydent Hiszpanii", hint: "19% od dochodu netto" },
    ],
    breakdownTitle: "Koszty transakcyjne",
    rows: {
      price: "Cena",
      itp: "ITP",
      iva: "IVA",
      ajd: "AJD",
      notary: "Notariusz i rejestr",
      legal: "Obsługa prawna",
      total: "Razem do zapłaty",
      totalPercent: "Koszty jako % ceny",
    },
    annualTitle: "Koszty roczne",
    annual: {
      ibi: "IBI (podatek gminny, szacunek)",
      community: "Comunidad (wspólnota)",
      insurance: "Ubezpieczenie",
      total: "Razem rocznie",
    },
    rentTitle: "Podatek od najmu",
    rent: {
      gross: "Czynsz brutto rocznie",
      tax: "Podatek",
      net: "Czynsz po podatku",
      yield: "Zwrot netto po podatku",
    },
    note:
      "Wartości szacunkowe na 2026: notariusz, rejestr i obsługa prawna łącznie około 1,5% ceny. Nie uwzględniają ulg regionalnych ani podatku od wzrostu wartości gruntu przy sprzedaży.",
    noteItp: (authority, rate) => `Stawka ITP w ${authority}: ${rate}% dla rynku wtórnego.`,
  perMonth: "mies.",
    cta: "Sprawdź koszty dla konkretnej nieruchomości",
};

const COSTS_EN: CostsCopy = {
  eyebrow: "Costs and taxes",
  title: (city) => `What buying in ${city} really costs`,
  lead: (authority, itp) =>
    `The asking price is not the whole bill. Below: taxes (ITP ${itp}% in ${authority}), notary and legal fees, annual running costs and tax on the rent.`,
  priceLabel: "Property price (EUR)",
  dealLegend: "Market",
  deals: [
    { id: "resale", label: "Resale", hint: "transfer tax" },
    { id: "new", label: "New build", hint: "VAT plus AJD" },
  ],
  propertyLegend: "Property type",
  properties: [
    { id: "flat", label: "Flat", hint: "community with lift and pool" },
    { id: "villa", label: "Villa or house", hint: "plot, smaller community" },
  ],
  residencyLegend: "Landlord tax status",
  residency: [
    { id: "nonEu", label: "EU non-resident", hint: "19% of gross rent" },
    { id: "eu", label: "Non-EU non-resident", hint: "24% of gross rent" },
    { id: "resident", label: "Spanish resident", hint: "19% of net income" },
  ],
  breakdownTitle: "Transaction costs",
  rows: {
    price: "Price",
    itp: "Transfer tax",
    iva: "VAT",
    ajd: "AJD duty",
    notary: "Notary and registry",
    legal: "Legal support",
    total: "Total to pay",
    totalPercent: "Costs as % of price",
  },
  annualTitle: "Annual running costs",
  annual: {
    ibi: "IBI (council tax, estimate)",
    community: "Community fees",
    insurance: "Insurance",
    total: "Total per year",
  },
  rentTitle: "Tax on the rent",
  rent: {
    gross: "Gross rent per year",
    tax: "Tax",
    net: "Rent after tax",
    yield: "Net yield after tax",
  },
  note:
    "2026 estimates: notary, registry and legal support together about 1.5% of the price. Regional reliefs and the municipal capital gains tax on sale are not included.",
  noteItp: (authority, rate) => `ITP in ${authority}: ${rate}% on resale.`,
  perMonth: "mo.",
  cta: "Check the costs for a specific property",
};

const COSTS_ES: CostsCopy = {
  eyebrow: "Gastos e impuestos",
  title: (city) => `Cuánto cuesta de verdad comprar en ${city}`,
  lead: (authority, itp) =>
    `El precio del anuncio no es la factura completa. Abajo: impuestos (ITP ${itp}% en ${authority}), notaría y abogado, gastos anuales e impuesto sobre el alquiler.`,
  priceLabel: "Precio de la vivienda (EUR)",
  dealLegend: "Mercado",
  deals: [
    { id: "resale", label: "Segunda mano", hint: "impuesto de transmisiones" },
    { id: "new", label: "Obra nueva", hint: "IVA más AJD" },
  ],
  propertyLegend: "Tipo de vivienda",
  properties: [
    { id: "flat", label: "Piso", hint: "comunidad con ascensor y piscina" },
    { id: "villa", label: "Chalet o casa", hint: "parcela, comunidad menor" },
  ],
  residencyLegend: "Fiscalidad del propietario",
  residency: [
    { id: "nonEu", label: "No residente UE", hint: "19% del alquiler bruto" },
    { id: "eu", label: "No residente fuera de la UE", hint: "24% del alquiler bruto" },
    { id: "resident", label: "Residente en España", hint: "19% del ingreso neto" },
  ],
  breakdownTitle: "Gastos de la compra",
  rows: {
    price: "Precio",
    itp: "ITP",
    iva: "IVA",
    ajd: "AJD",
    notary: "Notaría y registro",
    legal: "Asesoría legal",
    total: "Total a pagar",
    totalPercent: "Gastos sobre el precio",
  },
  annualTitle: "Gastos anuales",
  annual: {
    ibi: "IBI (impuesto municipal, estimación)",
    community: "Comunidad",
    insurance: "Seguro",
    total: "Total anual",
  },
  rentTitle: "Impuesto sobre el alquiler",
  rent: {
    gross: "Alquiler bruto anual",
    tax: "Impuesto",
    net: "Alquiler tras impuesto",
    yield: "Rentabilidad neta tras impuesto",
  },
  note:
    "Estimaciones 2026: notaría, registro y asesoría suman alrededor del 1,5% del precio. No incluyen bonificaciones autonómicas ni la plusvalía municipal en la venta.",
  noteItp: (authority, rate) => `ITP en ${authority}: ${rate}% en segunda mano.`,
  perMonth: "mes",
  cta: "Consultar gastos de una vivienda concreta",
};

export const COSTS_COPY: Record<Locale, CostsCopy> = {
  pl: COSTS_PL,
  en: COSTS_EN,
  es: COSTS_ES,
};



export interface ChecklistCopy {
  eyebrow: string;
  title: (city: string) => string;
  lead: string;
  progress: (done: number, total: number) => string;
  groups: { id: "before" | "checks" | "closing"; label: string }[];
  items: { id: string; label: string; hint: string; group: "before" | "checks" | "closing" }[];
  reset: string;
  saved: string;
  cta: string;
  note: string;
}

const CHECKLIST_PL: ChecklistCopy = {
  eyebrow: "Lista kontrolna",
  title: (city) => `Zakup w ${city} krok po kroku: 12 punktów`,
  lead: "Odhaczaj to, co już masz. Postęp zapisuje się w tej przeglądarce, więc możesz wrócić do listy po rozmowie z prawnikiem albo bankiem.",
  progress: (done, total) => `${done} z ${total} gotowe`,
  groups: [
    { id: "before", label: "Przed szukaniem ofert" },
    { id: "checks", label: "Sprawdzenie nieruchomości" },
    { id: "closing", label: "Zamknięcie transakcji" },
  ],
  items: [
    { id: "budget", group: "before", label: "Budżet z kosztami zakupu", hint: "dolicz 10-13,5% na podatek i opłaty" },
    { id: "nie", group: "before", label: "Numer NIE", hint: "potrzebny w banku, u notariusza i w rejestrze" },
    { id: "bank", group: "before", label: "Konto w hiszpańskim banku", hint: "przelew na akt i opłaty cykliczne" },
    { id: "area", group: "before", label: "Wybór dzielnicy i metrażu", hint: "cena za metr, zwrot, czas ekspozycji" },
    { id: "registry", group: "checks", label: "Nota simple z rejestru", hint: "właściciel, powierzchnia, obciążenia" },
    { id: "charges", group: "checks", label: "Obciążenia i zadłużenia", hint: "hipoteka, embargo, zaległości w comunidad" },
    { id: "energy", group: "checks", label: "Certyfikat energetyczny", hint: "obowiązkowy przy sprzedaży" },
    { id: "habitability", group: "checks", label: "Cédula de habitabilidad", hint: "wymagana w regionie Valenciana" },
    { id: "arras", group: "closing", label: "Umowa arras i zadatek", hint: "zwykle 10% ceny, terminy w umowie" },
    { id: "notary", group: "closing", label: "Notariusz i akt własności", hint: "sprawdź treść aktu przed podpisaniem" },
    { id: "tax", group: "closing", label: "Podatek ITP lub IVA+AJD", hint: "30 dni na zapłatę, potem rejestr" },
    { id: "running", group: "closing", label: "IBI, comunidad, ubezpieczenie", hint: "zmiana danych i przeniesienie opłat" },
  ],
  reset: "Wyczyść listę",
  saved: "Zapisano w tej przeglądarce",
  cta: "Poproś o pomoc w zakupie",
  note: "Lista jest pomocnicza. Kolejność i dokumenty różnią się przy nowym budownictwie oraz przy zakupie na kredyt.",
};


const CHECKLIST_EN: ChecklistCopy = {
  eyebrow: "Checklist",
  title: (city) => `Buying in ${city}, step by step: 12 checkpoints`,
  lead: "Tick off what you already have. Progress is stored in this browser, so you can come back after talking to a lawyer or a bank.",
  progress: (done, total) => `${done} of ${total} done`,
  groups: [
    { id: "before", label: "Before you shortlist" },
    { id: "checks", label: "Property checks" },
    { id: "closing", label: "Closing the deal" },
  ],
  items: [
    { id: "budget", group: "before", label: "Budget including purchase costs", hint: "add 10 to 13.5% for tax and fees" },
    { id: "nie", group: "before", label: "NIE number", hint: "needed at the bank, the notary and the registry" },
    { id: "bank", group: "before", label: "Spanish bank account", hint: "for the deed transfer and direct debits" },
    { id: "area", group: "before", label: "District and floor area chosen", hint: "price per m², yield, time on market" },
    { id: "registry", group: "checks", label: "Nota simple from the registry", hint: "owner, size, charges" },
    { id: "charges", group: "checks", label: "Charges and debts", hint: "mortgage, embargo, unpaid community fees" },
    { id: "energy", group: "checks", label: "Energy certificate", hint: "mandatory on sale" },
    { id: "habitability", group: "checks", label: "Cédula de habitabilidad", hint: "required in the Valencia region" },
    { id: "arras", group: "closing", label: "Arras contract and deposit", hint: "usually 10% of the price, dates in writing" },
    { id: "notary", group: "closing", label: "Notary and title deed", hint: "read the deed before you sign" },
    { id: "tax", group: "closing", label: "Transfer tax or VAT plus AJD", hint: "30 days to pay, then the registry" },
    { id: "running", group: "closing", label: "IBI, community, insurance", hint: "transfer the accounts and direct debits" },
  ],
  reset: "Clear the list",
  saved: "Saved in this browser",
  cta: "Ask for help with the purchase",
  note: "For guidance only. Order and documents differ for new builds and for financed purchases.",
};


const CHECKLIST_ES: ChecklistCopy = {
  eyebrow: "Lista de control",
  title: (city) => `Comprar en ${city}, paso a paso: 12 puntos`,
  lead: "Marca lo que ya tienes. El progreso se guarda en este navegador, así puedes volver a la lista después de hablar con un abogado o un banco.",
  progress: (done, total) => `${done} de ${total} hechos`,
  groups: [
    { id: "before", label: "Antes de buscar ofertas" },
    { id: "checks", label: "Comprobaciones de la vivienda" },
    { id: "closing", label: "Cierre de la compra" },
  ],
  items: [
    { id: "budget", group: "before", label: "Presupuesto con gastos de compra", hint: "suma entre 10 y 13,5% de impuestos y gastos" },
    { id: "nie", group: "before", label: "Número NIE", hint: "lo piden el banco, la notaría y el registro" },
    { id: "bank", group: "before", label: "Cuenta bancaria española", hint: "para la transferencia de la escritura y los recibos" },
    { id: "area", group: "before", label: "Zona y metros decididos", hint: "precio por m², rentabilidad, exposición" },
    { id: "registry", group: "checks", label: "Nota simple del registro", hint: "titular, superficie y cargas" },
    { id: "charges", group: "checks", label: "Cargas y deudas", hint: "hipoteca, embargo, recibos de comunidad pendientes" },
    { id: "energy", group: "checks", label: "Certificado energético", hint: "obligatorio para vender" },
    { id: "habitability", group: "checks", label: "Cédula de habitabilidad", hint: "exigida en la Comunitat Valenciana" },
    { id: "arras", group: "closing", label: "Contrato de arras y señal", hint: "habitualmente 10% del precio, fechas por escrito" },
    { id: "notary", group: "closing", label: "Notaría y escritura", hint: "lee la escritura antes de firmar" },
    { id: "tax", group: "closing", label: "ITP o IVA más AJD", hint: "30 días para pagar y luego el registro" },
    { id: "running", group: "closing", label: "IBI, comunidad, seguro", hint: "cambia los titulares y los recibos" },
  ],
  reset: "Borrar la lista",
  saved: "Guardado en este navegador",
  cta: "Pedir ayuda con la compra",
  note: "Solo orientativa. El orden y los documentos cambian en obra nueva y en compras con hipoteca.",
};

export const CHECKLIST_COPY: Record<Locale, ChecklistCopy> = {
  pl: CHECKLIST_PL,
  en: CHECKLIST_EN,
  es: CHECKLIST_ES,
};

