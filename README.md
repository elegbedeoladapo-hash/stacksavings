<div align="center">

# StackSavings — Free AI Spend Audit for Startups

**Stop overpaying for AI tools. Get a free audit in 60 seconds.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-stacksavings.vercel.app-black?style=flat&logo=vercel)](https://stacksavings.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat&logo=vercel)

</div>

---

## What it does

StackSavings audits your team's AI tool spending and shows exactly where you're overspending — with specific recommendations and total potential savings. Built as a lead-generation tool for [Credex](https://credex.rocks). Designed for engineering managers and CTOs at seed-to-Series A startups who want to stop overpaying for AI tools.

**No login required. Free to use.**

---

## Features

- 🔍 **AI spend audit** — enter your tools and get instant overspend analysis
- 💡 **Specific recommendations** — know exactly which tools to cut or downgrade
- 💰 **Savings calculator** — see total potential monthly savings in real time
- 🔗 **Shareable audit URL** — send your results to your team or CFO
- 📧 **Email report** — get your audit delivered to your inbox via Resend
- 🧠 **AI-generated summary** — personalised insights via Anthropic API
- 🗄️ **Persistent results** — audit saved to Supabase with row-level security

---

## Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Results Page
![Results Page](docs/screenshots/results.png)

### Shareable Audit URL
![Shareable URL](docs/screenshots/shareable.png)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI Summary | Anthropic API (Claude) |
| Email | Resend |
| Deployment | Vercel |

---

## Quick Start

```bash
git clone https://github.com/elegbedeoladapo-hash/stacksavings.git
cd stacksavings
npm install
cp .env.local.example .env.local  # add your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `ANTHROPIC_API_KEY` | Anthropic API key for AI summaries |
| `RESEND_API_KEY` | Resend API key for transactional email |

---

## Architecture Decisions

**1. Next.js over plain React**
Next.js App Router handles both frontend and API routes in one repo, simplifying deployment. The API routes for audit saving, lead capture, AI summary, and transactional email all live in `src/app/api/`. A plain React app would have required a separate backend server, adding deployment complexity and cost.

**2. Hardcoded rules over AI for the audit engine**
The assignment explicitly notes "knowing when not to use AI is part of the test." A rules-based engine is auditable, predictable, and defensible to a finance person. Every recommendation traces back to a specific pricing comparison a human can verify. AI is used only for the personalised summary where natural language adds value.

**3. Supabase over Firebase**
Free tier Postgres with row-level security, a clean dashboard for viewing leads, and a JavaScript SDK that works seamlessly with Next.js. Supabase gives direct SQL access which makes debugging easier. Firebase's NoSQL model would have made the audit result queries more complex without adding value.

**4. Resend over SES for transactional email**
Resend has a generous free tier, requires no domain verification to start, and has a clean Next.js SDK. SES requires AWS account setup and domain verification which would have taken hours. For a 7-day build, Resend was the right tradeoff — fast to integrate, reliable delivery, lands in inbox not spam.

**5. Native HTML selects over Radix UI/shadcn**
Initially used Radix UI Select components. Replaced with native HTML select elements after Lighthouse mobile performance dropped to 71. The switch improved Performance score from 71 to 90. Radix UI adds significant JavaScript bundle weight that hurts mobile load times. Native selects are accessible by default.

---

## Running Tests

```bash
npm test
```

7 tests covering the audit engine logic. All must pass before merging to main (enforced by CI).

---

## Deploy

Push to GitHub — Vercel auto-deploys on every commit to main.

---

<div align="center">
Built by <a href="https://my-portfolio-y33e.vercel.app">Oladapo Elegbede</a> · 
<a href="mailto:elegbedeoladapo@gmail.com">elegbedeoladapo@gmail.com</a> · 
<a href="https://linkedin.com/in/oladapo-elegbede">LinkedIn</a>
</div>
