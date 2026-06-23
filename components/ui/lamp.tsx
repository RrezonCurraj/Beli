"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Branded, light-theme variant of the Aceternity "lamp" effect.
 *
 * The original pulls its content up with a large negative translate, which only
 * works when the container is `min-h-screen`. Here the lamp lives in a contained
 * hero, so instead the beams are pinned a fixed distance below the header (their
 * bright apex sits at ~9rem) and the content flows normally underneath with top
 * padding — no off-screen translate, nothing hides under the sticky header.
 */
export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "relative isolate z-0 flex w-full flex-col items-center overflow-hidden bg-slate-50 pt-28 pb-14 md:pt-56 md:pb-32",
        className
      )}
    >
      {/* Lamp beams — apex (the bright line) sits ~9rem from the top, clear of the header */}
      <div className="pointer-events-none absolute inset-x-0 top-[5rem] z-0 flex origin-top scale-[0.6] items-start justify-center md:top-[9rem] md:scale-100">
        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, var(--brand), transparent, transparent)",
          }}
          className="absolute right-1/2 top-0 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-50 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-50 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, var(--brand))",
          }}
          className="absolute left-1/2 top-0 h-56 w-[30rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-50 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-50 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Soft glow straddling the line */}
        <div className="absolute left-1/2 top-0 h-36 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-25 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent opacity-40 blur-2xl"
        />

        {/* Bright filament line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 h-0.5 w-[30rem] -translate-x-1/2 -translate-y-1/2 bg-brand"
        />
      </div>

      {/* Content — normal flow, sits just under the lit line */}
      <div className="relative z-50 flex w-full max-w-5xl flex-col items-center px-5">
        {children}
      </div>
    </section>
  );
};
