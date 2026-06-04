import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { series, getSeries } from "@/data/series";
import { getProductsBySeries } from "@/data/products";
import { SeriesProducts } from "@/components/site/series-products";

export const revalidate = 300;

export async function generateStaticParams() {
  return series.map((s) => ({ seria: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ seria: string }> },
): Promise<Metadata> {
  const { seria } = await params;
  const s = getSeries(seria);
  if (!s) return { title: "Seria" };
  return {
    title: `${s.name} — Çelësa & Priza Gewiss`,
    description: s.description,
  };
}

export default async function SeriesPage(
  { params }: { params: Promise<{ seria: string }> },
) {
  const { seria } = await params;
  const s = getSeries(seria);
  if (!s) notFound();

  const products = await getProductsBySeries(s.slug);

  return (
    <>
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <nav className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
            <Link href="/produktet" className="hover:text-brand">Produktet</Link>
            <ChevronRight className="size-3" />
            <Link href="/produktet/celesa-priza" className="hover:text-brand">
              Çelësa & Priza
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{s.name}</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">{s.name}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{s.description}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <SeriesProducts series={s} products={products} />
      </section>
    </>
  );
}
