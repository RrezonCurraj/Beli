"use client";

import { useActionState, useState } from "react";
import { addProduct } from "./actions";
import type { ActionResult } from "./actions";
import { categories } from "@/data/categories";
import { series } from "@/data/series";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    addProduct,
    null,
  );
  const [selectedSeries, setSelectedSeries] = useState("");
  const subSeries = series.find((s) => s.slug === selectedSeries)?.subSeries ?? [];

  return (
    <div className="min-h-screen bg-surface">
      <div className="container-page py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">Admin — Shto produkt</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Produkti shtohet direkt në databazë dhe faqja rifresohet automatikisht.
          </p>
        </div>

        <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8">
          {/* Password */}
          <Field label="Fjalëkalimi admin" required>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className={inputCls}
              required
            />
          </Field>

          <hr className="border-border" />

          {/* Name + SKU */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Emri produktit" required>
              <input name="name" type="text" className={inputCls} required />
            </Field>
            <Field label="Kodi SKU (Gewiss)" required>
              <input name="sku" type="text" className={inputCls} placeholder="GW22503" required />
            </Field>
          </div>

          {/* Brand */}
          <Field label="Marka" required>
            <select name="brand" className={inputCls}>
              <option value="Gewiss">Gewiss</option>
              <option value="Marlanvil">Marlanvil</option>
            </select>
          </Field>

          {/* Category */}
          <Field label="Kategoria" required>
            <select name="categorySlug" className={inputCls} required>
              <option value="">— zgjidhni —</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>

          {/* Series */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Seria (opsionale)">
              <select
                name="seriesSlug"
                className={inputCls}
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
              >
                <option value="">— asnjë —</option>
                {series.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Finitura (opsionale)">
              <select name="subSeriesSlug" className={inputCls} disabled={!selectedSeries}>
                <option value="">— asnjë —</option>
                {subSeries.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Description */}
          <Field label="Përshkrimi" required>
            <textarea name="description" rows={3} className={inputCls} required />
          </Field>

          {/* Color */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ngjyra (emri)">
              <input name="colorName" type="text" className={inputCls} placeholder="E bardhë" />
            </Field>
            <Field label="Ngjyra (hex)">
              <input name="colorHex" type="text" className={inputCls} placeholder="#F4F4F1" />
            </Field>
          </div>

          {/* Image */}
          <Field label="Foto produkti">
            <input
              name="image"
              type="file"
              accept="image/*"
              className={cn(inputCls, "py-2 file:mr-3 file:rounded-md file:border-0 file:bg-foreground file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-background")}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Lëre bosh për të përdorur placeholder. Formatet: JPG, PNG, WebP.
            </p>
          </Field>

          {/* Featured */}
          <label className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input name="featured" type="checkbox" className="size-4 rounded" />
            Shfaq në faqen kryesore (featured)
          </label>

          {/* Result */}
          {result && (
            <div className={cn(
              "rounded-lg px-4 py-3 text-sm font-medium",
              result.ok
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200",
            )}>
              {result.ok
                ? `✓ Produkti u shtua: ${result.slug}`
                : `✗ ${result.error}`}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full h-11 rounded-lg bg-gradient-to-br from-brand to-brand-accent text-brand-foreground font-semibold text-sm transition-[filter] hover:brightness-110 disabled:opacity-60"
          >
            {pending ? "Po shtohet..." : "Shto produktin"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50";
