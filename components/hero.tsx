"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, ShieldCheck, Calendar, Hammer } from "lucide-react";
import { PhoneLink } from "./phone-link";
import { yearsInBusiness } from "@/lib/utils";

export function Hero() {
  const years = yearsInBusiness();
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {/* PLACEHOLDER: replace with actual photo of Perry & Sons crew on a Humble-area rooftop */}
      <Image
        src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=2400&q=80"
        alt="Roofing crew working on a residential home with a clear sky"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/55" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,65,12,0.25),transparent_60%)]" aria-hidden />

      <div className="relative container-tight pt-24 pb-section md:pt-32 md:pb-32">
        {/* Asymmetric two-column lockup, copy hugs left, stat block hangs right */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <span className="eyebrow-light">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper-400" />
              Family-owned roofers · Humble · Houston, TX
            </span>

            <h1 className="mt-5 font-display text-display-xl text-balance text-paper">
              Perry &amp; Sons:{" "}
              <span className="scribble text-copper-300">Houston&rsquo;s most-trusted</span>{" "}
              roofer since 2009.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75 text-pretty">
              Your roof leaks at 11pm on a Sunday. We answer. Same-day emergency tarping,
              insurance-claim help start to finish, and a free, no-pressure inspection
              from the family that&rsquo;s been on Houston roofs for {years} years.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Hero CTA — wipe-fill on hover */}
              <a
                href="#book"
                className="hero-cta group relative inline-flex h-16 items-center justify-center gap-3 rounded-full bg-copper-500 px-9 text-base font-semibold text-paper shadow-lift transition-transform active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper-500/40"
              >
                <span>Get a free inspection</span>
                <ArrowRight className="hero-cta__arrow h-5 w-5" />
                <span className="hero-cta__rule" aria-hidden />
              </a>
              <PhoneLink
                withDot
                className="inline-flex h-16 items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-8 text-base font-semibold text-paper transition hover:bg-paper/10 hover:scale-[1.02]"
              >
                <Phone className="h-5 w-5" />
                <span>
                  Call <span className="font-display tracking-tight">
                    {process.env.NEXT_PUBLIC_DEFAULT_PHONE_DISPLAY ?? "(936) 233-9333"}
                  </span>
                </span>
              </PhoneLink>
            </div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-paper/10 pt-8"
            >
              {[
                { Icon: ShieldCheck, label: "BBB", value: "A+ Rated" },
                { Icon: Star, label: "Google", value: "4.9 ★ · 214 reviews" },
                { Icon: Calendar, label: "Family-run", value: `${years} years strong` },
                { Icon: Hammer, label: "Houston roofs done", value: "3,400+" }
              ].map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 text-copper-300" aria-hidden />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/55">
                      {label}
                    </div>
                    <div className="font-display text-base text-paper">{value}</div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right rail: oversized response-time card, hangs lower than the headline */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-4 lg:mt-32 flex-col items-start"
          >
            <div className="relative w-full rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md border border-paper/15 bg-paper/[0.04] p-6 backdrop-blur">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-300">
                Median response time
              </div>
              <div className="mt-2 font-display text-[5.5rem] leading-[0.85] tracking-tight text-paper">
                2:47
              </div>
              <div className="mt-1 font-display text-sm text-paper/65">
                hours from your call to a tarp on the deck.<br />
                <span className="text-paper/45">Across 412 storm calls in 2024.</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
