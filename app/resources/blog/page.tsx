import type { Metadata } from "next"

import { Nav, Footer, PageHead } from "@/components/print/print-parts"
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

function postMeta(p: Post) {
  return [p.categories?.[0]?.title, formatDate(p.publishedAt), p.author ? `By ${p.author.name}` : undefined]
    .filter(Boolean)
    .join(" · ")
}

function Cover({ p, lazy = false }: { p: Post; lazy?: boolean }) {
  return (
    <div className="sp-cover-img">
      {p.mainImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(p.mainImage).width(720).height(405).fit("crop").auto("format").url()}
          alt={p.title}
          width={720}
          height={405}
          loading={lazy ? "lazy" : undefined}
        />
      ) : (
        <div className="sp-cover-ph" />
      )}
    </div>
  )
}

export default async function BlogIndexPage() {
  const posts = await sanityFetch<Post[]>(postsQuery, {}, [])
  const [feature, ...rest] = posts
  const side = rest.slice(0, 2)
  const more = rest.slice(2)

  return (
    <>
      <Nav active="research" />

      <main id="main">
        <PageHead
          crumb={{ href: "/research", label: "Research" }}
          title="Blog"
          lede="Analysis and commentary on DeFi data, lending markets, and on-chain intelligence."
        />

        <section className="sp-section" id="posts">
          <div className="sp-wrap">
            {!feature ? (
              <p className="sp-small">
                No posts yet.{" "}
                <a className="sp-link" href="/studio">
                  Open the Studio
                </a>{" "}
                to publish the first one.
              </p>
            ) : (
              <>
                <div className="sp-covers">
                  <a className="sp-cover sp-cover-feature" href={`/resources/blog/${feature.slug}`}>
                    <Cover p={feature} />
                    <h3 className="sp-h3">{feature.title}</h3>
                    <div className="sp-cover-m">{postMeta(feature)}</div>
                    {feature.excerpt ? <p>{feature.excerpt}</p> : null}
                  </a>
                  {side.length ? (
                    <div className="sp-covers-side">
                      {side.map((p) => (
                        <a className="sp-cover" key={p._id} href={`/resources/blog/${p.slug}`}>
                          <Cover p={p} lazy />
                          <h3 className="sp-h3">{p.title}</h3>
                          <div className="sp-cover-m">{postMeta(p)}</div>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>

                {more.length ? (
                  <ul className="sp-ledger" style={{ marginTop: 56 }}>
                    {more.map((p) => (
                      <li key={p._id}>
                        <h3 className="sp-h3">
                          <a className="sp-link" href={`/resources/blog/${p.slug}`}>
                            {p.title}
                          </a>
                        </h3>
                        <p>{p.excerpt}</p>
                        <span className="sp-l-meta">
                          {[formatDate(p.publishedAt), p.author ? `By ${p.author.name}` : undefined].filter(Boolean).join(" · ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
