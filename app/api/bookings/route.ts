import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"
import { getAuthFromRequest, isUserAdmin, type AuthPayload } from "@/lib/auth"

async function checkAdmin(payload: AuthPayload | null): Promise<boolean> {
  return !!payload && await isUserAdmin(payload)
}

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const payload = await getAuthFromRequest(req)
    if (!await checkAdmin(payload)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDb()
    const bookings = await db
      .collection("appointments")
      .find({})
      .sort({ timestamp: -1 })
      .toArray()

    const sanitized = bookings.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }))
    return NextResponse.json({ bookings: sanitized })
  } catch (e: any) {
    console.error("Bookings fetch error:", e)
    return NextResponse.json({ bookings: [], error: e?.message || "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!await checkAdmin(payload)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

    const db = await getDb()
    await db.collection("appointments").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
