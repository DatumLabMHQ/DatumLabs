"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "datum_report_unlocked"

/**
 * Soft lead-gate for the back half of a report (PDF download + remaining body).
 *
 * The `children` are always rendered into the DOM (so search engines index the
 * full report — preserving SEO). When locked, they're blurred and a centered
 * "Unlock full access" modal asks for name/email/occupation. Submitting posts
 * to /api/gate (Beehiiv) and unlocks all reports via localStorage.
 */
export function ReportGate({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", occupation: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    setUnlocked(typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1")
    setHydrated(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setError("")
    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong")
      }
      window.localStorage.setItem(STORAGE_KEY, "1")
      setUnlocked(true)
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  // Before hydration we render children fully so crawlers (and the SSR HTML)
  // always contain the complete report. Once hydrated, gate if still locked.
  if (!hydrated || unlocked) return <>{children}</>

  return (
    <div className="sp-gate">
      {/* Gated content stays in the DOM, blurred behind the form */}
      <div aria-hidden="true" className="sp-gate-veil">
        {children}
      </div>
      <div className="sp-gate-fade" />

      <div className="sp-gate-center">
        <div className="sp-instrument sp-gate-card">
          <div className="sp-gate-in">
            <h3 className="sp-h3">Read the full report</h3>
            <p className="sp-small">Free. Leave your details and the rest of the report and the PDF unlock here, and for every report after this one.</p>
            <form onSubmit={handleSubmit} className="sp-form">
              <div className="sp-field">
                <label htmlFor="gate-name">Full name</label>
                <input id="gate-name" type="text" required autoComplete="name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={status === "loading"} />
              </div>
              <div className="sp-field">
                <label htmlFor="gate-email">Email</label>
                <input id="gate-email" type="email" required autoComplete="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={status === "loading"} />
              </div>
              <div className="sp-field">
                <label htmlFor="gate-occ">Occupation</label>
                <input id="gate-occ" type="text" required placeholder="Protocol founder, analyst, risk lead…" value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })} disabled={status === "loading"} />
              </div>
              <button type="submit" className="sp-btn sp-btn-primary" disabled={status === "loading"}>
                {status === "loading" ? "Unlocking…" : "Unlock the full report"}
              </button>
              {error ? <p className="sp-gate-err" role="alert">{error}</p> : null}
              <p className="sp-small">We respect your inbox. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
