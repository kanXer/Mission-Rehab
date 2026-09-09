import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getDb } from "@/lib/mongodb"
import { isAdminEmail, createAdminSessionToken } from "@/lib/auth"

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, email: rawEmail, otp } = body
    const email = rawEmail?.trim()?.toLowerCase()

    if (!email) {
      return NextResponse.json({ error: "Email zaroori hai" }, { status: 400 })
    }

    const db = await getDb()

    // Verify admin status
    const isSuper = isAdminEmail(email)
    const adminDoc = await db.collection("admins").findOne({ email })
    const userDoc = await db.collection("users").findOne({ email })
    const isMongoAdmin = !!adminDoc || userDoc?.role === "admin"

    if (!isSuper && !isMongoAdmin) {
      return NextResponse.json(
        { error: "Ye email admin list mein nahi hai. Kripya authorized admin email use karein." },
        { status: 403 }
      )
    }

    if (action === "send") {
      // Generate 6-digit OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

      // Store in MongoDB 'otps' collection
      await db.collection("otps").deleteMany({ email })
      await db.collection("otps").insertOne({
        email,
        otp: code,
        expiresAt,
        createdAt: new Date(),
      })

      // Send email
      if (process.env.SMTP_EMAIL && process.env.SMTP_PASS) {
        try {
          const transporter = getTransporter()
          await transporter.sendMail({
            from: `"Gorakhpur Mission Rehab" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: `🔑 Admin Login OTP: ${code} — Gorakhpur Mission Rehab`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #0284c7, #0369a1); padding: 24px; text-align: center; color: white;">
                  <h2 style="margin: 0; font-size: 20px;">Gorakhpur Mission Rehab</h2>
                  <p style="margin: 4px 0 0; opacity: 0.9; font-size: 13px;">Doctor & Admin Login Verification</p>
                </div>
                <div style="padding: 28px 24px; text-align: center;">
                  <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
                    Aapne admin dashboard login karne ke liye OTP request kiya hai. Login complete karne ke liye neeche diya gaya 6-digit code use karein:
                  </p>
                  <div style="display: inline-block; background: #f0f9ff; border: 2px dashed #0284c7; border-radius: 12px; padding: 12px 28px; font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #0369a1; font-family: monospace;">
                    ${code}
                  </div>
                  <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
                    Ye code agle 10 minute tak valid rahega. Agar aapne login request nahi ki hai toh is email ko ignore karein.
                  </p>
                </div>
              </div>
            `,
          })
        } catch (mailErr) {
          console.error("[OTP SEND] Mail error:", mailErr)
          return NextResponse.json(
            { error: "Email send nahi ho paya. Kripya password se sign-in karein." },
            { status: 500 }
          )
        }
      }

      return NextResponse.json({ success: true, message: `OTP ${email} par bhej diya gaya hai` })
    } else if (action === "verify") {
      if (!otp || String(otp).trim().length !== 6) {
        return NextResponse.json({ error: "Sahi 6-digit OTP enter karein" }, { status: 400 })
      }

      const record = await db.collection("otps").findOne({
        email,
        otp: String(otp).trim(),
        expiresAt: { $gt: new Date() },
      })

      if (!record) {
        return NextResponse.json(
          { error: "OTP invalid ya expire ho chuka hai. Dobara OTP request karein." },
          { status: 400 }
        )
      }

      // Remove used OTP
      await db.collection("otps").deleteMany({ email })

      // Create session
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

      response.cookies.set({
        name: "__mission_auth",
        value: token,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (err: any) {
    console.error("[EMAIL OTP] Error:", err)
    return NextResponse.json({ error: err?.message || "OTP process fail ho gaya" }, { status: 500 })
  }
}
