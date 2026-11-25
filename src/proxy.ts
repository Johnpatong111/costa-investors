import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, stripLocale, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { allServiceSlugs, isPriceReportSlug, PRICE_REPORT_SLUGS, priceReportSlug, serviceKindFromSlug, serviceSlug } from "@/lib/i18n/service-slugs";

/**
 * Bezpiecznik: middleware można wyłączyć `I18N_ROUTING_ENABLED=false`
 * (np. W środowisku, gdzie trasy `[lang]` nie są jeszcze wdrożone).
 * Domyślnie AKTYWNE. Trasy istnieją.
 */

const ENABLED = process.env.I18N_ROUTING_ENABLED !== "false";

/**
 * Ścieżki historyczne (bez prefiksu), które muszą dostać **301**. Czyta je
 * Google jako trwałe przeniesienie i przekazuje całe link equity.
 * Dla pozostałych adresów bez prefiksu stosujemy 308 (zachowanie metody).
 */
const LEGACY_PREFIXES = new Set([
  "apartamenty-na-sprzedaz",
  "ceny-m2",
  "o-nas",
  "polityka-prywatnosci",
  "regulamin",
]);

/**
 * Usługi wycofane z oferty. Ich stare slugi (PL/EN/ES) nie mogą zwracać 404,
 * bo Google i linki zewnętrzne nadal je znają. Mapujemy je 301 na najbliższą
 * istniejącą stronę: wille → apartamenty, inwestycje → raporty ROI,
 * lead magnet → apartamenty.
 */
const REMOVED_SERVICE_TARGET: Record<string, "buy" | "price"> = {
  villa: "buy",
  investment: "price",
  "lead-magnet": "buy",
};

function removedServiceRedirect(pathname: string, locale: Locale): string | null {
  const { path } = stripLocale(pathname);
  const segments = path.split("/").filter(Boolean);
  const kind = segments[0] ? serviceKindFromSlug(segments[0]) : undefined;
  if (!kind) return null;

  const target = REMOVED_SERVICE_TARGET[kind];
  if (!target) return null;

  const first = target === "price" ? priceReportSlug(locale) : serviceSlug("buy", locale);
  return `/${locale}/${[first, ...segments.slice(1)].join("/")}`;
}

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const candidates = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().slice(0, 2).toLowerCase());

  for (const candidate of candidates) {
    if (candidate && isLocale(candidate)) return candidate;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  if (!ENABLED) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Zasoby techniczne bez prefiksu języka (obraz OG). Bez tego proxy
  // przekierowałoby /og → /pl/og i social media dostałyby 404.
  // Uszkodzony slug lead magnetu ze spacją ("analiza%20ofert") trafiał na 404.
  // Normalizujemy go w proxy, bo reguły `redirects` nie dopasowują %20.
  const decoded = (() => {
    try {
      return decodeURIComponent(pathname);
    } catch {
      return pathname;
    }
  })();


  // `/nl/...` is een losse Nederlandstalige landingsroute (geen `[lang]`).
  // Zonder deze uitzondering zou proxy hem naar /en/nl/... of /pl/nl/... sturen.
  if (firstSegment === "og" || firstSegment === "sitemap-index.xml" || firstSegment === "nl") {
    return NextResponse.next();
  }

  // Stare slugi wycofanych usług → 301 na istniejącą stronę (bez 404).
  const requestLocale: Locale =
    firstSegment && isLocale(firstSegment) ? firstSegment : detectLocale(request);
  const removedRedirect = removedServiceRedirect(pathname, requestLocale);
  if (removedRedirect) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = removedRedirect;
    const redirect = NextResponse.redirect(redirectUrl, 301);
    redirect.cookies.set("NEXT_LOCALE", requestLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return redirect;
  }

  if (firstSegment && isLocale(firstSegment)) {
    const locale: Locale = firstSegment;
    const serviceSegment = segments[1];

    // Hub cen ma własny slug per język. Stary polski slug pod /en lub /es
    // dostaje 301 na wersję językową, a nowy slug jest przepisywany
    // wewnętrznie na trasę /{lang}/ceny-m2/... (bez zmiany URL-a w pasku).
    if (serviceSegment && isPriceReportSlug(serviceSegment)) {
      const canonicalPriceSlug = priceReportSlug(locale);

      if (serviceSegment !== canonicalPriceSlug) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = translatePath(pathname, locale);
        const redirect = NextResponse.redirect(redirectUrl, 301);
        redirect.cookies.set("NEXT_LOCALE", locale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
        return redirect;
      }

      if (canonicalPriceSlug !== PRICE_REPORT_SLUGS.pl) {
        const rewriteUrl = request.nextUrl.clone();
        const rest = segments.slice(2).map((segment) => `/${segment}`).join("");
        rewriteUrl.pathname = `/${locale}/${PRICE_REPORT_SLUGS.pl}${rest}`;
        return NextResponse.rewrite(rewriteUrl);
      }
    }

    // Alias sluga: polski slug pod /en/ lub /es/ (i odwrotnie). Zamiast
    // serwować 200 z treścią pod złym adresem, robimy trwałe 301 na wersję
    // kanoniczną - Google konsoliduje sygnały na jednym URL-u.
    if (serviceSegment) {
      const kind = serviceKindFromSlug(serviceSegment);
      const canonicalServiceSlug = kind ? serviceSlug(kind, locale) : undefined;
      const isAlias =
        kind !== undefined &&
        canonicalServiceSlug !== serviceSegment &&
        allServiceSlugs(kind).includes(serviceSegment);

      if (isAlias) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = translatePath(pathname, locale);
        const redirect = NextResponse.redirect(redirectUrl, 301);
        redirect.cookies.set("NEXT_LOCALE", locale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
        return redirect;
      }
    }

    const response = NextResponse.next();
    response.headers.set("x-locale", locale);
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  // Od razu trafiamy w zlokalizowany slug usługi. Bez podwójnego przeskoku.
  url.pathname = translatePath(pathname, locale);

  // Wszystkie bezprefiksowe adresy → 301 na wersję językową (pełne link equity).
  const response = NextResponse.redirect(url, 301);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Pomijamy pliki statyczne, API i wszystko z kropką w nazwie.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
