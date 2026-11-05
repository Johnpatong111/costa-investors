import { serializeGraph, type JsonLdNode } from "@/lib/seo/schema-org";

/**
 * Jeden graf JSON-LD na stronę. Renderowany w Server Component,
 * więc nie trafia do bundle'a klienta.
 */
export function JsonLd({ nodes }: { nodes: JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      // Zawartość jest serializowana przez `serializeGraph` (escape `<`).
      dangerouslySetInnerHTML={{ __html: serializeGraph(nodes) }}
    />
  );
}
