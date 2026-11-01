import type { Metadata } from "next"

import { Nav, Footer, PageHead } from "@/components/print/print-parts"

const SHOW_ID = "5ZZfeCsHFcZWXJ47FNeqJQ"
const SPOTIFY_SHOW = `https://open.spotify.com/show/${SHOW_ID}`
const SPOTIFY_EMBED = `https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator`
// Spotify's show embed only surfaces the latest episode, so the full episode
// list comes from the show's RSS feed (Spotify for Creators), revalidated hourly.
const RSS_URL = "https://anchor.fm/s/e16c2398/podcast/rss"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "W3GM Podcast — Onchain Builders & Analysts | Datum Labs",
  description:
    "W3GM — the Datum Labs podcast. Conversations with the operators, founders, and analysts building the onchain economy.",
  alternates: { canonical: "/resources/podcast" },
  openGraph: { title: "W3GM Podcast — Onchain Builders & Analysts | Datum Labs", url: "/resources/podcast", type: "website" },
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
  const episodes = await getEpisodes()

  return (
    <>
      <Nav active="podcast" />

      <main id="main">
        <PageHead
          title={
            <>
              W3GM. Conversations from the <em>onchain frontier.</em>
            </>
          }
          lede="The Datum Labs podcast. We sit down with the operators, founders, and analysts building the onchain economy, the people actually shipping, not just posting."
          meta={
            <>
              <span>Hosted by <b>Datum Labs</b></span>
              <span>Show <b>W3GM</b></span>
              {episodes.length > 0 ? <span>Episodes <b>{episodes.length}</b></span> : <span>On <b>Spotify</b></span>}
            </>
          }
        />

        <section className="sp-section">
          <div className="sp-wrap">
            <div className="sp-split sp-split-wide">
              <div>
                <h2 className="sp-h2">Latest episode.</h2>
                <div className="sp-act">
                  <a href={SPOTIFY_SHOW} target="_blank" rel="noopener noreferrer" className="sp-btn sp-btn-ink">Listen on Spotify ↗</a>
                </div>
              </div>
              <div className="sp-embed">
                <iframe
                  title="W3GM on Spotify"
                  src={SPOTIFY_EMBED}
                  width="100%"
                  height={352}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {episodes.length > 0 ? (
          <section className="sp-section sp-tight" id="episodes">
            <div className="sp-wrap">
              <div className="sp-head">
                <h2 className="sp-h2">Every episode.</h2>
              </div>
              <ul className="sp-ledger sp-episodes">
                {episodes.map((ep, i) => (
                  <li key={`${ep.title}-${i}`}>
                    <h3 className="sp-h3">{ep.title}</h3>
                    <div>
                      {ep.description ? <p className="sp-ep-desc">{ep.description}</p> : null}
                      {ep.audioUrl ? (
                        // eslint-disable-next-line jsx-a11y/media-has-caption
                        <audio controls preload="none" src={ep.audioUrl} />
                      ) : null}
                    </div>
                    <span className="sp-l-meta">
                      {formatDate(ep.pubDate)}
                      {ep.duration ? `, ${formatDuration(ep.duration)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  )
}
