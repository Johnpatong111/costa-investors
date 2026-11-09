/* eslint-disable no-console */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * ===========================================================================
 * AUDYT WYCIEKÓW JĘZYKOWYCH (CI: `npm run audit:locale`)
 * ===========================================================================
 * Dwa poziomy kontroli:
 *  1. ŹRÓDŁA — pliki `.tsx` w `src/components` i `src/app`. Szukamy polskich
 *     znaków diakrytycznych w kodzie (poza komentarzami). To wyłapuje zaszyte
 *     napisy w JSX i atrybutach (aria-label, placeholder).
 *  2. ZBUDOWANY HTML — `.next/server/app/{en,es}`. Szukamy polskich znaków
 *     i śladów mojibake (Ã, Ä, Å, â€) w gotowych stronach EN/ES.
 *
 * Dlaczego to ma być w `npm run check`: poprzednio polskie napisy w formularzu
 * i polskie metadane strony głównej przeszły build bez ostrzeżenia, a były
 * widoczne dla użytkowników /en/ i /es/.
 */

const POLISH = /[ąćęłńśźżĄĆĘŁŃŚŹŻ]/;
const MOJIBAKE = /Ã|â€|Ä™|Ĺ‚/;
/** Strony prawne są celowo tylko po polsku (noindex) — poza kontrolą. */
const ALLOWED_PATHS = [
  "polityka-prywatnosci",
  "regulamin",
  // Globalne 404 Next nie dostaje segmentu [lang], więc nie da się go
  // zlokalizować bez cookies/Accept-Language. Świadomie poza kontrolą.
  "src/app/not-found.tsx",
  "src/app/[lang]/not-found.tsx",
  // TODO: strona „O nas” jest jeszcze tylko po polsku (statyczna treść).
  "src/app/[lang]/o-nas",
];
/**
 * Linie, w których polski tekst jest POPRAWNY, bo to slot języka PL:
 *   pl: "…"            — wpis w obiekcie Record<Locale, …>
 *   locale === "pl"    — gałąź warunkowa renderująca wersję polską
 */
const PL_SLOT = /\bpl:\s*["'`{]|locale\s*===\s*"pl"|lang\s*===\s*"pl"|locale\s*===\s*"(es|en)"|^\s*:\s/;

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/([^:])\/\/.*$/gm, "$1");
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const problems: string[] = [];

/* ---------------------------- 1. źródła ---------------------------- */
for (const file of [...walk("src/components"), ...walk("src/app")]) {
  const normalized = file.split("\\").join("/");
  if (ALLOWED_PATHS.some((allowed) => normalized.includes(allowed))) continue;
  const code = stripComments(readFileSync(file, "utf8"));
  code.split(/\r?\n/).forEach((line, index) => {
    if (POLISH.test(line) && !PL_SLOT.test(line)) {
      problems.push(`${file}:${index + 1} polskie znaki w kodzie → ${line.trim().slice(0, 100)}`);
    }
  });
}

/* ----------------------- 2. zbudowany HTML ----------------------- */
const builtRoot = ".next/server/app";
let checkedHtml = 0;

for (const locale of ["en", "es"]) {
  const dir = join(builtRoot, locale);
  if (!existsSync(dir)) continue;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop() as string;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      checkedHtml += 1;
      const html = readFileSync(full, "utf8");
      const polishHit = html.match(POLISH);
      const mojibakeHit = html.match(MOJIBAKE);
      if (polishHit || mojibakeHit) {
        const index = html.search(POLISH.test(html as string) ? POLISH : MOJIBAKE);
        const snippet = html.slice(Math.max(0, index - 60), index + 60).replace(/\s+/g, " ");
        problems.push(
          `${full} → ${polishHit ? `polski znak „${polishHit[0]}”` : `mojibake „${mojibakeHit?.[0] ?? "?"}”`}: …${snippet}…`,
        );
      }
    }
  }
}

console.log("=== AUDYT WYCIEKÓW JĘZYKOWYCH ===");
console.log(`Sprawdzono HTML EN/ES: ${checkedHtml} plików${checkedHtml === 0 ? " (brak builda — uruchom `npm run build`)" : ""}`);

if (problems.length === 0) {
  console.log("Brak wycieków: komponenty i strony EN/ES czyste.");
} else {
  console.log(`\nZnaleziono ${problems.length} problemów:`);
  problems.slice(0, 30).forEach((problem) => console.log(`• ${problem}`));
  if (problems.length > 30) console.log(`… i ${problems.length - 30} więcej.`);
  process.exitCode = 1;
}

void statSync;
