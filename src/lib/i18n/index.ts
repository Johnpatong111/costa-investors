import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";
import { pl } from "./dictionaries/pl";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import type { Dictionary } from "./types";

export const DICTIONARIES: Record<Locale, Dictionary> = { pl, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };
export * from "./types";
