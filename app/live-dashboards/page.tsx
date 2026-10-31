import type { Metadata } from "next"
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Live Dashboards, Datum Labs",
  description:
    "Custom-built, fully-owned dashboards we operate for protocol teams. Live data feeds, market metrics, and interactive analytics, instrumented end-to-end by Datum Labs.",
  alternates: { canonical: "/live-dashboards" },
  openGraph: { title: "Live Dashboards, Datum Labs", url: "/live-dashboards", type: "website" },
}

export default function LiveDashboards() {
  return (
    <>
      <PageRules />
      <NavV3 navDark active="dashboards" />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Real-time protocol dashboards. <span className="it">Hosted by us.</span></h1>
            <p className="lede">Custom-built, fully-owned dashboards we operate for protocol teams. Live data feeds, market metrics, and interactive analytics, instrumented end-to-end by Datum Labs and embedded directly inside their products.</p>
          </div>
        </section>

        <section className="section" id="facts" data-pin-persist data-nav-light>
          <div className="wrap">
            <div className="cs-facts">
              <div><span className="k">Active deployments</span><span className="v">3</span></div>
              <div><span className="k">Chains covered</span><span className="v">14</span></div>
              <div><span className="k">TVL observed</span><span className="v">$2.1B</span></div>
              <div><span className="k">Uptime</span><span className="v">99.97%</span></div>
            </div>
          </div>
        </section>

        {/* BORROW & LEND CATEGORY */}
        <section className="section" id="lend">
          <div className="wrap">
            <div className="section-head">
              <h2>Borrow and lend.</h2>
              <p style={{ color: "var(--dim)" }}>Three live, one onboarding. Each page is rebuilt from the chain every hour and carries the time of its last run.</p>
            </div>
            <div className="pc-grid pc-grid-2">
              <a className="pc pc-case" href="/aave-dashboard" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Aave<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Multi-chain lending markets</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aave-logo.png" alt="" />
                </div>
                <div className="pc-foot"><span className="pc-chains">Live &middot; hosted by us</span></div>
              </a>
              <a className="pc pc-case" href="/navi" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>NAVI<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Sui-native money market</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/navi-logo.png" alt="" />
                </div>
                <div className="pc-foot"><span className="pc-chains">Live &middot; hosted by us</span></div>
              </a>
              <a className="pc pc-case" href="/Incentiv/dashboard/overview" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Incentiv<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">L1 incentive accounting</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/incentiv-logo.png" alt="" />
                </div>
                <div className="pc-foot"><span className="pc-chains">Live &middot; hosted by us</span></div>
              </a>
              <a className="pc pc-case pc-pending" href="https://calendly.com/datumlabss/30min" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Your protocol<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Onboarding &middot; Q1 2026</span>
                  </div>
                  <span className="pc-mark"><i aria-hidden="true"><Plus weight="duotone" /></i></span>
                </div>
                <div className="pc-foot"><span className="pc-chains">Request a build</span></div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
