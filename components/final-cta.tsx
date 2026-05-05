"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, MapPin, Phone, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Step = 0 | 1 | 2 | 3;

const SERVICES = [
  "Roof replacement",
  "Storm damage repair",
  "Free inspection",
  "Gutter installation",
  "Emergency tarping",
  "Maintenance / tune-up"
];

export function FinalCTA() {
  const [step, setStep] = useState<Step>(0);
  const [zip, setZip] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = ((step + 1) / 4) * 100;

  const advance = () => setStep((s) => Math.min(3, (s + 1) as Step));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip, service, name, phone })
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }
      advance();
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", { service, zip });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="relative bg-ink text-paper py-section overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-20" aria-hidden />
      <div
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-copper-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative container-tight grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:items-center">
        <div>
          <span className="eyebrow-light">
            <span className="h-px w-12 bg-copper-300/60 inline-block" />
            Free inspection
          </span>
          <h2 className="mt-4 font-display text-display-lg text-balance">
            Get your free inspection in under 24 hours.
          </h2>
          <p className="mt-5 max-w-md text-paper/75 leading-relaxed text-pretty">
            Three quick questions. No pushy follow-up calls. We&rsquo;ll text you a
            confirmation and a real time slot — usually next-day, sometimes same-day.
          </p>

          <ul className="mt-8 space-y-3 text-paper/85">
            {[
              "Real human responds within 1 business hour",
              "We text — we don't blow up your phone",
              "Free, no-obligation, no upsell"
            ].map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-copper-500/20 text-copper-300">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Multi-step form */}
        <div className="rounded-3xl bg-paper text-ink p-7 md:p-9 shadow-lift">
          {/* Progress bar */}
          <div className="mb-7">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
              <span>Step {Math.min(step + 1, 3)} of 3</span>
              <span>{step === 3 ? "Done" : `${Math.round(progress)}%`}</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full bg-copper-500"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.form
                key="step-0"
                onSubmit={(e) => { e.preventDefault(); if (zip.length >= 5) advance(); }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <label htmlFor="zip" className="font-display text-2xl font-semibold text-ink">
                  What&rsquo;s your ZIP code?
                </label>
                <p className="mt-2 text-sm text-ink/60">
                  We serve a 30-mile radius of Humble. Quick check that we cover you.
                </p>
                <div className="mt-5 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40" aria-hidden />
                  <Input
                    id="zip"
                    inputMode="numeric"
                    pattern="\d{5}"
                    maxLength={5}
                    placeholder="77338"
                    autoComplete="postal-code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                    className="pl-12"
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" size="lg" className="mt-5 w-full" disabled={zip.length !== 5}>
                  Continue <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.form>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-display text-2xl font-semibold text-ink">
                  What do you need help with?
                </div>
                <p className="mt-2 text-sm text-ink/60">Pick the closest match — we&rsquo;ll dial it in on the call.</p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setService(s); advance(); }}
                      className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all hover:-translate-y-0.5 ${
                        service === s
                          ? "border-copper-500 bg-copper-50 text-ink"
                          : "border-ink/15 bg-white text-ink hover:border-copper-500"
                      }`}
                    >
                      <span>{s}</span>
                      <ArrowRight className="h-4 w-4 text-copper-500 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="mt-5 text-sm font-medium text-ink/55 hover:text-ink"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="step-2"
                onSubmit={submit}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="font-display text-2xl font-semibold text-ink">
                  Last step — how do we reach you?
                </div>
                <p className="mt-2 text-sm text-ink/60">
                  We&rsquo;ll text you a confirmation. We don&rsquo;t share your info — ever.
                </p>
                <div className="mt-5 space-y-3">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40" aria-hidden />
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40" aria-hidden />
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="(832) 555-0123"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12"
                      required
                    />
                  </div>
                </div>

                {error ? (
                  <p className="mt-3 text-sm font-medium text-copper-600">{error}</p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-5 w-full"
                  disabled={submitting || !name || !phone}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Book my free inspection <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="mt-4 text-[11px] leading-relaxed text-ink/50">
                  By submitting you agree to be contacted about your inspection. Standard
                  message and data rates may apply. Reply STOP to opt out at any time.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3 text-sm font-medium text-ink/55 hover:text-ink"
                >
                  ← Back
                </button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-6"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-paper">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                  We&rsquo;ve got you, {name.split(" ")[0] || "neighbor"}.
                </h3>
                <p className="mt-2 text-ink/65">
                  Someone from the family will text you within the hour to confirm a time.
                  Usually within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
