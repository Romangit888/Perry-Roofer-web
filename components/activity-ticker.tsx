"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X } from "lucide-react";

type Event = { area: string; what: string; mins: number };

const EVENTS: Event[] = [
  { area: "Kingwood",     what: "Free inspection booked",     mins: 4 },
  { area: "Atascocita",   what: "Insurance claim approved",    mins: 11 },
  { area: "Spring",       what: "Emergency tarp dispatched",   mins: 17 },
  { area: "Humble",       what: "Roof age check requested",    mins: 23 },
  { area: "The Woodlands", what: "Inspection report delivered", mins: 31 },
  { area: "Porter",       what: "Free estimate sent",          mins: 38 },
  { area: "Crosby",       what: "Roof replacement quoted",     mins: 46 },
  { area: "New Caney",    what: "Gutter install scheduled",    mins: 53 }
];

export function ActivityTicker() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setVisible(true), 4500);
    return () => window.clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % EVENTS.length), 5500);
    return () => window.clearInterval(t);
  }, [visible, dismissed]);

  const e = EVENTS[i];

  return (
    <div
      aria-live="polite"
      aria-hidden={!visible || dismissed}
      className={`fixed z-40 left-3 sm:left-5 bottom-3 sm:bottom-5 max-w-[calc(100vw-5rem)] sm:max-w-[22rem] transition-all duration-500 ${
        visible && !dismissed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-start gap-3 rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl bg-ink text-paper p-3.5 pr-9 shadow-lift ring-1 ring-paper/10 backdrop-blur"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success/15 text-success">
            <Activity className="h-4 w-4" />
            <span className="absolute left-[1.6rem] top-[0.85rem] h-2 w-2 rounded-full bg-success animate-pulseDot" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[0.92rem] font-medium text-paper truncate">
              {e.what} · <span className="text-copper-300">{e.area}</span>
            </div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-paper/55">
              {e.mins} min ago · live
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-paper/45 hover:text-paper hover:bg-paper/10 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>

      {/* compact "in the last hour" pill that sits below the toast */}
      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-paper/95 ring-1 ring-ink/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-card">
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulseDot" />
        7 homeowners helped in the last hour
      </div>
    </div>
  );
}
