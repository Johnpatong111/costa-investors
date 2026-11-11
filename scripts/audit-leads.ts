/* eslint-disable no-console */
/**
 * ===========================================================================
 * AUDYT UX FORMULARZA LEADOWEGO
 * ===========================================================================
 * Testy schematu mówią, czy lead jest poprawny. Ten audyt mówi, czy da się go
 * w ogóle wysłać: czy pola mają autocomplete, czy błędy są ogłaszane, czy pasek
 * sticky nie zasłania przycisku i czy na stronie z miastem nie pytamy o region.
 *
 * Wymaga `npm run build`. Uruchomienie: npm run audit:leads
 */

import { existsSync, readFileSync } from "node:fs";

let passed = 0;
const failures: string[] = [];

function ok(name: string, condition: boolean, detail = ""): void {
  if (condition) passed += 1;
  else failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");

/* ------------------------- kod komponentów (statycznie) ------------------ */

const contact = read("src/components/lead/step-contact.tsx");
const form = read("src/components/lead/multi-step-lead-form.tsx");
const engine = read("src/components/lead/lead-engine.tsx");
const sticky = read("src/components/sections/sticky-cta.tsx");
const config = read("src/components/lead/step-config.tsx");

ok("formularz: oznaczony data-lead-form", form.includes("data-lead-form"));
ok("formularz: ogłasza zmianę kroku dla czytnika", form.includes('aria-live="polite"'));
ok("formularz: prowadzi fokus do pierwszego błędu", form.includes("setFocus("));
ok("formularz: przewija kartę po zmianie kroku", form.includes("scrollIntoView"));
ok("formularz: chowa pytanie o region przy znanej lokalizacji", form.includes("hideRegions"));
ok("region: ukrywany warunkowo w kroku 1", config.includes("hideRegions ? null"));

ok(
  "pola: autocomplete dla imienia, telefonu, e-maila i miasta",
  (contact.match(/autoComplete="/g) ?? []).length >= 4,
  `${(contact.match(/autoComplete="/g) ?? []).length}`,
);
ok("pola: telefon jako type=tel", contact.includes('type="tel"'));
ok("pola: błędy powiązane przez aria-describedby", (contact.match(/aria-describedby=/g) ?? []).length >= 4);
ok("pola: błędy ogłaszane przez role=alert", (contact.match(/role="alert"/g) ?? []).length >= 4);
ok("pola: wysokość 44 px", contact.includes("h-11"));
ok("pola: honeypot poza nawigacją klawiatury", contact.includes("tabIndex={-1}"));
ok("pola: wymagania oznaczone aria-required", (contact.match(/aria-required/g) ?? []).length >= 3);

ok("sticky: chowa się przy widocznym formularzu", sticky.includes("IntersectionObserver"));
ok("sticky: obserwuje formularz po atrybucie", sticky.includes("[data-lead-form]"));
ok("budżet: wczytywany z linku ?budzet", engine.includes('get("budzet")'));
ok("budżet: formularz nasłuchuje narzędzi", engine.includes("BUDGET_EVENT"));
ok(
  "budżet: narzędzia publikują kwotę",
  ["src/components/tools/investor-workbench.tsx", "src/components/tools/purchase-costs-calculator.tsx", "src/components/tools/stress-test.tsx"].every(
    (path) => read(path).includes("publishBudget"),
  ),
);
ok(
  "budżet: publikacja nie nadpisuje kwoty z linku",
  ["src/components/tools/investor-workbench.tsx", "src/components/tools/purchase-costs-calculator.tsx", "src/components/tools/stress-test.tsx"].every(
    (path) => read(path).includes("current") && read(path).includes("return;"),
  ),
);

/* --------------------------- zbudowany HTML ----------------------------- */

const pages = {
  uslugaPl: ".next/server/app/pl/apartamenty-na-sprzedaz/torrevieja.html",
  uslugaEn: ".next/server/app/en/apartments-for-sale/torrevieja.html",
  uslugaEs: ".next/server/app/es/apartamentos-en-venta/torrevieja.html",
  cenyPl: ".next/server/app/pl/ceny-m2/torrevieja.html",
};

const html: Record<string, string> = {};
for (const [key, path] of Object.entries(pages)) {
  const content = read(path);
  ok(`strona istnieje: ${key}`, content.length > 0, path);
  if (content) html[key] = content;
}

for (const [key, content] of Object.entries(html)) {
  ok(`lead: formularz w HTML (${key})`, content.includes("data-lead-form"));
  ok(`lead: pasek postępu z etykietą (${key})`, /role="progressbar"[^>]*aria-label="[^"]{3,}"/.test(content));
  ok(`lead: budżet z klawiaturą numeryczną (${key})`, content.includes('inputmode="numeric"') || content.includes('inputMode="numeric"'));
  ok(`lead: krok ogłaszany przez aria-live (${key})`, content.includes('aria-live="polite"'));
  ok(
    `lead: brak zbędnego pytania o region (${key})`,
    !content.includes("Costa Blanca Południe") && !content.includes("Costa Blanca South"),
  );
}

// Na stronach usług pasek sticky istnieje, ale musi mieć mechanizm ukrywania.
ok("sticky: pasek w HTML strony usługi", (html.uslugaPl ?? "").includes("position:fixed") || (html.uslugaPl ?? "").includes("fixed inset-x-0 bottom-0"));

/* -------------------------------- raport -------------------------------- */

const total = passed + failures.length;
console.log(`\nAudyt formularza leadowego: ${passed}/${total} przeszło`);

if (failures.length > 0) {
  console.log("\nNiepowodzenia:");
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}

console.log("Formularz jest dostępny, mobilny i nie pyta o rzeczy, które strona już wie.\n");
