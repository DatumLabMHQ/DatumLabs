import type { Metadata } from "next"
import {
  FileText,
  SlidersHorizontal,
  Monitor,
  ChatsCircle,
  ArrowCounterClockwise,
  Prohibit,
  CoinVertical,
  ClipboardText,
  Hourglass,
  Broadcast,
} from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

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

export default function CollateralFile() {
  return (
    <>
      <PageRules />
      <NavV3 navDark active="services" />

      <main id="main">
        <section className="page-header ph-rel" data-nav-dark data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
          <div className="wrap ph-inner">
            <h1>Collateral File</h1>
            <p className="lede">The file a risk team wants to read before they vote on your token.</p>
            <p className="support">Five working days. One written file, one live asset page, and a person who answers when the forum pushes back.</p>
          </div>
        </section>
        <section className="section tint" id="why">
          <div className="wrap">
            <div className="lead-split">
              <h2>A listing is won in the risk review, not the forum post.</h2>
              <div className="prose">
                <p className="lead-claim">Risk teams are asked to accept an asset they did not issue, on numbers they cannot check.</p>
                <p>Most listing requests give them a paragraph of narrative and a price chart. So the request sits, gets a cautious cap, or gets refused without a reason anyone can act on.</p>
                <p>We answer their four questions in writing, with the query behind each figure and the date it was true, then stand up a live asset page carrying the same numbers so they can watch the asset instead of taking our word for it once.</p>
              </div>
            </div>
            <p className="stat-eyebrow" style={{ marginTop: 56 }}>What they actually ask</p>
            <div className="cs-nums cs-nums-4">
              <div className="cs-stat"><span className="cs-stat-val">Yield</span><span className="cs-stat-lbl">Where it comes from, and who pays it</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Stress</span><span className="cs-stat-lbl">What happens to the price</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Exit</span><span className="cs-stat-lbl">How deep, and on which venue</span></div>
              <div className="cs-stat"><span className="cs-stat-val">Control</span><span className="cs-stat-lbl">Who can change the terms, and how fast</span></div>
            </div>
          </div>
        </section>
        <section data-pin className="section" id="ships" data-centre-head>
          <div className="wrap">
            <div className="section-head">
              <h2>A file, a page, and someone on the thread.</h2>
            </div>
            <div className="cells cells-3">
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><FileText weight="duotone" /></i></span><span className="cell-name">The file</span></h3><p>Twelve to twenty pages: yield source, redemption mechanics, <span className="tip" title="How much the price can move when someone trades a large size.">depth and slippage</span> by venue, concentration, governance surface, and the parameters we would argue for.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><SlidersHorizontal weight="duotone" /></i></span><span className="cell-name">The parameter ask</span></h3><p>A specific proposal: <span className="tip" title="How much you can borrow against the asset, as a share of its value.">LTV</span>, liquidation threshold, supply cap, oracle choice, and the reasoning for each. A number we will defend.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Monitor weight="duotone" /></i></span><span className="cell-name">The live asset page</span></h3><p>Hosted by us, rebuilt hourly in <span className="tip" title="The Datum Labs data platform.">Atlas</span>. Supply, borrow, concentration, depth and peg, with the time of the last run.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><ChatsCircle weight="duotone" /></i></span><span className="cell-name">The forum defence</span></h3><p>We are on the thread through the review. Disputed figures get a written reply the same working day, both numbers shown, the gap named.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><ArrowCounterClockwise weight="duotone" /></i></span><span className="cell-name">The correction promise</span></h3><p>If we get a figure wrong we correct it within one working day and post the correction wherever the original went.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Prohibit weight="duotone" /></i></span><span className="cell-name">What we will not do</span></h3><p>We will not write a file that argues for a number we do not believe. If the asset is not ready we will say so, and what would make it ready.</p></div>
            </div>
          </div>
        </section>
        <section className="section tint" id="close">
          <div className="wrap">
            <div className="section-head">
              <h2>Five working days.</h2>
            </div>
            <div className="cells cells-4 close-cells">
              <div className="cell"><span className="close-day">Day 1</span><h3><span className="cell-name">Kickoff</span></h3><p>We agree the target markets and the parameters you want. Bring your docs, contracts and the venues you care about. One hour of your time.</p></div>
              <div className="cell"><span className="close-day">Day 2&ndash;3</span><h3><span className="cell-name">Modelled</span></h3><p>We model the asset in Atlas and build the live page: yield source, depth, concentration, peg behaviour under stress. Nothing needed from you.</p></div>
              <div className="cell"><span className="close-day">Day 4</span><h3><span className="cell-name">Draft</span></h3><p>Draft file to you with the parameter ask. One round of comments, on a call if you want it.</p></div>
              <div className="cell"><span className="close-day">Day 5</span><h3><span className="cell-name">Final</span></h3><p>Final file, live page published, forum post drafted. We stay on the thread from here.</p></div>
            </div>
            <p className="smallprint">Assumes your documentation exists and someone on your side can answer questions inside a day. If the asset is new and the history is thin, we will tell you on the kickoff call rather than at the end.</p>
          </div>
        </section>
        <section className="section" id="who">
          <div className="wrap">
            <div className="who-plate" data-theme="dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
              <div className="who-plate-inner">
                <div>
                  <h2>You issue the asset. Someone else has to accept it.</h2>
                  <p>The Collateral File is built for issuers who need a lending market&rsquo;s risk team to say yes.</p>
                </div>
                <p className="who-note">Files written against Aave, Morpho, Moonwell, SparkLend, Fluid and Euler.</p>
              </div>
            </div>
            <div className="cells cells-2 who-cells">
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><CoinVertical weight="duotone" /></i></span><span className="cell-name">You issue a stablecoin or yield token</span></h3><p>And you want it listed as collateral on a major lending market.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><ClipboardText weight="duotone" /></i></span><span className="cell-name">You were asked for a risk write-up</span></h3><p>And you do not have an analyst who can produce one.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Hourglass weight="duotone" /></i></span><span className="cell-name">A listing request stalled</span></h3><p>And nobody told you which number caused it.</p></div>
              <div className="cell"><h3><span className="ic"><i aria-hidden="true"><Broadcast weight="duotone" /></i></span><span className="cell-name">You want the page to outlive the vote</span></h3><p>The same asset page the risk team sees stays live, so the next raise is easier.</p></div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </>
  )
}
