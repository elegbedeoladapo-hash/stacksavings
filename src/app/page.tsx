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
                  showing exactly where you're overspending and how to fix it.
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
              <AuditForm onSubmit={(data: AuditFormData) => setAuditResult(runAudit(data))} />

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