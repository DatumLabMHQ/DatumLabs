"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Check } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

/**
 * Newsletter signup (older pages' footer). Posts to /api/subscribe, which sends it to OnchainSuite tagged website-footer (server-side, keeps the
 * API key secret). Styled to sit in the footer.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong")
      }
      setStatus("success")
      setMessage("You're subscribed — thanks!")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@email.com"
        aria-label="Email address"
        disabled={status === "loading"}
        className="w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
      />
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing…
          </>
        ) : status === "success" ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
      {message ? (
        <p className={`text-xs ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>
      ) : null}
    </form>
  )
}
