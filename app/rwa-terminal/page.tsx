import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RWA Terminal | Datum Labs",
  description: "Tokenized real-world-asset analytics across Aave Horizon and curated RWA markets.",
  alternates: { canonical: "/rwa-terminal" },
  openGraph: { title: "RWA Terminal | Datum Labs", url: "/rwa-terminal", type: "website" },
}

export default function RwaTerminalPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://rwa-terminal-dashboard-27g.pages.dev/"
        className="w-full h-full border-0"
        title="RWA Terminal"
        allow="clipboard-write"
      />
    </div>
  )
}
