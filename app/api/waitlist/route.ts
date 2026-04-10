import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, role, location } = body

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Log for now — no DB connected
    console.log("[Famva Waitlist]", { name, email, role, location, submittedAt: new Date().toISOString() })

    return NextResponse.json({ success: true, message: "Added to waitlist." }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
