import type { Category } from "./categories";
import type { SeriesSlug } from "./series";
import { getSeries, getSubSeries } from "./series";

export type Brand = "Gewiss" | "Marlanvil";

export type ProductColor = {
  name: string;
  /** CSS hex for the swatch. Placeholder until real finishes supplied. */
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  sku: string;
  brand: Brand;
  category: Category["slug"];
  description: string;
  image: string;
  featured?: boolean;
  /** Gewiss wiring range — only set for çelësa & priza. */
  series?: SeriesSlug;
  /** Sub-series (finitura) slug within the series (e.g. "one", "virna"). */
  subSeries?: string;
  /** Color/finish of this plate variant. */
  color?: ProductColor;
};

// ---------------------------------------------------------------------------
// Base catalog — non-plate products (one row each).
// ---------------------------------------------------------------------------
const baseProducts: Product[] = [
  {
    slug: "celes-automatik-1p-c16",
    name: "Çelës automatik 1P C16 6kA",
    sku: "GW92106",
    brand: "Gewiss",
    category: "automatika-siguresa",
    description:
      "Çelës automatik magnetotermik 1P, kurbë C, 16A, fuqi shkëputjeje 6kA. Për tabela rezidenciale.",
    image: "/products/placeholder.svg",
    featured: true,
  },
  {
    slug: "diferencial-2p-25a-30ma",
    name: "Diferencial 2P 25A 30mA Tip AC",
    sku: "GW94402",
    brand: "Gewiss",
    category: "automatika-siguresa",
    description:
      "Çelës diferencial 2 polësh, 25A, ndjeshmëri 30mA, tip AC. Mbrojtje nga rryma reziduale.",
    image: "/products/placeholder.svg",
  },
  {
    slug: "kuti-shperndarese-12-mod-pa",
    name: "Kuti shpërndarëse 12 module IP40",
    sku: "GW40104PM",
    brand: "Gewiss",
    category: "kuti-shperndarese",
    description:
      "Kuti shpërndarëse e brendshme, 12 module, IP40, e bardhë. Seria 40CDX me derë transparente.",
    image: "/products/placeholder.svg",
    featured: true,
  },
  {
    slug: "panel-led-60x60-40w-4000k",
    name: "Panel LED 60x60 40W 4000K",
    sku: "GWP6040N",
    brand: "Gewiss",
    category: "ndricim",
    description:
      "Panel LED i sipërm 60x60cm, 40W, 4000K (e bardhë neutrale), fluks 4000 lm. I përshtatshëm për zyra dhe shkolla.",
    image: "/products/placeholder.svg",
    featured: true,
  },
  {
    slug: "projektor-led-50w-ip65",
    name: "Projektor LED 50W IP65",
    sku: "GWP5065",
    brand: "Gewiss",
    category: "ndricim",
    description:
      "Projektor LED i jashtëm 50W, IP65, 5000K. Për fasada, parkingje dhe ambiente industriale.",
    image: "/products/placeholder.svg",
  },
  {
    slug: "tub-fleksibel-20mm-bardhe",
    name: "Tub fleksibël PVC Ø20mm, i bardhë",
    sku: "GWT20WH",
    brand: "Gewiss",
    category: "sisteme-tubacioni",
    description:
      "Tub elektrik fleksibël PVC, diametër 20mm, i bardhë, për instalim të brendshëm muri dhe tavani.",
    image: "/products/placeholder.svg",
  },
  {
    slug: "kuti-derivacioni-100x100",
    name: "Kuti derivacioni 100x100mm IP55",
    sku: "GWB100",
    brand: "Gewiss",
    category: "sisteme-tubacioni",
    description:
      "Kuti derivacioni e jashtme 100x100x50mm, IP55, ngjyrë gri. Me kapak të vidhosur.",
    image: "/products/placeholder.svg",
  },
];

