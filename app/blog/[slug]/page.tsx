import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"
import { getDb } from "@/lib/mongodb"

interface Props {
  params: Promise<{ slug: string }>
}

const siteUrl = "https://gorakhpurmission.in"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const db = await getDb()
    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })
    if (!post) return { title: "Post Not Found" }

    const title = post.title
    const description = post.excerpt || "Read more at Gorakhpur Mission Rehab"
    const image = post.image || `${siteUrl}/og-image.jpg`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `${siteUrl}/blog/${slug}`,
        siteName: "Gorakhpur Mission Rehab",
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    }
  } catch {
    return { title: "Blog Post" }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  return <BlogPostClient slug={decodedSlug} />
}
