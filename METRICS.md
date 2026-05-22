# Metrics — StackSavings

## North Star Metric

**Qualified leads captured per week** — defined as a user who completed an audit AND submitted their email.

### Why This Is the North Star

StackSavings is a lead-generation tool for Credex. The entire purpose is to identify startups with significant AI spend and connect them to Credex credits. A completed audit with email capture means:
1. The user has real AI spend (qualified)
2. They saw value in the audit (engaged)
3. They want follow-up (intent)

"Audits completed" alone isn't enough — someone could run an audit with fake data. "Visitors" is too shallow. "Consultations booked" is too far downstream to optimize daily. Qualified leads is the right level.

DAU would be wrong for this tool — it's not a daily-use product. People audit their AI spend once a quarter at most. A high DAU would actually suggest people don't trust the results and keep re-running.

## 3 Input Metrics That Drive the North Star

**1. Audit completion rate** (visitors → audit submitted)
Target: >20%. If below 15%, the form is too long or the value proposition isn't clear enough on the landing page. This is the top-of-funnel health metric.

**2. Email capture rate** (audit completed → email submitted)
Target: >25%. If below 15%, either the savings numbers aren't compelling enough or the email ask comes at the wrong moment. This measures how much value the audit delivers.

**3. Shareable link share rate** (audit completed → link copied and shared)
Target: >10%. This is the viral coefficient. Every shared link is a free acquisition channel. If this is low, the results page isn't compelling enough to share — or the savings are too small to brag about.

## What to Instrument First

In priority order:

1. **Audit form submission** — `track('audit_submitted', { tool_count, total_spend, primary_use_case })`
2. **Email capture** — `track('lead_captured', { audit_id, total_monthly_savings })`
3. **Shareable link copied** — `track('share_link_copied', { audit_id, total_monthly_savings })`
4. **Shareable link visited** — `track('shared_audit_viewed', { audit_id, referrer })`
5. **Credex CTA clicked** — `track('credex_cta_clicked', { audit_id, total_monthly_savings })`

Tool: PostHog (free tier, self-hostable, works with Next.js in one line).

## Pivot Trigger

**If audit completion rate drops below 10% for 2 consecutive weeks**, something is broken — either the traffic quality is wrong (wrong audience) or the form UX is too friction-heavy.

**If email capture rate drops below 10%**, the audit results aren't showing enough value. Either the savings recommendations are too conservative or too generic. The fix is improving the audit engine logic, not the email copy.

**If zero Credex consultations are booked after 500 audits**, the connection between "you're overspending" and "Credex can help" isn't landing. The CTA placement or copy needs rethinking.

The pivot decision: if after 1,000 audits and 4 weeks of iteration the qualified lead rate is below 2%, reconsider whether the free audit model is the right lead-gen mechanic for Credex — or whether a different entry point (e.g. a benchmark report, a Slack bot) would convert better.