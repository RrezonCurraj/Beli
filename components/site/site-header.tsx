"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

const nav = [
  { href: "/", label: "Kreu" },
  { href: "/produktet", label: "Produktet" },
  { href: "/rreth-nesh", label: "Rreth Nesh" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="hidden md:block bg-foreground text-background/80">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-background transition-colors"
            >
              <Phone className="size-3.5" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-1.5 hover:text-background transition-colors"
            >
              <Mail className="size-3.5" />
              {company.email}
            </a>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{company.hours}</span>
          </div>
        </div>
      </div>

      <div className="container-page flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Ntsh Beli"
        >
          <Image
            src="/brand/ntshbeli-logo.svg"
            alt="Ntsh Beli"
            width={180}
            height={72}
            priority
            className="h-20 md:h-22 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={buildWhatsAppLink("Përshëndetje! Dua më shumë informacion.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-border text-foreground hover:bg-surface gap-2",
            )}
          >
            <MessageCircle className="size-4 text-[#25D366]" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
          <Link
            href="/kontakt"
            className={cn(buttonVariants({ variant: "brand" }))}
          >
            Kërko ofertë
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Hap menunë"
                className="md:hidden"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-80">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-1 mt-8 px-4">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-3 rounded-md text-base font-medium transition-colors",
                      active
                        ? "bg-brand/10 text-brand"
                        : "text-foreground hover:bg-surface",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 px-4 flex flex-col gap-2">
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "brand" }))}
              >
                Kërko ofertë
              </Link>
              <a
                href={buildWhatsAppLink(
                  "Përshëndetje! Dua më shumë informacion.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp
              </a>
              <div className="border-t border-border my-4" />
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5"
              >
                <Phone className="size-4" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5"
              >
                <Mail className="size-4" />
                {company.email}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
