# v3 page-port recipe (redesign-v3 branch)

Port static pages from `handoff-reference/<name>.html` into App Router pages. The design CSS is already global (`app/v3/*.css` via globals.css); behaviors load globally in `app/layout.tsx`. A finished example to imitate: `app/page.tsx` (ported from `handoff-reference/index-v2.html`) with chrome from `components/v3/site-chrome.tsx`.

## Rules

1. **Server components only.** No `"use client"`, no hooks, no next/link, no next/image. Internal links are plain `<a href="/route">` (full page loads are intentional — the behavior scripts depend on them).
2. **Strip from the source:** `<head>` (except title/description → `metadata` export), the `<nav>`, `.nav-mobile`, `<footer>`, `.page-rules` div, every `<script>`, the `__bundler_thumbnail` template, and the inline `<style>` lockup block. Replace chrome with:
   ```tsx
   import { NavV3, FooterV3, PageRules } from "@/components/v3/site-chrome"
   <PageRules />
   <NavV3 navDark active="…" />   // navDark: true when the source <nav> has class "is-dark"
   …
   <FooterV3 />
   ```
   `active` ∈ `"services" | "dashboards" | "about" | "research" | "none"` — match the source nav's `is-active` link.
3. **`<main>` keeps `id="main"`** (add it if the source lacks it).
4. **Metadata export** per page: `title` + `description` from the source head, plus `alternates: { canonical: "/<route>" }` and `openGraph: { title, url: "/<route>", type: "website" }`.
5. **Keep every `class` (→ className), every `data-*` attribute, and the DOM structure byte-faithful.** The CSS and scripts key off them (`data-nav-dark`, `data-theme`, `data-pin`, `data-val`, `data-cat`, `data-filter`, `data-callout`, `data-tweak`, `data-light-plate`…). Inline `style="…"` → JSX style objects.
6. **Icons.** `<i class="ph-… ph-<name> [extra classes]">` becomes
   ```tsx
   <i className="<extra classes only>" aria-hidden="true"><Name weight="duotone|fill" /></i>
   ```
   - import from `@phosphor-icons/react/dist/ssr` (PascalCase: `ph-users-three` → `UsersThree`)
   - `ph-duotone` → `weight="duotone"`, `ph-fill` → `weight="fill"`, plain `ph` → no weight prop
   - drop the `ph*` classes, KEEP other classes (`svc-go`, `caret`, …) on the `<i>`
   - if the className would be empty, omit the attribute
7. **Asset paths:** `src="assets/X"` → `/images/X` · `src="brand/X"` → `/brand/X`. Every referenced file must exist under `public/` — check with `ls`; if one is missing, use the closest existing file only if it is obviously the same thing, otherwise leave the path and list it under "gaps" in your report.
8. **Link map** (apply to every `href`):
   - `index-v2.html`→`/` · `services.html`→`/services` · `collateral-file.html`→`/services/collateral-file` · `management-accounts.html`→`/services/management-accounts` · `fpa-desk.html`→`/services/fpa-desk` · `platform.html`→`/platform` · `research.html`→`/research` · `about.html`→`/about` · `contact.html`→`/contact` · `live-dashboards.html`→`/live-dashboards` · `case-studies.html`→`/case-studies` · `case-study-moonwell-oev.html`→`/case-studies/moonwell-oev`
   - `https://www.datumlab.xyz/aave/dashboard`→`/aave-dashboard` · `…/navi/dashboard`→`/navi` · `…/Incentiv/dashboard/overview`→`/Incentiv/dashboard/overview` (rewrite exists)
   - keep external links (dune.com, calendly, spotify, onchainsuite.xyz, setnel) exactly as in `components/v3/site-chrome.tsx`'s `LINKS` where they appear in body copy.
9. **`<image-slot …>` elements** (about page only): replace with
   ```tsx
   <div className="img-slot-ph" aria-hidden="true" />
   ```
   and list each one under "gaps" (they are missing team photos).
10. **Inline SVGs in the source** (sparklines etc.): keep, converting attributes to JSX (`stroke-width`→`strokeWidth`, `class`→`className`, `viewbox` stays `viewBox`).
11. **HTML entities** (`&rsquo;` `&amp;`…) are fine in JSX text — keep them.
12. **Do not touch shared files**: `app/globals.css`, `app/v3/*`, `app/layout.tsx`, `components/v3/site-chrome.tsx`, `next.config.mjs`, anything under `app/resources/`, `sanity/`, `content/`. If a page needs a CSS rule that doesn't exist, add a `<style>{`…`}</style>` element at the top of that page's JSX and mention it in your report.
13. **No dev server, no git, no pnpm.** Write the files; verification happens centrally.
14. Existing files at the target routes are superseded — overwrite them completely.

## Report back
Per page: target file written, gaps (missing assets, dropped scripts, judgment calls), and any `<style>`/class additions.
