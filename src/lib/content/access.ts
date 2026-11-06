import type { Locale } from "../i18n/config";

/**
 * ===========================================================================
 * DOSTĘPNOŚĆ KOMUNIKACYJNA MIAST (lotniska, AP-7)
 * ===========================================================================
 * Konkret zamiast ogólników: nazwa lotniska z kodem IATA, szacowany czas jazdy
 * i informacja o autostradzie AP-7 (kręgosłup komunikacyjny Costa Blanca).
 * Czasy są przybliżone, liczone dla centrum miasta poza godzinami szczytu.
 */

interface CityAccess {
  /** Kod IATA lotniska podstawowego. */
  airport: "ALC" | "RMU";
  /** Szacowany czas jazdy z lotniska do centrum (minuty). */
  minutes: number;
  /** Czy miasto ma bezpośredni wjazd na AP-7. */
  ap7: boolean;
}

const ACCESS: Record<string, CityAccess> = {
  alicante: { airport: "ALC", minutes: 20, ap7: true },
  torrevieja: { airport: "ALC", minutes: 40, ap7: true },
  benidorm: { airport: "ALC", minutes: 45, ap7: true },
  calpe: { airport: "ALC", minutes: 60, ap7: true },
  altea: { airport: "ALC", minutes: 55, ap7: true },
  denia: { airport: "ALC", minutes: 75, ap7: true },
  javea: { airport: "ALC", minutes: 80, ap7: true },
  "orihuela-costa": { airport: "ALC", minutes: 45, ap7: true },
  "guardamar-del-segura": { airport: "ALC", minutes: 30, ap7: true },
  "santa-pola": { airport: "ALC", minutes: 20, ap7: true },
  cartagena: { airport: "RMU", minutes: 30, ap7: true },
  "san-pedro-del-pinatar": { airport: "RMU", minutes: 25, ap7: true },
  "los-alcazares": { airport: "RMU", minutes: 20, ap7: true },
  mazarron: { airport: "RMU", minutes: 45, ap7: true },
  aguilas: { airport: "RMU", minutes: 60, ap7: true },
};

const AIRPORTS: Record<CityAccess["airport"], Record<Locale, string>> = {
  ALC: {
    pl: "Alicante-Elche (ALC)",
    en: "Alicante-Elche (ALC)",
    es: "Alicante-Elche (ALC)",
  },
  RMU: {
    pl: "Murcia-Corvera (RMU)",
    en: "Murcia-Corvera (RMU)",
    es: "Murcia-Corvera (RMU)",
  },
};

const COPY: Record<Locale, (airport: string, minutes: number, ap7: boolean) => string[]> = {
  pl: (airport, minutes, ap7) => [
    `Lotnisko ${airport} jest oddalone o około ${minutes} min jazdy autem, więc przylot i odbiór kluczy da się zaplanować w jeden dzień.`,
    ap7
      ? "Miasto ma bezpośredni dostęp do autostrady AP-7, co skraca dojazd do Alicante, Walencji i Murcji oraz ułatwia obsługę najmu."
      : "Dojazd odbywa się drogami krajowymi N-332 i N-340.",
  ],
  en: (airport, minutes, ap7) => [
    `The ${airport} airport is about ${minutes} minutes away by car, so arrival and key handover can be arranged in a single day.`,
    ap7
      ? "The town has direct access to the AP-7 motorway, which shortens journeys to Alicante, Valencia and Murcia and simplifies rental management."
      : "Access is via the N-332 and N-340 national roads.",
  ],
  es: (airport, minutes, ap7) => [
    `El aeropuerto ${airport} está a unos ${minutes} minutos en coche, de modo que la llegada y la entrega de llaves se resuelven en un día.`,
    ap7
      ? "La localidad tiene acceso directo a la autopista AP-7, lo que acorta los trayectos a Alicante, Valencia y Murcia y facilita la gestión del alquiler."
      : "El acceso se realiza por las carreteras nacionales N-332 y N-340.",
  ],
};

const HEADING: Record<Locale, string> = {
  pl: "Dojazd i lotniska",
  en: "Access and airports",
  es: "Accesos y aeropuertos",
};

/** Zwraca nagłówek i akapity bloku infrastrukturalnego dla miasta. */
export function cityAccessBlock(
  citySlug: string,
  locale: Locale,
): { heading: string; paragraphs: string[] } | null {
  const access = ACCESS[citySlug];
  if (!access) return null;

  const airport = AIRPORTS[access.airport][locale];
  return {
    heading: HEADING[locale],
    paragraphs: COPY[locale](airport, access.minutes, access.ap7),
  };
}
