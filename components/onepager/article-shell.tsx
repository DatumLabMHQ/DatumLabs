import type { ReactNode } from "react"

import { Sky } from "@/components/onepager/sky"
import { OpNav } from "@/components/onepager/op-nav"
import { opFonts } from "@/components/onepager/fonts"
import "@/components/onepager/onepager.css"

/* Reading pages (reports and articles): the sky band from the one-pager for
   the title, fading into a light paper surface built for long reading,
   charts and tables. */

export type MoreItem = { title: string; href: string; date: string; kind: string }

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
    <div className={`art-root ${opFonts}`}>
      <header className="art-hero">
        <Sky className="pod-sky" />
        <OpNav active="research" />
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
            <ol className="rs-list">
              {more.map((it) => (
                <li key={it.href}>
                  <a className="rs-row" href={it.href}>
                    <span className="rs-date">{it.date}</span>
                    <span className="rs-row-main">
                      <span className="rs-row-t">{it.title}</span>
                    </span>
                    <span className="rs-kind">{it.kind}</span>
                    <span className="rs-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <footer className="pod-foot art-foot">
        <span>&copy; 2026 Datum Labs</span>
        <a href="/">Financial data and reporting for blockchain protocols</a>
        <a href="mailto:hello@datumlab.xyz">hello@datumlab.xyz</a>
      </footer>
    </div>
  )
}
