#!/usr/bin/env node
/**
 * Czyści artefakty, które potrafią „przeżyć” usunięte pliki:
 *  - `.next` (wygenerowane typy tras i cache builda),
 *  - `tsconfig.tsbuildinfo` (przyrostowy stan kompilatora),
 *  - `out` (statyczny eksport), `.turbo`.
 *
 * Użycie: `npm run clean`, a potem `npm run check`.
 * To leczy klasyczny objaw „IDE pokazuje błędy w plikach, których już nie ma”.
 */

import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = process.cwd();
const TARGETS = [".next", "out", "tsconfig.tsbuildinfo", ".turbo"];

const removed = [];

for (const target of TARGETS) {
  const absolute = resolve(ROOT, target);
  if (!existsSync(absolute)) continue;
  await rm(absolute, { recursive: true, force: true });
  removed.push(target);
}

if (removed.length === 0) {
  console.log("Nic do usunięcia – artefakty są już czyste.");
} else {
  console.log(`Usunięto: ${removed.join(", ")}`);
  console.log("Teraz: npm run check && npm run dev (albo restart TS Server w IDE).");
}
