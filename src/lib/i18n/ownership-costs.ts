import type { FaqItem } from "../content/content-utils";
import type { Locale } from "./config";

/**
 * Roczne koszty utrzymania nieruchomości w Hiszpanii. To druga część odpowiedzi
 * na pytanie „ile naprawdę kosztuje zakup”: cena + koszty transakcyjne to
 * dopiero początek, a inwestor musi odjąć od czynszu IBI, wspólnotę,
 * ubezpieczenie, naprawy i zarządzanie najmem.
 */

export interface OwnershipCostRow {
  label: string;
  value: string;
  note: string;
}

export interface OwnershipCostsCopy {
  eyebrow: string;
  title: string;
  lead: string;
  colItem: string;
  colValue: string;
  colNote: string;
  rows: OwnershipCostRow[];
  totalLabel: string;
  totalValue: string;
  footnote: string;
}

const PL: OwnershipCostsCopy = {
  eyebrow: "Koszty utrzymania",
  title: "Ile kosztuje utrzymanie mieszkania w Hiszpanii?",
  lead:
    "Cena zakupu to nie wszystko. Roczny koszt utrzymania nieruchomości to zwykle 1,5–3% jej wartości. Poniżej pozycje, które trzeba odjąć od czynszu, żeby policzyć realne netto ROI.",
  colItem: "Koszt",
  colValue: "Stawka",
  colNote: "Kiedy i od czego",
  rows: [
    {
      label: "IBI (podatek gminny)",
      value: "0,4–1,1% wartości katastralnej / rok",
      note: "Wartość katastralna jest zwykle niższa od rynkowej; dla mieszkania to często 200–600 € rocznie.",
    },
    {
      label: "Wspólnota (comunidad)",
      value: "30–150 € / miesiąc",
      note: "Basen, winda, ogród, ochrona. Przed zakupem sprawdź uchwały, plan remontów i zaległości.",
    },
    {
      label: "Ubezpieczenie",
      value: "150–500 € / rok",
      note: "Budynki i OC; przy najmie często wymagane rozszerzenie o odpowiedzialność cywilną.",
    },
    {
      label: "Utrzymanie i naprawy",
      value: "0,5–1% wartości / rok",
      note: "Malowanie, klimatyzacja, sprzęt i wymiana mebli między najemcami.",
    },
    {
      label: "Zarządzanie najmem",
      value: "8–12% czynszu + VAT",
      note: "Pośrednik, rezerwacje, meldunki i rozliczenia z gośćmi.",
    },
    {
      label: "Podatek od najmu (nierezydent)",
      value: "19% / 24%",
      note: "Model 210. UE/EOG zwykle 19%, poza UE 24%; szczegóły zależą od rezydencji podatkowej.",
    },
    {
      label: "Media i śmieci",
      value: "wg zużycia",
      note: "Przy najmie długoterminowym płaci najemca; przy krótkoterminowym — właściciel.",
    },
  ],
  totalLabel: "Razem koszty utrzymania (bez kredytu)",
  totalValue: "1,5–3% wartości / rok",
  footnote:
    "Wartości orientacyjne dla mieszkania na Costa Blanca i Costa Cálida. Nie stanowią porady podatkowej; dokładne stawki zależą od gminy, wspólnoty i formy najmu.",
};

const EN: OwnershipCostsCopy = {
  eyebrow: "Running costs",
  title: "What does it cost to own an apartment in Spain?",
  lead:
    "The purchase price is only the start. Annual ownership costs usually run at 1.5–3% of the property value. These are the items to subtract from rent before calculating net yield.",
  colItem: "Cost",
  colValue: "Rate",
  colNote: "When and on what",
  rows: [
    {
      label: "IBI (municipal property tax)",
      value: "0.4–1.1% of cadastral value / year",
      note: "Cadastral value is usually below market value; for an apartment this often means €200–600 a year.",
    },
    {
      label: "Community fees (comunidad)",
      value: "€30–150 / month",
      note: "Pool, lift, garden and security. Check the minutes, planned works and arrears before buying.",
    },
    {
      label: "Insurance",
      value: "€150–500 / year",
      note: "Buildings and liability cover; rentals often require extra public-liability cover.",
    },
    {
      label: "Maintenance and repairs",
      value: "0.5–1% of value / year",
      note: "Painting, air conditioning, appliances and furniture replacement between tenants.",
    },
    {
      label: "Rental management",
      value: "8–12% of rent + VAT",
      note: "Agent, bookings, guest registration and account reconciliation.",
    },
    {
      label: "Non-resident rental tax",
      value: "19% / 24%",
      note: "Model 210. EU/EEA residents usually 19%, non-EU 24%; details depend on tax residency.",
    },
    {
      label: "Utilities and waste collection",
      value: "usage-based",
      note: "Long-term tenants normally pay utilities; short-term owners pay them.",
    },
  ],
  totalLabel: "Total ownership costs (no mortgage)",
  totalValue: "1.5–3% of value / year",
  footnote:
    "Indicative ranges for an apartment on the Costa Blanca and Costa Cálida. Not tax advice; exact rates depend on the municipality, community and rental model.",
};

