"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, ShieldCheck, Clock, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildWhatsAppLink, quoteMessage } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Emri është i detyrueshëm"),
  company: z.string().optional(),
  phone: z.string().min(6, "Telefoni është i detyrueshëm"),
  email: z.string().email("Email i pavlefshëm"),
  message: z.string().min(5, "Mesazhi është shumë i shkurtër"),
});

type FormValues = z.infer<typeof schema>;

export function QuoteRequestDialog({
  trigger,
  productName,
  productSku,
  productUrl,
}: {
  trigger?: React.ReactElement;
  productName?: string;
  productSku?: string;
  productUrl?: string;
}) {
  const [open, setOpen] = useState(false);

  const prefillMessage = productName
    ? `Përshëndetje! Dua një ofertë për: ${productName} (${productSku ?? ""}).`
    : "Përshëndetje! Dua të kërkoj një ofertë.";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      message: prefillMessage,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          productName,
          productSku,
          productUrl,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gabim gjatë dërgimit");
      }
      toast.success("Kërkesa u dërgua. Do t'ju kontaktojmë brenda 24 orëve.");
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gabim gjatë dërgimit");
    }
  };

  const waMessage = productName && productSku
    ? quoteMessage(productName, productSku)
    : "Përshëndetje! Dua të kërkoj një ofertë.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button className="bg-brand hover:bg-brand/90 text-brand-foreground">
              Kërko ofertë
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Kërko ofertë</DialogTitle>
          <DialogDescription className="flex items-center gap-1.5 text-xs">
            <Clock className="size-3.5" />
            Përgjigje brenda 24 orëve · Pa angazhim
          </DialogDescription>
        </DialogHeader>

        {productName && (
          <div className="rounded-lg bg-surface border border-border p-3 flex items-start gap-3">
            <div className="size-9 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">Po pyesni për</div>
              <div className="text-sm font-medium truncate">{productName}</div>
              {productSku && (
                <div className="font-mono text-[11px] text-muted-foreground mt-0.5">{productSku}</div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Emri <span className="text-brand">*</span></Label>
            <Input id="name" {...register("name")} aria-invalid={!!errors.name} autoComplete="name" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="company">Kompania <span className="text-muted-foreground font-normal">(opsionale)</span></Label>
            <Input id="company" {...register("company")} autoComplete="organization" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Telefoni <span className="text-brand">*</span></Label>
              <Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} autoComplete="tel" inputMode="tel" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email <span className="text-brand">*</span></Label>
              <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} autoComplete="email" inputMode="email" />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="message">Mesazhi <span className="text-brand">*</span></Label>
            <Textarea id="message" rows={4} {...register("message")} aria-invalid={!!errors.message} />
            {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="size-3" />
            Të dhënat tuaja mbahen private. Përdoren vetëm për t&apos;ju kthyer përgjigje.
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <a
              href={buildWhatsAppLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Dërgo me WhatsApp
            </a>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              {isSubmitting ? "Po dërgohet..." : "Dërgo kërkesën"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
