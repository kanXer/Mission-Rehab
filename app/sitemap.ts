import type { MetadataRoute } from "next"
import { getDb } from "@/lib/mongodb"

const base = "https://gorakhpurmission.in"

const staticPages: MetadataRoute.Sitemap = [
  { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/book-appointment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const db = await getDb()
    const posts = await db
      .collection("blog")
      .find({}, { projection: { slug: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray()

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}
