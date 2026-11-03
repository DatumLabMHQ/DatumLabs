import type { Metadata } from "next"

import { OpNav } from "@/components/onepager/op-nav"
import { PodcastPlayer, type PodEpisode } from "@/components/onepager/podcast-player"
import { NewsletterForm } from "@/components/onepager/newsletter-form"
import { opFonts, podFont } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"

const SHOW_ID = "5ZZfeCsHFcZWXJ47FNeqJQ"
const SPOTIFY_SHOW = `https://open.spotify.com/show/${SHOW_ID}`
const SPOTIFY_EMBED = `https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator`
// Spotify's show embed only surfaces the latest episode, so the full episode
// list comes from the show's RSS feed (Spotify for Creators), revalidated hourly.
const RSS_URL = "https://anchor.fm/s/e16c2398/podcast/rss"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Beyond the Protocol — the Datum Labs podcast",
  description:
    "Beyond the Protocol, the Datum Labs podcast (formerly W3GM): conversations with the founders building lending markets, stablecoins, exchanges, prediction markets and fintechs.",
  alternates: { canonical: "/resources/podcast" },
  openGraph: { title: "Beyond the Protocol — the Datum Labs podcast", url: "/resources/podcast", type: "website" },
}

type Episode = {
  title: string
  pubDate: string
  duration: string
  description: string
  audioUrl: string
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function stripCdata(s: string) {
  return s.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "").trim()
}

function stripHtml(s: string) {
  return decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
}

function formatDuration(d: string) {
  const t = d.trim()
  if (!t) return ""
  if (t.includes(":")) {
    // HH:MM:SS or MM:SS — drop a leading zero-hours segment
    const parts = t.split(":").map((p) => p.padStart(2, "0"))
    if (parts.length === 3 && parts[0] === "00") return `${parseInt(parts[1], 10)} min`
    if (parts.length === 3) return `${parseInt(parts[0], 10)}h ${parseInt(parts[1], 10)}m`
    return `${parseInt(parts[0], 10)} min`
  }
  const secs = parseInt(t, 10)
  if (isNaN(secs)) return ""
  return secs >= 3600 ? `${Math.floor(secs / 3600)}h ${Math.round((secs % 3600) / 60)}m` : `${Math.round(secs / 60)} min`
}

function formatDate(d: string) {
  const t = new Date(d)
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []
    return items.map((item) => {
      const pick = (re: RegExp) => stripCdata((item.match(re) || [, ""])[1] || "")
      return {
        title: decodeEntities(pick(/<title>([\s\S]*?)<\/title>/)),
        pubDate: pick(/<pubDate>([\s\S]*?)<\/pubDate>/),
        duration: pick(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/),
        description: stripHtml(pick(/<description>([\s\S]*?)<\/description>/)),
        audioUrl: (item.match(/<enclosure[^>]*url="([^"]+)"/) || [, ""])[1] || "",
      }
    })
  } catch {
    return []
  }
}

export default async function PodcastPage() {
  const raw = await getEpisodes()
  const episodes: PodEpisode[] = raw.map((e) => ({
    title: e.title,
    date: formatDate(e.pubDate),
    duration: formatDuration(e.duration),
    description: e.description,
    audioUrl: e.audioUrl,
  }))

  return (
    <div className={`pc-root ${opFonts} ${podFont}`}>
      <OpNav tone="paper" active="podcast" />

      <header className="pc-hero">
        <p className="pc-kick">The Datum Labs podcast &middot; formerly W3GM</p>
        <h1 className="pc-word">Beyond the Protocol</h1>
        <div className="pc-hero-row">
          <p className="pc-hero-d">
            Conversations with the founders building lending markets, stablecoins, exchanges, prediction markets and
            fintechs. What they are building, and what the numbers underneath it say.
          </p>
          <div className="pc-hero-cta">
            <p>Available on Spotify{episodes.length ? ` · ${episodes.length} episodes` : ""}</p>
            <a className="pc-btn pc-btn-ink" href={SPOTIFY_SHOW} target="_blank" rel="noopener">
              Subscribe now
            </a>
          </div>
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

      <footer className="pod-foot art-foot pc-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
