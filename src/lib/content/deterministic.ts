/**
 * Deterministyczne narzędzia „content matrix”.
 *
 * Dlaczego nie Math.random():
 *  - przy każdym buildzie ten sam URL musi dostać ten sam wariant tekstu,
 *  - inaczej ISR/SSG powoduje „migotanie” treści i rozjazd między cache CDN,
 *  - a Google widzi inną stronę przy każdym pobraniu.
 */

/** FNV-1a 32-bit – szybki, stabilny hash ciągu znaków. */
export function hashString(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Mulberry32 – tani PRNG o dobrych właściwościach rozkładu. */
export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRngFromKey(key: string): () => number {
  return createRng(hashString(key));
}

/** Wybór elementu z listy w sposób deterministyczny. */
export function pick<T>(items: readonly T[], key: string, salt = ""): T {
  if (items.length === 0) {
    throw new Error("pick(): pusta lista wariantów");
  }
  const index = hashString(`${key}::${salt}`) % items.length;
  return items[index] as T;
}

/** Rotacja: każdy kolejny wpis listy zaczyna się od innego indeksu. */
export function rotate<T>(items: readonly T[], offset: number): T[] {
  if (items.length === 0) return [];
  const start = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

/** Liczba całkowita z zakresu [min, max] wyznaczona deterministycznie. */
export function seededInt(key: string, min: number, max: number): number {
  const rng = createRngFromKey(key);
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** Zaokrąglenie do sensownej „rynkowej” wartości (np. 18240 -> 18250). */
export function roundToStep(value: number, step = 50): number {
  return Math.round(value / step) * step;
}
