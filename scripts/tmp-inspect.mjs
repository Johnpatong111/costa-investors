import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const out = [];
const dir = "src/lib/data/services";
for (const file of readdirSync(dir)) {
  if (!file.endsWith(".ts") || file === "index.ts" || file === "types.ts") continue;
  const source = readFileSync(join(dir, file), "utf8");
  const name = source.match(/^\s{2}name: "([^"]+)"/m)?.[1] ?? "?";
  const genitive = source.match(/^\s{2}nameGenitive: "([^"]+)"/m)?.[1] ?? "?";
  out.push(`PL ${file} :: ${name} / ${genitive}`);
}

for (const file of ["src/lib/i18n/content/en.ts", "src/lib/i18n/content/es.ts"]) {
  const source = readFileSync(file, "utf8");
  const start = source.indexOf("service: {");
  const block = source.slice(start, start + 6000);
  const matches = block.matchAll(/^\s{4}([a-z-]+): \{\s*\n\s*name: "([^"]+)"/gm);
  for (const match of matches) out.push(`${file} :: ${match[1]} = ${match[2]}`);
}

const valuation = [];
for (const folder of ["src/lib/data/services", "src/lib/i18n", "src/lib/content", "src/components"]) {
  for (const file of readdirSync(folder, { recursive: true })) {
    if (!/\.(ts|tsx)$/.test(String(file))) continue;
    const path = join(folder, String(file));
    const source = readFileSync(path, "utf8");
    const hits = (source.match(/wycen\w*|valuation|tasaci\w*/gi) ?? []).length;
    if (hits > 0) valuation.push(`${path}: ${hits}`);
  }
}

console.log(out.join("\n"));
console.log("--- valuation hits ---");
console.log(valuation.join("\n"));
