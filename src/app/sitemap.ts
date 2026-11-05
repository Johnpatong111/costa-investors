import type { MetadataRoute } from "next";
import { getSitemapChunk, getSitemapIds } from "@/lib/seo/sitemap-data";

/**
 * Sitemap w trybie chunkowanym.
 *
 * Next generuje: /sitemap/0.xml, /sitemap/1.xml, ...
 * Przy 10 000 stron = 2 pliki. Przy 100 000 stron = 20 plików.
 * Każdy plik generowany jest osobno, więc build nie renderuje
 * całej mapy w jednej operacji (ryzyko timeoutu).
 */
export const dynamic = "force-static";
export const revalidate = 86_400;

export async function generateSitemaps() {
  return getSitemapIds().map((id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Next przekazuje `id` jako string w wygenerowanym route – normalizujemy.
  const chunkId = Number(id);
  try {
    return getSitemapChunk(Number.isFinite(chunkId) ? chunkId : 0).map((entry) => ({
      url: entry.url,
      lastModified: new Date(entry.lastModified),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      ...(entry.alternates ? { alternates: { languages: entry.alternates } } : {}),
    }));
  } catch {
    // Nieznany chunk (np. po zmniejszeniu liczby stron) – pusty plik zamiast 500.
    return [];
  }
}
