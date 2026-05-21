import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { AuditResult } from "@/types"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

function generateFallbackSummary(audit: AuditResult): string {
  if (audit.isOptimal) {
    return `Your AI stack looks well-optimized. With ${audit.formData.tools.length} tool(s) configured for ${audit.formData.primaryUseCase} work, you're not leaving significant money on the table. Keep an eye on pricing changes as vendors frequently update their plans — what's optimal today may not be in 6 months.`
  }

  const topSaving = audit.recommendations
    .filter(r => r.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]

  return `Your team is spending $${audit.recommendations.reduce((s, r) => s + r.currentSpend, 0)}/month across ${audit.formData.tools.length} AI tool(s). The biggest opportunity is ${topSaving?.tool} — ${topSaving?.recommendedAction}. In total, you could save $${audit.totalMonthlySavings}/month ($${audit.totalAnnualSavings}/year) by making these changes. For teams with savings this size, Credex credits can capture even more value on top.`
}

export async function POST(request: NextRequest) {
  try {
    const audit: AuditResult = await request.json()

    const toolSummary = audit.recommendations
      .map(r => `${r.tool}: $${r.currentSpend}/mo → ${r.recommendedAction} (save $${r.monthlySavings}/mo)`)
      .join("\n")

    const prompt = `You are a sharp, friendly financial advisor for startups. A startup has just completed an AI spend audit. Write a ~100 word personalized summary of their results. Be specific, use their actual numbers, and give one concrete next step. Do not use bullet points. Write in second person ("your team").

Audit data:
- Team size: ${audit.formData.teamSize}
- Primary use case: ${audit.formData.primaryUseCase}
- Total monthly savings identified: $${audit.totalMonthlySavings}
- Total annual savings: $${audit.totalAnnualSavings}
- Per-tool breakdown:
${toolSummary}

Write the summary now:`

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    })

    const summary = message.content[0].type === "text"
      ? message.content[0].text
      : generateFallbackSummary(audit)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Anthropic API error:", error)
    // Graceful fallback — never fail the user
    const audit: AuditResult = await request.json().catch(() => null)
    return NextResponse.json({
      summary: audit ? generateFallbackSummary(audit) : "Your audit is complete. Review the per-tool breakdown above for specific savings recommendations.",
      fallback: true,
    })
  }
}