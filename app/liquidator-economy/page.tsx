import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Liquidator Economy | Datum Labs",
  description: "Liquidation flows, liquidator concentration, and incentive economics across lending protocols.",
  alternates: { canonical: "/liquidator-economy" },
  openGraph: { title: "Liquidator Economy | Datum Labs", url: "/liquidator-economy", type: "website" },
}

export default function LiquidatorEconomyDashboardPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://liquidator-economy-dashboard.vercel.app/"
        className="w-full h-full border-0"
        title="Liquidator Economy Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
