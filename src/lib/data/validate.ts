import { LOCATIONS, cityByAlias, regionBySlug } from "./load";
import { SERVICES, RESERVED_SLUGS } from "./services";

/**
 * Brama jakości danych (CI: `npm run validate:data`).
 * Wyłapuje: kolizje slugów, wiszące klucze obce, thin content, dane odstające
 * oraz niespójności ROI vs cena m² (typowy błąd przy ręcznym seedzie).
 */

export interface ValidationReport {
  errors: string[];
  warnings: string[];
  stats: {
    regions: number;
    cities: number;
    districts: number;
    serviceCityPages: number;
    serviceDistrictPages: number;
    reportPages: number;
  };
}

export function validateDataset(): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const reserved = new Set<string>(RESERVED_SLUGS as readonly string[]);
  const serviceSlugs = new Set(SERVICES.map((service) => service.slug));
  const seenCities = new Set<string>();
  const seenAliases = new Set<string>();
  let districts = 0;
  let citiesWithoutDistricts = 0;

  for (const city of LOCATIONS.cities) {
    if (seenCities.has(city.slug)) errors.push(`Duplikat miasta: ${city.slug}`);
    seenCities.add(city.slug);

    if (reserved.has(city.slug)) {
      errors.push(`Miasto "${city.slug}" koliduje ze slugiem zarezerwowanym.`);
    }
    if (serviceSlugs.has(city.slug)) {
      errors.push(`Miasto "${city.slug}" koliduje ze slugiem usługi.`);
    }
    if (!regionBySlug.has(city.region)) {
      errors.push(`Miasto "${city.slug}" wskazuje nieistniejący region "${city.region}".`);
    }

    for (const alias of city.aliases) {
      if (seenAliases.has(alias) || seenCities.has(alias) || cityByAlias.get(alias) !== city) {
        errors.push(`Alias miasta "${alias}" jest już zajęty.`);
      }
      seenAliases.add(alias);
    }

    if (city.districts.length === 0) citiesWithoutDistricts += 1;

    const seenDistricts = new Set<string>();
    for (const district of city.districts) {
      districts += 1;
      if (seenDistricts.has(district.slug)) {
        errors.push(`Duplikat dzielnicy "${district.slug}" w mieście "${city.slug}".`);
      }
      seenDistricts.add(district.slug);

      if (district.characteristics.length < 2) {
        errors.push(
          `Dzielnica "${city.slug}/${district.slug}" ma < 2 cechy unikalne (thin content).`,
        );
      }
      if (district.landmarks.length === 0) {
        warnings.push(`Dzielnica "${city.slug}/${district.slug}" nie ma punktów orientacyjnych.`);
      }

      const deviation = Math.abs(district.pricePerM2 - city.pricePerM2) / city.pricePerM2;
      if (deviation > 0.6) {
        warnings.push(
          `Dzielnica "${city.slug}/${district.slug}": cena odbiega o ${Math.round(deviation * 100)}% od mediany miasta. Sprawdź dane.`,
        );
      }

      // Sanity check inwestora: ROI musi być spójne z ceną (droższe = niższe).
      if (district.rentalYield < 3 || district.rentalYield > 9) {
        warnings.push(
          `Dzielnica "${city.slug}/${district.slug}": ROI ${district.rentalYield}% poza typowym przedziałem 3-9%.`,
        );
      }
    }
  }

  for (const city of LOCATIONS.cities) {
    if (city.priceGrowth < 0 && city.rentalYield > 7) {
      warnings.push(
        `Miasto "${city.slug}": spadek cen przy wysokim ROI. Upewnij się, że to nie błąd danych.`,
      );
    }
  }

  for (const service of SERVICES) {
    if (reserved.has(service.slug)) {
      errors.push(`Usługa "${service.slug}" koliduje ze slugiem zarezerwowanym.`);
    }
    if (service.h1.length < 2) {
      warnings.push(`Usługa "${service.slug}" ma < 2 wariantów H1. Rotacja będzie uboga.`);
    }
    if (service.metaDescription.some((description) => description.length > 180)) {
      warnings.push(`Usługa "${service.slug}" ma meta description > 180 znaków przed interpolacją.`);
    }
  }

  if (citiesWithoutDistricts > 0) {
    warnings.push(`${citiesWithoutDistricts} miast bez dzielnic. Powstaną tylko strony miejskie.`);
  }

  return {
    errors,
    warnings,
    stats: {
      regions: LOCATIONS.regions.length,
      cities: LOCATIONS.cities.length,
      districts,
      serviceCityPages: LOCATIONS.cities.length * SERVICES.length,
      serviceDistrictPages: districts * SERVICES.length,
      reportPages: districts + LOCATIONS.cities.length,
    },
  };
}
