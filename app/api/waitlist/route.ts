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

    const scriptUrl = process.env.WAITLIST_URL
    if (!scriptUrl) throw new Error("WAITLIST_URL is not configured")

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), role, location }),
    })

    if (!response.ok) {
      throw new Error(`Apps Script responded with ${response.status}`)
    }

    const result = await response.json()
    if (result.status === "error") throw new Error(result.message)

    return NextResponse.json({ success: true, message: "Added to waitlist." }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
