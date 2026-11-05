import { SERVICES } from "../data/services";
import type { ServiceDefinition } from "../data/services";
import { serviceKindFromSlug } from "./service-slugs";
import type { Locale } from "./config";

/**
 * Rozstrzyga usługę po slugu W DANYM JĘZYKU.
 * `/en/apartments-for-sale/...` → usługa `buy` (kanoniczny ServiceDefinition PL),
 * dzięki czemu routa działa dla wszystkich trzech slugów, a treść wybiera
 * builder zależnie od locale.
 */
export function resolveService(
  locale: Locale,
  slug: string,
): { service: ServiceDefinition; kind: ServiceDefinition["kind"] } | null {
  const kind = serviceKindFromSlug(slug, locale);
  if (!kind) return null;

  const service = SERVICES.find((item) => item.kind === kind);
  return service ? { service, kind } : null;
}
