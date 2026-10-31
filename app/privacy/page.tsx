import type { Metadata } from "next"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Privacy Policy | Datum Labs",
  description: "How Datum Labs collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <header className="page-header ph-rel" data-nav-dark data-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
        <div className="wrap ph-inner">
          <span className="crumb">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="legal" style={{ padding: 0 }}><span className="updated">Last updated · July 2026</span></p>
        </div>
      </header>

      <main id="main" className="wrap">
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="legal" data-reveal>
            <p>Datum Labs (&quot;we&quot;, &quot;us&quot;) operates datumlab.xyz. This policy explains what we collect and how we use it. We collect only what we need to run the site and respond to you.</p>

            <h2>Information we collect</h2>
            <ul>
              <li><strong>Contact details you give us</strong> — name, email, and occupation when you subscribe to our newsletter or request a report via a form.</li>
              <li><strong>Usage data</strong> — anonymous, aggregate analytics (page views, referrers) via privacy-respecting analytics.</li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To send research, reports, and updates you requested (you can unsubscribe anytime).</li>
              <li>To respond to enquiries and improve the site.</li>
            </ul>
            <p>We do not sell your personal information. Email is processed by our newsletter provider (Beehiiv); analytics by our hosting provider (Vercel).</p>

            <h2>Your choices</h2>
            <p>You can unsubscribe from any email using the link in the footer of that email, or request deletion of your details by writing to <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>.</p>

            <h2>Contact</h2>
            <p>Questions about this policy? Email <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>.</p>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
