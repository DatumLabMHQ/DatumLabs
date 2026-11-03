import type { Metadata } from "next"

import { OpNav } from "@/components/onepager/op-nav"
import { NewsletterForm } from "@/components/onepager/newsletter-form"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"
import type { ResourceItem } from "@/components/resources-browser"
import { sanityFetch } from "@/sanity/lib/client"
import { allResourcesQuery } from "@/sanity/lib/queries"
import { getAllReports, getReportKpis, type ReportKpi } from "@/lib/reports"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Research — Datum Labs",
  description:
    "Monthly reports on onchain lending, real-world assets and market structure, with the articles and case studies behind Datum Labs client work.",
  alternates: { canonical: "/research" },
  openGraph: { title: "Research — Datum Labs", url: "/research", type: "website" },
}

type Entry = {
  id: string
  title: string
  href: string
  date: string
  summary?: string
  period?: string
  cover?: string
  kpis: ReportKpi[]
}

const SECTION: Record<ResourceItem["kind"], string> = {
  Reports: "Reports",
  Articles: "Articles",
  "Case Study": "Case studies",
  Research: "Research notes",
}

function day(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function Ledger({ title, entries, figures }: { title: string; entries: Entry[]; figures: boolean }) {
  return (
    <section className="rx-ledger" aria-labelledby={`rx-${title}`}>
      <div className="rx-ledger-head">
        <h2 id={`rx-${title}`} className="rx-ledger-h">{title}</h2>
        <span className="rx-ledger-n">{entries.length}</span>
      </div>
      <div className={figures ? "rx-cols" : "rx-cols rx-cols-plain"} aria-hidden="true">
        <span>Published</span>
        <span>Title</span>
        {figures ? <span>Headline figure</span> : null}
      </div>
      <ol className="rx-rows">
        {entries.map((e) => (
          <li key={e.id}>
            <a className={figures ? "rx-row" : "rx-row rx-row-plain"} href={e.href}>
              <span className="rx-date">{e.date}</span>
              <span className="rx-main">
                <span className="rx-t">{e.title}</span>
                {e.summary ? <span className="rx-d">{e.summary}</span> : null}
              </span>
              {figures ? (
                <span className="rx-fig">
                  {e.kpis[0] ? (
                    <>
                      <span className="rx-fig-v">{e.kpis[0].value}</span>
                      <span className="rx-fig-l">{e.kpis[0].label}</span>
                    </>
                  ) : null}
                </span>
              ) : null}
              <span className="rx-go" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default async function ResearchPage() {
  // Reports are repo MDX; articles, case studies and notes come from Sanity.
  const reports: Entry[] = getAllReports().map((r) => ({
    id: `mdx-${r.slug}`,
    title: r.title,
    href: `/resources/reports/${r.slug}`,
    date: day(r.publishedAt),
    summary: r.excerpt || r.summary,
    period: r.period,
    cover: r.hero || r.cover,
    kpis: getReportKpis(r.slug, 3),
  }))

  const sanity = await sanityFetch<ResourceItem[]>(allResourcesQuery, {}, [])
  const groups = new Map<string, Entry[]>()
  for (const i of sanity.filter((x) => x._type !== "report")) {
    const name = SECTION[i.kind] ?? "Articles"
    const list = groups.get(name) ?? []
    list.push({ id: i._id, title: i.title, href: `/resources/blog/${i.slug}`, date: day(i.publishedAt), summary: i.subtitle, kpis: [] })
    groups.set(name, list)
  }

  const [lead, ...rest] = reports

  return (
    <div className={`pp-root ${opFonts}`}>
      <OpNav tone="paper" active="research" />

      <header className="pp-mast">
        <div>
          <p className="pp-eyebrow">Datum Labs</p>
          <h1 className="pp-h1">Research</h1>
        </div>
        <div className="pp-mast-r">
          <p className="pp-lede">
            Monthly reports on onchain lending, real-world assets and market structure, with the numbers behind every
            claim and a note on where the data stops.
          </p>
          <div className="pp-sub">
            <p className="pp-sub-t">Get each report the day it is published</p>
            <NewsletterForm tone="paper" />
          </div>
        </div>
      </header>

      <main id="main" className="pp-main">
        {lead ? (
          <a className="rx-lead" href={lead.href}>
            {lead.cover ? (
              <span className="rx-lead-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.cover} alt="" />
              </span>
            ) : null}
            <span className="rx-lead-copy">
              <span className="rx-lead-k">
                Latest report{lead.period ? ` · ${lead.period}` : ""} · {lead.date}
              </span>
              <span className="rx-lead-t">{lead.title}</span>
              {lead.summary ? <span className="rx-lead-d">{lead.summary}</span> : null}
              {lead.kpis.length ? (
                <span className="rx-kpis">
                  {lead.kpis.map((k) => (
                    <span key={k.label} className="rx-kpi">
                      <span className="rx-kpi-v">{k.value}</span>
                      <span className="rx-kpi-l">{k.label}</span>
                    </span>
                  ))}
                </span>
              ) : null}
              <span className="rx-lead-go">
                Read the report <span aria-hidden="true">→</span>
              </span>
            </span>
          </a>
        ) : (
          <p className="pp-empty">The first reports are on their way.</p>
        )}

        {rest.length ? <Ledger title="All reports" entries={rest} figures /> : null}
        {[...groups.entries()].map(([name, entries]) => (
          <Ledger key={name} title={name} entries={entries} figures={false} />
        ))}
      </main>

      <footer className="pod-foot art-foot pp-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
