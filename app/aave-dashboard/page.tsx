import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aave Dashboard | Datum Labs",
  description: "Live Aave v3 lending-market analytics — supply and borrow rates, utilization, and risk across chains.",
  alternates: { canonical: "/aave-dashboard" },
  openGraph: { title: "Aave Dashboard | Datum Labs", url: "/aave-dashboard", type: "website" },
}

export default function AaveDashboardPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://aave-dashboard-next.vercel.app/"
        className="w-full h-full border-0"
        title="Aave Dashboard"
        allow="clipboard-write"
      />
    </div>
  )
}
