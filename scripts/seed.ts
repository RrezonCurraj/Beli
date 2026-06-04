// Seed Neon from the static /data files (1:1). Idempotent (upsert by PK).
// Run: npm run db:seed  (needs DATABASE_URL)
import { sql } from "drizzle-orm";
import { categories } from "../data/categories";
import { series } from "../data/series";
import { staticProducts } from "../data/products.static";
import { getDb, schema } from "../db";

const db = getDb();

async function main() {
  await db
    .insert(schema.categories)
    .values(
      categories.map((c, i) => ({
        slug: c.slug,
        name: c.name,
        shortName: c.shortName,
        description: c.description,
        sort: i,
      })),
    )
    .onConflictDoUpdate({
      target: schema.categories.slug,
      set: {
        name: sql`excluded.name`,
        shortName: sql`excluded.short_name`,
        description: sql`excluded.description`,
      },
    });

  await db
    .insert(schema.series)
    .values(
      series.map((s) => ({
        slug: s.slug,
        name: s.name,
        shortName: s.shortName,
        brand: s.brand,
        description: s.description,
      })),
    )
    .onConflictDoNothing();

  const subRows = series.flatMap((s) =>
    s.subSeries.map((sub, i) => ({
      slug: sub.slug,
      seriesSlug: s.slug,
      name: sub.name,
      sort: i,
    })),
  );
  await db.insert(schema.subSeries).values(subRows).onConflictDoNothing();

  const products = staticProducts;
  await db
    .insert(schema.products)
    .values(
      products.map((p) => ({
        slug: p.slug,
        name: p.name,
        sku: p.sku,
        brand: p.brand,
        categorySlug: p.category,
        description: p.description,
        image: p.image,
        featured: p.featured ?? false,
        seriesSlug: p.series ?? null,
        subSeriesSlug: p.subSeries ?? null,
        color: p.color ?? null,
      })),
    )
    .onConflictDoUpdate({
      target: schema.products.slug,
      set: {
        name: sql`excluded.name`,
        sku: sql`excluded.sku`,
        image: sql`excluded.image`,
        description: sql`excluded.description`,
        featured: sql`excluded.featured`,
        color: sql`excluded.color`,
      },
    });

  console.log(
    `Seeded: ${categories.length} categories, ${series.length} series, ` +
      `${subRows.length} sub-series, ${products.length} products.`,
  );
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
