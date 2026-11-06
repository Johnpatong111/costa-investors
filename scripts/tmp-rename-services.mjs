import { readFileSync, writeFileSync } from "node:fs";

const jobs = [
  {
    file: "src/lib/data/services/darmowy-przewodnik-wycena.ts",
    pairs: [
      ["Darmowy przewodnik i wycena", "Przewodnik i oferty"],
      ["darmowego przewodnika i wyceny", "przewodnika i ofert"],
      ["Darmowy przewodnik zakupu", "Przewodnik zakupu"],
      ["darmowego przewodnika zakupu", "przewodnika zakupu"],
      ["darmowa wycena nieruchomości", "przewodnik zakupu nieruchomości"],
      ["darmowej wyceny", "analizy ofert"],
      ["darmową wycenę", "analizę ofert"],
      ["wstępna wycena", "wstępny dobór ofert"],
      ["wstępną wycenę", "wstępny dobór ofert"],
      ["wycena", "analiza ofert"],
      ["wyceny", "analizy ofert"],
      ["wycenę", "analizę ofert"],
    ],
  },
  {
    file: "src/lib/i18n/content/en.ts",
    pairs: [
      ["Free buying guide", "Guide & listings"],
      ["free buying guide", "guide & listings"],
      ["Free valuation", "Matched listings"],
      ["free valuation", "matched listings"],
    ],
  },
  {
    file: "src/lib/i18n/content/es.ts",
    pairs: [
      ["Guía gratis", "Guía y ofertas"],
      ["guía gratis", "guía y ofertas"],
      ["Propiedades de inversión", "Inmuebles de inversión"],
      ["propiedades de inversión", "inmuebles de inversión"],
      ["Tasación gratuita", "Selección de ofertas"],
      ["tasación gratuita", "selección de ofertas"],
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
  console.log(`${job.file}: ${applied}/${job.pairs.length}`);

  const leftovers = source.match(/wycen\w*|valuation|tasaci\w*/gi) ?? [];
  console.log(`  pozostałe wzmianki: ${leftovers.length}`);
}
