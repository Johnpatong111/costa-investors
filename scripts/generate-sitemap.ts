import { writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { mkdirSync } from "node:fs";

import { getAllSitemapEntries } from "../src/lib/seo/sitemap-data";
import { toSitemapUrlsetXml } from "../src/lib/seo/sitemap-xml";

/**
 * ===========================================================================
 * GENERATOR STATYCZNEJ SITEMAPY (`npm run sitemap`, uruchamiany w `prebuild`)
 * ===========================================================================
 * Zapisuje `public/sitemap.xml` jako gotowy plik, więc hosting (Vercel/CDN)
 * serwuje go z poprawnym `application/xml`, bez route handlerów i bez
 * arkuszy XSL. Każdy `<url>` jest osobną linią, plik ma deklarację XML.
 */

const OUTPUT = "public/sitemap.xml";

const entries = getAllSitemapEntries();
const xml = toSitemapUrlsetXml(entries);

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, xml, "utf8");

console.log(`✓ ${OUTPUT}: ${entries.length} adresów, ${xml.length} bajtów`);
