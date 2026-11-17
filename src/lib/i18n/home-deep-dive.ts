import type { FaqItem } from "../content/content-utils";
import type { Locale } from "./config";

/**
 * Treść rozbudowanej strony głównej: koszty zakupu, tabela ROI i FAQ.
 * Liczby w FAQ są wstrzykiwane z danych rynkowych, więc odpowiedzi nie
 * rozjeżdżają się z tabelami na stronie. Ten sam zestaw FAQ trafia do JSON-LD.
 */

export interface BuyingCostRow {
  label: string;
  value: string;
  note: string;
}

export interface HomeDeepDiveVars {
  cities: number;
  median: string;
  avgYield: string;
  maxYield: string;
  growth: string;
  minPrice: string;
}

export interface HomeDeepDiveCopy {
  costsEyebrow: string;
  costsTitle: string;
  costsLead: string;
  costsColItem: string;
  costsColValue: string;
  costsColNote: string;
  costs: BuyingCostRow[];
  costsTotalLabel: string;
  costsTotalValue: string;
  costsFootnote: string;
  roiEyebrow: string;
  roiTitle: string;
  roiLead: (cities: number) => string;
  roiColCity: string;
  roiColPrice: string;
  roiColYield: string;
  roiColGrowth: string;
  roiView: string;
  roiCta: string;
  faqTitle: string;
  faqSubtitle: string;
  faq: (vars: HomeDeepDiveVars) => FaqItem[];
}

