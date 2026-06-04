import {
  pgTable,
  text,
  boolean,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

// Catalog tables. Mirror of the static data in /data so migration is 1:1.
// The app keeps reading /data until DATABASE_URL is set and the seed has run;
// see db/README.md for the cutover.

export const categories = pgTable("categories", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  description: text("description").notNull(),
  sort: integer("sort").default(0).notNull(),
});

export const series = pgTable("series", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  brand: text("brand").notNull(),
  description: text("description").notNull(),
});

export const subSeries = pgTable(
  "sub_series",
  {
    slug: text("slug").primaryKey(),
    seriesSlug: text("series_slug")
      .notNull()
      .references(() => series.slug),
    name: text("name").notNull(),
    sort: integer("sort").default(0).notNull(),
  },
  (t) => [index("sub_series_series_idx").on(t.seriesSlug)],
);

export const products = pgTable(
  "products",
  {
    slug: text("slug").primaryKey(),
    name: text("name").notNull(),
    sku: text("sku").notNull(),
    brand: text("brand").notNull(),
    categorySlug: text("category_slug")
      .notNull()
      .references(() => categories.slug),
    description: text("description").notNull(),
    image: text("image").notNull(),
    featured: boolean("featured").default(false).notNull(),
    seriesSlug: text("series_slug").references(() => series.slug),
    subSeriesSlug: text("sub_series_slug").references(() => subSeries.slug),
    // { name, hex } — null for non-plate products.
    color: jsonb("color").$type<{ name: string; hex: string } | null>(),
    sort: integer("sort").default(0).notNull(),
  },
  (t) => [
    index("products_category_idx").on(t.categorySlug),
    index("products_series_idx").on(t.seriesSlug),
    index("products_sub_series_idx").on(t.subSeriesSlug),
    index("products_featured_idx").on(t.featured),
  ],
);

export type ProductRow = typeof products.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type SeriesRow = typeof series.$inferSelect;
export type SubSeriesRow = typeof subSeries.$inferSelect;
