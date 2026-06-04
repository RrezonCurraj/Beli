"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/db";

export type ActionResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

export async function addProduct(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "Fjalëkalim i gabuar." };
  }

  const name = (formData.get("name") as string).trim();
  const sku = (formData.get("sku") as string).trim().toUpperCase();
  const brand = (formData.get("brand") as string) || "Gewiss";
  const categorySlug = formData.get("categorySlug") as string;
  const seriesSlug = (formData.get("seriesSlug") as string) || null;
  const subSeriesSlug = (formData.get("subSeriesSlug") as string) || null;
  const description = (formData.get("description") as string).trim();
  const colorName = (formData.get("colorName") as string).trim();
  const colorHex = (formData.get("colorHex") as string).trim();
  const featured = formData.get("featured") === "on";
  const file = formData.get("image") as File | null;

  if (!name || !sku || !categorySlug || !description) {
    return { ok: false, error: "Emri, SKU, kategoria dhe përshkrimi janë të detyrueshëm." };
  }

  const slug = sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  let imageUrl = "/products/placeholder.svg";
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "webp";
    const folder = subSeriesSlug ?? categorySlug;
    const { url } = await put(`products/${folder}/${sku.toLowerCase()}.${ext}`, file, {
      access: "public",
    });
    imageUrl = url;
  }

  const color =
    colorName && colorHex ? { name: colorName, hex: colorHex } : null;

  await getDb()
    .insert(schema.products)
    .values({
      slug,
      name,
      sku,
      brand,
      categorySlug,
      seriesSlug,
      subSeriesSlug,
      description,
      image: imageUrl,
      featured,
      color,
      sort: 0,
    })
    .onConflictDoUpdate({
      target: schema.products.slug,
      set: {
        name,
        sku,
        description,
        image: imageUrl,
        featured,
        color,
      },
    });

  revalidatePath("/produktet");
  revalidatePath(`/produktet/${categorySlug}`);
  if (seriesSlug) revalidatePath(`/seria/${seriesSlug}`);

  return { ok: true, slug };
}
