import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { ArticleShell } from "@/components/onepager/article-shell"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { getAllReports, getReportMeta, getReportSlugs, getReportSource } from "@/lib/reports"

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
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
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
    <div className="art-pdf">
      <div>
        <p className="art-pdf-t">Download the full report</p>
        <p className="art-pdf-d">PDF, for reading offline or sharing with your team.</p>
      </div>
      <a href={meta.pdf} target="_blank" rel="noopener noreferrer" className="art-btn">
        Download PDF <span aria-hidden="true">↓</span>
      </a>
    </div>
  ) : null

  const body = (
    <>
      {downloadCta}
      <div className="report-body">{content}</div>
    </>
  )

  const more = getAllReports()
    .filter((r) => r.slug !== meta.slug)
    .slice(0, 3)
    .map((r) => ({
      title: r.title,
      href: `/resources/reports/${r.slug}`,
      date: new Date(r.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      kind: "Report",
      cover: r.cover,
    }))

  return (
    <ArticleShell
      kicker={meta.period ? `Report · ${meta.period}` : "Report"}
      title={meta.title}
      summary={meta.summary}
      meta={<span>Published {formatDate(meta.publishedAt)} &middot; Datum Labs</span>}
      cover={meta.hero || meta.cover}
      more={more}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {body}
    </ArticleShell>
  )
}
