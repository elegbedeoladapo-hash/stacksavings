"use client"

import { useState } from "react"

interface LeadCaptureProps {
  auditId: string
  totalMonthlySavings: number
  isOptimal: boolean
}

export function LeadCapture({ auditId, totalMonthlySavings, isOptimal }: LeadCaptureProps) {
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [website, setWebsite] = useState("")

  const handleSubmit = async () => {
    if (!email) { setError("Please enter your email address."); return }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, companyName, role, auditId, website }),
      })
      if (!response.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <p style={{ fontSize: "28px", marginBottom: "8px" }}>🎉</p>
        <h3 style={{ color: "white", fontWeight: 600, marginBottom: "6px" }}>You're all set!</h3>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          We've saved your audit report.
          {totalMonthlySavings >= 500 && " Our team will reach out about maximizing your savings with Credex."}
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ color: "white", fontSize: "17px", fontWeight: 600, marginBottom: "6px" }}>
        {isOptimal ? "Get notified when new savings apply" : "Get your full report by email"}
      </h3>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
        {isOptimal
          ? "AI tool pricing changes fast. We'll let you know when something changes for your stack."
          : `Save your $${totalMonthlySavings}/mo savings plan and we'll send you next steps.`}
      </p>

      {/* Honeypot */}
      <input type="text" value={website} onChange={e => setWebsite(e.target.value)}
        style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div style={{ marginBottom: "12px" }}>
        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Work email *</p>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="you@company.com"
          style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Company (optional)</p>
          <input
            type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
            placeholder="Acme Inc"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Role (optional)</p>
          <input
            type="text" value={role} onChange={e => setRole(e.target.value)}
            placeholder="Engineering Manager"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px" }}>{error}</p>
      )}

      <button
        onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "13px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(16,185,129,0.25)", marginBottom: "10px" }}
      >
        {loading ? "Saving..." : "Get my report →"}
      </button>

      <p style={{ color: "#334155", fontSize: "12px", textAlign: "center" }}>No spam. Unsubscribe anytime.</p>
    </div>
  )
}