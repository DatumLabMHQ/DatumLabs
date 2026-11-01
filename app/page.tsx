import type { Metadata } from "next"
import {
  ArrowRight,
  Plus,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
import { readFileSync } from "fs"
import path from "path"

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

const FAQ = [
  {
    q: "What exactly do I get each month?",
    a: (
      <>
        <p>
          A one-page P&amp;L: earned, paid out, spent on incentives, kept, by chain and by market. Alongside it, two to
          four pages reading the movement.
        </p>
        <p>Plus a live page, rebuilt hourly, and a named analyst on a monthly call.</p>
      </>
    ),
    open: true,
  },
  {
    q: "What happens when someone disputes a number?",
    a: (
      <p>
        A written answer the same working day, with both figures and the reason for the gap. Usually it is scope: what
        counts as revenue, whether incentives are netted, which chains are in.
      </p>
    ),
  },
  {
    q: "Why do your numbers differ from the public trackers?",
    a: (
      <>
        <p>
          We map every market, vault and reserve to the protocol that owns it before attributing revenue. Most trackers
          skip that step, so their splits disagree on multi-chain deployments and curated vaults.
        </p>
        <p>We never hide the difference. Every published figure carries the tracker figure beside it.</p>
      </>
    ),
  },
  {
    q: "What happens to my page if I stop working with you?",
    a: (
      <>
        <p>It stays up, with your history in it, frozen at the last month we closed. The page is yours.</p>
        <p>What you give up is us: the monthly close, the reading, and the numbers kept current.</p>
      </>
    ),
  },
]

/** Daily sector TVL ($M) from our published read: The State of Lending on
 *  Sui, May and June 2026 (content/reports/state-of-lending-sui-may-june-2026.mdx).
 *  Parsed from the report itself so the chart and the report can never disagree. */
function suiSectorSeries(): number[] {
  try {
    const src = readFileSync(
      path.join(process.cwd(), "content", "reports", "state-of-lending-sui-may-june-2026.mdx"),
      "utf8",
    )
    return (src.match(/Sector: ([0-9.]+)/g) || []).map((v) => parseFloat(v.slice(8)))
  } catch {
    return []
  }
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null
  const W = 760, H = 180, PAD = 6
  const min = Math.min(...data), max = Math.max(...data)
  const x = (i: number) => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = (v: number) => PAD + (1 - (v - min) / (max - min)) * (H - PAD * 2 - 14)
  const pts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${PAD},${H - 8} ${pts} ${(W - PAD).toFixed(1)},${H - 8}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Daily Sui lending sector TVL, May to June 2026">
      <polygon points={area} fill="var(--sapphire-500)" opacity="0.08" />
      <polyline points={pts} fill="none" stroke="var(--sapphire-500)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="4" fill="var(--sapphire-600)" />
    </svg>
  )
}

