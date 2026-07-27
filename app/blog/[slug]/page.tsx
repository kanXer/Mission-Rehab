import type { Metadata } from "next"
import BlogPostClient from "./BlogPostClient"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/blog/${params.slug}`, { next: { revalidate: 60 } })
    const data = await res.json()
    if (!data.post) return { title: "Post Not Found" }
    return {
      title: data.post.title,
      description: data.post.excerpt,
      openGraph: {
        title: data.post.title,
        description: data.post.excerpt,
        images: [{ url: data.post.image }],
      },
    }
  } catch {
    return { title: "Blog Post" }
  }
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostClient slug={params.slug} />
}
