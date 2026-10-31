import type { Metadata } from "next"
import {
  CalendarCheck,
  EnvelopeSimple,
  PaperPlaneTilt,
  FileText,
  ChatsCircle,
  ShieldCheck,
  Receipt,
  Compass,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules, LINKS } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Contact — Get a Free Protocol Snapshot | Datum Labs",
  description:
    "Send a protocol name. We send back last month's one-page P&L, free, inside 48 hours. That page is the sample.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Datum Labs", url: "/contact", type: "website" },
}

export default function ContactPage() {
  return (
    <>
      <PageRules />
      <NavV3 navDark />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Contact us</h1>
            <p className="lede">Send a protocol name. We send back last month&rsquo;s one-page P&amp;L, free, inside 48 hours.</p>
            <p className="support">That page is the sample. If it is useful, we talk about which service fits. If not, you keep the page.</p>
          </div>
        </section>

        <section className="section" id="form">
          <div className="wrap">
            <div className="contact-split">
              <div className="contact-form">
                <h2 className="spaced">The free Snapshot</h2>
                <p>One page, last month, any protocol. What you earned, paid out, spent on incentives and kept.</p>
                <form
                  className="ask-form"
                  data-form
                  data-endpoint="/api/snapshot"
                  data-subject="Snapshot request"
                  data-done="Sent. Your Snapshot comes back inside 48 hours."
                >
                  <input type="text" name="protocol" placeholder="Protocol name" aria-label="Protocol name" required autoComplete="organization" />
                  <input type="email" name="email" placeholder="Email" aria-label="Email" required autoComplete="email" />
                  <button type="submit" className="btn">Contact us</button>
                </form>
                <p className="ask-small">Back inside 48 hours. No call required, nothing gated.</p>
              </div>
              <div className="contact-alt">
                <div className="contact-alt-item">
                  <span className="svc-ic"><i aria-hidden="true"><CalendarCheck weight="duotone" /></i></span>
                  <h3>Prefer to talk first?</h3>
                  <p><a href={LINKS.calendly} target="_blank" rel="noopener">Book 30 minutes</a>. We will have looked at your protocol before the call.</p>
                </div>
                <div className="contact-alt-item">
                  <span className="svc-ic"><i aria-hidden="true"><EnvelopeSimple weight="duotone" /></i></span>
                  <h3>Or write</h3>
                  <p><a href={LINKS.email.replace("mailto:", "mailto:")}>hello@datumlab.xyz</a>, or find us on <a href={LINKS.x} target="_blank" rel="noopener">X</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section tint" id="next">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Three steps, no pipeline.</h2>
            </div>
            <div className="cells cells-3">
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><PaperPlaneTilt weight="duotone" /></i></span><h3>You send a protocol name</h3><p>Nothing else. We find the contracts ourselves.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><FileText weight="duotone" /></i></span><h3>We send the one-page P&amp;L</h3><p>Last month, modelled. Free, yours to keep, every figure traceable.</p></div>
              <div className="cell cell-stack"><span className="svc-ic"><i aria-hidden="true"><ChatsCircle weight="duotone" /></i></span><h3>A call, if it is useful</h3><p>Which service fits. If it is not useful, no follow-up.</p></div>
            </div>
          </div>
        </section>

        <section className="section" id="which">
          <div className="wrap">
            <div className="section-head">
              <h2 className="spaced">Already know what you need?</h2>
            </div>
            <div className="tcards">
              <a className="tcard" href="/services/collateral-file">
                <span className="svc-ic"><i aria-hidden="true"><ShieldCheck weight="duotone" /></i></span>
                <h3>Collateral File<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>Get your token accepted as collateral on a lending market.</p>
                <span className="split-meta">Five working days</span>
              </a>
              <a className="tcard" href="/services/management-accounts">
                <span className="svc-ic"><i aria-hidden="true"><Receipt weight="duotone" /></i></span>
                <h3>Management Accounts<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>Your accounts closed every month, by chain and by market.</p>
                <span className="split-meta">Monthly, working day five</span>
              </a>
              <a className="tcard" href="/services/fpa-desk">
                <span className="svc-ic"><i aria-hidden="true"><Compass weight="duotone" /></i></span>
                <h3>FP&amp;A Desk<i className="svc-go" aria-hidden="true"><ArrowRight /></i></h3>
                <p>The whole finance and planning function, without adding a seat.</p>
                <span className="split-meta">Weekly call, monthly pack</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
