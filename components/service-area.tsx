"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Humble", note: "HQ" },
  { name: "Kingwood" },
  { name: "Atascocita" },
  { name: "Spring" },
  { name: "Porter" },
  { name: "New Caney" },
  { name: "Crosby" },
  { name: "Huffman" },
  { name: "The Woodlands" },
  { name: "Lake Houston" },
  { name: "Cypress" },
  { name: "Tomball" }
];

export function ServiceArea() {
  return (
    <section id="area" className="bg-paper py-section">
      <div className="container-tight grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-center">
        {/* Stylized SVG "map" — concentric service zones around HQ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-full overflow-hidden rounded-3xl bg-ink text-paper shadow-lift"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
          {/* Service rings */}
          <svg viewBox="0 0 400 400" className="relative h-full w-full">
            <defs>
              <radialGradient id="zone" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C2410C" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C2410C" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* outer 30mi ring */}
            <circle cx="200" cy="200" r="170" fill="url(#zone)" opacity="0.4" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="#F39E5C" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
            {/* mid 18mi ring */}
            <circle cx="200" cy="200" r="110" fill="url(#zone)" opacity="0.55" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="#F39E5C" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
            {/* core 8mi ring */}
            <circle cx="200" cy="200" r="55" fill="url(#zone)" opacity="0.85" />
            <circle cx="200" cy="200" r="55" fill="none" stroke="#FFE3CC" strokeWidth="1" />
            {/* HQ marker */}
            <g transform="translate(200,200)">
              <circle r="6" fill="#FFE3CC" />
              <circle r="12" fill="none" stroke="#FFE3CC" strokeOpacity="0.4" />
            </g>
            {/* City dots */}
            {[
              [200, 200, "Humble"],
              [148, 168, "Atascocita"],
              [252, 158, "Kingwood"],
              [128, 232, "Spring"],
              [266, 252, "Porter"],
              [304, 188, "New Caney"],
              [98, 200, "Cypress"],
              [228, 110, "The Woodlands"],
              [310, 304, "Crosby"],
              [80, 290, "Tomball"]
            ].map(([x, y, name]) => (
              <g key={name as string} transform={`translate(${x},${y})`}>
                <circle r="3.5" fill="#F7F3EE" />
                <text x="8" y="3" fontSize="9" fill="#F7F3EE" opacity="0.8" fontFamily="ui-sans-serif">
                  {name}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-ink-700/80 px-4 py-3 text-xs backdrop-blur">
            <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-copper-300">
              <MapPin className="h-3.5 w-3.5" />
              HQ · 7156 FM 1960, Humble
            </span>
            <span className="text-paper/65">30-mile service radius</span>
          </div>
        </motion.div>

        <div>
          <span className="eyebrow">
            <span className="rule" />
            Service area
          </span>
          <h2 className="mt-4 font-display text-display-lg text-ink text-balance">
            From Humble to The Woodlands — and just about every roof in between.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70 text-pretty">
            We&rsquo;re based off FM 1960 and we cover everything within 30 miles. If you can
            see a Whataburger from your driveway, odds are we&rsquo;ve worked on a roof on
            your street.
          </p>

          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
            {cities.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500" aria-hidden />
                <span className="font-medium">{c.name}</span>
                {c.note ? (
                  <span className="ml-1 rounded-sm bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper">
                    {c.note}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-ink/55">
            Don&rsquo;t see your town?{" "}
            <a href="#book" className="font-semibold text-copper-500 underline-offset-4 hover:underline">
              Ask us anyway
            </a>{" "}
            — we cover plenty of spots not listed here.
          </p>
        </div>
      </div>
    </section>
  );
}
