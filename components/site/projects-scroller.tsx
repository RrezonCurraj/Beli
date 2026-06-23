"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Pinned horizontal projects gallery. The section sticks to the viewport while
 * the cards pan right → left, then the page continues scrolling down once the
 * row is fully traversed (1px of vertical scroll = 1px of horizontal pan).
 * Under prefers-reduced-motion it degrades to a normal swipeable strip.
 */
export function ProjectsScroller({ projects }: { projects: Project[] }) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!wrapper || !sticky || !viewport || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      viewport.style.overflowX = "auto";
      return;
    }

    let raf = 0;
    let max = 0;
    let target = 0;
    let current = 0;

    const measure = () => {
      const vh = window.innerHeight;
      max = Math.max(0, track.scrollWidth - viewport.clientWidth);
      // Vertical scroll distance to consume the pan == horizontal overflow.
      wrapper.style.height = `${vh + max}px`;
    };

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      target = p * max;
    };

    // Eased follow loop — glides toward the scroll-derived target.
    const render = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.4) current = target;
      track.style.transform = `translate3d(${-current}px,0,0)`;
      raf = current === target ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      computeTarget();
      kick();
    };
    const onResize = () => {
      measure();
      computeTarget();
      kick();
    };

    viewport.style.overflowX = "hidden";
    measure();
    computeTarget();
    current = target;
    track.style.transform = `translate3d(${-current}px,0,0)`;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      wrapper.style.height = "";
    };
  }, [projects]);

  return (
    <section ref={wrapperRef} id="projekte" className="relative bg-background scroll-mt-24">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-12"
      >
        <div className="container-page mb-8 flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              Projekte
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Projektet tona
            </h2>
            <p className="text-slate-600 mt-3">
              Objekte rezidenciale, komerciale dhe industriale që kemi
              projektuar, instaluar dhe furnizuar — të përfunduara dhe në
              vazhdim.
            </p>
          </div>
        </div>

        <div ref={viewportRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] will-change-transform"
          >
            {projects.map((p) => (
              <article
                key={p.slug}
                className="group relative w-[86vw] max-w-[560px] shrink-0 sm:w-[480px] lg:w-[560px]"
              >
                <Link
                  href={`/projektet/${p.slug}`}
                  className="block relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-900/10 shadow-lg"
                >
                  {/* Photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/15 to-transparent" />

                  {/* Status */}
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
                      p.status === "perfunduar"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-amber-400/90 text-slate-900"
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {p.status === "perfunduar" ? "Përfunduar" : "Në vazhdim"}
                  </span>

                  {/* Open affordance */}
                  <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/75">
                        <Zap className="size-4 text-brand" />
                        {p.subtitle}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
