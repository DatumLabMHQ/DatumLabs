/* Server-rendered Security Print parts: the interference band, the
   statement instrument, page head, navy band, nav and footer. */

import type { ReactNode } from "react"

import { Rosette, Lathe } from "./ornament"

export const LINKS = {
  onchainsuite: "https://onchainsuite.xyz",
  setnel: "https://setnel.datumlab.xyz",
  x: "https://x.com/Datumlabs_",
  linkedin: "https://www.linkedin.com/showcase/dat-umlab/",
  email: "mailto:hello@datumlab.xyz",
  calendly: "https://calendly.com/datumlabss/30min",
}

/* Guilloche interference band: deterministic sine families, the joint
   between printed sections. */
export function GuillocheBand({ tone = "paper", className = "sp-gband" }: { tone?: "paper" | "dark"; className?: string }) {
  const paths: string[] = []
  for (let k = 0; k < 14; k++) {
    let p = "M0 28"
    for (let x = 0; x <= 1200; x += 6) {
      const y = 28 + Math.sin(x / 26 + k * 0.45) * 16 * Math.cos(x / 210 + k * 0.2)
      p += ` L${x} ${y.toFixed(2)}`
    }
    paths.push(p)
  }
  const ground = tone === "dark" ? "#060B33" : "#E9EDFB"
  const ink = tone === "dark" ? "126,151,249" : "46,79,224"
  return (
    <svg className={className} viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
      <rect width="1200" height="56" fill={ground} />
      {paths.map((d, k) => (
        <path key={k} d={d} fill="none" stroke={`rgba(${ink},${(0.18 + k * 0.014).toFixed(3)})`} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}

export type StatementLine = { label: string; value: string; sub?: boolean }

export function Statement({
  title,
  subtitle,
  lines,
  keptLabel = "Kept",
  kept,
  micr,
  specimen = true,
  label,
}: {
  title: string
  subtitle: string
  lines: StatementLine[]
  keptLabel?: string
  kept: string
  micr: { glyph: string; text: string; tip: string }[]
  specimen?: boolean
  label?: string
}) {
  return (
    <figure className="sp-instrument" aria-label={label ?? `${title}, ${subtitle}`}>
      <GuillocheBand />
      <div className="sp-inst-body">
        <div>
          <div className="sp-inst-title">{title}</div>
          <div className="sp-inst-sub">{subtitle}</div>
        </div>
        {specimen ? <span className="sp-stamp">SPECIMEN</span> : <span />}
        <div className="sp-inst-lines">
          {lines.map((l) => (
            <div key={l.label} className={l.sub ? "sub" : undefined}>
              <span>{l.label}</span>
              <span>{l.value}</span>
            </div>
          ))}
        </div>
        <div className="sp-inst-amount">
          <b>{keptLabel}</b>
          <strong>{kept}</strong>
        </div>
        <div className="sp-micr" aria-label="Traceability line">
          {micr.map((m) => (
            <span key={m.text} data-tip={m.tip} tabIndex={0}>
              <i aria-hidden="true">{m.glyph}</i>
              {m.text}
            </span>
          ))}
        </div>
      </div>
    </figure>
  )
}

export function PageHead({
  title,
  lede,
  support,
  crumb,
  meta,
  compact = false,
  children,
}: {
  compact?: boolean
  title: ReactNode
  lede?: ReactNode
  support?: ReactNode
  crumb?: { href: string; label: string }
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className={compact ? "sp-pagehead sp-pagehead-compact" : "sp-pagehead"}>
      <Rosette />
      <div className="sp-wrap">
        {crumb ? (
          <a className="sp-crumb" href={crumb.href}>
            ← {crumb.label}
          </a>
        ) : null}
        <h1 className="sp-h1">{title}</h1>
        {lede ? <p className="sp-lede">{lede}</p> : null}
        {support ? <p className="sp-support">{support}</p> : null}
        {meta ? <div className="sp-meta">{meta}</div> : null}
        {children}
      </div>
    </header>
  )
}

export function Band({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section className={`sp-band sp-section ${className}`.trim()} id={id}>
      <Lathe />
      <div className="sp-wrap">{children}</div>
    </section>
  )
}

export function CloseCta({
  title = (
    <>
      Send a protocol name. <em>Get last month back.</em>
    </>
  ),
  body = "One page, free, inside 48 hours. If it is useful, we talk. If not, you keep the page.",
}: {
  title?: ReactNode
  body?: ReactNode
}) {
  return (
    <section className="sp-section" id="start">
      <div className="sp-wrap">
        <div className="sp-close">
          <h2 className="sp-h2">{title}</h2>
          <div>
            <p className="sp-lede">{body}</p>
            <div className="sp-act">
              <a className="sp-btn sp-btn-primary" href="/contact">Get your free Snapshot</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export type NavKey = "services" | "atlas" | "research" | "podcast" | "dashboards" | "about" | "none"

const NAV: { key: NavKey; href: string; label: string }[] = [
  { key: "services", href: "/services", label: "Services" },
  { key: "atlas", href: "/platform", label: "Atlas" },
  { key: "research", href: "/research", label: "Research" },
  { key: "podcast", href: "/resources/podcast", label: "Podcast" },
  { key: "dashboards", href: "/live-dashboards", label: "Dashboards" },
  { key: "about", href: "/about", label: "About" },
]

export function Nav({ active = "none" }: { active?: NavKey }) {
  return (
    <header className="sp-nav">
      <div className="sp-nav-in">
        <a className="sp-nav-brand" href="/" aria-label="Datum Labs, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-color.svg" alt="Datum Labs" />
        </a>
        <nav className="sp-nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.key} href={n.href} aria-current={active === n.key ? "page" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="sp-btn sp-btn-ink sp-btn-sm sp-nav-cta" href="/contact">
          Contact us
        </a>
        <details className="sp-nav-menu">
          <summary>Menu</summary>
          <nav aria-label="Primary, mobile">
            {NAV.map((n) => (
              <a key={n.key} href={n.href} aria-current={active === n.key ? "page" : undefined}>
                {n.label}
              </a>
            ))}
            <a href="/contact">Contact us</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="sp-footer">
      <GuillocheBand tone="dark" />
      <div className="sp-wrap">
        <div className="sp-foot-grid">
          <div className="sp-foot-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-horizontal-white.svg" alt="Datum Labs" />
            <p>Datum Labs is a financial data and reporting service for blockchain protocols. Numbers you can defend in public.</p>
            <div className="sp-foot-sub">
              <form data-form data-endpoint="/api/subscribe" data-subject="Footer subscribe" data-done="You are on the list.">
                <label className="sr-only" htmlFor="foot-email">Email</label>
                <input id="foot-email" type="email" name="email" placeholder="Monthly research, your email" required autoComplete="email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="sp-foot-col">
            <h2>Work</h2>
            <ul>
              <li><a href="/services">Services</a></li>
              <li><a href="/platform">Atlas</a></li>
              <li><a href="/research">Research</a></li>
              <li><a href="/case-studies">Case studies</a></li>
              <li><a href="/live-dashboards">Dashboards</a></li>
            </ul>
          </div>
          <div className="sp-foot-col">
            <h2>Company</h2>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/resources/podcast">Podcast</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
            </ul>
          </div>
          <div className="sp-foot-col">
            <h2>Products</h2>
            <ul>
              <li><a href="/products">All products</a></li>
              <li><a href={LINKS.onchainsuite} target="_blank" rel="noopener">OnchainSuite ↗</a></li>
              <li><a href={LINKS.setnel} target="_blank" rel="noopener">Setnel ↗</a></li>
              <li><a href={LINKS.x} target="_blank" rel="noopener">X ↗</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="sp-foot-base">
          <span>© 2026 Datum Labs</span>
          <span>Financial data and reporting for blockchain protocols</span>
          <a href={LINKS.email}>hello@datumlab.xyz</a>
        </div>
      </div>
    </footer>
  )
}
