import { AuditResult, ToolRecommendation } from "@/types"
import { PRICING_DATA } from "@/lib/pricing-data"

interface AuditResultsProps {
  result: AuditResult
  onReset: () => void
}

function SavingsBadge({ amount }: { amount: number }) {
  if (amount <= 0) return (
    <span className="text-xs px-2 py-1 rounded-full font-medium"
      style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
      ✓ Optimal
    </span>
  )
  return (
    <span className="text-xs px-2 py-1 rounded-full font-medium"
      style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
      Save ${amount}/mo
    </span>
  )
}

function ToolCard({ rec }: { rec: ToolRecommendation }) {
  const toolData = PRICING_DATA[rec.tool]
  const isOptimal = rec.monthlySavings <= 0

  return (
    <div className="p-5 rounded-xl border space-y-3"
      style={{
        background: isOptimal
          ? "rgba(16,185,129,0.03)"
          : "rgba(239,68,68,0.03)",
        borderColor: isOptimal
          ? "rgba(16,185,129,0.15)"
          : "rgba(239,68,68,0.15)",
      }}>

      {/* Tool header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white text-sm">
            {toolData.displayName}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
            Current: ${rec.currentSpend}/mo
          </p>
        </div>
        <SavingsBadge amount={rec.monthlySavings} />
      </div>

      {/* Recommendation */}
      <div className="space-y-1">
        <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
          {rec.recommendedAction}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
          {rec.reason}
        </p>
      </div>

      {/* Savings numbers */}
      {rec.monthlySavings > 0 && (
        <div className="flex items-center gap-4 pt-1">
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>Monthly savings</p>
            <p className="text-sm font-bold" style={{ color: "#10b981" }}>
              ${rec.monthlySavings}/mo
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>Annual savings</p>
            <p className="text-sm font-bold" style={{ color: "#10b981" }}>
              ${rec.annualSavings}/yr
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "#64748b" }}>New spend</p>
            <p className="text-sm font-bold text-white">
              ${rec.estimatedNewSpend}/mo
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function AuditResults({ result, onReset }: AuditResultsProps) {
  const isHighSavings = result.totalMonthlySavings >= 500
  const isOptimal = result.totalMonthlySavings === 0

  return (
    <div className="space-y-8">

      {/* Hero savings */}
      <div className="text-center space-y-3 py-8">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border"
          style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#34d399" }}>
          ✦ Audit Complete
        </div>

        {isOptimal ? (
          <>
            <h2 className="text-5xl font-black text-white">
              You're spending <span style={{ color: "#10b981" }}>well! 🎉</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Your AI stack looks optimized. We didn't find any significant
              savings opportunities based on your current setup.
            </p>
          </>
        ) : (
          <>
            <p className="text-slate-400 text-sm uppercase tracking-widest">
              Your team could save
            </p>
            <h2 className="text-7xl font-black text-white">
              ${result.totalMonthlySavings}
              <span className="text-3xl" style={{ color: "#10b981" }}>/mo</span>
            </h2>
            <p className="text-xl" style={{ color: "#475569" }}>
              That's <span className="text-white font-bold">${result.totalAnnualSavings}</span> saved every year
            </p>
          </>
        )}
      </div>

      {/* Per tool breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-widest font-medium" style={{ color: "#475569" }}>
          Per-tool breakdown
        </h3>
        {result.recommendations.map((rec, i) => (
          <ToolCard key={i} rec={rec} />
        ))}
      </div>

      {/* Credex CTA for high savings */}
      {isHighSavings && (
        <div className="p-6 rounded-xl border text-center space-y-4"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1))",
            borderColor: "rgba(16,185,129,0.3)"
          }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: "#34d399" }}>
            Maximize your savings
          </p>
          <h3 className="text-2xl font-bold text-white">
            Save even more with Credex
          </h3>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#94a3b8" }}>
            Credex sells discounted AI infrastructure credits — Cursor, Claude,
            ChatGPT Enterprise, and others at substantial discounts.
          </p>
          <a href="https://credex.rocks" target="_blank"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #10b981, #0d9488)" }}>
            Book a free Credex consultation →
          </a>
        </div>
      )}

      {/* Low savings CTA */}
      {isOptimal && (
        <div className="p-6 rounded-xl border text-center space-y-3"
          style={{ background: "rgba(16,185,129,0.03)", borderColor: "rgba(16,185,129,0.15)" }}>
          <h3 className="text-lg font-semibold text-white">
            Stay ahead of new optimizations
          </h3>
          <p className="text-sm" style={{ color: "#64748b" }}>
            AI tool pricing changes fast. We'll notify you when new savings
            opportunities apply to your stack.
          </p>
        </div>
      )}

      {/* Reset */}
      <div className="text-center pb-8">
        <button
          onClick={onReset}
          className="text-sm underline underline-offset-4"
          style={{ color: "#475569" }}
        >
          ← Run another audit
        </button>
      </div>

    </div>
  )
}