const ES: OwnershipCostsCopy = {
  eyebrow: "Gastos de mantenimiento",
  title: "¿Cuánto cuesta mantener un piso en España?",
  lead:
    "El precio de compra es solo el principio. Los gastos anuales de propiedad suelen representar entre el 1,5% y el 3% del valor. Estas son las partidas que hay que restar del alquiler para calcular la rentabilidad neta.",
  colItem: "Gasto",
  colValue: "Importe",
  colNote: "Cuándo y sobre qué",
  rows: [
    {
      label: "IBI (impuesto municipal)",
      value: "0,4–1,1% del valor catastral / año",
      note: "El valor catastral suele ser inferior al de mercado; en un piso suele suponer 200–600 € al año.",
    },
    {
      label: "Comunidad de propietarios",
      value: "30–150 € / mes",
      note: "Piscina, ascensor, jardín y seguridad. Revisa actas, obras previstas y deudas antes de comprar.",
    },
    {
      label: "Seguro",
      value: "150–500 € / año",
      note: "Continente y responsabilidad civil; en alquiler suele exigirse ampliación de cobertura.",
    },
    {
      label: "Mantenimiento y reparaciones",
      value: "0,5–1% del valor / año",
      note: "Pintura, aire acondicionado, electrodomésticos y reposición de mobiliario entre inquilinos.",
    },
    {
      label: "Gestión del alquiler",
      value: "8–12% de la renta + IVA",
      note: "Agencia, reservas, registro de huéspedes y liquidación de cuentas.",
    },
    {
      label: "Impuesto sobre la renta de no residentes",
      value: "19% / 24%",
      note: "Modelo 210. UE/EEE normalmente 19%, fuera de la UE 24%; depende de la residencia fiscal.",
    },
    {
      label: "Suministros y basura",
      value: "según consumo",
      note: "En alquiler de larga duración suele pagar el inquilino; en corta estancia, el propietario.",
    },
  ],
  totalLabel: "Total gastos de propiedad (sin hipoteca)",
  totalValue: "1,5–3% del valor / año",
  footnote:
    "Rangos orientativos para un piso en Costa Blanca y Costa Cálida. No constituyen asesoramiento fiscal; las cifras dependen del municipio, la comunidad y el tipo de alquiler.",
};

export const OWNERSHIP_COSTS: Record<Locale, OwnershipCostsCopy> = {
  pl: PL,
  en: EN,
  es: ES,
};

/**
 * FAQ o kosztach utrzymania. Trafia do widocznego akordeonu i do JSON-LD
 * (FAQPage) na hubach usług, więc odpowiedzi muszą być zgodne z tabelą.
 */
export const OWNERSHIP_FAQ: Record<Locale, FaqItem[]> = {
  pl: [
    {
      question: "Jakie są roczne koszty utrzymania mieszkania w Hiszpanii?",
      answer:
        "Zwykle 1,5–3% wartości nieruchomości rocznie. W praktyce: IBI (200–600 €), wspólnota (30–150 € miesięcznie), ubezpieczenie (150–500 €), drobne naprawy i rezerwa remontowa. Przy najmie dochodzi zarządzanie (8–12% czynszu) i podatek od dochodu z najmu.",
    },
    {
      question: "Czy jako nierezydent płacę podatek od najmu w Hiszpanii?",
      answer:
        "Tak. Dochód z najmu rozlicza się modelem 210. Dla rezydentów UE/EOG stawka wynosi zwykle 19%, poza UE 24%, a możliwość odliczenia kosztów zależy od rezydencji podatkowej i rodzaju najmu. To nie jest porada podatkowa — przed zakupem potwierdź szczegóły z hiszpańskim doradcą.",
    },
  ],
  en: [
    {
      question: "What are the annual running costs of an apartment in Spain?",
      answer:
        "Usually 1.5–3% of the property value per year: IBI (€200–600), community fees (€30–150 per month), insurance (€150–500) and maintenance. If you rent it out, add management (8–12% of rent) and non-resident income tax.",
    },
    {
      question: "Do non-residents pay tax on rental income in Spain?",
      answer:
        "Yes. Rental income is filed with Model 210. EU/EEA residents usually pay 19%, non-EU residents 24%, and allowable deductions depend on tax residency and the rental model. This is not tax advice — confirm the details with a Spanish adviser before buying.",
    },
  ],
  es: [
    {
      question: "¿Cuáles son los gastos anuales de mantener un piso en España?",
      answer:
        "Normalmente entre el 1,5% y el 3% del valor al año: IBI (200–600 €), comunidad (30–150 € al mes), seguro (150–500 €) y mantenimiento. Si se alquila, hay que sumar la gestión (8–12% de la renta) y el impuesto sobre la renta de no residentes.",
    },
    {
      question: "¿Un no residente paga impuestos por el alquiler en España?",
      answer:
        "Sí. Los ingresos por alquiler se declaran con el modelo 210. Los residentes en la UE/EEE suelen pagar el 19% y los de fuera de la UE el 24%; las deducciones dependen de la residencia fiscal y del tipo de alquiler. No es asesoramiento fiscal: confirma los detalles con un asesor español antes de comprar.",
    },
  ],
};