const PL: HomeDeepDiveCopy = {
  costsEyebrow: "Koszty zakupu",
  costsTitle: "Ile naprawdę kosztuje zakup nieruchomości w Hiszpanii?",
  costsLead:
    "Do ceny z ogłoszenia dolicz podatki i opłaty transakcyjne. W praktyce kupujący płaci 7–13% więcej niż wynosi cena ofertowa. Poniżej pełna lista kosztów, których nie widać w cenie mieszkania.",
  costsColItem: "Koszt",
  costsColValue: "Stawka",
  costsColNote: "Kiedy i od czego",
  costs: [
    {
      label: "ITP (rynek wtórny)",
      value: "6–10%",
      note: "Podatek transferowy zależny od wspólnoty: Comunidad Valenciana 10%, Murcja 8%, Andaluzja 7%.",
    },
    {
      label: "IVA (nowe budownictwo)",
      value: "10%",
      note: "Płacony zamiast ITP przy zakupie od dewelopera; stawka podstawowa w Hiszpanii.",
    },
    {
      label: "Notariusz",
      value: "0,5–1%",
      note: "Taksa notarialna zależna od ceny aktu i liczby stron.",
    },
    {
      label: "Rejestr gruntów",
      value: "0,3–0,5%",
      note: "Wpis nowego właściciela do Registro de la Propiedad.",
    },
    {
      label: "Abogado i weryfikacja prawna",
      value: "0,5–1%",
      note: "Sprawdzenie księgi wieczystej, obciążeń, licencji i zaległości wspólnoty.",
    },
    {
      label: "Wspólnota i IBI",
      value: "od zakupu",
      note: "Bieżące koszty utrzymania; przed zakupem sprawdzamy zaległości i uchwały wspólnoty.",
    },
  ],
  costsTotalLabel: "Razem koszty transakcyjne",
  costsTotalValue: "7–13%",
  costsFootnote:
    "Szacunek dla zakupu bez kredytu hipotecznego. Przy kredycie dochodzą koszty banku, wyceny i ubezpieczenia. Wartości orientacyjne, nie stanowią porady podatkowej.",
  roiEyebrow: "Dane rynkowe",
  roiTitle: "Ceny i ROI w największych miejscowościach",
  roiLead: (cities) =>
    `Mediany ofertowe i rentowność najmu brutto w ${cities} miejscowościach Costa Blanca i Costa Cálida. Kliknij miasto, aby zobaczyć ceny i ROI w każdej dzielnicy.`,
  roiColCity: "Miejscowość",
  roiColPrice: "Mediana €/m²",
  roiColYield: "ROI brutto",
  roiColGrowth: "Wzrost r/r",
  roiView: "Raport",
  roiCta: "Zobacz pełny ranking ROI 89 dzielnic",
  faqTitle: "Zakup nieruchomości w Hiszpanii, pytania i odpowiedzi",
  faqSubtitle:
    "Najczęstsze pytania inwestorów z Polski: koszty, ROI, NIE i przebieg zakupu. Odpowiedzi opieramy na danych z naszego rynku.",
  faq: (vars) => [
    {
      question: "Ile kosztuje zakup nieruchomości w Hiszpanii poza ceną?",
      answer: `Do ceny dolicz 7–13%: ITP lub IVA (6–10%), notariusza (0,5–1%), rejestr (0,3–0,5%) i abogado (0,5–1%). Przy cenie 200 000 € to 14 000–26 000 € dodatkowych kosztów.`,
    },
    {
      question: "Jakie ROI daje najem na Costa Blanca i Cálida?",
      answer: `Mediana w ${vars.cities} miejscowościach to ${vars.avgYield} brutto, a najlepsze lokalizacje sięgają ${vars.maxYield}. Po odjęciu pustostanów, IBI, wspólnoty i zarządzania realne ROI jest zwykle o 1–2 p.p. niższe.`,
    },
    {
      question: "Czy obcokrajowiec może kupić nieruchomość w Hiszpanii?",
      answer:
        "Tak, bez ograniczeń narodowościowych. Potrzebujesz numeru NIE, konta w hiszpańskim banku i aktu notarialnego. Zakup można przeprowadzić zdalnie na podstawie pełnomocnictwa.",
    },
    {
      question: "Jak wygląda zakup krok po kroku?",
      answer:
        "1) NIE i weryfikacja prawna, 2) umowa rezerwacyjna (zwykle 3 000–10 000 €), 3) due diligence i umowa przedwstępna, 4) akt notarialny i przelew, 5) wpis do rejestru oraz opłaty podatkowe.",
    },
    {
      question: "Czy ceny nieruchomości w Hiszpanii rosną?",
      answer: `W naszym zbiorze ${vars.cities} miejscowości średni wzrost rok do roku to ${vars.growth}, a mediana cen wynosi ${vars.median} €/m². Najtańsze lokalizacje startują od ${vars.minPrice} €/m².`,
    },
    {
      question: "Jak samodzielnie policzyć ROI z najmu?",
      answer:
        "ROI brutto = roczny czynsz / (cena + koszty zakupu). Realnie odejmij 1–2 miesiące pustostanu, IBI, wspólnotę, ubezpieczenie i zarządzanie. Dopiero po tych kosztach otrzymasz ROI netto.",
    },
  ],
};

