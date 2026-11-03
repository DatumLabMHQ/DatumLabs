# Datum Labs Reports — authoring guide

Reports are **MDX files in this folder**. Add a file → commit → it deploys (~90s) and
appears at `/resources/reports/<slug>`, in the `/resources` browser, the homepage
research strip, and the sitemap automatically. You have full control — no one else
in the loop.

## 1. Create a report

Create `content/reports/<your-slug>.mdx`:

```mdx
---
title: State of DeFi Lending — July 2026
slug: state-of-defi-lending-july-2026     # URL segment (optional; defaults to filename)
period: July 2026                          # small eyebrow label
publishedAt: 2026-07-28                     # controls ordering (newest first)
summary: One-line summary — shown as the open preview + used as the meta description.
excerpt: Short teaser for the cards.        # optional; falls back to summary
cover: /images/your-cover.png               # optional hero image (put file in /public/images)
pdf: /reports/your-report.pdf               # optional download button (put file in /public/reports)
---

## Your heading

Markdown works: **bold**, _italic_, lists, tables, `code`, blockquotes, images.
```

Reports are always fully open; there is no lead gate (an old `gated:` line in frontmatter is ignored).

## 2. Built-in components

Use these directly in MDX — no imports, no code:

**Chart** (line / area / bar — driven by data, no React needed):
```mdx
<Chart type="line" title="Deposits, majors" x="month"
  series={["Aave","Morpho"]}
  data={[
    { month: "Apr", Aave: 120, Morpho: 80 },
    { month: "May", Aave: 140, Morpho: 95 },
    { month: "Jun", Aave: 168, Morpho: 110 }
  ]} />
```

**KPI grid:**
```mdx
<KPIGrid>
  <KPI label="Deposits, majors" value="+8.4%" sub="net inflow" />
  <KPI label="Stable borrow APR" value="−140bps" />
  <KPI label="At-risk collateral" value="$62M" sub="health factor < 1.1" />
</KPIGrid>
```

**Callout** (`tone`: `default` | `brand` | `warn`):
```mdx
<Callout tone="brand" title="What we're watching">
Your highlight here.
</Callout>
```

**Figure:**
```mdx
<Figure src="/images/chart.png" caption="Source: Datum archive nodes" />
```

## 3. Add your own component (full autonomy)

If you need something the built-ins don't cover:

1. Create a file in `components/mdx/report-components/` (e.g. `my-widget.tsx`).
   Add `"use client"` at the top if it's interactive.
2. In `components/mdx/mdx-components.tsx`: import it and add it to the
   `mdxComponents` object.
3. Use it in any report: `<MyWidget ... />`.

Commit and it ships. You don't need to ask anyone.
