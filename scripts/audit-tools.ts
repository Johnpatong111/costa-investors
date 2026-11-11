/* eslint-disable no-console */
/**
 * ===========================================================================
 * AUDYT NARZĘDZI W ZBUDOWANYM HTML
 * ===========================================================================
 * Testy jednostkowe sprawdzają formuły. Ten audyt sprawdza to, co realnie
 * dostaje użytkownik i crawler: czy narzędzie jest w HTML, czy liczby w tabeli
 * zgadzają się z modelem, czy tabele są w kontenerach przewijanych (mobile)
 * i czy strona ma poprawny viewport.
 *
 * Wymaga `npm run build`. Uruchomienie: npm run audit:tools
 */

import { readFileSync, existsSync } from "node:fs";
import { deriveCityStats, deriveDistrictStats } from "../src/lib/content/market-stats";
import { getCity, getAllDistrictEntries, getRegion } from "../src/lib/data/repository";
import { computeShortLet } from "../src/lib/tools/short-let";
import { computeStress } from "../src/lib/tools/stress";

let passed = 0;
const failures: string[] = [];

function ok(name: string, condition: boolean, detail = ""): void {
  if (condition) passed += 1;
  else failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

const ROOT = ".next/server/app";

function read(page: string): string | null {
  const path = `${ROOT}/${page}`;
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

/** Wyciąga kwotę z komórki tabeli: "5 506 €" → 5506, "-12 039 €" → -12039. */
function parseMoney(cell: string): number {
  const digits = cell.replace(/<[^>]*>/g, " ").replace(/[^\d-]/g, "");
  const value = Number(digits);
  return Number.isFinite(value) ? value : Number.NaN;
}

/** Wartości dwóch kolumn w wierszu o podanej etykiecie. */
function rowValues(html: string, label: string): [number, number] | null {
  const start = html.indexOf(label);
  if (start < 0) return null;
  const chunk = html.slice(start, start + 1200);
  const cells = chunk.match(/<td[^>]*>[\s\S]{0,80}?<\/td>/g);
  if (!cells || cells.length < 2) return null;
  return [parseMoney(cells[0]!), parseMoney(cells[1]!)];
}

/** Każda tabela musi być w kontenerze z przewijaniem poziomym. */
function tablesScrollable(html: string): { total: number; bad: number } {
  let index = html.indexOf("<table");
  let total = 0;
  let bad = 0;
  while (index >= 0) {
    total += 1;
    const before = html.slice(Math.max(0, index - 700), index);
    if (!before.includes("overflow-x-auto")) bad += 1;
    index = html.indexOf("<table", index + 1);
  }
  return { total, bad };
}


/* -------------------------------------------------------------------------
 * 1. Strony i markery narzędzi
 * ------------------------------------------------------------------------- */

const pages = {
  cityPl: "pl/ceny-m2/torrevieja.html",
  cityEn: "en/ceny-m2/torrevieja.html",
  cityEs: "es/ceny-m2/torrevieja.html",
  districtPl: "pl/ceny-m2/torrevieja/la-mata.html",
  rankingPl: "pl/ranking-roi.html",
  servicePl: "pl/apartamenty-na-sprzedaz/torrevieja.html",
};

const html: Record<string, string> = {};
for (const [key, page] of Object.entries(pages)) {
  const content = read(page);
  ok(`strona istnieje: ${key}`, content !== null, page);
  if (content) html[key] = content;
}

const markers: Array<[string, string, string]> = [
  ["policz inwestycję", "cityPl", "Policz inwestycję"],
  ["model an investment", "cityEn", "Model an investment"],
  ["calcula una inversión", "cityEs", "Calcula una inversión"],
  ["koszty i podatki", "cityPl", "Koszty i podatki"],
  ["costs and taxes", "cityEn", "Costs and taxes"],
  ["gastos e impuestos", "cityEs", "Gastos e impuestos"],
  ["lista kontrolna", "cityPl", "Lista kontrolna"],
  ["checklist", "cityEn", "12 checkpoints"],
  ["lista de control", "cityEs", "Lista de control"],
  ["sezon czy rok", "cityPl", "Sezon czy rok"],
  ["season or year", "cityEn", "Season or year"],
  ["temporada o año", "cityEs", "Temporada o año"],
  ["workbench na dzielnicy", "districtPl", "Policz inwestycję"],
  ["koszty na dzielnicy", "districtPl", "Koszty i podatki"],
  ["stress test na dzielnicy", "districtPl", "Test odporności"],
  ["mapa rankingu", "rankingPl", "0 0 900 460"],
  ["workbench w usługach", "servicePl", "Policz inwestycję"],
];

for (const [name, key, needle] of markers) {
  const content = html[key];
  ok(`marker: ${name}`, Boolean(content && content.includes(needle)));
}

/* -------------------------------------------------------------------------
 * 2. Mobilność: viewport, tabele w kontenerach przewijanych
 * ------------------------------------------------------------------------- */

for (const [key, content] of Object.entries(html)) {
  ok(`viewport mobilny: ${key}`, /<meta[^>]+name="viewport"[^>]+width=device-width/i.test(content));
  ok(`viewport bez blokady zoomu: ${key}`, !/user-scalable=no|maximum-scale=1/i.test(content));

  const tables = tablesScrollable(content);
  ok(
    `tabele w kontenerze przewijanym: ${key}`,
    tables.total > 0 && tables.bad === 0,
    `${tables.bad} z ${tables.total} tabel bez overflow-x-auto`,
  );
  ok(`brak sztywnych szerokości w px: ${key}`, !/style="[^"]*width:\s*\d+px/i.test(content));
}

for (const lang of ["pl", "en", "es"]) {
  const content = read(`${lang}/ranking-roi.html`);
  ok(`ranking ${lang} istnieje`, content !== null);
  if (!content) continue;
  ok(`ranking ${lang}: 89 punktów mapy`, (content.match(/<circle/g) ?? []).length === 89);
  ok(`ranking ${lang}: 89 wierszy tabeli`, (content.match(/<tr class=/g) ?? []).length >= 89);
}

/* -------------------------------------------------------------------------
 * 3. Liczby w HTML muszą zgadzać się z modelem
 * ------------------------------------------------------------------------- */

const city = getCity("torrevieja");
ok("dane: Torrevieja w bazie", Boolean(city));

if (city) {
  const region = getRegion(city.region);
  ok("dane: region Torrevieja w bazie", Boolean(region));

  if (region) {
    const stats = deriveCityStats(city, region);
    const price = Math.round(stats.pricePerM2 * 70);
    const rent = Math.max(400, Math.round((price * stats.rentalYield) / 100 / 12));
    const nightly = Math.max(40, Math.round((rent / 30) * 2.4));
    const model = computeShortLet({ price, nightly, occupancy: 65, monthlyRent: rent });
    const cityHtml = html.cityPl;

    if (cityHtml) {
      const net = rowValues(cityHtml, "Dochód netto");
      ok("liczby: wiersz „Dochód netto” w HTML", net !== null);
      if (net) {
        ok(
          "liczby: sezon netto zgodny z modelem",
          Math.abs(net[0] - Math.round(model.shortNet)) <= 1,
          `HTML ${net[0]}, model ${model.shortNet.toFixed(2)}`,
        );
        ok(
          "liczby: rok netto zgodny z modelem",
          Math.abs(net[1] - Math.round(model.longNet)) <= 1,
          `HTML ${net[1]}, model ${model.longNet.toFixed(2)}`,
        );
      }

      const gross = rowValues(cityHtml, "Przychód roczny");
      ok("liczby: wiersz „Przychód roczny” w HTML", gross !== null);
      if (gross) {
        ok(
          "liczby: przychód sezonu zgodny z modelem",
          Math.abs(gross[0] - Math.round(model.shortGross)) <= 1,
          `HTML ${gross[0]}, model ${model.shortGross.toFixed(2)}`,
        );
      }

      const costsChunk = cityHtml.slice(cityHtml.indexOf("Koszty i podatki"));
      ok("liczby: tabela kosztów widoczna", costsChunk.length > 0);
      ok("liczby: koszty jako % ceny 11,5%", costsChunk.includes("11,5%"));
      ok("liczby: stawka ITP 10%", costsChunk.includes("ITP 10%"));

      const atBreakEven = computeShortLet({
        price,
        nightly,
        occupancy: model.breakEven,
        monthlyRent: rent,
      });
      ok(
        "liczby: próg rentowności odwracalny",
        Math.abs(atBreakEven.shortNet - atBreakEven.longNet) < 1,
      );
    }
  }
}

/* -------------------------------------------------------------------------
 * 3b. Stress test na stronie dzielnicy: rata i cash flow z modelu
 * ------------------------------------------------------------------------- */

const laMata = getAllDistrictEntries().find(
  (entry) => entry.city.slug === "torrevieja" && entry.district.slug === "la-mata",
);
ok("dane: dzielnica La Mata w bazie", Boolean(laMata));

if (laMata && html.districtPl) {
  const stats = deriveDistrictStats(laMata.city, laMata.district, laMata.region);
  const price = Math.round(stats.pricePerM2 * 70);
  const stressModel = computeStress({
    price,
    ltv: 70,
    rate: 3.5,
    years: 25,
    monthlyRent: Math.round((price * stats.netYield) / 100 / 12),
    monthlyCosts: Math.round((price * 0.012) / 12),
  });
  const baseRow = rowValues(html.districtPl, "Sytuacja wyjściowa");
  ok("liczby: wiersz „Sytuacja wyjściowa” w HTML", baseRow !== null);
  if (baseRow) {
    ok(
      "liczby: rata w stress teście zgodna z modelem",
      Math.abs(baseRow[0] - stressModel.payment) <= 1,
      `HTML ${baseRow[0]}, model ${stressModel.payment}`,
    );
    ok(
      "liczby: cash flow w stress teście zgodny z modelem",
      Math.abs(baseRow[1] - stressModel.baseCashFlow) <= 1,
      `HTML ${baseRow[1]}, model ${stressModel.baseCashFlow}`,
    );
  }

  const comboRow = rowValues(html.districtPl, "Wszystkie szoki naraz");
  const combo = stressModel.scenarios.find((scenario) => scenario.id === "combo");
  ok("liczby: wiersz „Wszystkie szoki naraz” w HTML", comboRow !== null && Boolean(combo));
  if (comboRow && combo) {
    ok(
      "liczby: cash flow w scenariuszu łączonym zgodny z modelem",
      Math.abs(comboRow[1] - combo.cashFlow) <= 1,
      `HTML ${comboRow[1]}, model ${combo.cashFlow}`,
    );
  }
}

/* -------------------------------------------------------------------------
 * 4. Próbka dzielnic: ITP zgodne z regionem
 * ------------------------------------------------------------------------- */

const sample = getAllDistrictEntries()
  .filter((_, index) => index % 17 === 0)
  .slice(0, 6);

for (const entry of sample) {
  const content = read(`pl/ceny-m2/${entry.city.slug}/${entry.district.slug}.html`);
  ok(`dzielnica istnieje: ${entry.city.slug}/${entry.district.slug}`, content !== null);
  if (!content) continue;

  ok(`dzielnica ${entry.district.slug}: kalkulator kosztów`, content.includes("Koszty i podatki"));
  const itp = entry.city.region === "costa-calida" ? 8 : 10;
  ok(
    `dzielnica ${entry.district.slug}: ITP ${itp}%`,
    content.includes(`ITP ${itp}%`),
    `region ${entry.city.region}`,
  );
  const stats = deriveDistrictStats(entry.city, entry.district, entry.region);
  ok(
    `dzielnica ${entry.district.slug}: cena za metr w raporcie`,
    stats.pricePerM2 > 0,
    `cena ${stats.pricePerM2}`,
  );
}

/* -------------------------------------------------------------------------
 * 5. Mobilność w kodzie narzędzi: cele dotykowe i tabele
 * ------------------------------------------------------------------------- */

const toolFiles = [
  "src/components/tools/investor-workbench.tsx",
  "src/components/tools/purchase-costs-calculator.tsx",
  "src/components/tools/short-let-comparison.tsx",
  "src/components/tools/purchase-checklist.tsx",
  "src/components/tools/stress-test.tsx",
];

for (const file of toolFiles) {
  const source = existsSync(file) ? readFileSync(file, "utf8") : "";
  ok(`źródło istnieje: ${file}`, source.length > 0);
  if (!source) continue;

  // Każdy przycisk musi mieć cel dotykowy co najmniej 44 px wysokości.
  const buttonStarts = [...source.matchAll(/<button/g)].map((match) => match.index ?? 0);
  const smallButtons = buttonStarts.filter((index) => {
    const chunk = source.slice(index, index + 700);
    return !/min-h-\[44px\]|min-h-11/.test(chunk);
  });
  ok(
    `cele dotykowe 44 px: ${file.split("/").pop()}`,
    smallButtons.length === 0,
    `${smallButtons.length} z ${buttonStarts.length} przycisków bez min-h`,
  );

  // Tabele w narzędziach muszą być w kontenerze przewijanym.
  const tableCount = (source.match(/<table/g) ?? []).length;
  const scrollCount = (source.match(/overflow-x-auto/g) ?? []).length;
  ok(
    `tabele przewijane w kodzie: ${file.split("/").pop()}`,
    tableCount === 0 || scrollCount >= tableCount,
    `tabele ${tableCount}, kontenery ${scrollCount}`,
  );
}

/* -------------------------------------------------------------------------
 * RAPORT
 * ------------------------------------------------------------------------- */

const total = passed + failures.length;
console.log(`\nAudyt narzędzi: ${passed}/${total} przeszło`);

if (failures.length > 0) {
  console.log("\nNiepowodzenia:");
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}

console.log("Narzędzia są w HTML, liczby zgodne z modelem, tabele przewijane na mobile.\n");

