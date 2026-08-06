import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { verifyToken, isUserAdmin } from "@/lib/auth"
import { ensureContent } from "@/lib/seed"

function getToken(req: NextRequest): string | undefined {
  const cookie = req.headers.get("cookie") || ""
  for (const part of cookie.split("; ")) {
    const [name, ...rest] = part.split("=")
    const val = rest.join("=")
    if (name === "token" && val) return decodeURIComponent(val)
  }
  return undefined
}

async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const tokenStr = getToken(req)
  if (!tokenStr) return false
  const payload = verifyToken(tokenStr)
  return payload ? await isUserAdmin(payload.id) : false
}

export async function GET() {
  try {
    await ensureContent()
    const db = await getDb()
    const docs = await db.collection("faqs").find({}).sort({ order: 1 }).toArray()
    const faqs = docs.map(({ _id, ...r }) => ({ ...r, _id: _id.toString() }))
    return NextResponse.json({ faqs })
  } catch {
    return NextResponse.json({ faqs: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const q = body?.q?.trim()
    const a = body?.a?.trim()
    if (!q || !a) return NextResponse.json({ error: "Question and answer are required" }, { status: 400 })

    const category = body?.category?.trim() || "General"
    const db = await getDb()
    const order = await db.collection("faqs").countDocuments()
    const result = await db.collection("faqs").insertOne({ q, a, category, order })
    return NextResponse.json({ faq: { _id: result.insertedId.toString(), q, a, category, order } })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { _id, q, a } = body
    if (!_id || !q?.trim() || !a?.trim()) {
      return NextResponse.json({ error: "id, question and answer are required" }, { status: 400 })
    }

    const category = body?.category?.trim() || "General"
    const db = await getDb()
    await db.collection("faqs").updateOne({ _id: new ObjectId(_id) }, { $set: { q: q.trim(), a: a.trim(), category } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

    const db = await getDb()
    await db.collection("faqs").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
