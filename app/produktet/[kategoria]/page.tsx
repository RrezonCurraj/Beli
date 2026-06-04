import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { series } from "@/data/series";
import { CategoryProducts } from "@/components/site/category-products";
import { SeriesCard } from "@/components/site/series-card";

export const revalidate = 300;

export async function generateStaticParams() {
  return categories.map((c) => ({ kategoria: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ kategoria: string }> },
): Promise<Metadata> {
  const { kategoria } = await params;
  const cat = getCategory(kategoria);
  if (!cat) return { title: "Kategoria" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage(
  { params }: { params: Promise<{ kategoria: string }> },
) {
  const { kategoria } = await params;
  const cat = getCategory(kategoria);
  if (!cat) notFound();

  const products = await getProductsByCategory(cat.slug);
  const showSeries = cat.slug === "celesa-priza";

  return (
    <>
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <nav className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
            <Link href="/produktet" className="hover:text-brand">Produktet</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{cat.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{cat.name}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{cat.description}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {showSeries ? (
          <div className="grid gap-4 md:grid-cols-2">
            {series.map((s) => (
              <SeriesCard key={s.slug} series={s} />
            ))}
          </div>
        ) : (
          <CategoryProducts products={products} />
        )}
      </section>
    </>
  );
}
