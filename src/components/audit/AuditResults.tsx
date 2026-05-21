import { AuditResult, ToolRecommendation } from "@/types"
import { PRICING_DATA } from "@/lib/pricing-data"
import { LeadCapture } from "./LeadCapture"

interface AuditResultsProps {
  result: AuditResult
  onReset: () => void
}

function ToolCard({ rec }: { rec: ToolRecommendation }) {
  const toolData = PRICING_DATA[rec.tool]
  const isOptimal = rec.monthlySavings <= 0

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${isOptimal ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
      borderRadius: "12px",
      padding: "20px 24px",
      marginBottom: "10px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div>
          <p style={{ color: "white", fontWeight: 600, fontSize: "15px", marginBottom: "2px" }}>{toolData.displayName}</p>
          <p style={{ color: "#475569", fontSize: "13px" }}>Current: ${rec.currentSpend}/mo</p>
        </div>
        <span style={{
          fontSize: "12px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px",
          background: isOptimal ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
          color: isOptimal ? "#10b981" : "#f87171",
          whiteSpace: "nowrap",
        }}>
          {isOptimal ? "✓ Optimal" : `Save $${rec.monthlySavings}/mo`}
        </span>
      </div>

      <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{rec.recommendedAction}</p>
      <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.6 }}>{rec.reason}</p>

      {rec.monthlySavings > 0 && (
        <div style={{ display: "flex", gap: "24px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { label: "Monthly savings", value: `$${rec.monthlySavings}/mo`, color: "#10b981" },
            { label: "Annual savings", value: `$${rec.annualSavings}/yr`, color: "#10b981" },
            { label: "New spend", value: `$${rec.estimatedNewSpend}/mo`, color: "white" },
          ].map(item => (
            <div key={item.label}>
              <p style={{ color: "#475569", fontSize: "11px", marginBottom: "2px" }}>{item.label}</p>
              <p style={{ color: item.color, fontSize: "14px", fontWeight: 700 }}>{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function AuditResults({ result, onReset }: AuditResultsProps) {
  const isOptimal = result.totalMonthlySavings === 0
  const isHighSavings = result.totalMonthlySavings >= 500

  return (
    <div style={{ paddingBottom: "60px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
          color: "#34d399", fontSize: "13px", fontWeight: 500,
          padding: "6px 14px", borderRadius: "999px", marginBottom: "20px",
        }}>✦ Audit Complete</span>

        {isOptimal ? (
          <>
            <h2 style={{ color: "white", fontSize: "48px", fontWeight: 900, marginBottom: "12px" }}>
              You're spending <span style={{ color: "#10b981" }}>well! 🎉</span>
            </h2>
            <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
              Your AI stack looks optimized. No significant savings found.
            </p>
          </>
        ) : (
          <>
            <p style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Your team could save</p>
            <h2 style={{ color: "white", fontSize: "72px", fontWeight: 900, lineHeight: 1, marginBottom: "8px" }}>
              ${result.totalMonthlySavings}<span style={{ color: "#10b981", fontSize: "32px" }}>/mo</span>
            </h2>
            <p style={{ color: "#475569", fontSize: "18px" }}>
              That's <span style={{ color: "white", fontWeight: 700 }}>${result.totalAnnualSavings}</span> saved every year
            </p>
          </>
        )}
      </div>

      {/* Per-tool breakdown */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#334155", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", fontWeight: 500 }}>
          Per-tool breakdown
        </p>
        {result.recommendations.map((rec, i) => <ToolCard key={i} rec={rec} />)}
      </div>

      {/* Credex CTA for high savings */}
      {isHighSavings && (
        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))",
          border: "1px solid rgba(16,185,129,0.25)", borderRadius: "16px",
          padding: "32px", textAlign: "center", marginBottom: "16px",
        }}>
          <p style={{ color: "#34d399", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Maximize your savings</p>
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>Save even more with Credex</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "400px", margin: "0 auto 20px", lineHeight: 1.6 }}>
            Credex sells discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise at substantial discounts.
          </p>
          <a href="https://credex.rocks" target="_blank" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: "10px",
            background: "linear-gradient(135deg, #10b981, #0d9488)",
            color: "white", fontWeight: 600, fontSize: "14px", textDecoration: "none",
          }}>
            Book a free Credex consultation →
          </a>
        </div>
      )}

      {/* Lead Capture */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "28px", marginBottom: "16px",
      }}>
        <LeadCapture auditId={result.id} totalMonthlySavings={result.totalMonthlySavings} isOptimal={result.isOptimal} />
      </div>

      {/* Reset */}
      <div style={{ textAlign: "center" }}>
        <button onClick={onReset} style={{ background: "none", border: "none", color: "#475569", fontSize: "14px", cursor: "pointer", textDecoration: "underline" }}>
          ← Run another audit
        </button>
      </div>
    </div>
  )
}