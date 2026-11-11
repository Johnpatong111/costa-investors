/* eslint-disable no-console */
/**
 * ===========================================================================
 * TESTY NARZĘDZI: LICZBY MUSZĄ SIĘ ZGADZAĆ
 * ===========================================================================
 * Nie testujemy wyglądu, testujemy arytmetykę, którą widzi użytkownik.
 * Trzy poziomy pewności:
 *  1. wartości policzone ręcznie (dokładne lub z tolerancją 0,01),
 *  2. inwarianty: próg rentowności odwrócony, rata spłaca kapitał do zera,
 *  3. spójność z danymi: wszystkie 89 dzielnic i wszystkie regiony.
 * Uruchomienie: npm run test:tools
 */

import { regionTax } from "../src/lib/content/region-facts";
import { deriveDistrictStats } from "../src/lib/content/market-stats";
import { getAllDistrictEntries } from "../src/lib/data/repository";
import {
  computePurchaseCosts,
  sanitizeNumber,
} from "../src/lib/tools/purchase-costs";
import { computeShortLet } from "../src/lib/tools/short-let";
import { annuity, computeInvestment } from "../src/lib/tools/investment";
import {
  activeFilterCount,
  areaForBudget,
  DEFAULT_RANKING_FILTERS,
  filterRankingRows,
  median,
} from "../src/lib/tools/ranking";
import { isBudgetInRange } from "../src/lib/tools/budget-bus";
import {
  buildLandPolygon,
  distanceToCoast,
  pointInPolygon,
  SEA_OFFSET_LNG,
} from "../src/lib/tools/coastline";
import { bufferMonths, computeStress } from "../src/lib/tools/stress";

let passed = 0;
const failures: string[] = [];

function ok(name: string, condition: boolean, detail = ""): void {
  if (condition) {
    passed += 1;
    return;
  }
  failures.push(`${name}${detail ? ` → ${detail}` : ""}`);
}

/** Równość z tolerancją (domyślnie 0,01, czyli grosz przy kwotach w EUR). */
function near(name: string, actual: number, expected: number, tolerance = 0.01): void {
  const condition = Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
  ok(name, condition, `oczekiwano ${expected}, otrzymano ${actual}`);
}

function eq<T>(name: string, actual: T, expected: T): void {
  ok(name, actual === expected, `oczekiwano ${String(expected)}, otrzymano ${String(actual)}`);
}

/* =========================================================================
 * 1. KOSZTY ZAKUPU I PODATKI
 * ========================================================================= */

const resale = computePurchaseCosts({
  price: 200_000,
  itp: 10,
  deal: "resale",
  property: "flat",
  residency: "nonEu",
  rentalYield: 6,
});

near("koszty/resale: ITP 10% od 200 000", resale.transferTax, 20_000);
eq("koszty/resale: brak AJD", resale.ajd, 0);
near("koszty/resale: notariusz 1%", resale.notary, 2_000);
near("koszty/resale: prawnik 0,5%", resale.legal, 1_000);
near("koszty/resale: suma kosztów transakcyjnych", resale.transactionCosts, 23_000);
near("koszty/resale: razem do zapłaty", resale.total, 223_000);
near("koszty/resale: koszty jako % ceny", resale.costsPercent, 11.5);
near("koszty/resale: IBI 0,35%", resale.ibi, 700);
near("koszty/resale: comunidad 0,9%", resale.community, 1_800);
near("koszty/resale: ubezpieczenie 0,15%", resale.insurance, 300);
near("koszty/resale: koszty roczne", resale.annual, 2_800);
near("koszty/resale: koszty roczne na miesiąc", resale.annualPerMonth, 2_800 / 12);
near("koszty/resale: czynsz brutto 6% od 200 000", resale.rentGross, 12_000);
near("koszty/resale: podatek nierezydenta UE 19%", resale.rentTax, 2_280);
near("koszty/resale: czynsz netto", resale.rentNet, 9_720);
near("koszty/resale: zwrot netto", resale.netYield, 4.86);

