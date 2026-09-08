import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { verifyToken, isUserAdmin } from "@/lib/auth"

export interface Comment {
  _id: string
  userId: string
  userName: string
  userEmail: string
  userPhoto?: string
  content: string
  createdAt: string
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const db = await getDb()

    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const comments: Comment[] = Array.isArray(post.comments) ? post.comments : []
    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Comments fetch error:", error)
    return NextResponse.json({ comments: [] })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const authHeader = req.headers.get("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ error: "Please sign in to leave a comment" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload?.email) {
      return NextResponse.json({ error: "Invalid login session" }, { status: 401 })
    }

    const body = await req.json()
    const content = body.content?.trim()
    if (!content) {
      return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 })
    }

    const db = await getDb()
    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const newComment: Comment = {
      _id: new ObjectId().toString(),
      userId: payload.id,
      userName: payload.name || payload.email.split("@")[0],
      userEmail: payload.email.toLowerCase(),
      userPhoto: payload.photo || "",
      content,
      createdAt: new Date().toISOString(),
    }

    await db.collection("blog").updateOne(
      { _id: post._id },
      { $push: { comments: newComment } } as any
    )

    return NextResponse.json({
      success: true,
      comment: newComment,
    })
  } catch (error) {
    console.error("Add comment error:", error)
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const authHeader = req.headers.get("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const commentId = searchParams.get("id")

    if (!commentId) {
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 })
    }

    const db = await getDb()
    const post = await db.collection("blog").findOne({
      $or: [{ slug: decodedSlug }, { slug }]
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const comments: Comment[] = Array.isArray(post.comments) ? post.comments : []
    const targetComment = comments.find((c) => c._id === commentId)

    if (!targetComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    const isAdmin = await isUserAdmin(payload)
    const isAuthor =
      targetComment.userId === payload.id ||
      targetComment.userEmail.toLowerCase() === payload.email.toLowerCase()

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: "You only have permission to delete your own comments" },
        { status: 403 }
      )
    }

    await db.collection("blog").updateOne(
      { _id: post._id },
      { $pull: { comments: { _id: commentId } } } as any
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete comment error:", error)
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}
