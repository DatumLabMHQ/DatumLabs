import type { Metadata } from "next"

import { Nav, Footer, PageHead, GuillocheBand, LINKS } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Contact — Get a Free Protocol Snapshot | Datum Labs",
  description:
    "Send a protocol name. We send back last month's one-page P&L, free, inside 48 hours. That page is the sample.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Datum Labs", url: "/contact", type: "website" },
}

const STEPS = [
  { step: "Step 1", t: "You send a protocol name", b: "Nothing else. We find the contracts ourselves." },
  { step: "Step 2", t: "We send the one-page P&L", b: "Last month, modelled. Free, yours to keep, every figure traceable." },
  { step: "Step 3", t: "A call, if it is useful", b: "Which service fits. If it is not useful, no follow-up." },
]

const SERVICES = [
  {
    name: "Collateral File",
    href: "/services/collateral-file",
    body: "Get your token accepted as collateral on a lending market.",
    cadence: "Five working days",
  },
  {
    name: "Management Accounts",
    href: "/services/management-accounts",
    body: "Your accounts closed every month, by chain and by market.",
    cadence: "Monthly, working day five",
  },
  {
    name: "FP&A Desk",
    href: "/services/fpa-desk",
    body: "The whole finance and planning function, without adding a seat.",
    cadence: "Weekly call, monthly pack",
  },
]

export default function ContactPage() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead
          title="Contact us"
          lede="Send a protocol name. We send back last month’s one-page P&L, free, inside 48 hours."
          support="That page is the sample. If it is useful, we talk about which service fits. If not, you keep the page."
        />

        <section className="sp-section" id="form">
          <div className="sp-wrap">
            <div className="sp-split">
              <div className="sp-instrument">
                <GuillocheBand />
                <div className="sp-inst-form">
                  <h2 className="sp-h3">The free Snapshot</h2>
                  <p>One page, last month, any protocol. What you earned, paid out, spent on incentives and kept.</p>
                  <form
                    className="sp-form"
                    data-form
                    data-endpoint="/api/snapshot"
                    data-subject="Snapshot request"
                    data-done="Sent. Your Snapshot comes back inside 48 hours."
                  >
                    <div className="sp-field">
                      <label htmlFor="snap-protocol">Protocol name</label>
                      <input id="snap-protocol" type="text" name="protocol" required autoComplete="organization" />
                    </div>
                    <div className="sp-field">
                      <label htmlFor="snap-email">Email</label>
                      <input id="snap-email" type="email" name="email" required autoComplete="email" />
                    </div>
                    <button type="submit" className="sp-btn sp-btn-primary">
                      Contact us
                    </button>
                  </form>
                  <p className="sp-small">Back inside 48 hours. No call required, nothing gated.</p>
                </div>
              </div>

              <ul className="sp-ledger sp-ledger-2">
                <li>
                  <h3 className="sp-h3">Prefer to talk first?</h3>
                  <p>
                    <a className="sp-link" href={LINKS.calendly} target="_blank" rel="noopener">
                      Book 30 minutes
                    </a>
                    . We will have looked at your protocol before the call.
                  </p>
                </li>
                <li>
                  <h3 className="sp-h3">Or write</h3>
                  <p>
                    <a className="sp-link" href={LINKS.email}>
                      hello@datumlab.xyz
                    </a>
                    , or find us on{" "}
                    <a className="sp-link" href={LINKS.x} target="_blank" rel="noopener">
                      X
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="next">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Three steps, no pipeline.</h2>
            </div>
            <ul className="sp-ledger">
              {STEPS.map((s) => (
                <li key={s.t}>
                  <h3 className="sp-h3">{s.t}</h3>
                  <p>{s.b}</p>
                  <span className="sp-l-meta">{s.step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sp-section sp-tight" id="which">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Already know what you need?</h2>
            </div>
            <ul className="sp-ledger">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <h3 className="sp-h3">
                    <a className="sp-link" href={s.href}>
                      {s.name}
                    </a>
                  </h3>
                  <p>{s.body}</p>
                  <span className="sp-l-meta">{s.cadence}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
