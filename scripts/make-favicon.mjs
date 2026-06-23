// Generates a square favicon (app/icon.png) from the wide ntshbeli logo.
// Logo is ~2.5:1, so it's letterboxed onto a square white tile with padding.
import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const SRC = path.join(root, "public", "brand", "ntshbeli-logo.svg");
const OUT = path.join(root, "app", "icon.png");

const SIZE = 512; // canvas
const PAD = 28; // padding each side
const innerW = SIZE - PAD * 2;

// Rasterize the SVG, trim its internal whitespace, then scale to fill the
// tile width so the mark is as large/legible as possible at favicon sizes.
const logo = await sharp(SRC, { density: 512 })
  .trim()
  .resize({ width: innerW, fit: "inside" })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: SIZE,
    height: SIZE,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 }, // white tile
  },
})
  .composite([{ input: logo, gravity: "centre" }])
  .png()
  .toFile(OUT);

console.log("wrote", OUT);
