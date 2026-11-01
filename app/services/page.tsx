import type { Metadata } from "next"

import { Nav, Footer, PageHead, CloseCta } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Services | Datum Labs",
  description:
    "Three services: the Collateral File, Management Accounts and the FP&A Desk. Start with a free one-page Snapshot.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Datum Labs", url: "/services", type: "website" },
}

const SERVICES = [
  {
    name: "Collateral File",
    href: "/services/collateral-file",
    body: [
      "You are about to ask a lending market to accept your token as collateral. We write the file their risk team wants to read, and stand up the live asset page behind it.",
      "The file is written once and the asset page is rebuilt from the chain every hour. Questions from a risk reviewer get answered the same working day.",
    ],
    cadence: "Five working days",
  },
  {
    name: "Management Accounts",
    href: "/services/management-accounts",
    body: [
      "You have a token, a forum and nobody whose whole job is the numbers. Every month you get your accounts: earned, paid out, spent on incentives, kept, by chain and by market.",
      "A one-page P&L you can paste into a forum post, protocol accounts live on the web, and a named analyst on a monthly call.",
    ],
    cadence: "Monthly, working day five",
  },
  {
    name: "FP&A Desk",
    href: "/services/fpa-desk",
    body: [
      "You want the whole finance and planning function run without adding a seat. Everything in Management Accounts, plus your own targets and budget against actual.",
      "Every incentive campaign scored with a verdict, forecast against plan, and a named analyst in your weekly call.",
    ],
    cadence: "Weekly call, monthly pack",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Nav active="services" />

      <main id="main">
        <PageHead
          title="Three services."
          lede="One gets your token accepted as collateral. One closes your books every month. One runs the whole finance function."
          support="Not sure which one? Start with the free Snapshot. One page, last month, any protocol, back in 48 hours."
        />

        <section className="sp-section" id="all">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Pick by the job in front of you.</h2>
            </div>
            <ul className="sp-ledger">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <h3 className="sp-h3">
                    <a className="sp-link" href={s.href}>{s.name}</a>
                  </h3>
                  <div>
                    {s.body.map((p, i) => (
                      <p key={p} style={i > 0 ? { marginTop: 12 } : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                  <span className="sp-l-meta">{s.cadence}</span>
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
