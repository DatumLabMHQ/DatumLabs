import type { ReactNode } from "react"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"

/* Reading pages (reports and articles), in the same sky as the rest of the
   site: the live sky fixed behind, a veil deepening it for long reading,
   white type. Charts keep white cards so their palette reads. */

export type MoreItem = { title: string; href: string; date: string; kind: string; cover?: string }

export function ArticleShell({
  kicker,
  title,
  summary,
  meta,
  actions,
  cover,
  more,
  children,
}: {
  kicker: string
  title: string
  summary?: string
  meta: ReactNode
  actions?: ReactNode
  cover?: string
  more?: MoreItem[]
  children: ReactNode
}) {
  return (
    <div className={`art-root sx-root ${opFonts}`}>
      <Sky className="sx-sky" />
      <div className="sx-veil" aria-hidden="true" />
      <OpNav active="research" />
      <header className="art-hero">
        <div className="art-hero-in">
          <a className="art-back" href="/research">
            <span aria-hidden="true">←</span> Research
          </a>
          <p className="art-kick">{kicker}</p>
          <h1 className="art-h1">{title}</h1>
          {summary ? <p className="art-sum">{summary}</p> : null}
          <div className="art-meta">
            {meta}
            {actions}
          </div>
        </div>
      </header>

      <main id="main" className="art-main">
        {cover ? (
          <figure className="art-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" />
          </figure>
        ) : null}
        <article className="art-body">{children}</article>
      </main>

      {more?.length ? (
        <section className="art-more" aria-labelledby="art-more-h">
          <div className="art-more-in">
            <h2 id="art-more-h" className="art-more-h">More research</h2>
            <ul className="sx-grid">
              {more.map((it) => (
                <li key={it.href}>
                  <a className="sx-tile" href={it.href}>
                    <span className="sx-tile-img">
                      {it.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.cover} alt="" loading="lazy" />
                      ) : null}
                    </span>
                    <span className="sx-tile-k">{it.date}</span>
                    <span className="sx-tile-t">{it.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <footer className="pod-foot art-foot pp-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
