import { z } from "zod";

/**
 * ===========================================================================
 * KONTRAKT LEADOWY - POLACY KUPUJĄCY W HISZPANII
 * ===========================================================================
 * `leadFormSchema`. Wartości z formularza (stringi, UX-friendly),
 * `leadPayloadSchema`. Wartości po walidacji serwera (liczby, E.164).
 *
 * Lead jest wyceniany scoringiem: budżet ≥300 tys. € + zakup w 1-3 miesiące
 * = 95/100 → natychmiastowa notyfikacja agenta (SMS/WhatsApp).
 */

/* ------------------------------- słowniki ------------------------------- */

export const GOALS = [
  { value: "inwestycja-najem", label: "Inwestycja pod najem", description: "Liczy się ROI" },
  { value: "dom-wakacyjny", label: "Dom wakacyjny", description: "Własne miejsce na urlop" },
  { value: "przeprowadzka", label: "Przeprowadzka", description: "Osiedlenie na stałe" },
] as const;

export const PROPERTY_TYPES = [
  { value: "apartament", label: "Apartament", description: "Mieszkanie w budynku" },
  { value: "villa", label: "Villa", description: "Dom z basenem" },
  { value: "bungalow", label: "Bungalow", description: "Parter lub segment" },
  { value: "penthouse", label: "Penthouse", description: "Ostatnie piętro z tarasem" },
] as const;

export const HORIZONS = [
  { value: "1-3-miesiace", label: "Kupuję w 1-3 mies.", description: "Gotowy do transakcji" },
  { value: "3-6-miesiecy", label: "W ciągu 3-6 mies.", description: "Aktywnie szukam" },
  { value: "powyzej-6-miesiecy", label: "Powyżej 6 mies.", description: "Planuję spokojnie" },
  { value: "tylko-badamy", label: "Tylko badam rynek", description: "Zbieram informacje" },
] as const;

export const CONTACT_METHODS = [
  { value: "telefon", label: "Telefon", description: "Dzwonię w 30 minut" },
  { value: "whatsapp", label: "WhatsApp", description: "Wygodne za granicą" },
  { value: "email", label: "E-mail", description: "Oferty i analizy PDF" },
] as const;

/**
 * Region inwestycji. Pierwszy filtr geograficzny jeszcze przed miastem.
 * „Szukam doradztwa" zdejmuje presję wyboru i ratuje leady niezdecydowane.
 */
export const REGIONS = [
  {
    value: "costa-blanca-poludnie",
    label: "Costa Blanca Południe",
    description: "Torrevieja, Orihuela Costa",
  },
  {
    value: "costa-blanca-polnoc",
    label: "Costa Blanca Północ",
    description: "Alicante, Calpe, Jávea",
  },
  { value: "costa-calida", label: "Costa Cálida", description: "Murcia, Mazarrón, Águilas" },
  { value: "doradztwo", label: "Szukam doradztwa", description: "Pomóżcie wybrać region" },
] as const;

/** Opcjonalne tagi wymogów. Podnoszą jakość dopasowania ofert. */
export const REQUIREMENTS = [
  { value: "blisko-plazy", label: "Blisko plaży" },
  { value: "widok-na-morze", label: "Widok na morze" },
  { value: "licencja-turystyczna", label: "Licencja turystyczna" },
  { value: "rynek-pierwotny", label: "Rynek pierwotny" },
] as const;

const values = <T extends readonly { value: string }[]>(items: T) =>
  items.map((item) => item.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const goalEnum = z.enum(values(GOALS));
export const propertyTypeEnum = z.enum(values(PROPERTY_TYPES));
export const horizonEnum = z.enum(values(HORIZONS));
export const contactMethodEnum = z.enum(values(CONTACT_METHODS));
export const regionEnum = z.enum(values(REGIONS));
export const requirementEnum = z.enum(values(REQUIREMENTS));

/**
 * Język, w którym użytkownik przeglądał stronę (i chce rozmawiać).
 * Używany do routingu leada do agenta mówiącego tym językiem.
 */
export const languageEnum = z.enum(["pl", "en", "es"]);
export type LeadLanguage = z.infer<typeof languageEnum>;

/* --------------------------- walidacja telefonu -------------------------- */

/** Akceptuje PL (9 cyfr) i UE (8-15 cyfr, opcjonalnie +CC). */
export function normalizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function isValidPhone(raw: string): boolean {
  const digits = normalizePhoneDigits(raw);
  if (digits.startsWith("0048")) return /^[1-9]\d{8}$/.test(digits.slice(4));
  if (digits.length === 9) return /^[1-9]\d{8}$/.test(digits);
  return digits.length >= 8 && digits.length <= 15;
}

/** 600123456 -> "600 123 456"; +34… pozostaje bez zmian. */
export function formatPhone(raw: string): string {
  const digits = normalizePhoneDigits(raw);
  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  return raw;
}

/* ---------------------------- schemat klienta ---------------------------- */

const phonePattern = /^[+0-9][0-9\s()-]{7,19}$/;
/** Budżet w EUR zapisany ze spacjami: "250 000". */
const budgetPattern = /^\d{1,3}(\s?\d{3}){0,2}$/;

export const leadFormSchema = z.object({
  fullName: z.string().trim().min(2, "Podaj imię").max(80, "Maksymalnie 80 znaków"),
  phone: z
    .string()
    .trim()
    .min(8, "Numer jest za krótki")
    .max(20, "Numer jest za długi")
    .regex(phonePattern, "Dozwolone są cyfry, spacje, myślniki i +")
    .refine(isValidPhone, "Podaj numer PL (9 cyfr) lub międzynarodowy z +"),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      message: "Podaj poprawny adres e-mail",
    }),
  goal: goalEnum,
  propertyType: propertyTypeEnum,
  horizon: horizonEnum,
  contactMethod: contactMethodEnum,
  /** Multi-select regionów. Opcjonalny, ale podnosi jakość dopasowania ofert. */
  regions: z.array(regionEnum).max(REGIONS.length),
  /** Opcjonalne tagi wymogów (checkboxy). */
  requirements: z.array(requirementEnum).max(REQUIREMENTS.length),
  city: z.string().trim().min(2, "Podaj miejscowość").max(80),
  district: z.string().trim().max(80),
  budget: z
    .string()
    .trim()
    .min(5, "Podaj budżet w EUR")
    .refine((value) => budgetPattern.test(value), "Podaj kwotę, np. 250 000"),
  message: z.string().trim().max(1000, "Maksymalnie 1000 znaków"),
  consent: z
    .boolean()
    .refine((value) => value === true, { message: "Zgoda jest wymagana" }),
  marketingConsent: z.boolean(),
  /** Honeypot. Musi pozostać puste. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const defaultLeadValues: LeadFormValues = {
  fullName: "",
  phone: "",
  email: "",
  goal: "inwestycja-najem",
  propertyType: "apartament",
  horizon: "1-3-miesiace",
  contactMethod: "telefon",
  regions: [],
  requirements: [],
  city: "",
  district: "",
  budget: "",
  message: "",
  consent: false,
  marketingConsent: false,
  website: "",
};

/* --------------------------- schemat serwera ---------------------------- */

/** "250 000" | "250000" | 250000 → 250000. */
const numeric = (min: number, max: number, message?: string) =>
  z.preprocess(
    (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const normalized = value.trim().replace(/\s|€/g, "").replace(",", ".");
        if (normalized === "") return undefined;
        return Number(normalized);
      }
      return undefined;
    },
    message
      ? z.number().finite().min(min, message).max(max, message)
      : z.number().finite().min(min).max(max),
  );

