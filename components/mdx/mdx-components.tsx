import type { ReactNode } from "react"

import { Chart } from "@/components/mdx/report-components/chart"

/**
 * Component map available inside report MDX. Standard markdown (h2, p, ul,
 * table, blockquote, code…) is styled by `.report-body` in app/v3/report-body.css.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * ADDING YOUR OWN COMPONENT (full autonomy — no one else needed):
 *   1. Create a file in `components/mdx/report-components/`, e.g. `my-widget.tsx`.
 *      Add "use client" at the top if it's interactive (charts, toggles, etc.).
 *   2. Import it below and add it to the `mdxComponents` object.
 *   3. Use it in any report MDX by that name: <MyWidget ... />.
 *   Commit → it deploys. No central review, no messaging anyone.
 *
 * Charts need no new component — use the built-in <Chart> (line/area/bar),
 * driven entirely by MDX data props. See content/reports/README.md.
 * ───────────────────────────────────────────────────────────────────────────
 */

function Callout({ title, children, tone = "default" }: { title?: string; children: ReactNode; tone?: "default" | "brand" | "warn" }) {
  return (
    <div className={`rpt-callout rpt-callout-${tone}`}>
      {title ? <div className="rpt-callout-t">{title}</div> : null}
      <div>{children}</div>
    </div>
  )
}

function KPIGrid({ children }: { children: ReactNode }) {
  return <div className="rpt-kpis">{children}</div>
}

function KPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rpt-kpi">
      <div className="rpt-kpi-v">{value}</div>
      <div className="rpt-kpi-l">{label}</div>
      {sub ? <div className="rpt-kpi-s">{sub}</div> : null}
    </div>
  )
}

function Figure({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="rpt-figure">
      {/* plain img: report figures are often SVG/remote; no next/image sizing needed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ""} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

export const mdxComponents = { Callout, KPIGrid, KPI, Figure, Chart }
