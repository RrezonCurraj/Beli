# Database migration (Neon Postgres + Drizzle)

**Status: live.** Products are served from Neon Postgres; the taxonomy
(categories, series, sub_series) stays static in `/data` because the client
header/footer import it directly. `data/products.ts` queries Neon via Drizzle
(deduped per render with React `cache()`); `data/products.static.ts` is the
generated catalog used only by the seed below. Pages use `revalidate = 300`
(ISR) — edit the DB and the site refreshes within ~5 min, no redeploy.

## Files

- `schema.ts` — Drizzle tables (`categories`, `series`, `sub_series`, `products`). 1:1 with `/data`.
- `index.ts` — lazy Neon client (`getDb()`); throws only when used without `DATABASE_URL`.
- `../drizzle.config.ts` — drizzle-kit config.
- `../scripts/seed.ts` — seeds Neon from the static `/data` files (idempotent upsert).

## Visual editor (Drizzle Studio)

```
set -a; . ./.env.local; set +a; npm run db:studio
```

Opens https://local.drizzle.studio — edit `products` rows (name, sku, image,
featured, color…) directly. Saves to Neon; the site refreshes within ~5 min (ISR).
Note: drizzle-kit/tsx don't auto-read `.env.local`, hence the `set -a; . ./.env.local`
prefix on `db:push` / `db:seed` / `db:studio`.

## One-time setup

1. **Provision Neon** via Vercel Marketplace:
   - Vercel dashboard → Storage → Create → Neon (Postgres), or run the
     `vercel:marketplace` skill. This auto-adds `DATABASE_URL` to the Vercel project.
2. **Local env:** pull it down → `vercel env pull .env.local` (or paste the Neon
   connection string into `.env.local` as `DATABASE_URL=`).
3. **Create tables:** `npm run db:push` (or `db:generate` + apply the SQL migration).
4. **Seed from static data:** `npm run db:seed`.

## Excel / bulk import

The seed reads `/data` today. To load thousands of rows from Excel instead:

1. Export the sheet to CSV with columns matching `products` (slug, name, sku,
   brand, category_slug, description, image, featured, series_slug,
   sub_series_slug, color).
2. Copy `scripts/seed.ts` → `scripts/import-csv.ts`, replace the `/data` imports
   with a CSV parser (`node:fs` + a tiny split, or add `papaparse`), map rows to
   the same `.insert(...).values(...)` shape, keep the `onConflictDoUpdate`.
3. `tsx scripts/import-csv.ts path/to/file.csv`.

Image convention stays: filename = SKU. Run `npm run optimize:images` after
dropping new photos, then point `image` at `/products/<finitura>/<sku>.webp`
(or a Blob/CDN URL if you move hosting).

## Cutover (when ready to read from DB)

Replace the bodies of the helpers in `data/products.ts`, `data/categories.ts`,
`data/series.ts` with Drizzle queries via `getDb()`. These become `async`, so
the pages that call them (already `async` server components) just need `await`.
The component layer and image pipeline do not change.

Do this only after the DB is seeded and verified against the static data.
