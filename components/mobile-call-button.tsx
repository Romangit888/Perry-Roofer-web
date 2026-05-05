"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PhoneLink } from "./phone-link";

export function MobileCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-50 md:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <PhoneLink
        withDot
        className="inline-flex items-center gap-3 rounded-full bg-copper-500 pl-4 pr-5 py-3.5 text-paper font-semibold shadow-lift active:scale-95 transition"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/15">
          <Phone className="h-4 w-4" />
        </span>
        <span className="font-display tracking-tight">Call now</span>
      </PhoneLink>
    </div>
  );
}
