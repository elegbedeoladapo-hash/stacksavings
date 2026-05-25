# StackSavings — Free AI Spend Audit for Startups

StackSavings is a free web app that audits your team's AI tool spending and shows exactly where you're overspending — with specific recommendations and total potential savings. Built as a lead-generation tool for [Credex](https://credex.rocks). Designed for engineering managers and CTOs at seed-to-Series A startups who want to stop overpaying for AI tools.

**Live URL:** https://stacksavings.vercel.app

---

## Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Results Page
![Results Page](docs/screenshots/results.png)

### Shareable Audit URL
![Shareable URL](docs/screenshots/shareable.png)

---

## Quick Start

```bash
git clone https://github.com/elegbedeoladapo-hash/stacksavings.git
cd stacksavings
npm install
cp .env.local.example .env.local  # add your keys
npm run dev
```

Open http://localhost:3000

## Environment Variables

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
RESEND_API_KEY=your_resend_api_key

## Deploy

Push to GitHub — Vercel auto-deploys on every commit to main.

---

## Decisions

**1. Next.js over plain React**
Next.js App Router handles both frontend and API routes in one repo, simplifying deployment. The API routes for audit saving, lead capture, AI summary, and transactional email all live in `src/app/api/`. A plain React app would have required a separate backend server, adding deployment complexity and cost.

**2. Hardcoded rules over AI for the audit engine**
The assignment explicitly notes "knowing when not to use AI is part of the test." A rules-based engine is auditable, predictable, and defensible to a finance person. Every recommendation traces back to a specific pricing comparison a human can verify. AI is used only for the personalized summary where natural language adds value.

**3. Supabase over Firebase**
Free tier Postgres with row-level security, a clean dashboard for viewing leads, and a JavaScript SDK that works seamlessly with Next.js. Supabase gives direct SQL access which makes debugging easier. Firebase's NoSQL model would have made the audit result queries more complex without adding value.

**4. Resend over SES for transactional email**
Resend has a generous free tier, requires no domain verification to start, and has a clean Next.js SDK. SES requires AWS account setup and domain verification which would have taken hours. For a 7-day build, Resend was the right tradeoff — fast to integrate, reliable delivery, lands in inbox not spam.

**5. Native HTML selects over Radix UI/shadcn Select**
Initially used Radix UI Select components for the form dropdowns. Replaced with native HTML select elements after Lighthouse mobile performance dropped to 71. The switch improved Performance score from 71 to 90. Radix UI adds significant JavaScript bundle weight that hurts mobile load times. Native selects are accessible by default and work perfectly for this use case.

---

## Running Tests

```bash
npm test
```

7 tests covering the audit engine logic. All must pass before merging to main (enforced by CI).