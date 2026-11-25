import type { Metadata } from "next";
import Link from "next/link";
import { LeadEngine } from "@/components/lead/lead-engine";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, ButtonLink, Card, Container, Section, SectionHeading } from "@/components/ui/primitives";
import type { FaqItem } from "@/lib/content/content-utils";
import { getCities } from "@/lib/data/repository";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import { formatEur, formatRate } from "@/lib/utils/format";

/**
 * ===========================================================================
 * NL MONEY PAGE: /nl/appartement-kopen-costa-blanca
 * ===========================================================================
 * GSC liet 22 vertoningen zien op "appartement kopen costa blanca" (positie
 * 25,6) zonder Nederlandstalige pagina. Deze landingspagina vangt die vraag
 * bewust op met eigen copy, actuele €/m²-data en de bestaande leadengine.
 *
 * De pagina staat buiten `[lang]`, omdat het project alleen PL/EN/ES als
 * volwaardige locales heeft. Formulierlabels blijven Engels; in het vrije
 * veld kan de bezoeker gewoon Nederlands schrijven.
 */

const PATH = "/nl/appartement-kopen-costa-blanca";
const TITLE = "Appartement kopen Costa Blanca | Prijzen, ROI en kosten";
const DESCRIPTION =
  "Appartement kopen op de Costa Blanca: actuele €/m²-prijzen, bruto huurrendement, aankoopkosten en NIE. Ontvang 3-5 passende woningen van een lokale agent.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "appartement kopen costa blanca",
    "appartement costa blanca",
    "huis kopen spanje",
    "investeren costa blanca",
    "nie nummer spanje",
  ],
  alternates: {
    canonical: absoluteUrl(PATH),
    languages: {
      nl: absoluteUrl(PATH),
      en: absoluteUrl("/en/apartments-for-sale"),
      es: absoluteUrl("/es/apartamentos-en-venta"),
      pl: absoluteUrl("/pl/apartamenty-na-sprzedaz"),
      "x-default": absoluteUrl("/pl/apartamenty-na-sprzedaz"),
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE.brand,
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    images: SITE.ogImage
      ? [{ url: absoluteUrl(SITE.ogImage), width: 1200, height: 630, alt: TITLE }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE.ogImage ? { images: [absoluteUrl(SITE.ogImage)] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const FAQ: FaqItem[] = [
  {
    question: "Wat kost een appartement kopen op de Costa Blanca?",
    answer:
      "De mediane vraagprijs ligt rond de €2.200 per m², maar dat verschilt sterk per stad. In Torrevieja en Orihuela Costa vind je vaak appartementen vanaf €120.000; in Alicante, Calpe of Jávea liggen de prijzen hoger. Reken bovenop de vraagprijs op 13-14% aankoopkosten.",
  },
  {
    question: "Heb ik als Nederlander een NIE-nummer nodig?",
    answer:
      "Ja. Een NIE (Número de Identificación de Extranjero) heb je nodig voor de notaris, de eigendomsregistratie, de bank en de belastingen. Je kunt het aanvragen via een Spaans consulaat of met een lokaal gemachtigde. Zonder NIE kun je een woning niet definitief op jouw naam zetten.",
  },
  {
    question: "Welke kosten komen bovenop de vraagprijs?",
    answer:
      "Bij een bestaande woning betaal je in de Comunidad Valenciana 10% ITP. Bij nieuwbouw is dat 10% IVA plus AJD. Daarnaast komen notariskosten, inschrijving in het Registro de la Propiedad, juridische begeleiding en eventueel een taxatie. Totaal meestal 13-14% van de koopprijs.",
  },
  {
    question: "Kun je een appartement op de Costa Blanca verhuren?",
    answer:
      "Ja, maar de regels verschillen per gemeente en per gebouw. Voor toeristische verhuur is vaak een licencia turística nodig; sommige comunidades hebben extra beperkingen. Laat de huurregels en de statuten van de comunidad altijd vóór de aankoop controleren.",
  },
  {
    question: "Wat is een realistisch huurrendement?",
    answer:
      "In onze dataset ligt het bruto huurrendement in de meeste kuststeden tussen ongeveer 4% en 7% per jaar. Het nettoresultaat hangt af van aankoopkosten, comunidad, onderhoud, leegstand, belastingen en beheer. Gebruik de cijfers als vertrekpunt, niet als garantie.",
  },
  {
    question: "Heb ik een buyer's agent nodig?",
    answer:
      "Verplicht is het niet, maar een lokale buyer's agent controleert de Nota Simple, eigendomssituatie, schulden aan de comunidad en bouwkundige risico's. Wij koppelen je aan een erkende partner en rekenen geen commissie aan de koper.",
  },
  {
    question: "Wat is een goed verhuurrendement in Spanje?",
    answer:
      "Een bruto huurrendement van 4% tot 7% is op de Costa Blanca realistisch, afhankelijk van stad, ligging en type woning. Na aftrek van comunidad, IBI, onderhoud, beheer, belastingen en leegstand blijft vaak ongeveer 3,5% tot 4,5% netto over. Gebruik het bruto cijfer alleen om locaties te vergelijken.",
  },
  {
    question: "Wat kost verhuur op de Costa Blanca?",
    answer:
      "Naast de hypotheek betaal je comunidad, IBI, verzekering, onderhoud en eventueel beheer. Bij toeristische verhuur komen schoonmaak, marketing en lokale toeristenbelasting bij. Vraag vóór de aankoop na welke regels in de gemeente en het gebouw gelden.",
  },
];

export default function DutchCostaBlancaPage() {
  const cities = getCities();
  const topCities = cities.filter((city) => city.tier === 1).slice(0, 8);
  const median =
    cities.reduce((sum, city) => sum + city.pricePerM2, 0) / Math.max(cities.length, 1);
  const averageYield =
    cities.reduce((sum, city) => sum + city.rentalYield, 0) / Math.max(cities.length, 1);

  const jsonLd = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Costa Investors",
          item: absoluteUrl("/en"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Appartement kopen Costa Blanca",
          item: absoluteUrl(PATH),
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl(PATH)}#service`,
      name: "Appartement kopen op de Costa Blanca",
      serviceType: "Buyer's agent voor appartementen op de Costa Blanca",
      description: DESCRIPTION,
      url: absoluteUrl(PATH),
      inLanguage: "nl",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: ["Costa Blanca", "Costa Cálida"].map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        description: "Vanaf €120.000",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE.url}/#organization` },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl(PATH)}#faq`,
      inLanguage: "nl",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];


  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
        />
        <Container className="relative grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold tracking-wide text-accent-300 uppercase">
              Costa Blanca · Costa Cálida · Spanje
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.7rem]">
              Appartement kopen op de Costa Blanca. Met prijzen, ROI en kosten
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">
              Oriënteer je met echte €/m²-prijzen, bruto huurrendement en de volledige
              aankoopkosten. Je aanvraag gaat naar een erkende lokale agent met concrete
              woningen - zonder aankoopcommissie voor jou.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                "vanaf €120.000",
                `mediaan ${formatEur(Math.round(median))}/m²`,
                `${cities.length} gemeenten`,
                `bruto ROI circa ${formatRate(averageYield)}`,
              ].map((chip) => (
                <li key={chip}>
                  <Badge tone="brand" className="bg-white/10 ring-white/20">
                    <span aria-hidden className="text-accent-300">
                      ✓
                    </span>
                    {chip}
                  </Badge>
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-xl text-xs leading-relaxed text-brand-300">
              Cijfers zijn vraagprijzen en modelmatige bruto rendementen. Geen garantie
              van rendement of een formeel aanbod.
            </p>
          </div>

          <div id="lead-form" className="scroll-mt-24 rounded-2xl bg-white p-4 text-brand-950 shadow-2xl">
            <LeadEngine
              cityName=""
              sourceKey="nl-appartement-kopen-costa-blanca"
              language="en"
              hideCalculator
              heading="Ontvang 3-5 passende appartementen met ROI-analyse"
              subheading="Deel je budget en voorkeuren. Een lokale agent neemt binnen 24 uur contact op. Het formulier is in het Engels; je kunt in het vrije veld Nederlands schrijven."
            />
          </div>
        </Container>
      </section>


      <Section>
        <SectionHeading eyebrow="Marktcijfers">Wat kost een appartement op de Costa Blanca?</SectionHeading>
        <p className="-mt-4 mb-6 max-w-3xl text-sm leading-relaxed text-brand-700">
          De mediane vraagprijs in onze dataset is ongeveer {formatEur(Math.round(median))}
          per m². Kuststeden met veel internationale vraag hebben vaak een hogere prijs
          per m², maar ook meer verhuurmogelijkheden. Onderstaande steden zijn een
          vertrekpunt; de exacte prijs verschilt per wijk, ligging en staat van de woning.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-brand-100">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Stad</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Prijs €/m²</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Bruto ROI</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Prijsgroei</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">€120k koopt ongeveer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {topCities.map((city) => (
                <tr key={city.slug} className="bg-white">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <Link
                      href={`/en/apartments-for-sale/${city.slug}`}
                      className="text-brand-900 underline decoration-brand-200 underline-offset-2 hover:text-brand-950 hover:decoration-brand-600"
                    >
                      {city.name}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{formatEur(city.pricePerM2)}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-accent-700">
                    {formatRate(city.rentalYield)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{city.priceGrowth.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {Math.round(120_000 / Math.max(city.pricePerM2, 1))} m²
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-brand-500">
          Bron: eigen marktdataset, update {new Date().getFullYear()}. Vraagprijzen zijn
          geen transactieprijzen en kunnen per object afwijken.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href="/en/property-prices">Alle prijzen per regio</ButtonLink>
          <ButtonLink href="#lead-form" variant="secondary">
            Ontvang passende woningen
          </ButtonLink>
        </div>
      </Section>


      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow="Aankoopkosten">Reken op 13-14% bovenop de vraagprijs</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "10% ITP of IVA",
              body: "Bestaande woning: ITP in de Comunidad Valenciana. Nieuwbouw: 10% IVA plus AJD. Dit is de grootste kostenpost.",
            },
            {
              title: "Notaris en registratie",
              body: "Notariskosten, Registro de la Propiedad en administratieve afhandeling. Meestal zo'n 1-2% van de koopprijs.",
            },
            {
              title: "Juridische controle",
              body: "Nota Simple, eigendom, schulden aan de comunidad en bouwkundige risico's. Laat dit vóór de aanbetaling controleren.",
            },
            {
              title: "NIE en bank",
              body: "Een NIE is verplicht. Een Spaanse bankrekening maakt betalingen, lasten en belastingen eenvoudiger.",
            },
            {
              title: "Taxatie en financiering",
              body: "Bij een hypotheek betaal je taxatie- en bankkosten. Reken ook op tijd voor goedkeuring en notarisafspraak.",
            },
            {
              title: "Jaarlijkse lasten",
              body: "IBI (onroerendgoedbelasting), comunidad, verzekering, onderhoud en inkomstenbelasting over verhuur.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Waarom de Costa Blanca">Zon, vraag en bereikbaarheid</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Het hele jaar vraag",
              body: "De regio heeft naast vakantiegangers ook een groeiende groep vaste bewoners en remote workers. Dat ondersteunt de vraag naar huurwoningen buiten het hoogseizoen.",
            },
            {
              title: "Directe vluchten",
              body: "Alicante is vanuit Nederland en België goed bereikbaar. Dat maakt oriëntatie, verhuur en eigen gebruik praktisch.",
            },
            {
              title: "Duidelijke prijsverschillen",
              body: "Tussen strand, stad en binnenland kunnen de €/m²-prijzen flink verschillen. Een goede selectie op wijk is belangrijker dan alleen naar de stad kijken.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>


      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow="Verhuurrendement">Wat is een realistisch huurrendement op de Costa Blanca?</SectionHeading>
        <p className="-mt-4 mb-6 max-w-3xl text-sm leading-relaxed text-brand-700">
          Het bruto huurrendement is de jaarhuur gedeeld door de koopprijs. Bij een
          appartement van €250.000 met €1.100 huur per maand is dat €13.200 per jaar,
          ofwel 5,3% bruto. Het nettoresultaat ligt lager: comunidad, IBI, onderhoud,
          verzekering, beheer en leegstand gaan er nog vanaf. Reken in de praktijk op
          ongeveer 3,5% tot 4,5% netto in goede kustlocaties, afhankelijk van het pand
          en de verhuurvorm.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Bruto rendement",
              body: "Jaarhuur gedeeld door de aankoopprijs. Nuttig om steden te vergelijken, maar het zegt niets over wat je overhoudt.",
            },
            {
              title: "Netto rendement",
              body: "Na aftrek van comunidad, IBI, onderhoud, verzekering, beheer, belastingen en leegstand. Dit is het getal dat voor je bankrekening telt.",
            },
            {
              title: "Verhuurregels",
              body: "Toeristische verhuur vraagt vaak een licencia turística; sommige gemeenten en comunidades beperken het aantal nachten of verhuren.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-brand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">{item.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-brand-700">
          Wil je het rendement van een specifieke stad of wijk zien? Bekijk de{" "}
          <Link href="/en/property-prices" className="font-semibold text-brand-900 underline underline-offset-2">
            prijzen en ROI per regio
          </Link>
          . De cijfers zijn een vertrekpunt; wij rekenen met jouw budget en kosten door in
          de leadanalyse.
        </p>
      </Section>

      <Section className="bg-brand-50/60">
        <SectionHeading eyebrow="Werkwijze">Van oriëntatie tot sleutel</SectionHeading>
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            {
              title: "1. Budget en doel",
              body: "Bepaal of je voor verhuur, eigen gebruik of verhuizing koopt. Dat verandert de beste regio en het type woning.",
            },
            {
              title: "2. Selectie en bezichtiging",
              body: "Je ontvangt een shortlist met prijs per m² tegen de lokale mediaan. Bezichtig op locatie of via video.",
            },
            {
              title: "3. Juridische check en NIE",
              body: "De Nota Simple, eigendomssituatie en lasten worden gecontroleerd. Daarna volgt de aanbetaling en het NIE-traject.",
            },
            {
              title: "4. Notaris en sleutel",
              body: "De escritura wordt ondertekend, de eigendom ingeschreven en de sleutels overgedragen. Wij leggen elke stap uit.",
            },
          ].map((step) => (
            <li key={step.title} className="rounded-2xl border border-brand-100 bg-white p-5">
              <h3 className="text-base font-bold text-brand-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqAccordion items={FAQ} title="Appartement kopen op de Costa Blanca: veelgestelde vragen" />

      <Section>
        <SectionHeading eyebrow="Verder oriënteren">Handige vervolgstappen</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/en/apartments-for-sale"
            className="rounded-2xl border border-brand-100 bg-white p-5 transition-colors hover:border-brand-300"
          >
            <p className="text-sm font-semibold text-brand-950">English service page</p>
            <p className="mt-1 text-sm text-brand-700">
              Apartments for sale on the Costa Blanca with prices and yields.
            </p>
          </Link>
          <Link
            href="/en/property-prices"
            className="rounded-2xl border border-brand-100 bg-white p-5 transition-colors hover:border-brand-300"
          >
            <p className="text-sm font-semibold text-brand-950">Prijzen per stad</p>
            <p className="mt-1 text-sm text-brand-700">
              €/m²-prijzen en ROI per gemeente en wijk.
            </p>
          </Link>
          <Link
            href="/es/apartamentos-en-venta"
            className="rounded-2xl border border-brand-100 bg-white p-5 transition-colors hover:border-brand-300"
          >
            <p className="text-sm font-semibold text-brand-950">Versión en español</p>
            <p className="mt-1 text-sm text-brand-700">
              Apartamentos en venta en Costa Blanca y Costa Cálida.
            </p>
          </Link>
        </div>
      </Section>

      <JsonLd nodes={jsonLd} />
    </>
  );
}

