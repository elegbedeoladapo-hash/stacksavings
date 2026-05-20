"use client"

import { useState } from "react"
import { AuditForm } from "@/components/forms/AuditForm"
import { AuditResults } from "@/components/audit/AuditResults"
import { AuditFormData, AuditResult } from "@/types"
import { runAudit } from "@/lib/audit-engine"

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)

  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #10b981 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 space-y-10">

        {/* Nav */}
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">
            Stack<span style={{ color: "#10b981" }}>Savings</span>
          </span>
          <a href="https://credex.rocks" target="_blank"
            className="text-xs px-3 py-1.5 rounded-full border font-medium"
            style={{ borderColor: "rgba(16,185,129,0.3)", color: "#34d399", background: "rgba(16,185,129,0.05)" }}>
            Powered by Credex
          </a>
        </div>

        {!auditResult ? (
          <>
            {/* Hero */}
            <div className="text-center space-y-6 pt-8">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border"
                style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#34d399" }}>
                ✦ Free for every startup
              </div>

              <h1 className="text-6xl font-black tracking-tight leading-none text-white">
                Stop overpaying<br />
                <span style={{
                  background: "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  for AI tools.
                </span>
              </h1>

              <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
                Enter what your team pays for AI tools. Get an instant audit
                showing exactly where you're overspending and how to fix it.
              </p>

              <div className="flex items-center justify-center gap-8 text-sm" style={{ color: "#475569" }}>
                {["No login required", "Instant results", "Free forever"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span style={{ color: "#10b981" }}>✓</span> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Form */}
            <AuditForm onSubmit={(data: AuditFormData) => {
              setAuditResult(runAudit(data))
            }} />

            {/* Social proof */}
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-widest" style={{ color: "#334155" }}>
                Trusted by engineering teams
              </p>
              <div className="flex items-center justify-center gap-6 opacity-30">
                {["Cursor", "GitHub", "Anthropic", "OpenAI", "Google"].map((name) => (
                  <span key={name} className="text-white text-sm font-semibold">{name}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <AuditResults
            result={auditResult}
            onReset={() => setAuditResult(null)}
          />
        )}

      </div>
    </main>
  )
}