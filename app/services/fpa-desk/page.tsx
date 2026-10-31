import type { Metadata } from "next"
import {
  Scales,
  Target,
  TrendUp,
  Medal,
  PhoneCall,
  UsersThree,
  Gavel,
  UserPlus,
  ChatsCircle,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

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

export default function FpaDesk() {
  return (
    <>
      <PageRules />
      <NavV3 navDark active="services" />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>FP&amp;A Desk</h1>
            <p className="lede">Your finance and planning function, run without adding a seat.</p>
            <p className="support">Everything in Management Accounts, plus your targets, budget against actual, every campaign scored, and a named analyst in your weekly call.</p>
          </div>
        </section>
        <section data-pin className="section tint" id="gap">
          <div className="wrap">
            <div className="section-head">
              <h2>Closing the month is not the same as running the plan.</h2>
              <p style={{ color: "var(--dim)" }}>Management Accounts tell you what happened. At some point that stops being enough: you are setting a budget, defending an incentive spend to a committee, and being asked what next quarter looks like if nothing changes. That work needs somebody in the room every week, not a pack once a month.</p>
            </div>
            <div className="prose">
              <p className="lead-claim">A finance team, on the outside of your org chart.</p>
              <p>You get a named analyst who sits in your weekly call, holds the model, and comes with a view. Targets are set with you and then measured against, every month, in public if you want. When a campaign is proposed, it gets costed before it runs and scored after it stops.</p>
            </div>
          </div>
        </section>
        <section className="section" id="ships">
          <div className="wrap">
            <div className="section-head">
              <h2>Everything in Management Accounts, plus the plan.</h2>
            </div>
            <div className="cells cells-3">
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><Scales weight="duotone" /></i></span><span className="cell-name">Budget against actual</span></h3><p>Your budget in the same shape as your accounts, so variance is a line you can read, not a reconstruction.</p></div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><Target weight="duotone" /></i></span><span className="cell-name">Targets, set and measured</span></h3><p>Agreed with you at the start of the period and reported against every month, including the ones we miss.</p></div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><TrendUp weight="duotone" /></i></span><span className="cell-name">Forecast</span></h3><p>What next quarter looks like on current behaviour, and what changes if you cut or raise incentives.</p></div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><Medal weight="duotone" /></i></span><span className="cell-name">Campaigns scored</span></h3><p>Costed before it runs, scored after it stops, with a verdict: repeat, resize or drop.</p></div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><PhoneCall weight="duotone" /></i></span><span className="cell-name">Weekly call</span></h3><p>Your analyst, every week, with a written note after it. Not a status update, a decision.</p></div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><UsersThree weight="duotone" /></i></span><span className="cell-name">Committee support</span></h3><p>We write the numbers section of your proposal and stand behind it on the thread.</p></div>
            </div>
          </div>
        </section>
        <section className="section" id="who">
          <div className="wrap">
            <div className="who-plate" data-theme="dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
              <div className="who-plate-inner">
                <div>
                  <h2>You answer to someone.</h2>
                  <p>The Desk is built for teams whose numbers get questioned in public.</p>
                </div>
                <p className="who-note">Capacity-limited: we take a small number of protocols at a time because the weekly call is a real commitment on our side. If we are full we will say so and put you next.</p>
              </div>
            </div>
            <div className="cells cells-2 who-cells">
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><Gavel weight="duotone" /></i></span><span className="cell-name">You spend on incentives and answer for it</span></h3>
                <p>Meaningful campaign spend that has to be justified to a committee or a DAO, with numbers that hold up on the thread.</p>
              </div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><Target weight="duotone" /></i></span><span className="cell-name">You set targets and need them marked honestly</span></h3>
                <p>Measured by someone who is not marking their own homework, and reported against every month including the misses.</p>
              </div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><UserPlus weight="duotone" /></i></span><span className="cell-name">You are hiring for finance</span></h3>
                <p>And want the function running properly before the seat is filled.</p>
              </div>
              <div className="cell">
                <h3><span className="ic"><i aria-hidden="true"><ChatsCircle weight="duotone" /></i></span><span className="cell-name">You want someone who will disagree with you</span></h3>
                <p>One person who knows your protocol well enough to push back, not an account team relaying a deck.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
