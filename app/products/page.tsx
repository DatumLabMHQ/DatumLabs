import type { Metadata } from "next"

import { Nav, Footer, PageHead, CloseCta } from "@/components/print/print-parts"

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
    href: "https://setnel.datumlab.xyz/setnel",
    cta: "Visit Setnel",
  },
]

export default function ProductsPage() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead
          title={
            <>
              Products, not <em>just services.</em>
            </>
          }
          lede="When a data problem recurs across protocols, we turn it into a product. These are the SaaS tools built out of the work we do for partners."
        />

        <section className="sp-section" id="products">
          <div className="sp-wrap">
            <ul className="sp-ledger">
              {PRODUCTS.map((p) => (
                <li key={p.name}>
                  <h3 className="sp-h3">
                    <a className="sp-link" href={p.href} target="_blank" rel="noopener">
                      {p.name}
                    </a>
                  </h3>
                  <div>
                    <p>
                      <strong>{p.tagline}</strong>
                    </p>
                    <p style={{ marginTop: 8 }}>{p.desc}</p>
                    <p style={{ marginTop: 12 }}>
                      <a className="sp-link" href={p.href} target="_blank" rel="noopener">
                        {p.cta} ↗
                      </a>
                    </p>
                  </div>
                  <span className="sp-l-meta">{p.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
