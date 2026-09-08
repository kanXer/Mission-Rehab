"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import { Loader, LogIn, Globe } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle, user, loading: authLoading } = useAuth()
  const router = useRouter()

  console.log("[LOGIN] render, user:", user?.email || "null", "authLoading:", authLoading)

  useEffect(() => {
    console.log("[LOGIN] useEffect, authLoading:", authLoading, "user:", user?.email || "null", "isAdmin:", user?.isAdmin)
    if (!authLoading && user) {
      const dest = user.isAdmin ? "/admin" : "/profile"
      console.log("[LOGIN] REDIRECTING to", dest)
      router.push(dest)
    }
  }, [user, authLoading, router])

  async function handleGoogleLogin() {
    console.log("[LOGIN] handleGoogleLogin START")
    setError("")
    setLoading(true)
    const err = await signInWithGoogle()
    console.log("[LOGIN] signInWithGoogle returned:", err || "null (success)")
    if (err) {
      setError(err)
      setLoading(false)
    }
  }

  if (authLoading) {
    console.log("[LOGIN] Showing LOADER (authLoading=true)")
    return (
      <>
        <Header />
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-brand-600" />
        </div>
        <Footer />
      </>
    )
  }

  console.log("[LOGIN] Showing LOGIN FORM")
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-200px)] bg-slate-50 dark:bg-navy-900 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Welcome Back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Apne Google account se sign in karein
            </p>
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-xl space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <button type="button" onClick={handleGoogleLogin} disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
