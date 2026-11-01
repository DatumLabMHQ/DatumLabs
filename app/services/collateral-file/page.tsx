import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, CloseCta, Statement } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Collateral File, Datum Labs",
  description:
    "The file a lending market risk team wants to read before they accept your token as collateral, plus the live asset page behind it.",
  alternates: { canonical: "/services/collateral-file" },
  openGraph: {
    title: "Collateral File, Datum Labs",
    url: "/services/collateral-file",
    type: "website",
  },
}

const CLOSE = [
  {
    day: "Day 1",
    t: "Kickoff",
    b: "We agree the target markets and the parameters you want. Bring your docs, contracts and the venues you care about. One hour of your time.",
  },
  {
    day: "Day 2–3",
    t: "Modelled",
    b: "We model the asset in Atlas and build the live page: yield source, depth, concentration, peg behaviour under stress. Nothing needed from you.",
  },
  { day: "Day 4", t: "Draft", b: "Draft file to you with the parameter ask. One round of comments, on a call if you want it." },
  { day: "Day 5", t: "Final", b: "Final file, live page published, forum post drafted. We stay on the thread from here." },
]

const WHO = [
  { t: "You issue a stablecoin or yield token", b: "And you want it listed as collateral on a major lending market." },
  { t: "You were asked for a risk write-up", b: "And you do not have an analyst who can produce one." },
  { t: "A listing request stalled", b: "And nobody told you which number caused it." },
  {
    t: "You want the page to outlive the vote",
    b: "The same asset page the risk team sees stays live, so the next raise is easier.",
  },
]

export default function CollateralFile() {
  return (
    <>
      <Nav active="services" />

      <main id="main">
        <PageHead
          crumb={{ href: "/services", label: "Services" }}
          title="Collateral File"
          lede="The file a risk team wants to read before they vote on your token."
          support="Five working days. One written file, one live asset page, and a person who answers when the forum pushes back."
        />

        <section className="sp-section" id="why">
          <div className="sp-wrap">
            <div className="sp-split">
              <div>
                <h2 className="sp-h2">A listing is won in the risk review, not the forum post.</h2>
                <div className="sp-prose" style={{ marginTop: 28 }}>
                  <p className="sp-claim">
                    Risk teams are asked to accept an asset they did not issue, on numbers they cannot check.
                  </p>
                  <p>
                    Most listing requests give them a paragraph of narrative and a price chart. So the request sits, gets
                    a cautious cap, or gets refused without a reason anyone can act on.
                  </p>
                  <p>
                    We answer their four questions in writing, with the query behind each figure and the date it was
                    true, then stand up a live asset page carrying the same numbers so they can watch the asset instead
                    of taking our word for it once.
                  </p>
                </div>
              </div>
              <Statement
                title="Collateral File"
                subtitle="What they actually ask"
                specimen={false}
                label="The four questions a risk team asks, as the Collateral File answers them"
                lines={[
                  { label: "Yield", value: "Where it comes from, and who pays it" },
                  { label: "Stress", value: "What happens to the price" },
                  { label: "Exit", value: "How deep, and on which venue" },
                  { label: "Control", value: "Who can change the terms, and how fast" },
                ]}
                keptLabel="The parameter ask"
                kept="A number we will defend"
                micr={[
                  { glyph: "⑆", text: "QUERY PER FIGURE", tip: "The query behind each figure, written into the file." },
                  { glyph: "⑈", text: "DATE IT WAS TRUE", tip: "Every figure carries the date it was true." },
                  { glyph: "⑉", text: "REBUILT HOURLY", tip: "The live asset page, rebuilt hourly in Atlas." },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="ships">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">A file, a page, and someone on the thread.</h2>
            </div>
            <ul className="sp-ledger sp-ledger-2">
              <li>
                <h3 className="sp-h3">The file</h3>
                <p>
                  Twelve to twenty pages: yield source, redemption mechanics,{" "}
                  <span className="sp-tip" title="How much the price can move when someone trades a large size.">
                    depth and slippage
                  </span>{" "}
                  by venue, concentration, governance surface, and the parameters we would argue for.
                </p>
              </li>
              <li>
                <h3 className="sp-h3">The parameter ask</h3>
                <p>
                  A specific proposal:{" "}
                  <span className="sp-tip" title="How much you can borrow against the asset, as a share of its value.">
                    LTV
                  </span>
                  , liquidation threshold, supply cap, oracle choice, and the reasoning for each. A number we will
                  defend.
                </p>
              </li>
              <li>
                <h3 className="sp-h3">The live asset page</h3>
                <p>
                  Hosted by us, rebuilt hourly in{" "}
                  <span className="sp-tip" title="The Datum Labs data platform.">
                    Atlas
                  </span>
                  . Supply, borrow, concentration, depth and peg, with the time of the last run.
                </p>
              </li>
              <li>
                <h3 className="sp-h3">The forum defence</h3>
                <p>
                  We are on the thread through the review. Disputed figures get a written reply the same working day,
                  both numbers shown, the gap named.
                </p>
              </li>
              <li>
                <h3 className="sp-h3">The correction promise</h3>
                <p>
                  If we get a figure wrong we correct it within one working day and post the correction wherever the
                  original went.
                </p>
              </li>
              <li>
                <h3 className="sp-h3">What we will not do</h3>
                <p>
                  We will not write a file that argues for a number we do not believe. If the asset is not ready we will
                  say so, and what would make it ready.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <Band id="close">
          <div className="sp-head">
            <h2 className="sp-h2">Five working days.</h2>
          </div>
          <ul className="sp-ledger">
            {CLOSE.map((l) => (
              <li key={l.t}>
                <h3 className="sp-h3">{l.t}</h3>
                <p>{l.b}</p>
                <span className="sp-l-meta">{l.day}</span>
              </li>
            ))}
          </ul>
          <p className="sp-small" style={{ marginTop: 22 }}>
            Assumes your documentation exists and someone on your side can answer questions inside a day. If the asset
            is new and the history is thin, we will tell you on the kickoff call rather than at the end.
          </p>
        </Band>

        <section className="sp-section" id="who">
          <div className="sp-wrap">
            <div className="sp-split" style={{ marginBottom: 48 }}>
              <h2 className="sp-h2">
                You issue the asset. <em>Someone else has to accept it.</em>
              </h2>
              <div className="sp-prose">
                <p>The Collateral File is built for issuers who need a lending market&rsquo;s risk team to say yes.</p>
                <p>Files written against Aave, Morpho, Moonwell, SparkLend, Fluid and Euler.</p>
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
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
