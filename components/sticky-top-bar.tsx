"use client";

import { Phone } from "lucide-react";
import { PhoneLink } from "./phone-link";
import Link from "next/link";

export function StickyTopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-tight flex h-16 items-center justify-between gap-4">
        <Link href="#top" className="flex items-center gap-2 text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-paper font-display text-lg leading-none">
            P
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">Perry &amp; Sons</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink/55">Roofers · Est. 2009</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink/70">
          <a href="#services" className="hover:text-copper-500 transition">Services</a>
          <a href="#process" className="hover:text-copper-500 transition">How it works</a>
          <a href="#area" className="hover:text-copper-500 transition">Service area</a>
          <a href="#reviews" className="hover:text-copper-500 transition">Reviews</a>
          <a href="#faq" className="hover:text-copper-500 transition">FAQ</a>
        </nav>

        <PhoneLink
          withDot
          className="rounded-full bg-ink px-4 py-2.5 text-paper font-semibold text-sm md:text-base hover:bg-ink-700 transition-all hover:scale-[1.03] shadow-card"
        >
          <Phone className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Call now:&nbsp;</span>
          <span className="font-display tracking-tight">
            {process.env.NEXT_PUBLIC_DEFAULT_PHONE_DISPLAY ?? "(936) 233-9333"}
          </span>
        </PhoneLink>
      </div>
    </header>
  );
}
