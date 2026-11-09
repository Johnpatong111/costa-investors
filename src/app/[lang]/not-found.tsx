"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n/config";

const COPY: Record<Locale, { title: string; text: string; cta: string }> = {
  pl: {
    title: "Nie znaleźliśmy tej strony",
    text: "Adres mógł się zmienić. Wróć na stronę główną i wybierz usługę lub miejscowość.",
    cta: "Strona główna",
  },
  en: {
    title: "We could not find this page",
    text: "The address may have changed. Go back to the homepage and pick a service or location.",
    cta: "Home",
  },
  es: {
    title: "No encontramos esta página",
    text: "La dirección puede haber cambiado. Vuelve al inicio y elige un servicio o una localidad.",
    cta: "Inicio",
  },
};

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const copy = COPY[locale];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-3 px-6 py-20">
      <p className="text-sm font-bold tracking-widest text-accent-600 uppercase">404</p>
      <h1 className="text-3xl font-bold text-brand-950">{copy.title}</h1>
      <p className="text-[15px] leading-relaxed text-brand-700">{copy.text}</p>
      <Link
        href={localePath(locale, "/")}
        className="mt-2 inline-flex items-center rounded-xl bg-accent-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
      >
        {copy.cta}
      </Link>
    </main>
  );
}
