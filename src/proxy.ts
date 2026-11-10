import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { allServiceSlugs, serviceKindFromSlug, serviceSlug } from "@/lib/i18n/service-slugs";

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
  "domy-inwestycyjne",
  "darmowy-przewodnik-wycena",
  "ceny-m2",
  "o-nas",
  "polityka-prywatnosci",
  "regulamin",
]);

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

  if (/darmowy-przewodnik-analiza[\s-]*ofert/i.test(decoded)) {
    const target: Record<string, string> = {
      pl: "darmowy-przewodnik-wycena",
      en: "free-buying-guide",
      es: "guia-gratis-compra",
    };
    const locale = firstSegment && isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/${target[locale]}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (firstSegment === "og" || firstSegment === "sitemap-index.xml") {
    return NextResponse.next();
  }

  if (firstSegment && isLocale(firstSegment)) {
    const locale: Locale = firstSegment;
    const serviceSegment = segments[1];

    // Alias sluga: polski slug pod /en/ lub /es/ (i odwrotnie). Zamiast
    // serwować 200 z treścią pod złym adresem, robimy trwałe 308 na wersję
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
        const redirect = NextResponse.redirect(redirectUrl, 308);
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
