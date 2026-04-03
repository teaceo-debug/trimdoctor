# CLAUDE.md — Project Context for Claude Code

## What This Is
TrimDoctor is a GLP-1 telehealth platform (trimdoctor.com) founded by Michael Gonzalez, who previously built FitTea to $100M+ in e-commerce sales.

## Architecture
- **Framework:** Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Payments:** Stripe (subscriptions $149-399/mo + $1,799/mo VIP)
- **AI:** Anthropic Claude API (chatbot, ad gen, legal docs)
- **Medical:** OpenLoop Health (physicians), Belmar Pharmacy (compounding)

## Brand
- Fonts: Playfair Display (headlines), Figtree (body), JetBrains Mono (data)
- Colors: Forest #1B4332, cream #FBF8F3, gold #DAA520, sage #D8F3DC
- Aesthetic: "Clinical warmth" — luxury medical meets modern DTC

## Key Files
- `src/app/page.tsx` — Landing page
- `src/app/assessment/page.tsx` — 5-step patient intake
- `src/app/portal/` — Patient dashboard (5 pages)
- `src/app/admin/page.tsx` — Operations dashboard
- `src/app/api/support/chat/route.ts` — Claude chatbot
- `artifacts/` — 14 React prototypes (reference for production pages)
- `.env.example` — All required environment variables

## Artifacts → Production
The `artifacts/` dir has 14 standalone React apps. Reference them when building pages:
- `trimdoctor.jsx` → `/` landing + intake
- `trimdoctor-portal.jsx` → `/portal/*`
- `trimdoctor-admin.jsx` → `/admin`
- `trimdoctor-ads.jsx` → `/admin/ads`
- `trimdoctor-supplements.jsx` → `/supplements`
- `trimdoctor-vip-coaching.jsx` → `/vip`

## Revenue: $179-399/mo medication + $1,799/mo VIP + $19-129/mo supplements
