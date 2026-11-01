import type { Metadata } from "next"

import { Rosette } from "@/components/print/ornament"
import { Nav, Footer, Band, Statement, GuillocheBand } from "@/components/print/print-parts"
import { getAllReports } from "@/lib/reports"

export const metadata: Metadata = {
  title: "Datum Labs — Financial Data & Reporting for Blockchain Protocols",
  description:
    "Datum Labs is a financial data and reporting service for blockchain protocols. We tell you what your protocol earned, paid out, spent and kept last month, and what it means.",
  alternates: { canonical: "/" },
}

const ROSTER = [
  { img: "/images/aave-logo.png", name: "Aave" },
  { img: "/images/logo-6.png", name: "Moonwell" },
  { img: "/images/logo-3.png", name: "Morpho" },
  { img: "/images/navi-logo.png", name: "NAVI" },
  { img: "/images/sparklend-logo.png", name: "SparkLend" },
  { img: "/images/cow-logo.png", name: "CoW Protocol" },
  { img: "/images/logo-5.png", name: "Seamless" },
  { img: "/images/logo-7.png", name: "Venus" },
  { img: "/images/level-logo.png", name: "Level" },
  { img: "/images/logo-1.png", name: "Falcon Finance" },
  { img: "/images/onchain-labs-logo.png", name: "Onchain Labs" },
  { img: "/images/incentiv-logo.png", name: "Incentiv" },
  { img: "/images/orbt-logo.svg", name: "ORBT" },
  { img: "/images/goldfish-logo.png", name: "Goldfish" },
]

const SERVICES = [
  {
    name: "Collateral File",
    href: "/services/collateral-file",
    body: "The file a lending market’s risk team wants to read before accepting your token as collateral, with the live asset page behind it.",
    cadence: "Five working days",
  },
  {
    name: "Management Accounts",
    href: "/services/management-accounts",
    body: "Your accounts every month: earned, paid out, spent on incentives, kept, by chain and by market.",
    cadence: "Monthly, working day five",
  },
  {
    name: "FP&A Desk",
    href: "/services/fpa-desk",
    body: "Everything in Management Accounts, plus targets, budget against actual, every campaign scored, and a weekly call.",
    cadence: "Weekly call, monthly pack",
  },
]

const TERMS = [
  { t: "We model every hour", b: "Eight protocols, fourteen chains, rebuilt hourly in Atlas." },
  { t: "Every figure is traceable", b: "Every number resolves to the query, the run and the date it was true." },
  { t: "We publish first", b: "State of Lending is free, monthly, shown against the public trackers." },
  { t: "You know who we are", b: "Named people, not an account team. Our delegate role is disclosed." },
  { t: "We correct in public", b: "Wrong figures are fixed in one working day, wherever the original went." },
]

const FAQ = [
  {
    q: "What exactly do I get each month?",
    a: [
      "A one-page P&L: earned, paid out, spent on incentives, kept, by chain and by market. Alongside it, two to four pages reading the movement.",
      "Plus a live page, rebuilt hourly, and a named analyst on a monthly call.",
    ],
  },
  {
    q: "What happens when someone disputes a number?",
    a: [
      "A written answer the same working day, with both figures and the reason for the gap. Usually it is scope: what counts as revenue, whether incentives are netted, which chains are in.",
    ],
  },
  {
    q: "Why do your numbers differ from the public trackers?",
    a: [
      "We map every market, vault and reserve to the protocol that owns it before attributing revenue. Most trackers skip that step, so their splits disagree on multi-chain deployments and curated vaults.",
      "We never hide the difference. Every published figure carries the tracker figure beside it.",
    ],
  },
  {
    q: "What happens to my page if I stop working with you?",
    a: [
      "It stays up, with your history in it, frozen at the last month we closed. The page is yours.",
      "What you give up is us: the monthly close, the reading, and the numbers kept current.",
    ],
  },
]

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.datumlab.xyz/#org",
      name: "Datum Labs",
      url: "https://www.datumlab.xyz",
      logo: "https://www.datumlab.xyz/brand/logo-mark-blue.svg",
      description:
        "Datum Labs is a financial data and reporting service for blockchain protocols. What your protocol earned, paid out, spent and kept, every figure traceable to the run behind it.",
      email: "hello@datumlab.xyz",
      sameAs: ["https://x.com/Datumlabs_", "https://www.linkedin.com/showcase/dat-umlab/", "https://dune.com/jorel"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.datumlab.xyz/#site",
      url: "https://www.datumlab.xyz",
      name: "Datum Labs",
      publisher: { "@id": "https://www.datumlab.xyz/#org" },
    },
  ],
}

