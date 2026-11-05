import { hashString } from "./deterministic";
import type { MarketStats } from "./market-stats";

/**
 * ===========================================================================
 * WSPÓLNE TYPY I NARZĘDZIA CONTENT MATRIX
 * ===========================================================================
 * Zasada: unikalność NIE wynika z podmiany nazwy miasta w tym samym tekście.
 * Unikalność wynika z DANYCH: ceny, dynamiki, rotacji ofert, cech zabudowy,
 * punktów orientacyjnych i wniosków z nich płynących.
 *
 * Warstwy treści na stronie:
 *  1. boilerplate usługi (wspólny, krótki) – max ~30% objętości strony,
 *  2. bloki parametryzowane liczbami (prawie zawsze unikalne),
 *  3. bloki lokalne z cech dzielnicy (unikalne per lokalizacja),
 *  4. FAQ generowane z danych (unikalne pytania + odpowiedzi).
 */

export interface ContentBlock {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

export interface PageContent {
  key: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  blocks: ContentBlock[];
  faq: FaqItem[];
  /** Etapy procesu po interpolacji – wspólne dla wszystkich stron usługi. */
  processSteps: ProcessStep[];
  stats: MarketStats;
  wordCount: number;
  /** Brama jakości – strony poniżej progu dostają `noindex`. */
  isIndexable: boolean;
  noindexReason?: string;
}

export const MAX_TITLE_LENGTH = 62;
export const MAX_DESCRIPTION_LENGTH = 165;
export const MIN_INDEXABLE_WORDS = 200;

export function contentToPlainText(content: PageContent): string {
  return [
    content.h1,
    content.lead,
    ...content.blocks.flatMap((block) => [
      block.heading,
      ...block.paragraphs,
      ...(block.bullets ?? []),
    ]),
    ...content.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Sygnatura treści – cyfry normalizowane do „#”, żeby dwa teksty różniące się
 * tylko liczbami zostały wykryte jako duplikat (to najczęstszy grzech pSEO).
 */
export function contentFingerprint(content: PageContent): string {
  return hashString(contentToPlainText(content).toLowerCase().replace(/\d+/g, "#")).toString(
    16,
  );
}

/** Twarde limity SERP – bez urwanego wielokropka w środku słowa. */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.55 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/** Ocena jakości strony – decyduje o indeksowaniu. */
export function assessIndexability(content: PageContent): {
  isIndexable: boolean;
  reason?: string;
} {
  if (!content.stats.reliable) {
    return { isIndexable: false, reason: "zbyt mało danych transakcyjnych" };
  }
  if (content.wordCount < MIN_INDEXABLE_WORDS) {
    return { isIndexable: false, reason: `treść < ${MIN_INDEXABLE_WORDS} słów` };
  }
  if (content.faq.length < 4) {
    return { isIndexable: false, reason: "za mało FAQ (brak wartości dodanej)" };
  }
  return { isIndexable: true };
}
