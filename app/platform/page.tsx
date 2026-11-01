import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, CloseCta } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Atlas, the Datum Labs platform",
  description:
    "Atlas models eight lending protocols across fourteen chains, every hour. It is the pipeline behind every report and every live page we publish.",
  alternates: { canonical: "/platform" },
  openGraph: { title: "Atlas, the Datum Labs platform", url: "/platform", type: "website" },
}

const PROPERTIES = [
  { t: "Hourly", b: "Every market rebuilt from chain state, every hour." },
  { t: "Traceable", b: "Every figure resolves to a query, a run and a date." },
  { t: "Reconciled", b: "Revenue shown against the public trackers, with any gap explained." },
  { t: "Hosted by us", b: "Twelve live terminals, run by us, not a third party." },
  { t: "Your page, kept", b: "Your page stays up if you leave, frozen at the last close." },
  { t: "One source", b: "Research, accounts and asset pages, all off one pipeline." },
]

const STAGES = [
  {
    name: "Ingest",
    sub: "Raw chain state",
    body: "We run our own nodes and archive readers. Raw blocks, receipts and logs land untouched, so nothing upstream can silently change a number we already published.",
    tags: "blocks, logs, receipts",
  },
  {
    name: "Decode",
    sub: "Contracts, by ABI",
    body: "Contracts are decoded against their real ABIs, not guessed from event names. Proxy upgrades are tracked so a market that changed implementation mid-month still reconciles.",
    tags: "ABIs, proxies, upgrades",
  },
  {
    name: "Map",
    sub: "Markets to owners",
    body: "Every market, vault and reserve is mapped to the protocol that owns it and the chain it sits on. This is the step public trackers usually skip, and the reason their splits disagree with ours.",
    tags: "markets, vaults, chains",
  },
  {
    name: "Attribute",
    sub: "Earned, paid, spent, kept",
    body: "Interest is split between suppliers and the protocol, incentive spend is attached to the campaign that caused it, and fees are attributed to the market that earned them. This is where a P&L actually appears.",
    tags: "revenue, incentives, fees",
  },
  {
    name: "Publish",
    sub: "Pages, packs, research",
    body: "The same modelled tables feed client packs, hosted dashboards and public research. There is no separate marketing number, because there is no separate pipeline.",
    tags: "dashboards, P&L, reports",
  },
]

const COVERAGE = [
  { name: "Aave", img: "/images/aave-logo.png", b: "Markets, revenue attribution, incentive spend.", why: "Core and deployed instances.", chains: "Multi-chain" },
  { name: "Morpho", img: "/images/logo-3.png", b: "Vaults and markets, curator behaviour, revenue split.", chains: "Multi-chain" },
  { name: "Moonwell", img: "/images/logo-6.png", b: "Markets, revenue, liquidation and OEV flows.", why: "Delegate role disclosed.", chains: "Base · Optimism" },
  { name: "SparkLend", img: "/images/sparklend-logo.png", b: "Markets, revenue, savings rate cost.", chains: "Multi-chain" },
  { name: "Fluid", img: "/images/fluid-logo.jpg", b: "Markets, revenue, incentive spend.", chains: "Multi-chain" },
  { name: "Euler", img: "/images/euler-logo.jpg", b: "Vaults, markets, revenue attribution.", chains: "Multi-chain" },
  { name: "NAVI", img: "/images/navi-logo.png", b: "Markets, revenue, incentive spend.", chains: "Sui" },
  { name: "Centrifuge", img: "/images/centrifuge-logo.svg", b: "Pools, tranches, real-world asset flows.", chains: "Multi-chain" },
]