export default function Home() {
  const reports = getAllReports().filter((r) => r.cover)
  const [feature, ...rest] = reports
  const side = rest.slice(0, 2)

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <main id="main">
        <section className="sp-hero">
          <Rosette />
          <div className="sp-wrap">
            <div className="sp-hero-grid">
              <div>
                <h1 className="sp-h1">
                  Financial data and reporting for <em>blockchain protocols.</em>
                </h1>
                <p className="sp-lede">
                  What your protocol earned, paid out, spent and kept last month. Every figure traceable to the run
                  behind it.
                </p>
                <div className="sp-act">
                  <a className="sp-btn sp-btn-primary" href="/contact">Get your free Snapshot</a>
                  <span className="sp-note">Back inside 48 hours, no call needed.</span>
                </div>
              </div>

              <Statement
                title="Statement of net"
                subtitle="Example Protocol, October 2026"
                label="Specimen statement of net with illustrative figures"
                lines={[
                  { label: "Interest earned", value: "$4,210,000" },
                  { label: "Paid to suppliers", value: "(3,120,000)", sub: true },
                  { label: "Incentive spend", value: "(620,000)", sub: true },
                  { label: "Liquidation and other revenue", value: "180,000" },
                ]}
                kept="$650,000"
                micr={[
                  { glyph: "⑆", text: "RUN 2026-10-31T06:00Z", tip: "The Atlas run that produced every figure on this page." },
                  { glyph: "⑈", text: "Q 7F3A·21C9", tip: "The query behind the figures, so anyone can rerun it." },
                  { glyph: "⑉", text: "14 CHAINS", tip: "Coverage: every chain the protocol is deployed on." },
                ]}
              />
            </div>
          </div>
        </section>

        <Band className="sp-after-hero">
          <div className="sp-split">
            <h2 className="sp-h2">
              You know your TVL. <em>You probably don&rsquo;t know your net.</em>
            </h2>
            <div className="sp-prose">
              <p>
                You earn interest, pay most of it to suppliers, and spend tokens to pull deposits in. Those numbers sit
                in three places and nobody reconciles them.
              </p>
              <p>
                Ask whether you made money on Base last quarter and the honest answer is a guess. We add it up monthly,
                by chain and by market.
              </p>
              <p>
                Then the part that matters: which markets carry you, which cost you money, and what last quarter&rsquo;s
                rewards actually bought.
              </p>
            </div>
          </div>
        </Band>

        <section className="sp-section" id="roster">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Protocols we&rsquo;ve analysed.</h2>
              <p>Eight modelled hourly in Atlas. The rest written up in public.</p>
            </div>
            <div className="sp-roster">
              {ROSTER.map((p) => (
                <div key={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="services">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Three services.</h2>
              <p>
                One gets your token accepted as collateral. One closes your books every month. One runs the whole
                finance function.
              </p>
            </div>
            <ul className="sp-ledger">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <h3 className="sp-h3"><a className="sp-link" href={s.href}>{s.name}</a></h3>
                  <p>{s.body}</p>
                  <span className="sp-l-meta">{s.cadence}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sp-section sp-tight" id="terms">
          <div className="sp-wrap">
            <div className="sp-cert">
              <div className="sp-cert-in">
                <GuillocheBand />
                <div className="sp-cert-body">
                  <h2 className="sp-h2">Numbers you can defend in public.</h2>
                  <p>Five terms you can hold us to, on the record, every month.</p>
                  <ul className="sp-ledger sp-ledger-2">
                    {TERMS.map((t) => (
                      <li key={t.t}>
                        <h3 className="sp-h3">{t.t}</h3>
                        <p>{t.b}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="sp-cert-sign">
                    <div><b>Aborode Olusegun</b><span>Co-founder, data analyst</span></div>
                    <div><b>Joel Obafemi</b><span>Co-founder, data analyst</span></div>
                    <div><b>Joshua Obafemi</b><span>Data engineer, Atlas</span></div>
                  </div>
                </div>
                <GuillocheBand />
              </div>
            </div>
          </div>
        </section>

        {feature ? (
          <section className="sp-section sp-tight" id="research">
            <div className="sp-wrap">
              <div className="sp-head">
                <h2 className="sp-h2">Research, in public.</h2>
                <a className="sp-link" href="/research">All research</a>
              </div>
              <div className="sp-covers">
                <a className="sp-cover sp-cover-feature" href={`/resources/reports/${feature.slug}`}>
                  <div className="sp-cover-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={feature.cover} alt="" />
                  </div>
                  <h3 className="sp-h3">{feature.title}</h3>
                  {feature.period ? <div className="sp-cover-m">{feature.period}</div> : null}
                  {feature.excerpt || feature.summary ? <p>{feature.excerpt || feature.summary}</p> : null}
                </a>
                <div className="sp-covers-side">
                  {side.map((r) => (
                    <a className="sp-cover" key={r.slug} href={`/resources/reports/${r.slug}`}>
                      <div className="sp-cover-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.cover} alt="" loading="lazy" />
                      </div>
                      <h3 className="sp-h3">{r.title}</h3>
                      {r.period ? <div className="sp-cover-m">{r.period}</div> : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="sp-section sp-tight" id="faq">
          <div className="sp-wrap">
            <div className="sp-split sp-split-wide">
              <h2 className="sp-h2">Questions protocols ask first.</h2>
              <div className="sp-faq">
                {FAQ.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <div className="sp-faq-a">
                      {f.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="start">
          <div className="sp-wrap">
            <div className="sp-close">
              <h2 className="sp-h2">
                Send a protocol name. <em>Get last month back.</em>
              </h2>
              <div>
                <p className="sp-lede">One page, free, inside 48 hours. If it is useful, we talk. If not, you keep the page.</p>
                <div className="sp-act">
                  <a className="sp-btn sp-btn-primary" href="/contact">Get your free Snapshot</a>
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
