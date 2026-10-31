import type { Metadata } from "next"
import {
  Clock,
  Fingerprint,
  Scales,
  HardDrives,
  LockKey,
  GitBranch,
  Database,
  BracketsCurly,
  GitFork,
  Broadcast,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Atlas, the Datum Labs platform",
  description:
    "Atlas models eight lending protocols across fourteen chains, every hour. It is the pipeline behind every report and every live page we publish.",
  alternates: { canonical: "/platform" },
  openGraph: { title: "Atlas, the Datum Labs platform", url: "/platform", type: "website" },
}

export default function PlatformPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Atlas</h1>
            <p className="lede">The pipeline behind every number on this site.</p>
            <p className="support">Eight protocols, fourteen chains, rebuilt from the chain every hour. Client accounts, live pages and public research all come off the same model, so they cannot disagree.</p>
          </div>
        </section>

        <section className="section tint" id="what">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">One model, not a folder of queries.</h2>
              <p>Atlas is a standing model. Contracts are decoded, markets are mapped and revenue is attributed on a schedule, so a close takes five working days and every figure traces to its run.</p>
            </div>
            <div className="cells cells-6">
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><Clock weight="duotone" /></i></span><h3>Hourly</h3><p>Every market rebuilt from chain state, every hour.</p></div>
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><Fingerprint weight="duotone" /></i></span><h3>Traceable</h3><p>Every figure resolves to a query, a run and a date.</p></div>
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><Scales weight="duotone" /></i></span><h3>Reconciled</h3><p>Revenue shown against the public trackers, with any gap explained.</p></div>
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><HardDrives weight="duotone" /></i></span><h3>Hosted by us</h3><p>Twelve live terminals, run by us, not a third party.</p></div>
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><LockKey weight="duotone" /></i></span><h3>Your page, kept</h3><p>Your page stays up if you leave, frozen at the last close.</p></div>
              <div className="cell cell-stack">
                <span className="svc-ic"><i aria-hidden="true"><GitBranch weight="duotone" /></i></span><h3>One source</h3><p>Research, accounts and asset pages, all off one pipeline.</p></div>
            </div>
          </div>
        </section>

        <section data-pin className="section" id="pipeline">
          <div className="wrap">
            <div className="section-head">
              <h2>Chain state in. A defensible number out.</h2>
              <p style={{ color: "var(--dim)" }}>Five stages, every hour, for every market we model. Hover a stage to see what it does.</p>
            </div>
            <div className="pipeline" data-callout-default="Every published figure resolves to a stage, a run and a timestamp. That is what makes it defensible in a forum.">
              <div className="pipeline-grid">
                <div className="pipeline-stage" data-callout="We run our own nodes and archive readers. Raw blocks, receipts and logs land untouched, so nothing upstream can silently change a number we already published.">
                  <div className="stage-ic"><i aria-hidden="true"><Database weight="duotone" /></i></div><div className="stage-name">Ingest</div><div className="stage-sub">Raw chain state</div>
                  <div className="stage-items"><span>blocks</span><span>logs</span><span>receipts</span></div>
                </div>
                <div className="pipeline-stage" data-callout="Contracts are decoded against their real ABIs, not guessed from event names. Proxy upgrades are tracked so a market that changed implementation mid-month still reconciles.">
                  <div className="stage-ic"><i aria-hidden="true"><BracketsCurly weight="duotone" /></i></div><div className="stage-name">Decode</div><div className="stage-sub">Contracts, by ABI</div>
                  <div className="stage-items"><span>ABIs</span><span>proxies</span><span>upgrades</span></div>
                </div>
                <div className="pipeline-stage" data-callout="Every market, vault and reserve is mapped to the protocol that owns it and the chain it sits on. This is the step public trackers usually skip, and the reason their splits disagree with ours.">
                  <div className="stage-ic"><i aria-hidden="true"><GitFork weight="duotone" /></i></div><div className="stage-name">Map</div><div className="stage-sub">Markets to owners</div>
                  <div className="stage-items"><span>markets</span><span>vaults</span><span>chains</span></div>
                </div>
                <div className="pipeline-stage" data-callout="Interest is split between suppliers and the protocol, incentive spend is attached to the campaign that caused it, and fees are attributed to the market that earned them. This is where a P&L actually appears.">
                  <div className="stage-ic"><i aria-hidden="true"><Scales weight="duotone" /></i></div><div className="stage-name">Attribute</div><div className="stage-sub">Earned, paid, spent, kept</div>
                  <div className="stage-items"><span>revenue</span><span>incentives</span><span>fees</span></div>
                </div>
                <div className="pipeline-stage" data-callout="The same modelled tables feed client packs, hosted dashboards and public research. There is no separate marketing number, because there is no separate pipeline.">
                  <div className="stage-ic"><i aria-hidden="true"><Broadcast weight="duotone" /></i></div><div className="stage-name">Publish</div><div className="stage-sub">Pages, packs, research</div>
                  <div className="stage-items"><span>dashboards</span><span>P&amp;L</span><span>reports</span></div>
                </div>
              </div>
              <div className="pipeline-callout">Every published figure resolves to a stage, a run and a timestamp. That is what makes it defensible in a forum.</div>
            </div>
          </div>
        </section>

        <section className="section tint" id="coverage">
          <div className="wrap">
            <div className="section-head">
              <h2>What is modelled today.</h2>
            </div>
            <div className="pc-grid">
              <div className="pc">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="svc-ic pc-logo"><img src="/images/aave-logo.png" alt="" /></span>
                <h3>Aave</h3>
                <p>Markets, revenue attribution, incentive spend</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span><span className="pc-why">Core and deployed instances.</span></div>
              </div>
              <div className="pc">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="svc-ic pc-logo"><img src="/images/logo-3.png" alt="" /></span>
                <h3>Morpho</h3>
                <p>Vaults and markets, curator behaviour, revenue split</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span></div>
              </div>
              <div className="pc">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="svc-ic pc-logo"><img src="/images/logo-6.png" alt="" /></span>
                <h3>Moonwell</h3>
                <p>Markets, revenue, liquidation and OEV flows</p>
                <div className="pc-foot"><span className="pc-chains">Base · Optimism</span><span className="pc-why">Delegate role disclosed.</span></div>
              </div>
              <div className="pc">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="svc-ic pc-logo"><img src="/images/sparklend-logo.png" alt="" /></span>
                <h3>SparkLend</h3>
                <p>Markets, revenue, savings rate cost</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span></div>
              </div>
              <div className="pc">
                <span className="svc-ic pc-logo pc-logo-mark"><span className="pc-mark">F</span></span>
                <h3>Fluid</h3>
                <p>Markets, revenue, incentive spend</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span></div>
              </div>
              <div className="pc">
                <span className="svc-ic pc-logo pc-logo-mark"><span className="pc-mark">E</span></span>
                <h3>Euler</h3>
                <p>Vaults, markets, revenue attribution</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span></div>
              </div>
              <div className="pc">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="svc-ic pc-logo"><img src="/images/navi-logo.png" alt="" /></span>
                <h3>NAVI</h3>
                <p>Markets, revenue, incentive spend</p>
                <div className="pc-foot"><span className="pc-chains">Sui</span></div>
              </div>
              <div className="pc">
                <span className="svc-ic pc-logo pc-logo-mark"><span className="pc-mark">C</span></span>
                <h3>Centrifuge</h3>
                <p>Pools, tranches, real-world asset flows</p>
                <div className="pc-foot"><span className="pc-chains">Multi-chain</span></div>
              </div>
            </div>
            <p className="smallprint">Fourteen chains in total. If your protocol is not on this list, modelling it is part of onboarding, not a reason to say no. Ask on the call how long it would take.</p>
          </div>
        </section>

        <section className="section" id="dashboards">
          <div className="wrap">
            <div className="section-head">
              <h2>Twelve terminals, hosted by us.</h2>
              <p style={{ color: "var(--dim)" }}>The same figures that appear in our research and in client packs, live, with the time of the last run on every page. No third-party dashboard that can change under you.</p>
            </div>
            <div className="dash-grid">
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">$0.27M</div><div className="tlab">NET KEPT</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 52 L34 47 L68 40 L102 43 L136 30 L170 22 L204 14" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 52 L34 47 L68 40 L102 43 L136 30 L170 22 L204 14 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>Protocol P&amp;L</h3>
                  <p>Earned, paid out, spent on incentives and kept, by chain and by market, closed monthly.</p>
                  <div className="foot"><span>MONTHLY CLOSE</span><span className="go">OPEN →</span></div>
                </div>
              </a>
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">$4.82M</div><div className="tlab">INTEREST EARNED</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 46 L34 42 L68 36 L102 26 L136 29 L170 18 L204 11" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 46 L34 42 L68 36 L102 26 L136 29 L170 18 L204 11 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>Revenue &amp; reserves</h3>
                  <p>Interest income, supplier share and reserve growth across every modelled market.</p>
                  <div className="foot"><span>HOURLY</span><span className="go">OPEN →</span></div>
                </div>
              </a>
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">$0.64M</div><div className="tlab">INCENTIVE SPEND</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 16 L34 22 L68 20 L102 31 L136 38 L170 44 L204 50" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 16 L34 22 L68 20 L102 31 L136 38 L170 44 L204 50 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>Incentive campaigns</h3>
                  <p>What each campaign cost, what it brought in, and what stayed after it stopped.</p>
                  <div className="foot"><span>HOURLY</span><span className="go">OPEN →</span></div>
                </div>
              </a>
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">118%</div><div className="tlab">COLLATERAL RATIO</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 38 L34 33 L68 39 L102 28 L136 32 L170 24 L204 27" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 38 L34 33 L68 39 L102 28 L136 32 L170 24 L204 27 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>Collateral &amp; risk</h3>
                  <p>Concentration, depth, peg behaviour and liquidation flow for listed assets.</p>
                  <div className="foot"><span>HOURLY</span><span className="go">OPEN →</span></div>
                </div>
              </a>
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">$314K</div><div className="tlab">VALUE ROUTED</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 50 L34 36 L68 44 L102 24 L136 33 L170 19 L204 13" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 50 L34 36 L68 44 L102 24 L136 33 L170 19 L204 13 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>Liquidations &amp; OEV</h3>
                  <p>Every liquidation decomposed into the four flows that decide who captured the value.</p>
                  <div className="foot"><span>HOURLY</span><span className="go">OPEN →</span></div>
                </div>
              </a>
              <a className="dash-card" href="/live-dashboards">
                <div className="dash-thumb">
                  <div><div className="tval">+7.0%</div><div className="tlab">SECTOR GROWTH</div></div>
                  <svg viewBox="0 0 204 62" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 44 L34 38 L68 31 L102 33 L136 24 L170 20 L204 12" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M0 44 L34 38 L68 31 L102 33 L136 24 L170 20 L204 12 L204 62 L0 62 Z" fill="#4A6CF7" opacity="0.08"></path>
                  </svg>
                </div>
                <div className="body">
                  <h3>State of Lending</h3>
                  <p>The cross-protocol view behind our monthly public report.</p>
                  <div className="foot"><span>MONTHLY</span><span className="go">OPEN →</span></div>
                </div>
              </a>
            </div>
            <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}><a className="btn btn-primary" href="/live-dashboards">Open all dashboards</a></div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
