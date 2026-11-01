import type { Metadata } from "next"
import Script from "next/script"

import { Nav, Footer, PageHead } from "@/components/print/print-parts"
import { sanityFetch } from "@/sanity/lib/client"
import { allResourcesQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { getAllReports } from "@/lib/reports"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Research — State of Lending & Protocol Finance | Datum Labs",
  description:
    "Monthly State of Lending reports, protocol P&L reads, and onchain research from Datum Labs. Every figure traceable to the run behind it.",
  alternates: { canonical: "/research" },
  openGraph: { title: "Research | Datum Labs", url: "/research", type: "website" },
}

type SanityItem = {
  _type: "post" | "report"
  _id: string
  title: string
  slug: string
  kind?: string
  extra?: string
  publishedAt: string
  image?: unknown
  subtitle?: string
}

type Entry = {
  id: string
  cat: "r" | "a"
  title: string
  href: string
  excerpt?: string
  period?: string
  publishedAt: string
  coverUrl?: string
}

function fmtDate(d?: string) {
  if (!d) return ""
  const t = new Date(d)
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

function Cover({ e }: { e: Entry }) {
  return (
    <div className="sp-cover-img">
      {e.coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={e.coverUrl} alt="" loading="lazy" />
      ) : (
        <div className="sp-cover-ph" aria-hidden="true" />
      )}
    </div>
  )
}

function kind(e: Entry) {
  return e.cat === "r" ? "Report" : "Article"
}

export default async function ResearchPage() {
  const sanity = await sanityFetch<SanityItem[]>(allResourcesQuery, {}, [])

  const articles: Entry[] = sanity
    .filter((i) => i._type !== "report")
    .map((i) => ({
      id: i._id,
      cat: "a" as const,
      title: i.title,
      href: `/resources/blog/${i.slug}`,
      excerpt: i.subtitle,
      period: i.kind && i.kind !== "Articles" ? i.kind : undefined,
      publishedAt: i.publishedAt,
      coverUrl: i.image ? urlFor(i.image).width(720).height(405).fit("crop").auto("format").url() : undefined,
    }))

  const reports: Entry[] = getAllReports().map((r) => ({
    id: `mdx-${r.slug}`,
    cat: "r" as const,
    title: r.title,
    href: `/resources/reports/${r.slug}`,
    excerpt: r.excerpt || r.summary,
    period: r.period,
    publishedAt: r.publishedAt,
    coverUrl: r.cover || undefined,
  }))

  const all = [...reports, ...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  const featured = all.find((e) => e.cat === "r") ?? all[0]
  const grid = all.filter((e) => e !== featured)

  return (
    <>
      <Nav active="research" />

      <main id="main">
        <PageHead
          title={
            <>
              Research, <em>in public.</em>
            </>
          }
          lede="Monthly State of Lending, protocol P&L reads, and what the public trackers miss. Every figure traceable to the run behind it."
        >
          <form
            className="sp-research-sub"
            data-form
            data-endpoint="/api/subscribe"
            data-subject="Subscribe to research"
            data-done="You are on the list."
          >
            <label className="sr-only" htmlFor="research-email">Email</label>
            <input id="research-email" type="email" name="email" placeholder="Your email, for the monthly issue" required autoComplete="email" />
            <button type="submit" className="sp-btn sp-btn-primary">Subscribe</button>
          </form>
          <p className="sp-small" style={{ marginTop: 10 }}>Monthly. No spam, unsubscribe any time.</p>
        </PageHead>

        {featured ? (
          <section className="sp-section" id="latest">
            <div className="sp-wrap">
              <a className="sp-cover sp-cover-lead" href={featured.href}>
                <Cover e={featured} />
                <div>
                  <div className="sp-cover-m">
                    {kind(featured)}
                    {featured.period ? `, ${featured.period}` : ""}
                    {`, ${fmtDate(featured.publishedAt)}`}
                  </div>
                  <h2 className="sp-h2">{featured.title}</h2>
                  {featured.excerpt ? <p className="sp-lede">{featured.excerpt}</p> : null}
                  <span className="sp-link">Read the report</span>
                </div>
              </a>
            </div>
          </section>
        ) : null}

        <section className="sp-section sp-tight" id="all">
          <div className="sp-wrap">
            <div className="sp-head">
              <h2 className="sp-h2">All published work.</h2>
              <div className="sp-tabs" role="group" aria-label="Filter published work">
                <button type="button" className="sp-tab" data-filter="all" aria-pressed="true">All</button>
                <button type="button" className="sp-tab" data-filter="r" aria-pressed="false">Reports</button>
                <button type="button" className="sp-tab" data-filter="a" aria-pressed="false">Articles</button>
              </div>
            </div>
            {grid.length === 0 ? (
              <p className="sp-small">Published work appears here.</p>
            ) : (
              <>
                <div className="sp-cover-grid">
                  {grid.map((e) => (
                    <a className="sp-cover" data-cat={e.cat} key={e.id} href={e.href}>
                      <Cover e={e} />
                      <h3 className="sp-h3">{e.title}</h3>
                      <div className="sp-cover-m">
                        {kind(e)}
                        {e.period ? `, ${e.period}` : ""}
                        {`, ${fmtDate(e.publishedAt)}`}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="sp-more">
                  <button type="button" className="sp-btn sp-btn-ink" id="sp-more">Load more</button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <Script id="research-filter" strategy="afterInteractive">{`
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.sp-tab'));
  var cards=[].slice.call(document.querySelectorAll('.sp-cover-grid .sp-cover'));
  var more=document.getElementById('sp-more');
  if(!more||!cards.length)return;
  var PAGE=9, shown=PAGE, filter='all';
  function render(){
    var match=cards.filter(function(c){return filter==='all'||c.dataset.cat===filter});
    cards.forEach(function(c){c.hidden=true});
    match.slice(0,shown).forEach(function(c){c.hidden=false});
    more.parentNode.hidden = match.length<=shown;
  }
  tabs.forEach(function(b){b.addEventListener('click',function(){
    filter=b.dataset.filter; shown=PAGE;
    tabs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    render();
  })});
  more.addEventListener('click',function(){shown+=PAGE;render()});
  render();
})();
      `}</Script>
    </>
  )
}