// ---------------------------------------------------------------------------
// Plate (placca) generator — color variants per finitura.
// PLACEHOLDER data: color names + SKUs are dummy until real Gewiss codes added.
// ---------------------------------------------------------------------------
const plateColors: ProductColor[] = [
  { name: "E bardhë", hex: "#F4F4F1" },
  { name: "E bardhë mat", hex: "#ECECE8" },
  { name: "Krem", hex: "#E9E0CC" },
  { name: "Rërë", hex: "#D9C9A8" },
  { name: "Bezhë", hex: "#C9B79A" },
  { name: "Gri e çelët", hex: "#CFCFCF" },
  { name: "Gri", hex: "#9C9C9C" },
  { name: "Gri teknik", hex: "#7C7F82" },
  { name: "Titan", hex: "#8A8D90" },
  { name: "Antracit", hex: "#3C3F42" },
  { name: "E zezë", hex: "#1B1B1D" },
  { name: "E zezë mat", hex: "#232323" },
  { name: "Argjend", hex: "#C2C5C8" },
  { name: "Aluminium", hex: "#AAB0B4" },
  { name: "Çelik inoks", hex: "#B7BCC0" },
  { name: "Bronz", hex: "#8A6A47" },
  { name: "Ar", hex: "#C7A24C" },
  { name: "Bakër", hex: "#9C6B4E" },
  { name: "Blu nate", hex: "#2E3A5C" },
  { name: "Blu", hex: "#36506F" },
  { name: "Jeshile pylli", hex: "#3F5E45" },
  { name: "E kuqe rubin", hex: "#8E2F2B" },
  { name: "Portokalli", hex: "#C75B2C" },
  { name: "Kafe", hex: "#5E463A" },
];

/** Real plate row: actual Gewiss SKU + color + photo. */
type PlateRow = {
  sku: string;
  color: ProductColor;
  image?: string;
};

type PlateSpec = {
  sub: string; // sub-series slug
  code: string; // SKU segment (used only for placeholder generation)
  featuredFirst?: boolean; // mark the first color as featured (homepage)
  /** Real data — when present, these are used instead of placeholders. */
  rows?: PlateRow[];
  /** Placeholder count — used only when `rows` is absent. */
  count?: number;
};

// Real System Top finishes (photos named by Gewiss code in /products/system-top).
const systemTopRows: PlateRow[] = [
  { sku: "gw22503", color: { name: "E bardhë", hex: "#F4F4F1" } },
  { sku: "gw22513", color: { name: "E zezë", hex: "#1B1B1D" } },
  { sku: "gw22523", color: { name: "E kuqe", hex: "#D8261F" } },
  { sku: "gw22533", color: { name: "Rubin", hex: "#7E1F1C" } },
  { sku: "gw22543", color: { name: "Jeshile mat", hex: "#9DB38C" } },
  { sku: "gw22553", color: { name: "Smerald", hex: "#0E5C3A" } },
  { sku: "gw22563", color: { name: "Blu avio", hex: "#5E84B0" } },
  { sku: "gw22573", color: { name: "Blu", hex: "#2A4FC4" } },
  { sku: "gw22583", color: { name: "E verdhë", hex: "#E0A92E" } },
  { sku: "gw22603", color: { name: "Argjend", hex: "#A9AEB2" } },
].map((r) => ({ ...r, image: `/products/system-top/${r.sku}.webp` }));

// Real Virna finishes (photos named by Gewiss code in /products/virna).
const virnaRows: PlateRow[] = [
  { sku: "gw22103", color: { name: "E bardhë", hex: "#F4F4F1" } },
  { sku: "gw22113", color: { name: "E zezë", hex: "#1B1B1D" } },
  { sku: "gw22123", color: { name: "E kuqe", hex: "#E5261C" } },
  { sku: "gw22133", color: { name: "Rubin", hex: "#7E1F1C" } },
  { sku: "gw22143", color: { name: "Jeshile mat", hex: "#BFD0AC" } },
  { sku: "gw22153", color: { name: "Smerald", hex: "#0E5C3A" } },
  { sku: "gw22163", color: { name: "Blu avio", hex: "#6E94C0" } },
  { sku: "gw22173", color: { name: "Blu", hex: "#1F39B0" } },
  { sku: "gw22183", color: { name: "E verdhë", hex: "#E0B23E" } },
  { sku: "gw22253", color: { name: "Krom", hex: "#C2C7CB" } },
  { sku: "gw22263", color: { name: "Ar", hex: "#C9A24B" } },
  { sku: "gw22273", color: { name: "Dru arre", hex: "#6B4A2E" } },
  { sku: "gw22293", color: { name: "Antracit", hex: "#3A3D40" } },
  { sku: "gw22823", color: { name: "Argjend metalik", hex: "#A9AEB2" } },
].map((r) => ({ ...r, image: `/products/virna/${r.sku}.webp` }));