const EN: HomeDeepDiveCopy = {
  costsEyebrow: "Buying costs",
  costsTitle: "What does buying a property in Spain really cost?",
  costsLead:
    "Add taxes and transaction fees to the asking price. In practice buyers pay 7–13% more than the listing price. Below is the full cost stack that is not visible in the property price.",
  costsColItem: "Cost",
  costsColValue: "Rate",
  costsColNote: "When and on what",
  costs: [
    {
      label: "Transfer tax (resale)",
      value: "6–10%",
      note: "Regional ITP: Comunidad Valenciana 10%, Murcia 8%, Andalusia 7%.",
    },
    {
      label: "VAT (new build)",
      value: "10%",
      note: "Paid instead of ITP when buying from a developer; standard Spanish rate.",
    },
    {
      label: "Notary",
      value: "0.5–1%",
      note: "Notary fee based on the deed value and number of pages.",
    },
    {
      label: "Land registry",
      value: "0.3–0.5%",
      note: "Registration of the new owner in the Registro de la Propiedad.",
    },
    {
      label: "Lawyer and legal check",
      value: "0.5–1%",
      note: "Title deed, charges, licences and unpaid community fees are verified.",
    },
    {
      label: "Community fees and IBI",
      value: "ongoing",
      note: "Running costs; we check arrears and community minutes before you buy.",
    },
  ],
  costsTotalLabel: "Total transaction costs",
  costsTotalValue: "7–13%",
  costsFootnote:
    "Estimate for a cash purchase. With a mortgage, add bank, valuation and insurance costs. Indicative figures, not tax advice.",
  roiEyebrow: "Market data",
  roiTitle: "Prices and yields in the largest towns",
  roiLead: (cities) =>
    `Asking medians and gross rental yields across ${cities} towns on the Costa Blanca and Costa Cálida. Open a town to see prices and yields by area.`,
  roiColCity: "Town",
  roiColPrice: "Median €/m²",
  roiColYield: "Gross yield",
  roiColGrowth: "Growth YoY",
  roiView: "Report",
  roiCta: "See the full ROI ranking of 89 areas",
  faqTitle: "Buying property in Spain: questions and answers",
  faqSubtitle:
    "The questions international investors ask most: costs, yields, NIE and the buying process. Answers use the market data from this site.",
  faq: (vars) => [
    {
      question: "How much does buying a property in Spain cost on top of the price?",
      answer: `Add 7–13%: transfer tax or VAT (6–10%), notary (0.5–1%), land registry (0.3–0.5%) and a lawyer (0.5–1%). On a €200,000 purchase that is €14,000–26,000 in extra costs.`,
    },
    {
      question: "What rental yield can I expect on the Costa Blanca and Cálida?",
      answer: `The median across ${vars.cities} towns is ${vars.avgYield} gross, with the best areas reaching ${vars.maxYield}. After vacancy, IBI, community fees and management, net yields are usually 1–2 pp lower.`,
    },
    {
      question: "Can foreigners buy property in Spain?",
      answer:
        "Yes, with no nationality restrictions. You need an NIE number, a Spanish bank account and a notarial deed. The purchase can be completed remotely with a power of attorney.",
    },
    {
      question: "What does the buying process look like step by step?",
      answer:
        "1) NIE and legal checks, 2) reservation agreement (usually €3,000–10,000), 3) due diligence and private purchase contract, 4) notarial deed and payment, 5) land registry entry and taxes.",
    },
    {
      question: "Are Spanish property prices rising?",
      answer: `Across our ${vars.cities} towns the average year-on-year growth is ${vars.growth}, and the median price is ${vars.median} €/m². The cheapest locations start at ${vars.minPrice} €/m².`,
    },
    {
      question: "How do I calculate rental yield myself?",
      answer:
        "Gross yield = annual rent / (price + buying costs). Then subtract 1–2 months of vacancy, IBI, community fees, insurance and management. Only that gives you the net yield.",
    },
  ],
};


