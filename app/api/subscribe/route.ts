import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Website email capture -> OnchainSuite (Datum's own product), through its
// Custom Events ingest (POST /api/v1/events) with a server-only sk_live key.
// The event creates or updates the contact by email, and `addToList` puts it
// on the funnel list for the page it came from (OnchainSuite creates a list
// the first time it sees a name). That list join is also an automation
// trigger, so a welcome sequence can hang off each funnel.
//
// Config (server-only env, Vercel project v0-website-build):
//  - ONCHAINSUITE_SECRET_KEY  sk_live_… key from OnchainSuite > Settings > Developer
//  - ONCHAINSUITE_API_URL     optional, defaults to https://api.onchainsuite.com/api/v1

// The list a form may add to is decided here, never by the client.
const LISTS = {
  research: "Research Page Funnel",
  podcast: "Podcast Page Funnel",
  dashboards: "Dashboard Page Funnel",
} as const
type Source = keyof typeof LISTS

const isSource = (s: unknown): s is Source => typeof s === "string" && s in LISTS

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; page?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  if (!email || email.length > 320 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
  }

  const apiKey = process.env.ONCHAINSUITE_SECRET_KEY
  if (!apiKey) {
    console.error("[subscribe] ONCHAINSUITE_SECRET_KEY is not set")
    return NextResponse.json({ error: "Newsletter is not configured" }, { status: 503 })
  }
  const base = (process.env.ONCHAINSUITE_API_URL || "https://api.onchainsuite.com/api/v1").replace(/\/+$/, "")

  // Older pages' footer form sends no source: those contacts are tagged but
  // join no funnel list.
  const source = isSource(body.source) ? body.source : undefined
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : undefined

  try {
    const res = await fetch(`${base}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        event: "website_signup",
        contact: { email },
        attributes: { signup_source: source ?? "website-footer" },
        payload: { source: source ?? "website-footer", page },
        tags: ["website", source ? `website-${source}` : "website-footer"],
        ...(source ? { addToList: LISTS[source] } : {}),
      }),
    })

    if (!res.ok) {
      const details = await res.json().catch(() => ({}))
      console.error("[subscribe] OnchainSuite rejected the event", res.status, details?.error?.code ?? details)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[subscribe] OnchainSuite request failed", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 })
  }
}