export const leadPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Nieprawidłowy numer telefonu")
    .refine(isValidPhone, "Numer musi mieć 8-15 cyfr (PL lub z prefiksem +)")
    .transform((value) => {
      const digits = normalizePhoneDigits(value);
      if (digits.length === 9 && /^[1-9]\d{8}$/.test(digits)) return `+48${digits}`;
      return digits.startsWith("0048") ? `+48${digits.slice(4)}` : `+${digits}`;
    }),
  email: z
    .union([z.email(), z.literal("")])
    .optional()
    .transform((value) => (value ? value.toLowerCase() : undefined)),
  goal: goalEnum,
  propertyType: propertyTypeEnum,
  horizon: horizonEnum,
  contactMethod: contactMethodEnum,
  /** Multi-select regionów (opcjonalny). Zawęża bazę ofert przed kontaktem. */
  regions: z.array(regionEnum).max(REGIONS.length).default([]),
  /** Opcjonalne tagi wymogów z KROKU 1. */
  requirements: z.array(requirementEnum).max(REQUIREMENTS.length).default([]),
  city: z.string().trim().min(2, "Podaj miejscowość").max(80),
  district: z.string().trim().max(80).optional(),
  budget: numeric(10_000, 20_000_000, "Budżet w EUR: 10 tys.: 20 mln"),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true),
  marketingConsent: z.boolean().default(false),
  /** Klucz strony pSEO, np. "apartamenty-na-sprzedaz/torrevieja/la-mata". */
  source: z.string().trim().max(120).optional(),
  pageUrl: z.string().trim().max(300).optional(),
  /** Język wersji strony, z której przyszedł lead. */
  language: languageEnum.default("pl"),
  /** Prognozowany roczny dochód z najmu (€) z kalkulatora ROI. */
  roiEstimate: numeric(0, 5_000_000).optional(),
  /** Honeypot: boty wypełniają ukryte pole. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export interface LeadRecord extends LeadPayload {
  id: string;
  receivedAt: string;
  /** Hash IP (RODO: nie przechowujemy surowego IP). */
  ipHash: string;
  userAgent: string;
  referer: string;
  /** Ocena jakości 0-100. Kolejność w kolejce telefonicznej agenta. */
  score: number;
  /** Preferowany kanał: WhatsApp wymaga innego SLA niż e-mail. */
  whatsapp: boolean;
}

/**
 * Scoring leada. Reguły biznesowe, tłumaczalne dla handlowca.
 *
 * Kalibracja: budżet ≥300 tys. € + zakup w 1-3 miesiące + cel inwestycyjny
 * + kontakt telefoniczny/WhatsApp = 95/100 → natychmiastowa notyfikacja.
 */
export function scoreLead(payload: LeadPayload): number {
  let score = 35;

  if (payload.budget >= 300_000) score += 30;
  else if (payload.budget >= 150_000) score += 15;

  if (payload.horizon === "1-3-miesiace") score += 20;
  else if (payload.horizon === "3-6-miesiecy") score += 12;
  else if (payload.horizon === "powyzej-6-miesiecy") score += 4;
  else score -= 15;

  // Konkretne wymagania (widok, plaża, licencja) = dojrzalszy lead.
  if (payload.requirements.length >= 2) score += 3;

  if (payload.goal === "inwestycja-najem") score += 5;
  if (payload.contactMethod === "whatsapp" || payload.contactMethod === "telefon") score += 5;

  if (payload.email) score += 2;
  if (payload.message && payload.message.length > 40) score += 3;

  return Math.max(0, Math.min(100, score));
}

/** WhatsApp wymaga innego SLA (agent dostaje powiadomienie, nie e-mail). */
export function isWhatsApp(payload: LeadPayload): boolean {
  return payload.contactMethod === "whatsapp";
}

