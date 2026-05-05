"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Service = {
  title: string;
  blurb: string;
  /** PLACEHOLDER: replace with on-brand photography */
  image: string;
  imageAlt: string;
  href: string;
  detail: string;
  /** asymmetric grid spans */
  span: string;
  /** mixed border radii so the grid breathes */
  shape: string;
};

const services: Service[] = [
  {
    title: "Roof replacement",
    blurb:
      "GAF and Owens Corning systems with a real warranty — not a brochure. Most replacements wrap in 1–2 days with our 6-person crews. Decking upgraded to ½\" plywood per current Houston code, no upcharge.",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "New asphalt shingle roof installation",
    href: "#book",
    detail: "Asphalt · Metal · TPO",
    span: "md:col-span-7 md:row-span-2",
    shape: "rounded-tl-[2rem] rounded-tr-md rounded-br-[2rem] rounded-bl-md"
  },
  {
    title: "Storm damage repair",
    blurb:
      "Hail, hurricane wind, fallen oaks. We document everything for the adjuster and have a tarp on the deck before the rain comes back.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Storm-damaged roof with missing shingles",
    href: "#book",
    detail: "24/7 emergency response",
    span: "md:col-span-5",
    shape: "rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl"
  },
  {
    title: "Free inspections",
    blurb:
      "45-minute on-roof inspection. 40+ photos. Plain-English report. You keep it whether you hire us or not.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Roofer inspecting shingles up close",
    href: "#book",
    detail: "Same-week scheduling",
    span: "md:col-span-5",
    shape: "rounded-tl-2xl rounded-tr-md rounded-br-2xl rounded-bl-md"
  },
  {
    title: "Gutter installation",
    blurb:
      "Seamless 6-inch K-style fabricated on your driveway. Properly pitched so the water actually leaves your foundation alone.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Seamless aluminum gutters along a roofline",
    href: "#book",
    detail: "Aluminum · Copper · Half-round",
    span: "md:col-span-4",
    shape: "rounded-tl-md rounded-tr-md rounded-br-2xl rounded-bl-2xl"
  },
  {
    title: "Emergency tarping",
    blurb:
      "Active leak? On your roof within hours with heavy-mil tarp and proper cap nails. Stops the damage before it gets into your drywall.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Blue tarp covering damaged residential roof",
    href: "#book",
    detail: "Median: under 3 hours",
    span: "md:col-span-4",
    shape: "rounded-tl-2xl rounded-tr-2xl rounded-br-md rounded-bl-md"
  },
  {
    title: "Annual maintenance",
    blurb:
      "Re-seal flashing, replace cracked boots, blow out the valleys. Adds years to a roof you&rsquo;d otherwise replace early.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Roofer performing annual maintenance",
    href: "#book",
    detail: "From $289/yr",
    span: "md:col-span-4",
    shape: "rounded-tl-md rounded-tr-2xl rounded-br-md rounded-bl-2xl"
  }
];

export function Services() {
  return (
    <section id="services" className="bg-ink text-paper py-section">
      <div className="container-tight">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="eyebrow-light">
              <span className="h-px w-12 bg-copper-300/60 inline-block" />
              What we do
            </span>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              Six things. Done <span className="scribble">right</span>. Done in Houston.
            </h2>
          </div>
          <p className="md:col-span-5 md:pl-8 md:border-l md:border-paper/15 text-paper/65 leading-relaxed">
            We don&rsquo;t paint, we don&rsquo;t do siding, we don&rsquo;t sell solar.
            We do roofs and the things attached to them — and we&rsquo;ve done it for the
            same families for fifteen years.
          </p>
        </div>

        {/* Asymmetric magazine grid: featured card + 5 supporting cards in mixed spans */}
        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-12">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href={s.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden bg-ink-700/40 ring-1 ring-paper/10 transition-shadow hover:shadow-lift ${s.span} ${s.shape}`}
            >
              <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" aria-hidden />
                <div className="absolute top-4 left-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  {s.detail}
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-copper-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/70" dangerouslySetInnerHTML={{ __html: s.blurb }} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