// Chorus One & Geo share the same 12 finishes (Gewiss 2-letter color codes
// appended to the base SKU). Photos named e.g. gw16103tb.webp.
const chorusColors: Record<string, ProductColor> = {
  tb: { name: "E bardhë", hex: "#F4F4F1" },
  ti: { name: "Krem", hex: "#ECE6D6" },
  tc: { name: "Tortora", hex: "#C7B8A1" },
  vw: { name: "E bardhë mat", hex: "#F7F7F5" },
  vl: { name: "Argjend", hex: "#C9CAC9" },
  vt: { name: "Titan", hex: "#9A9DA0" },
  vo: { name: "Ar", hex: "#C9A24B" },
  vx: { name: "Shampanjë", hex: "#C2A878" },
  vd: { name: "Bordo", hex: "#8E5D60" },
  vz: { name: "Gri e errët", hex: "#5A5E62" },
  vn: { name: "E zezë mat", hex: "#2A2A2C" },
  tn: { name: "E zezë", hex: "#1B1B1D" },
};

const chorusOrder = ["tb", "ti", "tc", "vw", "vl", "vt", "vo", "vx", "vd", "vz", "vn", "tn"];

// Ice — glass plates.
const iceColors: Record<string, ProductColor> = {
  cb: { name: "E bardhë", hex: "#EDEFEF" },
  cl: { name: "Perlë", hex: "#D6D2CC" },
  ct: { name: "Gri", hex: "#B9BCC0" },
  cn: { name: "E zezë", hex: "#1A1A1C" },
};
const iceOrder = ["cb", "cl", "ct", "cn"];

// Ego.
const egoColors: Record<string, ProductColor> = {
  pw: { name: "E bardhë", hex: "#F7F7F7" },
  cy: { name: "Perlë", hex: "#DCDAD3" },
  nb: { name: "Krem", hex: "#DCD7C8" },
  ds: { name: "Bezhë", hex: "#B9A992" },
  br: { name: "Bronz", hex: "#A38C70" },
  cs: { name: "Shampanjë", hex: "#BFA07E" },
  st: { name: "Titan", hex: "#9A9488" },
  gr: { name: "Argjend", hex: "#C9CBCC" },
  db: { name: "Antracit", hex: "#3A3D40" },
  cg: { name: "Ar", hex: "#C9A24B" },
  cp: { name: "Bordo", hex: "#6E4B43" },
  bs: { name: "Kafe", hex: "#5E4A3E" },
};
const egoOrder = ["pw", "cy", "nb", "ds", "br", "cs", "st", "gr", "db", "cg", "cp", "bs"];

// Lux — premium plates with chrome inner frame.
const luxColors: Record<string, ProductColor> = {
  tb: { name: "E bardhë", hex: "#F4F4F1" },
  xw: { name: "E bardhë mat", hex: "#F7F7F7" },
  yb: { name: "E bardhë e ndezur", hex: "#FAFAFA" },
  xl: { name: "Gri e çelët", hex: "#CFCFCD" },
  vt: { name: "Argjend", hex: "#B9BBBD" },
  yt: { name: "Titan", hex: "#A8AAAC" },
  xs: { name: "Çelik", hex: "#B0A99C" },
  ws: { name: "Nikel", hex: "#A99E8C" },
  xg: { name: "Ar", hex: "#C9A24B" },
  xq: { name: "Bakër", hex: "#8A5A3C" },
  va: { name: "Antracit", hex: "#3A3A3C" },
  ya: { name: "Antracit mat", hex: "#34373A" },
  xm: { name: "E zezë mat", hex: "#2A2A2C" },
  tn: { name: "E zezë", hex: "#1C1C1E" },
  yn: { name: "E zezë e shkëlqyer", hex: "#161618" },
};
const luxOrder = ["tb", "xw", "yb", "xl", "vt", "yt", "xs", "ws", "xg", "xq", "va", "ya", "xm", "tn", "yn"];

