# Datum Labs website — agent guide

This is the **Datum Labs marketing site** (Next.js 15 App Router, React 19, Tailwind v4), live at **https://www.datumlab.xyz**. It is NOT a v0 project and NOT an Aave dashboard — ignore anything suggesting otherwise.

**Deploy rule (memorize this):** `git push origin main` → Vercel auto-builds → live in ~90 seconds. That is the ONLY deploy path. Never run `vercel` CLI (it is logged into the wrong account and will fail).

---

## The two content systems (do not mix them up)

| Content type | Lives in | Published by | Shows in Sanity Studio? |
|---|---|---|---|
| **Reports** | `content/reports/*.mdx` in THIS repo | commit + push | **No — never** |
| Blog posts, case studies, research | Sanity CMS (cloud) | https://www.datumlab.xyz/studio → Publish | Yes |

MDX reports do **not** appear in Sanity, and Sanity posts do **not** exist in this repo. They only merge on the website itself. After publishing, a report automatically appears in:

- its own page: `/resources/reports/<slug>`
- the Research index: `/research` (tagged "Report", merged with blog posts; `/resources` redirects there)
- the homepage "Latest research" strip
- `sitemap.xml`

It does NOT appear in `/feed.xml` (RSS is Sanity posts only) or in the Studio.

---

## TASK: Publish a report (the most common job)

### Step 1 — create the file

Path: `content/reports/<slug>.mdx` — kebab-case filename, e.g. `state-of-lending-sui-july-2026.mdx`.

### Step 2 — frontmatter (YAML, between `---` fences, first thing in the file)

```yaml
---
title: The State of Lending on Sui — July 2026   # REQUIRED. Page H1 + <title>.
slug: state-of-lending-sui-july-2026             # optional; defaults to filename. Must be unique.
period: July 2026                                # optional; small eyebrow label above the H1.
publishedAt: 2026-08-02                          # REQUIRED. YYYY-MM-DD. Controls ordering (newest first).
summary: One or two sentences.                   # REQUIRED. Shown under the H1 + used as meta description.
excerpt: Short teaser.                           # optional; card teaser. Falls back to summary.
cover: /images/my-cover.png                      # optional; put the file in public/images/ first.
pdf: /reports/my-report.pdf                      # optional download button; file goes in public/reports/.
gated: true                                      # optional; DEFAULT true = lead-gate the body. false = fully open.
---
```

**YAML gotcha (has broken builds before):** if `title`, `summary`, or `excerpt` contains a colon `:`, wrap the whole value in double quotes — `summary: "TVL fell 20%: the full breakdown"` — or YAML parsing fails.

### Step 3 — write the body

Everything after the frontmatter is the report. Supported:

- **Markdown + GFM**: headings (`##`, `###`), bold, lists, blockquotes, links, images, and **pipe tables** (GFM tables render as styled tables — keep each table row on ONE line).
- **The components below** — use them directly, no imports needed.

#### `<Chart>` — line / area / bar charts

```mdx
<Chart type="line" title="Daily TVL by protocol ($M)" x="date"
  series={["NAVI","Suilend"]}
  data={[
    { date: "07/01", NAVI: 125.9, Suilend: 104.2 },
    { date: "07/02", NAVI: 126.4, Suilend: 105.1 }
  ]} />
```

| Prop | Type | Rules |
|---|---|---|
| `type` | `"line" \| "area" \| "bar"` | optional, default `"line"` |
| `x` | string | key in each data row used for the x-axis |
| `series` | string[] | each entry MUST match a key in the data rows exactly (case-sensitive) |
| `data` | object[] | numbers unquoted; keys containing spaces/`%`/`$` must be quoted, e.g. `"May %": -1.6` |
| `title` | string | optional caption above the chart |
| `height` | number | optional, default 300 |

- A series may stop early (rows simply omit that key) — the line ends, no crash.
- Negative values are fine.
- ~60 data points fit comfortably at the report column width; the axis auto-thins labels.
- **`<Chart` must start on its own line with a blank line before it** (has broken builds before: a chart tag glued to the end of a paragraph fails MDX compilation). Same applies to `<Callout>`, `<KPIGrid>`, `<Figure>`.

#### `<KPIGrid>` + `<KPI>` — headline stats (1–4 sit on one row)

```mdx
<KPIGrid>
  <KPI label="Sector TVL" value="−20.4%" sub="$446.7M → $355.6M" />
  <KPI label="Liquidations" value="5,875" />
</KPIGrid>
```

`KPI` props: `label` (string), `value` (string), `sub` (string, optional).

#### `<Callout>` — highlighted box

