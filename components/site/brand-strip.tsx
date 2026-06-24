import Image from "next/image";

const brands = [
  { name: "Gewiss", src: "/brand/gewiss-logo.svg", w: 160, h: 60 },
  { name: "Marlanvil", src: "/brand/marlanvil-logo.svg", w: 180, h: 64 },
];

export function BrandStrip() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="container-page py-10">
        <div className="text-center mb-6">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Partner i autorizuar
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {brands.map((b) => (
            <div
              key={b.name}
              className="flex items-center justify-center rounded-xl bg-slate-900 px-8 py-5 md:px-10 md:py-6 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <Image
                src={b.src}
                alt={b.name}
                width={b.w}
                height={b.h}
                className="h-9 md:h-11 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
