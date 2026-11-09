import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SERVICES } from "@/lib/data/services";
import { getServiceCopy } from "@/lib/i18n/content/builders";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getUiCopy } from "@/lib/i18n/ui";

export function SiteHeader({ lang }: { lang: Locale }) {
  const ui = getUiCopy(lang);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Logo locale={lang} size="sm" />

        <nav aria-label={ui.servicesNav} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-brand-700">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localePath(lang, `/${service.slug}`)}
                  className="transition-colors hover:text-brand-950"
                >
                  {getServiceCopy(service.kind, lang).name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={lang} />
          <Link
            href={`${localePath(lang, "/")}#lead-form`}
            className="hidden items-center gap-2 rounded-xl bg-accent-500 px-3 py-2.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-accent-600 sm:inline-flex sm:px-4"
          >
            {ui.ctaOffers}
          </Link>
        </div>
      </Container>
    </header>
  );
}
