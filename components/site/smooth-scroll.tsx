"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling via Lenis. Disabled under prefers-reduced-motion.
 * - Keeps Lenis's measured height fresh (pinned sections / images change it).
 * - Scroll target on route change, in priority order:
 *     1. a recorded scroll intent (sessionStorage "scrollTo" = element id),
 *     2. the URL hash,
 *     3. a remembered position for that route (browser back),
 *     4. the top.
 *   Targets are re-asserted over a few frames so a late layout shift (the
 *   pinned section setting its height) can't drop the scroll on the wrong spot.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const positions = useRef<Map<string, number>>(new Map());
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.documentElement);
    ro.observe(document.body);
    const onLoad = () => lenis.resize();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const scrollTo = (target: number | HTMLElement) => {
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else if (typeof target === "number") window.scrollTo(0, target);
      else target.scrollIntoView();
    };

    let intentId: string | null = null;
    try {
      intentId = sessionStorage.getItem("scrollTo");
      if (intentId) sessionStorage.removeItem("scrollTo");
    } catch {}

    const hash = window.location.hash;
    const selector = intentId ? `#${intentId}` : hash || null;
    const saved = positions.current.get(pathname);

    let frame = 0;
    let attempts = 0;
    const apply = () => {
      const el = selector ? document.querySelector(selector) : null;
      if (el) {
        scrollTo(el as HTMLElement);
        // Re-assert while the layout can still shift (pinned height, images).
        if (attempts++ < 5) frame = requestAnimationFrame(apply);
        return;
      }
      if (selector && attempts++ < 5) {
        frame = requestAnimationFrame(apply); // element not mounted yet
        return;
      }
      if (saved != null) scrollTo(saved);
      else scrollTo(0);
    };
    apply();

    return () => {
      cancelAnimationFrame(frame);
      positions.current.set(pathname, window.scrollY);
    };
  }, [pathname]);

  return null;
}
