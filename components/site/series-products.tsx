"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import type { Series } from "@/data/series";
import { ProductCard } from "@/components/site/product-card";
import { cn } from "@/lib/utils";

export function SeriesProducts({
  series,
  products,
}: {
  series: Series;
  products: Product[];
}) {
  const [active, setActive] = useState<string>("all");

  // Sub-series present among these products (canonical order).
  const present = useMemo(
    () => series.subSeries.filter((s) => products.some((p) => p.subSeries === s.slug)),
    [series.subSeries, products],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.subSeries === active),
    [products, active],
  );

  if (products.length === 0) {
    return (
      <p className="text-muted-foreground">
        Produktet e kësaj serie do të shtohen së shpejti. Na kontaktoni për kërkesa specifike.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {present.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mr-1">
            Finitura
          </span>
          <FilterChip
            label="Të gjitha"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {present.map((s) => (
            <FilterChip
              key={s.slug}
              label={s.name}
              active={active === s.slug}
              onClick={() => setActive(s.slug)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Asnjë produkt për këtë finiturë.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
