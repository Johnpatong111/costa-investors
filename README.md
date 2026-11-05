# Costa Investors – pSEO lead generation dla polskich inwestorów na Costa Blanca

Platforma programmatic SEO w Next.js 16 (App Router) generuj¹ca strony
„us³uga + miejscowoœæ + dzielnica/urbanizacja” dla rynku hiszpañskiego,
z kalkulatorem ROI i dwuetapowym formularzem leadowym (high-ticket lead gen).

**Model biznesowy:** success fee rozliczane z prowizj¹ hiszpañskiej agencji
(30/70 lub 50/50). Kupuj¹cy nie p³aci nam za analizê.

**Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, Zod 4,
React Hook Form, lucide-react.

---

## 1. Szybki start

```bash
npm install
cp .env.example .env.local     # URL + kana³y dystrybucji leadów
npm run dev                    # http://localhost:3000
npm run check                  # QA danych + typecheck (CI)
npm run build && npm start
```

Wymagane: Node 20.9+ (testowane: 22.19).

---

## 2. Warstwa danych (Costa Blanca, EUR)

Hierarchia: `region (Costa Blanca) › miasto › dzielnica/urbanizacja`.
Seed: **15 miejscowoœci, 70 dzielnic i urbanizacji** (Costa Blanca + Costa Cálida) (`src/lib/data/locations.json`).

```json
{
  "slug": "torrevieja", "name": "Torrevieja",
  "nameGenitive": "Torrevieji", "nameLocative": "Torrevieji",
  "region": "costa-blanca", "subregion": "Costa Blanca Sur", "province": "Alicante",
  "pricePerM2": 2380, "rentalYield": 6.2, "priceGrowth": 9.4,
  "avgDaysOnMarket": 95, "transactions12m": 4200,
  "foreignBuyerShare": 46, "polishBuyerShare": 9,
  "districts": [
    { "slug": "la-mata", "name": "La Mata", "nameLocative": "La Mata",
      "pricePerM2": 2500, "rentalYield": 6.1, "demandIndex": 8,
      "characteristics": ["apartamenty przy szerokiej pla¿y", "…"],
      "landmarks": ["Playa de La Mata", "Parque Natural de las Lagunas"] }
  ]
}
```

Zasady wymuszane przez schemat Zod:

1. **Formy fleksyjne** (`nameGenitive`, `nameLocative`) s¹ wymagane – dla nazw
   hiszpañskich dopuszczalna jest forma nieodmienna („w Alicante”, „w La Mata”).
2. **Ka¿da dzielnica ma ?2 cechy i ?1 punkt orientacyjny** – paliwo dla
   unikalnych bloków treœci.
3. **ROI i dynamika s¹ danymi pierwszej kategorii**, nie pochodn¹ ceny.

Statystyki liczy `deriveDistrictStats()` (`src/lib/content/market-stats.ts`):
ROI netto (brutto - 1,9 pkt proc. kosztów), czynsz €/m2/mies., koszty zakupu
13,5%, udzia³ kupuj¹cych zagranicznych. Wszystko deterministycznie (FNV-1a),
wiêc cache CDN i ISR nie „migocz¹”.

**Produkcja:** podmieñ `locations.json` + `market-stats.ts` na feed
(Idealista/Fotocasa, Colegio de Registradores) zachowuj¹c `MarketStats`.

---

## 3. Us³ugi (jedna intencja = jeden URL)

| Slug | Nazwa | Wyró¿nik |
|---|---|---|
| `apartamenty-na-sprzedaz` | Apartamenty na sprzeda¿ | od 120 000 €, widok/basen |
| `wille-z-basenem` | Wille z basenem | od 320 000 €, dzia³ka + basen |
| `domy-inwestycyjne` | Domy inwestycyjne | ROI 4,6–6,6% brutto |
| `darmowy-przewodnik-wycena` | Darmowy przewodnik i wycena | lead magnet: PDF + analiza prawna |

Synonimy rotuj¹ **w treœci**, nie w routingu (ochrona przed kanibalizacj¹).

---

## 4. Routing

| URL | Rola | Indeks |
|---|---|---|
| `/` | hub g³ówny | tak |
| `/{service}` | hub us³ugi | tak |
| `/{service}/{city}` | hub miasta (porównanie dzielnic) | tak |
| `/{service}/{city}/{district}` | **money page** | tak |
| `/ceny-m2` | indeks raportów | tak |
| `/ceny-m2/{city}/{district}` | raport cen + ROI (`Dataset`) | tak |

SSG przez `generateStaticParams()` (410 stron), `revalidate = 86400`,
`dynamicParams = true` (nowa urbanizacja dzia³a bez rebuilda).

---

## 5. Content matrix i QA

Cztery warstwy unikalnoœci: boilerplate us³ugi (?30% strony) › bloki liczbowe
(€/m2, ROI, czynsz, zwrot 5-letni) › bloki lokalne (cechy + punkty
orientacyjne) › FAQ z danych (cena, ROI, NIE, ITP/IVA, zakup przez Polaków).

Rotacja H1/title/description/lead/FAQ jest deterministyczna (`pick()` na
hashu klucza strony).

Brama jakoœci `assessIndexability()`: ma³o danych, <200 s³ów lub <4 FAQ ›
`noindex,follow`.

`npm run validate:data` sprawdza: kolizje slugów, klucze obce, thin content,
spójnoœæ ROI, brakuj¹ce placeholdery, powtórzone H1 i **duplikaty treœci**
(Jaccard na 5-gramach, normalizacja cyfr).

