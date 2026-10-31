import type { Metadata } from "next"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "About Datum Labs",
  description:
    "Two named people doing financial data and reporting for blockchain protocols. Conflicts policy published.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Datum Labs", url: "/about", type: "website" },
}

export default function AboutPage() {
  return (
    <>
      {/* .img-slot-ph has no rule in the global CSS; this mirrors the
          `.person-shot image-slot` fill so the placeholder keeps the frame. */}
      <style>{`.person-shot .img-slot-ph{position:absolute;inset:0;width:100%;height:100%}`}</style>
      <PageRules />
      <NavV3 navDark active="about" />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>The people behind the numbers.</h1>
            <p className="lede">We do financial data and reporting for blockchain protocols. If nobody on your team owns the numbers full time, that is the work we do.</p>
            <p className="support">No anonymous analysts and no rotating account managers. You get the person who wrote the report and built the model.</p>
          </div>
        </section>

        <section className="section tint" id="people">
          <div className="wrap">
            <div className="section-head">
              <h2>The team.</h2>
            </div>
            <div className="svc-cols">
              <div className="svc-col">
                <div className="person-shot"><div className="img-slot-ph" aria-hidden="true" /></div>
                <h3>Aborode Olusegun</h3>
                <p className="person-role">Co-founder · Data analyst</p>
                <p>Works on protocol coverage and the monthly close, turning chain state into accounts a finance team can read.</p>
                <p>Reachable directly. If you dispute a figure in a report, you get an answer the same working day.</p>
              </div>
              <div className="svc-col">
                <div className="person-shot"><div className="img-slot-ph" aria-hidden="true" /></div>
                <h3>Joel Obafemi</h3>
                <p className="person-role">Co-founder · Data analyst</p>
                <p>Writes the research and runs client reporting. Holds the delegate role at Moonwell, disclosed on every piece of Moonwell research.</p>
                <p>Sits on the monthly call and answers to the numbers in public.</p>
              </div>
              <div className="svc-col">
                <div className="person-shot"><div className="img-slot-ph" aria-hidden="true" /></div>
                <h3>Joshua Obafemi</h3>
                <p className="person-role">Backend developer · Data engineer</p>
                <p>Builds and runs Atlas: the archive nodes, the decoders, the warehouse and the hourly rebuilds behind every published figure.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
