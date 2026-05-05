"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, ClipboardCheck, FileText, Hammer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  Icon: LucideIcon;
  k: string;
  title: string;
  body: string;
  duration: string;
};

const steps: Step[] = [
  {
    Icon: Phone,
    k: "01",
    title: "You call. We pick up.",
    body:
      "A real person — usually one of the Perrys — answers and books your free inspection. No phone tree, no \"we'll get back to you within 48 hours.\"",
    duration: "Under 60 seconds"
  },
  {
    Icon: ClipboardCheck,
    k: "02",
    title: "Free, on-roof inspection",
    body:
      "We climb up, take 40+ photos, and walk you through what we find. You get the full report — even if you don't hire us.",
    duration: "45 minutes"
  },
  {
    Icon: FileText,
    k: "03",
    title: "Honest quote · insurance handled",
    body:
      "Line-item pricing in plain English. If it's an insurance job, we deal with the adjuster, the supplements, the depreciation — all of it.",
    duration: "Same day"
  },
  {
    Icon: Hammer,
    k: "04",
    title: "We build it. You watch.",
    body:
      "Tear-off, dry-in, install, cleanup, magnetic sweep for nails — usually one to two days. Same crew every day. We don't subcontract.",
    duration: "1–2 days typical"
  }
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"]
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-paper-warm py-section">
      <div className="container-tight" ref={ref}>
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="rule" />
            How it works
          </span>
          <h2 className="mt-4 font-display text-display-lg text-ink text-balance">
            Four steps. No surprises. No high-pressure sales pitch.
          </h2>
        </div>

        {/* Desktop: horizontal */}
        <div className="relative mt-16 hidden lg:block">
          {/* base line */}
          <div className="absolute left-0 right-0 top-7 h-px bg-ink/15" aria-hidden />
          {/* animated fill */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-7 h-px bg-copper-500 origin-left"
            aria-hidden
          />
          <ol className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-copper-500 bg-paper text-copper-500 shadow-card">
                  <s.Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="mt-6 text-center">
                  <div className="font-display text-xs uppercase tracking-[0.2em] text-copper-500">{s.k}</div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
                  <div className="mt-3 inline-block rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                    {s.duration}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-ink/15" aria-hidden />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-7 top-0 w-px bg-copper-500 origin-top"
            aria-hidden
          />
          <ol className="space-y-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pl-20"
              >
                <div className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border-2 border-copper-500 bg-paper text-copper-500 shadow-card">
                  <s.Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="font-display text-xs uppercase tracking-[0.2em] text-copper-500">{s.k}</div>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{s.body}</p>
                <div className="mt-3 inline-block rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                  {s.duration}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
