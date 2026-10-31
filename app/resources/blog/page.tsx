import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
import { sanityFetch } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export const revalidate = 60

export const metadata: Metadata = {
  title: "DeFi Data & Onchain Analytics Blog | Datum Labs",
  description:
    "Analysis and explainers on DeFi data, lending protocols, RWAs, and onchain analytics from Datum Labs.",
  alternates: { canonical: "/resources/blog" },
  openGraph: { title: "DeFi Data & Onchain Analytics Blog | Datum Labs", url: "/resources/blog", type: "website" },
}

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: unknown
  publishedAt: string
  author?: { name: string; role?: string }
  categories?: { title: string; slug: string }[]
}

function formatDate(d?: string) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function BlogIndexPage() {
  const posts = await sanityFetch<Post[]>(postsQuery, {}, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <PageRules />
      <NavV3 active="research" />

      <main id="main" className="relative px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">
                Resources
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-primary">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Analysis and commentary on DeFi data, lending markets, and on-chain intelligence.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-12 text-center">
              <p className="text-muted-foreground">
                No posts yet.{" "}
                <Link href="/studio" className="text-primary hover:underline">
                  Open the Studio
                </Link>{" "}
                to publish the first one.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <Link
                  key={p._id}
                  href={`/resources/blog/${p.slug}`}
                  className="group rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all bg-card flex flex-col"
                >
                  {p.mainImage ? (
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <Image
                        src={urlFor(p.mainImage).width(720).height(405).fit("crop").auto("format").url()}
                        alt={p.title}
                        width={720}
                        height={405}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {p.categories?.slice(0, 1).map((c) => (
                        <span key={c.slug} className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {c.title}
                        </span>
                      ))}
                      <span className="text-xs text-muted-foreground">{formatDate(p.publishedAt)}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h2>
                    {p.excerpt ? <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{p.excerpt}</p> : null}
                    {p.author ? (
                      <div className="text-xs text-muted-foreground mt-4">By {p.author.name}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <FooterV3 />
    </div>
  )
}