const newBuild = computePurchaseCosts({
  price: 200_000,
  itp: 10,
  deal: "new",
  property: "flat",
  residency: "nonEu",
  rentalYield: 6,
});
near("koszty/nowe: IVA 10%", newBuild.transferTax, 20_000);
near("koszty/nowe: AJD 1,5%", newBuild.ajd, 3_000);
near("koszty/nowe: suma kosztów", newBuild.transactionCosts, 26_000);
near("koszty/nowe: razem do zapłaty", newBuild.total, 226_000);
near("koszty/nowe: koszty jako % ceny", newBuild.costsPercent, 13);

const murcia = computePurchaseCosts({
  price: 200_000,
  itp: 8,
  deal: "resale",
  property: "flat",
  residency: "nonEu",
  rentalYield: 6,
});
near("koszty/Murcja: ITP 8%", murcia.transferTax, 16_000);
near("koszty/Murcja: koszty jako % ceny", murcia.costsPercent, 9.5);
ok(
  "koszty/nowe budownictwo droższe niż wtórny przy ITP 8%",
  newBuild.transactionCosts > murcia.transactionCosts,
);

const resident = computePurchaseCosts({
  price: 200_000,
  itp: 10,
  deal: "resale",
  property: "flat",
  residency: "resident",
  rentalYield: 6,
});
// 12 000 - 2 800 = 9 200 dochodu, 19% = 1 748
near("koszty/rezydent: podatek od dochodu netto", resident.rentTax, 1_748);
near("koszty/rezydent: czynsz netto", resident.rentNet, 10_252);
near("koszty/rezydent: zwrot netto", resident.netYield, 5.126);

const nonEu = computePurchaseCosts({
  price: 200_000,
  itp: 10,
  deal: "resale",
  property: "flat",
  residency: "eu",
  rentalYield: 6,
});
near("koszty/poza UE: 24% od brutto", nonEu.rentTax, 2_880);
near("koszty/poza UE: czynsz netto", nonEu.rentNet, 9_120);

const villa = computePurchaseCosts({
  price: 200_000,
  itp: 10,
  deal: "resale",
  property: "villa",
  residency: "nonEu",
  rentalYield: 6,
});
near("koszty/willa: IBI 0,45%", villa.ibi, 900);
near("koszty/willa: comunidad 0,3%", villa.community, 600);
near("koszty/willa: ubezpieczenie 0,25%", villa.insurance, 500);
near("koszty/willa: koszty roczne", villa.annual, 2_000);

const zeroCosts = computePurchaseCosts({
  price: 0,
  itp: 10,
  deal: "resale",
  property: "flat",
  residency: "nonEu",
  rentalYield: 6,
});
eq("koszty/cena 0: brak dzielenia przez zero", zeroCosts.costsPercent, 0);
eq("koszty/cena 0: zwrot 0", zeroCosts.netYield, 0);
eq("koszty/cena 0: brak podatku", zeroCosts.transferTax, 0);

const dirty = computePurchaseCosts({
  price: Number.NaN,
  itp: Number.POSITIVE_INFINITY,
  deal: "resale",
  property: "flat",
  residency: "nonEu",
  rentalYield: -5,
});
eq("koszty/NaN: cena traktowana jako 0", dirty.total, 0);
eq("koszty/NaN: brak podatku od najmu", dirty.rentGross, 0);
eq("sanitize: liczba ujemna", sanitizeNumber(-10), 0);
eq("sanitize: liczba powyżej limitu", sanitizeNumber(5_000_000, 3_000_000), 3_000_000);


/* =========================================================================
 * 2. NAJEM KRÓTKOTERMINOWY VS DŁUGOTERMINOWY
 * ========================================================================= */

const short = computeShortLet({ price: 168_000, nightly: 73, occupancy: 65, monthlyRent: 910 });

