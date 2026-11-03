import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { EpisodeAudio, EpisodeChapters, EpisodeControls } from "@/components/onepager/episode-player"
import { NewsletterForm } from "@/components/onepager/newsletter-form"
import { PlatformLinks } from "@/components/onepager/platform-links"
import { GuestCard } from "@/components/onepager/guest-card"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"
import { getEpisodes } from "@/lib/podcast"

export const revalidate = 3600

export async function generateStaticParams() {
  const eps = await getEpisodes()
  return eps.map((e) => ({ slug: e.slug }))
}

async function find(slug: string) {
  const eps = await getEpisodes()
  const i = eps.findIndex((e) => e.slug === slug)
  return i < 0 ? null : { ep: eps[i], eps, i }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const hit = await find(slug)
  if (!hit) return { title: "Episode not found — Beyond the Protocol" }
  const { ep } = hit
  const title = `${ep.title} — Beyond the Protocol`
  const description = ep.summary.slice(0, 200)
  return {
    title,
    description,
    alternates: { canonical: `/resources/podcast/${ep.slug}` },
    openGraph: { title, description, url: `/resources/podcast/${ep.slug}`, type: "article", publishedTime: ep.isoDate || undefined },
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = await find(slug)
  if (!hit) notFound()
  const { ep, eps, i } = hit

  // Neighbours first (newer, then older), then the latest, to make three.
  const more = [eps[i - 1], eps[i + 1], eps[i + 2], eps[0], eps[1]]
    .filter((e, k, arr) => e && e.slug !== ep.slug && arr.findIndex((x) => x?.slug === e.slug) === k)
    .slice(0, 3)

  // X/Twitter links in the show notes are people; everything else is a site.
  const guests = ep.links.flatMap((l) => {
    const m = l.url.match(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/?$/)
    return m ? [{ name: cap(l.label.replace(/^Connect with /, "")), handle: m[1], url: l.url }] : []
  })
  const sites = ep.links.filter((l) => !guests.some((g) => g.url === l.url))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.title,
    episodeNumber: ep.number,
    datePublished: ep.isoDate || undefined,
    description: ep.summary,
    url: `https://www.datumlab.xyz/resources/podcast/${ep.slug}`,
    associatedMedia: { "@type": "MediaObject", contentUrl: ep.audioUrl },
    partOfSeries: { "@type": "PodcastSeries", name: "Beyond the Protocol", url: "https://www.datumlab.xyz/resources/podcast" },
  }

  return (
    <div className={`pp-root sx-root pc-root ${opFonts}`}>
      <Sky className="sx-sky" />
      <div className="sx-veil" aria-hidden="true" />
      <OpNav active="podcast" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <EpisodeAudio audioUrl={ep.audioUrl}>
      <header className="ep-hero">
        <a className="art-back" href="/resources/podcast">
          <span aria-hidden="true">←</span> Beyond the Protocol
        </a>
        <p className="pc-ep-meta">
          Episode {ep.number}
          {ep.tag ? ` · ${ep.tag}` : ""} · {ep.date}
          {ep.duration ? ` · ${ep.duration}` : ""}
        </p>
        <h1 className="ep-h1">{ep.title}</h1>
        <EpisodeControls title={ep.title} />
      </header>

      <main id="main" className="ep-main">
        <div className="ep-cols">
          <section aria-labelledby="ep-sum-h">
            <h2 id="ep-sum-h" className="ep-sec-h">About this episode</h2>
            <p className="ep-sum">{ep.summary}</p>
          </section>
          <aside aria-labelledby="ep-listen-h">
            <h2 id="ep-listen-h" className="ep-sec-h">Listen on</h2>
            <PlatformLinks spotifyUrl={ep.spotifyUrl} />
          </aside>
        </div>

        {guests.length || sites.length ? (
          <section className="ep-guests" aria-labelledby="ep-people-h">
            <h2 id="ep-people-h" className="ep-sec-h">In this episode</h2>
            {guests.length ? (
              <div className="gc-grid">
                {guests.map((g) => (
                  <GuestCard key={g.url} name={g.name} handle={g.handle} url={g.url} />
                ))}
              </div>
            ) : null}
            {sites.length ? (
              <div className="ep-sites">
                {sites.map((l) => (
                  <a key={l.url} className="pl-link" href={l.url} target="_blank" rel="noopener">
                    {cap(l.label.replace(/^Explore /, ""))} · {host(l.url)} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {ep.chapters.length ? <EpisodeChapters chapters={ep.chapters} /> : null}
      </main>
      </EpisodeAudio>

      {more.length ? (
        <section className="pc-all ep-more" aria-labelledby="ep-more-h">
          <div className="rx-ledger-head">
            <h2 id="ep-more-h" className="rx-ledger-h">More episodes</h2>
          </div>
          <ul className="pc-grid">
            {more.map((m) => (
              <li key={m.slug}>
                <a className="pc-tile" href={`/resources/podcast/${m.slug}`}>
                  <span className="pc-tile-top">
                    <span className="pc-tile-no">{String(m.number).padStart(2, "0")}</span>
                  </span>
                  <span className="pc-tile-t">{m.title}</span>
                  <span className="pc-tile-m">
                    {m.date}
                    {m.duration ? ` · ${m.duration}` : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="pc-deliver" aria-labelledby="pc-deliver-h">
        <p className="pc-deliver-k">Beyond the Protocol</p>
        <h2 id="pc-deliver-h" className="pc-deliver-h">Delivered</h2>
        <p className="pc-deliver-d">New episodes and new Datum Labs reports, in your inbox when they are published.</p>
        <NewsletterForm tone="ink" />
      </section>

      <footer className="pod-foot pp-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}

