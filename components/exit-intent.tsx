"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";

const STORAGE_KEY = "perry_exit_intent_seen_v1";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    // Don't arm immediately — give the visitor a chance to actually see the page.
    const armTimer = window.setTimeout(() => { armed = true; }, 8000);

    const trigger = () => {
      if (!armed) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
      cleanup();
    };

    // Desktop: cursor leaves the top of the viewport
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 0) trigger();
    };

    // Mobile fallback: scrolling fast upward (back-button-ish behaviour)
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 80 && y < 200) trigger();
      lastY = y;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) return;
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zip,
          service: "Free roof age check",
          name: "Roof age check (exit intent)",
          phone: "0000000000"
        })
      }).catch(() => null);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
          className="fixed inset-0 z-[80] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-tl-[2rem] rounded-tr-md rounded-br-[2rem] rounded-bl-md bg-paper shadow-lift"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink/60 hover:bg-ink hover:text-paper transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative bg-ink text-paper p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-grid-dark opacity-25" aria-hidden />
              <div
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-copper-500/30 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-300">
                  Wait — one quick thing
                </div>
                <h2 id="exit-intent-title" className="mt-3 font-display text-3xl md:text-4xl text-balance">
                  Get a free <span className="scribble">roof age check</span> before you go.
                </h2>
                <p className="mt-3 max-w-sm text-paper/75 leading-relaxed">
                  Most Houston roofs fail 4–7 years before homeowners realize. Drop your ZIP
                  and we&rsquo;ll show you the typical remaining life on roofs in your area —
                  instant, no spam.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-3"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-500">
                    Roofs in {zip}
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-[4.5rem] leading-[0.85] tracking-tight text-ink">
                      18–22
                    </span>
                    <span className="pb-2 font-display text-lg text-ink/70 leading-snug">
                      year average lifespan<br />
                      <span className="text-ink/50 text-sm">on asphalt shingle in Houston heat &amp; UV.</span>
                    </span>
                  </div>
                  <p className="mt-2 text-ink/70 text-pretty">
                    To know how many years <em>your</em> specific roof has left, we&rsquo;ll need
                    to look at it. Free 45-minute on-roof inspection — no pressure, no upsell.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                    <a
                      href="#book"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-copper-500 px-6 text-sm font-semibold text-paper shadow-card hover:bg-copper-600 hover:scale-[1.02] transition"
                    >
                      Book my free inspection <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_DEFAULT_PHONE ?? "+19362339333"}`}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-sm font-semibold text-ink hover:border-copper-500 hover:text-copper-500 transition"
                    >
                      Or call us now
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit}>
                  <label htmlFor="exit-zip" className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
                    Your ZIP code
                  </label>
                  <div className="mt-3 flex flex-col sm:flex-row gap-3">
                    <input
                      id="exit-zip"
                      inputMode="numeric"
                      pattern="\d{5}"
                      maxLength={5}
                      placeholder="77338"
                      autoFocus
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                      className="h-14 flex-1 rounded-xl border border-ink/15 bg-white px-5 text-lg font-display tracking-tight text-ink placeholder:text-ink/35 focus:border-copper-500 focus:outline-none focus:ring-4 focus:ring-copper-500/20"
                    />
                    <button
                      type="submit"
                      disabled={zip.length !== 5 || submitting}
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-copper-500 px-7 text-base font-semibold text-paper shadow-lift transition hover:bg-copper-600 hover:scale-[1.02] active:translate-y-px disabled:opacity-40"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending
                        </>
                      ) : (
                        <>
                          Get my report <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-ink/50">
                    Instant result. We don&rsquo;t share your ZIP. No follow-up calls.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
