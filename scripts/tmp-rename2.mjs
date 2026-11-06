import { readFileSync, writeFileSync } from "node:fs";

const jobs = [
  {
    file: "src/lib/data/services/darmowy-przewodnik-wycena.ts",
    pairs: [
      ["Wycena nieruchomości w {districtLoc} ({cityLoc}) + analiza prawna", "Dobór ofert w {districtLoc} ({cityLoc})"],
      ["Wycena i analiza prawna - {district} {city}", "Dobór ofert: {district} {city}"],
      ["Wycena zamiast", "Dobór ofert zamiast"],
      ["wycena", "dobór ofert"],
      ["Wycena", "Dobór ofert"],
    ],
  },
  {
    file: "src/lib/i18n/content/en.ts",
    pairs: [
      ['ctaLabel: "Get the guide and valuation"', 'ctaLabel: "Get the guide and listings"'],
      ['"Valuation and legal check in {districtLoc} ({cityLoc})"', '"Buying guide and listings in {districtLoc} ({cityLoc})"'],
      ['"Valuation and legal check - {district} {city}"', '"Buying guide and listings: {district} {city}"'],
      ["NIE and valuation", "NIE and matched listings"],
      ["indicative valuation", "matched listings"],
      ["and valuation", "and matched listings"],
      ["Valuation", "Matched listings"],
      ["valuation", "matched listings"],
    ],
  },
  {
    file: "src/lib/i18n/content/es.ts",
    pairs: [
      ['name: "Guía de compra gratuita"', 'name: "Guía y ofertas"'],
      ["Guía de compra gratuita", "Guía y ofertas"],
      ["guía de compra gratuita", "guía y ofertas"],
      ["Tasación", "Selección de ofertas"],
      ["tasación", "selección de ofertas"],
    ],
  },
];

for (const job of jobs) {
  let source = readFileSync(job.file, "utf8");
  let applied = 0;
  for (const [from, to] of job.pairs) {
    if (!source.includes(from)) continue;
    source = source.split(from).join(to);
    applied += 1;
  }
  writeFileSync(job.file, source, "utf8");
  const left = (source.match(/wycen\w*|valuation|tasaci\w*/gi) ?? []).length;
  console.log(`${job.file}: ${applied} podmian, pozostało ${left}`);
}
