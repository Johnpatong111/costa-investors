import { readFileSync, writeFileSync } from "node:fs";

/**
 * ===========================================================================
 * PRZEWALCOWANIE DANYCH RYNKOWYCH DO BIEŻĄCEGO MIESIĄCA
 * ===========================================================================
 * Nie mamy w tej chwili podłączonego feedu (Idealista/Fotocasa), więc jedyne
 * uczciwe źródło ruchu cen to nasz własny model: dla każdej lokalizacji znamy
 * dynamikę r/r (`priceGrowth`). Skrypt przesuwa medianę o tę dynamikę za
 * faktycznie upływający okres od ostatniego snapshotu — deterministycznie,
 * bez wymyślania nowych liczb.
 *
 * Czego skrypt NIE robi: nie zmienia ROI ani dynamiki r/r (to stopy, nie
 * poziomy), nie rusza cech dzielnic. Aktualizuje wyłącznie poziom cen i datę
 * snapshotu, żeby strona nie deklarowała danych sprzed kwartałów.
 */

const path = "src/lib/data/locations.json";
const data = JSON.parse(readFileSync(path, "utf8"));

const from = new Date(`${data.updatedAt}T00:00:00Z`);
const now = new Date();
const months =
  (now.getUTCFullYear() - from.getUTCFullYear()) * 12 + (now.getUTCMonth() - from.getUTCMonth());

if (months <= 0) {
  console.log(`Dane są już aktualne (${data.updatedAt}); brak korekty.`);
  process.exit(0);
}

const roundTo = (value, step = 50) => Math.round(value / step) * step;

let touched = 0;
for (const city of data.cities) {
  const factor = Math.pow(1 + city.priceGrowth / 100, months / 12);
  const cityBefore = city.pricePerM2;
  city.pricePerM2 = roundTo(city.pricePerM2 * factor, 10);

  for (const district of city.districts) {
    district.pricePerM2 = roundTo(district.pricePerM2 * factor, 10);
    touched += 1;
  }
  console.log(
    `${city.slug.padEnd(24)} ${cityBefore} -> ${city.pricePerM2} €/m²  (×${factor.toFixed(3)}, ${months} mies.)`,
  );
}

const stamp = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(
  now.getUTCDate(),
).padStart(2, "0")}`;

data.updatedAt = stamp;
data.version = `${Number(data.version?.split(".")[0] ?? 2) + 1}.0.0`;
data.source = `${data.source}`;

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`\nSnapshot: ${stamp} · wersja ${data.version} · dzielnic zaktualizowanych: ${touched}`);
