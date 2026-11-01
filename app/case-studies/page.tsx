import type { Metadata } from "next"

import { Nav, Footer, PageHead, LINKS } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Case Studies, Datum Labs",
  description:
    "Selected work from Datum Labs. Featured engagements with Moonwell, Coinbase × Shopify, and the protocol roster we operate for.",
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "Case Studies, Datum Labs", url: "/case-studies", type: "website" },
}

type Case = {
  title: string
  href: string
  external: boolean
  logo?: string
  category: string
  body: string
  facts: string
}

const CASES: Case[] = [
  {
    title: "Moonwell OEV Dashboard",
    href: "/case-studies/moonwell-oev",
    external: false,
    logo: "/images/logo-6.png",
    category: "Revenue analytics",
    body: "Tracking how revenue from liquidations is captured and distributed after a governance upgrade. In two weeks: $14K+ revenue, $300K+ to liquidators.",
    facts: "Revenue: $14K+. Incentives: $300K+. Time to insight: 2 weeks.",
  },
  {
    title: "Moonwell Governance Dashboard",
    href: "https://dune.com/jorel/moonwell-governance-dashboard",
    external: true,
    logo: "/images/logo-6.png",
    category: "Governance · multi-chain",
    body: "Aggregates governance activity across all supported chains: on-chain and Snapshot proposals, participation, voters and delegates.",
    facts: "Coverage: multi-chain. Sources: on-chain + Snapshot. Scope: voters + delegates.",
  },
  {
    title: "Commerce Payments Protocol",
    href: "https://dune.com/jorel/commerce-payments-protocol-dashboard",
    external: true,
    category: "Payments · Coinbase × Shopify",
    body: "Tracking user behaviour, protocol performance and adoption for the Coinbase and Shopify Commerce Payments Protocol.",
    facts: "Partners: Coinbase + Shopify. Focus: adoption. Scope: user behaviour.",
  },
  {
    title: "Moonwell Risk Dashboard",
    href: "https://dune.com/jorel/moonwell-protocol-risk-dashboard",
    external: true,
    logo: "/images/logo-6.png",
    category: "Risk · Base + Optimism",
    body: "Evaluates risk across markets on Base and Optimism, monitoring the health factor of individual positions for proactive risk controls.",
    facts: "Chains: Base + Optimism. Focus: health factors. Impact: proactive.",
  },
]

const ROSTER: { img?: string; name: string; tag: string }[] = [
  { img: "/images/aave-logo.png", name: "Aave", tag: "Lending" },
  { img: "/images/logo-3.png", name: "Morpho", tag: "Lending" },
  { img: "/images/logo-5.png", name: "Seamless", tag: "DeFi · Base" },
  { img: "/images/logo-1.png", name: "Falcon Finance", tag: "Stablecoin" },
  { img: "/images/incentiv-logo.png", name: "Incentiv", tag: "L1 · Infra" },
  { img: "/images/logo-7.png", name: "Venus", tag: "Lending · BNB" },
  { img: "/images/sparklend-logo.png", name: "SparkLend", tag: "Lending" },
  { img: "/images/cow-logo.png", name: "CoW Protocol", tag: "DEX · Batch" },
  { img: "/images/level-logo.png", name: "Level", tag: "Staking" },
  { name: "Dexwin", tag: "Prediction" },
  { img: "/images/orbt-logo.jpg", name: "ORBT", tag: "L2" },
  { img: "/images/goldfish-logo.png", name: "Goldfish", tag: "DeFi" },
]

export default function CaseStudies() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead
          title={
            <>
              Receipts. Not <em>case studies.</em>
            </>
          }
          lede="Every engagement below is live, instrumented, and operated by Datum Labs. Numbers are pulled straight from production, same dashboards the protocol team uses to make decisions."
          support="12 active engagements, 4 featured, across 14 chains."
        />

        <section className="sp-section" id="featured">
          <div className="sp-wrap">
            <ul className="sp-ledger">
              {CASES.map((c) => (
                <li key={c.title}>
                  <h3 className={c.logo ? "sp-h3 sp-l-logo" : "sp-h3"}>
                    {c.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={c.logo} alt="" />
                    ) : null}
                    {c.external ? (
                      <a className="sp-link" href={c.href} target="_blank" rel="noopener">
                        {c.title} ↗
                      </a>
                    ) : (
                      <a className="sp-link" href={c.href}>
                        {c.title}
                      </a>
                    )}
                  </h3>
                  <div>
                    <p>{c.body}</p>
                    <p style={{ marginTop: 8 }}>{c.facts}</p>
                  </div>
                  <span className="sp-l-meta">{c.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sp-section sp-tight" id="roster">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Protocols under observation.</h2>
              <p>
                Engagements past and present. Each protocol gets a custom-built data org, pipelines, models, and surfaces
                operated by Datum.
              </p>
            </div>
            <div className="sp-roster">
              {ROSTER.map((p) => (
                <div key={p.name}>
                  {p.img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.img} alt="" />
                  ) : null}
                  <span>
                    {p.name}
                    <small>{p.tag}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="cta">
          <div className="sp-wrap">
            <div className="sp-close">
              <h2 className="sp-h2">Want a write-up like one of these?</h2>
              <div>
                <p className="sp-lede">
                  The fastest way to find out what we&rsquo;d build for you is a 30-minute audit. We&rsquo;ll show you, on
                  your data, where the immediate signal is.
                </p>
                <div className="sp-act">
                  <a className="sp-btn sp-btn-primary" href={LINKS.calendly} target="_blank" rel="noopener">
                    Book a 30-min audit
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