// 365 × 0,65 = 237,25 nocy; 237,25 × 73 = 17 319,25
near("sezon: przychód roczny", short.shortGross, 17_319.25, 0.01);
near(
  "sezon: koszty roczne",
  short.shortCosts,
  17_319.25 * 0.15 + 17_319.25 * 0.2 + (237.25 / 6) * 55 + 1_560 + 168_000 * 0.012,
  0.01,
);
near(
  "sezon: dochód netto",
  short.shortNet,
  17_319.25 - (17_319.25 * 0.35 + (237.25 / 6) * 55 + 1_560 + 2_016),
  0.01,
);
// 910 × 11 miesięcy = 10 010; zarządzanie 8% = 800,80; stałe 2 016
near("rok: przychód roczny (11 miesięcy)", short.longGross, 10_010);
near("rok: koszty roczne", short.longCosts, 800.8 + 2_016);
near("rok: dochód netto", short.longNet, 7_193.2);
near("sezon: zwrot z ceny", short.shortYield, (short.shortNet / 168_000) * 100, 0.0001);
near("rok: zwrot z ceny", short.longYield, (7_193.2 / 168_000) * 100, 0.0001);
near("koszt na dobę: sezon", short.shortPerNight, short.shortCosts / 365, 0.0001);
near("różnica sezon minus rok", short.diff, short.shortNet - 7_193.2, 0.01);
ok("przy 65% obłożenia wygrywa najem roczny", short.diff < 0, `diff ${short.diff}`);

// INWARIANT: po wstawieniu progu rentowności oba modele dają ten sam wynik.
const atBreakEven = computeShortLet({
  price: 168_000,
  nightly: 73,
  occupancy: short.breakEven,
  monthlyRent: 910,
});
near("próg rentowności: sezon = rok", atBreakEven.shortNet, atBreakEven.longNet, 0.5);
near("próg rentowności: wartość w procentach", short.breakEven, 77.07, 0.05);

// INWARIANT: wyższa stawka za dobę nie może obniżyć dochodu z sezonu.
const higherRate = computeShortLet({ price: 168_000, nightly: 93, occupancy: 65, monthlyRent: 910 });
ok("wyższa stawka podnosi dochód z sezonu", higherRate.shortNet > short.shortNet);

// INWARIANT: wyższy czynsz roczny podnosi próg rentowności.
const higherRent = computeShortLet({ price: 168_000, nightly: 73, occupancy: 65, monthlyRent: 1_200 });
ok("wyższy czynsz roczny podnosi próg", higherRent.breakEven > short.breakEven);

const emptySeason = computeShortLet({ price: 168_000, nightly: 73, occupancy: 0, monthlyRent: 910 });
near("obłożenie 0: brak przychodu", emptySeason.shortGross, 0);
near("obłożenie 0: zostają media i stałe", emptySeason.shortNet, -(1_560 + 2_016));

const clamped = computeShortLet({ price: 168_000, nightly: 73, occupancy: 150, monthlyRent: 910 });
near("obłożenie 150% obcinane do 100%", clamped.shortGross, 365 * 73, 0.01);

const noRate = computeShortLet({ price: 168_000, nightly: 0, occupancy: 65, monthlyRent: 910 });
ok("stawka 0: próg rentowności nieokreślony", !Number.isFinite(noRate.breakEven));
eq("stawka 0: sezon na minusie", noRate.shortNet < 0, true);

const noPrice = computeShortLet({ price: 0, nightly: 73, occupancy: 65, monthlyRent: 910 });
eq("cena 0: zwrot sezonu 0 (bez NaN)", noPrice.shortYield, 0);
eq("cena 0: zwrot roku 0 (bez NaN)", noPrice.longYield, 0);

const noRent = computeShortLet({ price: 168_000, nightly: 73, occupancy: 65, monthlyRent: 0 });
near("czynsz 0: dochód roku tylko na minusie o stałe", noRent.longNet, -2_016);

/* =========================================================================
 * 3. WORKBENCH: RATA I ZWROT
 * ========================================================================= */

