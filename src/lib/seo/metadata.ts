import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import { DEFAULT_LOCALE, LOCALES, LOCALIZED_LOCALES, type Locale } from "../i18n/config";
import { translatePath } from "../i18n/paths";

/**
 * ===========================================================================
 * LIMITY SERP (Google, desktop 2026)
 * ===========================================================================
 * Title: 55-60 znaków (≈ 580 px), Description: 145-155 znaków (≈ 920 px).
 * Trzymanie się widełek zapobiega obcinaniu „…” w snippecie.
 */
export const SERP_LIMITS = {
  titleMin: 55,
  titleMax: 60,
  descriptionMin: 145,
  descriptionMax: 155,
} as const;

interface SerpCopy {
  brand: string;
  /** Dopiski do title, gdy jest za krótki. Power words + konkret (ROI, abogado, NIE). */
  suffixes: readonly string[];
  /** CTA do opisu, gdy jest za krótki. */
  ctas: readonly string[];
  /** Krótkie dopiski (ostatnia deska ratunku, gdy CTA nie mieści się w limicie). */
  fillers: readonly string[];
  ogLocale: string;
  htmlLang: string;
}

const SERP_COPY: Record<Locale, SerpCopy> = {
  pl: {
    brand: "Costa Investors",
    suffixes: [
      ". Ceny €/m² i ROI",
      "| weryfikacja prawna",
      "| agent PL w Hiszpanii",
      ". Bez ukrytych kosztów",
      "| dane 2026",
      "| ROI",
      "| abogado",
      "| NIE",
      "| ceny €/m²",
    ],
    ctas: [
      "Sprawdź koszty zakupu i ROI →",
      "Umów bezpłatną konsultację z agentem PL.",
      "Weryfikacja prawna abogado i NIE w cenie.",
      "Wycena i analiza w 24 h.",
    ],
    fillers: ["ROI i koszty.", "Dane 2026.", "Bez ukrytych kosztów.", "Abogado i NIE.", "Wycena 24 h."],
    ogLocale: "pl_PL",
    htmlLang: "pl-PL",
  },
  en: {
    brand: "Costa Investors",
    suffixes: [
      ": €/m² prices & ROI",
      "| legal check included",
      "| trusted agent in Spain",
      ". No hidden costs",
      "| 2026 market data",
      "| ROI",
      "| abogado",
      "| NIE",
      "| €/m² prices",
    ],
    ctas: [
      "Check purchase costs and ROI →",
      "Book a free call with our local agent.",
      "Abogado, NIE and legal checks included.",
      "Valuation and analysis within 24 h.",
    ],
    fillers: ["ROI and costs.", "2026 data.", "No hidden costs.", "Abogado & NIE.", "24 h valuation."],
    ogLocale: "en_GB",
    htmlLang: "en",
  },
  es: {
    brand: "Costa Investors",
    suffixes: [
      ". Precios €/m² y ROI",
      "| revisión legal incluida",
      "| agente de confianza",
      ". Sin costes ocultos",
      "| datos de mercado 2026",
      "| ROI",
      "| abogado",
      "| NIE",
      "| precios €/m²",
    ],
    ctas: [
      "Consulta costes de compra y ROI →",
      "Reserva una llamada gratuita con tu agente.",
      "Revisión legal, abogado y NIE incluidos.",
      "Valoración y análisis en 24 h.",
    ],
    fillers: ["ROI y costes.", "Datos 2026.", "Sin costes ocultos.", "Abogado y NIE.", "Valoración 24 h."],
    ogLocale: "es_ES",
    htmlLang: "es-ES",
  },
};

/** BCP-47. Używane w JSON-LD `inLanguage` i atrybucie `<html lang>`. */
export function htmlLang(locale: Locale): string {
  return (SERP_COPY[locale] ?? SERP_COPY[DEFAULT_LOCALE]).htmlLang;
}

const tidy = (value: string): string => value.replace(/\s+/g, " ").trim();

/** Usuwa końcową interpunkcję (kropki, przecinki, dwukropki, nawiasy otwarte). */
const TRAILING_PUNCTUATION = /[\s\p{P}]+$/u;

/** Tnie tekst na granicy słowa, bez urwania litery. */
function truncateAtWord(text: string, max: number): string {
  const value = tidy(text);
  if (value.length <= max) return value;
  const window = value.slice(0, max + 1);
  const lastSpace = window.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? window.slice(0, lastSpace) : value.slice(0, max);
  return cut.replace(TRAILING_PUNCTUATION, "").trim();
}


