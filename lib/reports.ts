import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

/**
 * Repo-hosted MDX reports. Reports are authored as .mdx files in
 * content/reports/ (full component support) — distinct from the blog, which
 * stays in Sanity. Drop a new .mdx file in that folder and it publishes.
 */
export const REPORTS_DIR = path.join(process.cwd(), "content", "reports")

export type ReportMeta = {
  slug: string
  title: string
  period?: string
  summary: string
  excerpt?: string
  cover?: string
  /** Optional in-article hero. Falls back to `cover`. Lets the card use a
   *  portrait/mockup crop while the article opens on a wide banner. */
  hero?: string
  pdf?: string
  publishedAt: string
}

function ensureDir(): boolean {
  try {
    return fs.existsSync(REPORTS_DIR)
  } catch {
    return false
  }
}

export function getReportSlugs(): string[] {
  if (!ensureDir()) return []
  return fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

/** Raw MDX source + parsed frontmatter for a single report. */
export function getReportSource(slug: string): { meta: ReportMeta; content: string } | null {
  const file = path.join(REPORTS_DIR, `${slug}.mdx`)
  if (!ensureDir() || !fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw)
  return { meta: normalize(slug, data), content }
}

export function getReportMeta(slug: string): ReportMeta | null {
  return getReportSource(slug)?.meta ?? null
}

/** All reports, newest first, metadata only (for lists / hub / sitemap). */
export function getAllReports(): ReportMeta[] {
  return getReportSlugs()
    .map((slug) => getReportMeta(slug))
    .filter((m): m is ReportMeta => m !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(slug: string, data: any): ReportMeta {
  return {
    slug: (data.slug as string) || slug,
    title: data.title || slug,
    period: data.period,
    summary: data.summary || "",
    excerpt: data.excerpt || data.summary || "",
    cover: data.cover,
    hero: data.hero,
    pdf: data.pdf,
    publishedAt: data.publishedAt || data.date || new Date(0).toISOString(),
  }
}

export type ReportKpi = { value: string; label: string }

/** The first `n` <KPI label value /> figures in a report's body, in order, so
 *  the research index can show each report's headline numbers. */
export function getReportKpis(slug: string, n = 3): ReportKpi[] {
  const src = getReportSource(slug)
  if (!src) return []
  const out: ReportKpi[] = []
  for (const m of src.content.matchAll(/<KPI\b([^>]*?)\/?>/g)) {
    const attr = (k: string) => m[1].match(new RegExp(`\\b${k}=(?:"([^"]*)"|'([^']*)')`))
    const v = attr("value")
    const l = attr("label")
    if (v && l) out.push({ value: v[1] ?? v[2], label: l[1] ?? l[2] })
    if (out.length >= n) break
  }
  return out
}
