"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { series as allSeries } from "@/data/series";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

export function CategoryProducts({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>("all");

  // Series present among these products (preserve canonical order).
  const present = useMemo(
    () => allSeries.filter((s) => products.some((p) => p.series === s.slug)),
    [products],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.series === active),
    [products, active],
  );

  if (products.length === 0) {
    return (
      <p className="text-muted-foreground">
        Nuk ka produkte në këtë kategori për momentin. Na kontaktoni për kërkesa specifike.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {present.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mr-1">
            Seria
          </span>
          <FilterChip
            label="Të gjitha"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {present.map((s) => (
            <FilterChip
              key={s.slug}
              label={s.shortName}
              active={active === s.slug}
              onClick={() => setActive(s.slug)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Asnjë produkt për këtë seri.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground/70 hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
