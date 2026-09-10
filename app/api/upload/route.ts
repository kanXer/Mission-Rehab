import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { getAuthFromRequest, verifyToken, getTokenFromCookies, isUserAdmin } from "@/lib/auth"

export const dynamic = "force-dynamic"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(req: NextRequest) {
  const payload =
    (await getAuthFromRequest(req)) ||
    (await verifyToken((await getTokenFromCookies()) || ""))
  if (!payload || !(await isUserAdmin(payload))) {
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
