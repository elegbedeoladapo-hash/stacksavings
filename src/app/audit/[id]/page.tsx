import { supabase } from "@/lib/supabase"
import { AuditResult } from "@/types"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const { data } = await supabase
    .from("audits")
    .select("total_monthly_savings, total_annual_savings")
    .eq("id", id)
    .single()

  if (!data) return { title: "Audit Not Found — StackSavings" }

  return {
    title: `Save $${data.total_monthly_savings}/mo on AI tools — StackSavings`,
    description: `This team could save $${data.total_annual_savings}/year on AI tools.`,
    openGraph: {
      title: `Save $${data.total_monthly_savings}/mo on AI tools`,
      description: `Free AI spend audit — $${data.total_annual_savings}/year in potential savings identified.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Save $${data.total_monthly_savings}/mo on AI tools`,
      description: `Free AI spend audit — $${data.total_annual_savings}/year in potential savings identified.`,
    },
  }
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) notFound()

  const result: AuditResult = {
    id: data.id,
    createdAt: data.created_at,
    formData: data.form_data,
    recommendations: data.recommendations,
    totalMonthlySavings: data.total_monthly_savings,
    totalAnnualSavings: data.total_annual_savings,
    isOptimal: data.is_optimal,
  }

  const isOptimal = result.totalMonthlySavings === 0

  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)" }}>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #10b981 0%, transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px", position: "relative", zIndex: 10 }}>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <a href="/" style={{ color: "white", fontWeight: 700, fontSize: "20px", textDecoration: "none" }}>
            Stack<span style={{ color: "#10b981" }}>Savings</span>
          </a>
          <a href="/" style={{
            fontSize: "12px", padding: "6px 14px", borderRadius: "999px",
            border: "1px solid rgba(16,185,129,0.3)", color: "#34d399",
            background: "rgba(16,185,129,0.05)", textDecoration: "none", fontWeight: 500,
          }}>
            Run your own audit →
          </a>
        </div>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
            color: "#34d399", fontSize: "13px", fontWeight: 500,
            padding: "6px 16px", borderRadius: "999px", marginBottom: "20px",
          }}>✦ Shared Audit Report</span>

          {isOptimal ? (
            <h1 style={{ color: "white", fontSize: "48px", fontWeight: 900 }}>
              Spending <span style={{ color: "#10b981" }}>optimally 🎉</span>
            </h1>
          ) : (
            <>
              <p style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                This team could save
              </p>
              <h1 style={{ color: "white", fontSize: "72px", fontWeight: 900, lineHeight: 1, marginBottom: "8px" }}>
                ${result.totalMonthlySavings}
                <span style={{ color: "#10b981", fontSize: "32px" }}>/mo</span>
              </h1>
              <p style={{ color: "#475569", fontSize: "18px" }}>
                That's <span style={{ color: "white", fontWeight: 700 }}>${result.totalAnnualSavings}</span> saved every year
              </p>
            </>
          )}
        </div>

        {/* Per-tool breakdown */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ color: "#334155", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", fontWeight: 500 }}>
            Per-tool breakdown
          </p>
          {result.recommendations.map((rec, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${rec.monthlySavings > 0 ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`,
              borderRadius: "12px", padding: "20px 24px", marginBottom: "10px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ color: "white", fontWeight: 600 }}>{rec.tool}</p>
                <span style={{
                  fontSize: "12px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px",
                  background: rec.monthlySavings > 0 ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                  color: rec.monthlySavings > 0 ? "#f87171" : "#10b981",
                }}>
                  {rec.monthlySavings > 0 ? `Save $${rec.monthlySavings}/mo` : "✓ Optimal"}
                </span>
              </div>
              <p style={{ color: "#e2e8f0", fontSize: "14px", marginBottom: "4px" }}>{rec.recommendedAction}</p>
              <p style={{ color: "#475569", fontSize: "13px" }}>{rec.reason}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "32px", textAlign: "center",
        }}>
          <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
            Get your team's free audit
          </h3>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
            Takes 2 minutes. No login required.
          </p>
          <a href="/" style={{
            display: "inline-block", padding: "14px 32px", borderRadius: "12px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white", fontWeight: 600, fontSize: "15px", textDecoration: "none",
            boxShadow: "0 4px 24px rgba(16,185,129,0.3)",
          }}>
            Run my free audit →
          </a>
        </div>

      </div>
    </main>
  )
}