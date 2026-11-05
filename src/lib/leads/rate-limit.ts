/**
 * Rate limiting w pamięci procesu (sliding window).
 *
 * Ograniczenia: w środowisku serverless każda instancja ma własny licznik,
 * więc to ochrona przed pojedynczym botem, a nie przed botnetem.
 * Dla produkcji podmień `store` na Redis (Upstash) – interfejs pozostaje ten sam.
 */

interface Bucket {
  hits: number[];
}

const store = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((timestamp) => now - timestamp < windowMs);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
    };
  }

  bucket.hits.push(now);

  // Prosty mechanizm GC – bez wycieku pamięci przy długim uptime.
  if (store.size > MAX_KEYS) {
    for (const [storedKey, storedBucket] of store) {
      if (storedBucket.hits.every((timestamp) => now - timestamp > windowMs)) {
        store.delete(storedKey);
      }
      if (store.size <= MAX_KEYS) break;
    }
  }

  store.set(key, bucket);
  return {
    allowed: true,
    remaining: limit - bucket.hits.length,
    retryAfterSeconds: 0,
  };
}

/** SHA-256 z solą – RODO: nie przechowujemy surowych adresów IP. */
export async function hashIdentifier(value: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}
