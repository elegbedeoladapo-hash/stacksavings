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

  const handleToolChange = (value: ToolName) => {
    const firstPlan = PRICING_DATA[value]?.plans[0]?.name ?? ""
    onChange(index, { ...entry, tool: value, plan: firstPlan })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50 relative">

      {/* Tool Name */}
      <div className="space-y-1">
        <Label className="text-slate-300">Tool</Label>
        <Select value={entry.tool} onValueChange={handleToolChange}>
          <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="Select tool" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {TOOL_OPTIONS.map((t) => (
              <SelectItem key={t.value} value={t.value} className="text-white hover:bg-slate-700">
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plan */}
      <div className="space-y-1">
        <Label className="text-slate-300">Plan</Label>
        <Select
          value={entry.plan}
          onValueChange={(val) => onChange(index, { ...entry, plan: val })}
        >
          <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="Select plan" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {plans.map((p) => (
              <SelectItem key={p.name} value={p.name} className="text-white hover:bg-slate-700">
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Monthly Spend */}
      <div className="space-y-1">
        <Label className="text-slate-300">Monthly Spend ($)</Label>
        <Input
          type="text"
          inputMode="numeric"
          value={entry.monthlySpend === 0 ? "" : String(entry.monthlySpend)}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "")
            onChange(index, {
              ...entry,
              monthlySpend: Number(val) || 0,
            })
          }}
          onFocus={(e) => e.target.select()}
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
          placeholder="0"
        />
      </div>

      {/* Seats */}
      <div className="space-y-1">
        <Label className="text-slate-300">Seats</Label>
        <Input
          type="text"
          inputMode="numeric"
          value={entry.seats === 1 ? "" : String(entry.seats)}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "")
            onChange(index, {
              ...entry,
              seats: Number(val) || 1,
            })
          }}
          onFocus={(e) => e.target.select()}
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
          placeholder="1"
        />
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 text-slate-500 hover:text-red-400"
        aria-label="Remove tool"
      >
        <X size={16} />
      </button>

    </div>
  )
}