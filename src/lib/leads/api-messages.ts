import type { LeadLanguage } from "./schema";

/**
 * Komunikaty API zgłoszeń w języku użytkownika.
 *
 * Wcześniej `/api/leads` zwracał wyłącznie polskie błędy („Zbyt wiele
 * zgłoszeń…", „Formularz zawiera błędy"), więc użytkownik wersji /en/ i /es/
 * widział polski komunikat pod formularzem. Język ustalamy z `Accept-Language`
 * (błędy walidacji) oraz z pola `language` leada (gdy payload jest poprawny).
 */

export interface ApiMessages {
  tooLarge: string;
  rateLimited: string;
  invalidJson: string;
  invalidForm: string;
}

export const API_MESSAGES: Record<LeadLanguage, ApiMessages> = {
  pl: {
    tooLarge: "Payload zbyt duży",
    rateLimited: "Zbyt wiele zgłoszeń. Spróbuj ponownie później.",
    invalidJson: "Nieprawidłowy JSON",
    invalidForm: "Formularz zawiera błędy",
  },
  en: {
    tooLarge: "Payload too large",
    rateLimited: "Too many submissions. Please try again in a few minutes.",
    invalidJson: "Invalid JSON",
    invalidForm: "The form contains errors",
  },
  es: {
    tooLarge: "Carga demasiado grande",
    rateLimited: "Demasiados envíos. Inténtalo de nuevo más tarde.",
    invalidJson: "JSON no válido",
    invalidForm: "El formulario contiene errores",
  },
};

/** Język odpowiedzi z nagłówka `Accept-Language` (fallback: polski). */
export function resolveApiLanguage(request: Request): LeadLanguage {
  const header = (request.headers.get("accept-language") ?? "").toLowerCase();
  if (header.startsWith("es")) return "es";
  if (header.startsWith("en")) return "en";
  return "pl";
}
