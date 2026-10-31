import type { Metadata } from "next"
import {
  ChartLine,
  Database,
  TreeStructure,
  BellRinging,
  UserFocus,
  Code,
  MagnifyingGlass,
  Wrench,
  Pulse,
  HandCoins,
  ChartBar,
  Stack,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Analytics, Datum Labs",
  description:
    "Live pages, monitoring and a named analyst, built on Atlas and kept current every hour.",
  alternates: { canonical: "/analytics" },
  openGraph: { title: "Analytics, Datum Labs", url: "/analytics", type: "website" },
}

export default function AnalyticsPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Analytics that <span className="it">closes the loop.</span></h1>
            <p className="lede">Live pages, monitoring and a named analyst, built on Atlas and kept current every hour.</p>
            <p className="support">Not another deck. Someone who lives in your data and answers the same working day.</p>
          </div>
        </section>

        <section className="section tint" id="what">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Six things we do, well.</h2>
              <p>Deliberately narrow. Everything below has shipped to production for a paying protocol.</p>
            </div>
            <div className="cells cells-6">
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><ChartLine weight="duotone" /></i></span><h3>Live pages</h3><p>Bespoke pages, built with you, hosted by us on Atlas.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Database weight="duotone" /></i></span><h3>Pipeline</h3><p>Archive nodes to warehouse. We run the stack.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><TreeStructure weight="duotone" /></i></span><h3>Semantic models</h3><p>A user is a user, a position is a position.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><BellRinging weight="duotone" /></i></span><h3>Monitoring</h3><p>Alerts when something moves outside the band.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><UserFocus weight="duotone" /></i></span><h3>Embedded analyst</h3><p>Weekly reads, deep dives, governance memos.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><Code weight="duotone" /></i></span><h3>Data dApps</h3><p>Contract, indexer and front-end, shipped together.</p></div>
            </div>
          </div>
        </section>

        <section data-pin className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">How an engagement runs.</h2>
              <p>Five stages. The depth changes, the shape does not. Hover a stage to see what ships.</p>
            </div>
            <div className="pipeline" data-callout-default="You leave the audit with a memo and a scope whether you hire us or not.">
              <div className="pipeline-grid">
                <div className="pipeline-stage"><div className="stage-ic"><i aria-hidden="true"><MagnifyingGlass weight="duotone" /></i></div><div className="stage-name">Audit</div><div className="stage-sub">30 minutes, free</div><div className="stage-items"><span>memo</span><span>opportunities</span><span>scope</span></div></div>
                <div className="pipeline-stage"><div className="stage-ic"><i aria-hidden="true"><Wrench weight="duotone" /></i></div><div className="stage-name">Instrument</div><div className="stage-sub">Two-week sprint</div><div className="stage-items"><span>pipeline</span><span>schema</span><span>first page</span></div></div>
                <div className="pipeline-stage"><div className="stage-ic"><i aria-hidden="true"><TreeStructure weight="duotone" /></i></div><div className="stage-name">Model</div><div className="stage-sub">Protocol-aware</div><div className="stage-items"><span>semantic layer</span><span>cohorts</span><span>KPIs</span></div></div>
                <div className="pipeline-stage"><div className="stage-ic"><i aria-hidden="true"><Pulse weight="duotone" /></i></div><div className="stage-name">Operate</div><div className="stage-sub">Weekly</div><div className="stage-items"><span>reads</span><span>alerts</span><span>on-call</span></div></div>
                <div className="pipeline-stage"><div className="stage-ic"><i aria-hidden="true"><HandCoins weight="duotone" /></i></div><div className="stage-name">Hand over</div><div className="stage-sub">Optional</div><div className="stage-items"><span>runbook</span><span>training</span><span>90-day support</span></div></div>
              </div>
              <div className="pipeline-callout">You leave the audit with a memo and a scope whether you hire us or not.</div>
            </div>
          </div>
        </section>

        <section className="section dark-band" id="tiers" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Three ways to work together.</h2>
              <p>The depth scales to your maturity. The right level of presence for what you are shipping.</p>
            </div>
            <div className="tcards">
              <a className="tcard" href="/contact">
                <span className="svc-ic"><i aria-hidden="true"><ChartBar weight="duotone" /></i></span>
                <h3>Strategic Data Partnership<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>Weekly performance reads, maintained pipelines and bi-weekly office hours. ROI on every initiative.</p>
                <span className="split-meta">For scaling protocols</span>
              </a>
              <a className="tcard" href="/contact">
                <span className="svc-ic"><i aria-hidden="true"><UserFocus weight="duotone" /></i></span>
                <h3>Complete Growth Intelligence<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>A dedicated analyst in your standups. Automated alerts, unlimited deep dives, on-call for launches.</p>
                <span className="split-meta">Embedded analyst</span>
              </a>
              <a className="tcard" href="/contact">
                <span className="svc-ic"><i aria-hidden="true"><Stack weight="duotone" /></i></span>
                <h3>End-to-End Product Lab<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>Smart contracts, data-integrated dApps and custom analytics infrastructure. Built, shipped, supported.</p>
                <span className="split-meta">Complete technical arm</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="cta" data-light-plate>
          <div className="split-outer">
            <div className="ctaplate">
              <div className="ctaplate-inner">
                <div>
                  <h2>Thirty minutes. Three opportunities.</h2>
                  <p>We review your data infrastructure and name three things you could act on this quarter. You keep the memo either way.</p>
                </div>
                <a className="btn" href="https://calendly.com/datumlabss/30min" target="_blank" rel="noopener">Book the audit</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