/**
 * Doprowadza title do 55-60 znaków:
 *  - za długi → cięcie na granicy słowa,
 *  - za krótki → dolepia power suffix (ROI / abogado / NIE), a potem markę.
 */
export function fitTitle(title: string, locale: Locale = DEFAULT_LOCALE): string {
  const copy = SERP_COPY[locale] ?? SERP_COPY[DEFAULT_LOCALE];
  // Matryca treści ucina długie tytuły wielokropkiem. Usuwamy go, żeby nie
  // zostawał przed doklejonym suffixem („… | ROI”).
  let value = tidy(title).replace(/[…\s]+$/u, "");

  if (value.length > SERP_LIMITS.titleMax) {
    // Preferujemy cięcie na naturalnym separatorze („|”, „-”, „(”, „:”),
    // żeby nie zostawić urwanego nawiasu; fallback: granica słowa.
    const delimiters = [" | ", " - ", " (", ": "];
    let cut = 0;
    for (const delimiter of delimiters) {
      const index = value.lastIndexOf(delimiter, SERP_LIMITS.titleMax);
      if (index > cut) cut = index;
    }
    value =
      cut >= SERP_LIMITS.titleMin - 15
        ? value.slice(0, cut)
        : truncateAtWord(value, SERP_LIMITS.titleMax);
    value = value.replace(TRAILING_PUNCTUATION, "").trim();
  }

  // Greedy: budujemy kandydatów (power suffix, marka, suffix+suffix) i wybieramy
  // ten, który trafia w 55-60 znaków; jeśli żaden. Najdłuższy mieszczący się.
  const withBrand = `${value} | ${copy.brand}`;
  const candidates: string[] = [value, withBrand];

  for (const suffix of copy.suffixes) {
    candidates.push(`${value} ${suffix}`, `${withBrand} ${suffix}`);
    for (const second of copy.suffixes) {
      if (second !== suffix) candidates.push(`${value} ${suffix} ${second}`);
    }
  }

  const fitting = candidates
    .filter((candidate) => candidate.length <= SERP_LIMITS.titleMax)
    .sort((a, b) => {
      const aReaches = a.length >= SERP_LIMITS.titleMin ? 0 : 1;
      const bReaches = b.length >= SERP_LIMITS.titleMin ? 0 : 1;
      if (aReaches !== bReaches) return aReaches - bReaches;
      return b.length - a.length;
    });

  if (fitting[0] && fitting[0].length > value.length) value = fitting[0];

  return truncateAtWord(value, SERP_LIMITS.titleMax);
}

/**
 * Doprowadza description do 145-155 znaków:
 *  - za długi → najpierw cięcie na końcu zdania, potem na granicy słowa,
 *  - za krótki → dolepia CTA („Sprawdź koszty zakupu i ROI →”).
 */
export function fitDescription(
  description: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const copy = SERP_COPY[locale] ?? SERP_COPY[DEFAULT_LOCALE];
  let value = tidy(description);

  if (value.length > SERP_LIMITS.descriptionMax) {
    const clipped = value.slice(0, SERP_LIMITS.descriptionMax - 1);
    const sentenceEnd = Math.max(
      clipped.lastIndexOf(". "),
      clipped.lastIndexOf("! "),
      clipped.lastIndexOf("? "),
    );
    value =
      sentenceEnd >= SERP_LIMITS.descriptionMin - 25
        ? clipped.slice(0, sentenceEnd + 1)
        : `${truncateAtWord(clipped, SERP_LIMITS.descriptionMax - 1)}…`;
  }

  for (const cta of copy.ctas) {
    if (value.length >= SERP_LIMITS.descriptionMin) break;
    const candidate = `${value} ${cta}`;
    if (candidate.length <= SERP_LIMITS.descriptionMax) value = candidate;
  }

  for (const filler of copy.fillers) {
    if (value.length >= SERP_LIMITS.descriptionMin) break;
    const candidate = `${value} ${filler}`;
    if (candidate.length <= SERP_LIMITS.descriptionMax) value = candidate;
  }

  // Ostatnia szansa: docięcie opisu tak, by zmieściło się CTA prowadzące do 145+.
  if (value.length < SERP_LIMITS.descriptionMin) {
    const cta = copy.ctas[0];
    if (cta) {
      const head = truncateAtWord(value, SERP_LIMITS.descriptionMax - cta.length - 2);
      const candidate = `${head} ${cta}`;
      if (
        candidate.length >= SERP_LIMITS.descriptionMin &&
        candidate.length <= SERP_LIMITS.descriptionMax
      ) {
        value = candidate;
      }
    }
  }

  return value.length > SERP_LIMITS.descriptionMax
    ? truncateAtWord(value, SERP_LIMITS.descriptionMax)
    : value;
}

