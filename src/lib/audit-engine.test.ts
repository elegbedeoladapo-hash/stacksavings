/// <reference types="jest" />
import { runAudit } from "./audit-engine"
import { AuditFormData } from "@/types"

const baseFormData: AuditFormData = {
  tools: [],
  teamSize: 5,
  primaryUseCase: "coding",
}

describe("Audit Engine", () => {
  test("returns zero savings for optimal spend", () => {
    const data: AuditFormData = {
      ...baseFormData,
      tools: [{ tool: "cursor", plan: "Pro", monthlySpend: 20, seats: 1 }],
    }
    const result = runAudit(data)
    expect(result.totalMonthlySavings).toBe(0)
    expect(result.isOptimal).toBe(true)
  })

  test("detects overpayment vs expected price", () => {
    const data: AuditFormData = {
      ...baseFormData,
      tools: [{ tool: "cursor", plan: "Pro", monthlySpend: 100, seats: 1 }],
    }
    const result = runAudit(data)
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
    expect(result.isOptimal).toBe(false)
  })

  test("detects too many seats vs team size", () => {
    const data: AuditFormData = {
      ...baseFormData,
      teamSize: 2,
      tools: [{ tool: "cursor", plan: "Pro", monthlySpend: 100, seats: 5 }],
    }
    const result = runAudit(data)
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
  })

  test("recommends downgrade from Cursor Business to Pro for small teams", () => {
    const data: AuditFormData = {
      ...baseFormData,
      tools: [{ tool: "cursor", plan: "Business", monthlySpend: 80, seats: 2 }],
    }
    const result = runAudit(data)
    const rec = result.recommendations[0]
    expect(rec.recommendedAction).toContain("Downgrade")
    expect(rec.monthlySavings).toBeGreaterThan(0)
  })

  test("recommends Claude Pro over Max for non-research use case", () => {
    const data: AuditFormData = {
      ...baseFormData,
      primaryUseCase: "coding",
      tools: [{ tool: "claude", plan: "Max", monthlySpend: 100, seats: 1 }],
    }
    const result = runAudit(data)
    const rec = result.recommendations[0]
    expect(rec.recommendedAction).toContain("Downgrade")
  })

  test("audit result has correct structure", () => {
    const data: AuditFormData = {
      ...baseFormData,
      tools: [{ tool: "chatgpt", plan: "Plus", monthlySpend: 20, seats: 1 }],
    }
    const result = runAudit(data)
    expect(result).toHaveProperty("id")
    expect(result).toHaveProperty("recommendations")
    expect(result).toHaveProperty("totalMonthlySavings")
    expect(result).toHaveProperty("totalAnnualSavings")
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })

  test("annual savings equals monthly savings times 12", () => {
    const data: AuditFormData = {
      ...baseFormData,
      tools: [{ tool: "cursor", plan: "Pro", monthlySpend: 100, seats: 1 }],
    }
    const result = runAudit(data)
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })
})