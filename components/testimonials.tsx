"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

type Review = {
  name: string;
  city: string;
  story: string;
  service: string;
  /** PLACEHOLDER: replace with real customer headshot (with permission) */
  avatar: string;
};

const reviews: Review[] = [
  {
    name: "Sarah M.",
    city: "Kingwood",
    story:
      "Hurricane Beryl took half my shingles off on a Monday. Perry's crew had a tarp on by 4pm and a brand-new GAF roof on by the following Wednesday. They handled the whole insurance claim — I never even talked to my adjuster. Insurance paid every penny they said it would.",
    service: "Storm damage · full replacement",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "David R.",
    city: "Atascocita",
    story:
      "Got three quotes after my insurance claim. Two pushed me to 'upgrade' to stuff I didn't need. Mike Perry sat at my kitchen table, walked me through the actual scope, and was $4,000 less than the highest bid for the exact same materials. Roof's beautiful. Crew was here three days.",
    service: "Insurance claim · roof replacement",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Linda T.",
    city: "Humble",
    story:
      "I'm a 71-year-old widow and I was terrified of getting ripped off. The Perrys treated me like family. Free inspection, no upsell, financed at $214/month with no money down, and they finished in two days. My late husband would've loved these guys.",
    service: "Roof replacement · financing",
    avatar: "https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Marcus J.",
    city: "Spring",
    story:
      "Called at 9pm on a Sunday after a big oak limb came down. Someone actually answered. They were on my roof at 7am Monday with a tarp. No emergency surcharge, no nonsense. When the full repair happened a week later, they cleaned up so well I couldn't find a single nail in the yard.",
    service: "Emergency repair",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Priya K.",
    city: "The Woodlands",
    story:
      "Got the inspection report whether I hired them or not — and it was the most thorough one I'd ever seen. 47 photos, marked-up diagram, plain-language explanation. I hired them on the spot. Three years later, zero leaks, and they still come by for the annual tune-up.",
    service: "Inspection · maintenance plan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Tom & Carla B.",
    city: "Porter",
    story:
      "Old gutters were dumping water right against the foundation. Perry's crew came out, fabricated new seamless 6-inch gutters in our driveway, and had them up by lunch. Pitched correctly, painted to match the trim. Best $2,800 we've spent on this house.",
    service: "Gutter installation",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=240&q=80"
  }
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  const next = () => setI((p) => (p + 1) % reviews.length);
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="bg-ink text-paper py-section">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:items-end">
          <div>
            <span className="eyebrow-light">
              <span className="h-px w-12 bg-copper-300/60 inline-block" />
              What Houston says
            </span>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              214 five-star reviews. None of them paid for.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
              <div>
                <div className="font-display text-5xl font-semibold tracking-tight text-copper-300">4.9</div>
                <div className="mt-1 flex items-center gap-1 text-copper-300">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-paper/55">Google</div>
              </div>
              <div>
                <div className="font-display text-5xl font-semibold tracking-tight text-copper-300">200+</div>
                <div className="mt-1 text-sm text-paper/70">verified 5-star reviews</div>
              </div>
              <div>
                <div className="font-display text-5xl font-semibold tracking-tight text-copper-300">A+</div>
                <div className="mt-1 text-sm text-paper/70">BBB · accredited 12 years</div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Quote className="absolute -top-6 -left-2 h-16 w-16 text-copper-500/30" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl bg-ink-700/60 ring-1 ring-paper/10 p-8 md:p-10 backdrop-blur"
              >
                <div className="flex items-center gap-1 text-copper-300">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-xl md:text-2xl leading-snug text-paper text-pretty">
                  &ldquo;{r.story}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  {/* PLACEHOLDER: replace with real customer headshot */}
                  <Image
                    src={r.avatar}
                    alt={`${r.name} from ${r.city}`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-copper-500/40"
                  />
                  <div>
                    <div className="font-semibold text-paper">{r.name}</div>
                    <div className="text-sm text-paper/60">{r.city} · {r.service}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {reviews.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Show review ${k + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      k === i ? "w-8 bg-copper-400" : "w-1.5 bg-paper/20 hover:bg-paper/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 hover:bg-paper/10 transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="grid h-11 w-11 place-items-center rounded-full bg-copper-500 text-paper hover:bg-copper-600 transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
