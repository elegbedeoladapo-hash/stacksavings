"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { AuditFormData, AuditResult } from "@/types"
import { runAudit } from "@/lib/audit-engine"

const AuditForm = dynamic(() => import("@/components/forms/AuditForm").then(m => m.AuditForm), {
  loading: () => <div style={{ height: "400px" }} />,
})

const AuditResults = dynamic(() => import("@/components/audit/AuditResults").then(m => m.AuditResults), {
  loading: () => <div style={{ height: "400px" }} />,
})

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)

  const handleSubmit = async (data: AuditFormData) => {
    const result = runAudit(data)
    setAuditResult(result)
    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      })
    } catch {
      // fail silently
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)" }}>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px", position: "relative", zIndex: 10 }}>
        <div className="space-y-10">

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: "20px" }}>
              Stack<span style={{ color: "#10b981" }}>Savings</span>
            </span>
            <a href="https://credex.rocks" target="_blank" style={{
              fontSize: "12px", padding: "6px 14px", borderRadius: "999px",
              border: "1px solid rgba(16,185,129,0.3)", color: "#34d399",
              background: "rgba(16,185,129,0.05)", textDecoration: "none", fontWeight: 500,
            }}>
              Powered by Credex
            </a>
          </div>

          {!auditResult ? (
            <>
              {/* Hero */}
              <div style={{ textAlign: "center", paddingTop: "32px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
                  color: "#34d399", fontSize: "13px", fontWeight: 500,
                  padding: "6px 16px", borderRadius: "999px", marginBottom: "24px",
                }}>
                  ✦ Free for every startup
                </div>

                <h1 style={{
                  color: "white", fontSize: "clamp(36px, 6vw, 58px)",
                  fontWeight: 900, lineHeight: 1.1, marginBottom: "16px",
                }}>
                  Stop overpaying<br />
                  <span style={{
                    background: "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    for AI tools.
                  </span>
                </h1>

                <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 20px" }}>
                  Enter what your team pays for AI tools. Get an instant audit
                  showing exactly where you are overspending and how to fix it.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "8px" }}>
                  {["No login required", "Instant results", "Free forever"].map(item => (
                    <span key={item} style={{ color: "#475569", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: "#10b981" }}>✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form */}
              <AuditForm onSubmit={handleSubmit} />

              {/* Social proof */}
              <div style={{ textAlign: "center", paddingTop: "8px" }}>
                <p style={{ color: "#1e293b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px", fontWeight: 600 }}>
                  Trusted by engineering teams
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
                  {["Cursor", "GitHub", "Anthropic", "OpenAI", "Google"].map(name => (
                    <span key={name} style={{ color: "white", fontSize: "13px", fontWeight: 600, opacity: 0.2 }}>{name}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <AuditResults result={auditResult} onReset={() => setAuditResult(null)} />
          )}

        </div>
      </div>
    </main>
  )
}