import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { verifyToken, getTokenFromCookies, isAdminEmail } from "@/lib/auth"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  const tokenStr = await getTokenFromCookies()
  const payload = tokenStr ? verifyToken(tokenStr) : null
  if (!payload || !isAdminEmail(payload.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "gorakhpur-mission-rehab" },
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    signature,
    timestamp,
    folder: "gorakhpur-mission-rehab",
  })
}
