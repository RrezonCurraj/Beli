"use client";

import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function MobileCtaBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-2 gap-2 p-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        <a
          href={buildWhatsAppLink("Përshëndetje! Dua të kërkoj një ofertë.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-12 rounded-md bg-[#25D366] text-white font-medium text-sm"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
        <Link
          href="/kontakt"
          className="flex items-center justify-center gap-2 h-12 rounded-md bg-brand text-brand-foreground font-medium text-sm"
        >
          <FileText className="size-4" />
          Kërko ofertë
        </Link>
      </div>
    </div>
  );
}
