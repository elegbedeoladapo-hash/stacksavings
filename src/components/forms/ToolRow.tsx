import { ToolEntry, ToolName } from "@/types"
import { PRICING_DATA } from "@/lib/pricing-data"

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

const selectStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "8px",
  height: "40px",
  width: "100%",
  padding: "0 12px",
  fontSize: "14px",
  cursor: "pointer",
  outline: "none",
}

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "8px",
  height: "40px",
  width: "100%",
  padding: "0 12px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
}

const labelStyle = {
  color: "#64748b",
  fontSize: "11px",
  fontWeight: 500,
  marginBottom: "6px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  display: "block",
}

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
        aria-label="Remove"
        style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "2px", fontSize: "16px" }}
      >
        ✕
      </button>

      {/* Row 1: Tool and Plan */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Tool</label>
          <select
            value={entry.tool}
            onChange={(e) => handleToolChange(e.target.value as ToolName)}
            style={selectStyle}
          >
            {TOOL_OPTIONS.map(t => (
              <option key={t.value} value={t.value} style={{ background: "#1e293b" }}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Plan</label>
          <select
            value={entry.plan}
            onChange={(e) => onChange(index, { ...entry, plan: e.target.value })}
            style={selectStyle}
          >
            {plans.map(p => (
              <option key={p.name} value={p.name} style={{ background: "#1e293b" }}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Spend and Seats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Spend ($)</label>
          <input
            type="text"
            inputMode="numeric"
            value={entry.monthlySpend === 0 ? "" : String(entry.monthlySpend)}
            onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ""); onChange(index, { ...entry, monthlySpend: Number(val) || 0 }) }}
            onFocus={(e) => e.target.select()}
            placeholder="0"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Seats</label>
          <input
            type="text"
            inputMode="numeric"
            value={entry.seats === 1 ? "" : String(entry.seats)}
            onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ""); onChange(index, { ...entry, seats: Number(val) || 1 }) }}
            onFocus={(e) => e.target.select()}
            placeholder="1"
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )
}