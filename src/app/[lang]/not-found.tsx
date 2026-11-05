import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/primitives";
import { PRIMARY_SERVICE } from "@/lib/data/services";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
        Błąd 404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
        Nie znaleźliśmy tej strony
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-brand-700">
        Adres mógł się zmienić (np. nazwa dzielnicy) albo lokalizacja nie jest jeszcze
        objęta naszą bazą. Sprawdź dostępne miasta lub wyślij zgłoszenie – wycenimy
        nieruchomość w dowolnej lokalizacji w Polsce.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={`/${PRIMARY_SERVICE.slug}`}>
          {PRIMARY_SERVICE.name} – cała Polska
        </ButtonLink>
        <ButtonLink href="/" variant="ghost">
          Strona główna
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-brand-600">
        Szukasz raportu cenowego?{" "}
        <Link href="/ceny-m2" className="font-semibold underline underline-offset-2">
          Zobacz indeks cen m²
        </Link>
      </p>
    </Container>
  );
}
