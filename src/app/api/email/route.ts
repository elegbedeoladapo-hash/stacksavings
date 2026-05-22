import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, totalMonthlySavings, isOptimal, auditId } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const savingsMessage = isOptimal
      ? "Your AI stack looks optimized — no significant savings found right now."
      : `We found $${totalMonthlySavings}/month ($${totalMonthlySavings * 12}/year) in potential savings for your team.`

    await resend.emails.send({
      from: "StackSavings <onboarding@resend.dev>",
      to: email,
      subject: isOptimal
        ? "Your AI Spend Audit — You're spending well!"
        : `Your AI Spend Audit — Save $${totalMonthlySavings}/mo`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #020817; color: white;">
          <h1 style="color: #10b981; font-size: 24px; margin-bottom: 8px;">StackSavings Audit Report</h1>
          <p style="color: #94a3b8; font-size: 16px; margin-bottom: 24px;">Your free AI spend audit is complete.</p>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px;">Results Summary</p>
            <p style="color: #94a3b8; font-size: 15px;">${savingsMessage}</p>
          </div>

          ${!isOptimal ? `
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="color: #34d399; font-size: 14px; font-weight: 600; margin-bottom: 8px;">MAXIMIZE YOUR SAVINGS</p>
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 16px;">Credex sells discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise at substantial discounts.</p>
            <a href="https://credex.rocks" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #10b981, #059669); color: white; font-weight: 600; text-decoration: none; border-radius: 8px;">Book a free Credex consultation →</a>
          </div>
          ` : ""}

          <a href="https://stacksavings.vercel.app/audit/${auditId}" style="display: inline-block; padding: 12px 24px; border: 1px solid rgba(16,185,129,0.3); color: #34d399; text-decoration: none; border-radius: 8px; margin-bottom: 24px;">View your full audit report →</a>

          <p style="color: #334155; font-size: 12px;">You received this because you ran an audit at stacksavings.vercel.app. No spam. <a href="#" style="color: #475569;">Unsubscribe</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}