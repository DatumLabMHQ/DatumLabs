import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import "@/components/onepager/onepager.css"

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Datum Labs — Financial Data & Reporting for Blockchain Protocols",
  description:
    "Datum Labs is a data lab for onchain businesses: financial data and reporting for blockchain protocols, live dashboards, research, and the products we build from them.",
  alternates: { canonical: "/" },
}

const CAL = "https://calendly.com/datumlabss/30min"

type Mark = { name: string; img?: string; tag?: string }

const MARKS: Mark[] = [
  { name: "Aave", img: "/images/aave-logo.png" },
  { name: "Morpho", img: "/images/logo-3.png" },
  { name: "Moonwell", img: "/images/logo-6.png" },
  { name: "SparkLend", img: "/images/sparklend-logo.png" },
  { name: "NAVI", img: "/images/navi-logo.png" },
  { name: "OnchainSuite", img: "/images/onchainsuite-mark.png", tag: "Product" },
  { name: "Fluid", img: "/images/fluid-logo.jpg" },
  { name: "Euler", img: "/images/euler-logo.jpg" },
  { name: "Centrifuge", img: "/images/centrifuge-logo.svg" },
  { name: "CoW Protocol", img: "/images/cow-logo.png" },
  { name: "Setnel", tag: "Product" },
  { name: "Seamless", img: "/images/logo-5.png" },
  { name: "Venus", img: "/images/logo-7.png" },
  { name: "Level", img: "/images/level-logo.png" },
  { name: "Falcon Finance", img: "/images/logo-1.png" },
  { name: "Incentiv", img: "/images/incentiv-logo.png" },
  { name: "Goldfish", img: "/images/goldfish-logo.png" },
  { name: "ORBT", img: "/images/orbt-logo.svg" },
  { name: "Onchain Labs", img: "/images/onchain-labs-logo.png" },
]

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.datumlab.xyz/#org",
  name: "Datum Labs",
  url: "https://www.datumlab.xyz",
  logo: "https://www.datumlab.xyz/brand/logo-mark-blue.svg",
  description: "Financial data and reporting for blockchain protocols, and a lab that builds products from it.",
  email: "hello@datumlab.xyz",
  sameAs: ["https://x.com/Datumlabs_", "https://www.linkedin.com/showcase/dat-umlab/"],
}

function MarkRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {MARKS.map((m) => (
        <span className="op-logo" key={`${m.name}${hidden ? "-b" : ""}`} aria-hidden={hidden || undefined}>
          {m.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.img} alt="" />
          ) : null}
          {m.name}
          {m.tag ? <span className="op-tag">{m.tag}</span> : null}
        </span>
      ))}
    </>
  )
}

export default function Home() {
  return (
    <div className={`op-root ${instrument.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Sky className="op-sky" />
      <OpNav />

      <main id="main" className="op-hero">
        <h1 className="op-h1 op-rise op-d1">
          Financial data and reporting for <em>blockchain</em> protocols.
        </h1>
        <p className="op-sub op-rise op-d2">
          A data lab for onchain businesses. Research, live dashboards, and the products we build from them.
        </p>
        <div className="op-actions op-rise op-d3">
          <a className="op-btn op-btn-primary" href={CAL} target="_blank" rel="noopener">
            Talk to us <span aria-hidden="true">→</span>
          </a>
          <a className="op-btn op-btn-ghost" href="/resources">
            See the research
          </a>
        </div>
      </main>

      <footer className="op-logos op-rise op-d4" aria-label="Protocols we have analysed and products we have built">
        <p className="op-logos-label">Protocols we&rsquo;ve analysed &middot; products we&rsquo;ve built</p>
        <div className="op-marquee">
          <div className="op-track">
            <MarkRow />
            <MarkRow hidden />
          </div>
        </div>
      </footer>
    </div>
  )
}
