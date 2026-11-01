import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { Nav, Footer, PageHead, CloseCta } from "@/components/print/print-parts"
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
    <div className="sp-download">
      <div>
        <div className="sp-h3">Download the full report</div>
        <div className="sp-small">PDF, with every chart and table.</div>
      </div>
      <a href={meta.pdf} target="_blank" rel="noopener noreferrer" className="sp-btn sp-btn-primary">Download PDF</a>
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
      <Nav active="research" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main">
        <PageHead
          compact
          crumb={{ href: "/research", label: "Research" }}
          title={meta.title}
          lede={meta.summary}
          meta={
            <>
              {meta.period ? <span>Period <b>{meta.period}</b></span> : null}
              <span>Published <b>{formatDate(meta.publishedAt)}</b></span>
              <span>By <b>Datum Labs</b></span>
            </>
          }
        />

        <section className="sp-section sp-report">
          <div className="sp-wrap">
            <article className="sp-sheet sp-report-sheet">
              {meta.hero || meta.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.hero || meta.cover} alt={meta.title} className="sp-report-cover" />
              ) : null}
              {meta.gated ? <ReportGate>{body}</ReportGate> : body}
            </article>
          </div>
        </section>

        <CloseCta
          title={
            <>
              Want this for <em>your protocol?</em>
            </>
          }
        />
      </main>

      <Footer />
    </>
  )
}
