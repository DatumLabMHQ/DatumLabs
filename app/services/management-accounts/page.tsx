import type { Metadata } from "next"
import {
  FileText,
  TreeStructure,
  Coins,
  Monitor,
  Scales,
  UserCircle,
  Bank,
  UsersThree,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

export const metadata: Metadata = {
  title: "Management Accounts, Datum Labs",
  description:
    "Your protocol’s monthly accounts: what you earned, paid out, spent on incentives and kept, by chain and by market.",
  alternates: { canonical: "/services/management-accounts" },
  openGraph: {
    title: "Management Accounts, Datum Labs",
    url: "/services/management-accounts",
    type: "website",
  },
}

export default function ManagementAccounts() {
  return (
    <>
      <PageRules />
      <NavV3 navDark active="services" />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Management Accounts</h1>
            <p className="lede">Your accounts, closed every month, by working day five.</p>
            <p className="support">What you earned, what you paid out, what you spent on incentives, what you kept. By chain and by market, with the reason behind each move.</p>
          </div>
        </section>
        <section className="section tint" id="gap">
          <div className="wrap">
            <div className="lead-split">
              <h2>Nobody adds it up.</h2>
              <div className="prose">
                <p className="lead-claim">Three numbers, three places, no reconciliation.</p>
                <p>Your protocol earns interest, pays most of it out to suppliers, and spends tokens to bring the deposits in. So &ldquo;did we make money on Base last quarter?&rdquo; gets a guess, and your forum gets whatever the loudest tracker says.</p>
                <p>We add it up monthly, by chain and by market, then read it: which markets carry you, which cost you money, and what last month&rsquo;s rewards actually bought once they stopped.</p>
              </div>
            </div>
            <p className="stat-eyebrow" style={{ marginTop: 56 }}>The one page, every month</p>
            <div className="cs-nums cs-nums-4">
              <div className="cs-stat"><span className="cs-stat-val">Earned</span><span className="cs-stat-lbl">Interest, by market</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Paid out</span><span className="cs-stat-lbl">Suppliers&rsquo; share</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Spent</span><span className="cs-stat-lbl">Incentives, by campaign</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Kept</span><span className="cs-stat-lbl">The net</span></div>
            </div>
          </div>
        </section>
        <section data-pin className="section" id="ships" data-centre-head>
          <div className="wrap">
            <div className="section-head">
              <h2>A page you log into, and a report that reads it.</h2>
            </div>
            <div className="cells cells-3">
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><FileText weight="duotone" /></i></span><span className="cell-name">The monthly pack</span></h3><p>One page of numbers, two to four pages of reading. Movement on the month named and explained.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><TreeStructure weight="duotone" /></i></span><span className="cell-name">By chain, by market</span></h3><p>Every figure splits to the market that produced it, so you can see which deployment carries you.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Coins weight="duotone" /></i></span><span className="cell-name">Incentives, costed</span></h3><p>Every campaign named, with what it cost, what it brought in, and what stayed after the rewards stopped.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Monitor weight="duotone" /></i></span><span className="cell-name">The live page</span></h3><p>Built with you, rebuilt from the chain every hour in Atlas, with your closed months kept in it.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Scales weight="duotone" /></i></span><span className="cell-name">The reconciliation</span></h3><p>Where our figure differs from a public tracker, the gap is shown and the reason named.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><UserCircle weight="duotone" /></i></span><span className="cell-name">A named analyst</span></h3><p>One person who knows your protocol, on a monthly call, and reachable on the days in between.</p></div>
            </div>
          </div>
        </section>
        <section className="section tint" id="close">
          <div className="wrap">
            <div className="section-head">
              <h2>Working day five, every month.</h2>
            </div>
            <div className="cells cells-4 close-cells">
              <div className="cell"><span className="close-day">Day 1&ndash;2</span><h3><span className="cell-name">Pulled and reconciled</span></h3><p>The month is pulled and reconciled in Atlas: interest, supplier share, incentive spend, fees, by chain and market.</p></div>
              <div className="cell"><span className="close-day">Day 3</span><h3><span className="cell-name">Read and written</span></h3><p>Your analyst reads it and writes the movement: what moved, why, and what it means for next month.</p></div>
              <div className="cell"><span className="close-day">Day 4</span><h3><span className="cell-name">Reviewed</span></h3><p>Internal review. Every figure traced to the run that produced it.</p></div>
              <div className="cell"><span className="close-day">Day 5</span><h3><span className="cell-name">Delivered</span></h3><p>Pack to you, live page updated, call booked. Final. If it changes after this, it is a correction and we post it.</p></div>
            </div>
            <p className="smallprint">The page is yours. If you stop working with us it stays up, with your history in it, frozen at the last month we closed.</p>
          </div>
        </section>
        <section className="section" id="who">
          <div className="wrap">
            <div className="who-plate" data-theme="dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
              <div className="who-plate-inner">
                <div>
                  <h2>You have a token and a forum, and no finance team.</h2>
                  <p>Management Accounts is built for protocols with real revenue and nobody whose whole job is the numbers.</p>
                </div>
                <p className="who-note">Modelled hourly in Atlas: Aave, Morpho, Moonwell, SparkLend, Fluid, Euler, NAVI and Centrifuge. If yours is not on the list, modelling it is part of onboarding.</p>
              </div>
            </div>
            <div className="cells cells-2 who-cells">
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Bank weight="duotone" /></i></span><span className="cell-name">You run a market with real revenue</span></h3><p>A lending market, a stablecoin or a yield protocol, and no one whose whole job is the numbers.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><UsersThree weight="duotone" /></i></span><span className="cell-name">Your committee asks quarterly</span></h3><p>Your <span className="tip" title="A group elected or appointed to make spending and risk decisions on the protocol&rsquo;s behalf.">committee</span> or DAO asks for an update and someone builds it by hand each time.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Coins weight="duotone" /></i></span><span className="cell-name">You spend on incentives</span></h3><p>And cannot say what the last campaign actually bought.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><ShieldCheck weight="duotone" /></i></span><span className="cell-name">You post numbers in public</span></h3><p>And want the one you post to be one you can defend line by line.</p></div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