export default function Home() {
  const reports = getAllReports()
  const reportCount = reports.length
  const latest = reports.filter((r) => r.cover).slice(0, 3)
  const series = suiSectorSeries()
  return (
    <>
      <PageRules />
      <NavV3 navDark />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <main id="main">
        {/* HERO */}
        <section className="hero" data-nav-dark data-theme="dark">
          <div className="hero-bg">
            {/* The handoff's brand video loop was never exported; the sapphire
                dither field (dither.js) carries the motion until one exists. */}
            <canvas data-dither aria-hidden="true" />
          </div>
          <div className="wrap hero-inner">
            <div className="hero-split">
              <h1 className="spaced" data-anim-words>
                Financial data and reporting for blockchain protocols.
              </h1>
              <div className="hero-aside">
                <p className="lede">
                  What your protocol earned, paid out, spent and kept last month. Every figure traceable to the run
                  behind it.
                </p>
                <div className="hero-ctas">
                  <a className="btn btn-primary" href="/contact">Contact us</a>
                </div>
                <div className="hero-stats">
                  <div><b>8</b><span>Protocols modelled hourly</span></div>
                  <div><b>14</b><span>Chains</span></div>
                  <div><b>{reportCount}</b><span>Public reports</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAT BAND — real figures from our published Sui read */}
        <section className="proofband" data-nav-light>
          <div className="wrap">
            <div className="proofband-grid">
              <div>
                <div className="crumb">From our published read &middot; Sui lending &middot; May&ndash;June 2026</div>
                <div className="proofband-num">$355.6M<sup>&minus;20.4%</sup></div>
                <p className="proofband-sub">
                  Sector TVL at the June close, tracked daily across five protocols. Borrowers left in May.
                  Suppliers left in June. We published both months, with every figure traceable.
                </p>
                <a className="link-arrow" href="/resources/reports/state-of-lending-sui-may-june-2026">Read the report &rarr;</a>
              </div>
              <div className="proofband-chart">
                <Sparkline data={series} />
                <div className="proofband-cap">
                  <span>May 01 &mdash; Jun 30 &middot; daily close</span>
                  <span>61 observations &middot; five protocols</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROTOCOL ROSTER */}
        <section className="section" id="roster">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Protocols we&rsquo;ve analysed.</h2>
              <p>Eight modelled hourly in Atlas. The rest written up in public.</p>
            </div>
            <div className="cells cells-5">
              {ROSTER.map((p) => (
                <div className="logo-cell" key={p.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE GAP */}
        <section className="section" id="net" data-pin data-pin-top data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap">
            <div className="lead-split">
              <h2 className="spaced">You know your TVL. You probably don&rsquo;t know your net.</h2>
              <div className="prose">
                <p>
                  You earn interest, pay most of it to suppliers, and spend tokens to pull deposits in. Those numbers
                  sit in three places and nobody reconciles them.
                </p>
                <p>
                  Ask whether you made money on Base last quarter and the honest answer is a guess. We add it up
                  monthly, by chain and by market.
                </p>
                <p>
                  Then the part that matters: which markets carry you, which cost you money, and what last
                  quarter&rsquo;s rewards actually bought.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIMEN — the artifact itself */}
        <section className="section" id="specimen" data-nav-light>
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">This is what the answer looks like.</h2>
              <p>One page, every month: your whole protocol added up, with the working behind every line.</p>
            </div>
            <div className="spec-row">
              <figure className="spec-doc" data-reveal aria-label="Specimen monthly close, illustrative figures">
                <div className="spec-top">
                  <div>
                    <div className="spec-kicker">Datum Labs &middot; Monthly close</div>
                    <div className="spec-title">Example Protocol &mdash; October 2026</div>
                  </div>
                  <span className="spec-badge">Specimen &middot; illustrative figures</span>
                </div>
                <table className="spec-lines">
                  <tbody>
                    <tr><td>Interest earned</td><td>$4.21M</td></tr>
                    <tr className="indent"><td>Paid to suppliers</td><td>&minus;$3.12M</td></tr>
                    <tr><td>Net interest margin</td><td>$1.09M</td></tr>
                    <tr className="indent"><td>Incentive spend</td><td>&minus;$0.62M</td></tr>
                    <tr><td>Liquidation &amp; other revenue</td><td>$0.18M</td></tr>
                    <tr className="net"><td>Net kept</td><td>$0.65M</td></tr>
                  </tbody>
                </table>
                <div className="spec-chains">
                  <span className="spec-chain">Ethereum <b>$0.41M</b></span>
                  <span className="spec-chain">Base <b>$0.19M</b></span>
                  <span className="spec-chain">Arbitrum <b>$0.05M</b></span>
                  <span className="spec-chain">+ by market, inside</span>
                </div>
                <figcaption className="spec-foot">
                  <span>Every figure &rarr; query &middot; run &middot; date</span>
                  <span>Rebuilt hourly in Atlas</span>
                </figcaption>
              </figure>
              <div className="spec-notes" data-reveal>
                <div className="spec-note">
                  <span className="n">01</span>
                  <div>
                    <h3>The net, not the TVL</h3>
                    <p>Interest earned, paid out, spent on incentives, kept &mdash; reconciled into one line nobody else closes, by chain and by market.</p>
                  </div>
                </div>
                <div className="spec-note">
                  <span className="n">02</span>
                  <div>
                    <h3>Every figure is traceable</h3>
                    <p>Each line resolves to the query, the run and the date it was true. When someone disputes a number in your forum, you answer with the working.</p>
                  </div>
                </div>
                <div className="spec-note">
                  <span className="n">03</span>
                  <div>
                    <h3>Yours in 48 hours, free</h3>
                    <p>Send a protocol name and we return last month&rsquo;s page &mdash; the real one, for your protocol, with your numbers. No call required.</p>
                  </div>
                </div>
                <div className="spec-cta">
                  <a className="link-arrow" href="/contact">Get your free Snapshot →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="section tint" id="proof">
          <div className="wrap">
            <div className="proof-head">
              <h2 className="spaced">Numbers you can defend in public.</h2>
              <p>Five things you can hold us to, on the record, every month.</p>
            </div>
            <ol className="ledger">
              <li><span className="lg-n">01</span><h3>We model every hour</h3><p>Eight protocols, fourteen chains, rebuilt hourly in Atlas.</p></li>
              <li><span className="lg-n">02</span><h3>Every figure is traceable</h3><p>Every number resolves to the query, the run and the date it was true.</p></li>
              <li><span className="lg-n">03</span><h3>We publish first</h3><p>State of Lending is free, monthly, shown against the public trackers.</p></li>
              <li><span className="lg-n">04</span><h3>You know who we are</h3><p>Named people, not an account team. Our delegate role is disclosed.</p></li>
              <li><span className="lg-n">05</span><h3>We correct in public</h3><p>Wrong figures are fixed in one working day, wherever the original went.</p></li>
            </ol>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services" data-nav-light>
          <div className="wrap">
            <div className="who-plate who-plate-centre" data-theme="dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
              <div className="who-plate-inner">
                <h2>Three services.</h2>
                <p>
                  One gets your token accepted as collateral. One closes your books every month. One runs the whole
                  finance function.
                </p>
              </div>
            </div>
            <div className="cells cells-3 who-cells">
              <a className="cell" href="/services/collateral-file">
                <h3>
                  <span className="cell-name">Collateral File</span>
                  <i className="svc-go" aria-hidden="true"><ArrowRight /></i>
                </h3>
                <p>
                  The file a lending market&rsquo;s risk team wants to read before accepting your token as collateral,
                  with the live asset page behind it.
                </p>
              </a>
              <a className="cell" href="/services/management-accounts">
                <h3>
                  <span className="cell-name">Management Accounts</span>
                  <i className="svc-go" aria-hidden="true"><ArrowRight /></i>
                </h3>
                <p>Your accounts every month: earned, paid out, spent on incentives, kept, by chain and by market.</p>
              </a>
              <a className="cell" href="/services/fpa-desk">
                <h3>
                  <span className="cell-name">FP&amp;A Desk</span>
                  <i className="svc-go" aria-hidden="true"><ArrowRight /></i>
                </h3>
                <p>
                  Everything in Management Accounts, plus targets, budget against actual, every campaign scored, and a
                  weekly call.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* RESEARCH STRIP — real covers, latest three */}
        <section className="section" id="latest-research" data-nav-light>
          <div className="wrap">
            <div className="section-head head-split">
              <h2 className="spaced">Research shaping protocol finance.</h2>
              <a className="link-arrow" href="/research">All research &rarr;</a>
            </div>
            <div className="home-rgrid">
              {latest.map((r) => (
                <article className="rcard" key={r.slug}>
                  <div className="rcard-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover} alt="" loading="lazy" />
                  </div>
                  <div className="rcard-body">
                    <div className="rcard-meta">
                      <span className="pill">Reports</span>
                      {r.period ? <span className="pill pill-quiet">{r.period}</span> : null}
                    </div>
                    <h3><a className="rcard-link" href={`/resources/reports/${r.slug}`}>{r.title}</a></h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tint" id="faq" data-nav-light>
          <div className="wrap" style={{ position: "relative" }}>
            <div className="faq-split">
              <h2 className="faq-label">FAQ</h2>
              <div className="faq">
                {FAQ.map((item) => (
                  <div className={item.open ? "faq-item open" : "faq-item"} key={item.q}>
                    <button className="faq-q" aria-expanded={item.open ? "true" : "false"}>
                      {item.q}
                      <span className="faq-mark"><i aria-hidden="true"><Plus /></i></span>
                    </button>
                    <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
