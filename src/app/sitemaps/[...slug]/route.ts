import { getSitemapChunk, getSitemapIds } from "@/lib/seo/sitemap-data";
import { toSitemapUrlsetXml, XML_HEADERS } from "@/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * /sitemaps/{id}.xml - CHUNKI MAPY (5 000 URL-i na plik)
 * ===========================================================================
 * Catch-all segment obsługuje nazwę z rozszerzeniem (`0.xml`), czego nie da
 * się zrobić zwykłym segmentem dynamicznym. Dzięki własnemu handlerowi każdy
 * chunk ma deklarację arkusza stylów i pełne `xhtml:link` (hreflang).
 */
export const dynamic = "force-static";

export function generateStaticParams(): { slug: string[] }[] {
  return getSitemapIds().map((id) => ({ slug: [`${id}.xml`] }));
}

export function GET(_request: Request, context: { params: Promise<{ slug: string[] }> }) {
  return context.params.then((params) => {
    const raw = params.slug?.[0] ?? "0.xml";
    const id = Number.parseInt(raw.replace(/\.xml$/, ""), 10);

    return new Response(toSitemapUrlsetXml(getSitemapChunk(Number.isFinite(id) ? id : 0)), {
      headers: XML_HEADERS,
    });
  });
}
