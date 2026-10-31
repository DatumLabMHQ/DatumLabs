import type { Metadata } from "next"
import {
  Coins,
  HandCoins,
  ChartLine,
  UsersThree,
  Database,
  Funnel,
  HardDrives,
  Monitor,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Moonwell OEV Dashboard, Case Study, Datum Labs",
  description:
    "The live page Moonwell uses to prove a governance upgrade is paying for itself, in real time, on Base and Optimism.",
  alternates: { canonical: "/case-studies/moonwell-oev" },
  openGraph: {
    title: "Moonwell OEV Dashboard, Case Study, Datum Labs",
    url: "/case-studies/moonwell-oev",
    type: "website",
  },
}

export default function CaseStudyMoonwellOev() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Capturing $300K in liquidator value in two weeks.</h1>
            <p className="lede">The live page Moonwell uses to prove a governance upgrade is paying for itself, in real time, on Base and Optimism.</p>
          </div>
        </section>

        <section className="section" id="facts" data-pin-persist data-nav-light>
          <div className="wrap">
            <div className="cs-facts">
              <div><span className="k">Protocol</span><span className="v">Moonwell</span></div>
              <div><span className="k">Chains</span><span className="v">Base · Optimism</span></div>
              <div><span className="k">Engagement</span><span className="v">Strategic Data Partnership</span></div>
              <div><span className="k">Status</span><span className="v">Live</span></div>
            </div>
          </div>
        </section>

        <section className="section tint" id="brief">
          <div className="wrap">
            <div className="lead-split">
              <h2 className="spaced">The brief</h2>
              <div className="prose">
                <p>Moonwell shipped a governance upgrade that changed how the protocol captures and distributes <strong>OEV</strong>, the revenue surfaced when a position is liquidated. Contracts on-chain, audit clean, ready to earn.</p>
                <p>The team had no way to see whether it was working.</p>
                <blockquote className="cs-quote">&ldquo;We can read the contracts, but we can&rsquo;t read the protocol. Build us the surface that proves the upgrade is paying for itself, or isn&rsquo;t.&rdquo;</blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="built">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">What we built</h2>
              <p>A live page on Atlas that decomposes every liquidation on Base and Optimism into the four flows that matter.</p>
            </div>
            <div className="cells cells-4">
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Coins weight="duotone" /></i></span><h3>Revenue captured</h3><p>What the protocol keeps from each liquidation.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><HandCoins weight="duotone" /></i></span><h3>Incentives paid</h3><p>What goes to the liquidators doing the work.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><ChartLine weight="duotone" /></i></span><h3>Net OEV</h3><p>Per market, per chain, per day.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><UsersThree weight="duotone" /></i></span><h3>Liquidator concentration</h3><p>Who is doing the work, and who is getting paid.</p></div>
            </div>
            <p className="smallprint">Behind it: normalised liquidation events from our archive nodes, a per-market revenue model, and alerts when concentration crosses a healthy threshold.</p>
          </div>
        </section>

        <section data-pin className="section tint" id="numbers">
          <div className="wrap">
            <p className="stat-eyebrow">The numbers, first 14 days</p>
            <div className="cs-nums">
              <div className="cs-stat is-flag">
                <span className="cs-stat-val">$14<span className="u">K+</span></span>
                <span className="cs-stat-lbl">Revenue captured</span>
                <p>Routed to the Moonwell treasury via the upgraded contracts.</p>
              </div>
              <div className="cs-stat">
                <span className="cs-stat-val">$300<span className="u">K+</span></span>
                <span className="cs-stat-lbl">Liquidator incentives</span>
                <p>Paid out to liquidators, keeping the market healthy.</p>
              </div>
              <div className="cs-stat">
                <span className="cs-stat-val">2<span className="u is-word">weeks</span></span>
                <span className="cs-stat-lbl">Time to insight</span>
                <p>From a shipped contract to proof it works.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="why">
          <div className="wrap">
            <div className="lead-split">
              <h2 className="spaced">Why it mattered</h2>
              <div className="prose">
                <p>Events span two chains, several markets, and a flow that splits at the contract level. Without a purpose-built surface the team would have known the upgrade <strong>shipped</strong>. They would not have known if it was <strong>working</strong>.</p>
                <p>The page turns the upgrade into continuous, public proof: every liquidation, every payout, on one surface the team and the community check daily.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section tint" id="stack">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Stack</h2>
            </div>
            <div className="cells cells-4">
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Database weight="duotone" /></i></span><h3>Source</h3><p>Datum Labs archive nodes, Base and Optimism.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Funnel weight="duotone" /></i></span><h3>Indexer</h3><p>Liquidation events normalised per market.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><HardDrives weight="duotone" /></i></span><h3>Warehouse</h3><p>Materialised in Atlas for sub-second loads.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Monitor weight="duotone" /></i></span><h3>Surface</h3><p>A public live page plus private Slack alerts.</p></div>
            </div>
            <div className="cs-actions">
              <a className="btn" href="https://dune.com/jorel/moonwell-oev-dashboard" target="_blank" rel="noopener">View the live page</a>
              <a className="btn" href="/case-studies">More cases</a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
