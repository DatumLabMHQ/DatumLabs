import type { Metadata } from "next"

import { Nav, Footer, PageHead, Band, CloseCta, Statement } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Management Accounts, Datum Labs",
  description:
    "Your protocol’s monthly accounts: what you earned, paid out, spent on incentives and kept, by chain and by market.",
  alternates: { canonical: "/services/management-accounts" },
  openGraph: { title: "Management Accounts, Datum Labs", url: "/services/management-accounts", type: "website" },
}

const SHIPS = [
  { t: "The monthly pack", b: "One page of numbers, two to four pages of reading. Movement on the month named and explained." },
  { t: "By chain, by market", b: "Every figure splits to the market that produced it, so you can see which deployment carries you." },
  { t: "Incentives, costed", b: "Every campaign named, with what it cost, what it brought in, and what stayed after the rewards stopped." },
  { t: "The live page", b: "Built with you, rebuilt from the chain every hour in Atlas, with your closed months kept in it." },
  { t: "The reconciliation", b: "Where our figure differs from a public tracker, the gap is shown and the reason named." },
  { t: "A named analyst", b: "One person who knows your protocol, on a monthly call, and reachable on the days in between." },
]

const CLOSE = [
  { day: "Day 1–2", t: "Pulled and reconciled", b: "The month is pulled and reconciled in Atlas: interest, supplier share, incentive spend, fees, by chain and market." },
  { day: "Day 3", t: "Read and written", b: "Your analyst reads it and writes the movement: what moved, why, and what it means for next month." },
  { day: "Day 4", t: "Reviewed", b: "Internal review. Every figure traced to the run that produced it." },
  { day: "Day 5", t: "Delivered", b: "Pack to you, live page updated, call booked. Final. If it changes after this, it is a correction and we post it." },
]

export default function ManagementAccounts() {
  return (
    <>
      <Nav active="services" />

      <main id="main">
        <PageHead
          crumb={{ href: "/services", label: "Services" }}
          title="Management Accounts"
          lede="Your accounts, closed every month, by working day five."
          support="What you earned, what you paid out, what you spent on incentives, what you kept. By chain and by market, with the reason behind each move."
        />

        <section className="sp-section" id="gap">
          <div className="sp-wrap">
            <div className="sp-split">
              <div>
                <h2 className="sp-h2">Nobody adds it up.</h2>
                <div className="sp-prose" style={{ marginTop: 28 }}>
                  <p className="sp-claim">Three numbers, three places, no reconciliation.</p>
                  <p>
                    Your protocol earns interest, pays most of it out to suppliers, and spends tokens to bring the
                    deposits in. So &ldquo;did we make money on Base last quarter?&rdquo; gets a guess, and your forum gets
                    whatever the loudest tracker says.
                  </p>
                  <p>
                    We add it up monthly, by chain and by market, then read it: which markets carry you, which cost you
                    money, and what last month&rsquo;s rewards actually bought once they stopped.
                  </p>
                </div>
              </div>
              <Statement
                title="The one page, every month"
                subtitle="Closed by working day five"
                specimen={false}
                lines={[
                  { label: "Earned", value: "Interest, by market" },
                  { label: "Paid out", value: "Suppliers’ share", sub: true },
                  { label: "Spent", value: "Incentives, by campaign", sub: true },
                ]}
                kept="The net"
                micr={[
                  { glyph: "⑆", text: "BY CHAIN", tip: "Every figure split to the chain that produced it." },
                  { glyph: "⑈", text: "BY MARKET", tip: "And to the market inside that chain." },
                  { glyph: "⑉", text: "WORKING DAY 5", tip: "Final on the fifth working day of the month." },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="sp-section sp-tight" id="ships">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">A page you log into, and a report that reads it.</h2>
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

        <section className="sp-section sp-tight" id="close">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">Working day five, every month.</h2>
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
              The page is yours. If you stop working with us it stays up, with your history in it, frozen at the last
              month we closed.
            </p>
          </div>
        </section>

        <Band id="who">
          <div className="sp-split" style={{ marginBottom: 48 }}>
            <h2 className="sp-h2">
              You have a token and a forum, <em>and no finance team.</em>
            </h2>
            <div className="sp-prose">
              <p>
                Management Accounts is built for protocols with real revenue and nobody whose whole job is the numbers.
              </p>
              <p>
                Modelled hourly in Atlas: Aave, Morpho, Moonwell, SparkLend, Fluid, Euler, NAVI and Centrifuge. If yours
                is not on the list, modelling it is part of onboarding.
              </p>
            </div>
          </div>
          <ul className="sp-ledger sp-ledger-2">
            <li>
              <h3 className="sp-h3">You run a market with real revenue</h3>
              <p>A lending market, a stablecoin or a yield protocol, and no one whose whole job is the numbers.</p>
            </li>
            <li>
              <h3 className="sp-h3">Your committee asks quarterly</h3>
              <p>
                Your{" "}
                <span className="sp-tip" title="A group elected or appointed to make spending and risk decisions on the protocol’s behalf.">
                  committee
                </span>{" "}
                or DAO asks for an update and someone builds it by hand each time.
              </p>
            </li>
            <li>
              <h3 className="sp-h3">You spend on incentives</h3>
              <p>And cannot say what the last campaign actually bought.</p>
            </li>
            <li>
              <h3 className="sp-h3">You post numbers in public</h3>
              <p>And want the one you post to be one you can defend line by line.</p>
            </li>
          </ul>
        </Band>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
