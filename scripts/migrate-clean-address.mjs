/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/** Usuwa fikcyjny adres stacjonarny i domyka lokalizację chrome UI. */

function patch(file, replacements) {
  let source = readFileSync(file, "utf8");
  let applied = 0;
  for (const [from, to] of replacements) {
    const next = typeof from === "string" ? source.split(from).join(to) : source.replace(from, to);
    if (next !== source) {
      source = next;
      applied += 1;
    }
  }
  writeFileSync(file, source, "utf8");
  console.log(`${applied ? "✓" : "…"} ${file} (${applied})`);
}

// 1. HowItWorks: eyebrow sterowany propem (bez polskiego hardkodu).
patch("src/components/sections/how-it-works.tsx", [
  ['<SectionHeading eyebrow="Jak to działa">{title}</SectionHeading>', "<SectionHeading eyebrow={eyebrow}>{title}</SectionHeading>"],
  ["export function HowItWorks({", "export function HowItWorks({\n  eyebrow,"],
]);

// 2. Strony pSEO przekazują eyebrow z UI copy.
patch("src/app/[lang]/[service]/[city]/[district]/page.tsx", [
  ["<HowItWorks\n        steps={content.processSteps}", "<HowItWorks\n        eyebrow={ui.howItWorks}\n        steps={content.processSteps}"],
]);
patch("src/app/[lang]/[service]/[city]/page.tsx", [
  ["<HowItWorks\n        steps={content.processSteps}", "<HowItWorks\n        eyebrow={ui.howItWorks}\n        steps={content.processSteps}"],
]);

// 3. Hub raportów: breadcrumb w języku strony.
patch("src/app/[lang]/ceny-m2/page.tsx", [
  ['import { assertLocale', 'import { getUiCopy } from "@/lib/i18n/ui";\nimport { assertLocale'],
  ['{ name: "Strona główna", path: "/" },', "{ name: ui.home, path: \"/\" },"],
  ["  const locale = assertLocale(lang);", "  const locale = assertLocale(lang);\n  const ui = getUiCopy(locale);"],
]);

// 4. Schema.org: bez fikcyjnego adresu stacjonarnego (zostaje kraj).
patch("src/lib/seo/schema-org.ts", [
  [
    /address: \{\s*"@type": "PostalAddress",\s*streetAddress: SITE\.address\.street,\s*addressLocality: SITE\.address\.city,\s*postalCode: SITE\.address\.postalCode,\s*addressRegion: SITE\.address\.region,\s*addressCountry: SITE\.address\.country,\s*\},/,
    'address: {\n      "@type": "PostalAddress",\n      addressCountry: SITE.address.country,\n    },',
  ],
]);

// 5. Layout: bez fałszywych metadanych geo (Warszawa).
patch("src/app/[lang]/layout.tsx", [
  [
    /other: \{\s*"geo\.region": "PL-MZ",\s*"geo\.placename": SITE\.address\.city,\s*"geo\.position": `\$\{SITE\.geo\.lat\};\$\{SITE\.geo\.lng\}`,\s*ICBM: `\$\{SITE\.geo\.lat\}, \$\{SITE\.geo\.lng\}`,\s*\},/,
    "",
  ],
]);

// 6. O nas: bez adresu, tylko e-mail.
patch("src/app/[lang]/o-nas/page.tsx", [
  [
    /\{SITE\.email\}\. Adres: \{SITE\.address\.street\}, \{SITE\.address\.postalCode\}\{" "\}\s*\{SITE\.address\.city\}\./,
    "{SITE.email}.",
  ],
]);

// 7. Polityka prywatności: administrator + kontakt e-mail (bez adresu).
patch("src/app/[lang]/polityka-prywatnosci/page.tsx", [
  [
    /Administrator danych: \{SITE\.legalName\}, \{SITE\.address\.street\},\{" "\}\s*\{SITE\.address\.postalCode\} \{SITE\.address\.city\}\. Kontakt: \{SITE\.email\}\./,
    "Administratorem danych jest {SITE.legalName}. Kontakt w sprawach danych osobowych: {SITE.email}.",
  ],
]);
