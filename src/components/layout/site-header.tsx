import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SERVICES } from "@/lib/data/services";
import { localePath, type Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/seo/site";

export function SiteHeader({ lang }: { lang: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href={localePath(lang, "/")} className="flex items-center gap-2 font-bold text-brand-950">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-lg bg-brand-900 text-sm text-white"
          >
            SK
          </span>
          <span className="text-lg leading-none">
            {SITE.brand}
            <span className="block text-[11px] font-medium text-brand-500">
            </span>
          </span>
        </Link>

        <nav aria-label="Usługi" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-brand-700">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localePath(lang, `/${service.slug}`)}
                  className="transition-colors hover:text-brand-950"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={lang} />
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-accent-600"
          >
            <span aria-hidden>☎</span>
            {SITE.phone}
          </a>
        </div>
      </Container>
    </header>
  );
}

              {SITE.tagline}