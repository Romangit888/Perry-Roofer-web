"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "./ui/accordion";

const faqs = [
  {
    q: "How long does a roof replacement take?",
    a: "Most asphalt shingle replacements on a typical Houston-area home wrap in one to two days. Larger or steeper roofs (and metal installs) can run three to four. Our 6-person crews are full-time employees — not subs — so we don't disappear in the middle of the job."
  },
  {
    q: "Do you handle insurance claims?",
    a: "Yes — start to finish. We meet your adjuster on the roof, document every line item, file the supplements when they lowball, and only collect when your claim is approved. About 94% of the claims we file get approved on the first submission."
  },
  {
    q: "Will Class-4 impact-rated shingles actually lower my insurance?",
    a: "In Texas — yes, on most carriers. State Farm, Allstate, USAA, Farmers, and most regional carriers offer a wind/hail premium discount of around 8–28% for UL 2218 Class-4 shingles. We provide the manufacturer cert your insurer needs. The shingles cost about $400–$900 more on a typical 25-square roof and most homeowners break even inside 3 years."
  },
  {
    q: "Do I need hurricane straps or decking upgraded to current code?",
    a: "Depends on your roof's age. Houston-area homes built before ~2003 often have ⅜″ OSB decking and stapled (not strapped) trusses. When we replace, we upgrade decking to ½″ plywood and verify hurricane-strap connections at every truss-to-plate point — that's our standard scope, not an upcharge. It's also what your adjuster will look for."
  },
  {
    q: "What's the timeline on a Texas insurance claim?",
    a: "Texas Insurance Code §542 gives the carrier 15 days to acknowledge your claim, 15 business days to accept or reject after they have all docs, and 5 days to pay once approved. We track every deadline. If they miss one, you may be owed 18% interest plus attorney's fees on the underpayment — and we'll point you to a public adjuster who knows how to push."
  },
  {
    q: "What if it rains during the job?",
    a: "We watch the radar like it's our job (because it is). If a system is moving in, we don't tear off — we wait. If we've already torn off and weather surprises us, the deck gets wrapped in synthetic underlayment and tarp before we leave the site. We've never had a customer wake up to water in their living room."
  },
  {
    q: "Do you offer financing?",
    a: "Yes — through Service Finance Company. $0 down, soft credit pull (won't ding your score), 90-second decisions, terms from 5 to 15 years, no prepayment penalty. Many homeowners use financing to spread out their insurance deductible."
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Texas RCAT-certified roofing contractor, $2M general liability, and full workers' comp on every employee on your roof. We'll show you the certificates before we ever step on a ladder. Hiring an unlicensed roofer is the single biggest risk a Houston homeowner can take."
  },
  {
    q: "What does a free inspection actually include?",
    a: "A 45-minute on-roof inspection (we walk it — drones don't catch everything), 40+ photos of every problem area, a written report you can keep, and a plain-English explanation of what you actually need versus what would be nice. No high-pressure pitch. You get the report whether you hire us or not."
  },
  {
    q: "What kinds of warranties do you offer?",
    a: "Manufacturer warranties up to 50 years on materials (GAF Golden Pledge, Owens Corning Platinum), plus our own 10-year workmanship warranty in writing. If our install causes a leak in year 8, we fix it. Period."
  },
  {
    q: "Do you do commercial roofs?",
    a: "Mostly residential — that's our craft. We do small commercial (think churches, daycares, strip retail under 10,000 sqft) but for big industrial projects we'll happily refer you to a couple of Houston shops we trust."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="bg-paper-warm py-section">
      <div className="container-tight grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="eyebrow">
            <span className="rule" />
            Frequently asked
          </span>
          <h2 className="mt-4 font-display text-display-lg text-ink text-balance">
            Real questions Houston homeowners ask us — and our actual answers.
          </h2>
          <p className="mt-5 text-ink/70 leading-relaxed text-pretty max-w-md">
            If yours isn&rsquo;t here, call us and ask. There&rsquo;s no such thing as a dumb
            roofing question — but there&rsquo;s plenty of dumb roofing advice on the internet.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