const TERMINALS = [
  { t: "Protocol P&L", b: "Earned, paid out, spent on incentives and kept, by chain and by market, closed monthly.", cadence: "Monthly close" },
  { t: "Revenue & reserves", b: "Interest income, supplier share and reserve growth across every modelled market.", cadence: "Hourly" },
  { t: "Incentive campaigns", b: "What each campaign cost, what it brought in, and what stayed after it stopped.", cadence: "Hourly" },
  { t: "Collateral & risk", b: "Concentration, depth, peg behaviour and liquidation flow for listed assets.", cadence: "Hourly" },
  { t: "Liquidations & OEV", b: "Every liquidation decomposed into the four flows that decide who captured the value.", cadence: "Hourly" },
  { t: "State of Lending", b: "The cross-protocol view behind our monthly public report.", cadence: "Monthly" },
]

export default function PlatformPage() {
  return (
    <>
      <Nav active="atlas" />

      <main id="main">
        <PageHead
          title="Atlas"
          lede="The pipeline behind every number on this site."
          support="Eight protocols, fourteen chains, rebuilt from the chain every hour. Client accounts, live pages and public research all come off the same model, so they cannot disagree."
        />

        <section className="sp-section" id="what">
          <div className="sp-wrap">
            <div className="sp-split" style={{ marginBottom: 48 }}>
              <h2 className="sp-h2">One model, not a folder of queries.</h2>
              <div className="sp-prose">
                <p>
                  Atlas is a standing model. Contracts are decoded, markets are mapped and revenue is attributed on a
                  schedule, so a close takes five working days and every figure traces to its run.
                </p>
              </div>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              {PROPERTIES.map((p) => (
                <li key={p.t}>
                  <h3 className="sp-h3">{p.t}</h3>
                  <p>{p.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Band id="pipeline">
          <div className="sp-head">
            <h2 className="sp-h2">
              Chain state in. <em>A defensible number out.</em>
            </h2>
            <p>Five stages, every hour, for every market we model.</p>
          </div>
          <ul className="sp-ledger">
            {STAGES.map((s, i) => (
              <li key={s.name}>
                <h3 className="sp-h3">{s.name}</h3>
                <div>
                  <p>
                    <strong>{s.sub}.</strong> {s.body}
                  </p>
                  <p style={{ marginTop: 8 }}>{s.tags}</p>
                </div>
                <span className="sp-l-meta">
                  Stage {i + 1} of {STAGES.length}
                </span>
              </li>
            ))}
          </ul>
          <p className="sp-small" style={{ marginTop: 22 }}>
            Every published figure resolves to a stage, a run and a timestamp. That is what makes it defensible in a
            forum.
          </p>
        </Band>

        <section className="sp-section" id="coverage">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">What is modelled today.</h2>
            </div>
            <ul className="sp-ledger">
              {COVERAGE.map((c) => (
                <li key={c.name}>
                  <h3 className="sp-h3 sp-l-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt="" />
                    {c.name}
                  </h3>
                  <p>
                    {c.b}
                    {c.why ? ` ${c.why}` : null}
                  </p>
                  <span className="sp-l-meta">{c.chains}</span>
                </li>
              ))}
            </ul>
            <p className="sp-small" style={{ marginTop: 22 }}>
              Fourteen chains in total. If your protocol is not on this list, modelling it is part of onboarding, not a
              reason to say no. Ask on the call how long it would take.
            </p>
          </div>
        </section>

        <section className="sp-section sp-tight" id="dashboards">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Twelve terminals, hosted by us.</h2>
              <p>
                The same figures that appear in our research and in client packs, live, with the time of the last run on
                every page. No third-party dashboard that can change under you.
              </p>
            </div>
            <ul className="sp-ledger">
              {TERMINALS.map((d) => (
                <li key={d.t}>
                  <h3 className="sp-h3">{d.t}</h3>
                  <p>{d.b}</p>
                  <span className="sp-l-meta">
                    {d.cadence} ·{" "}
                    <a className="sp-link" href="/live-dashboards" aria-label={`Open ${d.t}`}>
                      Open
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            <div className="sp-act">
              <a className="sp-btn sp-btn-ink" href="/live-dashboards">Open all dashboards</a>
            </div>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
