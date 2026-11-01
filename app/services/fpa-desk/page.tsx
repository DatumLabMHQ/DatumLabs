import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, CloseCta } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "FP&A Desk, Datum Labs",
  description:
    "The whole finance and planning function for your protocol, run by a named analyst, without adding a seat.",
  alternates: { canonical: "/services/fpa-desk" },
  openGraph: {
    title: "FP&A Desk, Datum Labs",
    url: "/services/fpa-desk",
    type: "website",
  },
}

const SHIPS = [
  {
    t: "Budget against actual",
    b: "Your budget in the same shape as your accounts, so variance is a line you can read, not a reconstruction.",
  },
  {
    t: "Targets, set and measured",
    b: "Agreed with you at the start of the period and reported against every month, including the ones we miss.",
  },
  {
    t: "Forecast",
    b: "What next quarter looks like on current behaviour, and what changes if you cut or raise incentives.",
  },
  { t: "Campaigns scored", b: "Costed before it runs, scored after it stops, with a verdict: repeat, resize or drop." },
  { t: "Weekly call", b: "Your analyst, every week, with a written note after it. Not a status update, a decision." },
  { t: "Committee support", b: "We write the numbers section of your proposal and stand behind it on the thread." },
]

const WHO = [
  {
    t: "You spend on incentives and answer for it",
    b: "Meaningful campaign spend that has to be justified to a committee or a DAO, with numbers that hold up on the thread.",
  },
  {
    t: "You set targets and need them marked honestly",
    b: "Measured by someone who is not marking their own homework, and reported against every month including the misses.",
  },
  { t: "You are hiring for finance", b: "And want the function running properly before the seat is filled." },
  {
    t: "You want someone who will disagree with you",
    b: "One person who knows your protocol well enough to push back, not an account team relaying a deck.",
  },
]

export default function FpaDesk() {
  return (
    <>
      <Nav active="services" />

      <main id="main">
        <PageHead
          crumb={{ href: "/services", label: "Services" }}
          title="FP&A Desk"
          lede="Your finance and planning function, run without adding a seat."
          support="Everything in Management Accounts, plus your targets, budget against actual, every campaign scored, and a named analyst in your weekly call."
        />

        <section className="sp-section" id="gap">
          <div className="sp-wrap">
            <div className="sp-split">
              <div>
                <h2 className="sp-h2">Closing the month is not the same as running the plan.</h2>
                <p className="sp-lede" style={{ marginTop: 28 }}>
                  Management Accounts tell you what happened. At some point that stops being enough: you are setting a
                  budget, defending an incentive spend to a committee, and being asked what next quarter looks like if
                  nothing changes. That work needs somebody in the room every week, not a pack once a month.
                </p>
              </div>
              <div className="sp-prose">
                <p className="sp-claim">A finance team, on the outside of your org chart.</p>
                <p>
                  You get a named analyst who sits in your weekly call, holds the model, and comes with a view. Targets
                  are set with you and then measured against, every month, in public if you want. When a campaign is
                  proposed, it gets costed before it runs and scored after it stops.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="ships">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Everything in Management Accounts, plus the plan.</h2>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              {SHIPS.map((l) => (
                <li key={l.t}>
                  <h3 className="sp-h3">{l.t}</h3>
                  <p>{l.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Band id="who">
          <div className="sp-split" style={{ marginBottom: 48 }}>
            <h2 className="sp-h2">
              You answer to <em>someone.</em>
            </h2>
            <div className="sp-prose">
              <p>The Desk is built for teams whose numbers get questioned in public.</p>
              <p>
                Capacity-limited: we take a small number of protocols at a time because the weekly call is a real
                commitment on our side. If we are full we will say so and put you next.
              </p>
            </div>
          </div>
          <ul className="sp-ledger sp-ledger-2">
            {WHO.map((l) => (
              <li key={l.t}>
                <h3 className="sp-h3">{l.t}</h3>
                <p>{l.b}</p>
              </li>
            ))}
          </ul>
        </Band>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
