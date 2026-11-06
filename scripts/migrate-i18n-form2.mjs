/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/** Podłącza formularz leadowy pod zlokalizowane opcje (PL/EN/ES). */

function patch(file, pairs) {
  let source = readFileSync(file, "utf8");
  let applied = 0;
  for (const [from, to] of pairs) {
    if (!source.includes(from)) continue;
    source = source.split(from).join(to);
    applied += 1;
  }
  writeFileSync(file, source, "utf8");
  console.log(`${applied ? "✓" : "…"} ${file} (${applied}/${pairs.length})`);
}

patch("src/components/lead/step-config.tsx", [
  [
    'import { FORM_COPY } from "@/lib/i18n/ui";',
    'import { getFormOptions } from "@/lib/i18n/form-options";',
  ],
  ["  const formCopy = FORM_COPY[locale];", "  const formOptions = getFormOptions(locale);"],
  ["        options={GOALS}", "        options={formOptions.goals}"],
  ['        legend="Cel zakupu"', "        legend={formOptions.labels.goal}"],
  ["        options={PROPERTY_TYPES}", "        options={formOptions.propertyTypes}"],
  ['        legend="Typ nieruchomości"', "        legend={formOptions.labels.propertyType}"],
  ["        options={HORIZONS}", "        options={formOptions.horizons}"],
  ['        legend="Kiedy kupujesz?"', "        legend={formOptions.labels.horizon}"],
  ["        options={REGIONS}", "        options={formOptions.regions}"],
  ['        legend="Lokalizacja / region"', "        legend={formOptions.labels.regions}"],
  [
    '        hint="Możesz wybrać kilka regionów lub poprosić o doradztwo."',
    "        hint={formOptions.labels.regionsHint}",
  ],
  ["        options={REQUIREMENTS}", "        options={formOptions.requirements}"],
  [
    '        legend="Kluczowe wymogi (opcjonalnie)"',
    "        legend={formOptions.labels.requirements}",
  ],
  [
    '        hint="Zaznacz, co jest dla Ciebie ważne. Zawęzi to listę ofert."',
    "        hint={formOptions.labels.requirementsHint}",
  ],
  ["            {formCopy.budget}", "            {formOptions.labels.budget}"],
]);

patch("src/components/lead/step-contact.tsx", [
  [
    'import { FORM_COPY } from "@/lib/i18n/ui";',
    'import { getFormOptions } from "@/lib/i18n/form-options";',
  ],
  ["        options={CONTACT_METHODS}", "        options={getFormOptions(locale).contactMethods}"],
  ["        legend={FORM_COPY[locale].contactLegend}", "        legend={getFormOptions(locale).labels.contactMethod}"],
]);

patch("src/components/lead/multi-step-lead-form.tsx", [
  [
    'import { FORM_COPY } from "@/lib/i18n/ui";',
    'import { FORM_COPY } from "@/lib/i18n/ui";\nimport { getFormOptions, labelFor } from "@/lib/i18n/form-options";',
  ],
  ["  const formCopy = FORM_COPY[language];", "  const formCopy = FORM_COPY[language];\n  const formOptions = getFormOptions(language);"],
  ['labelOf(GOALS, String(values.goal ?? "inwestycja-najem"))', 'labelFor(language, "goals", String(values.goal ?? "inwestycja-najem"))'],
  ['labelOf(PROPERTY_TYPES, String(values.propertyType ?? "apartament"))', 'labelFor(language, "propertyTypes", String(values.propertyType ?? "apartament"))'],
  ['labelOf(HORIZONS, String(values.horizon ?? "1-3-miesiace"))', 'labelFor(language, "horizons", String(values.horizon ?? "1-3-miesiace"))'],
  ["selectedRegions.map((value) => labelOf(REGIONS, value))", 'selectedRegions.map((value) => labelFor(language, "regions", value))'],
  ["selectedRequirements.map((value) => labelOf(REQUIREMENTS, value))", 'selectedRequirements.map((value) => labelFor(language, "requirements", value))'],
  ["              Przejdź do odbioru ofert (Krok 2/2)", "              {formOptions.labels.next}"],
  ["              Wstecz", "              {formOptions.labels.back}"],
  ["                  Wysyłanie…", "                  {formOptions.labels.sending}"],
  ["                  Wyślij i odbierz ofertę", "                  {formOptions.labels.submit}"],
  [
    'data?.error ?? "Nie udało się wysłać zgłoszenia. Spróbuj ponownie."',
    "data?.error ?? formOptions.labels.errorGeneric",
  ],
  [
    'setServerError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");',
    "setServerError(formOptions.labels.errorNetwork);",
  ],
]);
