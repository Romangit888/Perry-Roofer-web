"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";

type Job = {
  street: string;
  area: string;
  date: string;
  scope: string;
  detail: string;
  squares: string;
  /** PLACEHOLDER: replace with real job-site photo */
  image: string;
  imageAlt: string;
};

const jobs: Job[] = [
  {
    street: "Cypresswood Dr",
    area: "Spring",
    date: "Aug 2024",
    scope: "Full replacement · post-Beryl",
    detail:
      "GAF Timberline HDZ, decking upgraded to ½″ plywood per code. Full insurance claim handled — homeowner paid only the deductible.",
    squares: "22 squares",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "New GAF asphalt shingle roof, Spring TX"
  },
  {
    street: "Hidden Pines Ln",
    area: "Kingwood",
    date: "Sep 2024",
    scope: "Wind uplift repair",
    detail:
      "Six squares of partial replacement after wind uplift on the south-facing slope. Hurricane straps inspected and re-secured at every truss-to-plate connection.",
    squares: "6 squares",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Wind uplift roof repair in Kingwood TX"
  },
  {
    street: "Atascocita Pines",
    area: "Atascocita",
    date: "Oct 2024",
    scope: "Class-4 impact-rated upgrade",
    detail:
      "Full tear-off and re-roof with Class-4 impact-rated shingles. Homeowner now qualifies for ~12% off their wind/hail premium with most TX carriers.",
    squares: "26 squares",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Class 4 impact-rated shingles installed in Atascocita"
  },
  {
    street: "Lake Forest Estates",
    area: "Humble",
    date: "Nov 2024",
    scope: "Tear-off + decking upgrade",
    detail:
      "Full tear-off, original ⅜″ OSB decking replaced with ⅝″ plywood throughout. New ridge ventilation and synthetic underlayment. 2-day job.",
    squares: "31 squares",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Decking upgrade and re-roof in Humble TX"
  }
];

export function RecentJobs() {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="bg-paper py-section">
      <div className="container-tight">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="eyebrow">
              <span className="rule" />
              On the books — the last 90 days
            </span>
            <h2 className="mt-4 font-display text-display-lg text-ink text-balance">
              Recent jobs from <span className="scribble">your end of town</span>.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end gap-2">
            <button
              onClick={() => nudge(-1)}
              aria-label="Previous jobs"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 hover:border-copper-500 hover:text-copper-500 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => nudge(1)}
              aria-label="More jobs"
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-paper hover:bg-copper-500 transition"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Edge-to-edge horizontal scroll */}
      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-[max(1.25rem,calc((100vw-1200px)/2))] pb-4"
      >
        {jobs.map((j, i) => (
          <motion.article
            key={j.street}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className={`group snap-start shrink-0 w-[88vw] sm:w-[60vw] md:w-[440px] overflow-hidden bg-white ring-1 ring-ink/10 shadow-card hover:shadow-lift transition-shadow ${
              i % 2 === 0
                ? "rounded-tl-[2rem] rounded-tr-md rounded-br-[2rem] rounded-bl-md"
                : "rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl"
            }`}
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              {/* PLACEHOLDER: replace with real before/after job photo */}
              <Image
                src={j.image}
                alt={j.imageAlt}
                fill
                sizes="(min-width: 768px) 440px, 88vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur">
                <Calendar className="h-3 w-3" /> {j.date}
              </div>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                {j.squares}
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-copper-500">
                <MapPin className="h-3.5 w-3.5" />
                {j.area}, TX
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{j.street}</h3>
              <div className="mt-1 text-sm font-medium text-ink/60">{j.scope}</div>
              <p className="mt-4 text-[0.93rem] leading-relaxed text-ink/70">{j.detail}</p>
            </div>
          </motion.article>
        ))}
        {/* trailing card: CTA */}
        <a
          href="#book"
          className="snap-start shrink-0 w-[88vw] sm:w-[60vw] md:w-[440px] grid place-items-center rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl border-2 border-dashed border-ink/20 p-10 text-center transition hover:border-copper-500 hover:bg-paper-warm"
        >
          <div>
            <div className="font-display text-xl text-ink">Could be yours next.</div>
            <p className="mt-2 text-sm text-ink/60">Free inspection. Real photos. Honest report.</p>
            <div className="mt-5 inline-flex items-center gap-2 font-semibold text-copper-500">
              Book it <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </a>
      </div>

      {/* TX-specific concerns strip */}
      <div className="container-tight mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Wind uplift", v: "IRC 130 mph zone — every install meets or exceeds." },
          { k: "Hurricane straps", v: "Inspected and corrected on every replacement, no extra charge." },
          { k: "Class 4 hail", v: "Impact-rated shingles can knock ~12% off your TX premium." },
          { k: "Insurance timeline", v: "Texas §542: 60-day acknowledge, 15-day decision. We track it." }
        ].map((c) => (
          <div
            key={c.k}
            className="rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl border border-ink/10 bg-paper-warm p-5"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-500">{c.k}</div>
            <div className="mt-2 text-[0.92rem] leading-snug text-ink/75">{c.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
