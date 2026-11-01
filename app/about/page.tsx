import type { Metadata } from "next"

import { Nav, Footer, PageHead, CloseCta } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "About Datum Labs",
  description:
    "Two named people doing financial data and reporting for blockchain protocols. Conflicts policy published.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Datum Labs", url: "/about", type: "website" },
}

const PEOPLE = [
  {
    name: "Aborode Olusegun",
    role: "Co-founder · Data analyst",
    body: [
      "Works on protocol coverage and the monthly close, turning chain state into accounts a finance team can read.",
      "Reachable directly. If you dispute a figure in a report, you get an answer the same working day.",
    ],
  },
  {
    name: "Joel Obafemi",
    role: "Co-founder · Data analyst",
    body: [
      "Writes the research and runs client reporting. Holds the delegate role at Moonwell, disclosed on every piece of Moonwell research.",
      "Sits on the monthly call and answers to the numbers in public.",
    ],
  },
  {
    name: "Joshua Obafemi",
    role: "Backend developer · Data engineer",
    body: [
      "Builds and runs Atlas: the archive nodes, the decoders, the warehouse and the hourly rebuilds behind every published figure.",
    ],
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav active="about" />

      <main id="main">
        <PageHead
          title="The people behind the numbers."
          lede="We do financial data and reporting for blockchain protocols. If nobody on your team owns the numbers full time, that is the work we do."
          support="No anonymous analysts and no rotating account managers. You get the person who wrote the report and built the model."
        />

        <section className="sp-section" id="people">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">The team.</h2>
            </div>
            <div className="sp-people">
              {PEOPLE.map((p) => (
                <div className="sp-person" key={p.name}>
                  <h3 className="sp-h3">{p.name}</h3>
                  <div className="role">{p.role}</div>
                  {p.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
