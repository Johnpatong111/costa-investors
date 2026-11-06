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
  title: "Regulamin serwisu",
  description:
    "Zasady korzystania z serwisu, charakter publikowanych danych rynkowych i tryb składania reklamacji.",
  path: "/regulamin",
    locale,
  });
}

export default function TermsPage() {
  return (
    <Section className="pt-10">
      <article className="max-w-3xl space-y-5 text-[15px] leading-relaxed text-brand-800">
        <h1 className="text-3xl font-bold text-brand-950">Regulamin serwisu</h1>
        <p className="text-sm text-brand-600">
          Operator: {SITE.legalName}. Regulamin obowiązuje od 1 stycznia {SITE.year} r.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">1. Charakter serwisu</h2>
        <p>
          Operatorem portalu Costa Investors jest Costa Investors. Zgłoszenia z formularza
          obsługujemy we współpracy ze zweryfikowanymi partnerami i licencjonowanymi
          agentami nieruchomości w Hiszpanii, którzy przedstawiają ofertę i prowadzą
          klienta przez proces zakupu. W sprawach technicznych i prawnych kontakt:
          contact@costainvestors.eu.
        </p>
        <p>
          Serwis ma charakter informacyjny i służy do prezentacji oferty skupu nieruchomości
          oraz danych rynkowych. Publikowane ceny, mediany i wskaźniki są wartościami
          szacunkowymi, opracowanymi na podstawie ofert i transakcji z danego okresu. Nie
          stanowią wyceny w rozumieniu ustawy o gospodarce nieruchomościami i nie mogą być
          podstawą do ustalania ceny w akcie notarialnym bez odrębnej umowy.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">2. Zgłoszenia</h2>
        <p>
          Wysłanie formularza nie tworzy zobowiązania do zawarcia umowy po żadnej ze stron.
          Oferta zakupu nieruchomości jest przygotowywana indywidualnie, po weryfikacji
          dokumentów i oględzinach, i przekazywana na piśmie.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">3. Odpowiedzialność</h2>
        <p>
          Operator dokłada starań, aby dane były aktualne, ale nie odpowiada za decyzje
          podjęte wyłącznie na ich podstawie. Linki do serwisów zewnętrznych prowadzą do
          treści osób trzecich. Operator nie kontroluje ich zawartości.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">4. Reklamacje</h2>
        <p>
          Reklamacje dotyczące działania serwisu można składać na adres {SITE.email}.
          Rozpatrujemy je w terminie 14 dni od otrzymania zgłoszenia, odpowiadając na
          wskazany adres e-mail.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">5. Prawa autorskie</h2>
        <p>
          Treści, układ stron i opracowania danych są chronione prawem autorskim. Kopiowanie
          ich w całości lub w istotnej części bez zgody operatora jest niedozwolone.
        </p>
      </article>
    </Section>
  );
}
