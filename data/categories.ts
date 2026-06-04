export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  /** Optional dedicated hero image. Falls back to a product photo. */
  image?: string;
};

export const categories: Category[] = [
  {
    slug: "celesa-priza",
    name: "Çelësa & Priza",
    shortName: "Çelësa & Priza",
    description:
      "Seritë Gewiss Chorus dhe System: çelësa drite, priza Schuko, USB dhe rrjete strukturuese për banesa dhe zyra.",
  },
  {
    slug: "automatika-siguresa",
    name: "Automatika & Siguresa",
    shortName: "Automatika",
    description:
      "Çelësa automatikë, diferencialë, mbrojtës nga mbitensioni dhe siguresa modulare për tabelat elektrike.",
  },
  {
    slug: "kuti-shperndarese",
    name: "Kuti Shpërndarëse",
    shortName: "Kuti shpërndarëse",
    description:
      "Kuti modulare të jashtme dhe të brendshme, seria 40CDK dhe 40CDX, për tabela elektrike rezidenciale dhe industriale.",
  },
  {
    slug: "ndricim",
    name: "Ndriçim",
    shortName: "Ndriçim",
    description:
      "Llamba LED, panele, projektorë dhe ndriçim emergjence për ambiente komerciale dhe industriale.",
  },
  {
    slug: "sisteme-tubacioni",
    name: "Sisteme Tubacioni",
    shortName: "Tubacione",
    description:
      "Tuba të lakueshëm, kuti derivacioni dhe aksesorë instalimi për sistemet elektrike të brendshme dhe të jashtme.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
