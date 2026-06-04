"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppFloating() {
  return (
    <a
      href={buildWhatsAppLink("Përshëndetje! Dua të kërkoj një ofertë.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kontaktoni në WhatsApp"
      className={cn(
        "hidden md:flex fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20",
        "hover:scale-105 transition-transform",
      )}
    >
      <MessageCircle className="size-7" />
    </a>
  );
}

export function WhatsAppInline({
  message,
  label = "Dërgo me WhatsApp",
  className,
}: {
  message: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#1ebe57] transition-colors",
        className,
      )}
    >
      <MessageCircle className="size-4" />
      {label}
    </a>
  );
}
