import {
  LOCATIONS,
  cityByAlias,
  cityBySlug,
  districtByAlias,
  districtByPath,
  districtsByCity,
  regionBySlug,
  type DistrictEntry,
} from "./load";
import type { CitySeed, DistrictSeed, RegionSeed } from "./schema";
import { distanceKm } from "../utils/format";

/**
 * READ API repozytorium lokalizacji (Costa Blanca).
 * Wyłącznie funkcje synchroniczne – dane w pamięci, więc generateStaticParams
 * i generateMetadata nie robią I/O na każdą stronę.
 */

export type { DistrictEntry } from "./load";

export function getRegions(): RegionSeed[] {
  return LOCATIONS.regions;
}

export function getRegion(slug: string): RegionSeed | undefined {
  return regionBySlug.get(slug);
}

export function getCities(): CitySeed[] {
  return LOCATIONS.cities;
}

export function getCity(slug: string): CitySeed | undefined {
  return cityBySlug.get(slug) ?? cityByAlias.get(slug);
}

export function getCityOrThrow(slug: string): CitySeed {
  const city = getCity(slug);
  if (!city) throw new Error(`Nieznane miasto: "${slug}"`);
  return city;
}

export function getCitiesBySubregion(subregion: string): CitySeed[] {
  return LOCATIONS.cities.filter((city) => city.subregion === subregion);
}

/** Unikalne subregiony w kolejności wystąpienia (Costa Blanca Sur/Centro/Norte). */
export function getSubregions(): string[] {
  return [...new Set(LOCATIONS.cities.map((city) => city.subregion))];
}

export function getCitiesByTier(tier: 1 | 2 | 3): CitySeed[] {
  return LOCATIONS.cities.filter((city) => city.tier === tier);
}

export function getDistricts(citySlug: string): DistrictSeed[] {
  const map = districtsByCity.get(citySlug);
  return map ? [...map.values()] : [];
}

export function getDistrict(citySlug: string, districtSlug: string): DistrictEntry | undefined {
  const key = `${citySlug}/${districtSlug}`;
  return districtByPath.get(key) ?? districtByAlias.get(key);
}

/** Wszystkie kombinacje miasto/dzielnica – fundament `generateStaticParams`. */
export function getAllDistrictEntries(): DistrictEntry[] {
  return [...districtByPath.values()];
}

/** Dzielnice najbliższe geograficznie – internal linking. */
export function getNearbyDistricts(entry: DistrictEntry, limit = 4): DistrictEntry[] {
  const result: DistrictEntry[] = [];
  const taken = new Set<string>();

  const sameCity = getDistricts(entry.city.slug)
    .filter((district) => district.slug !== entry.district.slug)
    .map((district) => ({ district, distance: distanceKm(entry.district, district) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  for (const { district } of sameCity) {
    result.push({ region: entry.region, city: entry.city, district });
    taken.add(`${entry.city.slug}/${district.slug}`);
  }

  if (result.length < limit) {
    for (const otherCity of LOCATIONS.cities) {
      if (result.length >= limit) break;
      if (otherCity.slug === entry.city.slug) continue;
      if (otherCity.region !== entry.city.region) continue;
      const candidate = otherCity.districts[0];
      const region = regionBySlug.get(otherCity.region);
      if (!candidate || !region) continue;
      const key = `${otherCity.slug}/${candidate.slug}`;
      if (taken.has(key)) continue;
      result.push({ region, city: otherCity, district: candidate });
      taken.add(key);
    }
  }

  return result;
}

/** Sąsiednie miejscowości – linkowanie „blisko siebie”. */
export function getNearbyCities(city: CitySeed, limit = 4): CitySeed[] {
  return LOCATIONS.cities
    .filter((other) => other.slug !== city.slug)
    .map((other) => ({ city: other, distance: distanceKm(city, other) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ city: other }) => other);
}
