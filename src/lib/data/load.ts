import datasetJson from "./locations.json";
import {
  locationsDatasetSchema,
  type CitySeed,
  type DistrictSeed,
  type RegionSeed,
} from "./schema";

/**
 * Loader danych + indeksy O(1) dla Costa Blanca.
 * Walidacja Zod przy imporcie. Błąd schematu zatrzymuje build z czytelnym
 * komunikatem. Migracja na feed (Idealista/Fotocasa) = podmiana tego pliku.
 */

const parsed = locationsDatasetSchema.safeParse(datasetJson);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  • ${issue.path.join(".")} → ${issue.message}`)
    .join("\n");
  throw new Error(
    `locations.json nie przechodzi walidacji schematu:\n${details}\nUruchom: npm run validate:data`,
  );
}

export const LOCATIONS = parsed.data;

export interface DistrictEntry {
  region: RegionSeed;
  city: CitySeed;
  district: DistrictSeed;
}

export const regionBySlug = new Map<string, RegionSeed>(
  LOCATIONS.regions.map((region) => [region.slug, region]),
);

export const cityBySlug = new Map<string, CitySeed>(
  LOCATIONS.cities.map((city) => [city.slug, city]),
);

export const cityByAlias = new Map<string, CitySeed>();
export const districtsByCity = new Map<string, Map<string, DistrictSeed>>();
export const districtByPath = new Map<string, DistrictEntry>();
export const districtByAlias = new Map<string, DistrictEntry>();

for (const city of LOCATIONS.cities) {
  for (const alias of city.aliases) {
    cityByAlias.set(alias, city);
  }

  const region = regionBySlug.get(city.region);
  if (!region) continue; // raportowane przez validateDataset()

  const districtMap = new Map<string, DistrictSeed>();
  for (const district of city.districts) {
    districtMap.set(district.slug, district);
    const entry: DistrictEntry = { region, city, district };
    districtByPath.set(`${city.slug}/${district.slug}`, entry);
    for (const alias of district.aliases) {
      districtByAlias.set(`${city.slug}/${alias}`, entry);
    }
  }
  districtsByCity.set(city.slug, districtMap);
}
