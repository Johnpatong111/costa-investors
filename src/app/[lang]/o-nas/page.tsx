import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { assertLocale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  return buildMetadata({
  title: `O nas – ${SITE.brand}`,
  description:
    "Kim jesteśmy, jak pomagamy Polakom kupować nieruchomości na Costa Blanca i skąd pochodzą publikowane dane rynkowe.",
  path: "/o-nas",
    locale,
  });
}

export default function AboutPage() {
  return (
    <Section className="pt-10">
      <article className="max-w-3xl space-y-5 text-[15px] leading-relaxed text-brand-800">
        <h1 className="text-3xl font-bold text-brand-950">O {SITE.brand}</h1>

        <p>
          {SITE.legalName} pomaga Polakom kupować apartamenty, wille i domy inwestycyjne na
          Costa Blanca. Łączymy lokalnych agentów w Hiszpanii z polskojęzyczną obsługą:
          analizą ROI, kosztów zakupu i weryfikacją prawną nieruchomości.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">Jak pracujemy</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Rozmowa o budżecie, celu zakupu i horyzoncie czasowym.</li>
          <li>Lista 3–5 ofert z ceną €/m² na tle mediany i wyliczonym ROI.</li>
          <li>Weryfikacja Nota Simple, obciążeń i zgodności z Catastro.</li>
          <li>Numer NIE, konto w hiszpańskim banku, notariusz i wpis do rejestru.</li>
          <li>Wsparcie po zakupie: zarządzanie najmem i rozliczenia podatkowe.</li>
        </ul>

        <h2 className="pt-4 text-xl font-bold text-brand-950">Skąd pochodzą dane na stronie</h2>
        <p>
          Mediany cen €/m², rentowność najmu, dynamika roczna i czas ekspozycji ofert są
          opracowywane wewnętrznie na podstawie ofert i transakcji z ostatnich 12 miesięcy dla
          dzielnic i urbanizacji Costa Blanca. Dane aktualizujemy miesięcznie i publikujemy datę
          odniesienia na każdej stronie. Nie stanowią one oferty inwestycyjnej ani tasación
          wymaganej przez bank. Nie publikujemy wymyślonych opinii klientów – sekcja referencji
          pozostaje ukryta do momentu zebrania zweryfikowanych realizacji.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">Model współpracy</h2>
        <p>
          Prowizję od transakcji pobiera agencja w Hiszpanii – kupujący nie płaci nam
          wynagrodzenia za wybór i analizę ofert. Dzięki temu naszym celem jest nieruchomość,
          która realnie pracuje na zwrot, a nie najdroższa pozycja w katalogu.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">Kontakt</h2>
        <p>
          Telefon: {SITE.phone} (pon.–pt. 9:00–20:00, sob. 10:00–14:00). E-mail:{" "}
          {SITE.email}. Adres: {SITE.address.street}, {SITE.address.postalCode}{" "}
          {SITE.address.city}.
        </p>
      </article>
    </Section>
  );
}
