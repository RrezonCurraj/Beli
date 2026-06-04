import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Series } from "@/data/series";
import { getProductsBySeries } from "@/data/products";

export async function SeriesCard({ series }: { series: Series }) {
  const count = (await getProductsBySeries(series.slug)).length;
  return (
    <Link
      href={`/seria/${series.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-200 hover:border-foreground/30 hover:shadow-md min-h-[220px]"
    >
      <div className="absolute top-5 right-5 size-9 rounded-full bg-surface border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="size-4" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
          <span className="size-1.5 rounded-full bg-gewiss" />
          Gewiss
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-bold">
          {series.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          {series.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {series.subSeries.map((s) => (
            <span
              key={s.slug}
              className="rounded-md bg-foreground/[0.04] border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/70"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs font-mono text-muted-foreground tabular-nums">
        {count} produkte
      </div>
    </Link>
  );
}
