"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const DASHBOARD_ORIGIN = "https://centrifuge-dashboard-datum.vercel.app"
const PARENT_BASE = "/centrifugerwa"

/**
 * Iframe wrapper for the Centrifuge RWA dashboard.
 *
 * The dashboard lives at DASHBOARD_ORIGIN. We embed it via iframe under
 * /centrifugerwa/* so it inherits Datum Labs branding. To make reload
 * preserve the inner location, we use a two-way path sync:
 *
 *   1. On mount, build the iframe src from the URL slug we received
 *      from the server component (e.g. /centrifugerwa/dashboard/methodology
 *      → iframe loads DASHBOARD_ORIGIN/dashboard/methodology).
 *   2. The dashboard posts its current pathname to the parent on every
 *      route change. We listen and mirror it into the parent URL bar via
 *      history.replaceState (no reload, no hash fragment).
 *
 * Because the parent route is an optional catch-all, the URL is real —
 * users can copy/paste it, share it, and reload it without 404.
 *
 * Cross-origin safety: we only accept postMessage from DASHBOARD_ORIGIN.
 * The dashboard side checks our origin too before posting.
 */
export default function CentrifugeIframe({ initialPath }: { initialPath: string }) {
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
        data.source !== "datumlabs-centrifuge" ||
        data.type !== "path-change"
      ) {
        return
      }
      const innerPath: unknown = data.path
      if (typeof innerPath !== "string" || !innerPath.startsWith("/")) return

      // Mirror the inner path into our URL: /centrifugerwa{innerPath}.
      // For the bare root we keep just /centrifugerwa to avoid a trailing
      // slash artifact.
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
    <div className="w-full h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 h-10 border-b bg-background/80 backdrop-blur-sm shrink-0">
        <Link
          href="/live-dashboards"
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to Dashboards
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/datum-logo.png" alt="Datum Labs" width={20} height={20} />
          <span className="text-xs font-bold">Datum Labs</span>
        </Link>
      </div>
      <iframe
        src={src}
        className="w-full flex-1 border-0"
        title="Centrifuge RWA Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
