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
      className={`fixed bottom-3 right-3 z-50 md:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <PhoneLink
        aria-label="Call Perry & Sons Roofers now"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-copper-500 text-paper shadow-lift active:scale-95 transition"
      >
        <Phone className="h-5 w-5" />
      </PhoneLink>
    </div>
  );
}
