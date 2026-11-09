import { mkdirSync, writeFileSync } from "node:fs";

import { getAllSitemapEntries } from "../src/lib/seo/sitemap-data";
import { toSitemapUrlsetXml } from "../src/lib/seo/sitemap-xml";

/**
 * Zapisuje `public/sitemap.xml` jako fizyczny plik XML.
 * Hosting (Vercel/CDN) serwuje pliki .xml z `application/xml`, więc Google
 * dostaje poprawny dokument, a przeglądarka drzewo XML zamiast ściany tekstu.
 * Uruchamiane automatycznie w `prebuild`.
 */
const OUTPUT = "public/sitemap.xml";
const entries = getAllSitemapEntries();
const xml = toSitemapUrlsetXml(entries);

mkdirSync("public", { recursive: true });
writeFileSync(OUTPUT, xml, "utf8");
// Kopia pod inną ścieżką: pozwala obejść reguły CDN blokujące /sitemap.xml.
writeFileSync("public/sitemap-main.xml", xml, "utf8");

const lines = xml.split("\n").length;
console.log(`✓ ${OUTPUT}: ${entries.length} adresów, ${lines} linii, ${xml.length} bajtów`);
