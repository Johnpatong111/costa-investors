import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { SERVICES, PRICE_REPORT } from "@/lib/data/services";
import { getCitiesByTier } from "@/lib/data/repository";
import { localePath, type Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/seo/site";
import { LOCATIONS } from "@/lib/data/load";

export function SiteFooter({ lang }: { lang: Locale }) {
  const cities = getCitiesByTier(1);

  return (
    <footer className="mt-8 border-t border-brand-100 bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-bold text-white">{SITE.brand}</p>
          <p className="mt-3 text-sm leading-relaxed text-brand-200">{SITE.tagline}.</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-brand-200">
            <p>{SITE.legalName}</p>
            <p>
              {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
            </p>
            <p>
              <a className="underline decoration-brand-600 underline-offset-2" href={`tel:${SITE.phoneHref}`}>
                {SITE.phone}
              </a>
            </p>
            <p>
              <a className="underline decoration-brand-600 underline-offset-2" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Usługi" className="text-sm">
          <p className="mb-3 font-semibold text-white">Usługi</p>
          <ul className="space-y-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={localePath(lang, `/${service.slug}`)} className="hover:text-white hover:underline">
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePath(lang, `/${PRICE_REPORT.slug}`)} className="hover:text-white hover:underline">
                {PRICE_REPORT.name}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Największe miasta" className="text-sm">
          <p className="mb-3 font-semibold text-white">Największe miasta</p>
          <ul className="grid grid-cols-2 gap-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={localePath(lang, `/${SERVICES[0]?.slug ?? ""}/${city.slug}`)}
                  className="hover:text-white hover:underline"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">Informacje</p>
          <ul className="space-y-2">
            <li>
              <Link href={localePath(lang, "/polityka-prywatnosci")} className="hover:text-white hover:underline">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/regulamin")} className="hover:text-white hover:underline">
                Regulamin
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/o-nas")} className="hover:text-white hover:underline">
                O nas
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-900">
        <Container className="flex flex-col gap-2 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} {SITE.legalName}. Wszystkie prawa zastrzeżone.
          </p>
          {/* Rzetelność danych jest elementem E-E-A-T – dlatego jawnie podajemy źródło i datę. */}
          <p>
            Dane rynkowe: mediana ofert i transakcji, aktualizacja {LOCATIONS.updatedAt}.{" "}
            {LOCATIONS.source}
          </p>
        </Container>
      </div>
    </footer>
  );
}
