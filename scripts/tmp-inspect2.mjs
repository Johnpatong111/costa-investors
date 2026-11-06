import { readFileSync } from "node:fs";

for (const file of [
  "src/lib/i18n/content/en.ts",
  "src/lib/i18n/content/es.ts",
  "src/lib/data/services/darmowy-przewodnik-wycena.ts",
]) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/wycen\w*|valuation|tasaci\w*|lead-magnet|name:/i.test(line)) {
      console.log(`${file}:${index + 1} ${line.trim().slice(0, 120)}`);
    }
  });
  console.log("---");
}
