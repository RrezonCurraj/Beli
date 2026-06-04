import { company } from "@/data/company";

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${company.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage(productName: string, sku: string): string {
  return `Përshëndetje! Dua të kërkoj një ofertë për produktin:\n\n• ${productName}\n• Kodi: ${sku}\n\nFaleminderit!`;
}
