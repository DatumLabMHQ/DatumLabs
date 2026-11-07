import type { Metadata } from "next"

import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RevealController } from "@/components/reveal-controller"

export const metadata: Metadata = {
  title: "OnchainSuite & Setnel — Datum Labs Products",
  description:
    "Datum Labs products — OnchainSuite (Web3 retention automation) and Setnel (onchain risk monitoring). SaaS built from the recurring data problems we solve for protocols.",
  alternates: { canonical: "/products" },
  openGraph: { title: "OnchainSuite & Setnel — Datum Labs Products", url: "/products", type: "website" },
}

const PRODUCTS = [
  {
    name: "OnchainSuite",
    tag: "Retention Automation",
    tagline: "When your users act on-chain, incentivize back.",
    desc: "A Web3 retention platform that watches on-chain wallet activity across chains and triggers personalized email + in-app campaigns in real time, so protocols reach and re-engage their best users instead of watching them churn.",
    href: "https://www.onchainsuite.com/",
    cta: "Visit OnchainSuite",
  },
  {
    name: "Setnel",
    tag: "Risk Monitoring",
    tagline: "Onchain risk, watched in real time.",
    desc: "Real-time risk monitoring for onchain protocols, surfacing position health, market drift, and the exposures that only show up when you model risk continuously rather than in snapshots.",
    href: "https://setnel-hub.datumlabs.workers.dev/setnel",
    cta: "Visit Setnel",
  },
]

export default function ProductsPage() {
  return (
    <>
      <RevealController />
      <SiteNav active="Resources" />

      <header className="page-header">
        <div className="wrap">
          <span className="kicker">Resources · Products</span>
          <h1>Products, not <span className="it">just services.</span></h1>
          <p>When a data problem recurs across protocols, we turn it into a product. These are the SaaS tools built out of the work we do for partners.</p>
        </div>
      </header>

      <main id="main" className="wrap">
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="lab-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {PRODUCTS.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="lab-card" data-reveal style={{ textDecoration: "none" }}>
                <div className="lab-no">{p.tag}</div>
                <h3>{p.name}</h3>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--text-primary)", fontStyle: "italic" }}>{p.tagline}</p>
                <p>{p.desc}</p>
                <div style={{ marginTop: "auto", paddingTop: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-brand)" }}>
                  {p.cta} ↗
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
