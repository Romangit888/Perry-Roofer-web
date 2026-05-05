"use client";

import { motion } from "framer-motion";
import { Users, BadgeDollarSign, Clock4, FileSignature } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Reason = {
  Icon: LucideIcon;
  title: string;
  body: string;
  proof: string;
};

const reasons: Reason[] = [
  {
    Icon: Clock4,
    title: "We answer when it matters",
    body:
      "Hurricane season doesn't keep business hours. Emergency line staffed 24/7 from June through November, and same-day tarping is the default.",
    proof: "2 hr 47 min median response"
  },
  {
    Icon: FileSignature,
    title: "Insurance claims, handled",
    body:
      "We meet the adjuster on the roof, document every shingle, and fight for the supplement when they lowball. You don't manage the claim — we do.",
    proof: "94% approved on first submission"
  },
  {
    Icon: BadgeDollarSign,
    title: "Fair pricing, real financing",
    body:
      "Free inspections that don't conveniently turn into a $22,000 quote. $0-down financing as low as $189/mo with 90-second decisions.",
    proof: "No high-pressure sales pitch. Ever."
  }
];

export function WhyUs() {
  return (
    <section className="relative bg-paper py-section">
      {/* faint paper grid behind the hero stat */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />

      <div className="relative container-tight">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">
              <span className="rule" />
              Why Houston homeowners choose us
            </span>
            <h2 className="mt-4 font-display text-display-lg text-ink text-balance">
              Roofers your <span className="scribble">neighbors</span> actually recommend.
            </h2>
          </div>
          <p className="md:col-span-5 md:pl-8 md:border-l md:border-ink/10 text-lg leading-relaxed text-ink/70 text-pretty">
            We&rsquo;re not the biggest roofer in Houston. We&rsquo;re the one your aunt
            in Atascocita called after the hailstorm — and the one she called back two
            years later for her gutters.
          </p>
        </div>

        {/* Asymmetric layout: oversized featured "family" panel + 3 stacked reason cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {/* Featured: A FAMILY, NOT A CALL CENTER — owns the left column at full height */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:col-span-7 overflow-hidden rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md bg-ink text-paper p-8 md:p-12 shadow-lift"
          >
            <div className="absolute inset-0 bg-grid-dark opacity-25" aria-hidden />
            <div
              className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-copper-500/30 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-copper-500 text-paper">
                  <Users className="h-6 w-6" aria-hidden />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-300">
                  A family, not a call center
                </div>
              </div>

              <div className="mt-10 flex items-end gap-4">
                <span className="font-display text-[8rem] leading-[0.82] tracking-tight text-paper">3</span>
                <span className="pb-3 font-display text-2xl text-paper/70 leading-tight">
                  generations<br /> of Perrys on every job.
                </span>
              </div>

              <p className="mt-8 max-w-md text-paper/75 leading-relaxed text-pretty">
                When you call, you get one of us — not a 1-800 number that pings the next
                available subcontractor. The same crew that quotes the job is the crew that
                builds it. We don&rsquo;t sub out a single nail.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 border-t border-paper/15 pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-copper-300">
                <span className="h-px w-8 bg-copper-300/60" />
                Same crew, start to finish.
              </div>
            </div>
          </motion.article>

          {/* Stacked smaller reasons */}
          <div className="md:col-span-5 grid gap-5">
            {reasons.map((r, i) => (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative flex gap-4 rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl border border-ink/10 bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-500 transition-colors group-hover:bg-copper-500 group-hover:text-paper">
                  <r.Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink/70">{r.body}</p>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-500">
                    {r.proof}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
