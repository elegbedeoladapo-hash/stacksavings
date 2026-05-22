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

**Hours worked:** 3

**What I did:**
- Fixed CI pipeline — resolved lint errors and missing ts-node dependency
- CI now shows green checkmark on every push
- Moved all required markdown files to repo root
- Deleted accidental file created in repo root
- Verified Vercel deployment is live and working

**What I learned:**
- ESLint rules must be explicitly disabled in config if they cause CI failures
- ts-node must be installed as a dev dependency for Jest TypeScript config
- GitHub Actions CI is strict — warnings are fine but errors fail the build

**Blockers / what I'm stuck on:**
- Waiting for 3 user interview responses
- Need to add screenshots to README.md

**Plan for tomorrow:**
- Fill in USER_INTERVIEWS.md when people respond
- Add screenshots to README.md
- Write Day 5 DEVLOG
- Final polish before submission

## Day 4 — 2026-05-22

**Hours worked:** 5

**What I did:**
- Fixed CI pipeline — resolved lint errors and missing ts-node dependency
- CI now shows green checkmark on every push
- Moved all required markdown files to repo root
- Deleted accidental file created in repo root
- Verified Vercel deployment is live and working
- Fixed audit savings calculation bug — was showing negative savings when seats exceeded team size
- Removed persistent form storage — form now resets cleanly on every page reload
- Updated failing test to match new savings calculation logic — 7 tests passing
- Added screenshots to README.md — landing page, results page, shareable URL

**What I learned:**
- savings calculation must use expected spend (pricePerSeat × seats) not user-entered spend
- localStorage persistence feels helpful but actually confuses users who expect a fresh form
- Always run tests after changing core business logic

**Blockers / what I'm stuck on:**
- Nothing blocking — project is in good shape

**Plan for tomorrow:**
- Write Day 5 DEVLOG entry
- Final review of all markdown files before submission
- Confirm live URL still working