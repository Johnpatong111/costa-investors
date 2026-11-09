import type { ServiceDefinition } from "../data/services";
import type { ContentBlock } from "./content-utils";

/**
 * Bloki treści money page (rynek hiszpański):
 * rynek → ROI → koszty i podatki → profil kupującego.
 * Każdy blok wnosi inną informację; boilerplate usługi jest ograniczony.
 */
export function buildDistrictBlocks(
  service: ServiceDefinition,
  t: (template: string) => string,
  vars: Record<string, string>,
): ContentBlock[] {
  return [
    {
      id: "rynek",
      heading: `Rynek ${vars.propertyGen} w ${vars.districtLoc}: ${vars.year}`,
      paragraphs: [
        t(
          "W {districtLoc} dominują {characteristic}. Kupujący z Polski zwracają uwagę przede wszystkim na {landmark} oraz {landmark2}, a dopiero potem na metraż. Dlatego oferty z widokiem lub bliskością plaży utrzymują wyższą cenę.",
        ),
        t(
          "Mediana ofertowa wynosi tu {price} €/m², czyli {pricePosition}. W ujęciu rocznym {growthSentence}. Dla lokalu 70 m² daje to wartość około {budget70} przed uwzględnieniem kosztów transakcyjnych.",
        ),
      ],
    },
    {
      id: "roi",
      heading: `Ile zarobisz na najmie w ${vars.districtLoc}`,
      paragraphs: [
        t(
          "Mediana czynszu to {rent} €/m²/mies., co przy cenie {price} €/m² daje {yieldSentence}. Dla mieszkania 70 m² oznacza to około {rent70} € przychodu rocznie brutto i {rentNet70} € po kosztach zarządzania, podatku i pustostanach.",
        ),
        t(
          "Sumując czynsz i wzrost wartości, inwestycja 250 000 € w {districtLoc} generuje w 5-letnim horyzoncie około {return5y} € łącznego zwrotu, czyli {returnPercent}% budżetu. To model, nie gwarancja. Przed zakupem weryfikujemy konkretną nieruchomość.",
        ),
      ],
      bullets: [
        t("Cena: {price} €/m²"),
        t("Czynsz: {rent} €/m²/mies."),
        t("ROI brutto: {yield} (netto ok. {netYield})"),
        t("Wzrost cen: {growth} r/r"),
        t("Czas ekspozycji oferty: {days} dni"),
      ],
    },
    {
      id: "koszty",
      heading: "Koszty zakupu i podatki w Hiszpanii",
      paragraphs: [
        t(
          "Do ceny nieruchomości dolicz około {purchaseCosts}: podatek ITP 10% przy rynku wtórnym (przy nowym lokalu IVA 10% i AJD), taksę notarialną, wpis do Registro de la Propiedad oraz obsługę prawną. Bez numeru NIE nie sfinalizujesz zakupu, a bez hiszpańskiego konta nie opłacisz bieżących rachunków.",
        ),
      ],
      bullets: service.checklist.map((item) => t(item)),
    },
    {
      id: "kupujacy",
      heading: `Kto kupuje ${vars.property} w ${vars.districtLoc}`,
      paragraphs: [
        t(
          "W {cityLoc} {foreign} kupujących to obcokrajowcy, w tym {polish} z Polski. Przewaga kupujących zagranicznych oznacza płynny rynek wyjścia, ale też konkurencję o najlepsze lokale. Dlatego oferty w {districtLoc} znikają średnio w {days} dni.",
        ),
        t(
          "W {districtLoc} liczy się przede wszystkim {characteristic2}, a w drugiej kolejności {landmark2}. Ta {districtType} leży w części {subregion}, więc najem sezonowy uzupełnia się tu z najmem długoterminowym, co stabilizuje obłożenie poza wakacjami.",
        ),
      ],
    },
    {
      // Blok liczbowy: wartości są różne dla każdej dzielnicy, więc wnosi nowe
      // tokeny do treści i realnie obniża podobieństwo między stronami.
      id: "dane",
      heading: `Wskaźniki ${vars.districtLoc} w liczbach`,
      paragraphs: [
        t(
          "Cena {price} €/m², czynsz {rent} €/m²/mies., ROI brutto {yield} i netto {netYield}, wzrost {growth} r/r, ekspozycja oferty {days} dni, koszty wejścia {purchaseCosts}, budżet 70 m² {budget70}.",
        ),
      ],
    },
  ];
}
