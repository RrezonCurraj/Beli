import type { LucideIcon } from "lucide-react";
import { Calendar, Boxes, Users, Truck } from "lucide-react";

type Stat = { value: string; label: string; icon: LucideIcon };

const stats: Stat[] = [
  { value: "10+", label: "Vite eksperiencë", icon: Calendar },
  { value: "70k+", label: "Produkte Gewiss", icon: Boxes },
  { value: "500+", label: "Klientë profesionistë", icon: Users },
  { value: "24h", label: "Përgjigje ndaj kërkesave", icon: Truck },
];

export function StatStrip({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-4 py-5 text-center">
            <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-6 flex items-start gap-4"
        >
          <div className="size-11 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
            <s.icon className="size-5" />
          </div>
          <div>
            <div className="font-heading text-3xl font-bold tracking-tight">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
