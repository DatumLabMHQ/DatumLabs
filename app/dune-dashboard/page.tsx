import type { Metadata } from "next"

import { Nav, Footer, PageHead, LINKS } from "@/components/print/print-parts"
import { DuneGrid } from "@/components/dune-grid"

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
      <Nav active="dashboards" />

      <main id="main">
        <PageHead
          title={
            <>
              Live dashboards. <em>Public receipts.</em>
            </>
          }
          lede="Every dashboard below is authored and maintained by Datum Labs. Click through to the live Dune surface, the same one the protocol team checks every morning."
          meta={
            <>
              <span>Dune public index</span>
              <span><b>10</b> live</span>
              <span><b>8</b> protocols</span>
              <span><b>14</b> chains</span>
              <span>Updated <b>continuously</b></span>
            </>
          }
        />

        <section className="sp-section" id="dashboards">
          <div className="sp-wrap">
            <DuneGrid />
          </div>
        </section>

        <section className="sp-section sp-tight" id="custom">
          <div className="sp-wrap">
            <div className="sp-close">
              <h2 className="sp-h2">
                Want a <em>custom dashboard?</em>
              </h2>
              <div>
                <p className="sp-lede">
                  The dashboards above are public. The ones we run for our partners are bespoke, instrumented, and tied
                  to the protocol&apos;s actual KPIs. Tell us what you need to see.
                </p>
                <div className="sp-act">
                  <a className="sp-btn sp-btn-primary" href={LINKS.calendly} target="_blank" rel="noopener">
                    Scope a dashboard ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
