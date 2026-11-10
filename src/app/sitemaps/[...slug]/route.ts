import { getSitemapChunk, getSitemapIds } from "@/lib/seo/sitemap-data";
import { XML_HEADERS, toSitemapUrlsetXml } from "@/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * CHUNKI SITEMAPY: /sitemaps/{id}.xml
 * ===========================================================================
 * Pojedynczy plik `<urlset>` z kompletem hreflang. Rozmiar chunka ustawia
 * `SITEMAP_CHUNK_SIZE` (5 000), więc nawet przy dalszym rozwoju serwisu żaden
 * plik nie zbliży się do limitu 50 000 URL-i.
 */

export const dynamic = "force-static";

export function generateStaticParams(): { slug: string[] }[] {
  return getSitemapIds().map((id) => ({ slug: [`${id}.xml`] }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
): Promise<Response> {
  const { slug } = await context.params;
  const name = slug?.[0] ?? "";

  if (!name.endsWith(".xml")) {
    return new Response("Not found", { status: 404, headers: XML_HEADERS });
  }

  const id = Number(name.replace(/\.xml$/, ""));
  const entries = getSitemapChunk(id);
  if (!Number.isInteger(id) || entries.length === 0) {
    return new Response("Not found", { status: 404, headers: XML_HEADERS });
  }

  return new Response(toSitemapUrlsetXml(entries), { headers: XML_HEADERS });
}
