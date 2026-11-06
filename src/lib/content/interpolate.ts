/**
 * Interpolacja szablonów `{placeholder}`.
 *
 * Rejestruje brakujące placeholdery zamiast rzucać wyjątkiem w runtime -
 * dzięki temu pojedynczy błąd w szablonie nie wywala całego builda 10k stron,
 * ale `npm run validate:data` i tak go zgłosi (assertNoMissingPlaceholders).
 */

const missing = new Set<string>();

export type TemplateVars = Record<string, string | number>;

export function interpolate(template: string, vars: TemplateVars): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = vars[key];
    if (value === undefined) {
      missing.add(key);
      return "";
    }
    return String(value);
  });
}

export function getMissingPlaceholders(): string[] {
  return [...missing].sort();
}

export function resetMissingPlaceholders(): void {
  missing.clear();
}
