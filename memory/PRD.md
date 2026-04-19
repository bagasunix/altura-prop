# Altura Property — Landing Page PRD

## Original Problem Statement
Build a production-ready landing page for **Altura Property** — "The Future of Property is Automated" — targeting Indonesian property agencies (5–30 agents). Luxury dark aesthetic, Indonesian copy, conversion-focused with multi-step lead capture form that proxies to N8N webhook. Original spec called for Next.js 14 App Router + next-pwa; adapted to Emergent default (React CRA + FastAPI + MongoDB) for platform auto-deploy support.

## Stack
- **Frontend**: React 19 (CRA) + Tailwind 3 + shadcn/ui + framer-motion + react-hook-form + zod + lucide-react + sonner + axios
- **Backend**: FastAPI + Motor (MongoDB async) + httpx (for N8N forwarding) + pydantic v2
- **Fonts**: Playfair Display (display/heading) + Manrope (body) + JetBrains Mono (stats)
- **Colors**: bg #0A0A0A, emerald #10B981, teal #0D9488, gold #F5C453

## User Personas
- **P1 — Principal Agency (5–30 agents)**: decision maker, needs ROI proof, budget-conscious, mobile-first
- **P2 — Solo agent evaluator**: browsing pricing & features, will refer to principal

## Core Requirements (static)
1. Indonesian-language copy (casual-profesional)
2. Luxury dark theme — bg #0A0A0A, serif bold heading, emerald + gold accents
3. All required sections: Navbar · Hero · SocialProof · PainPoints · HowItWorks · Features · Gallery · Pricing · Testimonials · FAQ · LeadForm · StickyMobileCTA · Footer
4. Multi-step lead form with validation → POST /api/leads → proxy to N8N (env vars) → fallback to WhatsApp on error
5. PWA-ready: manifest.json, icon 192/512, viewport meta, OG tags, safe-area padding
6. Mobile-first, touch targets ≥ 44px, 16px input font (iOS no-zoom)
7. Framer-motion entrance animations, counter animation, shimmer skeleton, spinner on submit
8. data-testid on all interactive elements (kebab-case)

## What's been implemented (2026-04)
- [x] Backend `POST /api/leads` with pydantic Literal validation for property_type & source
- [x] Phone normalization (+62 prefix) + regex validation
- [x] N8N proxy with `K@mbing04` secret header (currently placeholder env — user must fill later)
- [x] Lead persisted to MongoDB `leads` collection regardless of N8N status
- [x] GET `/api/leads/count` helper endpoint
- [x] Full landing page (13 sections) with luxury dark aesthetic
- [x] Multi-step form (3 steps) with progress bar, validation per step, plan passthrough from pricing
- [x] PWA manifest + SVG icons + OG meta tags + Indonesian locale
- [x] Sticky mobile CTA with safe-area-inset
- [x] Gallery lightbox, FAQ accordion, pricing monthly/yearly toggle
- [x] All testids present: navbar, hero-*, social-proof, pain-card-*, step-*, feature-*, gallery-item-*, pricing-card-*, pricing-price-*, pricing-popular-badge, testimonial-*, faq-toggle-*, faq-answer-*, lead-form, form-next/back/submit, input-*, option-*, sticky-mobile-cta, footer

## Testing Results (iter 1, 2026-04)
- Backend: 9/9 tests pass (after adding Literal validators)
- Frontend: all core flows working — form submit end-to-end, pricing toggle, FAQ, gallery lightbox, mobile responsive

## Prioritized Backlog
**P0 (blockers for go-live)**
- User to provide actual `N8N_WEBHOOK_URL` and `N8N_SECRET` in `/app/backend/.env`

**P1 (conversion boosters)**
- A/B test hero headline variants
- Exit-intent modal with discount code
- Lead form abandoned-step recovery via localStorage
- Real customer logos bar (replace "150+ agency" text placeholder)

**P2 (polish / growth)**
- Blog section (SEO content)
- Case study pages per testimonial
- Calculator widget: "berapa lead yang Anda kehilangan per bulan"
- Dashboard screenshots carousel in Features section
- Video demo modal (currently "Lihat Demo" scrolls to how-it-works)
- Analytics integration (GA4, Meta Pixel)

## Env Vars
- `MONGO_URL`, `DB_NAME` (protected)
- `N8N_WEBHOOK_URL` (empty — user to fill)
- `N8N_SECRET` (empty — user to fill, sent as `K@mbing04` header)
- `WHATSAPP_FALLBACK` = `6281234567890`
