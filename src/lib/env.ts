/**
 * Odczyt zmiennych środowiskowych z normalizacją.
 * Puste stringi traktujemy jak brak wartości – dzięki temu `.env.example`
 * można skopiować bez ryzyka wysłania requestu na pusty URL.
 */
export function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() !== "" ? value.trim() : undefined;
}

export function envNumber(name: string, fallback: number): number {
  const raw = env(name);
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}
