import { SITE } from "@/lib/seo/site";

/**
 * Sticky CTA na mobile. Stale widoczny pasek z telefonem i skrótem do wyceny.
 * Czysty CSS (bez JS), więc nie wpływa na LCP ani INP.
 */
export function StickyCta({ targetId = "lead-form" }: { targetId?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${SITE.phoneHref}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-3 text-sm font-bold text-brand-900"
        >
          <span aria-hidden>☎</span> Zadzwoń
        </a>
        <a
          href={`#${targetId}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white"
        >
          Darmowa wycena
        </a>
      </div>
      {/* Zapas miejsca, żeby pasek nie zasłaniał stopki. */}
      <div aria-hidden className="h-0" />
    </div>
  );
}
