import type { MetadataRoute } from "next"

import { sanityFetch } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"
import { getAllReports } from "@/lib/reports"
import { getEpisodes } from "@/lib/podcast"

const BASE = "https://www.datumlab.xyz"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/products",
    "/case-studies",
    "/case-studies/moonwell-oev",
    "/analytics",
    "/live-dashboards",
    "/research",
    "/resources",
    "/resources/blog",
    "/resources/reports",
    "/resources/podcast",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }))

  const posts = await sanityFetch<{ slug: string; publishedAt: string }[]>(postsQuery, {}, [])

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/resources/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const reportRoutes: MetadataRoute.Sitemap = getAllReports().map((r) => ({
    url: `${BASE}/resources/reports/${r.slug}`,
    lastModified: r.publishedAt ? new Date(r.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const episodeRoutes: MetadataRoute.Sitemap = (await getEpisodes()).map((e) => ({
    url: `${BASE}/resources/podcast/${e.slug}`,
    lastModified: e.isoDate ? new Date(e.isoDate) : new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...reportRoutes, ...episodeRoutes]
}
