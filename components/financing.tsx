"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, Check } from "lucide-react";
import { Button } from "./ui/button";

const TERM_MONTHS = 120; // 10-year term, common for roof financing
const APR = 0.0899;

function monthly(principal: number) {
  const r = APR / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -TERM_MONTHS));
}

const formatUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Financing() {
  const [amount, setAmount] = useState(18000);
  const m = useMemo(() => monthly(amount), [amount]);

  return (
    <section className="bg-paper py-section">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-ink text-paper p-8 md:p-14 shadow-lift"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden />
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-copper-500/20 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow-light">
                <BadgeDollarSign className="h-4 w-4" />
                $0-down financing
              </span>
              <h2 className="mt-4 font-display text-display-lg text-balance">
                A new roof for less than your phone bill split three ways.
              </h2>
              <p className="mt-5 max-w-md text-paper/75 leading-relaxed text-pretty">
                Financing through Service Finance Company (one of the most homeowner-friendly
                lenders in the country). 90-second soft-pull pre-approval, no money down, and
                rates that don&rsquo;t make you wince.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "$0 down · no prepayment penalty",
                  "Soft credit pull — won't ding your score",
                  "Approval decision in under 90 seconds",
                  "Terms from 60 to 180 months",
                  "Combine with insurance proceeds — pay your deductible over time"
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-paper/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-copper-300" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculator */}
            <div className="rounded-2xl bg-paper text-ink p-7 md:p-8 shadow-lift">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">Monthly payment estimator</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                  {(APR * 100).toFixed(2)}% APR · {TERM_MONTHS / 12} yr
                </span>
              </div>

              <label className="mt-6 block">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-ink/70">Project total</span>
                  <span className="font-display text-2xl font-semibold tracking-tight">
                    {formatUSD(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={45000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  aria-label="Project total"
                  className="mt-3 w-full accent-copper-500"
                />
                <div className="mt-1 flex justify-between text-[11px] text-ink/45">
                  <span>$5k</span>
                  <span>$45k</span>
                </div>
              </label>

              <div className="mt-7 rounded-xl bg-copper-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-copper-600">
                  Estimated monthly
                </div>
                <div className="mt-1 font-display text-5xl font-semibold tracking-tight text-ink">
                  {formatUSD(Math.round(m))}
                  <span className="ml-2 text-base font-medium text-ink/55">/mo</span>
                </div>
                <p className="mt-2 text-xs text-ink/55">
                  For illustration only. Final terms depend on credit and lender approval.
                </p>
              </div>

              <Button asChild className="mt-6 w-full" size="lg">
                <a href="#book">Get pre-qualified — 90 seconds</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
