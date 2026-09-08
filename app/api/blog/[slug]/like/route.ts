import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const authHeader = req.headers.get("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ error: "Please sign in to like this article" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload?.email) {
      return NextResponse.json({ error: "Invalid login session" }, { status: 401 })
    }

    const userEmail = payload.email.toLowerCase()
    const db = await getDb()

    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const currentLikes: string[] = Array.isArray(post.likes) ? post.likes : []
    const hasLiked = currentLikes.includes(userEmail)

    let updatedLikes: string[]
    if (hasLiked) {
      updatedLikes = currentLikes.filter((email) => email !== userEmail)
    } else {
      updatedLikes = [...currentLikes, userEmail]
    }

    await db.collection("blog").updateOne(
      { _id: post._id },
      { $set: { likes: updatedLikes } }
    )

    return NextResponse.json({
      success: true,
      liked: !hasLiked,
      likeCount: updatedLikes.length,
    })
  } catch (error) {
    console.error("Like toggle error:", error)
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 })
  }
}
