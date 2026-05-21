import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { AuditResult } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body: AuditResult = await request.json()

    const { data, error } = await supabase
      .from("audits")
      .insert({
        id: body.id,
        created_at: body.createdAt,
        form_data: body.formData,
        recommendations: body.recommendations,
        total_monthly_savings: body.totalMonthlySavings,
        total_annual_savings: body.totalAnnualSavings,
        is_optimal: body.isOptimal,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, audit: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 })
    }

    return NextResponse.json({ audit: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}