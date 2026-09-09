import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/mongodb"
import { isAdminEmail, createAdminSessionToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = body?.email?.trim()?.toLowerCase()
    const password = body?.password?.trim()

    if (!email || !password) {
      return NextResponse.json({ error: "Email aur password dono zaroori hain" }, { status: 400 })
    }

    const db = await getDb()

    // 1. Verify if this email is an admin
    const isSuper = isAdminEmail(email)
    const adminDoc = await db.collection("admins").findOne({ email })
    const userDoc = await db.collection("users").findOne({ email })
    const isMongoAdmin = !!adminDoc || userDoc?.role === "admin"

    if (!isSuper && !isMongoAdmin) {
      return NextResponse.json(
        { error: "Ye email admin account ke roop me registered nahi hai. Naye admin ko Super Admin se add karwayein." },
        { status: 403 }
      )
    }

    // 2. Validate password
    let passwordValid = false

    // A) Check MongoDB hashed password if user has one
    if (userDoc?.password) {
      passwordValid = await bcrypt.compare(password, userDoc.password)
    }

    // B) Check fallback master password for super admins & admins
    const masterPassword = process.env.ADMIN_PASSWORD || "MissionRehab@2026"
    if (!passwordValid && password === masterPassword) {
      passwordValid = true
    }

    // C) Also check if password matches JWT_SECRET or OWNER password from env
    if (!passwordValid && process.env.ADMIN_SECRET && password === process.env.ADMIN_SECRET) {
      passwordValid = true
    }

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Galat password daala gaya hai. Kripya sahi password enter karein." },
        { status: 401 }
      )
    }

    // 3. Issue JWT session token
    const token = createAdminSessionToken({
      id: userDoc?._id?.toString() || adminDoc?._id?.toString() || "admin",
      email,
      name: userDoc?.name || adminDoc?.name || email.split("@")[0],
      isAdmin: true,
    })

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: userDoc?._id?.toString() || adminDoc?._id?.toString() || "admin",
        email,
        name: userDoc?.name || adminDoc?.name || email.split("@")[0],
        isAdmin: true,
        isSuperAdmin: isSuper,
      },
    })

    // Set cookie for browser session
    response.cookies.set({
      name: "__mission_auth",
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err: any) {
    console.error("[ADMIN LOGIN] Error:", err)
    return NextResponse.json({ error: err?.message || "Login fail ho gaya" }, { status: 500 })
  }
}