eq("rata: kapitał 0", annuity(0, 3.5, 300), 0);
eq("rata: 0 miesięcy", annuity(100_000, 3.5, 0), 0);
near("rata: 0% na 120 miesięcy", annuity(120_000, 0, 120), 1_000);

// INWARIANT: rata annuitetowa spłaca kapitał dokładnie do zera.
{
  const principal = 100_000;
  const rate = 3.5;
  const months = 300;
  const payment = annuity(principal, rate, months);
  const monthlyRate = rate / 100 / 12;
  let balance = principal;
  for (let month = 0; month < months; month += 1) {
    balance = balance * (1 + monthlyRate) - payment;
  }
  near("rata 3,5% / 300 mies.: saldo po spłacie", balance, 0, 1);
  near("rata 3,5% / 300 mies.: wysokość", payment, 500.67, 0.05);
  ok("rata rośnie z oprocentowaniem", annuity(100_000, 5, 300) > payment);
}

const cash = computeInvestment({
  budget: 250_000,
  pricePerM2: 2_400,
  rentalYield: 6.6,
  netYield: 4.7,
  priceGrowth: 6,
  scenario: "year",
  financing: "cash",
  ltv: 70,
  rate: 3.5,
  years: 25,
});
eq("workbench/gotówka: metraż za budżet", cash.areaM2, 104);
eq("workbench/gotówka: koszty zakupu 13,5%", cash.purchaseCosts, 33_750);
eq("workbench/gotówka: czynsz brutto", cash.rentGross, 16_500);
eq("workbench/gotówka: czynsz netto", cash.rentNet, 11_750);
near("workbench/gotówka: zwrot netto", cash.netYieldPct, 4.7, 0.0001);
eq("workbench/gotówka: wartość po 5 latach", cash.value5, 334_556);
eq("workbench/gotówka: zwrot łączny", cash.totalReturn, 334_556 - 250_000 + 11_750 * 5);
eq("workbench/gotówka: rata 0", cash.payment, 0);
eq("workbench/gotówka: kapitał własny", cash.cashInvested, 283_750);
near("workbench/gotówka: cash on cash", cash.cashOnCash, (11_750 / 283_750) * 100, 0.0001);
eq("workbench/gotówka: cash flow miesięcznie", cash.cashFlow, Math.round(11_750 / 12));

const mortgage = computeInvestment({
  budget: 250_000,
  pricePerM2: 2_400,
  rentalYield: 6.6,
  netYield: 4.7,
  priceGrowth: 6,
  scenario: "year",
  financing: "mortgage",
  ltv: 70,
  rate: 3.5,
  years: 25,
});
eq("workbench/kredyt: kwota kredytu 70%", mortgage.loan, 175_000);
eq("workbench/kredyt: rata", mortgage.payment, 876);
eq("workbench/kredyt: kapitał własny", mortgage.cashInvested, 108_750);
near(
  "workbench/kredyt: cash on cash",
  mortgage.cashOnCash,
  ((11_750 - 876 * 12) / 108_750) * 100,
  0.0001,
);
eq("workbench/kredyt: cash flow miesięcznie", mortgage.cashFlow, Math.round(11_750 / 12) - 876);

const overLtv = computeInvestment({
  budget: 250_000,
  pricePerM2: 2_400,
  rentalYield: 6.6,
  netYield: 4.7,
  priceGrowth: 6,
  scenario: "year",
  financing: "mortgage",
  ltv: 150,
  rate: 3.5,
  years: 25,
});
eq("workbench/LTV 150% obcinane do 100%", overLtv.loan, 250_000);

const seasonScenario = computeInvestment({
  budget: 250_000,
  pricePerM2: 2_400,
  rentalYield: 6.6,
  netYield: 4.7,
  priceGrowth: 6,
  scenario: "season",
  financing: "cash",
  ltv: 70,
  rate: 3.5,
  years: 25,
});
eq("workbench/sezon 8 mies.: czynsz brutto", seasonScenario.rentGross, 11_000);
eq("workbench/sezon 8 mies.: czynsz netto", seasonScenario.rentNet, 7_833);
near(
  "workbench/sezon 8 mies.: zwrot netto",
  seasonScenario.netYieldPct,
  (7_833 / 250_000) * 100,
  0.0001,
);

