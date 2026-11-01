import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, LINKS } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Analytics, Datum Labs",
  description:
    "Live pages, monitoring and a named analyst, built on Atlas and kept current every hour.",
  alternates: { canonical: "/analytics" },
  openGraph: { title: "Analytics, Datum Labs", url: "/analytics", type: "website" },
}

const DO = [
  { t: "Live pages", b: "Bespoke pages, built with you, hosted by us on Atlas." },
  { t: "Pipeline", b: "Archive nodes to warehouse. We run the stack." },
  { t: "Semantic models", b: "A user is a user, a position is a position." },
  { t: "Monitoring", b: "Alerts when something moves outside the band." },
  { t: "Embedded analyst", b: "Weekly reads, deep dives, governance memos." },
  { t: "Data dApps", b: "Contract, indexer and front-end, shipped together." },
]

const STAGES = [
  { name: "Audit", sub: "30 minutes, free", ships: "memo, opportunities, scope" },
  { name: "Instrument", sub: "Two-week sprint", ships: "pipeline, schema, first page" },
  { name: "Model", sub: "Protocol-aware", ships: "semantic layer, cohorts, KPIs" },
  { name: "Operate", sub: "Weekly", ships: "reads, alerts, on-call" },
  { name: "Hand over", sub: "Optional", ships: "runbook, training, 90-day support" },
]

const TIERS = [
  {
    t: "Strategic Data Partnership",
    b: "Weekly performance reads, maintained pipelines and bi-weekly office hours. ROI on every initiative.",
    meta: "For scaling protocols",
  },
  {
    t: "Complete Growth Intelligence",
    b: "A dedicated analyst in your standups. Automated alerts, unlimited deep dives, on-call for launches.",
    meta: "Embedded analyst",
  },
  {
    t: "End-to-End Product Lab",
    b: "Smart contracts, data-integrated dApps and custom analytics infrastructure. Built, shipped, supported.",
    meta: "Complete technical arm",
  },
]

export default function AnalyticsPage() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead
          title={
            <>
              Analytics that <em>closes the loop.</em>
            </>
          }
          lede="Live pages, monitoring and a named analyst, built on Atlas and kept current every hour."
          support="Not another deck. Someone who lives in your data and answers the same working day."
        />

        <section className="sp-section" id="what">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Six things we do, well.</h2>
              <p>Deliberately narrow. Everything below has shipped to production for a paying protocol.</p>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              {DO.map((d) => (
                <li key={d.t}>
                  <h3 className="sp-h3">{d.t}</h3>
                  <p>{d.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sp-section sp-tight" id="how">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">How an engagement runs.</h2>
              <p>Five stages. The depth changes, the shape does not.</p>
            </div>
            <ul className="sp-ledger">
              {STAGES.map((s, i) => (
                <li key={s.name}>
                  <h3 className="sp-h3">{s.name}</h3>
                  <p>
                    <strong>{s.sub}.</strong> What ships: {s.ships}.
                  </p>
                  <span className="sp-l-meta">
                    Stage {i + 1} of {STAGES.length}
                  </span>
                </li>
              ))}
            </ul>
            <p className="sp-small" style={{ marginTop: 22 }}>
              You leave the audit with a memo and a scope whether you hire us or not.
            </p>
          </div>
        </section>

        <Band id="tiers">
          <div className="sp-head">
            <h2 className="sp-h2">Three ways to work together.</h2>
            <p>The depth scales to your maturity. The right level of presence for what you are shipping.</p>
          </div>
          <ul className="sp-ledger">
            {TIERS.map((t) => (
              <li key={t.t}>
                <h3 className="sp-h3">
                  <a className="sp-link" href="/contact">{t.t}</a>
                </h3>
                <p>{t.b}</p>
                <span className="sp-l-meta">{t.meta}</span>
              </li>
            ))}
          </ul>
        </Band>

        <section className="sp-section" id="cta">
          <div className="sp-wrap">
            <div className="sp-close">
              <h2 className="sp-h2">
                Thirty minutes. <em>Three opportunities.</em>
              </h2>
              <div>
                <p className="sp-lede">
                  We review your data infrastructure and name three things you could act on this quarter. You keep the
                  memo either way.
                </p>
                <div className="sp-act">
                  <a className="sp-btn sp-btn-primary" href={LINKS.calendly} target="_blank" rel="noopener">
                    Book the audit
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
