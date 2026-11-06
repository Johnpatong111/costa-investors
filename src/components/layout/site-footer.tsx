import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/ui/logo";
import { SERVICES, PRICE_REPORT } from "@/lib/data/services";
import { getCitiesByTier } from "@/lib/data/repository";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { localePath, type Locale } from "@/lib/i18n/config";
import { FOOTER_COPY, getUiCopy } from "@/lib/i18n/ui";
import { SITE } from "@/lib/seo/site";
import { LOCATIONS } from "@/lib/data/load";

/**
 * Stopka informacyjna. Świadomie bez adresu stacjonarnego i telefonu:
 * portal nie reprezentuje zarejestrowanego podmiotu w Polsce, więc jedynym
 * kanałem kontaktu pozostaje e-mail oraz formularz leadowy.
 */
export function SiteFooter({ lang }: { lang: Locale }) {
  const cities = getCitiesByTier(1);
  const ui = getUiCopy(lang);
  const footer = FOOTER_COPY[lang];

  return (
    <footer className="mt-8 border-t border-brand-100 bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo locale={lang} size="md" tone="light" />
          <p className="mt-4 text-sm leading-relaxed text-brand-200">{footer.tagline}</p>
          <p className="mt-4 text-sm">
            <a
              className="underline decoration-brand-600 underline-offset-2"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
          </p>
        </div>

        <nav aria-label={ui.servicesNav} className="text-sm">
          <p className="mb-3 font-semibold text-white">{ui.servicesNav}</p>
          <ul className="space-y-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={localePath(lang, `/${service.slug}`)} className="hover:text-white hover:underline">
                  {getServiceCopy(service.kind, lang).name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePath(lang, `/${PRICE_REPORT.slug}`)} className="hover:text-white hover:underline">
                {ui.reportsNav}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={ui.citiesNav} className="text-sm">
          <p className="mb-3 font-semibold text-white">{ui.citiesNav}</p>
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
          <p className="mb-3 font-semibold text-white">{ui.infoNav}</p>
          <ul className="space-y-2">
            <li>
              <Link href={localePath(lang, "/polityka-prywatnosci")} className="hover:text-white hover:underline">
                {footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/regulamin")} className="hover:text-white hover:underline">
                {footer.terms}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/o-nas")} className="hover:text-white hover:underline">
                {footer.about}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-900">
        <Container className="flex flex-col gap-2 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} {SITE.brand}. {footer.rights}
          </p>
          {/* Rzetelność danych jest elementem E-E-A-T, dlatego jawnie podajemy źródło i datę. */}
          <p>
            {ui.marketDataLabel}: {LOCATIONS.updatedAt}. {LOCATIONS.source}
          </p>
        </Container>
      </div>
    </footer>
  );
}
