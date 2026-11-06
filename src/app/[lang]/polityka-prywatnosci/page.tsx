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
  title: "Polityka prywatności i informacja RODO",
  description:
    "Jakie dane zbieramy w formularzu wyceny, w jakim celu, jak długo je przechowujemy i jakie masz prawa (RODO).",
  path: "/polityka-prywatnosci",
    locale,
  });
}

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-10">
      <article className="max-w-3xl space-y-5 text-[15px] leading-relaxed text-brand-800">
        <h1 className="text-3xl font-bold text-brand-950">Polityka prywatności</h1>
        <p className="text-sm text-brand-600">
          Administratorem danych jest {SITE.legalName}. Kontakt w sprawach danych osobowych: {SITE.email}.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">1. Zakres danych</h2>
        <p>
          W formularzu zbieramy: imię i nazwisko, numer telefonu, opcjonalnie e-mail,
          informacje o nieruchomości (typ, metraż, lokalizacja, stan prawny, termin
          sprzedaży) oraz treść wiadomości. Technicznie zapisujemy również hash adresu IP,
          nagłówek przeglądarki i adres strony źródłowej. Wyłącznie w celu
          zabezpieczenia formularza przed spamem i nadużyciami.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">2. Cel i podstawa prawna</h2>
        <p>
          Dane przetwarzamy na podstawie art. 6 ust. 1 lit. A RODO (zgoda) w celu kontaktu
          i przygotowania oferty zakupu nieruchomości, a w przypadku zawarcia umowy. Na
          podstawie art. 6 ust. 1 lit. B RODO (wykonanie umowy). Zgoda marketingowa jest
          dobrowolna i niezależna od zgody na kontakt w sprawie wyceny.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">3. Odbiorcy danych</h2>
        <p>
          Administratorem danych jest Costa Investors. Dane przesłane formularzem (imię,
          adres e-mail, budżet, preferencje zakupowe oraz adres podstrony, z której
          wysłano zgłoszenie) przekazujemy wyłącznie zweryfikowanym partnerom i
          licencjonowanym agentom nieruchomości działającym w Hiszpanii, i wyłącznie w
          celu przedstawienia oferty oraz obsługi procesu zakupu. Nie sprzedajemy danych
          podmiotom trzecim ani nie wykorzystujemy ich do celów niepowiązanych z
          zapytaniem. Kontakt w sprawach danych osobowych: contact@costainvestors.eu.
        </p>
        <p>
          Dane mogą być przekazane wyłącznie podmiotom wspierającym obsługę zgłoszeń:
          dostawcy hostingu, dostawcy poczty transakcyjnej, operatorowi SMS oraz
          partnerowi handlowemu prowadzącemu rozmowę w Twojej sprawie. Nie sprzedajemy
          danych i nie przekazujemy ich podmiotom trzecim w celach marketingowych bez
          Twojej zgody.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">4. Okres przechowywania</h2>
        <p>
          Zgłoszenia bez zawartej umowy przechowujemy do 24 miesięcy od ostatniego
          kontaktu, chyba że wcześniej wycofasz zgodę. Dane związane z zawartą umową
          przechowujemy przez okres wymagany przepisami podatkowymi i księgowymi.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">5. Twoje prawa</h2>
        <p>
          Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia
          przetwarzania, przenoszenia oraz wniesienia sprzeciwu. Zgodę możesz wycofać w
          dowolnym momencie, wysyłając wiadomość na {SITE.email}. Masz też prawo wniesienia
          skargi do Prezesa Urzędu Ochrony Danych Osobowych.
        </p>

        <h2 className="pt-4 text-xl font-bold text-brand-950">6. Pliki cookies</h2>
        <p>
          Serwis nie używa plików cookies marketingowych bez zgody. Stosujemy wyłącznie
          niezbędne mechanizmy techniczne oraz. Po wyrażeniu zgody. Narzędzia
          analityczne mierzące skuteczność stron (bez profilowania reklamowego).
        </p>
      </article>
    </Section>
  );
}
