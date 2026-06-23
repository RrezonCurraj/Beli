import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, Boxes, Server, Cable, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const iconFor: Record<string, LucideIcon> = {
  "celesa-priza": Zap,
  "automatika-siguresa": ShieldCheck,
  "kuti-shperndarese": Boxes,
  "tabela-ormane": Server,
  "sisteme-tubacioni": Cable,
  "aparate-matese": Gauge,
};

export async function CategoryCard({
  category,
  size = "default",
}: {
  category: Category;
  size?: "default" | "large";
}) {
  const Icon = iconFor[category.slug] ?? Boxes;
  const products = await getProductsByCategory(category.slug);
  const count = products.length;
  const image =
    category.image ?? products[0]?.image ?? "/products/placeholder.svg";

  return (
    <Link
      href={`/produktet/${category.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
        "transition-all duration-200 hover:border-brand/60 hover:shadow-md",
        size === "large" ? "lg:col-span-2 lg:row-span-2" : "",
      )}
    >
      {/* Photo */}
      <div
        className={cn(
          "relative w-full bg-surface overflow-hidden",
          size === "large" ? "aspect-[16/10]" : "aspect-[16/9]",
        )}
      >
        <Image
          src={image}
          alt={category.name}
          fill
          sizes={size === "large" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 size-9 rounded-lg bg-background/90 backdrop-blur border border-border text-brand flex items-center justify-center">
          <Icon className="size-5" />
        </div>
        <div className="absolute top-3 right-3 size-8 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col", size === "large" ? "p-8" : "p-5")}>
        <h3 className={cn("font-heading font-bold text-foreground leading-tight", size === "large" ? "text-2xl" : "text-lg")}>
          {category.name}
        </h3>
        <p className={cn("text-muted-foreground mt-1.5", size === "large" ? "text-sm leading-relaxed line-clamp-2" : "text-xs line-clamp-2")}>
          {category.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
          <span className="font-mono text-foreground/70 tabular-nums whitespace-nowrap">{count} produkte</span>
          <span className="text-brand font-medium inline-flex items-center gap-0.5 whitespace-nowrap">
            Shiko të gjitha
            <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
