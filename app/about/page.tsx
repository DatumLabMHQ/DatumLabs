import type { Metadata } from "next"

import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RevealController } from "@/components/reveal-controller"

const CAL = "https://calendly.com/datumlabss/30min"

export const metadata: Metadata = {
  title: "About Datum Labs — DeFi Data & Analytics Team",
  description:
    "Datum Labs is the data execution layer for web3 — a small, senior team of analysts and engineers who operate the pipelines, models, and surfaces behind DeFi protocols.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Datum Labs — DeFi Data & Analytics Team", url: "/about", type: "website" },
}

export default function AboutPage() {
  return (
    <>
      <RevealController />
      <SiteNav />

      <header className="page-header">
        <div className="wrap">
          <span className="kicker">About</span>
          <h1>The data org protocols call <span className="it">instead of hiring one.</span></h1>
          <p>Datum Labs is the data execution layer for web3. We build and operate the pipelines, semantic models, and surfaces that let lending, risk, and governance teams see and shape what happens next, without standing up an in-house data team.</p>
          <div className="meta-row">
            <span><strong>12</strong> Engagements</span>
            <span><strong>10</strong> Public Dashboards</span>
            <span><strong>14</strong> Chains</span>
          </div>
        </div>
      </header>

      <main id="main" className="wrap">
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="legal" data-reveal>
            <h2>What we do</h2>
            <p>Most analytics work ends at the chart. Ours begins there. We treat data the way you treat your protocol — as a product that has to perform. We run archive nodes across 14 networks, normalize the events into protocol-aware models, and put the result where decisions actually get made: dashboards, alerts, and full applications.</p>

            <h2>How we operate</h2>
            <p>We don&apos;t advise from the sidelines. We embed. A senior operator who has shipped your exact problem before — for a real protocol, with real money on the line — runs the engagement end to end. There is no junior bench and no account-management layer between you and the person who lives in your data.</p>
            <ul>
              <li>We run the stack (nodes → indexer → warehouse → models → surfaces); you consume the result.</li>
              <li>We ship SaaS like <a href="https://www.onchainsuite.com" target="_blank" rel="noopener noreferrer">OnchainSuite</a> and <a href="https://setnel-hub.datumlabs.workers.dev/setnel" target="_blank" rel="noopener noreferrer">Setnel</a> when a problem recurs across protocols. <a href="/products">See our products →</a></li>
              <li>We publish public receipts on <a href="https://dune.com/jorel" target="_blank" rel="noopener noreferrer">Dune</a> so the work is verifiable, not asserted.</li>
            </ul>

            <h2>The team</h2>
            <p>Datum Labs is a small, senior team of data engineers and protocol analysts with backgrounds across Dune, leading L2s, and DeFi research desks. We built our reputation on Dune before we built a company around it. The person you meet on the first call is the person who will be in your pipelines.</p>

            <h2>Talk to us</h2>
            <p>The first conversation is a free 30-minute audit with an analyst — no sales loop. <a href={CAL} target="_blank" rel="noopener noreferrer">Book a call</a> or email <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
