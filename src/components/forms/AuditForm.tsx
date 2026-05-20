"use client"

import { useState, useEffect } from "react"
import { AuditFormData, ToolEntry, ToolName } from "@/types"
import { ToolRow } from "./ToolRow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, AlertCircle } from "lucide-react"

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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch {
        // ignore corrupted data
      }
    }
  }, [])

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
    const tools = formData.tools.filter((_, i) => i !== index)
    setFormData({ ...formData, tools })
  }

  const handleAddTool = () => {
    setFormData({
      ...formData,
      tools: [...formData.tools, { ...defaultTool }],
    })
  }

  const handleSubmit = () => {
    if (formData.tools.length === 0) {
      setError("Please add at least one AI tool.")
      return
    }
    const hasSpend = formData.tools.some((t) => t.monthlySpend > 0)
    if (!hasSpend) {
      setError("Please enter your monthly spend for at least one tool.")
      return
    }
    setError(null)
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-slate-900/80 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Audit Your AI Spend
        </CardTitle>
        <CardDescription className="text-slate-400">
          Add the AI tools your team pays for. We'll find where you're
          overspending and what to do about it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Tool Rows */}
        <div className="space-y-3">
          {formData.tools.map((entry, index) => (
            <ToolRow
              key={index}
              entry={entry}
              index={index}
              onChange={handleToolChange}
              onRemove={handleToolRemove}
            />
          ))}
        </div>

        {/* Add Tool Button */}
        <Button
          variant="outline"
          onClick={handleAddTool}
          className="w-full border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <Plus size={16} className="mr-2" />
          Add Another Tool
        </Button>

        {/* Team Size */}
        <div className="space-y-1">
          <Label className="text-slate-300">Team Size</Label>
          <Input
            type="text"
            inputMode="numeric"
            value={formData.teamSize === 1 ? "" : String(formData.teamSize)}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "")
              setFormData({ ...formData, teamSize: Number(val) || 1 })
            }}
            onFocus={(e) => e.target.select()}
            className="max-w-xs bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
            placeholder="1"
          />
        </div>

        {/* Primary Use Case */}
        <div className="space-y-1">
          <Label className="text-slate-300">Primary Use Case</Label>
          <Select
            value={formData.primaryUseCase}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                primaryUseCase: val as AuditFormData["primaryUseCase"],
              })
            }
          >
            <SelectTrigger className="max-w-xs bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="coding" className="text-white hover:bg-slate-700">Coding</SelectItem>
              <SelectItem value="writing" className="text-white hover:bg-slate-700">Writing</SelectItem>
              <SelectItem value="data" className="text-white hover:bg-slate-700">Data Analysis</SelectItem>
              <SelectItem value="research" className="text-white hover:bg-slate-700">Research</SelectItem>
              <SelectItem value="mixed" className="text-white hover:bg-slate-700">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border"
            style={{
              background: "rgba(239,68,68,0.08)",
              borderColor: "rgba(239,68,68,0.25)",
              color: "#f87171"
            }}>
            <AlertCircle size={16} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold"
          disabled={formData.tools.length === 0}
        >
          Run My Audit →
        </Button>

      </CardContent>
    </Card>
  )
}