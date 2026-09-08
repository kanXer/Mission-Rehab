import { NextRequest, NextResponse } from "next/server"
import { getAuthFromRequest, isUserAdmin, isAdminEmail } from "@/lib/auth"
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase-admin"

function notConfigured() {
  return NextResponse.json(
    { error: "Firebase Admin SDK configured nahi hai. Service account JSON add karein." },
    { status: 500 }
  )
}

export async function GET(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!payload || !(await isUserAdmin(payload))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({
      admins: [],
      superAdminEmail: process.env.ADMIN_SECRET_EMAIL || "",
    })
  }
  try {
    const list = await getAdminAuth().listUsers()
    const admins = list.users
      .filter((u) => u.customClaims?.admin === true)
      .map((u) => ({
        _id: u.uid,
        email: u.email || "",
        createdAt: u.metadata?.creationTime || undefined,
      }))
    return NextResponse.json({
      admins,
      superAdminEmail: process.env.ADMIN_SECRET_EMAIL || "",
    })
  } catch {
    return NextResponse.json({ admins: [] })
  }
}

export async function POST(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!payload || !(await isUserAdmin(payload))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Only the super admin can add admins" }, { status: 403 })
  }
  if (!isFirebaseAdminConfigured()) {
    return notConfigured()
  }
  try {
    const body = await req.json()
    const email = body?.email?.trim()?.toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
    }
    if (isAdminEmail(email)) {
      return NextResponse.json({ error: "This email is already the super admin" }, { status: 400 })
    }

    let userRecord
    try {
      userRecord = await getAdminAuth().getUserByEmail(email)
    } catch {
      try {
        userRecord = await getAdminAuth().createUser({
          email,
          emailVerified: true,
        })
      } catch (createErr: any) {
        return NextResponse.json(
          { error: createErr.message || "Failed to register user in Firebase" },
          { status: 400 }
        )
      }
    }

    if (userRecord.customClaims?.admin === true) {
      return NextResponse.json({ error: "This email is already an admin" }, { status: 409 })
    }

    await getAdminAuth().setCustomUserClaims(userRecord.uid, {
      ...(userRecord.customClaims || {}),
      admin: true,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!payload || !(await isUserAdmin(payload))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Only the super admin can remove admins" }, { status: 403 })
  }
  if (!isFirebaseAdminConfigured()) {
    return notConfigured()
  }
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")?.trim()?.toLowerCase()
    if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 })
    if (isAdminEmail(email)) {
      return NextResponse.json({ error: "Cannot remove the super admin" }, { status: 400 })
    }

    let uid: string
    try {
      const user = await getAdminAuth().getUserByEmail(email)
      uid = user.uid
    } catch {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = await getAdminAuth().getUser(uid)
    await getAdminAuth().setCustomUserClaims(uid, { ...(user.customClaims || {}), admin: false })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
