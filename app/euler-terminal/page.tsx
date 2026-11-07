import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Euler Research Terminal | Datum Labs",
  description:
    "Live Euler V2 analytics - the 16-chain deployment map, modular EVK vault book, collateral and debt composition, EulerSwap, and EUL value accrual.",
  alternates: { canonical: "/euler-terminal" },
  openGraph: { title: "Euler Research Terminal | Datum Labs", url: "/euler-terminal", type: "website" },
}

import Link from "next/link"

/**
 * Euler Research Terminal - embedded dashboard.
 *
 * Ships from a separate Vercel project (repo: euler-dashboard-next). We iframe the
 * project's stable production domain (euler-dashboard-next.datumlabs.workers.dev)
 * rather than a manual alias, so every deploy of that project is reflected here
 * with no re-alias step. Asset paths are absolute within that origin, so the
 * iframe needs no rewrite under datumlab.xyz.
 *
 * Pattern mirrors /app/fluid-terminal/page.tsx: a thin Datum-branded header bar
 * above a full-bleed iframe, with a back link to the Live Dashboards index.
 */
export default function EulerTerminalPage() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div
        className="flex items-center gap-3 px-4 py-2 border-b bg-[#F5F6F8]"
        style={{ borderColor: "#E2E4E9" }}
      >
        <Link
          href="/live-dashboards"
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Live Dashboards
        </Link>
      </div>
      <iframe
        src="https://euler-dashboard-next.datumlabs.workers.dev/"
        className="w-full flex-1 border-0"
        title="Euler Research Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