function plateRows(
  baseSku: string,
  folder: string,
  order: string[],
  colors: Record<string, ProductColor>,
): PlateRow[] {
  return order.map((suf) => ({
    sku: `${baseSku}${suf}`,
    color: colors[suf],
    image: `/products/${folder}/${baseSku}${suf}.webp`,
  }));
}

const oneRows = plateRows("gw16103", "one", chorusOrder, chorusColors);
const geoRows = plateRows("gw16403", "geo", chorusOrder, chorusColors);
const iceRows = plateRows("gw16903", "ice", iceOrder, iceColors);
const iceTouchRows = plateRows("gw16955", "icetouch", iceOrder, iceColors);
const egoRows = plateRows("gw16003", "ego", egoOrder, egoColors);
const luxRows = plateRows("gw16203", "lux", luxOrder, luxColors);

const plateSpecs: PlateSpec[] = [
  { sub: "system-top", code: "TOP", featuredFirst: true, rows: systemTopRows },
  { sub: "virna", code: "VIR", rows: virnaRows },
  { sub: "one", code: "ONE", featuredFirst: true, rows: oneRows },
  { sub: "geo", code: "GEO", featuredFirst: true, rows: geoRows },
  { sub: "lux", code: "LUX", rows: luxRows },
  { sub: "ice", code: "ICE", rows: iceRows },
  { sub: "icetouch", code: "ICT", rows: iceTouchRows },
  { sub: "ego", code: "EGO", rows: egoRows },
];

const seriesOf: Record<string, SeriesSlug> = {
  "system-top": "system",
  virna: "system",
  one: "chorus",
  geo: "chorus",
  lux: "chorus",
  ice: "chorus",
  icetouch: "chorus",
  ego: "chorus",
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function generatePlates(): Product[] {
  const out: Product[] = [];
  for (const spec of plateSpecs) {
    const seriesSlug = seriesOf[spec.sub];
    const seriesShort = getSeries(seriesSlug)?.shortName ?? "";
    const subName = getSubSeries(seriesSlug, spec.sub)?.name ?? spec.sub;

    if (spec.rows) {
      // Real data: actual SKU + color + photo.
      spec.rows.forEach((row, i) => {
        out.push({
          slug: `pllake-${row.sku.toLowerCase()}`,
          name: `Pllakë ${seriesShort} ${subName} — ${row.color.name}`,
          sku: row.sku.toUpperCase(),
          brand: "Gewiss",
          category: "celesa-priza",
          description: `Pllakë mbuluese nga seria ${seriesShort}, finitura ${subName}, ngjyra ${row.color.name}.`,
          image: row.image ?? "/products/placeholder.svg",
          series: seriesSlug,
          subSeries: spec.sub,
          color: row.color,
          featured: spec.featuredFirst && i === 0 ? true : undefined,
        });
      });
      continue;
    }

    // Placeholder fallback until real data/photos are supplied.
    for (let i = 0; i < (spec.count ?? 0); i++) {
      const color = plateColors[i % plateColors.length];
      out.push({
        slug: `pllake-${spec.sub}-${pad2(i + 1)}`,
        name: `Pllakë ${seriesShort} ${subName} — ${color.name}`,
        sku: `GW-${spec.code}-${pad2(i + 1)}`,
        brand: "Gewiss",
        category: "celesa-priza",
        description:
          `Pllakë mbuluese nga seria ${seriesShort}, finitura ${subName}, ngjyra ${color.name}. ` +
          `Kodi është placeholder — kërkoni ofertë për disponueshmërinë dhe çmimin.`,
        image: "/products/placeholder.svg",
        series: seriesSlug,
        subSeries: spec.sub,
        color,
        featured: spec.featuredFirst && i === 0 ? true : undefined,
      });
    }
  }
  return out;
}

// Static catalog source. Used ONLY by the DB seed (scripts/seed.ts).
// Runtime reads come from Neon via data/products.ts.
export const staticProducts: Product[] = [
  ...generatePlates(),
  ...baseProducts,
];
