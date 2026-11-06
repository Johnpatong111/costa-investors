# Costa Investors — pSEO dla rynku nieruchomości w Hiszpanii

Trójjęzyczna (PL / EN / ES) platforma programmatic SEO w **Next.js 16 (App Router)**,
generująca strony w schemacie `usługa + miejscowość + dzielnica/urbanizacja`
dla polskich i międzynarodowych kupujących nieruchomości na Costa Blanca i Costa Cálida.

**Domena produkcyjna:** https://costainvestors.eu
**Model biznesowy:** success fee z prowizji hiszpańskiej agencji (kupujący nie płaci za analizę).

---

## 1. Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, ISR `revalidate = 86400`) |
| Język | TypeScript (strict, `tsc --noEmit` = 0 błędów) |
| Styl | Tailwind CSS 4 (`@theme` w `src/app/globals.css`) |
| Walidacja danych | Zod 4 (`src/lib/data/schema.ts`) |
| Formularze | React Hook Form + Zod |
| Obrazy OG | `next/og` (dynamiczny route `/og`) |

Wymagania: Node 20+.

```bash
npm install
cp .env.example .env.local     # ustaw NEXT_PUBLIC_SITE_URL i kanały dystrybucji leadów
npm run dev
```

---

## 2. Skala serwisu

| Metryka | Wartość |
|---|---|
| Języki | 3 (pl, en, es) — zlokalizowane slugi usług |
| Usługi | 4 |
| Miejscowości | 15 |
| Dzielnice / urbanizacje | 70 |
| Strony w buildzie | 1263 (`npm run build`) |
| URL-e w sitemapie | 1257 (419 × 3 języki) |

Hierarchia danych: `region → miasto → dzielnica/urbanizacja`.
Seed: `src/lib/data/locations.json` (15 miast, 70 dzielnic), walidowany schemą Zod.

Dane rynkowe liczone deterministycznie (FNV-1a) w `src/lib/content/market-stats.ts`,
więc ISR i cache CDN nie powodują migotania liczb.

---

## 3. Routing i i18n

```
/{locale}/{service}                      → hub usługi (money page)
/{locale}/{service}/{city}               → hub miasta
/{locale}/{service}/{city}/{district}    → money page dzielnicy
/{locale}/ceny-m2                        → hub raportów cenowych
/{locale}/ceny-m2/{city}/{district}      → raport cenowo-inwestycyjny
```

Tłumaczone są **wyłącznie slugi usług** (`SERVICE_SLUGS` w `src/lib/i18n/service-slugs.ts`):

| Usługa | PL | EN | ES |
|---|---|---|---|
| Sprzedaż mieszkań | `apartamenty-na-sprzedaz` | `apartments-for-sale` | `apartamentos-en-venta` |
| Wille z basenem | `wille-z-basenem` | `villas-with-pool` | `villas-con-piscina` |
| Domy inwestycyjne | `domy-inwestycyjne` | `investment-properties` | `propiedades-de-inversion` |
| Przewodnik / wycena | `darmowy-przewodnik-wycena` | `free-buying-guide` | `guia-gratis-compra` |

Miasta, dzielnice i strony statyczne mają jeden, niezmienny slug we wszystkich językach.

**Warstwa przekierowań (`src/proxy.ts`, konwencja Next 16):**
- `/{legacy}` bez prefiksu → **301** na `/pl/...`,
- slug z niewłaściwego języka, np. `/en/apartamenty-na-sprzedaz` → **308** na `/en/apartments-for-sale`,
- `/` → **308** na wersję wynikającą z `NEXT_LOCALE` / `Accept-Language`.

---

## 4. SEO

- **Canonical** samoreferencyjny per język, zawsze absolutny (`src/lib/seo/metadata.ts`).
- **hreflang**: pl / en / es / x-default (→ PL) na każdej stronie.
- **Tytuły i opisy** normalizowane do okna SERP: title 55–60 znaków, description 145–155
  (`fitTitle` / `fitDescription` z pulą zwrotów per język).
- **JSON-LD** (`src/lib/seo/schema-org.ts`): `RealEstateAgent`, `WebSite`, `Service` + `Offer`,
  `Place` (geo ES), `FAQPage`, `BreadcrumbList`, `Dataset` — spójne `@id` w jednym grafie.
- **Sitemap**: chunkowana po 5 000 URL (`/sitemaps/{id}.xml`) + indeks serwowany jako
  `/sitemap.xml`; oba typy dokumentów mają deklarację `<?xml-stylesheet?>` i czytelny
  UI z `public/sitemap.xsl`; `robots.txt` generowany z tej samej listy.
- **Obraz OG**: `https://costainvestors.eu/og` (1200×630, generowany przy buildzie).
- **Favicon**: `src/app/icon.svg`.

---

## 5. Struktura katalogów

```
src/
  app/[lang]/…             trasy pSEO (PL/EN/ES)
  app/og/route.tsx         dynamiczny obraz OpenGraph
  app/sitemap-index.xml/   indeks sitemap (rewrite z /sitemap.xml)
  app/icon.svg             favicon
  components/layout/       header, footer, przełącznik języka
  components/sections/     hero, bloki treści, FAQ, linkowanie wewnętrzne
  components/ui/logo.tsx   sygnet + znak słowny (wariant dark/light)
  lib/content/             generatory treści (PL)
  lib/i18n/content/        zlokalizowane generatory treści (EN/ES)
  lib/i18n/dictionaries/   słowniki UI
  lib/data/                seed, schematy Zod, repozytorium
  lib/leads/               walidacja, dispatch webhooków, rate limit
  lib/seo/                 metadata, JSON-LD, sitemap, konfiguracja witryny
scripts/                   QA i audyty (patrz niżej)
```

---

## 6. Skrypty

| Skrypt | Działanie |
|---|---|
| `npm run dev` | serwer developerski |
| `npm run build` / `npm run start` | build produkcyjny / serwer produkcyjny |
| `npm run typecheck` | `tsc --noEmit` (0 błędów wymagane) |
| `npm run validate:data` | QA danych i treści: Zod, placeholdery, Jaccard 5-gramów, widełki SERP |
| `npm run audit:clean` | audyt czystości repo (markery AI, stare domeny, pozostałości redakcyjne) |
| `npm run check` | `audit:clean && validate:data && typecheck` — bramka przed commitem |

---

## 7. Lead generation

`POST /api/leads` → walidacja Zod → scoring → rate limit per IP → podpis HMAC-SHA256 →
równoległy dispatch do webhooków (CRM, Zapier, Make, SMS, e-mail transakcyjny).
Konfiguracja w `.env.example`: `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_URL_EN/ES`,
`LEADS_WEBHOOK_SECRET`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`.

---

## 8. Wdrożenie

```bash
npm ci
npm run check        # audyt + QA danych + typecheck
npm run build        # 1263 strony
npm run start        # lub deploy na Vercel / Cloudflare
```

Wymagane zmienne środowiskowe: `NEXT_PUBLIC_SITE_URL=https://costainvestors.eu`,
`I18N_ROUTING_ENABLED=true` (wartości domyślne w `.env.production`).

Po deployu: zgłoś `https://costainvestors.eu/sitemap.xml` w Search Console
i sprawdź raport „Alternatywna strona z prawidłowym tagiem canonical" (powinien być pusty).
