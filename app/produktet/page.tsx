import type { Metadata } from "next";
import { CategoryCard } from "@/components/site/category-card";
import { ProductCard } from "@/components/site/product-card";
import { categories } from "@/data/categories";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Produktet",
  description:
    "Eksploroni katalogun e produkteve elektrike Gewiss dhe Marlanvil të disponueshme nga Ntsh Beli.",
};

export const revalidate = 300;

export default async function ProduktetPage() {
  const all = await getAllProducts();
  return (
    <>
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold">Produktet</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Zgjidhni një kategori për të parë produktet ose shfletoni listën e plotë më poshtë. Kërkoni
            ofertë për çdo produkt që ju intereson.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Kategoritë</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Të gjitha produktet</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {all.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
