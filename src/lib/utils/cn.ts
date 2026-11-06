/** Minimalny `cn`. Łączymy klasy warunkowo bez zależności (clsx nie jest potrzebny). */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
