/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "node:fs";

/**
 * Lokalizuje chrome UI w szablonach pSEO: breadcrumbs, nagłówki sekcji,
 * etykiety linków wewnętrznych i przypisy. Podmienia polskie literały
 * na klucze z `lib/i18n/ui.ts` oraz zlokalizowane nazwy usług.
 */

const UI_IMPORT = 'import { getUiCopy } from "@/lib/i18n/ui";';
const SERVICE_IMPORT = 'import { getServiceCopy } from "@/lib/i18n/content/builders";';

function patch(file, replacements, imports) {
  let source = readFileSync(file, "utf8");
  let applied = 0;

  for (const [from, to] of replacements) {
    if (!source.includes(from)) continue;
    source = source.split(from).join(to);
    applied += 1;
  }

  for (const line of imports) {
    if (source.includes(line)) continue;
    const anchor = 'import { assertLocale';
    const index = source.indexOf(anchor);
    if (index === -1) continue;
    source = `${source.slice(0, index)}${line}\n${source.slice(index)}`;
    applied += 1;
  }

  writeFileSync(file, source, "utf8");
  console.log(`${applied > 0 ? "✓" : "…"} ${file} (podmian: ${applied})`);
}

const commonImports = [SERVICE_IMPORT, UI_IMPORT];
const setup = {
  from: "  const { service, kind } = resolved;",
  to: "  const { service, kind } = resolved;\n  const serviceName = getServiceCopy(kind, locale).name;\n  const ui = getUiCopy(locale);",
};

patch(
  "src/app/[lang]/[service]/[city]/[district]/page.tsx",
  [
    [setup.from, setup.to],
    ['{ name: "Strona główna", path: "/" },', "{ name: ui.home, path: \"/\" },"],
    ["${service.name} w ${districtName} krok po kroku", "${ui.howItWorksTitle(serviceName, districtName)}"],
    [
      'subtitle="Każdy etap potwierdzamy na piśmie, a dokumenty tłumaczymy na polski."',
      "subtitle={ui.howItWorksSubtitle}",
    ],
    ["${service.name} w ${districtName}, pytania i odpowiedzi", "${ui.faqTitle(serviceName, districtName)}"],
    ["title: `Inne usługi w ${districtName}`", "title: ui.otherServices(districtName)"],
    ["title: `Inne dzielnice, ${service.name}`", "title: ui.otherDistricts(serviceName)"],
    ['title: "Raport inwestycyjny"', "title: ui.investmentReport"],
    [
      "label: `Ceny i ROI w ${districtName}, raport ${content.stats.dataAsOf}`",
      "label: ui.reportLink(districtName, content.stats.dataAsOf)",
    ],
    ["label: item.name,", "label: getServiceCopy(item.kind, locale).name,"],
    ["{ name: service.name, path: `/${service.slug}` },", "{ name: serviceName, path: `/${service.slug}` },"],
  ],
  commonImports,
);

patch(
  "src/app/[lang]/[service]/[city]/page.tsx",
  [
    [setup.from, setup.to],
    ['{ name: "Strona główna", path: "/" },', "{ name: ui.home, path: \"/\" },"],
    ["${service.name} w ${city.name} krok po kroku", "${ui.howItWorksTitle(serviceName, city.name)}"],
    ["${service.name} w ${city.name}, pytania i odpowiedzi", "${ui.faqTitle(serviceName, city.name)}"],
    ["title: `Inne usługi w ${city.name}`", "title: ui.otherServices(city.name)"],
    ["label: item.name,", "label: getServiceCopy(item.kind, locale).name,"],
    ["{ name: service.name, path: `/${service.slug}` },", "{ name: serviceName, path: `/${service.slug}` },"],
  ],
  commonImports,
);

patch(
  "src/app/[lang]/ceny-m2/[city]/[district]/page.tsx",
  [
    ['{ name: "Strona główna", path: "/" },', "{ name: ui.home, path: \"/\" },"],
  ],
  [UI_IMPORT],
);
