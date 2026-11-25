import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { translatePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

/**
 * ===========================================================================
 * POPULAR SEARCHES (homepage internal linking)
 * ===========================================================================
 * Strona główna ma największą władzę w domenie. Te linki celowo używają
 * dokładnych fraz z GSC (apartments for sale, property prices, rental yields),
 * a nie ogólnego „zobacz ofertę”. Dzięki temu hub sprzedaży i raporty cenowe
 * dostają kontekstowe linki z najsilniejszej strony serwisu.
 */

const LINKS: Record<Locale, { title: string; links: { label: string; path: string }[] }> = {
  pl: {
    title: "Popularne wyszukiwania",
    links: [
      { label: "Apartamenty na sprzedaż Costa Blanca", path: "/apartamenty-na-sprzedaz" },
      { label: "Ceny mieszkań w Alicante", path: "/ceny-m2/alicante" },
      { label: "Rentowność najmu w Torrevieja", path: "/ceny-m2/torrevieja" },
      { label: "Rynek nieruchomości w Hiszpanii 2026", path: "/ceny-m2" },
      { label: "Ranking ROI dzielnic", path: "/ranking-roi" },
    ],
  },
  en: {
    title: "Popular searches",
    links: [
      { label: "Apartments for sale in Costa Blanca", path: "/apartamenty-na-sprzedaz" },
      { label: "Property prices in Alicante", path: "/ceny-m2/alicante" },
      { label: "Rental yields in Torrevieja", path: "/ceny-m2/torrevieja" },
      { label: "Spanish property market 2026", path: "/ceny-m2" },
      { label: "ROI ranking by district", path: "/ranking-roi" },
    ],
  },
  es: {
    title: "Búsquedas frecuentes",
    links: [
      { label: "Apartamentos en venta en la Costa Blanca", path: "/apartamenty-na-sprzedaz" },
      { label: "Precios de la vivienda en Alicante", path: "/ceny-m2/alicante" },
      { label: "Rentabilidad de alquiler en Torrevieja", path: "/ceny-m2/torrevieja" },
      { label: "Mercado inmobiliario en España 2026", path: "/ceny-m2" },
      { label: "Ranking de rentabilidad por zona", path: "/ranking-roi" },
    ],
  },
};

export function PopularSearches({ locale }: { locale: Locale }) {
  const copy = LINKS[locale];

  return (
    <Section>
      <SectionHeading eyebrow="SEO">{copy.title}</SectionHeading>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {copy.links.map((link) => (
          <li key={link.path}>
            <Link
              href={translatePath(link.path, locale)}
              className="flex items-center justify-between gap-3 rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium text-brand-800 transition-colors hover:border-brand-300 hover:text-brand-950"
            >
              <span>{link.label}</span>
              <span aria-hidden className="text-accent-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
