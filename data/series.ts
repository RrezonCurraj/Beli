export type SeriesSlug = "system" | "chorus";

export type SubSeries = {
  slug: string;
  name: string;
};

export type Series = {
  slug: SeriesSlug;
  name: string;
  shortName: string;
  brand: "Gewiss";
  description: string;
  subSeries: SubSeries[];
};

export const series: Series[] = [
  {
    slug: "system",
    name: "Gamma System",
    shortName: "System",
    brand: "Gewiss",
    description:
      "Seria System me dizajn linear dhe pllaka System Top e Virna — për instalime rezidenciale dhe komerciale.",
    subSeries: [
      { slug: "system-top", name: "System Top" },
      { slug: "virna", name: "Virna" },
    ],
  },
  {
    slug: "chorus",
    name: "Gamma Chorus",
    shortName: "Chorus",
    brand: "Gewiss",
    description:
      "Seria Chorus me finitura One, Geo, Lux, Ice, IceTouch dhe Ego — fleksibilitet maksimal estetik për çdo ambient.",
    subSeries: [
      { slug: "one", name: "One" },
      { slug: "geo", name: "Geo" },
      { slug: "lux", name: "Lux" },
      { slug: "ice", name: "Ice" },
      { slug: "icetouch", name: "IceTouch" },
      { slug: "ego", name: "Ego" },
    ],
  },
];

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function getSubSeries(
  seriesSlug: string,
  subSlug: string,
): SubSeries | undefined {
  return getSeries(seriesSlug)?.subSeries.find((s) => s.slug === subSlug);
}
