import type { CitySeed, DistrictSeed, RegionSeed } from "../data/schema";
import type { ServiceDefinition } from "../data/services";
import type { MarketStats } from "./market-stats";
import type { ContentBlock } from "./content-utils";
import { pick } from "./deterministic";
import {
  demandTier,
  foreignTier,
  growthTier,
  liquidityTier,
  pickByTier,
  priceTier,
  yieldTier,
} from "./content-tiers";
import { regionTax } from "./region-facts";
import { formatEur, formatRate } from "../utils/format";
import { rotateItems } from "./district-deep-dive";

/**
 * ===========================================================================
 * BLOKI MONEY PAGE (PL): rynek → okolica → ROI → koszty → kupujący → dane
 * ===========================================================================
 * Dlaczego tyle wariantów: walidator i Google normalizują liczby, więc strony
 * różniące się tylko medianą są duplikatem. Tutaj każde zdanie ma 3-4 warianty
 * wybierane przez kubełek danych (faktograficznie) albo deterministycznie
 * (styl), a lista cech i punktów orientacyjnych wnosi nazwy własne dzielnicy.
 */

export interface DistrictBlockContext {
  service: ServiceDefinition;
  stats: MarketStats;
  city: CitySeed;
  district: DistrictSeed;
  region: RegionSeed;
  key: string;
  vars: Record<string, string>;
  t: (template: string) => string;
}

/** „A, B i C” - poprawna polska wyliczanka. */
function plList(items: string[]): string {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0] as string;
  return `${clean.slice(0, -1).join(", ")} i ${clean[clean.length - 1]}`;
}

