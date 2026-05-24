# DEVLOG — StackSavings

## Day 1 — 2026-05-20

**Hours worked**:[2hours]

**What I did:**
- Set up GitHub repository for StackSavings
- Scaffolded Next.js 14 with TypeScript, Tailwind CSS, and App Router
- Installed and configured shadcn/ui component library
- Created project folder structure: components, types, docs
- Wrote initial project plan and understood all assignment requirements

**What I learned:**
- How Next.js App Router differs from the Pages Router
- How shadcn/ui integrates with Tailwind CSS
- The importance of conventional commit messages for professional git history

**Blockers / what I'm stuck on:**
- Need to decide exact data structure for the audit engine
- Need to research current pricing for all 8 required AI tools

**Plan for tomorrow:**
- Build the spend input form with all 8 required tools
- Implement form state persistence using localStorage
- Start PRICING_DATA.md with at least 4 tools researched


## Day 2 — 2026-05-20

**Hours worked:** 4

**What I did:**
- Installed shadcn/ui components (card, select, input, label, badge)
- Built ToolRow component for individual AI tool entries
- Built AuditForm component with localStorage persistence
- Styled landing page with dark gradient theme
- Built the core audit engine with defensible savings logic
- Fixed input field bugs (number clearing on focus)

**What I learned:**
- How React controlled inputs work with number vs string types
- How localStorage persists form state across page reloads
- How to structure business logic in a separate lib file
- The importance of defensible audit reasoning — not just "switch tools"

**Blockers / what I'm stuck on:**
- Need to build the results page to display audit output
- Need to connect form submission to the audit engine

**Plan for tomorrow:**
- Build the audit results page
- Connect form to audit engine
- Start the shareable URL feature

## Day 3 — 2026-05-21

**Hours worked:** 7

**What I did:**
- Fixed .env.local configuration — Supabase was not saving due to missing variable names
- Connected audit engine to Supabase — audits now save on every submission
- Fixed RLS policy on leads table — lead capture now works
- Built shareable URL feature — /audit/[id] loads public audit from Supabase
- Added Open Graph and Twitter card meta tags for link previews
- Integrated Anthropic API for AI-generated audit summaries with graceful fallback
- Polished form and results page UI — dark glassmorphism design
- Fixed mobile layout for tool row inputs
- Deployed to Vercel — live at https://stacksavings.vercel.app
- Set up CI/CD with GitHub Actions — runs lint and tests on every push
- Wrote 7 passing tests for the audit engine
- Wrote all 11 required markdown files

**What I learned:**
- Next.js 15 requires params to be awaited in dynamic route handlers
- Supabase RLS policies must be explicitly set for each operation
- Environment variables must follow KEY=value format exactly
- Graceful API fallbacks are better UX than hard failures

**Blockers / what I'm stuck on:**
- Anthropic API needs credits for real AI summaries — fallback working for now
- User interviews pending — waiting for 3 people to respond

**Plan for tomorrow:**
- Move markdown files to repo root (required by assignment)
- Fill in USER_INTERVIEWS.md when people respond
- Verify live Vercel URL works end-to-end
- Add screenshots to README.md

## Day 4 — 2026-05-22

**Hours worked:** 7

**What I did:**
- Fixed CI pipeline — resolved lint errors and missing ts-node dependency
- CI now shows green checkmark on every push
- Moved all required markdown files to repo root
- Deleted accidental file created in repo root
- Fixed audit savings calculation bug — was showing negative savings when seats exceeded team size
- Restored form state persistence across page reloads using localStorage
- Updated failing test to match new savings calculation logic — 7 tests passing
- Added screenshots to README.md — landing page, results page, shareable URL
- Installed Resend and built transactional email feature
- Users now receive a confirmation email after submitting their email on the results page
- Email includes savings summary, Credex CTA for high-savings cases, and link to full audit report
- Added RESEND_API_KEY to Vercel environment variables and redeployed
- Tested end-to-end on live site — email lands in inbox, not spam

**What I learned:**
- Savings calculation must use expected spend (pricePerSeat × seats) not user-entered spend
- localStorage persistence is required by the assignment spec — always re-read requirements before removing features
- Resend free tier works perfectly for transactional email — no domain required to start
- Always test on the live Vercel URL after adding new environment variables

**Blockers / what I'm stuck on:**
- Nothing blocking — all 6 MVP features are now complete

**Plan for tomorrow:**
- Write Day 5 DEVLOG entry
- Final review of all files before submission
- Confirm live URL still working end to end

## Day 5 — 2026-05-23

**Hours worked:** 3

**What I did:**
- Final review of all 6 MVP features on live site
- Confirmed transactional email working end-to-end on stacksavings.vercel.app
- Confirmed form state persists across page reloads
- Confirmed shareable URL loads correctly from Supabase
- Reviewed all markdown files at repo root for completeness
- Documented honeypot abuse protection in REFLECTION.md

**What I learned:**
- Next.js fullstack development covers both frontend and backend responsibilities
- A honeypot field is the simplest abuse protection — no infrastructure needed, zero friction for real users
- Reading the assignment requirements carefully after building reveals small gaps worth fixing

**Blockers / what I'm stuck on:**
- Nothing blocking — product is complete and live

**Plan for tomorrow:**
- Write Day 6 DEVLOG entry
- Final check of git history to confirm commits on 5+ distinct days
- Prepare GitHub repo URL and live URL for submission on May 27

## Day 6 — 2026-05-24

**Hours worked:** 3

**What I did:**
- Added missing Enterprise plans for Cursor, Claude, ChatGPT to pricing data and form
- Added Gemini Ultra plan to pricing data and form
- Synced USER_INTERVIEWS.md to repo root — real interview content was only in docs folder
- Synced REFLECTION.md and PRICING_DATA.md to docs folder
- Verified all 12 markdown files at repo root have correct content
- Confirmed Lighthouse scores: Performance 90, Accessibility 94, Best Practices 100, SEO 100
- Confirmed 7 tests still passing after pricing data changes
- Confirmed transactional email working on live Vercel URL
- Final review of all 6 MVP features on live site — everything working end to end

**What I learned:**
- Always verify root-level markdown files match docs folder — easy to update one and forget the other
- Enterprise plans matter for completeness even when pricing is "contact sales"
- Lighthouse scores fluctuate by 5-10 points between runs — run multiple times and take the best consistent score

**Blockers / what I'm stuck on:**
- Nothing blocking — product is complete and submission ready

**Plan for tomorrow:**
- Write Day 7 DEVLOG entry
- Final check of GitHub repo and live URL
- Submit Google Form on May 27