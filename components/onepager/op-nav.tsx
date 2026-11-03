"use client"

import { useEffect, useRef, useState } from "react"

const CAL = "https://calendly.com/datumlabss/30min"

type LabItem = { label: string; href: string; note: string; ext?: boolean }

const LAB: { heading: string; items: LabItem[] }[] = [
  {
    heading: "Research",
    items: [
      { label: "Research & Reports", href: "/resources", note: "Monthly State of Lending and protocol reads" },
      { label: "All reports", href: "/resources/reports", note: "Every published report" },
    ],
  },
  {
    heading: "Dashboards",
    items: [
      { label: "Live dashboards", href: "/live-dashboards", note: "Protocol terminals, rebuilt from the chain" },
      { label: "Dune dashboards", href: "/dune-dashboard", note: "Our public Dune index" },
    ],
  },
  {
    heading: "Products",
    items: [
      { label: "OnchainSuite", href: "https://onchainsuite.com", note: "Retention for onchain businesses", ext: true },
      { label: "Setnel", href: "https://setnel.datumlab.xyz", note: "Onchain risk monitoring", ext: true },
    ],
  },
]

export function OpNav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
    }
  }, [open])

  return (
    <header className="op-nav">
      <a href="/" className="op-brand" aria-label="Datum Labs, home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-horizontal-white.svg" alt="Datum Labs" />
      </a>

      <div className="op-nav-mid" ref={ref}>
        <button
          type="button"
          className={open ? "op-pill is-open" : "op-pill"}
          aria-expanded={open}
          aria-controls="op-lab"
          onClick={() => setOpen((v) => !v)}
        >
          Lab <span aria-hidden="true" className="op-plus">+</span>
        </button>
        <a className="op-pill" href="/resources/podcast">Podcast</a>

        <div id="op-lab" className={open ? "op-panel is-open" : "op-panel"} role="region" aria-label="Lab">
          {LAB.map((col) => (
            <div key={col.heading} className="op-col">
              <p className="op-col-h">{col.heading}</p>
              {col.items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  {...(it.ext ? { target: "_blank", rel: "noopener" } : {})}
                  className="op-link"
                >
                  <span className="op-link-t">
                    {it.label}
                    {it.ext ? <span aria-hidden="true"> ↗</span> : null}
                  </span>
                  <span className="op-link-d">{it.note}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a className="op-cta" href={CAL} target="_blank" rel="noopener">
        Book a call <span aria-hidden="true">→</span>
      </a>
    </header>
  )
}
