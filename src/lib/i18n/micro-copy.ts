import type { Locale } from "./config";

/** Drobne komunikaty UI, których nie ma sensu trzymać w głównych słownikach. */
export const RESPONSE_TIME: Record<Locale, string> = {
  pl: "Odpowiadamy w ciągu 15 minut, poniedziałek-piątek 8:00-20:00",
  en: "We reply within 15 minutes, Monday to Friday 8:00-20:00 CET",
  es: "Respondemos en 15 minutos, de lunes a viernes de 8:00 a 20:00",
};

/** Link „przejdź do treści” (a11y) - musi być w języku strony. */
export const SKIP_TO_CONTENT: Record<Locale, string> = {
  pl: "Przejdź do treści",
  en: "Skip to content",
  es: "Ir al contenido",
};

/** Opis źródła danych (stopka + dane strukturalne). Wcześniej tylko po polsku. */
export const DATA_SOURCE: Record<Locale, string> = {
  pl: "Mediana ofertowa €/m², ROI najmu i dynamika r/r dla Costa Blanca (model wewnętrzny). Produkcja: feed Idealista/Fotocasa + Colegio de Registradores.",
  en: "Median asking €/m², rental yield and year-on-year growth for Costa Blanca (internal model). Production: Idealista/Fotocasa feed plus Colegio de Registradores.",
  es: "Mediana de oferta €/m², rentabilidad del alquiler y variación interanual para Costa Blanca (modelo interno). Producción: feed Idealista/Fotocasa y Colegio de Registradores.",
};
