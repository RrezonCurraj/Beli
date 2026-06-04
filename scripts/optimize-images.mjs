// Batch-convert product photos to web-optimized WebP.
// Walks public/products, converts .jpg/.jpeg/.png -> .webp (max 1000px, q82),
// then removes the original. Skips .svg and already-optimized .webp.
//
// Usage: node scripts/optimize-images.mjs
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/products/", import.meta.url).pathname;
const MAX = 1000;
const QUALITY = 82;
const CONVERT = new Set([".jpg", ".jpeg", ".png"]);

let count = 0;
let beforeBytes = 0;
let afterBytes = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if (!CONVERT.has(ext)) continue;

    const before = (await stat(full)).size;
    const out = full.slice(0, -ext.length) + ".webp";

    await sharp(full)
      .resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);

    const after = (await stat(out)).size;
    await unlink(full);

    count++;
    beforeBytes += before;
    afterBytes += after;
    console.log(
      `${entry.name} -> ${out.split("/").pop()}  ` +
        `${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
    );
  }
}

await walk(ROOT);
console.log(
  `\nDone. ${count} files. ` +
    `${(beforeBytes / 1e6).toFixed(1)}MB -> ${(afterBytes / 1e6).toFixed(1)}MB`,
);
