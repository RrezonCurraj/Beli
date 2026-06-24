import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { QuoteRequestDialog } from "@/components/site/quote-request-dialog";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktoni ${company.name}: telefon, email, WhatsApp dhe adresa fizike.`,
};

export default function KontaktPage() {
  const mapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.765901647919!2d20.83312507685532!3d42.36443987119248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13539b1be312b4f9%3A0xaf5a3d50fcff5ec0!2sNTSH%20Beli!5e1!3m2!1sen!2s!4v1782313955852!5m2!1sen!2s";

  return (
    <>
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold">Kontakt</h1>
          <p className="mt-2 text-muted-foreground">
            Na shkruani, telefononi ose vizitoni në pikën tonë të shitjes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <ContactRow icon={MapPin} label="Adresa">
              {company.address.street}, {company.address.city}, {company.address.country}
            </ContactRow>
            <ContactRow icon={Phone} label="Telefoni">
              <a href={`tel:${company.phone}`} className="hover:text-brand">{company.phone}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${company.email}`} className="hover:text-brand">{company.email}</a>
            </ContactRow>
            <ContactRow icon={Clock} label="Orari">
              {company.hours}
            </ContactRow>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href={buildWhatsAppLink("Përshëndetje! Dua të kërkoj një ofertë.")}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "bg-[#25D366] hover:bg-[#1ebe57] text-white")}
            >
              <MessageCircle className="size-4" />
              Na shkruani në WhatsApp
            </a>
            <QuoteRequestDialog
              trigger={
                <Button variant="brand">
                  Kërko ofertë
                </Button>
              }
            />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square md:aspect-auto md:min-h-[400px]">
          <iframe
            src={mapsEmbed}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Harta — Ntsh Beli"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-medium">{children}</div>
      </div>
    </div>
  );
}