const emptyBudget = computeInvestment({
  budget: 0,
  pricePerM2: 2_400,
  rentalYield: 6.6,
  netYield: 4.7,
  priceGrowth: 6,
  scenario: "year",
  financing: "cash",
  ltv: 70,
  rate: 3.5,
  years: 25,
});
eq("workbench/budżet 0: metraż 0", emptyBudget.areaM2, 0);
eq("workbench/budżet 0: koszty 0", emptyBudget.purchaseCosts, 0);
eq("workbench/budżet 0: brak NaN w cash on cash", Number.isFinite(emptyBudget.cashOnCash), true);



/* =========================================================================
 * 4. STRESS TEST
 * ========================================================================= */

const stress = computeStress({
  price: 250_000,
  ltv: 70,
  rate: 3.5,
  years: 25,
  monthlyRent: 11_750 / 12,
  monthlyCosts: 250,
});
const byId = (id: string) => stress.scenarios.find((scenario) => scenario.id === id)!;

eq("stress: kwota kredytu 70%", stress.loan, 175_000);
eq("stress: rata bazowa", stress.payment, 876);
eq("stress: cash flow bazowy", stress.baseCashFlow, -147);
near("stress: DSCR bazowy", byId("base").dscr, 979.1666667 / 876, 0.0001);
eq("stress: rata po szoku stopy +2 pkt", byId("rate").payment, 1_075);
eq("stress: cash flow po szoku stopy", byId("rate").cashFlow, -346);
eq("stress: cash flow po spadku czynszu 10%", byId("rent").cashFlow, -245);
eq("stress: cash flow przy dwóch miesiącach pustostanu", byId("vacancy").cashFlow, -310);
eq("stress: czynsz po pustostanie", Math.round(979.1666667 * (10 / 12)), 816);
eq("stress: wartość po spadku ceny 10%", byId("price").value, 225_000);
eq("stress: kapitał własny po spadku ceny", byId("price").equity, 50_000);
near("stress: LTV po spadku ceny", byId("price").ltvAfter, (175_000 / 225_000) * 100, 0.0001);
eq("stress: brak ujemnego kapitału przy LTV 70%", byId("price").underwater, false);
eq("stress: cash flow w scenariuszu łączonym", byId("combo").cashFlow, -591);
eq("stress: rezerwa w miesiącach czynszu", bufferMonths(byId("combo"), 979.1666667), 8);

// INWARIANT: wyższa stopa przy tym samym kredycie zawsze obniża cash flow.
ok("stress: szok stopy obniża cash flow", byId("rate").cashFlow < byId("base").cashFlow);

// INWARIANT: szok czynszu nie zmienia raty.
eq("stress: szok czynszu nie rusza raty", byId("rent").payment, byId("base").payment);

const underwater = computeStress({
  price: 200_000,
  ltv: 95,
  rate: 3.5,
  years: 30,
  monthlyRent: 900,
  monthlyCosts: 200,
});
ok(
  "stress: LTV 95% plus spadek ceny daje ujemny kapitał",
  underwater.scenarios.find((scenario) => scenario.id === "price")!.underwater,
);

const cashOnly = computeStress({
  price: 250_000,
  ltv: 0,
  rate: 3.5,
  years: 25,
  monthlyRent: 1_000,
  monthlyCosts: 200,
});
eq("stress: bez kredytu rata 0", cashOnly.payment, 0);
eq("stress: bez kredytu cash flow", cashOnly.baseCashFlow, 800);
ok(
  "stress: bez kredytu DSCR nieokreślony",
  !Number.isFinite(cashOnly.scenarios.find((scenario) => scenario.id === "base")!.dscr),
);
eq("stress: bez kredytu brak rezerwy", bufferMonths(cashOnly.scenarios[0]!, 1_000), 0);

