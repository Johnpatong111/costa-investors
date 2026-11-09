const BASE = process.env.BASE ?? "http://localhost:3270";
const get = async (path) => {
  const response = await fetch(`${BASE}${path}`);
  return { status: response.status, headers: response.headers, body: await response.text() };
};

const PL_SLUG = "/pl/apartamenty-na-sprzedaz/torrevieja/la-mata";
const EN_SLUG = "/en/apartments-for-sale/torrevieja/la-mata";
const ES_SLUG = "/es/apartamentos-en-venta/torrevieja/la-mata";

const sitemap = await get("/sitemap.xml");
const pages = {
  pl: { slug: PL_SLUG, page: await get(PL_SLUG) },
  en: { slug: EN_SLUG, page: await get(EN_SLUG) },
  es: { slug: ES_SLUG, page: await get(ES_SLUG) },
};

let failures = 0;
const ok = (label, condition) => {
  if (!condition) failures += 1;
  console.log(`${condition ? "OK  " : "FAIL"} ${label}`);
};

/* 1. Sitemap */
const urlCount = (sitemap.body.match(/<url>/g) ?? []).length;
ok("sitemap 200", sitemap.status === 200);
ok("sitemap content-type application/xml", (sitemap.headers.get("content-type") ?? "").includes("application/xml"));
ok("sitemap deklaracja XML", sitemap.body.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
ok("sitemap urlset + xhtml", sitemap.body.includes("sitemaps.org/schemas/sitemap/0.9") && sitemap.body.includes("www.w3.org/1999/xhtml"));
ok("sitemap bez arkusza XSL", !sitemap.body.includes("xml-stylesheet"));
ok("sitemap: 4 hreflang na każdy URL", (sitemap.body.match(/xhtml:link/g) ?? []).length === urlCount * 4);
console.log(`     url=${urlCount} · linii=${sitemap.body.split("\n").length}`);

/* 2. Metadane i OpenGraph */
const meta = (html, pattern) => new RegExp(pattern).exec(html)?.[1] ?? "";
const POLISH_ONLY = /[ąćęłńśźż]|Apartamenty|Wypełnij|Sprzedaż|Zadzwoń|nieruchom/i;

for (const [locale, { slug, page }] of Object.entries(pages)) {
  const title = meta(page.body, "<title>(.*?)</title>");
  const description = meta(page.body, 'name="description" content="(.*?)"');
  const canonical = meta(page.body, 'rel="canonical" href="(.*?)"');
  const ogLocale = meta(page.body, 'property="og:locale" content="(.*?)"');
  const ogUrl = meta(page.body, 'property="og:url" content="(.*?)"');
  const ogTitle = meta(page.body, 'property="og:title" content="(.*?)"');

  console.log(`     ${locale.toUpperCase()} title=${title.length} desc=${description.length} og:locale=${ogLocale}`);
  ok(`${locale} canonical wskazuje własny URL`, canonical.endsWith(slug));
  ok(`${locale} og:url = canonical`, ogUrl === canonical);
  ok(`${locale} og:title = title`, ogTitle === title);
  ok(`${locale} title i description w języku strony`, locale === "pl" || !POLISH_ONLY.test(`${title} ${description}`));

  const types = ["RealEstateAgent", "BreadcrumbList", "FAQPage", "Service", "Place"].filter((type) =>
    page.body.includes(`"${type}"`),
  );
  ok(`JSON-LD ${locale}: ${types.join(", ")}`, types.length >= 3);
  ok(`JSON-LD ${locale}: e-mail bez telefonu`, page.body.includes("contact@costainvestors.eu") && !page.body.includes("telephone"));
  ok(`JSON-LD ${locale}: brak fikcyjnego adresu`, !page.body.includes("Przykładowa"));
}

/* 3. Hreflang w <head> zgodny z sitemapą */
const headLinks = (html) =>
  [...html.matchAll(/hrefLang="([a-z-]+)" href="([^"]+)"/g)]
    .map((match) => `${match[1]}=${match[2]}`)
    .sort()
    .join("|");

const entry = sitemap.body.split("<url>").find((chunk) => chunk.includes(PL_SLUG)) ?? "";
const sitemapLinks = [...entry.matchAll(/hreflang="([a-z-]+)" href="([^"]+)"/g)]
  .map((match) => `${match[1]}=${match[2]}`)
  .sort()
  .join("|");

for (const [locale, { page }] of Object.entries(pages)) {
  ok(`hreflang <head> = sitemap (${locale.toUpperCase()})`, headLinks(page.body) === sitemapLinks);
}

console.log(failures === 0 ? "\n✓ Audyt produkcyjny: 0 błędów." : `\n✖ Audyt: ${failures} błędów.`);
process.exit(failures === 0 ? 0 : 1);
