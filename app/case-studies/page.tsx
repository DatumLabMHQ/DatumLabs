import type { Metadata } from "next"
import { ArrowRight, CreditCard } from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Case Studies, Datum Labs",
  description:
    "Selected work from Datum Labs. Featured engagements with Moonwell, Coinbase × Shopify, and the protocol roster we operate for.",
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "Case Studies, Datum Labs", url: "/case-studies", type: "website" },
}

export default function CaseStudies() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Receipts. Not <span className="it">case studies.</span></h1>
            <p className="lede">Every engagement below is live, instrumented, and operated by Datum Labs. Numbers are pulled straight from production, same dashboards the protocol team uses to make decisions.</p>
          </div>
        </section>

        <section className="section" id="facts" data-pin-persist data-nav-light>
          <div className="wrap">
            <div className="cs-facts">
              <div><span className="k">Active engagements</span><span className="v">12</span></div>
              <div><span className="k">Featured</span><span className="v">4</span></div>
              <div><span className="k">TVL observed</span><span className="v">$5B+</span></div>
              <div><span className="k">Chains</span><span className="v">14</span></div>
            </div>
          </div>
        </section>

        {/* featured cases */}
        <section className="section" id="featured">
          <div className="wrap">
            <div className="pc-grid pc-grid-2">
              <a className="pc pc-case" href="/case-studies/moonwell-oev">
                <div className="pc-top">
                  <div>
                    <h3>Moonwell OEV Dashboard<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Revenue analytics</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-6.png" alt="" />
                </div>
                <p>Tracking how revenue from liquidations is captured and distributed after a governance upgrade. In two weeks: $14K+ revenue, $300K+ to liquidators.</p>
                <div className="pc-metrics"><div><span className="k">Revenue</span><span className="v">$14K+</span></div><div><span className="k">Incentives</span><span className="v">$300K+</span></div><div><span className="k">Time to insight</span><span className="v">2 weeks</span></div></div>
                <div className="pc-foot"><span className="pc-chains">Read the case</span></div>
              </a>
              <a className="pc pc-case" href="https://dune.com/jorel/moonwell-governance-dashboard" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Moonwell Governance Dashboard<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Governance · multi-chain</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-6.png" alt="" />
                </div>
                <p>Aggregates governance activity across all supported chains: on-chain and Snapshot proposals, participation, voters and delegates.</p>
                <div className="pc-metrics"><div><span className="k">Coverage</span><span className="v">Multi-chain</span></div><div><span className="k">Sources</span><span className="v">On-chain + Snapshot</span></div><div><span className="k">Scope</span><span className="v">Voters + delegates</span></div></div>
                <div className="pc-foot"><span className="pc-chains">View live</span></div>
              </a>
              <a className="pc pc-case" href="https://dune.com/jorel/commerce-payments-protocol-dashboard" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Commerce Payments Protocol<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Payments · Coinbase × Shopify</span>
                  </div>
                  <span className="pc-mark"><i aria-hidden="true"><CreditCard weight="duotone" /></i></span>
                </div>
                <p>Tracking user behaviour, protocol performance and adoption for the Coinbase and Shopify Commerce Payments Protocol.</p>
                <div className="pc-metrics"><div><span className="k">Partners</span><span className="v">Coinbase + Shopify</span></div><div><span className="k">Focus</span><span className="v">Adoption</span></div><div><span className="k">Scope</span><span className="v">User behaviour</span></div></div>
                <div className="pc-foot"><span className="pc-chains">View live</span></div>
              </a>
              <a className="pc pc-case" href="https://dune.com/jorel/moonwell-protocol-risk-dashboard" target="_blank" rel="noopener">
                <div className="pc-top">
                  <div>
                    <h3>Moonwell Risk Dashboard<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                    <span className="pc-cat">Risk · Base + Optimism</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-6.png" alt="" />
                </div>
                <p>Evaluates risk across markets on Base and Optimism, monitoring the health factor of individual positions for proactive risk controls.</p>
                <div className="pc-metrics"><div><span className="k">Chains</span><span className="v">Base + Optimism</span></div><div><span className="k">Focus</span><span className="v">Health factors</span></div><div><span className="k">Impact</span><span className="v">Proactive</span></div></div>
                <div className="pc-foot"><span className="pc-chains">View live</span></div>
              </a>
            </div>
          </div>
        </section>

        {/* protocol roster */}
        <section className="section tint" id="roster">
          <div className="wrap">
            <div className="section-head">
              <h2>Protocols under observation.</h2>
              <p>Engagements past and present. Each protocol gets a custom-built data org, pipelines, models, and surfaces operated by Datum.</p>
            </div>
            <div className="prows">
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aave-logo.png" alt="" />
                <span className="prow-name">Aave</span>
                <span className="prow-tag">Lending</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-3.png" alt="" />
                <span className="prow-name">Morpho</span>
                <span className="prow-tag">Lending</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-5.png" alt="" />
                <span className="prow-name">Seamless</span>
                <span className="prow-tag">DeFi · Base</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-1.png" alt="" />
                <span className="prow-name">Falcon Finance</span>
                <span className="prow-tag">Stablecoin</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/incentiv-logo.png" alt="" />
                <span className="prow-name">Incentiv</span>
                <span className="prow-tag">L1 · Infra</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-7.png" alt="" />
                <span className="prow-name">Venus</span>
                <span className="prow-tag">Lending · BNB</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/sparklend-logo.png" alt="" />
                <span className="prow-name">SparkLend</span>
                <span className="prow-tag">Lending</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cow-logo.png" alt="" />
                <span className="prow-name">CoW Protocol</span>
                <span className="prow-tag">DEX · Batch</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/level-logo.png" alt="" />
                <span className="prow-name">Level</span>
                <span className="prow-tag">Staking</span>
              </div>
              <div className="prow">
                <span className="prow-mark">D</span>
                <span className="prow-name">Dexwin</span>
                <span className="prow-tag">Prediction</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/orbt-logo.jpg" alt="" />
                <span className="prow-name">ORBT</span>
                <span className="prow-tag">L2</span>
              </div>
              <div className="prow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/goldfish-logo.png" alt="" />
                <span className="prow-name">Goldfish</span>
                <span className="prow-tag">DeFi</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="cta" data-light-plate>
          <div className="split-outer">
            <div className="ctaplate">
              <div className="ctaplate-inner">
                <div>
                  <h2>Want a write-up like one of these?</h2>
                  <p>The fastest way to find out what we&rsquo;d build for you is a 30-minute audit. We&rsquo;ll show you, on your data, where the immediate signal is.</p>
                </div>
                <a className="btn" href="https://calendly.com/datumlabss/30min" target="_blank" rel="noopener">Book a 30-min audit</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
