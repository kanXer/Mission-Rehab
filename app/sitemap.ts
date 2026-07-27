import type { MetadataRoute } from "next"
import { getDb } from "@/lib/mongodb"

const BASE_URL = "https://gorakhpurmission.in"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/book-appointment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ]

  try {
    const db = await getDb()
    const posts = await db
      .collection("blog")
      .find({}, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray()

    const blogPages: MetadataRoute.Sitemap = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => {
        const rawDate = post.updatedAt || post.createdAt
        const parsedDate = rawDate ? new Date(rawDate) : new Date()

        return {
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }
      })

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error("Failed to generate blog sitemap:", error)
    return staticPages
  }
}
