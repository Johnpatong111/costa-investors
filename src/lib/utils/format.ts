const NBSP = "\u00A0";

/** 17850 -> "17 850" (twarda spacja – poprawna polska typografia). */
export function formatPrice(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 17850 -> "17 850 zł" */
export function formatPricePln(value: number): string {
  return `${formatPrice(value)}${NBSP}zł`;
}

/** 17850 -> "17,9 tys. zł" – do zwięzłych nagłówków i kart. */
export function formatPriceShort(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".", ",")}${NBSP}mln${NBSP}zł`;
  }
  if (Math.abs(value) >= 10_000) {
    return `${(value / 1000).toFixed(1).replace(".", ",")}${NBSP}tys.${NBSP}zł`;
  }
  return formatPricePln(value);
}

/** 0.058 -> "+5,8%" (znak zawsze obecny). */
export function formatPercent(ratio: number, digits = 1): string {
  const sign = ratio > 0 ? "+" : ratio < 0 ? "-" : "";
  const value = Math.abs(ratio * 100)
    .toFixed(digits)
    .replace(".", ",");
  return `${sign}${value}%`;
}

/** 2380 -> "2 380 €" (twarda spacja, symbol po liczbie – konwencja PL). */
export function formatEur(value: number): string {
  return `${formatPrice(value)}${NBSP}€`;
}

/** 245000 -> "245 tys. €" – do nagłówków i kart ofertowych. */
export function formatEurShort(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2).replace(".", ",")}${NBSP}mln${NBSP}€`;
  }
  if (Math.abs(value) >= 10_000) {
    return `${Math.round(value / 1000)}${NBSP}tys.${NBSP}€`;
  }
  return formatEur(value);
}

/** 5.9 -> "5,9%" (bez znaku – ROI i dynamika zawsze dodatnie w opisie). */
export function formatRate(percent: number, digits = 1): string {
  return `${percent.toFixed(digits).replace(".", ",")}%`;
}

/** 395000 -> "395 tys." (liczba mieszkańców). */
export function formatPopulation(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2).replace(".", ",")}${NBSP}mln`;
  }
  return `${Math.round(value / 1000)}${NBSP}tys.`;
}

/** Odległość w km (haversine) – do sekcji „dzielnice obok”. */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

/** Obcięcie do limitu znaków z zachowaniem pełnych słów (meta description). */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
