import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lending Terminal: Sui | Datum Labs",
  description: "Cross-protocol Sui lending intelligence — NAVI, Suilend, Scallop, and more.",
  alternates: { canonical: "/lending-terminal-sui" },
  openGraph: { title: "Lending Terminal: Sui | Datum Labs", url: "/lending-terminal-sui", type: "website" },
}

import Link from "next/link"

/**
 * Lending Terminal: SUI — embedded dashboard.
 *
 * The dashboard itself ships from a separate Vercel project (Sui Lending,
 * repo: Olusegun-Aborode/SuiLending) at https://sui-lending.vercel.app.
 * That deployment serves static HTML at /Overview.html (and other page
 * shells), so we point the iframe straight at it. Asset paths inside the
 * Sui Lending app are absolute (`/data.js`, `/api/sui-lending`) which is
 * fine because the iframe lives on its own origin — there's no rewrite
 * needed under datum.xyz.
 *
 * Pattern mirrors /app/navi/page.tsx: a thin Datum-branded header bar above
 * a full-bleed iframe, with a back link to the Live Dashboards index.
 *
 * Companion to /lending-terminal (the multi-protocol Ethereum dashboard) —
 * same product line, different chain.
 */
export default function LendingTerminalSuiPage() {
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
        src="https://sui-lending-dashboard-neon.vercel.app/"
        className="w-full flex-1 border-0"
        title="Lending Terminal: SUI"
        allow="clipboard-write"
      />
    </div>
  )
}
