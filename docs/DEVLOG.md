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

**Hours worked:** 6

**What I did:**
- Fixed .env.local configuration for Supabase connection
- Connected audit engine to Supabase — audits now save on every submission
- Built shareable URL feature — each audit gets a unique public page at /audit/[id]
- Added Open Graph and Twitter card meta tags for link previews
- Integrated Anthropic API for AI-generated audit summaries with graceful fallback
- Built lead capture form — emails now save to Supabase leads table
- Fixed RLS policy on leads table
- Polished form and results page UI — dark glassmorphism design
- Deployed to Vercel — live at https://stacksavings.vercel.app

**What I learned:**
- Next.js 15 requires params to be awaited in dynamic route handlers
- Supabase RLS policies must be explicitly created for each operation type
- Environment variables must be properly formatted (KEY=value) in .env.local
- Graceful API fallbacks are better UX than hard failures

**Blockers / what I'm stuck on:**
- Anthropic API needs credits to generate real summaries — fallback working for now
- Need to write all required markdown files before deadline

**Plan for tomorrow:**
- Set up CI/CD with GitHub Actions
- Write minimum 5 tests for the audit engine
- Start writing required markdown files (README, ARCHITECTURE, PRICING_DATA)
- Message 3 people for user interviews