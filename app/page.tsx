import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, ShieldHalf, Headset, Award, ChevronRight } from "lucide-react";
import { LinkButton } from "@/components/site/link-button";
import { BrandStrip } from "@/components/site/brand-strip";
import { CategoryCard } from "@/components/site/category-card";
import { ProductCard } from "@/components/site/product-card";
import { StatStrip } from "@/components/site/stat-strip";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { company } from "@/data/company";

export const revalidate = 300;

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 8);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: company.siteUrl,
    email: company.email,
    telephone: company.phone,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />

      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/8 via-background to-background" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container-page pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Distributor i autorizuar Gewiss në Shqipëri
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Produkte elektrike{" "}
              <span className="text-brand">profesionale</span>{" "}
              për çdo projekt
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton
                href="/kontakt"
                size="lg"
                className="bg-brand hover:bg-brand/90 text-brand-foreground h-11 px-5 text-base"
              >
                Kërko ofertë
                <ArrowRight className="size-4" />
              </LinkButton>
              <LinkButton
                href="/produktet"
                size="lg"
                variant="outline"
                className="h-11 px-5 text-base"
              >
                Shfleto produktet
              </LinkButton>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-brand" />
                Produkte origjinale
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headset className="size-4 text-brand" />
                Mbështetje teknike
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4 text-brand" />
                10+ vjet eksperiencë
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[5/4] rounded-2xl border border-border bg-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-ntshbeli-blue/5" />
              <div className="relative h-full grid grid-cols-2 grid-rows-2 gap-2 p-3">
                <div className="rounded-xl bg-surface border border-border p-5 flex flex-col justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Partner</div>
                  <Image src="/brand/gewiss-logo.svg" alt="Gewiss" width={120} height={48} className="h-7 w-auto" />
                </div>
                <div className="rounded-xl bg-foreground text-background p-5 flex flex-col justify-between">
                  <Zap className="size-5 text-brand" />
                  <div>
                    <div className="font-heading text-2xl font-bold">70k+</div>
                    <div className="text-xs text-background/70">Produkte në katalog</div>
                  </div>
                </div>
                <div className="rounded-xl bg-brand text-brand-foreground p-5 flex flex-col justify-between">
                  <ShieldHalf className="size-5" />
                  <div>
                    <div className="font-heading text-2xl font-bold">24h</div>
                    <div className="text-xs opacity-90">Përgjigje ndaj ofertave</div>
                  </div>
                </div>
                <div className="rounded-xl bg-surface border border-border p-5 flex flex-col justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Partner</div>
                  <Image src="/brand/marlanvil-logo.svg" alt="Marlanvil" width={120} height={48} className="h-7 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandStrip />

      <section className="container-page section-y">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              Katalogu
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Kategoritë e produkteve
            </h2>
            <p className="text-muted-foreground mt-3">
              Eksploroni gamën e plotë të zgjidhjeve elektrike Gewiss për banesa, zyra dhe ambiente industriale.
            </p>
          </div>
          <LinkButton
            href="/produktet"
            variant="ghost"
            className="hidden md:inline-flex text-foreground hover:bg-surface"
          >
            Të gjitha kategoritë
            <ChevronRight className="size-4" />
          </LinkButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 auto-rows-fr">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} size={i === 0 ? "large" : "default"} />
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-surface border-y border-border">
          <div className="container-page section-y">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                  Të zgjedhura
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                  Produkte më të kërkuara
                </h2>
                <p className="text-muted-foreground mt-3">
                  Bestsellerët nga katalogu Gewiss — kërkoni ofertë me një klikim.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page section-y">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Pse Ntsh Beli
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            Partner i besueshëm për profesionistë
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Ekipi ynë ndihmon elektricistë, instalues dhe sipërmarrës projektesh të zgjedhin zgjidhjen e duhur — shpejt, me cilësi, pa pengesa.
          </p>
        </div>
        <StatStrip />
      </section>

      <section className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent" />
        <div className="relative container-page section-y text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
            Keni një projekt elektrik në mendje?
          </h2>
          <p className="text-background/70 max-w-xl mx-auto">
            Na dërgoni specifikat — ekipi ynë kthen ofertë të personalizuar brenda 24 orëve.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <LinkButton
              href="/kontakt"
              size="lg"
              className="bg-brand hover:bg-brand/90 text-brand-foreground h-11 px-6"
            >
              Kërko ofertë
              <ArrowRight className="size-4" />
            </LinkButton>
            <LinkButton
              href="/produktet"
              size="lg"
              variant="outline"
              className="bg-transparent text-background border-background/30 hover:bg-background/10 h-11 px-6"
            >
              Shfleto produktet
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
