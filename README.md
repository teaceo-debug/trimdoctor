# TrimDoctor — GLP-1 Telehealth Platform

> **Doctor-guided weight loss, delivered.**
> Founded by Michael Gonzalez (FitTea, $100M+ exit)
> trimdoctor.com

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your API keys to .env.local
npm run dev
# → http://localhost:3000
```

## 15 Production Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero, pricing, FAQ, CTA) |
| `/assessment` | 5-step patient intake with BMI calculator |
| `/checkout` | Stripe payment flow |
| `/portal` | Patient dashboard (weight chart, metrics) |
| `/portal/messages` | Provider messaging |
| `/portal/billing` | Subscription + invoice history |
| `/portal/shipments` | Order tracking (5-stage) |
| `/portal/referral` | Give $50 / Get $50 referral program |
| `/admin` | Operations dashboard |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |
| `POST /api/assessment` | Patient intake handler |
| `POST /api/support/chat` | Claude AI chatbot |
| `POST /api/webhooks/stripe` | Stripe payment events |

## Artifacts (14 React Apps)

The `artifacts/` folder contains the design prototypes. Use these as reference:

| Artifact | Build Into |
|----------|-----------|
| `trimdoctor.jsx` | `/` landing + intake |
| `trimdoctor-portal.jsx` | `/portal/*` pages |
| `trimdoctor-admin.jsx` | `/admin` dashboard |
| `trimdoctor-ads.jsx` | `/admin/ads` (AI Ad Studio) |
| `trimdoctor-analytics.jsx` | `/admin/analytics` |
| `trimdoctor-emails.jsx` | `/admin/emails` |
| `trimdoctor-influencers.jsx` | `/admin/influencers` |
| `trimdoctor-supplements.jsx` | `/supplements` storefront |
| `trimdoctor-vip-coaching.jsx` | `/vip` upsell page |
| `trimdoctor-command-hub.jsx` | `/admin` CEO dashboard |
| `trimdoctor-ops-hub.jsx` | `/admin/ops` |
| `trimdoctor-deck-v2.jsx` | Standalone pitch deck |

## Tech Stack

- **Frontend:** Next.js 15 + Tailwind CSS → Vercel
- **Database:** AWS RDS PostgreSQL (HIPAA)
- **Payments:** Stripe (subscriptions)
- **AI:** Anthropic Claude API (chatbot, ads, legal docs)
- **Physicians:** OpenLoop Health
- **Pharmacy:** Belmar Pharmacy (primary), Empower (backup)
- **Email:** Postmark | **SMS:** Twilio
- **Compliance:** Vanta (HIPAA)

## Brand

- **Fonts:** Playfair Display (display) + Figtree (body) + JetBrains Mono (data)
- **Colors:** Forest #1B4332 · Cream #FBF8F3 · Gold #DAA520 · Sage #D8F3DC

## Deploy

```bash
npm run build
npx vercel --prod
# Point trimdoctor.com CNAME → cname.vercel-dns.com
```

## Claude Code

Install the Claude Code VS Code extension, then run `claude` in terminal:

```
"Add the supplement storefront from the artifact"
"Connect Stripe to the checkout flow"
"Set up Prisma with the database schema"
```

© 2026 TrimDoctor, LLC — Proprietary
