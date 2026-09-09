"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import { Loader, LogIn, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle, user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      // Check if there was a redirect destination (e.g. from blog comment)
      const redirectUrl =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null

      if (user.isAdmin) {
        // Admins go to /admin by default, or redirect destination
        router.push(redirectUrl || "/admin")
      } else {
        // Normal users go to redirect destination (e.g. blog post to comment) or profile
        router.push(redirectUrl || "/profile")
      }
    }
  }, [user, authLoading, router])

  async function handleGoogleLogin() {
    setError("")
    setLoading(true)
    const err = await signInWithGoogle()
    if (err) {
      setError(err)
      setLoading(false)
    }
  }

  if (authLoading) {
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

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-200px)] bg-slate-50 dark:bg-navy-950 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Header icon and title */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/25">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gorakhpur Mission Rehab Portal Access
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-navy-800 shadow-xl space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs px-4 py-3 rounded-2xl border border-red-200 dark:border-red-900 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Apne Google account se sign in karein to book appointments, participate in blog discussions, or access doctor controls.
              </p>

              {/* Single Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700/80 text-slate-800 dark:text-white font-semibold py-3.5 px-4 rounded-2xl border border-slate-300 dark:border-navy-700 shadow-sm hover:shadow-md transition-all disabled:opacity-60 text-sm cursor-pointer"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin text-brand-600" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign in with Google</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-navy-800 text-center">
              <p className="text-[11px] text-slate-400">
                🔒 Protected by Firebase Authentication
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