/** Weryfikacja limitów. Używana przez `npm run validate:data` i testy QA. */
export function serpCompliance(
  text: string,
  kind: "title" | "description",
): { length: number; ok: boolean } {
  const min = kind === "title" ? SERP_LIMITS.titleMin : SERP_LIMITS.descriptionMin;
  const max = kind === "title" ? SERP_LIMITS.titleMax : SERP_LIMITS.descriptionMax;
  return { length: text.length, ok: text.length >= min && text.length <= max };
}

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Ścieżka kanoniczna, np. "/apartamenty-na-sprzedaz/torrevieja/la-mata". */
  path: string;
  keywords?: string[];
  /** Strony „cienkie” dostają noindex,follow. Linkują dalej, ale nie wchodzą do indeksu. */
  noindex?: boolean;
  noindexReason?: string;
  /** Strona w wersji językowej. Steruje canonical i hreflang. */
  locale?: Locale;
  /** Data ostatniej modyfikacji treści (ISR / sitemap). */
  modifiedAt?: string;
  /** Wyłącza optymalizator SERP (np. Strony prawne o ustalonym brzmieniu). */
  rawSerp?: boolean;
}

/**
 * ===========================================================================
 * FABRYKA METADANYCH
 * ===========================================================================
 * Zasady (2026):
 *  - jeden canonical na stronę, zawsze absolutny,
 *  - title ≤ 62 znaki, description ≤ 165 (obcinane w content matrix),
 *  - `max-image-preview:large` + pełny snippet dla stron wartościowych,
 *  - strony thin/noindex NIE dostają `max-snippet` (i tak nie są indeksowane).
 */
export function buildMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    noindex = false,
    locale,
    rawSerp = false,
  } = input;
  const activeLocale: Locale = locale ?? DEFAULT_LOCALE;
  const copy = SERP_COPY[activeLocale] ?? SERP_COPY[DEFAULT_LOCALE];

  // Optymalizator SERP: twarde widełki 55-60 / 145-155 znaków.
  const serpTitle = rawSerp ? tidy(title) : fitTitle(title, activeLocale);
  const serpDescription = rawSerp
    ? tidy(description)
    : fitDescription(description, activeLocale);

  // Canonical jest samoreferencyjny dla danej wersji językowej (sluga usługi
  // tłumaczymy), a hreflang obejmuje wszystkie przetłumaczone języki.
  const canonical = absoluteUrl(translatePath(path, activeLocale));

  const languages =
    LOCALIZED_LOCALES.length > 1
      ? Object.fromEntries(
          LOCALES.filter((item) => LOCALIZED_LOCALES.includes(item)).map((item) => [
            item,
            absoluteUrl(translatePath(path, item)),
          ]),
        )
      : undefined;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: "website",
    locale: copy.ogLocale,
    siteName: SITE.brand,
    title: serpTitle,
    description: serpDescription,
    url: canonical,
  };

  if (languages) {
    const alternateLocale = Object.keys(languages)
      .filter((item) => item !== activeLocale)
      .map((item) => (SERP_COPY[item as Locale] ?? copy).ogLocale);
    if (alternateLocale.length > 0) openGraph.alternateLocale = alternateLocale;
  }

  if (SITE.ogImage) {
    openGraph.images = [
      { url: absoluteUrl(SITE.ogImage), width: 1200, height: 630, alt: serpTitle },
    ];
  }

  return {
    // `absolute` omija szablon `title.template` z layoutu. Długość title jest
    // wtedy w 100% kontrolowana przez fitTitle (55-60 znaków).
    title: { absolute: serpTitle },
    description: serpDescription,
    keywords: keywords ? [...new Set(keywords)] : undefined,
    alternates: {
      canonical,
      ...(languages
        ? {
            languages: {
              ...languages,
              // x-default → wersja polska (rynek źródłowy ruchu).
              "x-default": absoluteUrl(translatePath(path, DEFAULT_LOCALE)),
            },
          }
        : {}),
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: serpTitle,
      description: serpDescription,
      ...(SITE.ogImage ? { images: [absoluteUrl(SITE.ogImage)] } : {}),
    },
    robots: noindex
      ? { index: false, follow: true, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
