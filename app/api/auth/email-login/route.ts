import { NextRequest, NextResponse } from "next/server"
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase-admin"

export async function POST(req: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase Admin SDK configured nahi hai. FIREBASE_SERVICE_ACCOUNT_BASE64 set karein." },
      { status: 500 }
    )
  }
  try {
    const body = await req.json()
    const email = body?.email?.trim()?.toLowerCase()
    const name = body?.name?.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Sahi email daalein" }, { status: 400 })
    }

    let uid: string
    try {
      const existing = await getAdminAuth().getUserByEmail(email)
      uid = existing.uid
    } catch {
      if (!name) {
        return NextResponse.json(
          { error: "Is email ka koi account nahi hai. Pehle Register karein." },
          { status: 404 }
        )
      }
      const created = await getAdminAuth().createUser({ email, displayName: name })
      uid = created.uid
    }

    const token = await getAdminAuth().createCustomToken(uid)
    return NextResponse.json({ token })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
