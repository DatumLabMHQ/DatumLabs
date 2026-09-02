import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { RevealController } from "@/components/reveal-controller"
import { ReportGate } from "@/components/report-gate"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { getReportMeta, getReportSlugs, getReportSource } from "@/lib/reports"

export const dynamicParams = false

export function generateStaticParams() {
  return getReportSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = getReportMeta(slug)
  if (!m) return { title: "Report not found | Datum Labs" }
  const title = `${m.title} | Datum Labs`
  return {
    title,
    description: m.summary,
    alternates: { canonical: `/resources/reports/${m.slug}` },
    openGraph: {
      title,
      description: m.summary,
      url: `/resources/reports/${m.slug}`,
      type: "article",
      publishedTime: m.publishedAt,
      images: m.cover ? [{ url: m.cover }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description: m.summary },
  }
}

function formatDate(d?: string) {
  if (!d) return ""
  const t = new Date(d)
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const src = getReportSource(slug)
  if (!src) notFound()
  const { meta } = src
  const { content } = await compileMDX({
    source: src.content,
    components: mdxComponents,
    // Reports are first-party MDX committed to this repo (trusted authors), so we
    // allow expression attributes — `blockJS: true` (next-mdx-remote's default)
    // strips every `{...}` prop, which silently emptied all <Chart> data/series.
    // `blockDangerousJS` stays on: eval/Function/process/etc. are still blocked.
    options: {
      parseFrontmatter: false,
      blockJS: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.publishedAt,
    author: { "@type": "Organization", name: "Datum Labs" },
    publisher: {
      "@type": "Organization",
      name: "Datum Labs",
      logo: { "@type": "ImageObject", url: "https://www.datumlab.xyz/brand/logo-mark-blue.svg" },
    },
    image: meta.cover ? `https://www.datumlab.xyz${meta.cover}` : undefined,
    mainEntityOfPage: `https://www.datumlab.xyz/resources/reports/${meta.slug}`,
  }

  const downloadCta = meta.pdf ? (
    <div className="rpt-callout rpt-callout-brand" style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
      <div>
        <div className="rpt-callout-t">Download the full report</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>PDF</div>
      </div>
      <a href={meta.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        <Download style={{ width: 16, height: 16, marginRight: 8 }} /> Download PDF
      </a>
    </div>
  ) : null

  const body = (
    <>
      {downloadCta}
      <div className="report-body">{content}</div>
    </>
  )

  return (
    <>
      <RevealController />
      <SiteNav active="Resources" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="page-header">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Link href="/resources/reports" className="kicker" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Reports
          </Link>
          {meta.period ? <div className="kicker" style={{ marginBottom: 8 }}>{meta.period}</div> : null}
          <h1>{meta.title}</h1>
          <p>{meta.summary}</p>
          <div className="meta-row"><span>Published {formatDate(meta.publishedAt)}</span></div>
        </div>
      </header>

      <main id="main" className="wrap">
        <article style={{ maxWidth: 820, margin: "0 auto", paddingBottom: 40 }}>
          {(meta.hero || meta.cover) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={meta.hero || meta.cover} alt={meta.title} className="rpt-figure" style={{ width: "100%", borderRadius: 16, border: "1px solid var(--border-subtle)", margin: "8px 0 24px" }} />
          ) : null}
          {meta.gated ? <ReportGate>{body}</ReportGate> : body}
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
