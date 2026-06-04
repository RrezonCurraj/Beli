import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { categories } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background/80 mt-16">
      <div className="container-page py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <Image
            src="/brand/ntshbeli-logo.svg"
            alt="Ntsh Beli"
            width={160}
            height={64}
            className="h-11 w-auto"
          />
          <p className="text-sm text-background/60 max-w-xs leading-relaxed">
            {company.description}
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-2 text-sm hover:text-background transition-colors"
            >
              <Phone className="size-4 text-brand" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 text-sm hover:text-background transition-colors"
            >
              <Mail className="size-4 text-brand" />
              {company.email}
            </a>
            <div className="inline-flex items-start gap-2 text-sm">
              <MapPin className="size-4 text-brand mt-0.5 shrink-0" />
              <span>
                {company.address.street}, {company.address.city},{" "}
                {company.address.country}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-background">
            Katalogu
          </h4>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/produktet/${c.slug}`}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  {c.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-background">
            Kompania
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/rreth-nesh"
                className="text-background/60 hover:text-background transition-colors"
              >
                Rreth Nesh
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className="text-background/60 hover:text-background transition-colors"
              >
                Kontakt
              </Link>
            </li>
            <li>
              <Link
                href="/produktet"
                className="text-background/60 hover:text-background transition-colors"
              >
                Produktet
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-background">
            Partnerët
          </h4>
          <div className="flex flex-col gap-3">
            <div className="rounded-lg bg-background/5 border border-background/10 px-3 py-3 flex items-center justify-between">
              <Image
                src="/brand/gewiss-logo.svg"
                alt="Gewiss"
                width={100}
                height={32}
                className="h-6 w-auto opacity-90"
              />
              <span className="text-[10px] uppercase tracking-wider text-background/50 font-semibold">
                Zyrtar
              </span>
            </div>
            <div className="rounded-lg bg-background/5 border border-background/10 px-3 py-3 flex items-center justify-between">
              <Image
                src="/brand/marlanvil-logo.svg"
                alt="Marlanvil"
                width={120}
                height={32}
                className="h-6 w-auto opacity-90"
              />
              <span className="text-[10px] uppercase tracking-wider text-background/50 font-semibold">
                Zyrtar
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-background/50">
          <div>
            © {new Date().getFullYear()} {company.legalName}. Të gjitha të
            drejtat e rezervuara.
          </div>
        </div>
      </div>
    </footer>
  );
}
