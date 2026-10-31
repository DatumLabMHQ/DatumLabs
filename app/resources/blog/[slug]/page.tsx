import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <PageRules />
      <NavV3 active="research" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main" className="relative px-6 lg:px-12 py-16">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.categories?.map((c) => (
              <span key={c.slug} className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {c.title}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>

          {post.author ? (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              {post.author.image ? (
                <Image
                  src={urlFor(post.author.image).width(80).height(80).fit("crop").url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : null}
              <div>
                <div className="text-sm font-medium">{post.author.name}</div>
                {post.author.role ? <div className="text-xs text-muted-foreground">{post.author.role}</div> : null}
              </div>
            </div>
          ) : null}

          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1280).height(720).fit("crop").auto("format").url()}
              alt={post.title}
              width={1280}
              height={720}
              priority
              className="rounded-2xl border border-border w-full h-auto mb-10"
            />
          ) : null}

          <div className="text-lg">
            <RichText value={post.body} />
          </div>
        </article>
      </main>

      <FooterV3 />
    </div>
  )
}
