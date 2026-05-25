import { ToolName } from "@/types"

export interface PlanInfo {
  name: string
  monthlyPricePerSeat: number
  annualPricePerSeat?: number
  sourceUrl: string
  verifiedDate: string
}

export interface ToolPricingData {
  displayName: string
  plans: PlanInfo[]
}

export const PRICING_DATA: Record<ToolName, ToolPricingData> = {
  cursor: {
    displayName: "Cursor",
    plans: [
      { name: "Hobby", monthlyPricePerSeat: 0, sourceUrl: "https://cursor.sh/pricing", verifiedDate: "2026-05-25" },
      { name: "Pro", monthlyPricePerSeat: 20, sourceUrl: "https://cursor.sh/pricing", verifiedDate: "2026-05-25" },
      { name: "Business", monthlyPricePerSeat: 40, sourceUrl: "https://cursor.sh/pricing", verifiedDate: "2026-05-25" },
      { name: "Enterprise", monthlyPricePerSeat: 40, sourceUrl: "https://cursor.sh/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  "github-copilot": {
    displayName: "GitHub Copilot",
    plans: [
      { name: "Individual", monthlyPricePerSeat: 10, sourceUrl: "https://github.com/features/copilot#pricing", verifiedDate: "2026-05-25" },
      { name: "Business", monthlyPricePerSeat: 19, sourceUrl: "https://github.com/features/copilot#pricing", verifiedDate: "2026-05-25" },
      { name: "Enterprise", monthlyPricePerSeat: 39, sourceUrl: "https://github.com/features/copilot#pricing", verifiedDate: "2026-05-25" },
    ],
  },
  claude: {
    displayName: "Claude",
    plans: [
      { name: "Free", monthlyPricePerSeat: 0, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Pro", monthlyPricePerSeat: 20, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Max", monthlyPricePerSeat: 100, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Team", monthlyPricePerSeat: 30, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Enterprise", monthlyPricePerSeat: 30, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
      { name: "API direct", monthlyPricePerSeat: 0, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  chatgpt: {
    displayName: "ChatGPT",
    plans: [
      { name: "Free", monthlyPricePerSeat: 0, sourceUrl: "https://openai.com/chatgpt/pricing", verifiedDate: "2026-05-25" },
      { name: "Plus", monthlyPricePerSeat: 20, sourceUrl: "https://openai.com/chatgpt/pricing", verifiedDate: "2026-05-25" },
      { name: "Team", monthlyPricePerSeat: 30, sourceUrl: "https://openai.com/chatgpt/pricing", verifiedDate: "2026-05-25" },
      { name: "Enterprise", monthlyPricePerSeat: 30, sourceUrl: "https://openai.com/chatgpt/pricing", verifiedDate: "2026-05-25" },
      { name: "API direct", monthlyPricePerSeat: 0, sourceUrl: "https://openai.com/api/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  "anthropic-api": {
    displayName: "Anthropic API",
    plans: [
      { name: "Pay as you go", monthlyPricePerSeat: 0, sourceUrl: "https://www.anthropic.com/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  "openai-api": {
    displayName: "OpenAI API",
    plans: [
      { name: "Pay as you go", monthlyPricePerSeat: 0, sourceUrl: "https://openai.com/api/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  gemini: {
    displayName: "Gemini",
    plans: [
      { name: "Free", monthlyPricePerSeat: 0, sourceUrl: "https://one.google.com/about/plans", verifiedDate: "2026-05-25" },
      { name: "Pro", monthlyPricePerSeat: 19.99, sourceUrl: "https://one.google.com/about/plans", verifiedDate: "2026-05-25" },
      { name: "Ultra", monthlyPricePerSeat: 29.99, sourceUrl: "https://one.google.com/about/plans", verifiedDate: "2026-05-25" },
      { name: "API", monthlyPricePerSeat: 0, sourceUrl: "https://ai.google.dev/pricing", verifiedDate: "2026-05-25" },
    ],
  },
  windsurf: {
    displayName: "Windsurf",
    plans: [
      { name: "Free", monthlyPricePerSeat: 0, sourceUrl: "https://windsurf.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Pro", monthlyPricePerSeat: 15, sourceUrl: "https://windsurf.com/pricing", verifiedDate: "2026-05-25" },
      { name: "Teams", monthlyPricePerSeat: 30, sourceUrl: "https://windsurf.com/pricing", verifiedDate: "2026-05-25" },
    ],
  },
}