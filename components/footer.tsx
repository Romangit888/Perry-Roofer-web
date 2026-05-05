import { Mail, MapPin, Clock, Facebook, Instagram, Star } from "lucide-react";
import { PhoneLink } from "./phone-link";
import { SITE, yearsInBusiness } from "@/lib/utils";

export function Footer() {
  const years = yearsInBusiness();
  return (
    <footer className="bg-ink-700 text-paper/80">
      <div className="container-tight py-section">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-paper text-ink font-display text-lg leading-none">
                P
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg font-semibold text-paper">Perry &amp; Sons</div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-paper/55">Roofers · Est. 2009</div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
              Family-run residential roofing in Houston for {years} years. We do roofs and the
              things attached to them — and we answer the phone when you call.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE.social.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-paper/10 hover:bg-copper-500 transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SITE.social.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-paper/10 hover:bg-copper-500 transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SITE.social.google} aria-label="Google reviews" className="grid h-9 w-9 place-items-center rounded-full bg-paper/10 hover:bg-copper-500 transition">
                <Star className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-300">
              Get in touch
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <PhoneLink withDot className="text-paper hover:text-copper-300 transition font-display text-lg" />
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-copper-300" />
                <a href={`mailto:${SITE.email}`} className="hover:text-paper transition">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-copper-300" />
                <span>{SITE.hq}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-300">
              Hours
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex items-start justify-between gap-3 max-w-[16rem]">
                  <span className="flex items-center gap-2 text-paper/70">
                    <Clock className="h-3.5 w-3.5 text-copper-300/70" />
                    {h.day}
                  </span>
                  <span className="text-paper">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-paper/55">
              24/7 emergency line during named storms, June 1 – Nov 30.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-copper-300">
              Site
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                ["Services", "#services"],
                ["How it works", "#process"],
                ["Service area", "#area"],
                ["Reviews", "#reviews"],
                ["FAQ", "#faq"],
                ["Free inspection", "#book"]
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-paper transition">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. {SITE.licenseNumber}.
          </span>
          <span className="font-display tracking-tight text-paper/65">
            Built in Houston. For Houston.
          </span>
        </div>
      </div>
    </footer>
  );
}
