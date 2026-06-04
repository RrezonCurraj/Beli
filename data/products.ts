import { cache } from "react";
import type { SeriesSlug } from "./series";
import type { Brand, Product, ProductColor } from "./products.static";
import { getDb, schema } from "../db";

export type { Brand, Product, ProductColor };

type Row = typeof schema.products.$inferSelect;

function toProduct(r: Row): Product {
  return {
    slug: r.slug,
    name: r.name,
    sku: r.sku,
    brand: r.brand as Brand,
    category: r.categorySlug,
    description: r.description,
    image: r.image,
    featured: r.featured || undefined,
    series: (r.seriesSlug ?? undefined) as SeriesSlug | undefined,
    subSeries: r.subSeriesSlug ?? undefined,
    color: (r.color ?? undefined) as ProductColor | undefined,
  };
}

// One query per render, deduped across all helpers via React cache().
const loadAll = cache(async (): Promise<Product[]> => {
  const rows = await getDb().select().from(schema.products);
  return rows.map(toProduct);
});

export async function getAllProducts(): Promise<Product[]> {
  return loadAll();
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return (await loadAll()).find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return (await loadAll()).filter((p) => p.category === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await loadAll()).filter((p) => p.featured);
}

export async function getProductsBySeries(
  seriesSlug: string,
): Promise<Product[]> {
  return (await loadAll()).filter((p) => p.series === seriesSlug);
}

export async function getProductsBySubSeries(
  subSlug: string,
): Promise<Product[]> {
  return (await loadAll()).filter((p) => p.subSeries === subSlug);
}

export async function searchProducts(
  query: string,
  categorySlug?: string,
): Promise<Product[]> {
  const all = await loadAll();
  const pool = categorySlug
    ? all.filter((p) => p.category === categorySlug)
    : all;
  const q = query.trim().toLowerCase();
  if (!q) return pool;
  return pool.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}
