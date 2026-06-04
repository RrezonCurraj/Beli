import type { Metadata } from "next";
import Image from "next/image";
import { Award, ShieldCheck, Users, Building2 } from "lucide-react";
import { LinkButton } from "@/components/site/link-button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Rreth Nesh",
  description: `Mësoni më shumë rreth ${company.name} — distributor i autorizuar i produkteve elektrike Gewiss dhe Marlanvil në Shqipëri.`,
};

export default function RrethNeshPage() {
  return (
    <>
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold">Rreth Ntsh Beli</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {company.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-3xl space-y-6 text-foreground/80 leading-relaxed">
        <h2 className="text-2xl font-semibold text-foreground">Misioni ynë</h2>
        <p>
          Ofrojmë zgjidhje elektrike cilësore dhe të certifikuara për çdo lloj projekti — nga banesa
          familjare deri tek instalime industriale komplekse. Punojmë me marka të besueshme dhe
          ofrojmë mbështetje teknike në çdo hap të projektit tuaj.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mt-8">Partnerët tanë</h2>
        <p>
          Si distributor zyrtar i Gewiss dhe Marlanvil, garantojmë origjinalitetin e produkteve dhe
          aplikojmë garancinë e fabrikës për çdo artikull të shitur.
        </p>
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="flex items-center justify-center rounded-xl border border-border bg-background p-8">
            <Image
              src="/brand/gewiss-logo.svg"
              alt="Gewiss"
              width={200}
              height={80}
              className="h-14 w-auto"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl border border-border bg-background p-8">
            <Image
              src="/brand/marlanvil-logo.svg"
              alt="Marlanvil"
              width={220}
              height={80}
              className="h-14 w-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: Award, title: "Distributor zyrtar", desc: "Marrëdhënie direkte me Gewiss." },
              { icon: ShieldCheck, title: "Cilësi e garantuar", desc: "Produkte origjinale 100%." },
              { icon: Users, title: "Klientë në mbarë vendin", desc: "Instalues, kompani dhe projekte." },
              { icon: Building2, title: "Përvojë në sektor", desc: "Njohuri teknike e thelluar." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-background p-6">
                <div className="size-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-4">
                  <f.icon className="size-5" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-3xl font-bold">Të gatshëm të bashkëpunojmë</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Na kontaktoni për çdo pyetje ose kërkesë oferte për produktet Gewiss.
        </p>
        <LinkButton href="/kontakt" size="lg" className="bg-brand hover:bg-brand/90 text-brand-foreground">
          Na kontaktoni
        </LinkButton>
      </section>
    </>
  );
}
