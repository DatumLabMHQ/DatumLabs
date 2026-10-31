import type { Metadata } from "next"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"

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
      <PageRules />
      <NavV3 active="research" navDark />

      <header className="page-header ph-rel" data-nav-dark data-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="band-bg" src="/brand/faq-bg.jpg" alt="" aria-hidden="true" />
        <div className="wrap ph-inner">
          <span className="crumb">Resources · Podcast</span>
          <h1>W3GM. Conversations from the <span className="it">onchain frontier.</span></h1>
          <p className="lede">The Datum Labs podcast. We sit down with the operators, founders, and analysts building the onchain economy, the people actually shipping, not just posting.</p>
          <div className="meta-row">
            <span>Hosted by <strong>Datum Labs</strong></span>
            <span>Show · <strong>W3GM</strong></span>
            {episodes.length > 0 ? <span>Episodes · <strong>{episodes.length}</strong></span> : <span>On · <strong>Spotify</strong></span>}
          </div>
        </div>
      </header>

      <main id="main" className="wrap">
        <section className="section" style={{ paddingTop: 32 }}>
          <div data-reveal style={{ borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)" }}>
            <iframe
              title="W3GM on Spotify"
              src={SPOTIFY_EMBED}
              width="100%"
              height={352}
              style={{ border: 0, display: "block" }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <div className="hero-ctas" style={{ marginTop: 24 }}>
            <a href={SPOTIFY_SHOW} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Listen on Spotify ↗</a>
          </div>
        </section>

        {episodes.length > 0 ? (
          <section className="section" style={{ paddingTop: 8 }}>
            <div className="section-head" data-reveal>
              <span className="crumb">All episodes</span>
            </div>
            <div data-reveal>
              {episodes.map((ep, i) => (
                <article
                  key={`${ep.title}-${i}`}
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    padding: "24px 4px",
                    display: "grid",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)" }}>
                      {String(episodes.length - i).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>
                      {ep.title}
                    </h3>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-tertiary)" }}>
                    {formatDate(ep.pubDate)}{ep.duration ? ` · ${formatDuration(ep.duration)}` : ""}
                  </div>
                  {ep.description ? (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--text-secondary)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {ep.description}
                    </p>
                  ) : null}
                  {ep.audioUrl ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <audio controls preload="none" src={ep.audioUrl} style={{ width: "100%", maxWidth: 560, height: 36 }} />
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <FooterV3 />
    </>
  )
}
