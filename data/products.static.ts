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
    slug: "tub-fleksibel-20mm-bardhe",
    name: "Tub fleksibël PVC Ø20mm, i bardhë",
    sku: "GWT20WH",
    brand: "Gewiss",
    category: "sistemi-og",
    description:
      "Tub elektrik fleksibël PVC, diametër 20mm, i bardhë, për instalim të brendshëm muri dhe tavani.",
    image: "/products/placeholder.svg",
  },
  {
    slug: "kuti-derivacioni-100x100",
    name: "Kuti derivacioni 100x100mm IP55",
    sku: "GWB100",
    brand: "Gewiss",
    category: "sistemi-og",
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

// Tabela & Ormanë — switchboards and enclosures (specs from Gewiss catalogue).
// Image filenames are case-sensitive on Vercel, kept exactly as uploaded.
function tabel(
  sku: string,
  file: string,
  name: string,
  description: string,
  featured?: boolean,
): Product {
  return {
    slug: `tabel-${sku.toLowerCase()}`,
    name,
    sku,
    brand: "Gewiss",
    category: "tabela-ormane",
    description,
    image: `/products/tabela-ormane/${file}`,
    featured,
  };
}

const tabelaProducts: Product[] = [
  // 40 CDE — flush boards, blank door + metal frame, IP40.
  tabel("GW40151N", "GW40151n.webp", "Tabel inkasi 12 module",
    "Tabel elektrik nga inkasi, 12 (12+2) module, derë e verbër me kornizë metalike, IP40. Për instalime rezidenciale në mur."),
  tabel("GW40152N", "GW40152n.webp", "Tabel inkasi 24 module",
    "Tabel elektrik nga inkasi, 24 (24+4) module, derë e verbër me kornizë metalike, IP40."),
  tabel("GW40153N", "GW40153n.webp", "Tabel inkasi 36 module",
    "Tabel elektrik nga inkasi, 36 (36+6) module, derë e verbër me kornizë metalike, IP40."),
  tabel("GW40154N", "GW40154n.webp", "Tabel inkasi 48 module",
    "Tabel elektrik nga inkasi, 48 module, derë e verbër me kornizë metalike, IP40."),
  tabel("GW40155N", "GW40155N.webp", "Tabel inkasi 60 module",
    "Tabel elektrik nga inkasi, 60 module, derë e verbër me kornizë metalike, IP40."),

  // 40 series — decorative flush boards, smoked door, toner black, IP40.
  tabel("GW40229TN", "gw40229tn.webp", "Tabel dekorativ 12 module — derë fumé",
    "Tabel dekorativ nga inkasi, 12+1 module, derë fumé, ngjyrë e zezë (toner). Përmasa 330×218×25 mm, IP40."),
  tabel("GW40233TN", "gw40233tn.webp", "Tabel dekorativ 24 module — derë fumé",
    "Tabel dekorativ nga inkasi, 24+2 module, derë fumé, ngjyrë e zezë (toner). Përmasa 330×338×28 mm, IP40."),
  tabel("GW40239TN", "gw40239tn.webp", "Tabel dekorativ 36 module — derë fumé",
    "Tabel dekorativ nga inkasi, 36+3 module, derë fumé, ngjyrë e zezë (toner). Përmasa 330×493×28 mm, IP40."),

  // 40 CDI — flush distribution boards, blank door, IP40.
  tabel("GW40886", "GW40886.webp", "Tabel inkasi 24 module — derë e verbër",
    "Tabel shpërndarës nga inkasi, 24 (12×2) module, derë e verbër, e bardhë RAL 9016. Përmasa 330×420×85 mm, IP40.", true),
  tabel("GW40889", "GW40889.webp", "Tabel inkasi 36 module — derë e verbër",
    "Tabel shpërndarës nga inkasi, 36 (18×2) module, derë e verbër, e bardhë RAL 9016. Përmasa 465×505×85 mm, IP40."),
  tabel("GW40890", "GW40890.webp", "Tabel inkasi 54 module — derë e verbër",
    "Tabel shpërndarës nga inkasi, 54 (18×3) module, derë e verbër, e bardhë RAL 9016, IP40."),
  tabel("GW40891", "GW40891.webp", "Tabel inkasi 72 module — derë e verbër",
    "Tabel shpërndarës nga inkasi, 72 (18×4) module, derë e verbër, e bardhë RAL 9016. Përmasa 465×880×95 mm, IP40."),

  // 46 range — polyester enclosures, blank door + lock, IP66, grey RAL 7035.
  tabel("GW46001F", "gw46001f.webp", "Orman poliesteri IP66 — 250×300×160",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 250×300×160 mm. Për shpërndarje dhe automatizim brenda e jashtë."),
  tabel("GW46002F", "gw46002f.webp", "Orman poliesteri IP66 — 310×425×160",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 310×425×160 mm."),
  tabel("GW46003F", "gw46003f.webp", "Orman poliesteri IP66 — 405×500×200",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 405×500×200 mm."),
  tabel("GW46004F", "gw46004f.webp", "Orman poliesteri IP66 — 405×650×200",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 405×650×200 mm."),
  tabel("GW46005F", "gw46005f.webp", "Orman poliesteri IP66 — 515×650×250",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 515×650×250 mm."),
  tabel("GW46006F", "gw46006f.webp", "Orman poliesteri IP66 — 585×800×300",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 585×800×300 mm."),
  tabel("GW46007F", "gw46007f.webp", "Orman poliesteri IP66 — 800×1060×350",
    "Orman nga poliesteri me fibër qelqi, derë e verbër me bravë, IP66, gri RAL 7035. Përmasa 800×1060×350 mm. Për shpërndarje fuqie të lartë dhe automatizim."),
];

// Sistemi OG — conduits, fittings and clips (Gewiss FK/RK + GW-FIT).
// Image filenames are case-sensitive on Vercel, kept exactly as uploaded.
function og(sku: string, file: string, name: string, description: string): Product {
  return {
    slug: `og-${sku.toLowerCase()}`,
    name,
    sku,
    brand: "Gewiss",
    category: "sistemi-og",
    description,
    image: `/products/sistemi-og/${file}`,
  };
}

const sistemiOgProducts: Product[] = [
  // RK15 rigid medium tube, PVC, 3 m, grey RAL 7035.
  og("DX25316", "dx25316.webp", "Tub i ngurtë RK15 Ø16mm",
    "Tub mbrojtës i ngurtë RK15, PVC, gjatësi 3 m, Ø16 mm, gri RAL 7035."),
  og("DX25320", "dx25320.webp", "Tub i ngurtë RK15 Ø20mm",
    "Tub mbrojtës i ngurtë RK15, PVC, gjatësi 3 m, Ø20 mm, gri RAL 7035."),
  og("DX25325", "dx25325.webp", "Tub i ngurtë RK15 Ø25mm",
    "Tub mbrojtës i ngurtë RK15, PVC, gjatësi 3 m, Ø25 mm, gri RAL 7035."),
  og("DX25332", "dx25332.webp", "Tub i ngurtë RK15 Ø32mm",
    "Tub mbrojtës i ngurtë RK15, PVC, gjatësi 3 m, Ø32 mm, gri RAL 7035."),

  // Diflex spiral flexible sheath, grey RAL 7035.
  og("DX30016", "dx30016.webp", "Guaskë spirale Diflex Ø16mm",
    "Guaskë (tub) spirale fleksibël Diflex, Ø16 mm, gri RAL 7035. Mbrojtje kabllosh."),
  og("DX30020", "dx30020.webp", "Guaskë spirale Diflex Ø20mm",
    "Guaskë (tub) spirale fleksibël Diflex, Ø20 mm, gri RAL 7035. Mbrojtje kabllosh."),
  og("DX30025", "dx30025.webp", "Guaskë spirale Diflex Ø25mm",
    "Guaskë (tub) spirale fleksibël Diflex, Ø25 mm, gri RAL 7035. Mbrojtje kabllosh."),
  og("DX30032", "dx30032.webp", "Guaskë spirale Diflex Ø32mm",
    "Guaskë (tub) spirale fleksibël Diflex, Ø32 mm, gri RAL 7035. Mbrojtje kabllosh."),

  // GW-FIT T-junction fittings, polymer, grey RAL 7035.
  og("DX40216", "dx40216.webp", "Lidhëse T për tub Ø16mm",
    "Lidhëse në T për tub të ngurtë, polimer antiurt, Ø16 mm, gri RAL 7035."),
  og("DX40220", "dx40220.webp", "Lidhëse T për tub Ø20mm",
    "Lidhëse në T për tub të ngurtë, polimer antiurt, Ø20 mm, gri RAL 7035."),
  og("DX40225", "DX40225.webp", "Lidhëse T për tub Ø25mm",
    "Lidhëse në T për tub të ngurtë, polimer antiurt, Ø25 mm, gri RAL 7035."),
  og("DX40232", "DX40232.webp", "Lidhëse T për tub Ø32mm",
    "Lidhëse në T për tub të ngurtë, polimer antiurt, Ø32 mm, gri RAL 7035."),

  // GW-FIT 90° elbow fittings, polymer, grey RAL 7035.
  og("DX40316", "DX40316.webp", "Bërryl 90° për tub Ø16mm",
    "Lidhëse bërryl 90° për tub të ngurtë, polimer antiurt, Ø16 mm, gri RAL 7035."),
  og("DX40320", "DX40320.webp", "Bërryl 90° për tub Ø20mm",
    "Lidhëse bërryl 90° për tub të ngurtë, polimer antiurt, Ø20 mm, gri RAL 7035."),
  og("DX40325", "DX40325.webp", "Bërryl 90° për tub Ø25mm",
    "Lidhëse bërryl 90° për tub të ngurtë, polimer antiurt, Ø25 mm, gri RAL 7035."),
  og("DX40332", "DX40332.webp", "Bërryl 90° për tub Ø32mm",
    "Lidhëse bërryl 90° për tub të ngurtë, polimer antiurt, Ø32 mm, gri RAL 7035."),

  // Snap-fit saddle clips, shockproof polymer, grey RAL 7035.
  og("GW50601", "gw50601.webp", "Mbajtëse tubi Ø16mm",
    "Mbajtëse me kërcim (clip) për tub të ngurtë, polimer antiurt, Ø16 mm, gri RAL 7035."),
  og("GW50602", "gw50602.webp", "Mbajtëse tubi Ø20mm",
    "Mbajtëse me kërcim (clip) për tub të ngurtë, polimer antiurt, Ø20 mm, gri RAL 7035."),
  og("GW50603", "gw50603.webp", "Mbajtëse tubi Ø25mm",
    "Mbajtëse me kërcim (clip) për tub të ngurtë, polimer antiurt, Ø25 mm, gri RAL 7035."),
  og("GW50604", "gw50604.webp", "Mbajtëse tubi Ø32mm",
    "Mbajtëse me kërcim (clip) për tub të ngurtë, polimer antiurt, Ø32 mm, gri RAL 7035."),
];

// Automatika & Siguresa — breakers, RCDs, surge protectors, busbars.
function sig(
  sku: string,
  file: string,
  name: string,
  description: string,
  featured?: boolean,
): Product {
  return {
    slug: `sig-${sku.toLowerCase()}`,
    name,
    sku,
    brand: "Gewiss",
    category: "automatika-siguresa",
    description,
    image: `/products/siguresat/${file}`,
    featured,
  };
}

const siguresatProducts: Product[] = [
  sig("GW91507", "gw91507.webp", "Çelës automatik magnetotermik",
    "Çelës automatik magnetotermik modular Gewiss, mbrojtje nga mbingarkesa dhe lidhja e shkurtër për tabela shpërndarjeje."),
  sig("GWD4122", "gwd4122.webp", "Diferencial 4P 40A 30mA Tip AC",
    "Çelës diferencial i pastër (IDP), 4 polësh, 40A, ndjeshmëri 30mA, tip AC i menjëhershëm. 4 module.", true),
  sig("GWD6401", "GWD6401.webp", "Mbrojtës mbitensioni SPD 1P+N 12.5kA — Tip 1+2",
    "Mbrojtës nga mbitensioni (SPD) seria LST, 1P+N, 12.5 kA, Tip 1+2. 2 module."),
  sig("GWD6402", "GWD6402.webp", "Mbrojtës mbitensioni SPD 3P+N 12.5kA — Tip 1+2",
    "Mbrojtës nga mbitensioni (SPD) seria LST, 3P+N, 12.5 kA, Tip 1+2. 4 module."),
  sig("GWD6404", "GWD6404.webp", "Mbrojtës mbitensioni SPD 1P+N 25kA — Tip 1+2",
    "Mbrojtës nga mbitensioni (SPD) seria LST, 1P+N, 25 kA, Tip 1+2. 4 module."),
  sig("GW96996", "gw96996.webp", "Krehër lidhës me forcellë 1P 63A",
    "Krehër lidhës (pettine) me forcellë, 1 polësh, 63A, gjatësi 1 m. Për lidhjen e çelësave modularë në tabelë."),
  sig("GW96998", "gw96998.webp", "Krehër lidhës me forcellë 3P 63A",
    "Krehër lidhës (pettine) me forcellë, 3 polësh, 63A, gjatësi 1 m, deri 56 module. Për lidhjen e çelësave modularë."),
];

// Static catalog source. Used ONLY by the DB seed (scripts/seed.ts).
// Runtime reads come from Neon via data/products.ts.
export const staticProducts: Product[] = [
  ...generatePlates(),
  ...baseProducts,
  ...tabelaProducts,
  ...sistemiOgProducts,
  ...siguresatProducts,
];