const zeroStress = computeStress({
  price: 0,
  ltv: 70,
  rate: 3.5,
  years: 25,
  monthlyRent: 0,
  monthlyCosts: 0,
});
eq("stress: cena 0 daje kredyt 0", zeroStress.loan, 0);
eq("stress: cena 0 daje ratę 0", zeroStress.payment, 0);
eq("stress: cena 0 bez NaN w LTV", Number.isFinite(zeroStress.scenarios[0]!.ltvAfter), true);

/* =========================================================================
 * 4d. MAPA: DZIELNICE MUSZĄ LEŻEĆ NA LĄDZIE
 * ========================================================================= */

{
  const entries = getAllDistrictEntries();
  const lats = entries.map((entry) => entry.district.lat);
  const lngs = entries.map((entry) => entry.district.lng);
  const bounds = {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
  const polygon = buildLandPolygon(bounds);

  const atSea = entries.filter(
    (entry) => !pointInPolygon([entry.district.lng, entry.district.lat], polygon),
  );
  const deepWater = atSea.filter(
    (entry) => distanceToCoast([entry.district.lng, entry.district.lat]) > 0.03,
  );

  eq("mapa: żadna dzielnica nie leży głęboko w morzu", deepWater.length, 0);
  ok(
    "mapa: punkty przy plaży mieszczą się w tolerancji 3 km",
    atSea.length <= 8,
    `${atSea.length} punktów po stronie morza: ${atSea.map((entry) => entry.district.name).join(", ")}`,
  );
  ok(
    "mapa: linia brzegowa obejmuje wszystkie dzielnice",
    bounds.minLat >= 37.3 && bounds.maxLat <= 39 && bounds.minLng >= -1.7 && bounds.maxLng <= 0.3,
    `${bounds.minLat}-${bounds.maxLat} / ${bounds.minLng}-${bounds.maxLng}`,
  );
}


/* =========================================================================
 * 5. POMOCNICZE FUNKCJE RANKINGU
 * ========================================================================= */

eq("mediana: pusta lista", median([]), 0);
eq("mediana: jeden element", median([5]), 5);
eq("mediana: nieparzysta liczba", median([3, 1, 2]), 2);
eq("mediana: parzysta liczba", median([1, 2, 3, 4]), 2.5);
eq("mediana: pomija NaN", median([1, Number.NaN, 3]), 2);
eq("metraż: 250 000 przy 2 400 €/m²", areaForBudget(250_000, 2_400), 104);
eq("metraż: cena 0 nie dzieli przez zero", areaForBudget(250_000, 0), 0);
eq("metraż: budżet 0", areaForBudget(0, 2_400), 0);

/* =========================================================================
 * 4b. MOSTEK BUDŻETU (narzędzia → formularz)
 * ========================================================================= */

eq("budżet: 50 000 w zakresie", isBudgetInRange(50_000), true);
eq("budżet: 3 000 000 w zakresie", isBudgetInRange(3_000_000), true);
eq("budżet: 49 999 poza zakresem", isBudgetInRange(49_999), false);
eq("budżet: 3 000 001 poza zakresem", isBudgetInRange(3_000_001), false);
eq("budżet: NaN poza zakresem", isBudgetInRange(Number.NaN), false);

/* =========================================================================
 * 4c. FILTRY RANKINGU
 * ========================================================================= */

const rankingSample = [
  { districtName: "La Mata", cityName: "Torrevieja", pricePerM2: 2_400, netYield: 6.6, days: 90, area: 104, price: 250_000 },
  { districtName: "Centro", cityName: "Torrevieja", pricePerM2: 2_100, netYield: 5.4, days: 140, area: 119, price: 250_000 },
  { districtName: "El Hornillo", cityName: "Águilas", pricePerM2: 1_700, netYield: 4.8, days: 160, area: 147, price: 250_000 },
];

eq(
  "filtry: brak filtrów zwraca wszystko",
  filterRankingRows(rankingSample, DEFAULT_RANKING_FILTERS).length,
  3,
);
eq(
  "filtry: minimalny zwrot 5%",
  filterRankingRows(rankingSample, { minNetYield: 5, maxDays: 0, query: "" }).length,
  2,
);
eq(
  "filtry: maksymalnie 120 dni ekspozycji",
  filterRankingRows(rankingSample, { minNetYield: 0, maxDays: 120, query: "" }).length,
  1,
);
eq(
  "filtry: szukanie po dzielnicy",
  filterRankingRows(rankingSample, { minNetYield: 0, maxDays: 0, query: "mata" }).length,
  1,
);
eq(
  "filtry: szukanie po gminie ignoruje wielkość liter",
  filterRankingRows(rankingSample, { minNetYield: 0, maxDays: 0, query: "TORREVIEJA" }).length,
  2,
);
eq(
  "filtry: brak wyników",
  filterRankingRows(rankingSample, { minNetYield: 0, maxDays: 0, query: "Marbella" }).length,
  0,
);
eq(
  "filtry: filtry łączą się",
  filterRankingRows(rankingSample, { minNetYield: 5, maxDays: 120, query: "torrevieja" }).length,
  1,
);
eq(
  "filtry: liczba aktywnych filtrów",
  activeFilterCount({ minNetYield: 5, maxDays: 120, query: "mata" }),
  3,
);

/* =========================================================================
 * 5. SPÓJNOŚĆ Z DANYMI STRONY
 * ========================================================================= */

const districts = getAllDistrictEntries();
eq("dane: liczba dzielnic w bazie", districts.length, 89);

let badCoords = 0;
let badYield = 0;
let badArea = 0;
let badNetYield = 0;

const round1 = (value: number) => Math.round(value * 10) / 10;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

for (const entry of districts) {
  const { district, city, region } = entry;
  if (
    !Number.isFinite(district.lat) ||
    !Number.isFinite(district.lng) ||
    district.lat < 36.5 ||
    district.lat > 40.5 ||
    district.lng < -2.5 ||
    district.lng > 1.5
  ) {
    badCoords += 1;
  }
  if (!Number.isFinite(district.rentalYield) || district.rentalYield <= 0 || district.rentalYield > 15) {
    badYield += 1;
  }
  if (areaForBudget(250_000, district.pricePerM2) <= 0) badArea += 1;

  // Model netto musi odpowiadać temu, co pokazuje tabela rankingu: brutto - 1,9 pkt.
  const expectedNet = round1(clamp(district.rentalYield - 1.9, 1.5, 8));
  const stats = deriveDistrictStats(city, district, region);
  if (Math.abs(stats.netYield - expectedNet) > 1e-9) badNetYield += 1;
}

eq("dane: wszystkie współrzędne w granicach Hiszpanii", badCoords, 0);
eq("dane: wszystkie rentowności brutto w zakresie 0-15%", badYield, 0);
eq("dane: metraż za 250 tys. zawsze dodatni", badArea, 0);
eq("dane: zwrot netto = brutto minus 1,9 pkt", badNetYield, 0);

eq("podatki: ITP Costa Blanca", regionTax("costa-blanca").itp, 10);
eq("podatki: ITP Costa Cálida", regionTax("costa-calida").itp, 8);

const regions = new Set(getAllDistrictEntries().map((entry) => entry.city.region));
let unknownRegion = 0;
for (const region of regions) {
  const facts = regionTax(region);
  if (facts.itp !== 10 && facts.itp !== 8) unknownRegion += 1;
}
eq("podatki: każdy region ma znaną stawkę ITP", unknownRegion, 0);

/* =========================================================================
 * RAPORT
 * ========================================================================= */

const total = passed + failures.length;
console.log(`\nTesty narzędzi: ${passed}/${total} przeszło`);

if (failures.length > 0) {
  console.log("\nNiepowodzenia:");
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}

console.log("Wszystkie liczby się zgadzają.\n");
