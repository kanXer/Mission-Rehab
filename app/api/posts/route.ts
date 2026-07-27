import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const dir = path.join(process.cwd(), "public", "posts")
  const files = fs.readdirSync(dir).filter(f => f !== "data.json")

  const photos = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)).sort().reverse()
  const videos = files.filter(f => /\.(mp4|webm|mov|avi)$/i.test(f)).sort().reverse()

  return NextResponse.json({ photos, videos, total: files.length })
}
