import type { Metadata } from "next"

import { Nav, Footer, PageHead, CloseCta, LINKS } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Live Dashboards, Datum Labs",
  description:
    "Custom-built, fully-owned dashboards we operate for protocol teams. Live data feeds, market metrics, and interactive analytics, instrumented end-to-end by Datum Labs.",
  alternates: { canonical: "/live-dashboards" },
  openGraph: { title: "Live Dashboards, Datum Labs", url: "/live-dashboards", type: "website" },
}

const DASHBOARDS = [
  { name: "Aave", href: "/aave-dashboard", logo: "/images/aave-logo.png", body: "Multi-chain lending markets" },
  { name: "NAVI", href: "/navi", logo: "/images/navi-logo.png", body: "Sui-native money market" },
  { name: "Incentiv", href: "/Incentiv/dashboard/overview", logo: "/images/incentiv-logo.png", body: "L1 incentive accounting" },
]

export default function LiveDashboards() {
  return (
    <>
      <Nav active="dashboards" />

      <main id="main">
        <PageHead
          title={
            <>
              Real-time protocol dashboards. <em>Hosted by us.</em>
            </>
          }
          lede="Custom-built, fully-owned dashboards we operate for protocol teams. Live data feeds, market metrics, and interactive analytics, instrumented end-to-end by Datum Labs and embedded directly inside their products."
          support="3 active deployments, 14 chains covered, 99.97% uptime."
        />

        <section className="sp-section" id="lend">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Borrow and lend.</h2>
              <p>
                Three live, one onboarding. Each page is rebuilt from the chain every hour and carries the time of its last
                run.
              </p>
            </div>
            <ul className="sp-ledger">
              {DASHBOARDS.map((d) => (
                <li key={d.name}>
                  <h3 className="sp-h3 sp-l-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.logo} alt="" />
                    <a className="sp-link" href={d.href} target="_blank" rel="noopener">
                      {d.name}
                    </a>
                  </h3>
                  <p>{d.body}</p>
                  <span className="sp-l-meta">Live &middot; hosted by us</span>
                </li>
              ))}
              <li>
                <h3 className="sp-h3">
                  <a className="sp-link" href={LINKS.calendly} target="_blank" rel="noopener">
                    Your protocol ↗
                  </a>
                </h3>
                <p>Request a build</p>
                <span className="sp-l-meta">Onboarding &middot; Q1 2026</span>
              </li>
            </ul>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
