/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/**
 * Jednorazowa migracja treści: usuwa telefony i „darmowe" obietnice,
 * normalizuje adres e-mail oraz odmianę nazw hiszpańskich miejscowości.
 */

const edits = [
  {
    file: "src/components/lead/lead-success.tsx",
    replacements: [[/\bPhone\b/g, "Mail"]],
  },
  {
    file: "src/components/lead/multi-step-lead-form.tsx",
    replacements: [
      [/"Nie udało się wysłać zgłoszenia\. Spróbuj ponownie lub zadzwoń\."/, '"Nie udało się wysłać zgłoszenia. Spróbuj ponownie."'],
    ],
  },
  {
    file: "src/components/lead/investment-calculator.tsx",
    replacements: [["bezpłatnie", "bez zobowiązań"]],
  },
  {
    file: "src/app/[lang]/o-nas/page.tsx",
    replacements: [
      [
        /Telefon: \{SITE\.phone\} \([^)]*\)\. E-mail:/,
        "E-mail:",
      ],
    ],
  },
  {
    file: "src/lib/seo/schema-org.ts",
    replacements: [
      [/\n\s*telephone: SITE\.phoneHref,/, ""],
      [/\n\s*telephone: SITE\.phoneHref/g, ""],
    ],
  },
  {
    file: "src/lib/leads/notify.ts",
    replacements: [
      [/env\("LEAD_NOTIFY_EMAIL"\)/, 'env("LEAD_NOTIFY_EMAIL") ?? "contact@costainvestors.eu"'],
      [/env\("LEAD_EMAIL_FROM"\) \?\? "leady@costainvestors\.eu"/, 'env("LEAD_EMAIL_FROM") ?? "contact@costainvestors.eu"'],
    ],
  },
];

for (const edit of edits) {
  let source = readFileSync(edit.file, "utf8");
  const before = source;
  for (const [pattern, replacement] of edit.replacements) {
    source = source.replace(pattern, replacement);
  }
  if (source !== before) {
    writeFileSync(edit.file, source, "utf8");
    console.log(`✓ ${edit.file}`);
  } else {
    console.log(`… ${edit.file} (bez zmian)`);
  }
}

/* --- odmiana nazw miejscowości: hiszpańskie nazwy pozostają nieodmienione --- */
const locationsPath = "src/lib/data/locations.json";
const raw = readFileSync(locationsPath, "utf8");
const dataset = JSON.parse(raw);

const CITY_FORMS = {
  torrevieja: "Torrevieja",
  benidorm: "Benidorm",
  calpe: "Calpe",
  altea: "Altea",
  denia: "Denia",
  javea: "Jávea",
  alicante: "Alicante",
  "orihuela-costa": "Orihuela Costa",
  "guardamar-del-segura": "Guardamar del Segura",
  "santa-pola": "Santa Pola",
  cartagena: "Cartagena",
  "san-pedro-del-pinatar": "San Pedro del Pinatar",
  "los-alcazares": "Los Alcázares",
  mazarron: "Mazarrón",
  aguilas: "Águilas",
};

let fixed = 0;
for (const city of dataset.cities) {
  const form = CITY_FORMS[city.slug];
  if (!form) continue;
  if (city.nameGenitive !== form || city.nameLocative !== form) {
    city.nameGenitive = form;
    city.nameLocative = form;
    fixed += 1;
  }
  // Dzielnice: również bez odmiany (La Mata, Playa del Cura, Centro…).
  for (const district of city.districts ?? []) {
    if (district.nameGenitive !== district.name || district.nameLocative !== district.name) {
      district.nameGenitive = district.name;
      district.nameLocative = district.name;
      fixed += 1;
    }
  }
}

writeFileSync(locationsPath, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
console.log(`✓ ${locationsPath} (poprawione formy: ${fixed})`);
