import { ArrowRight, ChevronRight } from "lucide-react";
import { LinkButton } from "@/components/site/link-button";
import { Hero } from "@/components/site/hero";
import { BrandStrip } from "@/components/site/brand-strip";
import { CategoryCard } from "@/components/site/category-card";
import { ProductCard } from "@/components/site/product-card";
import { StatStrip } from "@/components/site/stat-strip";
import { ProjectsScroller } from "@/components/site/projects-scroller";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { projects } from "@/data/projects";
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

      <Hero />

      <ProjectsScroller projects={projects} />

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
              Eksploroni gamën e plotë të zgjidhjeve elektrike Gewiss për
              banesa, zyra dhe ambiente industriale.
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

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2 auto-rows-fr">
          {categories.map((c, i) => (
            <CategoryCard
              key={c.slug}
              category={c}
              size={i === 0 ? "large" : "default"}
            />
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
                  Bestsellerët nga katalogu Gewiss — kërkoni ofertë me një
                  klikim.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
            Ekipi ynë ndihmon elektricistë, instalues dhe sipërmarrës projektesh
            të zgjedhin zgjidhjen e duhur — shpejt, me cilësi, pa pengesa.
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
            Na dërgoni specifikat — ekipi ynë kthen ofertë të personalizuar
            brenda 24 orëve.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <LinkButton
              href="/kontakt"
              variant="brand"
              size="lg"
              className="h-11 px-6"
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