```mdx
<Callout tone="brand" title="What we're watching">One or two sentences.</Callout>
```

`tone`: `"default" | "brand" | "warn"` (optional). `title`: optional.

#### `<Figure>` — image with caption

```mdx
<Figure src="/images/chart.png" caption="Source: Datum Labs" />
```

Image file must exist in `public/images/`.

#### Need a component that doesn't exist?

1. Create it in `components/mdx/report-components/` (add `"use client"` at the top if interactive).
2. Import + register it in the `mdxComponents` object in `components/mdx/mdx-components.tsx` (2 lines).
3. Use it in any report. Commit — it ships with the report.

### Step 4 — verify locally (recommended, not required)

```bash
pnpm install          # first time only; needs .env.local (see "Run locally")
pnpm dev
```

Open `http://localhost:3000/resources/reports/<slug>`.

**GOTCHA:** if the dev server was already running when you created a NEW report file, the page 404s — the route builds its slug list at compile time (`dynamicParams = false`). **Restart the dev server** and it will appear. Production is unaffected (Vercel builds fresh on every push). Edits to an existing report hot-reload normally.

Check: charts draw, tables render as tables (not raw `|` pipes), KPIs sit on one row.

### Step 5 — publish

```bash
git add content/reports/<slug>.mdx
git commit -m "Publish <report title>"
git push origin main
```

~90s later verify: `https://www.datumlab.xyz/resources/reports/<slug>` loads, and the report shows in `https://www.datumlab.xyz/research`.

To unpublish: `git rm` the file, commit, push.

---

## TASK: Publish a blog post / case study / research note

These do NOT involve this repo at all:

1. Go to `https://www.datumlab.xyz/studio`, log in.
2. **Blog Posts → Create**: Title, Slug (Generate), **Type** (Article / Case Study / Research — sets its tag/tab), Excerpt, optional cover + author, Body.
3. **Publish.** Live at `/resources/blog/<slug>` within ~60s. No commit, no deploy.

---

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Requires `.env.local` (ask a teammate; never commit it):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=suz3kpgy
NEXT_PUBLIC_SANITY_DATASET=production
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=pub_689a0650-1d71-4f0d-a426-03f81425b37a
DEMO_CONTENT=1      # local only — sample content so pages aren't empty. NEVER set in prod.
```

The site builds fine without Sanity/Beehiiv keys (falls back to empty content), so report work only strictly needs Node + pnpm.

---

## Repo map

```
content/reports/*.mdx            ← REPORTS. The main thing you'll touch.
components/mdx/
  mdx-components.tsx             MDX component registry (Callout, KPIGrid, KPI, Figure, Chart)
  report-components/chart.tsx    The recharts Chart
lib/reports.ts                   Reads/parses report frontmatter
app/resources/reports/[slug]/    Renders a report (compileMDX + gate + JSON-LD)
app/research/                    Research index (merges Sanity posts + MDX reports)
app/page.tsx + components/onepager/  One-pager homepage, nav, podcast + research styling
app/api/latest-research/         Feeds the homepage research strip (also merged)
app/page.tsx                     Homepage
app/globals.css, app/ds-v2.css   Design system (brand accent #4A6CF7)
components/site-nav.tsx          Nav (mega-menu; "Research & Reports" → /resources)
app/resources/podcast/           W3GM podcast (episodes from Spotify RSS, hourly revalidate)
sanity/                          Sanity schemas + embedded Studio (blog only — NOT reports)
public/images/, public/reports/  Static assets (report covers, PDFs)
docs/HANDBOOK.md                 Human-facing team handbook (superset of this file)
```

---

## Hard constraints — do not "fix" these

- **React stays `19.2.0`** and **next-sanity stays v11 / sanity v5**. Bumping React duplicates it in pnpm and breaks `/studio` (remount flicker); sanity v6+/next-sanity v13+ require Next 16. Do not upgrade without upgrading Next itself.
- `compileMDX` in `app/resources/reports/[slug]/page.tsx` sets **`blockJS: false`** deliberately — reports are first-party trusted content, and the default (`blockJS: true`) silently strips every `{...}` prop, which empties all `<Chart>` data. Do not re-enable it. `remark-gfm` there is what makes tables work — keep it.
- The Chart component measures width with a ResizeObserver and passes recharts an explicit pixel width. Do not "simplify" it back to `<ResponsiveContainer>` — that renders 0-width (blank) charts in this layout.
- `next.config.mjs`: keep `outputFileTracingIncludes` (ships `content/` to serverless — without it reports 404 in prod) and the apex→www redirect.
- Canonical domain is `https://www.datumlab.xyz` (with www, no "s" in datumlab).
