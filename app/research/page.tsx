import type { Metadata } from "next"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { ResearchIndex, type ResearchItem } from "@/components/onepager/research-index"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"
import type { ResourceItem } from "@/components/resources-browser"
import { sanityFetch } from "@/sanity/lib/client"
import { allResourcesQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { getAllReports } from "@/lib/reports"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Research — Datum Labs",
  description:
    "Monthly reports on onchain lending, real-world assets and market structure, with the articles and case studies behind Datum Labs client work.",
  alternates: { canonical: "/research" },
  openGraph: { title: "Research — Datum Labs", url: "/research", type: "website" },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function coverUrl(image: unknown): string | undefined {
  if (!image) return undefined
  if (typeof image === "string") return image
  try {
    return urlFor(image).width(960).height(720).fit("crop").auto("format").url()
  } catch {
    return undefined
  }
}

export default async function ResearchPage() {
  // Same two sources as the old hub: reports are repo MDX, everything else is Sanity.
  const sanity = await sanityFetch<ResourceItem[]>(allResourcesQuery, {}, [])
  const posts: ResearchItem[] = sanity
    .filter((i) => i._type !== "report")
    .map((i) => ({
      id: i._id,
      title: i.title,
      href: `/resources/blog/${i.slug}`,
      kind: i.kind,
      date: i.publishedAt,
      summary: i.subtitle,
      cover: coverUrl(i.image),
    }))
  const reports: ResearchItem[] = getAllReports().map((r) => ({
    id: `mdx-${r.slug}`,
    title: r.title,
    href: `/resources/reports/${r.slug}`,
    kind: "Reports",
    date: r.publishedAt,
    period: r.period,
    summary: r.excerpt || r.summary,
    cover: r.hero || r.cover,
  }))

  const items = [...reports, ...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((i) => ({ ...i, date: formatDate(i.date) }))
  const nReports = reports.length
  const nOther = posts.length

  return (
    <div className={`pod-root ${opFonts}`}>
      <header className="pod-hero rs-hero">
        <Sky className="pod-sky" />
        <OpNav active="research" />
        <div className="pod-hero-in">
          <h1 className="pod-h1">Research</h1>
          <p className="pod-sub">
            Monthly reports on onchain lending, real-world assets and market structure, and the articles and case
            studies behind our client work.
          </p>
          <p className="pod-count rs-count">
            {nReports} reports{nOther ? ` · ${nOther} articles and notes` : ""}
          </p>
        </div>
      </header>

      <main id="main" className="pod-main">
        {items.length ? (
          <ResearchIndex items={items} />
        ) : (
          <p className="pod-empty">The first reports are on their way.</p>
        )}
      </main>

      <footer className="pod-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
