import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Nav, Footer, PageHead, CloseCta } from "@/components/print/print-parts"
import { RichText } from "@/components/portable-text"
import { sanityFetch } from "@/sanity/lib/client"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { isSanityConfigured } from "@/sanity/env"

export const revalidate = 60

type Post = {
  title: string
  slug: string
  excerpt?: string
  mainImage?: unknown
  body?: unknown
  publishedAt: string
  _updatedAt: string
  author?: { name: string; role?: string; image?: unknown; bio?: string }
  categories?: { title: string; slug: string }[]
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: unknown }
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  const slugs = await sanityFetch<{ slug: string }[]>(postSlugsQuery, {}, [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null)
  if (!post) return { title: "Post not found | Datum Labs" }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt || undefined
  const ogSource = post.seo?.ogImage || post.mainImage
  const ogImage = ogSource ? urlFor(ogSource).width(1200).height(630).fit("crop").url() : undefined

  return {
    title: `${title} | Datum Labs`,
    description,
    alternates: { canonical: `/resources/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/resources/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: ogImage ? [ogImage] : undefined },
  }
}

function formatDate(d?: string) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null)
  if (!post) notFound()

  const ogSource = post.seo?.ogImage || post.mainImage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: post.author ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: "Datum Labs" },
    publisher: { "@type": "Organization", name: "Datum Labs" },
    image: ogSource ? urlFor(ogSource).width(1200).height(630).fit("crop").url() : undefined,
    mainEntityOfPage: `https://www.datumlab.xyz/resources/blog/${post.slug}`,
  }

  return (
    <>
      <Nav active="research" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main">
        <PageHead
          compact
          crumb={{ href: "/research", label: "Research" }}
          title={post.title}
          meta={
            <>
              {post.categories?.map((c) => (
                <span key={c.slug}>
                  <b>{c.title}</b>
                </span>
              ))}
              <span>Published <b>{formatDate(post.publishedAt)}</b></span>
              {post.author ? (
                <span>
                  By <b>{post.author.name}</b>
                  {post.author.role ? `, ${post.author.role}` : null}
                </span>
              ) : null}
            </>
          }
        />

        <section className="sp-section sp-report">
          <div className="sp-wrap">
            <article className="sp-sheet sp-report-sheet">
              {post.mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(post.mainImage).width(1280).height(720).fit("crop").auto("format").url()}
                  alt={post.title}
                  className="sp-report-cover"
                />
              ) : null}
              <RichText value={post.body} />
            </article>
          </div>
        </section>

        <CloseCta />
      </main>

      <Footer />
    </>
  )
}
