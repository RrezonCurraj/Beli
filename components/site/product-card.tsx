import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { getSeries, getSubSeries } from "@/data/series";
import { QuoteRequestDialog } from "@/components/site/quote-request-dialog";
import { Button } from "@/components/ui/button";

const brandColor: Record<Product["brand"], string> = {
  Gewiss: "bg-gewiss",
  Marlanvil: "bg-marlanvil",
};

export function ProductCard({ product }: { product: Product }) {
  const href = `/produktet/${product.category}/${product.slug}`;
  const seriesLabel = product.series
    ? [
        getSeries(product.series)?.shortName,
        product.subSeries
          ? getSubSeries(product.series, product.subSeries)?.name
          : undefined,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-foreground/30 hover:shadow-md">
      <Link href={href} className="relative aspect-square bg-surface block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/80 border border-border">
          <span className={`size-1.5 rounded-full ${brandColor[product.brand]}`} />
          {product.brand}
        </span>
        <span className="absolute top-3 right-3 size-7 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="size-3.5" />
        </span>
        {(product.subSeries === "ice" || product.subSeries === "icetouch") && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur">
            Xham
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1 flex flex-col gap-1.5">
          <Link href={href}>
            <h3 className="font-heading font-semibold text-sm leading-snug hover:text-brand transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] text-muted-foreground tracking-tight">
              {product.sku}
            </span>
            {seriesLabel && (
              <span className="inline-flex items-center rounded-full bg-surface border border-border px-2 py-0.5 text-[10px] font-medium text-foreground/70">
                {seriesLabel}
              </span>
            )}
          </div>
          {product.color && (
            <div className="flex items-center gap-1.5">
              <span
                className="size-3.5 rounded-full border border-border/80 shrink-0"
                style={{ backgroundColor: product.color.hex }}
                aria-hidden
              />
              <span className="text-[11px] text-muted-foreground">
                {product.color.name}
              </span>
            </div>
          )}
        </div>
        <QuoteRequestDialog
          productName={product.name}
          productSku={product.sku}
          trigger={
            <Button
              size="sm"
              className="w-full bg-foreground hover:bg-foreground/90 text-background"
            >
              Kërko ofertë
            </Button>
          }
        />
      </div>
    </article>
  );
}
