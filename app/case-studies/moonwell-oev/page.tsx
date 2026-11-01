import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, CloseCta } from "@/components/print/print-parts"

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

const FACTS = [
  { t: "Protocol", b: "Moonwell" },
  { t: "Chains", b: "Base · Optimism" },
  { t: "Engagement", b: "Strategic Data Partnership" },
  { t: "Status", b: "Live" },
]

const BUILT = [
  { t: "Revenue captured", b: "What the protocol keeps from each liquidation." },
  { t: "Incentives paid", b: "What goes to the liquidators doing the work." },
  { t: "Net OEV", b: "Per market, per chain, per day." },
  { t: "Liquidator concentration", b: "Who is doing the work, and who is getting paid." },
]

const NUMBERS = [
  { t: "Revenue captured", b: "Routed to the Moonwell treasury via the upgraded contracts.", v: "$14K+" },
  { t: "Liquidator incentives", b: "Paid out to liquidators, keeping the market healthy.", v: "$300K+" },
  { t: "Time to insight", b: "From a shipped contract to proof it works.", v: "2 weeks" },
]

const STACK = [
  { t: "Source", b: "Datum Labs archive nodes, Base and Optimism." },
  { t: "Indexer", b: "Liquidation events normalised per market." },
  { t: "Warehouse", b: "Materialised in Atlas for sub-second loads." },
  { t: "Surface", b: "A public live page plus private Slack alerts." },
]

export default function CaseStudyMoonwellOev() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead
          crumb={{ href: "/case-studies", label: "Case studies" }}
          title="Capturing $300K in liquidator value in two weeks."
          lede="The live page Moonwell uses to prove a governance upgrade is paying for itself, in real time, on Base and Optimism."
        />

        <section className="sp-section" id="brief">
          <div className="sp-wrap">
            <div className="sp-split">
              <div>
                <h2 className="sp-h2">The brief</h2>
                <ul className="sp-ledger sp-ledger-2" style={{ marginTop: 32 }} aria-label="At a glance">
                  {FACTS.map((f) => (
                    <li key={f.t}>
                      <h3 className="sp-h3">{f.t}</h3>
                      <p>{f.b}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sp-prose">
                <p>
                  Moonwell shipped a governance upgrade that changed how the protocol captures and distributes{" "}
                  <strong>OEV</strong>, the revenue surfaced when a position is liquidated. Contracts on-chain, audit clean,
                  ready to earn.
                </p>
                <p>The team had no way to see whether it was working.</p>
                <blockquote className="sp-claim" style={{ marginTop: 28 }}>
                  &ldquo;We can read the contracts, but we can&rsquo;t read the protocol. Build us the surface that proves
                  the upgrade is paying for itself, or isn&rsquo;t.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="built">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">What we built</h2>
              <p>A live page on Atlas that decomposes every liquidation on Base and Optimism into the four flows that matter.</p>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              {BUILT.map((l) => (
                <li key={l.t}>
                  <h3 className="sp-h3">{l.t}</h3>
                  <p>{l.b}</p>
                </li>
              ))}
            </ul>
            <p className="sp-small" style={{ marginTop: 22 }}>
              Behind it: normalised liquidation events from our archive nodes, a per-market revenue model, and alerts when
              concentration crosses a healthy threshold.
            </p>
          </div>
        </section>

        <Band id="numbers">
          <div className="sp-head">
            <h2 className="sp-h2">
              The numbers, <em>first 14 days.</em>
            </h2>
          </div>
          <ul className="sp-ledger">
            {NUMBERS.map((n) => (
              <li key={n.t}>
                <h3 className="sp-h3">{n.t}</h3>
                <p>{n.b}</p>
                <span className="sp-l-meta">{n.v}</span>
              </li>
            ))}
          </ul>
        </Band>

        <section className="sp-section" id="why">
          <div className="sp-wrap">
            <div className="sp-split">
              <h2 className="sp-h2">Why it mattered</h2>
              <div className="sp-prose">
                <p>
                  Events span two chains, several markets, and a flow that splits at the contract level. Without a
                  purpose-built surface the team would have known the upgrade <strong>shipped</strong>. They would not have
                  known if it was <strong>working</strong>.
                </p>
                <p>
                  The page turns the upgrade into continuous, public proof: every liquidation, every payout, on one surface
                  the team and the community check daily.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="stack">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Stack</h2>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              {STACK.map((l) => (
                <li key={l.t}>
                  <h3 className="sp-h3">{l.t}</h3>
                  <p>{l.b}</p>
                </li>
              ))}
            </ul>
            <div className="sp-act">
              <a
                className="sp-btn sp-btn-primary"
                href="https://dune.com/jorel/moonwell-oev-dashboard"
                target="_blank"
                rel="noopener"
              >
                View the live page
              </a>
              <a className="sp-btn sp-btn-ink" href="/case-studies">
                More cases
              </a>
            </div>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
