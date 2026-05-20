// The AI tools we support
export type ToolName =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf"

// A single tool entry the user fills in
export interface ToolEntry {
  tool: ToolName
  plan: string
  monthlySpend: number
  seats: number
}

// The full form data
export interface AuditFormData {
  tools: ToolEntry[]
  teamSize: number
  primaryUseCase: "coding" | "writing" | "data" | "research" | "mixed"
}

// A single recommendation for one tool
export interface ToolRecommendation {
  tool: ToolName
  currentSpend: number
  recommendedAction: string
  alternativeTool?: string
  alternativePlan?: string
  estimatedNewSpend: number
  monthlySavings: number
  annualSavings: number
  reason: string
}

// The full audit result
export interface AuditResult {
  id: string
  createdAt: string
  formData: AuditFormData
  recommendations: ToolRecommendation[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  aiSummary?: string
  isOptimal: boolean
}

// Lead capture
export interface LeadData {
  email: string
  companyName?: string
  role?: string
  teamSize?: number
  auditId: string
}