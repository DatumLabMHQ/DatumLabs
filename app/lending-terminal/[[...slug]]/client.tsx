"use client"

import { useEffect, useState } from "react"

const DASHBOARD_ORIGIN = "https://lending-intelligence-terminal.vercel.app"
const PARENT_BASE = "/lending-terminal"
const MESSAGE_SOURCE = "datumlabs-lending-terminal"

/**
 * Iframe wrapper for the Lending Intelligence Terminal.
 *
 * Two-way path sync (mirrors the centrifugerwa setup):
 *
 *   1. On mount, build the iframe `src` from the URL slug we received from
 *      the server component (`/lending-terminal/protocols?p=spark` →
 *      `DASHBOARD_ORIGIN/protocols?p=spark`).
 *   2. The dashboard posts its current pathname to us on every route
 *      change. We mirror it back into the parent URL via
 *      `history.replaceState` (no reload, no React re-render of this
 *      component, so the iframe is left alone).
 *
 * Because this route is an optional catch-all, the URL is real — users can
 * copy/paste it, share it, and reload it without 404.
 *
 * Cross-origin safety: we only accept postMessage from `DASHBOARD_ORIGIN`.
 * The dashboard side posts to "*" (it doesn't know our exact origin), but
 * we verify on receipt.
 */
export default function LendingTerminalIframe({ initialPath }: { initialPath: string }) {
  // The iframe src is set ONCE from the server-resolved initialPath. We
  // never reset it on prop changes, so subsequent in-iframe navigation
  // (which triggers postMessage → replaceState → no React re-render of
  // this component) leaves the iframe alone.
  const [src] = useState(() => {
    const safe = initialPath.startsWith("/") ? initialPath : "/"
    return `${DASHBOARD_ORIGIN}${safe}`
  })

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== DASHBOARD_ORIGIN) return
      const data = e.data
      if (
        !data ||
        typeof data !== "object" ||
        data.source !== MESSAGE_SOURCE ||
        data.type !== "path-change"
      ) {
        return
      }
      const innerPath: unknown = data.path
      if (typeof innerPath !== "string" || !innerPath.startsWith("/")) return

      // Mirror the inner path into our URL: /lending-terminal{innerPath}.
      // For the bare root we keep just /lending-terminal to avoid a
      // trailing slash artifact.
      const newPath = innerPath === "/" ? PARENT_BASE : `${PARENT_BASE}${innerPath}`
      const current = window.location.pathname + window.location.search
      if (current !== newPath) {
        window.history.replaceState(null, "", newPath)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <div className="w-full h-screen">
      <iframe
        src={src}
        className="w-full h-full border-0"
        title="Lending Intelligence Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
