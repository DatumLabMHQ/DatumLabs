# Datum Labs Website — Team Handbook

Everything you need to run, publish to, and maintain the Datum Labs site.

---

## 1. The basics

- **Live site:** https://www.datumlab.xyz  (the bare `datumlab.xyz` redirects to `www`)
- **Repo:** https://github.com/Olusegun-Aborode/DatumLabs
- **Stack:** Next.js 15 (App Router), React 19, Tailwind v4, deployed on Vercel.
- **How it deploys:** **push to `main` → Vercel auto-builds and deploys (~90 seconds).** That's the deploy path — don't use the `vercel` CLI (it's currently signed into a different account and will fail). Just commit + push.

---

## 2. Run it locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

You need a `.env.local` (ask for the current one) with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=suz3kpgy
NEXT_PUBLIC_SANITY_DATASET=production
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=pub_689a0650-1d71-4f0d-a426-03f81425b37a
DEMO_CONTENT=1        # local only — shows sample content so pages aren't empty
```

`DEMO_CONTENT` is **local only** (never set in production), so prod always shows real content.

---

## 3. Content — the two systems (important)

We use a **dual system**:

| Content | Where it's authored | How to publish |
|---|---|---|
| **Blog posts, case studies, research** | **Sanity Studio** (no-code) | Log in, hit Publish |
| **Reports** | **MDX files in `content/reports/`** | Commit the file |

Blog is no-code (for anyone). Reports are MDX (for full charts/components). Both show up in the same `/resources` browser, the homepage "Latest research" strip, and the sitemap automatically.

---

## 4. Publish a BLOG POST (Sanity — no code)

1. Go to **https://www.datumlab.xyz/studio** and log in (Google/GitHub).
2. Sidebar → **Blog Posts** → **＋ Create**.
3. Fill in: **Title**, **Slug** (click Generate), **Type** (Article / Case Study / Research — this sets which tab it lands under), **Excerpt**, optional **Cover image** + **Author**, and the **Body**.
4. Click **Publish** (bottom right).

It appears at `/resources/blog/<slug>` and in the Resources hub within ~60s.

> First time on a new device the Studio login needs your browser origin allow-listed in Sanity → manage.sanity.io → project `suz3kpgy` → API → CORS Origins. `localhost:3000`, `https://datumlab.xyz`, and `https://www.datumlab.xyz` are already added.

---

## 5. Publish a REPORT (MDX — full charts & components)

Create `content/reports/<your-slug>.mdx`. Frontmatter first, then content:

```mdx
---
title: State of DeFi Lending — July 2026
slug: state-of-defi-lending-july-2026     # optional; defaults to filename
period: July 2026                          # small eyebrow label
publishedAt: 2026-07-28                     # controls ordering (newest first)
summary: One-line summary — shown as the open preview + meta description.
excerpt: Short teaser for the cards.        # optional; falls back to summary
cover: /images/your-cover.png               # optional — put the file in /public/images
pdf: /reports/your-report.pdf               # optional download — put the file in /public/reports
---

## Your heading

Standard markdown: **bold**, _italic_, lists, tables, `code`, > blockquotes, images.
```

Commit → it deploys and appears at `/resources/reports/<slug>`.

### Built-in components (no code, just use them)

**Chart** — line / area / bar, driven entirely by data:
```mdx
<Chart type="area" title="Net deposits, majors ($M)" x="week"
  series={["Aave","Morpho","SparkLend"]}
  data={[
    { week: "W1", Aave: 120, Morpho: 78, SparkLend: 41 },
    { week: "W2", Aave: 150, Morpho: 92, SparkLend: 44 },
    { week: "W3", Aave: 168, Morpho: 110, SparkLend: 47 }
  ]} />
```
`type` = `"line"` | `"area"` | `"bar"`.

**KPI grid:**
```mdx
<KPIGrid>
  <KPI label="Deposits" value="+8.4%" sub="net inflow" />
  <KPI label="Borrow APR" value="−140bps" />
  <KPI label="At-risk" value="$62M" sub="health factor < 1.1" />
</KPIGrid>
```

**Callout** (`tone`: `default` | `brand` | `warn`):
```mdx
<Callout tone="brand" title="What we're watching">Your highlight.</Callout>
```

**Figure:**
```mdx
<Figure src="/images/chart.png" caption="Source: Datum archive nodes" />
```

### Add your OWN component (you don't need anyone)

1. Create a file in `components/mdx/report-components/` (e.g. `my-widget.tsx`).
   Put `"use client"` at the top if it's interactive.
2. In `components/mdx/mdx-components.tsx`: `import` it and add it to the `mdxComponents` object.
3. Use it in any report MDX: `<MyWidget ... />`.

Commit → it ships. It's your repo — no review, no waiting on anyone.

*(The reports authoring guide also lives in the repo at `content/reports/README.md`.)*

---

## 6. Newsletter (Beehiiv)

- **No report gate:** reports are fully open. Newsletter sign-ups come from the form on `/research` and the podcast page.
- **Footer newsletter:** email signup → same Beehiiv list.
- Sign-ups hit the shared Datum Labs Beehiiv publication.

---

## 7. Products page

Edit the `PRODUCTS` array in `app/products/page.tsx` (name, tagline, description, link). Currently: **OnchainSuite** (retention automation) and **Setnel** (risk monitoring). It's linked from the Resources menu + footer.

---

## 8. Live dashboards / terminals

`/live-dashboards` is a card grid; each card links to a route that embeds a terminal in an iframe. To add or change one, edit the `LENDING` / `TERMINALS` arrays in `app/live-dashboards/page.tsx`. The individual iframe pages live at `app/<name>/page.tsx` (e.g. `app/rwa-terminal`, `app/lending-terminal`). Incentiv is a rewrite in `next.config.mjs`.

---

## 9. Podcast

`/resources/podcast` embeds the **W3GM** Spotify show (`app/resources/podcast/page.tsx`). To change the show, update `SHOW_ID`.

---

## 10. SEO — keep it keyword-driven

- Every page has its own `<title>` + `description` in its `metadata` export. **Keep these written for search intent** (e.g. "DeFi analytics", "onchain data", "lending dashboards") — not slogans.
- `sitemap.xml`, `robots.txt`, and the RSS feed at `/feed.xml` update automatically.
- **The biggest SEO lever is publishing** — reports + blog posts targeting real queries. Ship regularly.
- **TODO:** connect Google Search Console (search.google.com/search-console → add `https://www.datumlab.xyz` → HTML-tag verify) to see real rankings, then submit `sitemap.xml`.

---

## 11. Design system / brand

- **Colors, fonts, spacing:** `app/globals.css` (tokens) + `app/ds-v2.css` (component styles).
- Brand accent is Electric Sapphire **`#4A6CF7`**. To change a brand color, edit the `--sapphire-*` / `--action-primary` tokens in `app/globals.css`.
- Fonts (in `app/layout.tsx`): **Source Serif** (headlines), **Geist** (body), **Geist Mono** (labels/data). Light-mode only.
- Favicon is the Datum mark (`app/icon.svg`).

---

## 12. Where things live (quick map)

```
app/
  page.tsx                     Homepage
  analytics/ live-dashboards/ dune-dashboard/   Marketing pages
  case-studies/ + moonwell-oev/                 Case studies + detail
  products/ about/ contact/ privacy/ terms/     Standalone pages
  resources/                   Resources hub, blog (Sanity), reports (MDX), podcast
  resources/reports/[slug]/    Renders MDX reports
  api/{subscribe,latest-research}               Beehiiv + homepage strip
  globals.css  ds-v2.css       Design system
content/reports/*.mdx          ← REPORTS (author here)
components/
  site-nav / site-footer / hero-dither / ...    Shared UI
  mdx/mdx-components.tsx        MDX component map
  mdx/report-components/        ← YOUR report components (charts, etc.)
sanity/                        Sanity CMS schemas (blog) + Studio config
lib/reports.ts                 Reads the MDX reports
```

---

## 13. Publishing checklist

1. Write your content (Sanity for blog, `content/reports/*.mdx` for reports).
2. For MDX: `pnpm dev` locally and open `/resources/reports/<slug>` to preview.
3. Commit + push to `main`.
4. Wait ~90s → it's live. Check the page + that it shows in `/resources`.

That's it — you have full autonomy over reports (MDX + your own components) and blog (Sanity Studio), and everything deploys on push.
