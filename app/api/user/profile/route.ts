import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload?.email) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const email = payload.email.toLowerCase()
    const db = await getDb()
    const userDoc = await db.collection("users").findOne({ email })

    return NextResponse.json({
      profile: {
        name: userDoc?.name || payload.name || "",
        email,
        phone: userDoc?.phone || "",
        condition: userDoc?.condition || "",
        age: userDoc?.age || "",
        gender: userDoc?.gender || "",
        address: userDoc?.address || "",
        medicalHistory: userDoc?.medicalHistory || "",
      },
    })
  } catch (error) {
    console.error("User profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload?.email) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const email = payload.email.toLowerCase()
    const body = await req.json()
    const { name, phone, condition, age, gender, address, medicalHistory } = body

    const updateDoc: Record<string, string> = {
      updatedAt: new Date().toISOString(),
    }

    if (name !== undefined) updateDoc.name = String(name).trim()
    if (phone !== undefined) updateDoc.phone = String(phone).trim()
    if (condition !== undefined) updateDoc.condition = String(condition).trim()
    if (age !== undefined) updateDoc.age = String(age).trim()
    if (gender !== undefined) updateDoc.gender = String(gender).trim()
    if (address !== undefined) updateDoc.address = String(address).trim()
    if (medicalHistory !== undefined) updateDoc.medicalHistory = String(medicalHistory).trim()

    const db = await getDb()
    await db.collection("users").updateOne(
      { email },
      {
        $set: updateDoc,
        $setOnInsert: { email, createdAt: new Date().toISOString() },
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true, message: "Profile saved successfully" })
  } catch (error) {
    console.error("User profile update error:", error)
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
  }
}
