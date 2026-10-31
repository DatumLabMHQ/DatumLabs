import type { Metadata } from "next"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
import { DuneGrid } from "@/components/dune-grid"

const CAL = "https://calendly.com/datumlabss/30min"

export const metadata: Metadata = {
  title: "DeFi Dune Dashboards — Lending, Risk & Governance | Datum Labs",
  description:
    "Public Dune dashboards authored by Datum Labs across DeFi lending, risk, DEX, stablecoins, and payments — Moonwell, Morpho, Venus, CoW and more.",
  alternates: { canonical: "/dune-dashboard" },
  openGraph: { title: "DeFi Dune Dashboards — Lending, Risk & Governance | Datum Labs", url: "/dune-dashboard", type: "website" },
}

export default function DuneDashboardsPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <header className="page-header ph-rel" data-nav-dark data-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
        <div className="wrap ph-inner">
          <span className="crumb">Dune · Public Index</span>
          <h1>Live dashboards. <span className="it">Public receipts.</span></h1>
          <p>Every dashboard below is authored and maintained by Datum Labs. Click through to the live Dune surface, the same one the protocol team checks every morning.</p>
          <div className="meta-row">
            <span><strong>10</strong> Live</span>
            <span><strong>8</strong> Protocols</span>
            <span><strong>14</strong> Chains</span>
            <span>Updated · Continuously</span>
          </div>
        </div>
      </header>

      <main id="main" className="wrap">
        <DuneGrid />

        <section className="section">
          <div className="spotlight" data-reveal>
            <div className="spotlight-inner">
              <div>
                <h2>Want a custom dashboard?</h2>
                <p>The dashboards above are public. The ones we run for our partners are bespoke, instrumented, and tied to the protocol&apos;s actual KPIs. Tell us what you need to see.</p>
              </div>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="btn btn-flag">SCOPE A DASHBOARD ↗</a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
