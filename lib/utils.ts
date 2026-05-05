import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Perry & Sons Roofers",
  shortName: "Perry & Sons",
  city: "Humble",
  state: "TX",
  hq: "7156 FM 1960, Humble, TX 77346",
  yearsFounded: 2009,
  licenseNumber: "TX RCAT #25318",
  email: "office@perryroofers.com",
  hours: [
    { day: "Mon–Fri", time: "7:00 AM – 7:00 PM" },
    { day: "Saturday", time: "8:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Emergency calls only" }
  ],
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    google: "https://g.page/"
  },
  phoneFallbackDisplay: "(936) 233-9333",
  phoneFallbackTel: "+19362339333"
} as const;

export const yearsInBusiness = () => new Date().getFullYear() - SITE.yearsFounded;
