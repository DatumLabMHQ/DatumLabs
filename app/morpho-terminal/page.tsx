import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Morpho Research Terminal | Datum Labs",
  description: "Curated Morpho vault and market analytics — allocations, rates, and risk.",
  alternates: { canonical: "/morpho-terminal" },
  openGraph: { title: "Morpho Research Terminal | Datum Labs", url: "/morpho-terminal", type: "website" },
}

import Link from "next/link"

/**
 * Morpho Research Terminal — embedded dashboard.
 *
 * Ships from a separate Vercel project (repo: morpho-dashboard) at
 * https://morpho-terminal.vercel.app. Asset paths are absolute within that
 * origin, so the iframe needs no rewrite under datumlab.xyz.
 *
 * Pattern mirrors /app/navi/page.tsx and /app/lending-terminal-sui/page.tsx:
 * a thin Datum-branded header bar above a full-bleed iframe, with a back link
 * to the Live Dashboards index.
 */
export default function MorphoTerminalPage() {
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
        src="https://morpho-terminal-dashboard.vercel.app/"
        className="w-full flex-1 border-0"
        title="Morpho Research Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
