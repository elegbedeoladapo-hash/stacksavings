"use client"

import { useState, useEffect } from "react"
import { AuditFormData, ToolEntry, ToolName } from "@/types"
import { ToolRow } from "./ToolRow"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertCircle, Plus } from "lucide-react"

const STORAGE_KEY = "stacksavings_form_data"

const defaultTool: ToolEntry = {
  tool: "cursor" as ToolName,
  plan: "Pro",
  monthlySpend: 0,
  seats: 1,
}

const defaultFormData: AuditFormData = {
  tools: [{ ...defaultTool }],
  teamSize: 1,
  primaryUseCase: "coding",
}

interface AuditFormProps {
  onSubmit: (data: AuditFormData) => void
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [formData, setFormData] = useState<AuditFormData>(defaultFormData)
  const [error, setError] = useState<string | null>(null)

  // Load saved form data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setFormData(JSON.parse(saved)) } catch {}
    }
  }, [])

  // Save form data on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const handleToolChange = (index: number, updated: ToolEntry) => {
    const tools = [...formData.tools]
    tools[index] = updated
    setFormData({ ...formData, tools })
    setError(null)
  }

  const handleToolRemove = (index: number) => {
    setFormData({ ...formData, tools: formData.tools.filter((_, i) => i !== index) })
  }

  const handleSubmit = () => {
    if (formData.tools.length === 0) { setError("Please add at least one AI tool."); return }
    if (!formData.tools.some(t => t.monthlySpend > 0)) { setError("Please enter your monthly spend for at least one tool."); return }
    setError(null)
    onSubmit(formData)
  }

  return (
    <div style={{
      background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "20px",
      padding: "36px",
      backdropFilter: "blur(20px)",
    }}>
      <h2 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>
        Audit Your AI Spend
      </h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
        Add the tools your team pays for. We'll find where you're overspending.
      </p>

      {/* Tool Rows */}
      <div style={{ marginBottom: "8px" }}>
        {formData.tools.map((entry, index) => (
          <ToolRow key={index} entry={entry} index={index} onChange={handleToolChange} onRemove={handleToolRemove} />
        ))}
      </div>

      {/* Add Tool */}
      <button
        onClick={() => setFormData({ ...formData, tools: [...formData.tools, { ...defaultTool }] })}
        style={{
          width: "100%", padding: "11px", borderRadius: "10px",
          border: "1px dashed rgba(255,255,255,0.15)", background: "transparent",
          color: "#64748b", fontSize: "14px", cursor: "pointer",
          marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        }}
      >
        <Plus size={14} /> Add Another Tool
      </button>

      {/* Team Size + Use Case */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Team Size</p>
          <Input
            type="text" inputMode="numeric"
            value={formData.teamSize === 1 ? "" : String(formData.teamSize)}
            onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ""); setFormData({ ...formData, teamSize: Number(val) || 1 }) }}
            onFocus={(e) => e.target.select()}
            placeholder="1"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}
          />
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Primary Use Case</p>
          <Select value={formData.primaryUseCase} onValueChange={(val) => setFormData({ ...formData, primaryUseCase: val as AuditFormData["primaryUseCase"] })}>
            <SelectTrigger style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", height: "40px" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}>
              <SelectItem value="coding" style={{ color: "white" }}>Coding</SelectItem>
              <SelectItem value="writing" style={{ color: "white" }}>Writing</SelectItem>
              <SelectItem value="data" style={{ color: "white" }}>Data Analysis</SelectItem>
              <SelectItem value="research" style={{ color: "white" }}>Research</SelectItem>
              <SelectItem value="mixed" style={{ color: "white" }}>Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: "14px", marginBottom: "16px" }}>
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%", padding: "14px", borderRadius: "12px", border: "none",
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer",
          boxShadow: "0 4px 24px rgba(16,185,129,0.3)",
          letterSpacing: "0.3px",
        }}
      >
        Run My Audit →
      </button>
    </div>
  )
}