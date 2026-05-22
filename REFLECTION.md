# Reflection — StackSavings

## 1. The Hardest Bug I Hit This Week

The hardest bug was the Supabase "supabaseUrl is required" error that caused every audit save to fail silently.

The symptom: the app appeared to work perfectly — audits showed results, the UI was fine — but nothing was saving to the database. I only discovered it when I checked the Supabase Table Editor and found zero rows.

**My hypotheses:**
1. The API route had a typo in the Supabase client import
2. The environment variables weren't being loaded
3. The RLS policies were blocking inserts

I started with hypothesis 1 — checked the import path in `src/lib/supabase.ts`. It was correct.

Then hypothesis 3 — checked the RLS policies in Supabase dashboard. They looked correct too.

Finally hypothesis 2 — ran `Get-Content .env.local` in PowerShell and saw the problem immediately. The `.env.local` file had the values but was missing the variable names. It contained just the raw values without `NEXT_PUBLIC_SUPABASE_URL=` prefixes. The file had been created incorrectly when I pasted the values.

**The fix:** Rewrote the `.env.local` file with proper `KEY=value` format, restarted the dev server, and the saves started working immediately.

**What I learned:** Always verify environment variables are loading correctly before debugging application code. A simple `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)` at the top of the route would have caught this in 30 seconds.

## 2. A Decision I Reversed Mid-Week

I initially built the results page as a separate route — when you clicked "Run My Audit", it would navigate to `/results` with the data passed via URL params or sessionStorage.

I reversed this after realizing two problems:

First, the data was too large to pass via URL params, and sessionStorage would lose the data on refresh. The user would land on a broken results page if they refreshed.

Second, and more importantly, this approach conflicted with the shareable URL feature. The shareable URL (`/audit/[id]`) fetches from Supabase — but the immediate results page needed to show before the Supabase save had completed.

**The reversal:** I moved the results display back to the home page using React state (`useState`). The form and results live on the same page, toggled by whether `auditResult` is null. This solved both problems — no refresh issue, no routing complexity, and the shareable URL is a completely separate page that fetches from the database.

The lesson: client-side state is simpler than routing for single-page flows. Reach for routing when the URL needs to be bookmarkable or shareable — not for every page transition.

## 3. What I Would Build in Week 2

**Priority 1 — Transactional email via Resend.** The assignment requires sending a confirmation email when a lead is captured. Right now the email is saved to Supabase but no email is sent. This is a meaningful gap — the follow-up email is where Credex introduces itself to high-savings users.

**Priority 2 — Benchmark mode.** "Your AI spend per developer is $X — companies your size average $Y." This requires collecting enough audit data to build percentile benchmarks, but even mocked benchmarks from industry research would make the audit dramatically more compelling. Users want to know how they compare, not just whether they're overpaying in absolute terms.

**Priority 3 — Embeddable widget.** A `<script>` tag that bloggers or newsletters could drop into their content. "Curious how much you're wasting on AI tools? Find out in 2 minutes:" followed by an embedded mini-form. This would be the highest-leverage distribution channel — it puts the tool inside content that the exact target user is already reading.

**Priority 4 — PDF export.** Engineering managers need to share the audit with their finance team or co-founder. A one-click PDF of the full report (with Credex branding) turns every audit into a sales document.

## 4. How I Used AI Tools

**Tools used:** Claude (primary), GitHub Copilot (secondary)

**What I used Claude for:**
- Generating boilerplate code for components I understood but didn't want to type from scratch (the ToolRow component structure, the API route handlers)
- Debugging error messages — pasting the error and asking "what's causing this?"
- Writing the markdown documentation files
- Explaining Next.js 15 breaking changes (the `params` must be awaited issue)

**What I used Copilot for:**
- Inline autocomplete for TypeScript types and repetitive patterns
- Filling in the pricing data object structure once I'd written the first entry

**What I didn't trust AI with:**
- The audit engine business logic — I wrote every rule myself and verified the math manually. An AI-generated audit engine might produce plausible-sounding but wrong recommendations. The logic needs to be defensible to a finance person, which means I need to understand and own every line.
- The DEVLOG entries — written personally, reflecting what actually happened each day
- The user interviews — real conversations, not generated

**One specific time the AI was wrong:**
Claude suggested using `sessionStorage` to pass the audit data between the form page and results page. I implemented it, tested it, and discovered it broke on page refresh — the data was lost. Claude hadn't considered that the user might refresh the results page. I caught it during manual testing and switched to the same-page state approach instead. The AI gave a technically valid suggestion that failed in a real usage scenario.

## 5. Self-Rating

**Discipline: 7/10**
Started strong on Day 1 and maintained daily commits throughout the week. Lost some time to styling decisions that weren't critical path. Should have moved faster to the markdown files and tests earlier in the week.

**Code quality: 7/10**
TypeScript used throughout, sensible component separation, no hardcoded secrets. The audit engine is clean and readable. Main weakness: some components grew too large and should be split further. Error handling could be more consistent across API routes.

**Design sense: 8/10**
The dark glassmorphism theme looks professional and matches the B2B SaaS aesthetic the target user expects. The results page hierarchy (big number → breakdown → CTA) follows good UX principles. Mobile responsiveness is functional but not perfect.

**Problem-solving: 8/10**
Debugged the Supabase env variable issue systematically. Identified and fixed the Next.js 15 params breaking change quickly. Made the right call to use client-side state instead of routing for the results display.

**Entrepreneurial thinking: 7/10**
I understand the user and the business model clearly. The GTM strategy is specific and realistic. The economics math holds up. Main gap: I didn't get to implement the Resend transactional email, which is a meaningful product gap for the lead nurture flow.