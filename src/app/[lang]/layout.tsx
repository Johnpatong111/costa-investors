import type { Metadata, Viewport } from "next";
import { SKIP_TO_CONTENT } from "@/lib/i18n/micro-copy";
import "../globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationNode, websiteNode } from "@/lib/seo/schema-org";
import { SITE } from "@/lib/seo/site";
import { LOCALES, assertLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

/**
 * ROOT LAYOUT dla wszystkich wersji językowych.
 * Segment `[lang]` jest jedynym root layoutem aplikacji. Dzięki temu
 * `<html lang>` jest zawsze zgodny z URL-em, a nie zaszyty na "pl".
 *
 * Etap migracji: treść body jest na razie tylko po polsku, więc wersje
 * EN/ES dostają `noindex,follow` + canonical na /pl/... (patrz buildMetadata).
 * Po przetłumaczeniu treści wystarczy ustawić LOCALIZED_LOCALES = [...LOCALES].
 */

export const revalidate = 86_400;

export function generateStaticParams(): { lang: Locale }[] {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const isDefaultLocale = locale === "pl";
  const home = localePath(locale, "/");

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate.replace("{title}", "%s"),
    },
    description: dict.meta.defaultDescription,
    applicationName: SITE.brand,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    authors: [{ name: SITE.legalName, url: SITE.url }],
    alternates: { canonical: home },
    // Indeksowalność ustalają pojedyncze strony przez buildMetadata
    // (isIndexable per treść), layout nie może blokować całych języków.
    robots: { index: true, follow: true },
    
  };
}

export const viewport: Viewport = {
  themeColor: "#0b2545",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = assertLocale(lang);

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <JsonLd nodes={[organizationNode(locale), websiteNode()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {SKIP_TO_CONTENT[locale]}
        </a>
        <SiteHeader lang={locale} />
        <main id="main" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <SiteFooter lang={locale} />
      </body>
    </html>
  );
}
