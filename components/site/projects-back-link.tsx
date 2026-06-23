"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Link back to the projects section. Records the scroll intent so SmoothScroll
 * lands on #projekte after the route + layout settle (hash timing alone is
 * unreliable with the pinned section).
 */
export function ProjectsBackLink({
  className,
  children,
}: {
  className?: string;
  children: ComponentPropsWithoutRef<typeof Link>["children"];
}) {
  return (
    <Link
      href="/#projekte"
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem("scrollTo", "projekte");
        } catch {}
      }}
    >
      {children}
    </Link>
  );
}
