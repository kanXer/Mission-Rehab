import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { getFaqs } from "@/lib/faqs"
import { getAuthFromRequest, isUserAdmin } from "@/lib/auth"

async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const payload = await getAuthFromRequest(req)
  return payload ? await isUserAdmin(payload) : false
}

export async function GET() {
  try {
    const faqs = await getFaqs()
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
    const count = await db.collection("faqs").countDocuments()
    const result = await db.collection("faqs").insertOne({ q, a, category, order: count })
    return NextResponse.json({ faq: { _id: result.insertedId.toString(), q, a, category, order: count } })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { _id, q, a, category } = body
    if (!_id) return NextResponse.json({ error: "id is required" }, { status: 400 })

    const update: Record<string, unknown> = {}
    if (q?.trim()) update.q = q.trim()
    if (a?.trim()) update.a = a.trim()
    if (category?.trim()) update.category = category.trim()
    if (Object.keys(update).length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 })

    const db = await getDb()
    await db.collection("faqs").updateOne({ _id: new ObjectId(_id) }, { $set: update })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const orderedIds = body?.orderedIds
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: "orderedIds array is required" }, { status: 400 })
    }

    const db = await getDb()
    const session = await db.client.startSession()
    try {
      await session.withTransaction(async () => {
        for (let i = 0; i < orderedIds.length; i++) {
          await db.collection("faqs").updateOne(
            { _id: new ObjectId(orderedIds[i]) },
            { $set: { order: i } },
            { session }
          )
        }
      })
    } finally {
      await session.endSession()
    }
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
