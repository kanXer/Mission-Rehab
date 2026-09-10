import { NextResponse } from "next/server"
import { getDb, isMongoConfigured } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function GET() {
  const uri = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || ""
  
  // Mask credentials in URI for safe display
  const maskedUri = uri ? uri.replace(/:\/\/[^:]+:[^@]+@/, "://***:***@") : "NOT_SET"

  const diagnostics: Record<string, any> = {
    status: "checking",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    isMongoConfigured: isMongoConfigured(),
    mongoUriHost: maskedUri,
    databaseName: process.env.MONGODB_DB_NAME || "missionrehab",
  }

  const modules: Record<string, any> = {}

  try {
    const jwt = await import("jsonwebtoken")
    modules.jwt = "ok"
  } catch (e: any) {
    modules.jwt = e?.message || String(e)
  }

  try {
    const fbAdmin = await import("@/lib/firebase-admin")
    modules.firebaseAdmin = {
      loaded: true,
      configured: fbAdmin.isFirebaseAdminConfigured(),
    }
  } catch (e: any) {
    modules.firebaseAdmin = {
      loaded: false,
      error: e?.message || String(e),
      stack: e?.stack?.slice(0, 300),
    }
  }

  try {
    const authMod = await import("@/lib/auth")
    modules.auth = {
      loaded: true,
      superAdminEmails: authMod.getSuperAdminEmails ? authMod.getSuperAdminEmails() : [],
    }
  } catch (e: any) {
    modules.auth = {
      loaded: false,
      error: e?.message || String(e),
      stack: e?.stack?.slice(0, 300),
    }
  }

  diagnostics.modules = modules

  if (!isMongoConfigured()) {
    diagnostics.status = "error"
    diagnostics.message = "MONGODB_URI is not configured in environment variables."
    return NextResponse.json(diagnostics, { status: 500 })
  }

  try {
    const startTime = Date.now()
    const db = await getDb()
    const pingResult = await db.command({ ping: 1 })
    const durationMs = Date.now() - startTime

    const collections = await db.listCollections().toArray()
    const counts: Record<string, number> = {}
    for (const col of collections) {
      counts[col.name] = await db.collection(col.name).estimatedDocumentCount()
    }

    diagnostics.status = "ok"
    diagnostics.ping = pingResult
    diagnostics.responseTimeMs = durationMs
    diagnostics.collectionCounts = counts

    return NextResponse.json(diagnostics, { status: 200 })
  } catch (err: any) {
    diagnostics.status = "error"
    diagnostics.error = {
      name: err?.name || "Error",
      message: err?.message || String(err),
      code: err?.code,
    }
    return NextResponse.json(diagnostics, { status: 500 })
  }
}
