import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/**
 * ===========================================================================
 * GENERATOR IKON (favicon.ico + apple-touch-icon.png)
 * ===========================================================================
 * Rysuje sygnet marki (zaokrąglony kwadrat + dach + horyzont + słońce)
 * w buforze RGBA i zapisuje PNG (własny enkoder na zlib) oraz ICO
 * (kontener z osadzonymi PNG). Zero zależności zewnętrznych.
 *
 * Uruchomienie: `node scripts/generate-icons.mjs`
 */

const BG = [11, 37, 69]; // #0b2545 (brand-900)
const FG = [255, 255, 255];

/* ------------------------------- geometria ------------------------------- */

const SEGMENTS = [
  [14, 28.6, 32, 14, 4.6, 1], // dach – lewe ramię
  [32, 14, 50, 28.6, 4.6, 1], // dach – prawe ramię
  [17, 42.4, 47, 42.4, 3.8, 0.45], // horyzont (przygaszony)
];

const ARC = { cx: 32, cy: 42.4, r: 9, w: 4.6 };

function insideRoundedRect(x, y, size, radius) {
  const min = radius;
  const max = size - radius;
  if (x >= min && x <= max) return y >= 0 && y <= size;
  if (y >= min && y <= max) return x >= 0 && x <= size;
  const cx = x < min ? min : max;
  const cy = y < min ? min : max;
  return (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2;
}

function distanceToSegment(px, py, [x1, y1, x2, y2]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  const t =
    lengthSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/** Kolor punktu próbki w układzie 64×64. */
function sample(x64, y64) {
  let alpha = 0;

  for (const [x1, y1, x2, y2, width, opacity] of SEGMENTS) {
    if (distanceToSegment(x64, y64, [x1, y1, x2, y2]) <= width / 2) {
      alpha = Math.max(alpha, opacity);
    }
  }

  const distToArc = Math.abs(Math.hypot(x64 - ARC.cx, y64 - ARC.cy) - ARC.r);
  if (distToArc <= ARC.w / 2 && y64 <= ARC.cy + 0.5) alpha = Math.max(alpha, 1);

  return [
    Math.round(BG[0] * (1 - alpha) + FG[0] * alpha),
    Math.round(BG[1] * (1 - alpha) + FG[1] * alpha),
    Math.round(BG[2] * (1 - alpha) + FG[2] * alpha),
  ];
}

/** Render ikony o boku `size` z antyaliasingiem (supersampling 3×3). */
function render(size) {
  const scale = 64 / size;
  const radius = (14 / 64) * size;
  const samples = 3;
  const data = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let hits = 0;

      for (let sy = 0; sy < samples; sy += 1) {
        for (let sx = 0; sx < samples; sx += 1) {
          const px = x + (sx + 0.5) / samples;
          const py = y + (sy + 0.5) / samples;
          if (!insideRoundedRect(px, py, size, radius)) continue;
          const [cr, cg, cb] = sample(px * scale, py * scale);
          r += cr;
          g += cg;
          b += cb;
          hits += 1;
        }
      }

      const index = (y * size + x) * 4;
      const coverage = hits / (samples * samples);
      if (hits === 0) continue;

      data[index] = Math.round(r / hits);
      data[index + 1] = Math.round(g / hits);
      data[index + 2] = Math.round(b / hits);
      data[index + 3] = Math.round(coverage * 255);
    }
  }

  return data;
}

/* -------------------------------- enkoder -------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const typeBuffer = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function encodePng(size, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // RGBA
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const stride = size * 4 + 1;
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y += 1) {
    raw[y * stride] = 0; // filtr „None"
    rgba.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function encodeIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

/* --------------------------------- zapis --------------------------------- */

function write(path, buffer) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buffer);
  console.log(`✓ ${path} (${(buffer.length / 1024).toFixed(1)} kB)`);
}

const icoSizes = [16, 32, 48];
const icoImages = icoSizes.map((size) => ({ size, png: encodePng(size, render(size)) }));

write("public/favicon.ico", encodeIco(icoImages));
write("public/apple-touch-icon.png", encodePng(180, render(180)));
write("public/icon-512.png", encodePng(512, render(512)));
