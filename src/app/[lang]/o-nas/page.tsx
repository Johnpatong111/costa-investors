import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { assertLocale, type Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/seo/site";

/** Treść „O nas" w trzech językach. */
const COPY: Record<
  Locale,
  { title: string; intro: string; sections: { heading: string; paragraphs: string[] }[] }
> = {
  pl: {
    title: "O Costa Investors",
    intro:
      "Costa Investors pomaga inwestorom z Polski i Europy kupować nieruchomości na Costa Blanca i Costa Cálida. Łączymy lokalnych, licencjonowanych agentów z obsługą w Twoim języku.",
    sections: [
      {
        heading: "Jak pracujemy",
        paragraphs: [
          "Zbieramy Twoje preferencje w formularzu: budżet, cel zakupu, region i wymagania. Na tej podstawie dobieramy agenta, który zna wybraną miejscowość i przesyła dopasowane oferty.",
          "Nie pobieramy opłaty od kupującego. Wynagrodzenie rozliczamy z partnerską agencją po sfinalizowaniu transakcji.",
        ],
      },
      {
        heading: "Skąd pochodzą dane rynkowe",
        paragraphs: [
          "Publikujemy mediany cen ofertowych, rentowność najmu i dynamikę r/r dla 15 miejscowości i 70 dzielnic. Wartości są szacunkowe i aktualizowane razem z bazą danych rynku.",
          "Ceny nieruchomości w Hiszpanii wymagają doliczenia kosztów zakupu: ITP lub IVA, notariusz, rejestr i obsługa prawna to około 13,5% ceny.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: ["Pytania i zgłoszenia: contact@costainvestors.eu. Odpowiadamy w dni robocze."],
      },
    ],
  },
  en: {
    title: "About Costa Investors",
    intro:
      "Costa Investors helps investors from Poland and Europe buy property on Costa Blanca and Costa Cálida. We connect licensed local agents with service in your language.",
    sections: [
      {
        heading: "How we work",
        paragraphs: [
          "We collect your preferences in the form: budget, purchase goal, region and requirements. On that basis we match an agent who knows the chosen location and sends matched listings.",
          "Buyers never pay us a fee. We are remunerated by the partner agency after completion.",
        ],
      },
      {
        heading: "Where the market data comes from",
        paragraphs: [
          "We publish asking-price medians, rental yields and year-on-year growth for 15 locations and 70 districts. Figures are estimates and updated together with the market dataset.",
          "Property prices in Spain require purchase costs on top: ITP or VAT, notary, land registry and legal support add about 13.5% of the price.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Questions and enquiries: contact@costainvestors.eu. We reply on business days."],
      },
    ],
  },
  es: {
    title: "Sobre Costa Investors",
    intro:
      "Costa Investors ayuda a inversores de Polonia y Europa a comprar inmuebles en Costa Blanca y Costa Cálida. Conectamos agentes locales con licencia y atención en tu idioma.",
    sections: [
      {
        heading: "Cómo trabajamos",
        paragraphs: [
          "Recogemos tus preferencias en el formulario: presupuesto, objetivo de compra, región y requisitos. Con ello asignamos un agente que conoce la zona elegida y envía ofertas ajustadas.",
          "El comprador no nos paga honorarios. Nos remunera la agencia asociada tras cerrar la operación.",
        ],
      },
      {
        heading: "De dónde vienen los datos de mercado",
        paragraphs: [
          "Publicamos medianas de precios de oferta, rentabilidad del alquiler y crecimiento interanual de 15 localidades y 70 barrios. Son valores estimados y se actualizan con la base de datos.",
          "A los precios en España hay que sumar los gastos de compra: ITP o IVA, notaría, registro y soporte legal, en torno al 13,5% del precio.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: ["Preguntas y solicitudes: contact@costainvestors.eu. Respondemos en días laborables."],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const copy = COPY[locale];
  return buildMetadata({
    title: `${copy.title} | ${SITE.brand}`,
    description: copy.intro,
    path: "/o-nas",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = assertLocale((await params).lang);
  const copy = COPY[locale];

  return (
    <Section className="pt-10">
      <article className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-brand-800">
        <h1 className="text-3xl font-bold text-brand-950">{copy.title}</h1>
        <p>{copy.intro}</p>
        {copy.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="pt-4 text-xl font-bold text-brand-950">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </Section>
  );
}
