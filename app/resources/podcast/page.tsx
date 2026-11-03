import type { Metadata } from "next"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { PodcastPlayer, type PodEpisode } from "@/components/onepager/podcast-player"
import { NewsletterForm } from "@/components/onepager/newsletter-form"
import { PlatformLinks } from "@/components/onepager/platform-links"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"
import { SPOTIFY_EMBED, getEpisodes } from "@/lib/podcast"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Beyond the Protocol — the Datum Labs podcast",
  description:
    "Beyond the Protocol, the Datum Labs podcast: conversations with the founders building lending markets, stablecoins, exchanges, prediction markets and fintechs.",
  alternates: { canonical: "/resources/podcast" },
  openGraph: { title: "Beyond the Protocol — the Datum Labs podcast", url: "/resources/podcast", type: "website" },
}

export default async function PodcastPage() {
  const episodes: PodEpisode[] = (await getEpisodes()).map((e) => ({
    slug: e.slug,
    number: e.number,
    title: e.title,
    tag: e.tag,
    date: e.date,
    duration: e.duration,
    description: e.summary,
    audioUrl: e.audioUrl,
  }))

  return (
    <div className={`pp-root sx-root pc-root ${opFonts}`}>
      <Sky className="sx-sky" />
      <div className="sx-veil" aria-hidden="true" />
      <OpNav active="podcast" />

      <header className="pc-hero">
        <p className="pc-kick">The Datum Labs podcast</p>
        <h1 className="pc-word">
          Beyond <em>the</em> Protocol
        </h1>
        <p className="pc-hero-d">
          Conversations with the founders building lending markets, stablecoins, exchanges, prediction markets and
          fintechs. What they are building, and what the numbers underneath it say.
        </p>
        <div className="pc-hero-cta">
          <PlatformLinks />
          {episodes.length ? <span className="pc-count">{episodes.length} episodes</span> : null}
        </div>
      </header>

      <main id="main">
        {episodes.length ? (
          <PodcastPlayer episodes={episodes} />
        ) : (
          <div className="pc-empty">
            <p>Episodes are loading from the feed. Meanwhile, the show is on Spotify.</p>
            <iframe title="Beyond the Protocol on Spotify" src={SPOTIFY_EMBED} width="100%" height={352} loading="lazy" />
          </div>
        )}
      </main>

      <section className="pc-deliver" aria-labelledby="pc-deliver-h">
        <p className="pc-deliver-k">Beyond the Protocol</p>
        <h2 id="pc-deliver-h" className="pc-deliver-h">Delivered</h2>
        <p className="pc-deliver-d">New episodes and new Datum Labs reports, in your inbox when they are published.</p>
        <NewsletterForm tone="ink" />
      </section>

      <footer className="pod-foot art-foot pp-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
