import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { LeadData } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Basic honeypot check
    if ((body as any).website) {
      return NextResponse.json({ success: true })
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        email: body.email,
        company_name: body.companyName,
        role: body.role,
        team_size: body.teamSize,
        audit_id: body.auditId,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, lead: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}