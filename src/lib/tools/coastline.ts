/**
 * ===========================================================================
 * UPROSZCZONA LINIA BRZEGOWA COSTA BLANCA I COSTA CÁLIDA
 * ===========================================================================
 * Współrzędne [lng, lat] od Dénii na północy do Águilas na południu.
 * Cel jest jeden: żeby rozrzut punktów na mapie zwrotu miał kontekst
 * geograficzny (morze po jednej stronie, ląd po drugiej), a nie wyglądał jak
 * chmura kropek. To szkic orientacyjny, nie dane nawigacyjne: upraszcza
 * zatoki, Mar Menor i Cabo de Palos.
 */

export type CoastPoint = readonly [lng: number, lat: number];

export const COASTLINE: CoastPoint[] = [
  [-0.01, 38.9], // Els Poblets, na północ od Dénii
  [0.05, 38.88], // Les Marines
  [0.11, 38.84], // Dénia
  [0.16, 38.79], // Les Marines, plaża
  [0.23, 38.73], // Cap de la Nau
  [0.13, 38.69], // Moraira
  [0.06, 38.64], // Calpe, Ifach
  [0.0, 38.61], // Calpe, plaża
  [-0.05, 38.6], // Altea
  [-0.13, 38.54], // Benidorm
  [-0.23, 38.5], // Villajoyosa
  [-0.4, 38.42], // El Campello
  [-0.48, 38.34], // Alicante
  [-0.56, 38.19], // Santa Pola
  [-0.65, 38.09], // Guardamar del Segura
  [-0.68, 37.98], // Torrevieja
  [-0.79, 37.87], // Pilar de la Horadada
  [-0.79, 37.8], // San Pedro del Pinatar
  [-0.73, 37.7], // La Manga
  [-0.69, 37.63], // Cabo de Palos
  [-0.85, 37.58], // Portmán
  [-1.26, 37.56], // Puerto de Mazarrón
  [-1.4, 37.47], // Bolnuevo
  [-1.58, 37.4], // Águilas
];

/**
 * Przesunięcie linii brzegowej w stronę morza (w stopniach długości, ~2,6 km).
 * Punkty w bazie leżą na plaży, a szkicowa linia brzegowa biegnie kilka km
 * w głąb lądu, więc bez tego korekty punkty pierwszej linii wpadały do morza.
 */
export const SEA_OFFSET_LNG = 0.03;

/** Nazwa akwenu po hiszpańsku nie zmienia się między językami strony. */
export const SEA_NAME = "Mar Mediterráneo";

export interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

/**
 * Wielokąt lądu: linia brzegowa domknięta przez lewy górny róg mapy.
 * Używany zarówno do rysowania (SVG), jak i w testach, żeby oba źródła nie
 * mogły się rozjechać.
 */
/** Linia brzegowa używana do rysowania i testów: lekko przesunięta w morze. */
export function shiftedCoastline(): CoastPoint[] {
  return COASTLINE.map(([lng, lat]) => [lng + SEA_OFFSET_LNG, lat] as const);
}

export function buildLandPolygon(bounds: MapBounds): CoastPoint[] {
  const coast = shiftedCoastline();
  return [
    ...coast,
    [bounds.minLng, bounds.minLat],
    [bounds.minLng, bounds.maxLat],
    [coast[0]![0], bounds.maxLat],
  ];
}

/** Ray casting: czy punkt leży w wielokącie (lng = x, lat = y). */
export function pointInPolygon(point: CoastPoint, polygon: CoastPoint[]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i]!;
    const [xj, yj] = polygon[j]!;
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-9) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

/** Odległość punktu od najbliższego odcinka linii brzegowej w stopniach. */
export function distanceToCoast(point: CoastPoint): number {
  const [px, py] = point;
  let best = Number.POSITIVE_INFINITY;
  for (let i = 1; i < COASTLINE.length; i += 1) {
    const [ax, ay] = COASTLINE[i - 1]!;
    const [bx, by] = COASTLINE[i]!;
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSq = dx * dx + dy * dy || 1e-9;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSq));
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    best = Math.min(best, Math.hypot(px - cx, py - cy));
  }
  return best;
}
