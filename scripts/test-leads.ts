/* eslint-disable no-console */
/**
 * ===========================================================================
 * TESTY FORMULARZA LEADOWEGO
 * ===========================================================================
 * Formularz to jedyne miejsce, w którym użytkownik zostawia kontakt. Zły regex
 * albo wymagane pole, którego nikt nie widzi, kosztuje leada. Testujemy więc
 * kontrakt: co przechodzi, co jest odrzucane i jak numer trafia do agenta.
 */

import {
  formatPhone,
  isWhatsApp,
  isValidPhone,
  leadFormSchema,
  leadPayloadSchema,
  normalizePhoneDigits,
  scoreLead,
} from "../src/lib/leads/schema";

let passed = 0;
const failures: string[] = [];

function ok(name: string, condition: boolean, detail = ""): void {
  if (condition) passed += 1;
  else failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

const validForm = {
  fullName: "Jan Kowalski",
  phone: "600 123 456",
  email: "",
  goal: "inwestycja-najem" as const,
  propertyType: "apartament" as const,
  horizon: "1-3-miesiace" as const,
  contactMethod: "telefon" as const,
  regions: [] as string[],
  requirements: [] as string[],
  city: "Torrevieja",
  district: "",
  budget: "250 000",
  message: "",
  consent: true,
  marketingConsent: false,
  website: "",
};

/* ------------------------------- telefon -------------------------------- */

ok("telefon PL bez spacji", isValidPhone("600123456"));
ok("telefon PL ze spacjami", isValidPhone("600 123 456"));
ok("telefon PL z prefiksem +48", isValidPhone("+48 600 123 456"));
ok("telefon PL z prefiksem 0048", isValidPhone("0048600123456"));
ok("telefon hiszpański", isValidPhone("+34 600 123 456"));
ok("telefon za krótki odrzucony", !isValidPhone("1234567"));
ok("telefon zaczynający się od zera odrzucony", !isValidPhone("000000000"));
ok("telefon z literami odrzucony", !isValidPhone("600 123 abc"));
ok(
  "normalizacja usuwa wszystko poza cyframi",
  normalizePhoneDigits("+48 600-123-456") === "48600123456",
);
ok("formatowanie PL dodaje spacje", formatPhone("600123456") === "600 123 456");
ok("formatowanie obcego numeru bez zmian", formatPhone("+34 600 123 456") === "+34 600 123 456");

/* ------------------------------ formularz ------------------------------- */

ok("formularz: minimalny poprawny zestaw", leadFormSchema.safeParse(validForm).success);
ok("formularz: e-mail opcjonalny", leadFormSchema.safeParse({ ...validForm, email: "" }).success);
ok("formularz: imię 1 znak odrzucone", !leadFormSchema.safeParse({ ...validForm, fullName: "J" }).success);
ok(
  "formularz: brak zgody odrzucony",
  !leadFormSchema.safeParse({ ...validForm, consent: false }).success,
);
ok(
  "formularz: brak miejscowości odrzucony",
  !leadFormSchema.safeParse({ ...validForm, city: "" }).success,
);
ok(
  "formularz: budżet ze złą grupą cyfr odrzucony",
  !leadFormSchema.safeParse({ ...validForm, budget: "250 00" }).success,
);
ok(
  "formularz: budżet bez spacji przyjęty",
  leadFormSchema.safeParse({ ...validForm, budget: "250000" }).success,
);
ok("formularz: zły e-mail odrzucony", !leadFormSchema.safeParse({ ...validForm, email: "jan@" }).success);
ok(
  "formularz: wypełniony honeypot odrzucony",
  !leadFormSchema.safeParse({ ...validForm, website: "http://spam.example" }).success,
);
ok(
  "formularz: nieznany region odrzucony",
  !leadFormSchema.safeParse({ ...validForm, regions: ["mars"] }).success,
);

/* --------------------------- payload serwera ---------------------------- */

const payloadInput = {
  ...validForm,
  language: "pl" as const,
  source: "apartamenty-na-sprzedaz/torrevieja",
};

const payload = leadPayloadSchema.safeParse(payloadInput);
ok("payload: poprawny zestaw przechodzi", payload.success);
if (payload.success) {
  ok(
    "payload: telefon znormalizowany do +48",
    payload.data.phone === "+48600123456",
    payload.data.phone,
  );
  ok("payload: budżet jako liczba", payload.data.budget === 250_000, String(payload.data.budget));
  ok("payload: brak e-maila to undefined", payload.data.email === undefined);
  ok("payload: zgoda zapisana", payload.data.consent === true);
  const score = scoreLead(payload.data);
  ok("payload: scoring w zakresie 0-100", score >= 0 && score <= 100, String(score));
  ok("payload: budżet 250k i szybki zakup daje wysoki scoring", score >= 70, String(score));
  ok("payload: telefon to nie WhatsApp", isWhatsApp(payload.data) === false);
}

const payloadWhatsApp = leadPayloadSchema.safeParse({
  ...payloadInput,
  contactMethod: "whatsapp",
  email: "Jan@Example.com",
  budget: "1 000 000",
});
if (payloadWhatsApp.success) {
  ok("payload: WhatsApp rozpoznany", isWhatsApp(payloadWhatsApp.data));
  ok("payload: e-mail zapisany małymi literami", payloadWhatsApp.data.email === "jan@example.com");
  const topScore = scoreLead(payloadWhatsApp.data);
  ok("payload: duży budżet daje scoring ≥95", topScore >= 95, String(topScore));
}

// Pełny zestaw sygnałów (wymagania + długa wiadomość) dobija do 100.
const payloadFull = leadPayloadSchema.safeParse({
  ...payloadInput,
  contactMethod: "whatsapp",
  email: "jan@example.com",
  budget: "1 000 000",
  requirements: ["blisko-plazy", "widok-na-morze"],
  message: "Szukam apartamentu z widokiem na morze, płatność gotówką, chcę zamknąć transakcję w tym kwartale.",
});
if (payloadFull.success) {
  ok("payload: pełny zestaw sygnałów daje 100", scoreLead(payloadFull.data) === 100, String(scoreLead(payloadFull.data)));
}

ok(
  "payload: brak zgody odrzucony",
  !leadPayloadSchema.safeParse({ ...payloadInput, consent: false }).success,
);
ok(
  "payload: nieznany język odrzucony",
  !leadPayloadSchema.safeParse({ ...payloadInput, language: "fr" }).success,
);
ok(
  "payload: honeypot odrzucony",
  !leadPayloadSchema.safeParse({ ...payloadInput, website: "spam" }).success,
);

/* -------------------------------- raport -------------------------------- */

const total = passed + failures.length;
console.log(`\nTesty formularza leadowego: ${passed}/${total} przeszło`);

if (failures.length > 0) {
  console.log("\nNiepowodzenia:");
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}

console.log("Walidacja i scoring leadów działają zgodnie z kontraktem.\n");
