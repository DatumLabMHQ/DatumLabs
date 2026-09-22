import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fluid Research Terminal | Datum Labs",
  description: "Live Fluid (Instadapp) analytics — market size, active loans, DEX volume, RWA-backed loans, the Fluid-powered ecosystem, and $FLUID value accrual.",
  alternates: { canonical: "/fluid-terminal" },
  openGraph: { title: "Fluid Research Terminal | Datum Labs", url: "/fluid-terminal", type: "website" },
}

import Link from "next/link"

/**
 * Fluid Research Terminal — embedded dashboard.
 *
 * Ships from a separate Vercel project (repo: fluid-dashboard-next). We iframe the
 * project's stable production domain (fluid-dashboard-next.vercel.app)
 * rather than the manual fluid-terminal.vercel.app alias, so every `vercel --prod`
 * of that project is reflected here with no re-alias step. Asset paths are
 * absolute within that origin, so the iframe needs no rewrite under datumlab.xyz.
 *
 * Pattern mirrors /app/morpho-terminal/page.tsx: a thin Datum-branded header
 * bar above a full-bleed iframe, with a back link to the Live Dashboards index.
 */
export default function FluidTerminalPage() {
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
        src="https://fluid-dashboard-next.vercel.app/"
        className="w-full flex-1 border-0"
        title="Fluid Research Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
