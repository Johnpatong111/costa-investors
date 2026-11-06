/* eslint-disable no-console */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Audyt typografii: wykrywa półpauzy (–), pauzy (—) i podwójne myślniki (--).
 * Kod wyjścia 1 = znaleziska istnieją (bramka dla CI).
 *
 * Uruchomienie: node scripts/audit-dashes.mjs [--fix]
 */

const ROOTS = ["src"];
const EXTENSIONS = new Set([".ts", ".tsx", ".md", ".css", ".json"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const SKIP_FILES = new Set(["scripts/audit-dashes.mjs", "scripts/fix-dashes.mjs"]);

const PATTERNS = [
  { label: "półpauza (–)", pattern: /\u2013/g },
  { label: "pauza (—)", pattern: /\u2014/g },
  // Podwójny myślnik w prozie (bez zmiennych CSS `--color-*` i bez `--tw-*`).
  { label: "podwójny myślnik (--)", pattern: /(?<![\w-])--(?![\w-])/g },
];

/** Linie z regexem zawierającym myślnik – tam podmiana zmieniłaby semantykę. */
export const REGEX_GUARD = /\/[^/\n]*[\u2013\u2014][^/\n]*\//;

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
  files.push({ path, relativePath });
}

for (const root of ROOTS) walk(root);

const byFile = [];
let total = 0;

for (const file of files) {
  const source = readFileSync(file.path, "utf8");
  const counts = PATTERNS.map((rule) => ({ label: rule.label, count: (source.match(rule.pattern) ?? []).length }));
  const sum = counts.reduce((acc, item) => acc + item.count, 0);
  if (sum > 0) {
    byFile.push({ file: file.relativePath, sum, counts });
    total += sum;
  }
}

byFile.sort((a, b) => b.sum - a.sum);

console.log(`Plików ze znaleziskami: ${byFile.length} · wystąpień: ${total}`);
for (const entry of byFile.slice(0, 20)) {
  const detail = entry.counts
    .filter((item) => item.count > 0)
    .map((item) => `${item.label}: ${item.count}`)
    .join(", ");
  console.log(`  ${entry.file.padEnd(52)} ${String(entry.sum).padStart(4)}  (${detail})`);
}
if (byFile.length > 20) console.log(`  … i ${byFile.length - 20} więcej plików`);

process.exit(total === 0 ? 0 : 1);
