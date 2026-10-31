import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Free-Snapshot requests (contact page). Captures the lead in Beehiiv with the
 * protocol name as a custom field, tagged utm_source=snapshot-request so the
 * team can spot them. Falls back to email-only if the custom field is not set
 * up in Beehiiv — the lead is never dropped.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const email = typeof body.email === "string" ? body.email : typeof body.Email === "string" ? body.Email : ""
    const protocol =
      typeof body.protocol === "string" ? body.protocol : typeof body.Protocol === "string" ? body.Protocol : ""

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
    }
    if (!protocol.trim()) {
      return NextResponse.json({ error: "A protocol name is required" }, { status: 400 })
    }

    const publicationId = process.env.BEEHIIV_PUBLICATION_ID
    const apiKey = process.env.BEEHIIV_API_KEY
    if (!publicationId || !apiKey) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 })
    }

    const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }
    const base = {
      email,
      reactivate_existing: true,
      send_welcome_email: false,
      utm_source: "snapshot-request",
    }

    let response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...base,
        custom_fields: [{ name: "Protocol", value: protocol.slice(0, 120) }],
      }),
    })

    if (!response.ok) {
      const details = await response.json().catch(() => ({}))
      console.error("Beehiiv snapshot (with custom field) failed:", details)
      response = await fetch(url, { method: "POST", headers, body: JSON.stringify(base) })
      if (!response.ok) {
        const d2 = await response.json().catch(() => ({}))
        console.error("Beehiiv snapshot (email-only) failed:", d2)
        return NextResponse.json({ error: "Failed to submit" }, { status: response.status })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("snapshot route error:", err)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
