import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, Boxes, Lightbulb, Cable, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const iconFor: Record<string, LucideIcon> = {
  "celesa-priza": Zap,
  "automatika-siguresa": ShieldCheck,
  "kuti-shperndarese": Boxes,
  "ndricim": Lightbulb,
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
  const count = (await getProductsByCategory(category.slug)).length;

  return (
    <Link
      href={`/produktet/${category.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
        "transition-all duration-200 hover:border-brand/60 hover:shadow-md",
        size === "large" ? "lg:col-span-2 lg:row-span-2 p-8 min-h-[280px]" : "p-6",
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("rounded-xl bg-brand/10 text-brand flex items-center justify-center", size === "large" ? "size-14" : "size-11")}>
          <Icon className={cn(size === "large" ? "size-7" : "size-5")} />
        </div>
        <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-200 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="mt-auto pt-6">
        <h3 className={cn("font-heading font-bold text-foreground leading-tight", size === "large" ? "text-2xl" : "text-lg")}>
          {category.name}
        </h3>
        <p className={cn("text-muted-foreground mt-1.5", size === "large" ? "text-sm leading-relaxed line-clamp-3" : "text-xs line-clamp-2")}>
          {category.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="font-mono text-foreground/70 tabular-nums">{count} produkte</span>
          <span className="text-border">•</span>
          <span className="text-brand font-medium">Shiko të gjitha</span>
        </div>
      </div>
    </Link>
  );
}
