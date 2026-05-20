"use client"

import { useState } from "react"
import { AuditForm } from "@/components/forms/AuditForm"
import { AuditFormData, AuditResult } from "@/types"
import { runAudit } from "@/lib/audit-engine"

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)

  const handleSubmit = (data: AuditFormData) => {
    const result = runAudit(data)
    setAuditResult(result)
    console.log("Audit result:", result)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium">
            🔍 Free AI Spend Audit
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Stack<span className="text-emerald-400">Savings</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Find out exactly where your team is overspending on AI tools —
            and what to do about it. Free, instant, no login required.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span>✓ No login required</span>
            <span>✓ Instant results</span>
            <span>✓ Free forever</span>
          </div>
        </div>

        {/* Show form or results */}
        {!auditResult ? (
          <AuditForm onSubmit={handleSubmit} />
        ) : (
          <div className="text-white text-center space-y-4">
            <h2 className="text-3xl font-bold">
              You could save{" "}
              <span className="text-emerald-400">
                ${auditResult.totalMonthlySavings}/mo
              </span>
            </h2>
            <p className="text-slate-400">
              ${auditResult.totalAnnualSavings}/year in total savings
            </p>
            <button
              onClick={() => setAuditResult(null)}
              className="text-sm text-slate-500 underline"
            >
              ← Run another audit
            </button>
          </div>
        )}

      </div>
    </main>
  )
}