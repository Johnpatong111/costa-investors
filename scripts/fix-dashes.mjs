/* eslint-disable no-console */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Konwerter typografii: zamienia półpauzy (–) i pauzy (—) na naturalną
 * polską interpunkcję, a prozatorskie `--` na przecinek.
 *
 * Reguły:
 *  1. zakresy liczbowe (3–6, 13–14%) → dywiz (3-6),
 *  2. myślnik przed liczbą/walutą → dwukropek,
 *  3. pozostałe wtrącenia → nowe zdanie (kropka + wielka litera),
 *  4. myślnik bez spacji → dywiz,
 *  5. prozatorskie `--` → przecinek.
 *
 * Zmienne CSS (`--color-*`) i operatory `i--` pozostają nietknięte.
 *
 * Uruchomienie: node scripts/fix-dashes.mjs
 */

const ROOTS = ["src"];
const EXTENSIONS = new Set([".ts", ".tsx", ".md", ".json"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const SKIP_FILES = new Set(["scripts/fix-dashes.mjs"]);

/** Linia z regexem zawierającym myślnik w klasie znaków: nie ruszamy. */
const REGEX_WITH_DASH = /\[[^\]\n]*[\u2013\u2014][^\]\n]*\]/;

/**
 * Naprawa wcześniejszej kolizji: przecinek przed operatorem `...` bywał
 * zjadany przez porządki interpunkcyjne. Odtwarzamy `x, ...y`.
 */
const SPREAD_REPAIR = /(\w|\]|\))\.\.\.(?=[A-Za-z_$([{])/g;

const capitalize = (value) =>
  value.length === 0 ? value : value.charAt(0).toLocaleUpperCase("pl-PL") + value.slice(1);

function convertLine(line) {
  if (REGEX_WITH_DASH.test(line)) return line;

  let output = line;

  // 1. Zakresy liczbowe: 3–6, 1–10, 13–14%.
  output = output.replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, "$1-$2");

  // 2. Myślnik wprowadzający wartość liczbową lub walutę → dwukropek.
  output = output.replace(/\s*[\u2013\u2014]\s*(?=[\d€$])/g, ": ");

  // 3. Wtrącenia w prozie → nowe zdanie.
  output = output.replace(/\s*[\u2013\u2014]\s*(?=\p{Ll})/gu, ". ");

  // 4. Myślnik bez spacji (np. w złożeniach) → dywiz.
  output = output.replace(/[\u2013\u2014]/g, "-");

  // 5. Prozatorskie podwójne myślniki → przecinek.
  output = output.replace(/(?<![\w-])--(?![\w-])/g, ", ");

  // 6. Po naszych zdaniach podnosimy pierwszą literę.
  output = output.replace(/\. (\p{Ll})/gu, (_match, letter) => `. ${capitalize(letter)}`);

  // 7. Porządki po podmianach: podwójne przecinki tylko w prozie.
  output = output.replace(/(\p{L}),\s*,(?=\s)/gu, "$1,");

  return output;
}

function processFile(path) {
  const original = readFileSync(path, "utf8");
  const repaired = original.replace(SPREAD_REPAIR, "$1, ...");

  if (
    repaired === original &&
    !/[\u2013\u2014]/.test(original) &&
    !/(?<![\w-])--(?![\w-])/.test(original)
  ) {
    return null;
  }

  const lines = repaired.split(/\r?\n/);
  const converted = lines.map((line) => convertLine(line));
  const text = converted.join("\n");

  if (text === original) return null;
  writeFileSync(path, text, "utf8");
  return relative(process.cwd(), path);
}

const files = [];
function walk(path) {
  let stats;
  try {
    stats = statSync(path);
  } catch {
    return;
  }
  if (stats.isDirectory()) {
    const name = path.split(/[\\/]/).pop() ?? "";
    if (SKIP_DIRS.has(name)) return;
    for (const child of readdirSync(path)) walk(join(path, child));
    return;
  }
  const extension = path.slice(path.lastIndexOf("."));
  if (!EXTENSIONS.has(extension)) return;
  const relativePath = relative(process.cwd(), path).split("\\").join("/");
  if (SKIP_FILES.has(relativePath)) return;
  files.push(path);
}

for (const root of ROOTS) walk(root);

const touched = files.map(processFile).filter(Boolean);
console.log(`Zmodyfikowane pliki: ${touched.length}`);
for (const file of touched.slice(0, 25)) console.log(`  ${file}`);
