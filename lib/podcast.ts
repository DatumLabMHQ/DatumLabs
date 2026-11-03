/**
 * Beyond the Protocol episodes, read from the show's RSS feed (Spotify for
 * Creators) and revalidated hourly. Shared by the podcast index and the
 * per-episode pages at /resources/podcast/<slug>.
 */

export const RSS_URL = "https://anchor.fm/s/e16c2398/podcast/rss"
export const SHOW_ID = "5ZZfeCsHFcZWXJ47FNeqJQ"
export const SPOTIFY_SHOW = `https://open.spotify.com/show/${SHOW_ID}`
export const SPOTIFY_EMBED = `https://open.spotify.com/embed/show/${SHOW_ID}?utm_source=generator`

export type Chapter = { at: number; stamp: string; label: string }
export type EpisodeLink = { label: string; url: string }

export type Episode = {
  slug: string
  number: number
  title: string
  tag?: string
  date: string
  isoDate: string
  duration: string
  summary: string
  chapters: Chapter[]
  links: EpisodeLink[]
  audioUrl: string
  spotifyUrl?: string
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
    // HH:MM:SS or MM:SS; drop a leading zero-hours segment
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

// Feed titles carry format tags and old show branding; split those off.
function parseTitle(raw: string) {
  let t = raw.replace(/\s*\|\s*Found3s on W3GM\s*$/i, "")
  let tag: string | undefined
  t = t.replace(/\s*[[{(]\s*(roundtable)\s*[\]})]\s*/i, (_m, g: string) => {
    tag = g[0].toUpperCase() + g.slice(1).toLowerCase()
    return " "
  })
  return { title: t.replace(/\s+/g, " ").trim().replace(/[.]$/, ""), tag }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72)
    .replace(/-+$/, "")
}

const toSeconds = (stamp: string) => stamp.split(":").reduce((acc, n) => acc * 60 + parseInt(n, 10), 0)

// The feed's show notes arrive as one run of text: a summary, then
// "Chapters00:00 Intro01:55 Next…", then "Connect with X here: url…".
// Pull the three apart.
function parseNotes(text: string) {
  const linkStart = text.search(/(Connect with|Follow|Read [Oo]ur|Explore)\b[^:]{0,60}?here:/)
  const head = linkStart >= 0 ? text.slice(0, linkStart) : text
  const tail = linkStart >= 0 ? text.slice(linkStart) : ""

  const chIdx = head.search(/Chapters\s*\d/)
  const summary = (chIdx >= 0 ? head.slice(0, chIdx) : head).replace(/^Summary\s*/, "").trim()
  const chapters: Chapter[] = []
  if (chIdx >= 0) {
    const body = head.slice(chIdx).replace(/^Chapters\s*/, "")
    for (const m of body.matchAll(/(\d{1,2}:\d{2}(?::\d{2})?)\s*(.+?)(?=\d{1,2}:\d{2}(?::\d{2})?\s*\D|$)/g)) {
      const label = m[2].trim()
      if (label) chapters.push({ at: toSeconds(m[1]), stamp: m[1], label })
    }
  }

  const links: EpisodeLink[] = []
  for (const m of tail.matchAll(/((?:Connect with|Follow|Read [Oo]ur|Explore)\b[^:]{0,60}?) here:\s*(https?:\/\/[^\s]+?)(?=(?:Connect with|Follow|Read [Oo]ur|Explore)\b|\s|$)/g)) {
    links.push({ label: m[1].replace(/^Read [Oo]ur articles/, "Datum Labs research").trim(), url: m[2] })
  }
  return { summary, chapters, links }
}

export async function getEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []
    const n = items.length
    return items.map((item, i) => {
      const pick = (re: RegExp) => stripCdata((item.match(re) || [, ""])[1] || "")
      const { title, tag } = parseTitle(decodeEntities(pick(/<title>([\s\S]*?)<\/title>/)))
      const pubDate = pick(/<pubDate>([\s\S]*?)<\/pubDate>/)
      const notes = parseNotes(stripHtml(pick(/<description>([\s\S]*?)<\/description>/)))
      const number = n - i
      return {
        slug: `${number}-${slugify(title)}`,
        number,
        title,
        tag,
        date: formatDate(pubDate),
        isoDate: isNaN(new Date(pubDate).getTime()) ? "" : new Date(pubDate).toISOString(),
        duration: formatDuration(pick(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/)),
        ...notes,
        audioUrl: (item.match(/<enclosure[^>]*url="([^"]+)"/) || [, ""])[1] || "",
        spotifyUrl: pick(/<link>([\s\S]*?)<\/link>/) || undefined,
      }
    })
  } catch {
    return []
  }
}
