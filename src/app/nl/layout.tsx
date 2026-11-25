import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Container } from "@/components/ui/primitives";
import { SITE } from "@/lib/seo/site";

/**
 * ===========================================================================
 * NL LANDING LAYOUT
 * ===========================================================================
 * De Nederlandstalige landingspagina is bewust een aparte root layout:
 * `[lang]` ondersteunt alleen PL/EN/ES. Zo blijft de bestaande i18n-routing
 * intact en krijgt de pagina toch een eigen <html lang="nl">.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Appartement kopen Costa Blanca | Costa Investors",
    template: "%s | Costa Investors",
  },
  description:
    "Prijzen, huurrendement en aankoopkosten voor een appartement op de Costa Blanca.",
  applicationName: SITE.brand,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function DutchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
          <Container className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/nl/appartement-kopen-costa-blanca"
              className="flex items-center gap-2.5"
              aria-label="Costa Investors, appartement kopen Costa Blanca"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-900 text-sm font-bold text-white">
                CI
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-brand-950">
                Costa Investors
              </span>
            </Link>
            <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-5 text-sm font-medium text-brand-700 md:flex">
              <Link href="/nl/appartement-kopen-costa-blanca" className="hover:text-brand-950">
                Appartementen
              </Link>
              <Link href="/en/property-prices" className="hover:text-brand-950">
                Prijzen per regio
              </Link>
              <Link href="/en/apartments-for-sale" className="hover:text-brand-950">
                English
              </Link>
              <Link href="/es/apartamentos-en-venta" className="hover:text-brand-950">
                Español
              </Link>
            </nav>
            <Link
              href="#lead-form"
              className="rounded-xl bg-accent-500 px-3 py-2.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-accent-600 sm:px-4"
            >
              Ontvang aanbod
            </Link>
          </Container>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-brand-100 bg-brand-950 text-brand-100">
          <Container className="flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {SITE.year} {SITE.brand}. Onafhankelijke oriëntatie op de Costa Blanca.
            </p>
            <p>
              <a className="underline decoration-brand-600 underline-offset-2" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <span className="mx-2 text-brand-600">·</span>
              <Link className="underline decoration-brand-600 underline-offset-2" href="/en/polityka-prywatnosci">
                Privacybeleid
              </Link>
              <span className="mx-2 text-brand-600">·</span>
              <Link className="underline decoration-brand-600 underline-offset-2" href="/en/regulamin">
                Voorwaarden
              </Link>
            </p>
          </Container>
        </footer>

        <GoogleAnalytics />
      </body>
    </html>
  );
}
