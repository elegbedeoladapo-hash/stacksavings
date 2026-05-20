import { AuditFormData, AuditResult, ToolRecommendation, ToolName } from "@/types"
import { PRICING_DATA } from "./pricing-data"

// Generate a unique ID for each audit
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Core audit logic for each tool
function auditTool(
  tool: ToolName,
  plan: string,
  monthlySpend: number,
  seats: number,
  teamSize: number,
  useCase: AuditFormData["primaryUseCase"]
): ToolRecommendation {
  const toolData = PRICING_DATA[tool]
  const currentPlan = toolData.plans.find((p) => p.name === plan)
  const pricePerSeat = currentPlan?.monthlyPricePerSeat ?? 0
  const expectedSpend = pricePerSeat * seats

  let recommendedAction = "No changes needed"
  let alternativeTool: string | undefined
  let alternativePlan: string | undefined
  let estimatedNewSpend = monthlySpend
  let reason = "Your current plan looks appropriate for your usage."

  // Rule 1: Overpaying vs expected price
  if (monthlySpend > expectedSpend * 1.1 && expectedSpend > 0) {
    recommendedAction = `You're paying $${monthlySpend}/mo but the ${plan} plan should cost $${expectedSpend}/mo. Check your billing.`
    estimatedNewSpend = expectedSpend
    reason = `The ${plan} plan for ${seats} seat(s) should cost $${expectedSpend}/mo — you may have extra seats or add-ons.`
  }

  // Rule 2: Too many seats vs team size
  if (seats > teamSize && teamSize > 0) {
    const rightSizeSpend = pricePerSeat * teamSize
    recommendedAction = `Reduce from ${seats} seats to ${teamSize} seats`
    estimatedNewSpend = rightSizeSpend
    reason = `You're paying for ${seats} seats but your team is only ${teamSize} people. Reducing saves $${monthlySpend - rightSizeSpend}/mo.`
  }

  // Rule 3: Tool-specific recommendations
  if (tool === "cursor" && plan === "Business" && seats <= 2) {
    const proPlan = toolData.plans.find((p) => p.name === "Pro")
    if (proPlan) {
      alternativePlan = "Pro"
      estimatedNewSpend = proPlan.monthlyPricePerSeat * seats
      recommendedAction = `Downgrade from Business to Pro`
      reason = `Cursor Business ($40/seat) is designed for larger teams. With ${seats} seat(s), Cursor Pro ($20/seat) gives you the same core features for half the price.`
    }
  }

  if (tool === "chatgpt" && plan === "Team" && seats <= 2 && useCase === "coding") {
    alternativeTool = "cursor"
    alternativePlan = "Pro"
    const cursorPro = PRICING_DATA["cursor"].plans.find((p) => p.name === "Pro")
    if (cursorPro) {
      estimatedNewSpend = cursorPro.monthlyPricePerSeat * seats
      recommendedAction = `Switch to Cursor Pro for coding`
      reason = `For coding use cases, Cursor Pro ($20/seat) is purpose-built for developers and costs less than ChatGPT Team ($30/seat).`
    }
  }

  if (tool === "github-copilot" && plan === "Enterprise" && seats <= 3) {
    const bizPlan = toolData.plans.find((p) => p.name === "Business")
    if (bizPlan) {
      alternativePlan = "Business"
      estimatedNewSpend = bizPlan.monthlyPricePerSeat * seats
      recommendedAction = `Downgrade from Enterprise to Business`
      reason = `GitHub Copilot Enterprise ($39/seat) adds enterprise SSO and audit logs. For teams of ${seats}, Business ($19/seat) covers all core AI coding features.`
    }
  }

  if (tool === "claude" && plan === "Max" && useCase !== "research") {
    const proPlan = toolData.plans.find((p) => p.name === "Pro")
    if (proPlan) {
      alternativePlan = "Pro"
      estimatedNewSpend = proPlan.monthlyPricePerSeat * seats
      recommendedAction = `Downgrade from Max to Pro`
      reason = `Claude Max ($100/seat) is for extremely heavy users. Unless you're hitting Pro limits daily, Claude Pro ($20/seat) handles most professional workloads.`
    }
  }

  if (tool === "gemini" && plan === "Pro" && useCase === "coding") {
    alternativeTool = "cursor"
    alternativePlan = "Pro"
    const cursorPro = PRICING_DATA["cursor"].plans.find((p) => p.name === "Pro")
    if (cursorPro) {
      estimatedNewSpend = cursorPro.monthlyPricePerSeat * seats
      recommendedAction = `Switch to Cursor Pro for coding`
      reason = `Gemini Pro ($20/seat) is a general-purpose AI. For coding specifically, Cursor Pro ($20/seat) offers IDE integration, codebase context, and purpose-built coding features at the same price.`
    }
  }

  const monthlySavings = Math.max(0, monthlySpend - estimatedNewSpend)
  const annualSavings = monthlySavings * 12

  return {
    tool,
    currentSpend: monthlySpend,
    recommendedAction,
    alternativeTool: alternativeTool as ToolName | undefined,
    alternativePlan,
    estimatedNewSpend,
    monthlySavings,
    annualSavings,
    reason,
  }
}

// Main audit function
export function runAudit(formData: AuditFormData): AuditResult {
  const recommendations: ToolRecommendation[] = formData.tools.map((entry) =>
    auditTool(
      entry.tool,
      entry.plan,
      entry.monthlySpend,
      entry.seats,
      formData.teamSize,
      formData.primaryUseCase
    )
  )

  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.monthlySavings,
    0
  )
  const totalAnnualSavings = totalMonthlySavings * 12
  const isOptimal = totalMonthlySavings === 0

  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    formData,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    isOptimal,
  }
}