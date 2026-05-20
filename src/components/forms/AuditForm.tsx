"use client"

import { useState, useEffect } from "react"
import { AuditFormData, ToolEntry, ToolName } from "@/types"
import { ToolRow } from "./ToolRow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

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

  // Load from localStorage on mount
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

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const handleToolChange = (index: number, updated: ToolEntry) => {
    const tools = [...formData.tools]
    tools[index] = updated
    setFormData({ ...formData, tools })
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
    if (formData.tools.length === 0) return
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Audit Your AI Spend</CardTitle>
        <CardDescription>
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
        <Button variant="outline" onClick={handleAddTool} className="w-full">
          <Plus size={16} className="mr-2" />
          Add Another Tool
        </Button>

        {/* Team Size */}
        <div className="space-y-1">
          <Label>Team Size</Label>
          <Input
            type="text"
            inputMode="numeric"
            value={formData.teamSize === 1 ? "" : String(formData.teamSize)}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "")
              setFormData({ ...formData, teamSize: Number(val) || 1 })
            }}
            onFocus={(e) => e.target.select()}
            className="max-w-xs"
            placeholder="1"
          />
        </div>

        {/* Primary Use Case */}
        <div className="space-y-1">
          <Label>Primary Use Case</Label>
          <Select
            value={formData.primaryUseCase}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                primaryUseCase: val as AuditFormData["primaryUseCase"],
              })
            }
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="data">Data Analysis</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={formData.tools.length === 0}
        >
          Run My Audit →
        </Button>

      </CardContent>
    </Card>
  )
}