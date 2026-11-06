import { z } from "zod";

/**
 * ===========================================================================
 * SCHEMAT DANYCH - LEAD GENERATION HISZPANIA (Costa Blanca)
 * ===========================================================================
 * Hierarchia: region → miasto → dzielnica/urbanizacja.
 * Rynek hiszpański = ceny w EUR, ROI z najmu i dynamika r/r są danymi
 * pierwszoplanowymi (klient z Polski kupuje pod inwestycję).
 *
 * Formy fleksyjne (nameGenitive/nameLocative) są wymagane: dla nazw hiszpańskich
 * dopuszczamy formę nieodmienną (np. "w Alicante", "w La Zenia").
 */

const slugSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: małe litery ASCII, cyfry, myślniki.");

const textSchema = z.string().min(2).max(120);

export const districtSchema = z.object({
  slug: slugSchema,
  name: textSchema,
  /** Dopełniacz: "Torrevieji", "La Zenia" (nieodmienne). */
  nameGenitive: textSchema,
  /** Miejscownik: "Torrevieji", "Alicante", "La Zenia". */
  nameLocative: textSchema,
  type: z.enum(["dzielnica", "urbanizacja", "plaza", "osiedle"]).default("urbanizacja"),
  lat: z.number().min(36.5).max(40.5),
  lng: z.number().min(-2.5).max(1.5),
  /** Mediana ceny ofertowej €/m² (seed. Do podmiany na feed). */
  pricePerM2: z.number().int().min(800).max(12000),
  /** Rentowność brutto najmu w % rocznie. */
  rentalYield: z.number().min(2).max(12),
  /** Presja popytu 1-10 (rotacja ofert, zapytania z zagranicy). */
  demandIndex: z.number().min(1).max(10),
  characteristics: z.array(textSchema).min(2).max(5),
  landmarks: z.array(textSchema).min(1).max(4),
  aliases: z.array(slugSchema).default([]),
});

export const citySchema = z.object({
  slug: slugSchema,
  name: textSchema,
  nameGenitive: textSchema,
  nameLocative: textSchema,
  /** Slug regionu (klucz obcy). Np. "costa-blanca". */
  region: slugSchema,
  /** Costa Blanca Sur / Norte / Centro. */
  subregion: textSchema,
  province: textSchema,
  lat: z.number().min(36.5).max(40.5),
  lng: z.number().min(-2.5).max(1.5),
  population: z.number().int().min(2000),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  pricePerM2: z.number().int().min(800).max(12000),
  rentalYield: z.number().min(2).max(12),
  /** Dynamika cen r/r w %. */
  priceGrowth: z.number().min(-15).max(30),
  avgDaysOnMarket: z.number().int().min(20).max(400),
  transactions12m: z.number().int().min(50),
  /** Udział kupujących z zagranicy w %. */
  foreignBuyerShare: z.number().min(0).max(95),
  /** Udział kupujących z Polski w %. */
  polishBuyerShare: z.number().min(0).max(40),
  aliases: z.array(slugSchema).default([]),
  districts: z.array(districtSchema).default([]),
});

export const regionSchema = z.object({
  slug: slugSchema,
  name: textSchema,
  nameLocative: textSchema,
  country: textSchema,
  currency: z.literal("EUR"),
  /** Mediana ofertowa regionu €/m². Punkt odniesienia w tabelach porównawczych. */
  medianPricePerM2: z.number().int().min(800).max(6000),
});

export const locationsDatasetSchema = z.object({
  version: z.string(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  source: z.string(),
  regions: z.array(regionSchema).min(1),
  cities: z.array(citySchema).min(1),
});

export type DistrictSeed = z.infer<typeof districtSchema>;
export type CitySeed = z.infer<typeof citySchema>;
export type RegionSeed = z.infer<typeof regionSchema>;
export type LocationsDataset = z.infer<typeof locationsDatasetSchema>;

/** Dzielnica z kontekstem miasta i regionu. Trafia na stronę. */
export interface LocationContext {
  region: RegionSeed;
  city: CitySeed;
  district: DistrictSeed;
}

/** Kontekst strony miejskiej (bez dzielnicy). */
export interface CityContext {
  region: RegionSeed;
  city: CitySeed;
}
