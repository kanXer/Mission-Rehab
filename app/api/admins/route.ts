import { NextRequest, NextResponse } from "next/server"
import { getAuthFromRequest, isUserAdmin, isAdminEmail, DEFAULT_SUPER_ADMINS } from "@/lib/auth"
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase-admin"
import { getDb } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!payload || !(await isUserAdmin(payload))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const superAdminEmail =
    process.env.ADMIN_SECRET_EMAIL ||
    process.env.OWNER_EMAIL ||
    DEFAULT_SUPER_ADMINS[0] ||
    ""

  const superAdminEmails = Array.from(
    new Set([
      ...DEFAULT_SUPER_ADMINS,
      ...(process.env.ADMIN_SECRET_EMAIL || "").split(","),
      process.env.OWNER_EMAIL || "",
      ...(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").split(","),
    ])
  )
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  const adminMap = new Map<string, { _id: string; email: string; name?: string; addedBy?: string; createdAt?: string }>()

  try {
    const db = await getDb()

    // 1. Fetch from MongoDB 'admins' collection
    const dbAdmins = await db.collection("admins").find({}).toArray()
    for (const doc of dbAdmins) {
      if (doc.email) {
        const clean = String(doc.email).trim().toLowerCase()
        adminMap.set(clean, {
          _id: doc._id.toString(),
          email: clean,
          name: doc.name || "",
          addedBy: doc.addedBy || "Admin",
          createdAt: doc.createdAt || undefined,
        })
      }
    }

    // 2. Fetch from MongoDB 'users' collection with role: 'admin'
    const dbUsers = await db.collection("users").find({ role: "admin" }).toArray()
    for (const doc of dbUsers) {
      if (doc.email) {
        const clean = String(doc.email).trim().toLowerCase()
        if (!adminMap.has(clean)) {
          adminMap.set(clean, {
            _id: doc._id.toString(),
            email: clean,
            name: doc.name || "",
            addedBy: "System",
            createdAt: doc.createdAt || undefined,
          })
        }
      }
    }
  } catch (dbErr) {
    console.error("[ADMINS GET] MongoDB error:", dbErr)
  }

  // 3. Fallback / Merge from Firebase Admin SDK if configured
  if (isFirebaseAdminConfigured()) {
    try {
      const list = await getAdminAuth().listUsers(100)
      for (const u of list.users) {
        if (u.customClaims?.admin === true && u.email) {
          const clean = u.email.trim().toLowerCase()
          if (!adminMap.has(clean)) {
            adminMap.set(clean, {
              _id: u.uid,
              email: clean,
              name: u.displayName || "",
              addedBy: "Firebase",
              createdAt: u.metadata?.creationTime || undefined,
            })
          }
        }
      }
    } catch (fbErr) {
      console.warn("[ADMINS GET] Firebase listUsers warning:", fbErr)
    }
  }

  // Filter out super admins from additional admins list so they aren't duplicated
  const admins = Array.from(adminMap.values()).filter(
    (a) => !superAdminEmails.includes(a.email.toLowerCase())
  )

  return NextResponse.json({
    admins,
    superAdminEmail,
    superAdminEmails,
  })
}

export async function POST(req: NextRequest) {
  const payload = await getAuthFromRequest(req)
  if (!payload || !(await isUserAdmin(payload))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Only the super admin can add admins" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const email = body?.email?.trim()?.toLowerCase()
    const name = body?.name?.trim() || ""

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
    }
    if (isAdminEmail(email)) {
      return NextResponse.json({ error: "This email is already a super admin" }, { status: 400 })
    }

    const db = await getDb()

    // 1. Save to MongoDB 'admins' collection
    await db.collection("admins").updateOne(
      { email },
      {
        $set: {
          email,
          name,
          role: "admin",
          addedBy: payload.email.toLowerCase(),
          updatedAt: new Date().toISOString(),
        },
        $setOnInsert: {
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    )

    // 2. Also update 'users' collection if present
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          role: "admin",
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: false }
    )

    // 3. Best-effort Firebase Admin custom claims sync
    if (isFirebaseAdminConfigured()) {
      try {
        let userRecord
        try {
          userRecord = await getAdminAuth().getUserByEmail(email)
        } catch {
          // If user doesn't exist in Firebase yet, that's fine; they can register or sign in later
        }

        if (userRecord) {
          await getAdminAuth().setCustomUserClaims(userRecord.uid, {
            ...(userRecord.customClaims || {}),
            admin: true,
          })
        }
      } catch (fbErr) {
        console.warn("[ADMINS POST] Firebase claim sync warning:", fbErr)
      }
    }

    return NextResponse.json({ success: true, message: "Admin added successfully" })
  } catch (err: any) {
    console.error("[ADMINS POST] Error:", err)
    return NextResponse.json({ error: err?.message || "Failed to add admin" }, { status: 500 })
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

  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")?.trim()?.toLowerCase()
    if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 })
    if (isAdminEmail(email)) {
      return NextResponse.json({ error: "Cannot remove a super admin" }, { status: 400 })
    }

    const db = await getDb()

    // 1. Remove from MongoDB 'admins' collection
    await db.collection("admins").deleteOne({ email })

    // 2. Set role back to user in 'users' collection
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          role: "user",
          updatedAt: new Date().toISOString(),
        },
      }
    )

    // 3. Best-effort Firebase Admin custom claims sync
    if (isFirebaseAdminConfigured()) {
      try {
        const user = await getAdminAuth().getUserByEmail(email)
        if (user) {
          await getAdminAuth().setCustomUserClaims(user.uid, {
            ...(user.customClaims || {}),
            admin: false,
          })
        }
      } catch (fbErr) {
        console.warn("[ADMINS DELETE] Firebase claim sync warning:", fbErr)
      }
    }

    return NextResponse.json({ success: true, message: "Admin removed successfully" })
  } catch (err: any) {
    console.error("[ADMINS DELETE] Error:", err)
    return NextResponse.json({ error: err?.message || "Failed to remove admin" }, { status: 500 })
  }
}
