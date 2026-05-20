import { useState } from "react"
import { ToolEntry, ToolName } from "@/types"
import { PRICING_DATA } from "@/lib/pricing-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface ToolRowProps {
  entry: ToolEntry
  index: number
  onChange: (index: number, updated: ToolEntry) => void
  onRemove: (index: number) => void
}

const TOOL_OPTIONS: { value: ToolName; label: string }[] = [
  { value: "cursor", label: "Cursor" },
  { value: "github-copilot", label: "GitHub Copilot" },
  { value: "claude", label: "Claude" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "anthropic-api", label: "Anthropic API" },
  { value: "openai-api", label: "OpenAI API" },
  { value: "gemini", label: "Gemini" },
  { value: "windsurf", label: "Windsurf" },
]

export function ToolRow({ entry, index, onChange, onRemove }: ToolRowProps) {
  const plans = PRICING_DATA[entry.tool]?.plans ?? []
  const [spendStr, setSpendStr] = useState(String(entry.monthlySpend))
  const [seatsStr, setSeatsStr] = useState(String(entry.seats))

  const handleToolChange = (value: ToolName) => {
    const firstPlan = PRICING_DATA[value]?.plans[0]?.name ?? ""
    onChange(index, { ...entry, tool: value, plan: firstPlan })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card relative">

      {/* Tool Name */}
      <div className="space-y-1">
        <Label>Tool</Label>
        <Select value={entry.tool} onValueChange={handleToolChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select tool" />
          </SelectTrigger>
          <SelectContent>
            {TOOL_OPTIONS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan */}
      <div className="space-y-1">
        <Label>Plan</Label>
        <Select
          value={entry.plan}
          onValueChange={(val) => onChange(index, { ...entry, plan: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select plan" />
          </SelectTrigger>
          <SelectContent>
            {plans.map((p) => (
              <SelectItem key={p.name} value={p.name}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Monthly Spend */}
      <div className="space-y-1">
        <Label>Monthly Spend ($)</Label>
        <Input
          type="text"
          inputMode="numeric"
          value={spendStr}
          onFocus={() => setSpendStr("")}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "")
            setSpendStr(val)
            onChange(index, {
              ...entry,
              monthlySpend: Number(val) || 0,
            })
          }}
          onBlur={() => {
            if (spendStr === "") setSpendStr("0")
          }}
          placeholder="0"
        />
      </div>

      {/* Seats */}
      <div className="space-y-1">
        <Label>Seats</Label>
        <Input
          type="text"
          inputMode="numeric"
          value={seatsStr}
          onFocus={() => setSeatsStr("")}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "")
            setSeatsStr(val)
            onChange(index, {
              ...entry,
              seats: Number(val) || 1,
            })
          }}
          onBlur={() => {
            if (seatsStr === "") setSeatsStr("1")
          }}
          placeholder="1"
        />
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
        aria-label="Remove tool"
      >
        <X size={16} />
      </button>

    </div>
  )
}