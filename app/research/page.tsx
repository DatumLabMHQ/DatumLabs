import type { Metadata } from "next"
import Script from "next/script"
import { Mailbox } from "@phosphor-icons/react/dist/ssr"

import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
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

function Cover({ e, ratio = false }: { e: Entry; ratio?: boolean }) {
  const img = e.coverUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={e.coverUrl} alt="" loading="lazy" />
  ) : (
    <div className="rcard-ph" aria-hidden="true" />
  )
  return ratio ? <div className="rfeature-ratio">{img}</div> : img
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
      <PageRules />
      <NavV3 active="research" navDark={false} />

      <main id="main">
        <h1 className="sr-only">Research</h1>
        <section className="section" id="latest" data-nav-light>
          <div className="wrap">
            <div className="rhero-row">
              {featured ? (
                <article className="rfeature rhero" data-cat={featured.cat}>
                  <div className="rfeature-cover"><Cover e={featured} ratio /></div>
                  <div className="rfeature-body">
                    <div className="rcard-meta">
                      <span className="pill">{featured.cat === "r" ? "Reports" : "Articles"}</span>
                      {featured.period ? <span className="pill pill-quiet">{featured.period}</span> : null}
                      <span className="rcard-date">{fmtDate(featured.publishedAt)}</span>
                    </div>
                    <h2><a className="rcard-link" href={featured.href}>{featured.title}</a></h2>
                    {featured.excerpt ? <p>{featured.excerpt}</p> : null}
                  </div>
                </article>
              ) : null}
              <aside className="rsub2">
                <span className="rsub2-ic"><i aria-hidden="true"><Mailbox weight="duotone" /></i></span>
                <h2>Subscribe for protocol finance &amp; research updates</h2>
                <p>Monthly State of Lending, protocol P&amp;L reads, and what the public trackers miss.</p>
                <form
                  className="rsub2-form"
                  data-form
                  data-endpoint="/api/subscribe"
                  data-subject="Subscribe to research"
                  data-done="You are on the list."
                >
                  <input type="email" name="email" placeholder="Enter your email" aria-label="Email" required autoComplete="email" />
                  <button type="submit">Subscribe</button>
                </form>
                <p className="rsub2-fine">Monthly. No spam, unsubscribe any time.</p>
              </aside>
            </div>

            <div className="rtabs" role="group" aria-label="Filter published work">
              <button type="button" className="rtab is-on" data-filter="all" aria-pressed="true">All</button>
              <button type="button" className="rtab" data-filter="r" aria-pressed="false">Reports</button>
              <button type="button" className="rtab" data-filter="a" aria-pressed="false">Articles</button>
            </div>

            {grid.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>Published work appears here.</p>
            ) : (
              <>
                <div className="rgrid">
                  {grid.map((e) => (
                    <article className="rcard" data-cat={e.cat} key={e.id}>
                      <div className="rcard-cover"><Cover e={e} /></div>
                      <div className="rcard-body">
                        <div className="rcard-meta">
                          <span className="pill">{e.cat === "r" ? "Reports" : "Articles"}</span>
                          {e.period ? <span className="pill pill-quiet">{e.period}</span> : null}
                          <span className="rcard-date">{fmtDate(e.publishedAt)}</span>
                        </div>
                        <h3><a className="rcard-link" href={e.href}>{e.title}</a></h3>
                        {e.excerpt ? <p>{e.excerpt}</p> : null}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="rmore"><button type="button" className="btn btn-stack" id="rmore">Load more</button></div>
              </>
            )}
          </div>
        </section>
      </main>

      <FooterV3 />

      {/* Filter + pagination, ported from the handoff's inline script. */}
      <Script id="reports-filter" strategy="afterInteractive">{`
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.rtab'));
  var cards=[].slice.call(document.querySelectorAll('.rgrid .rcard'));
  var more=document.getElementById('rmore');
  if(!more||!cards.length)return;
  var PAGE=6, shown=PAGE, filter='all';
  function render(){
    var match=cards.filter(function(c){return filter==='all'||c.dataset.cat===filter});
    cards.forEach(function(c){c.hidden=true});
    match.slice(0,shown).forEach(function(c){c.hidden=false});
    more.parentNode.hidden = match.length<=shown;
  }
  tabs.forEach(function(b){b.addEventListener('click',function(){
    filter=b.dataset.filter; shown=PAGE;
    tabs.forEach(function(x){var on=x===b;x.classList.toggle('is-on',on);x.setAttribute('aria-pressed',on?'true':'false')});
    render();
  })});
  more.addEventListener('click',function(){shown+=PAGE;render()});
  render();
})();
      `}</Script>
    </>
  )
}
