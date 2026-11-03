"use client"

import { useMemo, useState } from "react"

export type ResearchItem = {
  id: string
  title: string
  href: string
  kind: "Reports" | "Articles" | "Case Study" | "Research"
  date: string
  period?: string
  summary?: string
  cover?: string
}

const LABEL: Record<ResearchItem["kind"], string> = {
  Reports: "Report",
  Articles: "Article",
  "Case Study": "Case study",
  Research: "Research note",
}
const PLURAL: Record<ResearchItem["kind"], string> = {
  Reports: "Reports",
  Articles: "Articles",
  "Case Study": "Case studies",
  Research: "Research notes",
}
const FILTERS = ["All", "Reports", "Articles", "Case Study", "Research"] as const
type Filter = (typeof FILTERS)[number]

export function ResearchIndex({ items }: { items: ResearchItem[] }) {
  const [filter, setFilter] = useState<Filter>("All")

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length }
    for (const i of items) c[i.kind] = (c[i.kind] ?? 0) + 1
    return c
  }, [items])

  const lead = items.find((i) => i.kind === "Reports") ?? items[0]
  const shown = items.filter((i) => (filter === "All" ? i.id !== lead?.id : i.kind === filter))

  return (
    <>
      {lead ? (
        <a className="rs-lead" href={lead.href}>
          <div className="rs-lead-copy">
            <p className="pod-meta">
              Latest {LABEL[lead.kind].toLowerCase()}
              {lead.period ? ` · ${lead.period}` : ""} &middot; {lead.date}
            </p>
            <h2 className="rs-lead-t">{lead.title}</h2>
            {lead.summary ? <p className="rs-lead-d">{lead.summary}</p> : null}
            <span className="rs-read">
              Read the {LABEL[lead.kind].toLowerCase()} <span aria-hidden="true">→</span>
            </span>
          </div>
          {lead.cover ? (
            <div className="rs-lead-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.cover} alt="" />
            </div>
          ) : null}
        </a>
      ) : null}

      {Object.keys(counts).length > 2 ? (
        <div className="rs-filters" role="tablist" aria-label="Filter research">
          {FILTERS.filter((f) => f === "All" || counts[f]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={filter === f ? "rs-filter is-on" : "rs-filter"}
              onClick={() => setFilter(f)}
            >
              {f === "All" ? "Everything" : PLURAL[f]}
              <span className="rs-filter-n">{counts[f]}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rs-filters" aria-hidden="true" />
      )}

      <ol className="rs-list">
        {shown.map((it) => (
          <li key={it.id}>
            <a className="rs-row" href={it.href}>
              <span className="rs-date">{it.date}</span>
              <span className="rs-row-main">
                <span className="rs-row-t">{it.title}</span>
                {it.summary ? <span className="rs-row-d">{it.summary}</span> : null}
              </span>
              <span className="rs-kind">{LABEL[it.kind]}</span>
              <span className="rs-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ol>
    </>
  )
}
