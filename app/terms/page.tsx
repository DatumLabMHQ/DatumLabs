import type { Metadata } from "next"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Terms of Service | Datum Labs",
  description: "The terms that govern use of the Datum Labs website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <header className="page-header ph-rel" data-nav-dark data-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
        <div className="wrap ph-inner">
          <span className="crumb">Legal</span>
          <h1>Terms of Service</h1>
          <p className="legal" style={{ padding: 0 }}><span className="updated">Last updated · July 2026</span></p>
        </div>
      </header>

      <main id="main" className="wrap">
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="legal" data-reveal>
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
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
