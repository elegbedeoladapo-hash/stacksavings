import { ToolEntry, ToolName } from "@/types"
import { PRICING_DATA } from "@/lib/pricing-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "16px",
      position: "relative",
      marginBottom: "10px",
    }}>
      <button
        onClick={() => onRemove(index)}
        style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "2px" }}
        aria-label="Remove"
      >
        <X size={14} />
      </button>

      {/* Row 1: Tool and Plan */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tool</p>
          <Select value={entry.tool} onValueChange={handleToolChange}>
            <SelectTrigger style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}>
              {TOOL_OPTIONS.map(t => (
                <SelectItem key={t.value} value={t.value} style={{ color: "white" }}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Plan</p>
          <Select value={entry.plan} onValueChange={(val) => onChange(index, { ...entry, plan: val })}>
            <SelectTrigger style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}>
              {plans.map(p => (
                <SelectItem key={p.name} value={p.name} style={{ color: "white" }}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: Spend and Seats — equal columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spend ($)</p>
          <Input
            type="text" inputMode="numeric"
            value={entry.monthlySpend === 0 ? "" : String(entry.monthlySpend)}
            onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ""); onChange(index, { ...entry, monthlySpend: Number(val) || 0 }) }}
            onFocus={(e) => e.target.select()}
            placeholder="0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}
          />
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Seats</p>
          <Input
            type="text" inputMode="numeric"
            value={entry.seats === 1 ? "" : String(entry.seats)}
            onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ""); onChange(index, { ...entry, seats: Number(val) || 1 }) }}
            onFocus={(e) => e.target.select()}
            placeholder="1"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  )
}