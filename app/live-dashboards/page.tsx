import type { Metadata } from "next"
import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { NewsletterForm } from "@/components/onepager/newsletter-form"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"

export const metadata: Metadata = {
  title: "Live DeFi Protocol Dashboards — Aave, Morpho, NAVI | Datum Labs",
  description:
    "Custom-built, fully-operated DeFi dashboards — live onchain data, market metrics, and position-health analytics for Aave, Morpho, NAVI, SparkLend and more.",
  alternates: { canonical: "/live-dashboards" },
  openGraph: { title: "Live DeFi Protocol Dashboards — Aave, Morpho, NAVI | Datum Labs", url: "/live-dashboards", type: "website" },
}

type Dash = { name: string; sub: string; logo?: string; href: string; probe: string; dark?: boolean; external?: boolean }

// Status is checked against each dashboard's own origin, cached for five
// minutes, so a paused deployment shows as such instead of claiming "Live".
export const revalidate = 300

async function isUp(url: string) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", next: { revalidate: 300 }, signal: AbortSignal.timeout(6000) })
    return res.ok
  } catch {
    return false
  }
}

// The index of dashboards we run. Each one is its own app (embedded, proxied
// or linked); this page only lists them.
const LENDING: Dash[] = [
  { name: "Aave", sub: "Multi-chain lending markets", logo: "/images/aave-logo.png", href: "/aave-dashboard", probe: "https://aave-dashboard-next.vercel.app/" },
  { name: "Morpho", sub: "Curated lending vaults and markets", logo: "/images/logo-3.png", href: "/morpho-terminal", probe: "https://morpho-terminal.vercel.app/" },
  { name: "Euler", sub: "Modular EVK lending vaults", logo: "/images/euler-logo.jpg", href: "/euler-terminal", probe: "https://euler-dashboard-next.vercel.app/", dark: true },
  { name: "Fluid", sub: "Lending and DEX liquidity layer", logo: "/images/fluid-logo.jpg", href: "/fluid-terminal", probe: "https://fluid-dashboard-next.vercel.app/", dark: true },
  { name: "SparkLend", sub: "SparkLend markets", logo: "/images/sparklend-logo.png", href: "/sparklend", probe: "https://spark-dashboard-next.vercel.app/sparklend" },
  { name: "NAVI", sub: "Sui-native money market", logo: "/images/navi-logo.png", href: "/navi", probe: "https://sui-lending.vercel.app/", dark: true },
  { name: "Lending Terminal · Sui", sub: "Sui lending, across protocols", logo: "/images/lending-terminal-sui-logo.png", href: "/lending-terminal-sui", probe: "https://sui-lending.vercel.app/" },
  { name: "Incentiv", sub: "L1 incentive accounting", logo: "/images/incentiv-logo.png", href: "https://www.datumlab.xyz/Incentiv/dashboard/overview", probe: "https://incentiv-dashboard.vercel.app/Incentiv/dashboard/overview", external: true },
]

const TERMINALS: Dash[] = [
  { name: "Centrifuge RWA Terminal", sub: "Tokenised real-world asset pools", logo: "/images/centrifuge-logo.svg", href: "/centrifugerwa", probe: "https://centrifuge-rwa-next.vercel.app/" },
  { name: "RWA Terminal", sub: "Aave Horizon tokenised RWAs", logo: "/images/datum-logo.png", href: "/rwa-terminal", probe: "https://rwa-terminal-dashboard.vercel.app/" },
  { name: "Lending Terminal", sub: "Cross-protocol lending intelligence", logo: "/images/datum-logo.png", href: "/lending-terminal", probe: "https://lending-intelligence-terminal.vercel.app/" },
  { name: "Liquidator Economy", sub: "Liquidator flows and incentives", logo: "/images/datum-logo.png", href: "/liquidator-economy", probe: "https://liquidator-economy-dashboard.vercel.app/" },
]

function Group({ title, items, up }: { title: string; items: Dash[]; up: Record<string, boolean> }) {
  return (
    <section className="rx-ledger" aria-labelledby={`dx-${title}`}>
      <div className="rx-ledger-head">
        <h2 id={`dx-${title}`} className="rx-ledger-h">{title}</h2>
        <span className="rx-ledger-n">{items.length}</span>
      </div>
      <ul className="dx-grid">
        {items.map((d) => (
          <li key={d.name}>
            <a
              className={up[d.name] ? "dx-tile" : "dx-tile is-down"}
              href={d.href}
              {...(d.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className="dx-tile-top">
                <span className={d.dark ? "dx-logo dx-logo-dark" : "dx-logo"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {d.logo ? <img src={d.logo} alt="" /> : null}
                </span>
                <span className="dx-live">
                  <span className="dx-dot" aria-hidden="true" />
                  {up[d.name] ? "Live" : "Back soon"}
                </span>
              </span>
              <span className="dx-name">{d.name}</span>
              <span className="dx-sub">{d.sub}</span>
              <span className="dx-open">
                Open <span aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function LiveDashboardsPage() {
  const all = [...LENDING, ...TERMINALS]
  const checks = await Promise.all(all.map((d) => isUp(d.probe)))
  const up = Object.fromEntries(all.map((d, i) => [d.name, checks[i]]))

  return (
    <div className={`pp-root sx-root ${opFonts}`}>
      <Sky className="sx-sky" />
      <div className="sx-veil" aria-hidden="true" />
      <OpNav active="lab" />

      <header className="pp-mast">
        <div>
          <p className="pp-eyebrow">The Lab</p>
          <h1 className="pp-h1">Dashboards</h1>
        </div>
        <div className="pp-mast-r">
          <p className="pp-lede">
            Live dashboards we build and run for protocol teams, from lending markets on Ethereum and Sui to tokenised
            real-world assets. Each one is open to anyone.
          </p>
          <div className="pp-sub dx-ask">
            <p className="pp-sub-t">The numbers behind these dashboards, in your inbox</p>
            <p className="pp-sub-d">
              We send a short note when the markets on these dashboards move, with what changed and why, read straight from
              the data.
            </p>
            <NewsletterForm source="dashboards" tone="ink" cta="Get the insights" />
          </div>
        </div>
      </header>

      <main id="main" className="pp-main">
        <Group title="Lending markets" items={LENDING} up={up} />
        <Group title="RWA and cross-protocol terminals" items={TERMINALS} up={up} />
      </main>

      <footer className="pod-foot art-foot pp-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
