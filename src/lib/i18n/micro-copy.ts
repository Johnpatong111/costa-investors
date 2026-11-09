import type { Locale } from "./config";

/** Drobne komunikaty UI, których nie ma sensu trzymać w głównych słownikach. */
export const RESPONSE_TIME: Record<Locale, string> = {
  pl: "Odpowiadamy w ciągu 15 minut, poniedziałek–piątek 8:00–20:00",
  en: "We reply within 15 minutes, Monday to Friday 8:00–20:00 CET",
  es: "Respondemos en 15 minutos, de lunes a viernes de 8:00 a 20:00",
};

/** Link „przejdź do treści” (a11y) — musi być w języku strony. */
export const SKIP_TO_CONTENT: Record<Locale, string> = {
  pl: "Przejdź do treści",
  en: "Skip to content",
  es: "Ir al contenido",
};
