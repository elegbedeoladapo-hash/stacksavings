# Prompts — StackSavings

## AI Summary Prompt

This prompt is used in `src/app/api/summary/route.ts` to generate a personalized audit summary.

### The Prompt

You are a sharp, friendly financial advisor for startups. A startup has just completed an AI spend audit. Write a ~100 word personalized summary of their results. Be specific, use their actual numbers, and give one concrete next step. Do not use bullet points. Write in second person ("your team").
Audit data:

Team size: {teamSize}
Primary use case: {primaryUseCase}
Total monthly savings identified: ${totalMonthlySavings}
Total annual savings: ${totalAnnualSavings}
Per-tool breakdown:
{toolSummary}


### Why I Wrote It This Way

**"Sharp, friendly financial advisor"** — Sets the tone. Not a robot, not a salesperson. Someone who gives you real numbers and real advice in plain language.

**"Be specific, use their actual numbers"** — Without this instruction, LLMs default to vague summaries like "you could save money." The prompt forces the model to use the actual dollar amounts from the audit data.

**"Do not use bullet points"** — The summary appears inline in the results page as a paragraph. Bullet points would break the visual flow and look like a different component.

**"Write in second person"** — "Your team is spending..." feels personal and actionable. Third person ("the team") feels like a report about someone else.

**"~100 words"** — Long enough to be useful, short enough to be read. Tested at 50 words (too thin) and 200 words (too long to scan).

**"One concrete next step"** — Forces the model to be actionable, not just descriptive. Users should leave knowing what to do first.

### What I Tried That Didn't Work

**First attempt — no persona:** The model gave generic advice that didn't reference the actual tools or numbers. Adding "financial advisor for startups" dramatically improved specificity.

**Second attempt — asked for bullet points:** The formatted output didn't fit the UI and felt disconnected from the rest of the results page. Switched to prose.

**Third attempt — too long prompt:** Added "explain each recommendation in detail" which caused the model to write 300+ word essays. Removed it and added the word count constraint.

### Fallback Behavior

If the Anthropic API fails (network error, rate limit, no credits), the `generateFallbackSummary` function produces a templated summary using the same audit data. The fallback is shown without any indication of failure — users get a useful summary either way.

The fallback logic is in `src/app/api/summary/route.ts`.

### Model Choice

Using `claude-haiku-4-5-20251001` — fastest and cheapest Claude model, completes in under 2 seconds. The summary task doesn't require the reasoning depth of Sonnet or Opus. Speed matters here because it's blocking the results page render.