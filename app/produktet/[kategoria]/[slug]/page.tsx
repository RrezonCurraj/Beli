import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck, Headset, Award, Phone, MessageCircle } from "lucide-react";
import { getCategory } from "@/data/categories";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
} from "@/data/products";
import { QuoteRequestDialog } from "@/components/site/quote-request-dialog";
import { ProductCard } from "@/components/site/product-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { quoteMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ kategoria: p.category, slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ kategoria: string; slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Produkti" };
  return {
    title: `${p.name} — ${p.sku}`,
    description: p.description,
    openGraph: {
      title: p.name,
      description: p.description,
      images: [p.image],
    },
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ kategoria: string; slug: string }> },
) {
  const { kategoria, slug } = await params;
  const product = await getProductBySlug(slug);
  const cat = getCategory(kategoria);
  if (!product || !cat || product.category !== cat.slug) notFound();

  const productUrl = `${company.siteUrl}/produktet/${cat.slug}/${product.slug}`;
  const related = (await getProductsByCategory(cat.slug))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    image: `${company.siteUrl}${product.image}`,
    category: cat.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: productUrl,
      seller: { "@type": "Organization", name: company.name },
    },
  };

  const trustItems = [
    { icon: ShieldCheck, label: "Produkt origjinal Gewiss" },
    { icon: Award, label: "Garanci fabrike" },
    { icon: Truck, label: "Dërgesa në mbarë Kosovën" },
    { icon: Headset, label: "Mbështetje teknike" },
  ];

  return (
    <>
      <div className="bg-surface border-b border-border">
        <div className="container-page py-4">
          <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
            <Link href="/produktet" className="hover:text-foreground">Produktet</Link>
            <ChevronRight className="size-3" />
            <Link href={`/produktet/${cat.slug}`} className="hover:text-foreground">{cat.name}</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium truncate max-w-[180px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="container-page py-10 md:py-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square rounded-2xl border border-border bg-surface overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-10 md:p-16"
              priority
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-semibold border border-border">
              <span className="size-1.5 rounded-full bg-gewiss" />
              {product.brand}
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
            <h2 className="font-heading text-xl font-bold">Përshkrimi</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <dl className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Marka</dt>
                <dd className="font-medium mt-1">{product.brand}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kodi (SKU)</dt>
                <dd className="font-mono mt-1">{product.sku}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Kategoria</dt>
                <dd className="font-medium mt-1">
                  <Link href={`/produktet/${cat.slug}`} className="hover:text-brand">
                    {cat.name}
                  </Link>
                </dd>
              </div>
              {product.color && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Ngjyra</dt>
                  <dd className="font-medium mt-1 flex items-center gap-2">
                    <span
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: product.color.hex }}
                      aria-hidden
                    />
                    {product.color.name}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {cat.name}
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="font-mono text-sm text-muted-foreground">{product.sku}</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Çmimi</div>
                <div className="font-heading text-2xl font-bold mt-1">Sipas kërkesës</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Ofertë e personalizuar brenda 24 orëve
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <QuoteRequestDialog
                  productName={product.name}
                  productSku={product.sku}
                  productUrl={productUrl}
                  trigger={
                    <Button
                      variant="brand"
                      size="lg"
                      className="w-full h-11"
                    >
                      Kërko ofertë
                    </Button>
                  }
                />
                <a
                  href={buildWhatsAppLink(quoteMessage(product.name, product.sku))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full h-11 gap-2",
                  )}
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Dërgo me WhatsApp
                </a>
                <a
                  href={`tel:${company.phone}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full h-11 gap-2 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Phone className="size-4" />
                  {company.phone}
                </a>
              </div>

              <ul className="border-t border-border pt-5 space-y-3">
                {trustItems.map((t) => (
                  <li key={t.label} className="flex items-center gap-3 text-sm">
                    <div className="size-7 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
                      <t.icon className="size-3.5" />
                    </div>
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-surface border-t border-border">
          <div className="container-page section-y">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Produkte të ngjashme</h2>
              <Link
                href={`/produktet/${cat.slug}`}
                className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1"
              >
                Të gjitha në {cat.name}
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
