"use client"

import { useEffect, useRef, useState } from "react"

const CAL = "https://calendly.com/datumlabss/30min"

type LabItem = { label: string; href: string; note: string; ext?: boolean }

// Research and Podcast are pages of their own; the Lab menu holds what we
// build, laid out side by side: the live dashboards and the products.
const LAB: (LabItem & { group: string })[] = [
  { group: "Dashboards", label: "Live dashboards", href: "/live-dashboards", note: "Protocol terminals, rebuilt from the chain" },
  { group: "Product", label: "OnchainSuite", href: "https://onchainsuite.com", note: "Retention for onchain businesses", ext: true },
  { group: "Product", label: "Setnel", href: "https://setnel.datumlab.xyz", note: "Onchain risk monitoring", ext: true },
]

function Chevron() {
  return (
    <svg className="op-chev" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function OpNav({ active, tone = "sky" }: { active?: "research" | "podcast" | "lab"; tone?: "sky" | "paper" }) {
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

  const cur = (k: "research" | "podcast") => (active === k ? { "aria-current": "page" as const } : {})

  return (
    <header className={tone === "paper" ? "op-nav op-nav-paper" : "op-nav"}>
      <a href="/" className="op-brand" aria-label="Datum Labs, home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tone === "paper" ? "/brand/logo-horizontal-color.svg" : "/brand/logo-horizontal-white.svg"} alt="Datum Labs" />
      </a>

      <nav className="op-nav-mid" aria-label="Main">
        <a className="op-nl" href="/research" {...cur("research")}>Research</a>
        <div className="op-lab" ref={ref}>
          <button
            type="button"
            className={open ? "op-nl is-open" : "op-nl"}
            {...(active === "lab" ? { "data-current": "" } : {})}
            aria-expanded={open}
            aria-controls="op-lab"
            onClick={() => setOpen((v) => !v)}
          >
            Lab <Chevron />
          </button>
          <div id="op-lab" className={open ? "op-panel is-open" : "op-panel"} role="region" aria-label="Lab">
            {LAB.map((it) => (
              <a
                key={it.label}
                href={it.href}
                {...(it.ext ? { target: "_blank", rel: "noopener" } : {})}
                className="op-link"
              >
                <span className="op-group-h">{it.group}</span>
                <span className="op-link-t">
                  {it.label}
                  {it.ext ? <span aria-hidden="true" className="op-ext">↗</span> : null}
                </span>
                <span className="op-link-d">{it.note}</span>
              </a>
            ))}
          </div>
        </div>
        <a className="op-nl" href="/resources/podcast" {...cur("podcast")}>Podcast</a>
      </nav>

      <a className="op-cta" href={CAL} target="_blank" rel="noopener">
        Book a call
      </a>
    </header>
  )
}
