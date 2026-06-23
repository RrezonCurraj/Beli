# Learn This Project — From Zero

This is a complete, beginner-first walkthrough of **everything** in this codebase: the
stack, how pages work, React state and hooks, the data layer, forms, the database, and
how a request flows from a click to an email. Every concept is tied to a **real file you
already have**, with line numbers you can open.

Read it top to bottom once. Then use it as a reference — each module is self-contained.

---

## How to use this document

- File references look like `components/site/site-header.tsx:27`. The number is the line.
  Open the file and read along — that's where the learning actually sticks.
- "Try it" boxes are tiny experiments. Do them. Break things on purpose; the dev server
  reloads instantly and nothing is permanent.
- Run the site while you read: `npm run dev`, then open http://localhost:3000.

---

## Module 0 — The mental model (read this first)

Your website is made of **components**. A component is a function that returns HTML-like
markup (called JSX). Pages are components. Buttons are components. The header is a
component. They nest inside each other like Lego.

There are **two worlds** these components live in:

1. **The server** (a computer at Vercel). It runs your code, talks to the database,
   builds the HTML, and sends finished HTML to the browser. The visitor never sees this
   code. This is where most of your pages run.
2. **The browser** (the visitor's phone/laptop). It shows the HTML and runs the little
   bits of interactivity — opening a menu, validating a form, filtering products.

The single most important idea in this whole project:

> **Server Components are the default. A component only runs in the browser if its file
> starts with `"use client";`.**

Everything else builds on that. Keep it in your head.

---

## Module 1 — The stack (what each tool does, in plain words)

Open `package.json`. The `dependencies` are the tools the running site needs. Here's what
each one is for — you don't memorize this, you just learn to recognize the names:

| Package | What it does for you |
|---|---|
| `next` (16.2.6) | The framework. Turns files into pages, runs the server, handles routing, builds the site. **Everything sits on top of Next.** |
| `react` / `react-dom` (19) | The component engine. Lets you write UI as functions and "state". Next uses React. |
| `drizzle-orm` + `@neondatabase/serverless` | Talk to the Postgres database with TypeScript instead of raw SQL. Neon is the database host. |
| `react-hook-form` + `@hookform/resolvers` + `zod` | Build and validate forms. Zod describes the *shape* of valid data; react-hook-form wires it to inputs. |
| `resend` | Sends the quote-request emails. |
| `@vercel/blob` | Stores uploaded product images. |
| `tailwind` + `clsx` + `tailwind-merge` + `class-variance-authority` | Styling. Tailwind = utility CSS classes; the others help combine classes cleanly. |
| `lucide-react` | The icon set (`<Phone/>`, `<Menu/>`, etc.). |
| `lenis` | Smooth scrolling. |
| `next-themes`, `sonner` | Dark/light theming and toast notifications ("Your request was sent"). |
| `shadcn` + `@base-ui/react` | The pre-built UI components in `components/ui/` (Dialog, Sheet, Button…). |

`devDependencies` are tools used only while developing/building (TypeScript, ESLint,
`sharp` for image optimizing, `tsx` to run scripts). The visitor never loads these.

**`scripts`** (top of `package.json`) are commands you run with `npm run <name>`:
- `dev` — start the local site with hot-reload. Your main command.
- `build` / `start` — make and run the production version.
- `db:generate` / `db:push` / `db:seed` / `db:studio` — database tasks (Module 6).

> ⚠️ One project-specific rule lives in `AGENTS.md`: this is a **bleeding-edge Next.js 16**.
> Some APIs differ from older tutorials you'll find online. When something on the web
> contradicts this repo, trust the repo.

---

## Module 2 — How files become pages (App Router & routing)

Next uses **file-based routing**. The folder structure inside `app/` *is* your URL
structure. You don't write a router config; you create folders.

Look at `app/`:

```
app/
  page.tsx                      ->  /                 (home)
  layout.tsx                    ->  wraps EVERY page
  kontakt/page.tsx              ->  /kontakt
  rreth-nesh/page.tsx           ->  /rreth-nesh
  produktet/page.tsx            ->  /produktet
  produktet/[kategoria]/page.tsx            ->  /produktet/<anything>
  produktet/[kategoria]/[slug]/page.tsx     ->  /produktet/<cat>/<product>
  seria/[seria]/page.tsx        ->  /seria/<anything>
  projektet/[slug]/page.tsx     ->  /projektet/<anything>
  api/quote-request/route.ts    ->  /api/quote-request  (not a page — an endpoint)
```

The rules:

- A folder + a `page.tsx` inside it = a visitable URL. The folder name is the URL segment.
- `layout.tsx` is shared UI that wraps the pages inside its folder. The top one
  (`app/layout.tsx`) wraps the entire site.
- **`[brackets]` = a dynamic segment.** The folder `[kategoria]` matches *any* value and
  hands it to your code as a variable named `kategoria`. That's how one file
  (`produktet/[kategoria]/[slug]/page.tsx`) serves thousands of product pages.
- `route.ts` (instead of `page.tsx`) = an API endpoint, not a visual page (Module 8).

### The root layout — `app/layout.tsx`

This is the frame around everything. Read it (it's short).

- Lines 12–28: load three Google fonts (Inter, Manrope, JetBrains Mono) and expose them
  as CSS variables (`--font-sans`, etc.).
- Lines 30–42: `metadata` — the default page title/description for SEO and browser tabs.
  `template: "%s | Ntsh Beli"` means each page's own title gets " | Ntsh Beli" appended.
- Lines 44–71: `RootLayout({ children })`. `children` is whatever page is being shown.
  Notice the structure: a skip link, `<SmoothScroll/>`, `<SiteHeader/>`, then
  `<main>{children}</main>`, then footer + floating buttons + `<Toaster/>`. **Every page
  on the site is dropped into that `{children}` slot.** That's why the header and footer
  appear everywhere without you repeating them.

> **Try it:** change the `<h1>` headline in `app/page.tsx:72` to anything, save, and watch
> the browser update instantly. That's hot-reload.

### Dynamic page in detail — `app/produktet/[kategoria]/[slug]/page.tsx`

This single file renders every product detail page. Walk through it:

- Line 21 `generateStaticParams()` — at build time, Next asks "which product pages exist?"
  This function returns the list (`{ kategoria, slug }` for every product) so Next can
  pre-build them all as fast static HTML. (More in Module 11.)
- Line 26 `generateMetadata()` — produces the per-product `<title>`/description for SEO,
  using the product's real data.
- Line 43 `ProductPage({ params })` — the actual page. Note `params` is a **Promise** in
  Next 16, so line 46 does `const { kategoria, slug } = await params;`. That gives you the
  values from the URL.
- Line 47–49: fetch the product by slug; if it (or the category) doesn't exist, call
  `notFound()` which shows the 404 page. This is your guard against bad URLs.
- The rest is JSX: image, description, a sticky "Kërko ofertë" sidebar, related products,
  and a hidden `<script type="application/ld+json">` (structured data for Google).

You'll notice this whole component is `async` and has **no `"use client"`** — it's a
Server Component. It can `await` the database directly. That's the next module.

---

## Module 3 — Server Components vs Client Components (the core concept)

This is the idea that confuses every beginner, so go slow.

### Server Components (the default)

Any `page.tsx`/component **without** `"use client"` at the top runs **only on the server**.

Example: `app/page.tsx:22` — `export default async function HomePage()`.

What server components can do:
- Be `async` and `await` data directly (line 23: `await getFeaturedProducts()`).
- Read the database, secrets, files — safely, because this code never reaches the browser.
- Produce HTML that's already filled in when it arrives. Fast, SEO-friendly.

What they **cannot** do:
- Use `useState`, `useEffect`, or any hook.
- Respond to clicks/typing (`onClick`, `onChange`) — there's no browser running them.

Think of a Server Component as: *"run once on the server, produce HTML, done."*

### Client Components (`"use client"`)

A file that starts with `"use client";` (e.g. `components/site/site-header.tsx:1`) runs in
the **browser**. Now you get interactivity: state, effects, event handlers.

What client components are for:
- Anything that changes *after* the page loads: opening a menu, a dialog, filtering,
  smooth scrolling, form validation.

The cost: their code is shipped to the browser and runs on the visitor's device, so you
keep them small and only "use client" the parts that truly need it.

### How they combine

Server Components can **render** Client Components inside them. Look at `app/page.tsx`:
- The page itself is a Server Component (it reads products from the DB).
- It renders `<ProjectsScroller/>` (line 190) and `<ProductCard/>` — some of those are
  client components for their interactivity.

So the pattern across this whole site is: **server components fetch the data and lay out
the page; small client components handle the interactive bits.** The product detail page
(server) drops in `<QuoteRequestDialog/>` (client) for the form. The layout (server) drops
in `<SiteHeader/>` (client) for the mobile menu.

> **How to know which is which:** look at line 1. `"use client";` → browser component.
> No directive → server component. That one habit answers 90% of "why doesn't `useState`
> work here?" questions: because that file is a server component.

---

## Module 4 — JSX, components, and props

### JSX

JSX is the HTML-looking syntax inside the `return (...)`. It's not HTML — it's JavaScript
in disguise. Key differences you'll see in this repo:

- `className` instead of `class` (because `class` is a reserved JS word).
- `{ }` drops JavaScript into markup: `{product.name}` (`[slug]/page.tsx:155`),
  `{company.phone}` (`site-header.tsx:43`).
- You can `.map()` a list into elements. `app/page.tsx:219`:
  ```tsx
  {categories.map((c, i) => (
    <CategoryCard key={c.slug} category={c} size={i === 0 ? "large" : "default"} />
  ))}
  ```
  This loops over the categories array and makes one `<CategoryCard>` per category.
  **`key`** must be unique per item — React uses it to track list items efficiently.
  Always give a stable `key` (here, the slug). Forgetting it is the #1 beginner warning.
- Conditional rendering with `&&`: `app/page.tsx:229`
  `{featured.length > 0 && ( <section>…</section> )}` — only render the section if there
  are featured products. And ternaries: `category-products.tsx:57`
  `{filtered.length === 0 ? <p>…</p> : <div>…</div>}`.

### Components

A component is just a function whose name is Capitalized and that returns JSX.
`export function SiteHeader() { … return <header>… }` (`site-header.tsx:26`).

You then "use" it like a tag: `<SiteHeader />`.

### Props (passing data into a component)

Props are the arguments you pass to a component, written like HTML attributes.

Look at `ProductCard`: `app/page.tsx:248` calls `<ProductCard key={p.slug} product={p} />`.
The `product={p}` is a prop. Inside `components/site/product-card.tsx` the function receives
it: `function ProductCard({ product }: { product: Product })`. Now it can read
`product.name`, `product.image`, etc.

A clearer example with typed props — `category-products.tsx:9`:
```tsx
export function CategoryProducts({ products }: { products: Product[] }) {
```
This component **requires** a `products` prop that is an array of `Product`. The
`: { products: Product[] }` part is TypeScript saying what's allowed (Module 12 on types).

Props flow **one direction**: parent → child. A child can't reach up and change its
parent's data directly. If a child needs to tell the parent something, the parent passes
down a **function** prop the child can call — see `FilterChip` getting `onClick`
(`category-products.tsx:70`). That's the standard pattern.

---

## Module 5 — State and hooks (the part you asked about)

A **hook** is a special function whose name starts with `use…`. Hooks only work inside
**client components** (`"use client"`). They give your component memory and lifecycle.

Rules that never change:
1. Only call hooks at the **top level** of a client component (not inside loops/ifs).
2. Only call them from components or other hooks.

Let's learn each hook from a real file in this repo.

### `useState` — remembering a value that can change

`components/site/site-header.tsx:27`:
```tsx
const [open, setOpen] = useState(false);
```
Read it as: "make a piece of state called `open`, starting `false`, and give me a setter
`setOpen` to change it." `useState` returns a **pair**: `[currentValue, setterFunction]`.

How it's used:
- The mobile menu (a `<Sheet>`) is open when `open` is `true`: `<Sheet open={open} …>`
  (line 125).
- Tapping a nav link closes it: `onClick={() => setOpen(false)}` (line 147).

**The golden rule of state:** when you call `setOpen(...)`, React **re-runs the component
function** and re-renders the UI with the new value. You never poke the DOM yourself; you
change state and React updates the screen. State change → re-render. That's the whole loop.

Another `useState`, used as a filter — `components/site/category-products.tsx:10`:
```tsx
const [active, setActive] = useState<string>("all");
```
`active` is which series filter is selected (`"all"` by default). Clicking a chip calls
`setActive(s.slug)` (line 51), which re-renders and shows only matching products.

> **Important:** never mutate state directly (`open = true` does nothing useful). Always go
> through the setter (`setOpen(true)`). The setter is what triggers the re-render.

### `useMemo` — caching an expensive calculation

`category-products.tsx:13`:
```tsx
const present = useMemo(
  () => allSeries.filter((s) => products.some((p) => p.series === s.slug)),
  [products],
);
```
`useMemo(fn, deps)` runs `fn` and **remembers** its result. It only re-runs `fn` when one
of the `deps` (here `[products]`) changes. Between those, it hands back the cached value.

Why here? Every time `active` changes (you click a different filter), the whole component
re-runs. But the list of *which series exist* depends only on `products`, not on `active`.
`useMemo` avoids recomputing that filter on every click. The second `useMemo` (line 18)
computes `filtered` and depends on `[products, active]` — it *should* recompute when either
changes, and it does.

Beginner takeaway: `useMemo` is an optimization. Reach for it when a calculation is heavy
or when you need a stable reference; don't sprinkle it everywhere.

### `useEffect` — running code *after* render / talking to the outside world

`useEffect` is for "side effects": things outside React's render — timers, subscriptions,
browser APIs, third-party libraries. The clearest example is the smooth-scroll setup.

`components/site/smooth-scroll.tsx:23`:
```tsx
useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  …
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    lenis.destroy();         // <-- cleanup
  };
}, []);                       // <-- dependency array
```
Anatomy of `useEffect(setup, deps)`:
- **setup function** runs after the component renders. Here it boots the Lenis smooth-scroll
  engine and an animation loop.
- **return function** is **cleanup** — React runs it before the effect re-runs and when the
  component is removed. Here it destroys Lenis and cancels the animation frame so you don't
  leak memory or run two scrollers.
- **`deps` array** controls *when* the effect runs:
  - `[]` (empty) → run **once** when the component first appears. (The setup above.)
  - `[pathname]` (line 92) → run again **every time `pathname` changes**, i.e. on every
    navigation. That second effect re-scrolls to the right spot when you change pages.
  - no array at all → run after *every* render (rarely what you want).

So this file says: "set up smooth scrolling once; and every time the URL path changes, jump
to the correct scroll position." That's two effects with different dependency arrays in one
component — a great real example.

### `useRef` — a value that survives renders but does *not* trigger re-renders

`smooth-scroll.tsx:19`:
```tsx
const lenisRef = useRef<Lenis | null>(null);
const positions = useRef<Map<string, number>>(new Map());
```
A ref is a box with a `.current` property. You read/write `lenisRef.current` freely.
Differences from state:
- Changing `ref.current` does **not** re-render. (Changing state does.)
- It persists across renders (a plain `let` variable would reset every render).

Use a ref when you need to remember something but the screen doesn't depend on it: a handle
to a library instance (`lenisRef`), a map of saved scroll positions (`positions`), a DOM
node, a timer id. Here `positions.current` quietly records each route's scroll position
(line 90) so "back" returns you to where you were — no re-render needed for that bookkeeping.

### Hooks summary table

| Hook | One-line job | Triggers re-render? | Example here |
|---|---|---|---|
| `useState` | Remember a changing value | **Yes** | `site-header.tsx:27`, `category-products.tsx:10` |
| `useMemo` | Cache a computed value | No (returns cached) | `category-products.tsx:13,18` |
| `useEffect` | Run code after render / side effects + cleanup | No | `smooth-scroll.tsx:23,51` |
| `useRef` | Persist a value without re-rendering | No | `smooth-scroll.tsx:19` |
| `usePathname` | Read the current URL path | re-renders on nav | `site-header.tsx:28` |
| `useForm` | Manage a whole form (from react-hook-form) | manages its own | `quote-request-dialog.tsx:51` |

> **Try it:** in `category-products.tsx`, change the initial state on line 10 from
> `"all"` to a real series slug and reload `/produktet/<a category>`. The page now loads
> with that filter pre-selected. That's `useState`'s initial value in action.

---

## Module 6 — The data layer (data files, the database, Drizzle)

Where does the product info come from? Two layers, and the project is mid-migration from
the first to the second (see `db/README.md`).

### Plain data files — `data/`

`data/categories.ts`, `data/series.ts`, `data/company.ts`, `data/projects.ts`,
`data/products.static.ts` are just TypeScript files exporting arrays/objects. For example
`data/company.ts` holds your phone, email, address — imported all over the site
(`site-header.tsx:17`). These need no database; they're hardcoded content.

`data/products.static.ts` is the original hardcoded product list **and** the shared
`Product` TypeScript type. `data/products.ts` re-exports that type (line 7) so the rest of
the app imports `Product` from one place.

### The database — `db/` + Drizzle ORM

When `DATABASE_URL` is set, products come from a real Postgres database (hosted on Neon).
You talk to it through **Drizzle**, which lets you write queries in TypeScript.

`db/schema.ts` defines the tables. Read it — it's very readable:
```ts
export const products = pgTable("products", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull(),
  …
  categorySlug: text("category_slug").notNull().references(() => categories.slug),
  color: jsonb("color").$type<{ name: string; hex: string } | null>(),
  …
});
```
- `pgTable("products", { … })` = a table named `products` with these columns.
- Each column declares its type (`text`, `boolean`, `integer`, `jsonb`) and rules
  (`.notNull()`, `.primaryKey()`, `.default(...)`).
- `.references(() => categories.slug)` is a **foreign key** — a product's `categorySlug`
  must match a real category. That's how tables relate.
- `index(...)` (lines 62–67) makes lookups by category/series fast.
- Line 70 `export type ProductRow = typeof products.$inferSelect;` — Drizzle **derives the
  TypeScript type from the table**. Change a column, the type updates. No duplication.

### Reading from the DB — `data/products.ts`

This file is the bridge. Walk it:
- Line 28 `const loadAll = cache(async () => { … })` — fetch **all** products, sorted, once.
  ```ts
  const rows = await getDb().select().from(schema.products)
    .orderBy(asc(schema.products.sort), asc(schema.products.slug));
  ```
  That's a Drizzle query meaning `SELECT * FROM products ORDER BY sort, slug`.
- `cache(...)` is React's request-level cache: if five components on the same page all need
  products, the DB is hit **once** and the result is shared. (Comment on line 27.)
- Line 11 `toProduct(row)` converts a raw DB row into the app's `Product` shape (e.g.
  turning `null` into `undefined`, casting the `color` JSON).
- Lines 36–84 are small helpers built on `loadAll`: `getProductBySlug`,
  `getProductsByCategory`, `getFeaturedProducts`, `getProductsBySeries`,
  `searchProducts`. The pages call these. Because they all share the one cached `loadAll`,
  the page still does just one query.

So the flow is: **page (server component) → `getXxx()` helper → `loadAll()` (cached) →
Drizzle → Postgres.** The page just `await`s a friendly function and gets typed products.

### The db scripts

- `npm run db:generate` — turn `schema.ts` into SQL migration files.
- `npm run db:push` — apply the schema to the actual database.
- `npm run db:seed` — run `scripts/seed.ts` to fill the DB from the static data.
- `npm run db:studio` — open a visual table browser.

You won't run these often as a beginner, but now you know what they're for.

---

## Module 7 — Forms (react-hook-form + Zod) — `quote-request-dialog.tsx`

This is the most feature-rich client component. Open it and follow along.

### Zod: describing valid data

Lines 24–30:
```ts
const schema = z.object({
  name: z.string().min(2, "Emri është i detyrueshëm"),
  company: z.string().optional(),
  phone: z.string().min(6, "Telefoni është i detyrueshëm"),
  email: z.string().email("Email i pavlefshëm"),
  message: z.string().min(5, "Mesazhi është shumë i shkurtër"),
});
type FormValues = z.infer<typeof schema>;
```
Zod is a "schema" — a description of what counts as valid. `name` must be a string of at
least 2 chars, `email` must look like an email, etc. The strings are the error messages
shown to the user. Line 32 `z.infer<typeof schema>` **derives the TypeScript type** from
the schema, so `FormValues` is `{ name: string; company?: string; … }` automatically.

### react-hook-form: wiring the inputs

Lines 51–65:
```ts
const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
  useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", phone: "", email: "", message: prefillMessage },
  });
```
`useForm` is a hook that manages the whole form for you (values, validation, submission).
`resolver: zodResolver(schema)` plugs your Zod rules in as the validator. What you get back:
- `register("name")` — spread onto an input (line 133: `{...register("name")}`) to connect
  it to the form. No manual `useState` per field.
- `handleSubmit(onSubmit)` — wraps your submit handler; it validates first and only calls
  `onSubmit` if the data passes (line 130 `onSubmit={handleSubmit(onSubmit)}`).
- `errors` — per-field error messages, shown like
  `{errors.name && <p>{errors.name.message}</p>}` (line 134).
- `isSubmitting` — `true` while the submit is in flight; used to disable the button and show
  "Po dërgohet…" (lines 178–181).
- `reset()` — clear the form after success (line 84).

### Submitting — lines 67–89

```ts
const onSubmit = async (values: FormValues) => {
  try {
    const res = await fetch("/api/quote-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, productName, productSku, productUrl }),
    });
    if (!res.ok) { … throw new Error(...); }
    toast.success("Kërkesa u dërgua. Do t'ju kontaktojmë brenda 24 orëve.");
    reset();
    setOpen(false);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Gabim gjatë dërgimit");
  }
};
```
This runs in the browser. It `fetch`es your own API route (Module 8), sending the form
values as JSON. On success it shows a green toast, clears the form, and closes the dialog.
On failure it shows a red toast. `toast` comes from `sonner` (the `<Toaster/>` in the
layout is what actually displays them).

Notice the dialog open/close is plain `useState` again (line 45) — same hook you learned in
Module 5, reused here.

---

## Module 8 — API routes — `app/api/quote-request/route.ts`

A `route.ts` file is a server endpoint, not a page. This one handles the form POST.

- `export async function POST(req: Request)` (line 16) — the function name **is** the HTTP
  method. A `GET` export would handle GET requests; this handles POST.
- Lines 17–22: read and parse the JSON body; if it's malformed, return a 400 error.
- Lines 5–14 + 24–30: **re-validate with Zod on the server.** Crucial lesson: the browser
  already validated, but you can never trust the browser — anyone can POST anything. So you
  validate again here. `schema.safeParse(body)` returns `{ success, data }`; if it fails you
  return 400.
- Lines 32–41: if valid, `await sendQuoteEmail(parsed.data)` (in `lib/email.ts`, uses
  Resend) and return `{ ok: true }`. If the email throws, log it and return a 500.

`NextResponse.json(obj, { status })` is how you reply with JSON and an HTTP status code.

**Full round trip, end to end:** user fills the dialog → `onSubmit` `fetch`es
`/api/quote-request` → this `POST` validates → `sendQuoteEmail` → green toast in the
browser. You now understand a complete client↔server feature.

---

## Module 9 — Server Actions — `app/admin/actions.ts`

Server Actions are a newer Next way to run server code from a form **without** writing a
separate API route. The file starts with `"use server";` (line 1) — the mirror image of
`"use client"`. Every export becomes a function that runs on the server but can be called
from a client form.

`addProduct(_prev, formData)` (line 11):
- Line 16–18: check the admin password against `process.env.ADMIN_PASSWORD`. `process.env`
  is how you read secrets/environment variables on the server — never hardcode them.
- Lines 20–30: pull each field out of `formData` (this is the standard browser `FormData`
  object the form submits).
- Lines 39–46: if an image was uploaded, store it with `@vercel/blob`'s `put(...)` and get
  back a public URL.
- Lines 51–77: insert (or update) the product in the database with Drizzle.
  `.onConflictDoUpdate(...)` means "insert; but if a product with this slug already exists,
  update it instead" — an upsert.
- Lines 79–81: `revalidatePath("/produktet")` tells Next "the products changed, rebuild
  those cached pages." Without this, the static pages would keep showing old data.
- Returns `{ ok: true, slug }` or `{ ok: false, error }`, which the admin form displays.

**API route vs Server Action** (both run on the server):
- *API route* (`route.ts`): a general HTTP endpoint. Good when something external calls it,
  or when you `fetch` it from client JS (like the quote form does).
- *Server Action* (`"use server"`): called straight from a form/component as if it were a
  normal function. Less boilerplate for form submissions inside your own app.

Both validate input, both can touch the DB; they're two doors into the same server.

---

## Module 10 — Styling (Tailwind, `cn`, and variants)

There's almost no separate CSS. Styling lives in `className` strings using **Tailwind**
utility classes: `flex`, `gap-2`, `text-sm`, `rounded-md`, `bg-brand`, `hover:bg-surface`.
Each class sets one CSS property. You compose them.

- `text-brand`, `bg-surface`, `text-muted-foreground` are your **design tokens** — named
  colors defined in `app/globals.css` so the whole site stays consistent. Change the token,
  change it everywhere.
- Responsive prefixes: `md:flex`, `lg:grid-cols-4` mean "apply this at medium/large screen
  widths." `hidden md:block` = hidden on phones, visible on desktop (`site-header.tsx:35`).
- State prefixes: `hover:`, `focus:`, `disabled:` apply on those states.

### `cn(...)` — combining classes safely

`lib/utils.ts` exports `cn`, used everywhere (e.g. `site-header.tsx:84`). It merges class
lists and, importantly, resolves Tailwind conflicts (if two classes set the same property,
the last wins cleanly). You'll see:
```tsx
className={cn("base classes always on", active ? "on-classes" : "off-classes")}
```
That's how the nav link styles itself differently when it's the active page
(`site-header.tsx:84–89`).

### Variants — `class-variance-authority` (cva)

The shared `Button` (`components/ui/button.tsx`) uses `cva` to define style **variants**
(`variant: "outline" | "ghost" | …`, `size: "lg" | "icon" | …`). That's why you can write
`<Button variant="outline" size="lg">` and `buttonVariants({ variant: "outline" })`
(`site-header.tsx:107`) and get consistent buttons. The `components/ui/` folder is the
shadcn component library — pre-built, accessible primitives you compose into pages.

---

## Module 11 — Rendering & caching (why the site is fast)

This is how Next decides *when* your page's HTML is built. Three things to recognize:

- **`export const revalidate = 300;`** (`app/page.tsx:20`, `[slug]/page.tsx:19`). The page
  is built into static HTML and **re-built at most every 300 seconds** (ISR — Incremental
  Static Regeneration). Visitors get instant cached HTML; the data refreshes every 5 min.
- **`generateStaticParams()`** (`[slug]/page.tsx:21`). For dynamic routes, this lists every
  value to pre-build at build time. Returning all product `{ kategoria, slug }` pairs means
  every product page is generated up front as static HTML — fast and SEO-friendly.
- **`revalidatePath("/produktet")`** (`actions.ts:79`). After you add/edit a product, this
  throws away the cached page so the next visit rebuilds with fresh data. Caching + this =
  fast *and* up to date.

Mental model: **Server Components render to HTML; `revalidate`/`generateStaticParams`
decide when that HTML is cached or rebuilt; `revalidatePath` busts the cache on changes.**

---

## Module 12 — TypeScript & SEO (the supporting cast)

### TypeScript, just enough

Every `.tsx`/`.ts` file is TypeScript = JavaScript + types. Types are the `: SomeType`
annotations. They don't run; they catch mistakes while you write.

- `function CategoryProducts({ products }: { products: Product[] })` — "this component must
  be given a `products` array." Pass the wrong thing and the editor flags it before you ever
  run the code.
- `type FormValues = z.infer<typeof schema>` and `type ProductRow = typeof products.
  $inferSelect` — types **derived** from a Zod schema and a Drizzle table, so the type and
  the real shape can never drift apart. This "single source of truth" pattern is used all
  over this repo and is worth internalizing.

You don't need to master TypeScript to be productive here — just read the annotations as
"what shape is allowed."

### SEO bits you'll keep seeing

- `metadata` / `generateMetadata` — page titles & descriptions for Google and the browser
  tab (`layout.tsx:30`, `[slug]/page.tsx:26`).
- `<script type="application/ld+json">` (`app/page.tsx:44`, `[slug]/page.tsx:244`) —
  "structured data" telling Google "this is an Organization / a Product." Improves how you
  appear in search.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`
  automatically so search engines can crawl every page.

---

## Module 13 — Trace one real feature end to end

Tie it all together. **"Visitor opens a product and requests a quote":**

1. Visitor hits `/produktet/sigurese/<some-product>`. Next matches
   `app/produktet/[kategoria]/[slug]/page.tsx` (Module 2, dynamic routing).
2. That **Server Component** `await`s `getProductBySlug(slug)` → `loadAll()` (cached) →
   Drizzle → Postgres (Module 6). HTML is built on the server with the product filled in.
3. The HTML includes a **Client Component** `<QuoteRequestDialog>` (Module 3).
4. Visitor clicks "Kërko ofertë". `useState` `open` flips to `true` (Module 5) → the dialog
   renders.
5. They type; **react-hook-form + Zod** validate each field live (Module 7).
6. They submit. `onSubmit` `fetch`es **`/api/quote-request`** (Module 8).
7. That route **re-validates with Zod**, then `sendQuoteEmail` fires via Resend.
8. Browser shows a green **sonner** toast; the dialog closes (`setOpen(false)`).

Every module you read is one link in that chain. That's the whole app in miniature.

---

## Glossary (quick reference)

- **Component** — a function returning JSX (UI). Capitalized name.
- **JSX** — HTML-looking syntax inside `return (...)`; really JavaScript.
- **Props** — inputs passed to a component (`<X foo={bar} />`).
- **State** — a component's remembered, changeable value (`useState`). Changing it
  re-renders.
- **Hook** — a `use…` function (state/lifecycle). Client components only.
- **Re-render** — React re-running a component to update the screen after state changes.
- **Server Component** — runs on the server, can `await` data, no hooks. The default.
- **Client Component** — `"use client"`, runs in the browser, can use hooks/events.
- **Server Action** — `"use server"` function callable from a form; runs on the server.
- **API route** — `route.ts`; an HTTP endpoint (`POST`, `GET`, …).
- **Route / dynamic segment** — folder = URL; `[name]` = a wildcard segment.
- **ORM (Drizzle)** — write DB queries in TypeScript instead of raw SQL.
- **Schema (Zod / Drizzle)** — a description of valid data / a table's shape.
- **Revalidate / ISR** — rebuild cached static pages on a timer or on demand.
- **Token (Tailwind)** — a named color/spacing value (`bg-brand`) for consistency.

---

## Suggested learning order (do these in the app)

1. **Routing:** add a folder `app/test/page.tsx` that exports a component returning
   `<h1>Hello</h1>`. Visit `/test`. Delete it after.
2. **State:** in `category-products.tsx`, `console.log(active)` inside the component, open
   the browser console, click filter chips, watch it re-render and log.
3. **Props:** open `components/site/product-card.tsx` and trace where each `product.*` field
   is displayed.
4. **Server vs client:** try adding `useState` to `app/page.tsx`. It errors — because that's
   a server component. Add `"use client"` to see the error change. Then undo both.
5. **Data:** open `data/products.ts` and follow `getFeaturedProducts` → `loadAll`. Then see
   where the home page calls it (`app/page.tsx:23`).
6. **Form:** change a Zod rule in `quote-request-dialog.tsx:25` (e.g. `min(2)` → `min(5)`)
   and watch the validation message change. Undo.

When any module feels fuzzy, open the referenced file and read the surrounding lines. The
code is the textbook; this document is the map.
```
