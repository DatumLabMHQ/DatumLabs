import type { Metadata } from "next"

import { Nav, Footer, PageHead } from "@/components/print/print-parts"

export const metadata: Metadata = {
  title: "Terms of Service | Datum Labs",
  description: "The terms that govern use of the Datum Labs website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <Nav />

      <main id="main">
        <PageHead title="Terms of Service" meta={<span>Last updated <b>July 2026</b></span>} />

        <section className="sp-section">
          <div className="sp-wrap">
            <div className="legal">
              <p>These terms govern your use of datumlab.xyz (the &quot;Site&quot;). By using the Site you agree to them.</p>

              <h2>Use of the site</h2>
              <p>The Site and its content are provided for informational purposes. You may not misuse the Site, attempt to disrupt it, or scrape it at a scale that degrades service for others.</p>

              <h2>No financial or investment advice</h2>
              <p>Nothing on the Site — including dashboards, reports, and analyses — constitutes financial, investment, legal, or tax advice. On-chain data and analytics are provided &quot;as is&quot; and may contain errors or delays. Do your own research before making decisions.</p>

              <h2>Intellectual property</h2>
              <p>The Site, its design, and original content are owned by Datum Labs. Protocol names and logos referenced on the Site are the property of their respective owners and are used for identification only; their appearance does not imply endorsement.</p>

              <h2>Third-party links</h2>
              <p>The Site links to third-party surfaces (e.g. Dune, Calendly, Spotify) that have their own terms. We are not responsible for their content or availability.</p>

              <h2>Limitation of liability</h2>
              <p>To the fullest extent permitted by law, Datum Labs is not liable for any loss arising from use of the Site or reliance on its content.</p>

              <h2>Contact</h2>
              <p>Questions? Email <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
