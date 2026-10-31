import type { Metadata } from "next"
import {
  Clock,
  Path,
  Newspaper,
  UsersThree,
  SealCheck,
  ShieldCheck,
  Receipt,
  Compass,
  ArrowRight,
  Plus,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

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

export default function Home() {
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

        {/* PROOF */}
        <section className="section tint" id="proof">
          <div className="wrap">
            <div className="proof-head">
              <h2 className="spaced">Numbers you can defend in public.</h2>
              <p>Five things you can hold us to, on the record, every month.</p>
            </div>
            <div className="pcards">
              <div className="pcard">
                <span className="svc-ic"><i aria-hidden="true"><Clock weight="duotone" /></i></span>
                <h3>We model every hour</h3>
                <p>Eight protocols, fourteen chains, rebuilt hourly in Atlas.</p>
              </div>
              <div className="pcard">
                <span className="svc-ic"><i aria-hidden="true"><Path weight="duotone" /></i></span>
                <h3>Every figure is traceable</h3>
                <p>Every number resolves to the query, the run and the date it was true.</p>
              </div>
              <div className="pcard">
                <span className="svc-ic"><i aria-hidden="true"><Newspaper weight="duotone" /></i></span>
                <h3>We publish first</h3>
                <p>State of Lending is free, monthly, shown against the public trackers.</p>
              </div>
              <div className="pcard">
                <span className="svc-ic"><i aria-hidden="true"><UsersThree weight="duotone" /></i></span>
                <h3>You know who we are</h3>
                <p>Named people, not an account team. Our delegate role is disclosed.</p>
              </div>
              <div className="pcard">
                <span className="svc-ic"><i aria-hidden="true"><SealCheck weight="duotone" /></i></span>
                <h3>We correct in public</h3>
                <p>Wrong figures are fixed in one working day, wherever the original went.</p>
              </div>
            </div>
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
                  <span className="ic"><i aria-hidden="true"><ShieldCheck weight="duotone" /></i></span>
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
                  <span className="ic"><i aria-hidden="true"><Receipt weight="duotone" /></i></span>
                  <span className="cell-name">Management Accounts</span>
                  <i className="svc-go" aria-hidden="true"><ArrowRight /></i>
                </h3>
                <p>Your accounts every month: earned, paid out, spent on incentives, kept, by chain and by market.</p>
              </a>
              <a className="cell" href="/services/fpa-desk">
                <h3>
                  <span className="ic"><i aria-hidden="true"><Compass weight="duotone" /></i></span>
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
