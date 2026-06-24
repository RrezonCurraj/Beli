# Ntsh Beli — Electrical Distributor Website

A production marketing and product-catalog website for **Ntsh Beli**, an authorized distributor of **Gewiss** and **Marlanvil** electrical products in Kosovo. The site presents the company's catalog, showcases completed installation projects, and turns visitors into leads through a quote-request flow (email + WhatsApp).

🌐 **Live:** [ntshbeli.com](https://ntshbeli.com)

> Built with the Next.js App Router and deployed on Vercel. The whole UI is localized in Albanian.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black">
  <img alt="Neon Postgres" src="https://img.shields.io/badge/Neon_Postgres-00E599?logo=postgresql&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white">
</p>

---

## Features

- **Product catalog** — products organized into categories, product series, and sub-series, including color-plate variants (each plate carries its own `{ name, hex }` color). Built-in search across product name, SKU, and description.
- **Project portfolio** — real installation case studies, each with a photo gallery. Gallery images are discovered automatically at build time by reading the `public/projektet/<slug>` folder, so adding photos needs no code changes.
- **Quote-request lead flow** — a dialog form (product-aware, pre-filled when launched from a product page) posts to an API route that validates input with **Zod** and sends a formatted email via **Resend**. Errors from the mail provider are surfaced instead of silently "succeeding".
- **WhatsApp deep links** — one-tap WhatsApp contact with pre-filled messages, plus a floating button (desktop) and a sticky bottom CTA bar (mobile).
- **Password-gated admin** — an internal page to add products: image upload to **Vercel Blob**, persisted to Postgres through **Drizzle** server actions, with on-demand revalidation.
- **SEO & sharing** — dynamic `sitemap.ts` / `robots.ts`, JSON-LD `Organization` structured data, and per-page OpenGraph metadata.
- **Polished UX** — Lenis smooth scrolling, Motion-powered scroll animations (pinned projects scroller), accessible components, and a mobile-first responsive layout.

---

## Tech Stack

### Framework & Language
- **[Next.js 16](https://nextjs.org)** — App Router, Server Components, Server Actions, route handlers
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** (strict)
- **[Turbopack](https://turbo.build/pack)** — dev/build bundler

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling via `@tailwindcss/postcss`
- **[shadcn/ui](https://ui.shadcn.com)** + **[Base UI](https://base-ui.com)** — accessible component primitives (dialog, sheet, navigation menu, etc.)
- **[Lucide](https://lucide.dev)** — icons
- **[Motion](https://motion.dev)** — animations
- **[Lenis](https://lenis.darkroom.engineering)** — smooth scroll
- **[Sonner](https://sonner.emilkowal.ski)** — toast notifications
- `class-variance-authority`, `clsx`, `tailwind-merge` — variant/class management

### Data & Backend
- **[Drizzle ORM](https://orm.drizzle.team)** + **[drizzle-kit](https://orm.drizzle.team/kit-docs/overview)** — schema, migrations, studio
- **[Neon](https://neon.tech)** — serverless Postgres (`@neondatabase/serverless`)
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)** — image storage for the admin uploader
- **[Resend](https://resend.com)** — transactional email for quote requests
- **[Zod](https://zod.dev)** + **[react-hook-form](https://react-hook-form.com)** (`@hookform/resolvers`) — validation

### Tooling & Deploy
- **[Vercel](https://vercel.com)** — hosting & CI/CD
- **[sharp](https://sharp.pixelplumbing.com)** — build-time image optimization script
- **ESLint** (`eslint-config-next`)
- **tsx** — running TypeScript scripts (seed)

---

## Architecture Notes

A few decisions worth calling out:

- **Pluggable data layer.** The catalog is currently served from typed files in `/data`, but the database is fully wired behind a lazy handle (`db/index.ts → getDb()`), and the Drizzle schema (`db/schema.ts`) is a 1:1 mirror of the static data. Cutting over to Postgres is a config + seed step, not a rewrite — see `db/README.md`.
- **Query deduping.** `data/products.ts` loads the catalog once per render and reuses it across all helper functions via React's `cache()`, so a page calling several product helpers still hits the DB once.
- **Build-time content from the filesystem.** Project galleries read the image folder on the server at build time (`lib/project-images.ts`), URL-encoding filenames so spaces and odd characters resolve. Content-by-folder, no CMS required.
- **Honest error handling.** Resend reports failures in the response body rather than throwing, so the email layer explicitly checks for that and throws — the API returns 500 and the form shows a real error instead of a false success.

---

## Project Structure

```
app/
  page.tsx                     # Homepage (hero, projects scroller, catalog, featured)
  layout.tsx                   # Root layout, header/footer, global CTAs
  produktet/                   # Catalog: index, category, product detail
  seria/[seria]/               # Product series pages
  projektet/[slug]/            # Project case-study pages
  kontakt/ · rreth-nesh/       # Contact · About
  admin/                       # Password-gated product manager (server actions)
  api/quote-request/route.ts   # Quote form endpoint (Zod + Resend)
  sitemap.ts · robots.ts       # SEO
components/
  site/                        # Page-specific components (hero, cards, dialogs, nav)
  ui/                          # shadcn/Base UI primitives
data/                          # Typed content: products, categories, series, projects
db/                            # Drizzle schema + lazy Neon client
lib/                           # email, whatsapp, project-images, utils
scripts/                       # seed, image optimization, favicon
public/                        # Brand assets, product & project images
```

---

## Getting Started

```bash
# install
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs without a database (it reads `/data`). To enable email and the admin/database features, set the environment variables below.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required for | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Quote emails | Resend API key |
| `RESEND_FROM_EMAIL` | Quote emails | Verified sender (defaults to `onboarding@resend.dev`) |
| `RESEND_TO_EMAIL` | Quote emails | Inbox that receives leads |
| `NEXT_PUBLIC_SITE_URL` | SEO/metadata | Canonical site URL |
| `DATABASE_URL` | Catalog DB / admin | Neon Postgres connection string |
| `ADMIN_PASSWORD` | Admin page | Password gate for adding products |

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run optimize:images` | Compress/convert images with sharp |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to the database |
| `npm run db:seed` | Seed the database from `/data` |
| `npm run db:studio` | Open Drizzle Studio |

---

## Deployment

Deployed on **Vercel**. Pushes to `main` trigger an automatic production deploy. Environment variables are managed in the Vercel project settings; `DATABASE_URL` must be available at build time when the catalog is served from Postgres.

---

*Built by [Rrezon Curraj](https://github.com/RrezonCurraj).*
