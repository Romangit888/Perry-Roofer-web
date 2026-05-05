# Perry & Sons Roofers — marketing site

Production marketing site for Perry & Sons Roofers (Humble, TX). Built to convert
homeowners into free-inspection bookings.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Lucide · shadcn/ui primitives

---

## Quick start

```bash
pnpm install        # or npm install / yarn
cp .env.example .env.local
pnpm dev            # http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. **Environment Variables** — paste everything from `.env.example` with real values:
   - `NEXT_PUBLIC_SITE_URL` — production URL (e.g. `https://perryroofers.com`)
   - `NEXT_PUBLIC_CALLRAIL_SWAP_TARGET` — CallRail swap target ID for dynamic number insertion
   - `NEXT_PUBLIC_DEFAULT_PHONE` / `_DISPLAY` — fallback phone if CallRail JS fails
   - `LEAD_WEBHOOK_URL` — Zapier/Make/n8n webhook the lead form POSTs to
   - `NEXT_PUBLIC_GA_ID` — GA4 measurement ID
4. **Deploy.** First build takes ~90s.
5. Add the production domain under **Settings → Domains**.

## Swapping the placeholder photos

Every `<Image>` that uses an Unsplash URL is tagged with a `PLACEHOLDER` comment
explaining what should replace it. Search the codebase for `PLACEHOLDER:`.

Recommended shoot list for Mike — er, the Perrys:
- 2 hero options: crew on a Houston-area rooftop, blue sky, mid-tear-off
- 4 service photos: replacement, storm damage, inspection, gutters
- 6 headshot-style photos for testimonials (with permission)
- 1 owner/family portrait for the About strip in the footer

## Lead webhook payload

`POST /api/lead` accepts:

```json
{
  "zip": "77338",
  "service": "Roof replacement",
  "name": "Jane Doe",
  "phone": "(832) 555-0123",
  "email": "optional",
  "notes": "optional"
}
```

It server-side POSTs the same payload + `{ source, userAgent, timestamp }` to
`LEAD_WEBHOOK_URL`. From there route it into your CRM, Slack, SMS — whatever.

## CallRail setup

The phone number on the page is rendered by `<PhoneLink />`. CallRail's swap
script (added in `app/layout.tsx` via `NEXT_PUBLIC_CALLRAIL_SWAP_TARGET`) will
hot-swap the number on page load based on the visitor's traffic source.

If you don't use CallRail yet, leave the env var blank — the fallback number
in `NEXT_PUBLIC_DEFAULT_PHONE` will be used everywhere.

## File map

```
app/
  layout.tsx          # fonts, analytics, CallRail
  page.tsx            # composes all sections
  globals.css         # Tailwind layers + base typography
  sitemap.ts
  api/lead/route.ts   # form -> webhook
components/
  sticky-top-bar.tsx
  hero.tsx
  why-us.tsx
  services.tsx
  service-area.tsx
  process.tsx
  testimonials.tsx
  financing.tsx
  faq.tsx
  final-cta.tsx       # multi-step lead form
  footer.tsx
  mobile-call-button.tsx
  phone-link.tsx
  analytics.tsx
  ui/                 # shadcn primitives (button, accordion, input)
lib/utils.ts
```

## Performance budget

- Hero image is `priority` + AVIF/WebP via `next/image`
- Framer Motion is tree-shaken via `optimizePackageImports`
- Fonts loaded via `next/font` with `display: swap`
- No client JS in sections that don't need it (Hero, Services, Footer are server components where possible)

Targets: Lighthouse Performance 95+, Accessibility 100, SEO 100, Best Practices 100.

## License

Proprietary. Built for Perry & Sons Roofers.