Stan obecny: **410 stron, 0 b³êdów, max podobieñstwo 0,84** (próg b³êdu 0,88).

## 6. Kalkulator ROI i formularz dwuetapowy

```
LeadEngine (wspólny stan bud¿etu)
+¦ InvestmentCalculator – kafelki bud¿etu (do 150k / 150–300k / 300–500k / 500k+),
-  dok³adna kwota, wynik: czynsz roczny, zwrot 5-letni, wartoœæ po 5 latach
L¦ MultiStepLeadForm
   +¦ StepConfig  – cel zakupu (3), typ (4), horyzont (3), bud¿et
   +¦ StepContact – kana³ kontaktu (telefon/WhatsApp/e-mail), imiê, telefon PL/EU, e-mail
   L¦ LeadSuccess – podsumowanie + „co dalej”
```

- Bud¿et z kalkulatora trafia do formularza i do payloadu – zero podwójnego wpisywania.
- Telefon walidowany jako PL (9 cyfr) lub miêdzynarodowy (8–15 cyfr).
- Honeypot `website`; bot dostaje 201, ale lead nie powstaje.
- B³êdy 422 z API wracaj¹ na pola (`setError`); przy b³êdzie kroku 1 formularz
  sam wraca na w³aœciwy etap.
- Zdarzenie GA4: `lead:submitted` z `{ source, budget, horizon, goal }`.

Payload (`POST /api/leads`):

```json
{
  "fullName": "Jan Kowalski",
  "phone": "+48 600 123 456",
  "email": "jan@example.com",
  "goal": "inwestycja-najem",
  "propertyType": "apartament",
  "horizon": "1-3-miesiace",
  "contactMethod": "whatsapp",
  "city": "Torrevieja",
  "district": "La Mata",
  "budget": "350 000",
  "consent": true,
  "roiEstimate": 21700,
  "source": "apartamenty-na-sprzedaz/torrevieja/la-mata"
}
```

---

## 7. Scoring i dystrybucja

`scoreLead()` (0–100): baza 35 · bud¿et ?300k € +30 (?150k +15) ·
horyzont 1–3 mies. +20 · cel inwestycyjny +5 · telefon/WhatsApp +5 ·
e-mail +2 · wiadomoœæ >40 znaków +3. „Tylko badam rynek” -15.

Regu³a biznesowa: **bud¿et ?300 tys. € + zakup w 1–3 miesi¹ce = 95 pkt**
› natychmiastowy SMS/WhatsApp do agenta (kana³ SMS odpala siê od 65 pkt).

Kana³y (równolegle, `Promise.allSettled`, timeout 8 s):

| Zmienna | Rola |
|---|---|
| `LEADS_WEBHOOK_URL` + `LEADS_WEBHOOK_SECRET` | CRM agencji; HMAC-SHA256 w `x-lead-signature` |
| `ZAPIER_HOOK_URL`, `MAKE_HOOK_URL` | no-code |
| `LEAD_SMS_WEBHOOK_URL` (+`_TOKEN`, `_RECIPIENT`) | SMS/WhatsApp od 65 pkt |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` | e-mail z kart¹ leada |
| `LEAD_RATE_LIMIT`, `LEAD_RATE_WINDOW_MS` | limit per IP (6 / 10 min) |

Weryfikacja podpisu po stronie odbiorcy: HMAC z **surowego body**
(`express.raw()`), `crypto.timingSafeEqual`, `x-lead-id` jako klucz idempotencji.

---

## 8. SEO

- `generateMetadata()`: title ?62, description ?165, canonical absolutny,
  OG/Twitter, `max-image-preview:large`, `max-snippet:-1`.
- JSON-LD `@graph`: `RealEstateAgent` + `WebSite` (layout),
  `BreadcrumbList` + `Service` + `FAQPage` / `Dataset` (strona).
- `sitemap.ts` chunkowany (`generateSitemaps()`, 5 000 URL/chunk; obecnie
  417 URL), `robots.ts` bierze tê sam¹ listê (blokuje `/api/`, UTM, crawlery trenowania).
- Linkowanie wewnêtrzne: dzielnice obok (haversine), inne us³ugi w tej samej
  lokalizacji, raport inwestycyjny.

---

## 9. Przed startem produkcji

- Podmieñ dane firmowe w `src/lib/seo/site.ts` (NAP, telefon, e-mail, geo) –
  musz¹ byæ identyczne z Wizytówk¹ Google.
- Pod³¹cz realny feed cen i ROI; obecne wartoœci to seed modelowy.
- Uzupe³nij `ogImage` (plik w `/public`) i rozwa¿ dynamiczne OG per money page.
- Rate limit w pamiêci procesu › Redis/Upstash przy skali.
- Trwa³a kolejka (SQS/Redis) + zapis leada w bazie **przed** rozsy³k¹.
- Strony prawne: uzupe³nij dane spó³ki i klauzule o przekazywaniu leadów do
  agencji w Hiszpanii (RODO – wspó³administrowanie).

---

## 10. Komendy

| Komenda | Dzia³anie |
|---|---|
| `npm run dev` | serwer developerski |
| `npm run build` | build produkcyjny (SSG + ISR) |
| `npm run typecheck` | TypeScript bez emisji |
| `npm run validate:data` | QA danych, duplikatów i placeholderów |
| `npm run check` | `validate:data` + `typecheck` |

