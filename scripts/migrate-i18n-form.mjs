/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/** Dokłada lokalizację do chrome'u formularza (postęp, legendy, budżet). */

function patch(file, replacements) {
  let source = readFileSync(file, "utf8");
  let applied = 0;
  for (const [from, to] of replacements) {
    if (!source.includes(from)) continue;
    source = source.split(from).join(to);
    applied += 1;
  }
  writeFileSync(file, source, "utf8");
  console.log(`${applied ? "✓" : "…"} ${file} (${applied})`);
}

// multi-step: przekazuje locale do kroków + lokalizuje postęp.
patch("src/components/lead/multi-step-lead-form.tsx", [
  [
    'import { cn } from "@/lib/utils/cn";',
    'import { FORM_COPY } from "@/lib/i18n/ui";\nimport { cn } from "@/lib/utils/cn";',
  ],
  [
    "  const [step, setStep] = useState<0 | 1>(0);",
    "  const formCopy = FORM_COPY[language];\n  const [step, setStep] = useState<0 | 1>(0);",
  ],
  ["{`krok ${step + 1}/2`}", "{formCopy.stepLabel(step + 1)}"],
  ["            Inwestycja", "            {formCopy.stepOne}"],
  ["            Kontakt", "            {formCopy.stepTwo}"],
  ["          <StepConfig\n            register={register}", "          <StepConfig\n            locale={language}\n            register={register}"],
  ["          <StepContact\n            register={register}", "          <StepContact\n            locale={language}\n            register={register}"],
]);

// step-config: prop locale + zlokalizowana etykieta budżetu.
patch("src/components/lead/step-config.tsx", [
  [
    'import { OptionChecklist, OptionTiles } from "./option-tiles";',
    'import { FORM_COPY } from "@/lib/i18n/ui";\nimport type { Locale } from "@/lib/i18n/config";\nimport { OptionChecklist, OptionTiles } from "./option-tiles";',
  ],
  ["export interface StepConfigProps {\n  register:", "export interface StepConfigProps {\n  locale: Locale;\n  register:"],
  ["export function StepConfig({\n  register,", "export function StepConfig({\n  locale,\n  register,"],
  ["  const hasBudgetError = Boolean(budgetError || errors.budget);", "  const hasBudgetError = Boolean(budgetError || errors.budget);\n  const formCopy = FORM_COPY[locale];"],
  ["            Budżet (EUR)", "            {formCopy.budget}"],
]);

// step-contact: prop locale + zlokalizowana legenda metod kontaktu.
patch("src/components/lead/step-contact.tsx", [
  [
    'import { OptionTiles } from "./option-tiles";',
    'import { FORM_COPY } from "@/lib/i18n/ui";\nimport type { Locale } from "@/lib/i18n/config";\nimport { OptionTiles } from "./option-tiles";',
  ],
  ["export interface StepContactProps {\n  register:", "export interface StepContactProps {\n  locale: Locale;\n  register:"],
  ["export function StepContact({\n  register,", "export function StepContact({\n  locale,\n  register,"],
  ['legend="Preferowana forma kontaktu"', "legend={FORM_COPY[locale].contactLegend}"],
]);
