import type { Metadata } from "next"
import { FileText, Receipt, Compass, ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Services | Datum Labs",
  description:
    "Three services: the Collateral File, Management Accounts and the FP&A Desk. Start with a free one-page Snapshot.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Datum Labs", url: "/services", type: "website" },
}

export default function ServicesPage() {
  return (
    <>
      <PageRules />
      <NavV3 active="services" navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Three services.</h1>
            <p className="lede">
              One gets your token accepted as collateral. One closes your books every month. One runs the whole
              finance function.
            </p>
            <p className="support">
              Not sure which one? Start with the free Snapshot. One page, last month, any protocol, back in 48 hours.
            </p>
          </div>
        </section>

        <section className="section" id="all">
          <div className="wrap">
            <h2 className="svc-col-head">Pick by the job in front of you.</h2>
            <div className="svc-cols">
              <a className="svc-col" href="/services/collateral-file">
                <span className="svc-col-ic"><i aria-hidden="true"><FileText weight="duotone" /></i></span>
                <h3>Collateral File<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>
                  You are about to ask a lending market to accept your token as collateral. We write the file their
                  risk team wants to read, and stand up the live asset page behind it.
                </p>
                <p>
                  The file is written once and the asset page is rebuilt from the chain every hour. Questions from a
                  risk reviewer get answered the same working day.
                </p>
                <span className="svc-col-meta">Five working days</span>
              </a>
              <a className="svc-col" href="/services/management-accounts">
                <span className="svc-col-ic"><i aria-hidden="true"><Receipt weight="duotone" /></i></span>
                <h3>Management Accounts<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>
                  You have a token, a forum and nobody whose whole job is the numbers. Every month you get your
                  accounts: earned, paid out, spent on incentives, kept, by chain and by market.
                </p>
                <p>
                  A one-page P&amp;L you can paste into a forum post, protocol accounts live on the web, and a named
                  analyst on a monthly call.
                </p>
                <span className="svc-col-meta">Monthly, working day five</span>
              </a>
              <a className="svc-col" href="/services/fpa-desk">
                <span className="svc-col-ic"><i aria-hidden="true"><Compass weight="duotone" /></i></span>
                <h3>FP&amp;A Desk<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>
                  You want the whole finance and planning function run without adding a seat. Everything in Management
                  Accounts, plus your own targets and budget against actual.
                </p>
                <p>
                  Every incentive campaign scored with a verdict, forecast against plan, and a named analyst in your
                  weekly call.
                </p>
                <span className="svc-col-meta">Weekly call, monthly pack</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
