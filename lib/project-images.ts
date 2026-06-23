import fs from "node:fs";
import path from "node:path";

const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads /public/projektet/<slug> at build time and returns web paths for every
 * image (cover.jpg excluded — it's a duplicate of one of the originals).
 * Filenames are URL-encoded so spaces/odd characters resolve correctly.
 */
export function getProjectImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "projektet", slug);
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => IMAGE_RE.test(f) && f.toLowerCase() !== "cover.jpg")
    .sort()
    .map((f) => `/projektet/${slug}/${encodeURIComponent(f)}`);
}
