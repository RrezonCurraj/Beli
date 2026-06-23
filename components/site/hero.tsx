"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { LinkButton } from "@/components/site/link-button";

export function Hero() {
  return (
    <LampContainer className="border-b border-slate-200">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="max-w-4xl font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-slate-900">
          Sisteme elektrike <span className="text-brand">profesionale</span>{" "}
          për objektet tuaja.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-600 leading-relaxed">
          Nga projektimi te vënia në punë — Ntsh Beli projekton, instalon dhe
          furnizon sisteme elektrike për objekte rezidenciale, komerciale dhe
          industriale, me produkte origjinale Gewiss dhe Marlanvil.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton
            href="/kontakt"
            variant="brand"
            size="lg"
            className="h-11 px-5 text-base"
          >
            Kërko ofertë
            <ArrowRight className="size-4" />
          </LinkButton>
          <LinkButton
            href="/produktet"
            size="lg"
            variant="outline"
            className="h-11 px-5 text-base bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900"
          >
            Shfleto produktet
          </LinkButton>
        </div>

        {/* Trust stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm">
          <span className="inline-flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-slate-900 tabular-nums">
              70k+
            </span>
            <span className="text-slate-500">produkte në katalog</span>
          </span>
          <span className="inline-flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-slate-900 tabular-nums">
              24h
            </span>
            <span className="text-slate-500">përgjigje ndaj ofertave</span>
          </span>
          <span className="inline-flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-slate-900 tabular-nums">
              10+
            </span>
            <span className="text-slate-500">vjet eksperiencë</span>
          </span>
        </div>
      </motion.div>
    </LampContainer>
  );
}
