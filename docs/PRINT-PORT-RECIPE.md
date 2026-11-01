# Rebuilding a page in Security Print

The site is being rebuilt in the Security Print design system. Read these first, in order:

1. `docs/DESIGN.md` — the direction contract and the bans. Binding.
2. `app/print/print.css` — every class you may use (all `sp-` prefixed).
3. `components/print/print-parts.tsx` — `Nav`, `Footer`, `PageHead`, `Band`, `Statement`, `GuillocheBand`, `CloseCta`, `LINKS`. And `components/print/ornament.tsx` (`Rosette`, `Lathe`; PageHead and Band already include them).
4. The two exemplars: `app/page.tsx` (home) and `app/services/management-accounts/page.tsx` (an inner page). Match their structure and quality.

## The job

You get a page that currently uses the old design (classes like `section`, `wrap`, `cells`, `cell`, `pcard`, `tcard`, `svc-col`, `page-header ph-rel`, `who-plate`, `lead-split`, phosphor icons, `NavV3`/`FooterV3`/`PageRules` from `components/v3/site-chrome`). Rewrite the file completely in the new system. **Keep every word of copy, every fact, every link, and the metadata export exactly** (you may fix an obviously broken link). Do not invent claims, numbers, testimonials or features.

## Grammar

- Page = `<Nav active="…" />`, `<main id="main">`, `<PageHead … />`, sections, usually `<CloseCta />` last inside main, `<Footer />`.
  Nav keys: `services` (service pages), `atlas` (/platform), `research`, `podcast`, `dashboards` (/live-dashboards, /dune-dashboard), `about`, or omit.
- The old dark header becomes `<PageHead title lede support crumb? meta? />`. Service detail pages take `crumb={{ href: "/services", label: "Services" }}`; case-study detail takes `crumb={{ href: "/case-studies", label: "Case studies" }}`.
- A section: `<section className="sp-section sp-tight" id="…"><div className="sp-wrap">…</div></section>`. The first section after PageHead drops `sp-tight`.
- A section heading: `<div className="sp-head"><h2 className="sp-h2">…</h2><p>optional one-line support</p></div>`. To emphasise half a heading, wrap it in `<em>` (renders sapphire, not italic).
- Heading + prose side by side: `<div className="sp-split"><h2 className="sp-h2">…</h2><div className="sp-prose"><p className="sp-claim">optional bold claim</p><p>…</p></div></div>`.
- **Every list of items (old cells/cards/pcards/tcards/svc-cols/steps) becomes a ledger.** `<ul className="sp-ledger sp-ledger-2">` with `<li><h3 className="sp-h3">title</h3><p>body</p></li>`. If items carry a short meta (a cadence, a day, a chain, "Open"), use `<ul className="sp-ledger">` and add `<span className="sp-l-meta">meta</span>` as the third child. If the item links somewhere, make the title a link: `<h3 className="sp-h3"><a className="sp-link" href="…">title</a></h3>`. If an item had a protocol logo, put it in the title cell: `<h3 className="sp-h3 sp-l-logo"><img src="/images/…" alt="" />Name</h3>`.
- The old dark plate / dark band becomes `<Band id="…">…</Band>` (navy, lathe texture). Ledgers and splits work inside it. Use at most two Bands per page and never two in a row.
- A document, statement, P&L, file or pack (something that *is* a document) can be shown with `<Statement … />` — see the exemplars. Use `specimen` (default true) whenever figures are illustrative. Only use it where the content really is a document.
- Logo grids of protocols: `<div className="sp-roster">` with `<div><img src alt="" /><span>Name</span></div>` children.
- Small print: `<p className="sp-small">`. Buttons: `sp-btn sp-btn-primary` (one per section at most), `sp-btn sp-btn-ink`. Text links: `sp-link`.
- External links keep `target="_blank" rel="noopener"`. Internal links are plain `<a href="/…">`.
- Images: plain `<img>` with the eslint disable comment used in the exemplars.

## Bans (from docs/DESIGN.md — the reviewer checks these)

No eyebrow or kicker labels above headings. No icons, no phosphor imports, no icon-plus-title-plus-text cards. No big-number-plus-small-label stat blocks (render stats as a sentence or a ledger row). No section numbers like 01/02/03 unless they are real sequence data (a pipeline stage order is fine as meta). No sparklines or decorative charts. No mono text except in Statement MICR lines. No em dashes in any text you write. No inline styles except small spacing (`marginTop`). No new CSS files; if you truly need a rule, add it at the end of `app/print/print.css` with an `sp-` prefix and say so in your report.

## Constraints

- Server components only (no "use client"), TypeScript valid.
- Do not touch files outside your assigned targets except appending to `app/print/print.css` if unavoidable.
- No git, no dev server, no pnpm install. Type-check once at the end: `pnpm exec tsc --noEmit 2>&1 | grep -E "<your files>"`.

## Report back

Per file: written, any copy you could not place, any CSS you appended, judgment calls.