export function buildDistrictBlocks(ctx: DistrictBlockContext): ContentBlock[] {
  const { service, stats, city, district, region, key, vars, t } = ctx;

  const characteristics = district.characteristics;
  const landmarks = district.landmarks;

  // Dzielnice siostrzane: realne porównanie cenowe w obrębie gminy.
  const siblings = city.districts
    .filter((item) => item.slug !== district.slug)
    .slice()
    .sort(
      (a, b) =>
        Math.abs(a.pricePerM2 - stats.pricePerM2) - Math.abs(b.pricePerM2 - stats.pricePerM2),
    )
    .slice(0, 3);

  const siblingBullets = siblings.map(
    (item) => `${item.name}: ${formatEur(item.pricePerM2)}/m² · ROI ${formatRate(item.rentalYield)}`,
  );

  const cheaperSibling = siblings.find((item) => item.pricePerM2 < stats.pricePerM2);
  const pricierSibling = siblings.find((item) => item.pricePerM2 > stats.pricePerM2);

  const tax = regionTax(region.slug);
  const taxNote = t(`Na rynku wtórnym płacisz ITP ${tax.itp}% (${tax.authority})`);

  // Zdanie „pod intencję” usługi. Bez niego strony tej samej dzielnicy dla
  // różnych usług różniły się tylko blokiem usługi (~15% tekstu) i wypadały
  // najwyżej w audycie podobieństwa.
  const serviceAngle: Record<string, string> = {
    buy: t(
      `Zestawienie dla kupującego na własne potrzeby: porównaj {price} €/m² z kosztami utrzymania i sprawdź, czy budżet na 70 m² ({budget70}) jest w {districtLoc} realny.`,
    ),
    villa: t(
      `Perspektywa domu z basenem: w {districtLoc} działka i basen podnoszą koszt wejścia, ale też stawkę najmu sezonowego - dlatego ROI liczymy tu od wartości nieruchomości, a nie od metrażu.`,
    ),
    investment: t(
      `Perspektywa inwestora: w {districtLoc} liczy się nie tylko {yield} brutto, ale i czas wyjścia - przy ekspozycji {days} dni i popycie {demand}/10 płynność jest ${stats.avgDaysOnMarket <= 100 ? "ponadprzeciętna" : "przeciętna na tle regionu"}.`,
    ),
    "lead-magnet": t(
      `Punkt wyjścia do wyceny: zanim zamówisz analizę konkretnego mieszkania w {districtLoc}, sprawdź medianę ({price} €/m²), koszty wejścia ({purchaseCosts}) i widełki najmu ({rent} €/m²/mies.).`,
    ),
  };

  const openings = [
    t(
      `W {districtLoc} dominują {characteristic}, a kupujący najczęściej dopytują o {landmark}. To {districtType} w części {subregion}, gdzie {characteristic2} przekłada się wprost na stawkę za metr.`,
    ),
    t(
      `{districtLoc} to {districtType} w {subregion}, rozpoznawalna przede wszystkim dzięki {landmark}. Zabudowę opisują {characteristic} oraz {characteristic2}, co zawęża grono kupujących do osób szukających konkretnego standardu.`,
    ),
    t(
      `Zanim porównasz ceny w {districtLoc}, warto wiedzieć jedno: {characteristic}. Bliskość {landmark} i {landmark2} podnosi atrakcyjność najmu, ale podnosi też koszty wspólnoty - i to one często decydują o realnym zwrocie.`,
    ),
  ];

  const priceSentences = [
    t(
      `Mediana ofertowa {price} €/m² jest wyraźnie niższa od średniej miasta ({cityPrice} €/m²). Kupujesz więcej metrów za ten sam budżet, ale zwykle kosztem odległości od plaży albo roku budowy.`,
    ),
    t(
      `Mediana {price} €/m² biegnie równo z medianą miasta ({cityPrice} €/m²). Wybór sprowadza się więc do standardu i roku budowy, a nie do samej lokalizacji.`,
    ),
    t(
      `Mediana {price} €/m² przewyższa średnią miasta ({cityPrice} €/m²). Nadwyżkę płaci się za konkretną lokalizację: {landmark} i {characteristic}.`,
    ),
    t(
      `Stawka {price} €/m² to górna półka regionu ({regionPrice} €/m² dla {region}). W tym segmencie o cenie decyduje widok, linia zabudowy i rok oddania, a nie metraż.`,
    ),
  ];

  const growthSentences = [
    t(`Ceny w ujęciu rocznym praktycznie stoją ({growth} r/r), więc jest przestrzeń negocjacyjna.`),
    t(`Rynek rośnie spokojnie: {growth} r/r, bez presji na kupującego.`),
    t(`Dynamika jest wyraźna: {growth} r/r, powyżej średniej regionu.`),
    t(`To jeden z najszybciej drożejących adresów w okolicy: {growth} r/r.`),
  ];

  const yieldSentences = [
    t(
      `Rentowność brutto {yield} nie rzuca na kolana, za to lokalizacja broni się wzrostem wartości. Przy medianie czynszu {rent} €/m²/mies. netto schodzi do {netYield}.`,
    ),
    t(
      `Rentowność brutto {yield} przy czynszu {rent} €/m²/mies. to poziom, który po kosztach daje {netYield} netto.`,
    ),
    t(
      `{yield} brutto i {netYield} netto przy medianie czynszu {rent} €/m²/mies. - w tej części {cityGen} najem pokrywa większość kosztów utrzymania.`,
    ),
    t(
      `Wynik {yield} brutto ({netYield} netto) należy do najlepszych w regionie. Czynsz {rent} €/m²/mies. utrzymuje się dzięki temu, że w okolicy dominują {characteristic}.`,
    ),
  ];

  const costVariants = [
    t(
      `Do ceny dolicz {purchaseCosts} kosztów transakcyjnych. ${taxNote}, do tego notariusz, Registro de la Propiedad i obsługa prawna.`,
    ),
    t(
      `${taxNote} - to największa pozycja w kosztach wejścia, razem około {purchaseCosts}. Reszta to notariusz, wpis do rejestru i prawnik.`,
    ),
    t(
      `Budżet zamyka się dopiero po doliczeniu {purchaseCosts}. ${taxNote}; przy nowym lokalu dochodzi IVA 10% i AJD.`,
    ),
  ];

  const buyerSentences = [
    t(
      `Kupujący zagraniczni to {foreign} nabywców w {cityLoc}, z czego {polish} stanowią Polacy. Rynek jest więc w dużej mierze lokalny, a ceny mniej podatne na modę.`,
    ),
    t(
      `Obcokrajowcy odpowiadają za {foreign} transakcji w {cityLoc}; Polacy to {polish} z tego grona. To wystarczający udział, by mówić o płynnym rynku wtórnym.`,
    ),
    t(
      `W {cityLoc} {foreign} kupujących przyjeżdża z zagranicy, a {polish} to Polacy. Taki miks oznacza, że wyjście z inwestycji nie zależy od jednego rynku.`,
    ),
    t(
      `Popyt zagraniczny ({foreign}, w tym {polish} z Polski) jest tu motorem obrotu. Kupujący szukają {characteristic} blisko {landmark}, dlatego oferty w tej lokalizacji schodzą szybciej niż wynosi średnia.`,
    ),
  ];

  const demandSentences = [
    t(`Popyt oceniamy jako umiarkowany (wskaźnik {demand}/10), więc jest miejsce na negocjacje.`),
    t(`Popyt jest stabilny (wskaźnik {demand}/10) - typowy rynek drugiego domu.`),
    t(`Popyt jest wysoki (wskaźnik {demand}/10), a oferty rozchodzą się szybko.`),
    t(
      `Popyt jest bardzo wysoki (wskaźnik {demand}/10). Dobre lokale znikają z portali w kilka tygodni.`,
    ),
  ];

  const liquiditySentences = [
    t(`Mediana ekspozycji oferty to {days} dni - jedno z najkrótszych temp w regionie.`),
    t(`Mediana ekspozycji oferty to {days} dni, czyli tempo zbliżone do średniej regionalnej.`),
    t(
      `Oferta leży na rynku średnio {days} dni, co zwykle oznacza, że cena wyjściowa była przeszacowana.`,
    ),
    t(
      `Mediana ekspozycji to {days} dni - tu liczy się cierpliwość albo realna wycena od pierwszego dnia.`,
    ),
  ];

  const okolicaParagraphs = [
    t(
      `Zabudowa: ${plList(characteristics)}. Typ lokalizacji: {districtType}. Punkty orientacyjne, które przewijają się w ogłoszeniach: ${plList(landmarks)}. W praktyce to one decydują o różnicy w cenie pomiędzy dwiema nieruchomościami o tym samym metrażu w ${district.name}.`,
    ),
    t(
      `W ${district.name} liczy się ${plList(characteristics)}. Do tego dochodzą ${plList(landmarks)} - miejsca, które najemcy sprawdzają w pierwszej kolejności. Administracyjnie i komunikacyjnie obszar obsługuje ${city.name} w części ${city.subregion}.`,
    ),
    t(
      `Opis w dwóch zdaniach: ${plList(characteristics)} oraz bezpośredni dostęp do ${plList(landmarks)}. Taki profil - ${district.type} w części ${city.subregion} - sprawia, że najem sezonowy i długoterminowy wzajemnie się uzupełniają.`,
    ),
  ];

  const siblingSentences: string[] = [];
  if (cheaperSibling) {
    siblingSentences.push(
      `Taniej w tej samej gminie jest w ${cheaperSibling.name} (${formatEur(cheaperSibling.pricePerM2)} €/m², ROI ${formatRate(cheaperSibling.rentalYield)}).`,
    );
  }
  if (pricierSibling) {
    siblingSentences.push(
      `Droższy segment to ${pricierSibling.name} z medianą ${formatEur(pricierSibling.pricePerM2)} €/m².`,
    );
  }
  siblingSentences.push(
    siblings.length > 0
      ? `Różnica wobec sąsiednich lokalizacji pokazuje, ile płacisz za adres, a ile za samą nieruchomość.`
      : `W tej gminie nie mamy innych dzielnic w modelu danych, więc punktem odniesienia jest całe ${city.name}.`,
  );

  return [
    {
      // Blok „rynek” (wstęp + wycena + angle usługi) usunięty ze stron dzielnic:
      // te same zdania powtarzały się na wszystkich 89 stronach tej usługi.
      // Zastępuje go blok „glebiej” generowany z danych dzielnicy.
      id: "okolica",
      heading: `Okolica i zabudowa: ${district.name}`,
      paragraphs: rotateItems(
        [pick(okolicaParagraphs, key, "okolica"), siblingSentences.join(" ")],
        key,
        "okolica",
        1,
      ),
      bullets: siblingBullets.length > 0 ? siblingBullets : undefined,
    },
    {
      id: "roi",
      heading: `Ile zarobisz na najmie w ${district.name}`,
      paragraphs: rotateItems(
        [
          pickByTier(yieldSentences, yieldTier(stats)),
          t(
            `Realny scenariusz: 70 m² w {districtLoc} generuje około {rent70} € czynszu rocznie brutto i {rentNet70} € netto po kosztach zarządzania, podatku i pustostanach.`,
          ),
          t(
            `Inwestycja 250 000 € daje w horyzoncie pięciu lat około {return5y} € łącznego zwrotu (czynsz netto plus wzrost wartości), czyli {returnPercent}% budżetu. To model na medianach, nie gwarancja - konkretną nieruchomość wyceniamy osobno.`,
          ),
          t(
            `Najem krótkoterminowy w {districtLoc} podnosi przychód w sezonie, ale wymaga licencji turystycznej i zwiększa koszty operacyjne. Części inwestorów bardziej opłaca się najem długoterminowy z niższym ryzykiem pustostanu.`,
          ),
        ],
        key,
        "roi",
        1,
      ),
      bullets: rotateItems(
        [
          t("Czynsz: {rent} €/m²/mies."),
          t("ROI brutto: {yield}"),
          t("ROI netto: {netYield}"),
          t("Zwrot 5-letni z 250 000 €: {return5y} €"),
          t("Wartość po 5 latach: {value5y} €"),
        ],
        key,
        "roi-bullets",
        2,
      ),
    },
    {
      id: "koszty",
      heading: "Koszty zakupu, podatki i formalności",
      paragraphs: rotateItems(
        [
          pick(costVariants, key, "cost"),
          t(
            `Po zakupie dochodzą koszty stałe: IBI (podatek gminny), comunidad (koszty wspólnoty) i ubezpieczenie. W ${district.name} wysokość comunidad zależy od standardu osiedla i infrastruktury wspólnej - przy zabudowie typu ${district.type} bywa to pozycja pomijana w ogłoszeniach.`,
          ),
        ],
        key,
        "koszty",
        1,
      ),
      bullets: rotateItems(service.checklist.map((item) => t(item)), key, "cost-bullets", 2),
    },
    {
      id: "kupujacy",
      heading: t(`Kto kupuje ${vars.property} w ${vars.districtLoc}`),
      paragraphs: rotateItems(
        [
          `${pickByTier(buyerSentences, foreignTier(stats))} ${pickByTier(demandSentences, demandTier(stats))}`,
          `${pickByTier(liquiditySentences, liquidityTier(stats))} ${t(
            `Dla kupującego z Polski oznacza to jedno: finansowanie warto mieć potwierdzone przed przyjazdem, bo przy popycie {demand}/10 dobre lokale nie czekają na decyzję.`,
          )}`,
          t(
            `Najemcę w {districtLoc} znajdziesz wśród osób pracujących w {cityLoc} oraz rodzin szukających ${district.characteristics[1] ?? district.characteristics[0] ?? ""}. To dwie różne grupy o różnej tolerancji na standard i metraż - i różnej wrażliwości cenowej.`,
          ),
        ],
        key,
        "kupujacy",
        1,
      ),
    },
    {
      // Blok usługi: różnicuje strony tej samej dzielnicy dla różnych usług.
      // Skrócony do jednej korzyści i jednego punktu checklisty, bo pełna lista
      // była identyczna na 89 stronach i napędzała Jaccard.
      id: "usluga",
      heading: service.name,
      // Paragraph usunięty: ta sama korzyść na wszystkich stronach usługi.
      // Zostają dwa punkty checklisty, które różnią się między usługami.
      paragraphs: [],
      bullets: rotateItems(service.checklist.slice(0, 2).map((item) => t(item)), key, "usluga-bullets", 1),
    },
    {
      id: "dane",
      heading: `Wskaźniki ${district.name} w liczbach`,
      paragraphs: rotateItems(
        [
          t(
            "Cena {price} €/m², czynsz {rent} €/m²/mies., ROI brutto {yield} i netto {netYield}, wzrost {growth} r/r, ekspozycja oferty {days} dni, koszty wejścia {purchaseCosts}, budżet 70 m² {budget70}, transakcje w 12 miesięcy: {volume}.",
          ),
          t(
            `Punkt odniesienia: {cityPrice} €/m² w ${city.name} i {regionPrice} €/m² w regionie {region}. Popyt {demand}/10, kupujący zagraniczni {foreign}, Polacy {polish}.`,
          ),
        ],
        key,
        "dane",
        1,
      ),
    },
  ];
}


