"use client"

import { useState } from "react"

/* Email sign-up for the Datum Labs newsletter (Beehiiv, via /api/subscribe).
   `tone` matches the surface it sits on. */
export function NewsletterForm({ tone = "paper", cta = "Subscribe" }: { tone?: "paper" | "ink"; cta?: string }) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle")
  const [msg, setMsg] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "busy") return
    setState("busy")
    setMsg("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong, please try again.")
      }
      setState("done")
    } catch (err) {
      setState("error")
      setMsg(err instanceof Error ? err.message : "Something went wrong, please try again.")
    }
  }

  if (state === "done") {
    return <p className={`nl-done nl-${tone}`} role="status">You&rsquo;re subscribed. The next one lands in your inbox.</p>
  }

  return (
    <form className={`nl-form nl-${tone}`} onSubmit={submit}>
      <label className="nl-sr" htmlFor={`nl-email-${tone}`}>Email address</label>
      <input
        id={`nl-email-${tone}`}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "busy"}
      />
      <button type="submit" disabled={state === "busy"}>
        {state === "busy" ? "Subscribing…" : cta}
      </button>
      {state === "error" ? <p className="nl-err" role="alert">{msg}</p> : null}
    </form>
  )
}
