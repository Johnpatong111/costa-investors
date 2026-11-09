import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/ui/logo";
import { SERVICES, PRICE_REPORT } from "@/lib/data/services";
import { getCitiesByTier } from "@/lib/data/repository";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { localePath, type Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/paths";
import { FOOTER_NAV } from "@/lib/i18n/footer-nav";
import { FOOTER_COPY, getUiCopy } from "@/lib/i18n/ui";
import { SITE } from "@/lib/seo/site";
import { LOCATIONS } from "@/lib/data/load";
import { DATA_SOURCE } from "@/lib/i18n/micro-copy";

/**
 * Stopka informacyjna. Świadomie bez adresu stacjonarnego i telefonu:
 * portal nie reprezentuje zarejestrowanego podmiotu w Polsce, więc jedynym
 * kanałem kontaktu pozostaje e-mail oraz formularz leadowy.
 */
export function SiteFooter({ lang }: { lang: Locale }) {
  const cities = getCitiesByTier(1);
  const ui = getUiCopy(lang);
  const footer = FOOTER_COPY[lang];
  const nav = FOOTER_NAV[lang];

  // Linkowanie o różnej intencji: dane (ceny m² per miasto, historia cen)
  // obok usług i poradników. Bez tego stopka linkowała wyłącznie do ofert.
  const guideService = SERVICES.find((service) => service.kind === "lead-magnet") ?? SERVICES[0];
  const reportCities = cities.slice(0, 4);
  const sampleCity = cities[0];
  const sampleDistrict = sampleCity?.districts[0];
  const historyHref =
    sampleCity && sampleDistrict
      ? translatePath(`/${PRICE_REPORT.slug}/${sampleCity.slug}/${sampleDistrict.slug}`, lang)
      : translatePath(`/${PRICE_REPORT.slug}`, lang);

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
                <Link href={translatePath(`/${service.slug}`, lang)} className="hover:text-white hover:underline">
                  {getServiceCopy(service.kind, lang).name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={translatePath(`/${PRICE_REPORT.slug}`, lang)} className="hover:text-white hover:underline">
                {ui.reportsNav}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={nav.dataNav} className="text-sm">
          {/* Nagłówek kolumny jest jednocześnie odnośnikiem do huba raportów:
              /pl/ceny-m2, /en/ceny-m2, /es/ceny-m2 (bez tłumaczenia sluga). */}
          <Link
            href={localePath(lang, `/${PRICE_REPORT.slug}`)}
            className="mb-3 block font-semibold text-white hover:underline"
          >
            {nav.dataNav}
          </Link>
          <ul className="space-y-2">
            {reportCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={translatePath(`/${PRICE_REPORT.slug}/${city.slug}/${city.districts[0]?.slug ?? ""}`, lang)}
                  className="hover:text-white hover:underline"
                >
                  {city.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={historyHref} className="hover:text-white hover:underline">
                {nav.historyLabel}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={nav.guidesNav} className="text-sm">
          <p className="mb-3 font-semibold text-white">{nav.guidesNav}</p>
          <ul className="space-y-2">
            {guideService ? (
              <li>
                <Link
                  href={translatePath(`/${guideService.slug}`, lang)}
                  className="font-medium hover:text-white hover:underline"
                >
                  {nav.guideLabel}
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                href={`${localePath(lang, "/")}#lead-form`}
                className="hover:text-white hover:underline"
              >
                {nav.calculatorLabel}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/o-nas")} className="hover:text-white hover:underline">
                {footer.about}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(lang, "/polityka-prywatnosci")}
                className="hover:text-white hover:underline"
              >
                {footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={localePath(lang, "/regulamin")} className="hover:text-white hover:underline">
                {footer.terms}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <div className="border-t border-brand-900">
        <Container className="flex flex-col gap-2 py-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.year} {SITE.brand}. {footer.rights}
          </p>
          {/* Rzetelność danych jest elementem E-E-A-T, dlatego jawnie podajemy źródło i datę. */}
          <p>
            {ui.marketDataLabel}: {LOCATIONS.updatedAt}. {DATA_SOURCE[lang]}
          </p>
        </Container>
      </div>
    </footer>
  );
}
