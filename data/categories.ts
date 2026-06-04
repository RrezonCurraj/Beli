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
    image: "/products/qelsadhepriza.webp",
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
    slug: "tabela-ormane",
    name: "Tabela & Ormanë",
    shortName: "Tabela & Ormanë",
    description:
      "Tabela elektrike montimi, ormanë metalikë dhe polyesteri për shpërndarje e komandim në ambiente civile dhe industriale.",
  },
  {
    slug: "sistemi-og",
    name: "Sistemi OG",
    shortName: "Sistemi OG",
    description:
      "Tuba të lakueshëm, kuti derivacioni dhe aksesorë instalimi për sistemet elektrike të brendshme dhe të jashtme.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