const ES: HomeDeepDiveCopy = {
  costsEyebrow: "Gastos de compra",
  costsTitle: "¿Cuánto cuesta realmente comprar una vivienda en España?",
  costsLead:
    "Al precio de venta hay que sumar impuestos y gastos de transmisión. En la práctica el comprador paga entre un 7% y un 13% más. Aquí tienes todos los gastos que no aparecen en el anuncio.",
  costsColItem: "Gasto",
  costsColValue: "Porcentaje",
  costsColNote: "Cuándo y sobre qué",
  costs: [
    {
      label: "ITP (segunda mano)",
      value: "6–10%",
      note: "Impuesto autonómico: Comunidad Valenciana 10%, Murcia 8%, Andalucía 7%.",
    },
    {
      label: "IVA (obra nueva)",
      value: "10%",
      note: "Se paga en lugar del ITP al comprar al promotor; tipo general en España.",
    },
    {
      label: "Notaría",
      value: "0,5–1%",
      note: "Arancel notarial según el valor de la escritura y el número de folios.",
    },
    {
      label: "Registro de la Propiedad",
      value: "0,3–0,5%",
      note: "Inscripción del nuevo propietario.",
    },
    {
      label: "Abogado y revisión legal",
      value: "0,5–1%",
      note: "Comprobación de cargas, licencias y deudas de la comunidad.",
    },
    {
      label: "Comunidad e IBI",
      value: "desde la compra",
      note: "Gastos corrientes; revisamos recibos pendientes y actas de la comunidad.",
    },
  ],
  costsTotalLabel: "Total gastos de transmisión",
  costsTotalValue: "7–13%",
  costsFootnote:
    "Estimación para compra sin hipoteca. Con hipoteca se añaden gastos bancarios, tasación y seguros. Valores orientativos, no constituyen asesoramiento fiscal.",
  roiEyebrow: "Datos de mercado",
  roiTitle: "Precios y rentabilidad en las principales localidades",
  roiLead: (cities) =>
    `Medianas de oferta y rentabilidad bruta en ${cities} localidades de Costa Blanca y Costa Cálida. Abre una localidad para ver precios y rentabilidad por zona.`,
  roiColCity: "Localidad",
  roiColPrice: "Mediana €/m²",
  roiColYield: "Rentabilidad bruta",
  roiColGrowth: "Crecimiento interanual",
  roiView: "Informe",
  roiCta: "Ver el ranking completo de 89 zonas",
  faqTitle: "Comprar vivienda en España: preguntas y respuestas",
  faqSubtitle:
    "Las dudas más frecuentes de los inversores: gastos, rentabilidad, NIE y proceso de compra. Las respuestas usan los datos de mercado de esta web.",
  faq: (vars) => [
    {
      question: "¿Cuánto cuesta comprar una vivienda en España además del precio?",
      answer: `Suma un 7–13%: ITP o IVA (6–10%), notaría (0,5–1%), registro (0,3–0,5%) y abogado (0,5–1%). En una compra de 200.000 € son 14.000–26.000 € adicionales.`,
    },
    {
      question: "¿Qué rentabilidad puedo esperar en Costa Blanca y Cálida?",
      answer: `La mediana en ${vars.cities} localidades es del ${vars.avgYield} bruto, y las mejores zonas alcanzan el ${vars.maxYield}. Tras vacantes, IBI, comunidad y gestión, la rentabilidad neta suele ser 1–2 puntos menor.`,
    },
    {
      question: "¿Puede un extranjero comprar una vivienda en España?",
      answer:
        "Sí, sin restricciones por nacionalidad. Necesitas NIE, cuenta bancaria española y escritura notarial. La compra puede completarse a distancia con un poder notarial.",
    },
    {
      question: "¿Cómo es el proceso de compra paso a paso?",
      answer:
        "1) NIE y revisión legal, 2) contrato de reserva (normalmente 3.000–10.000 €), 3) due diligence y contrato privado, 4) escritura notarial y pago, 5) inscripción en el registro e impuestos.",
    },
    {
      question: "¿Están subiendo los precios de la vivienda en España?",
      answer: `En nuestras ${vars.cities} localidades el crecimiento medio interanual es del ${vars.growth} y la mediana de precios es ${vars.median} €/m². Las zonas más económicas arrancan en ${vars.minPrice} €/m².`,
    },
    {
      question: "¿Cómo calculo la rentabilidad del alquiler?",
      answer:
        "Rentabilidad bruta = alquiler anual / (precio + gastos de compra). Después resta 1–2 meses de vacante, IBI, comunidad, seguro y gestión. Solo entonces obtienes la rentabilidad neta.",
    },
  ],
};

export const HOME_DEEP_DIVE: Record<Locale, HomeDeepDiveCopy> = { pl: PL, en: EN, es: ES };

export function getHomeDeepDiveCopy(locale: Locale): HomeDeepDiveCopy {
  return HOME_DEEP_DIVE[locale] ?? HOME_DEEP_DIVE.pl;
}

