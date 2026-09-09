"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import { Loader, LogIn, Globe, Shield, Mail, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"google" | "admin">("google")
  const [adminMode, setAdminMode] = useState<"password" | "otp">("password")

  // Form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpMessage, setOtpMessage] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    signInWithGoogle,
    loginWithCredentials,
    sendOtp,
    loginWithOtp,
    user,
    loading: authLoading,
  } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      const dest = user.isAdmin ? "/admin" : "/profile"
      router.push(dest)
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

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Email aur password dono enter karein")
      return
    }
    setError("")
    setLoading(true)
    const res = await loginWithCredentials(email.trim(), password.trim())
    if (!res.success) {
      setError(res.error || "Login fail ho gaya. Kripya check karein.")
      setLoading(false)
    }
  }

  async function handleSendOtp() {
    if (!email.trim()) {
      setError("Pehle apna admin email enter karein")
      return
    }
    setError("")
    setOtpMessage("")
    setLoading(true)
    const res = await sendOtp(email.trim())
    setLoading(false)
    if (res.success) {
      setOtpSent(true)
      setOtpMessage(res.message || "OTP aapke email par bhej diya gaya hai")
    } else {
      setError(res.error || "OTP bhejne mein samasya aayi")
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !otp.trim()) {
      setError("Email aur OTP dono enter karein")
      return
    }
    setError("")
    setLoading(true)
    const res = await loginWithOtp(email.trim(), otp.trim())
    if (!res.success) {
      setError(res.error || "Invalid OTP")
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
      <main id="main-content" className="min-h-[calc(100vh-200px)] bg-slate-50 dark:bg-navy-950 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Header icon and title */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/20">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy-950 dark:text-white">Sign In</h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gorakhpur Mission Rehab Portal Access
            </p>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-navy-800 shadow-xl space-y-5">
            {/* Tab selector */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-navy-950 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("google")
                  setError("")
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "google"
                    ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Google Sign-In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("admin")
                  setError("")
                }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "admin"
                    ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs px-4 py-3 rounded-2xl border border-red-200 dark:border-red-900 leading-relaxed">
                {error}
                {error.includes("Authorized domains") && (
                  <div className="mt-2 pt-2 border-t border-red-200/60 dark:border-red-800">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("admin")
                        setError("")
                      }}
                      className="font-bold underline text-red-800 dark:text-red-200 flex items-center gap-1"
                    >
                      Admin Password / OTP se login karein <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Success Message */}
            {otpMessage && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs px-4 py-3 rounded-2xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{otpMessage}</span>
              </div>
            )}

            {/* Tab 1: Google Sign In */}
            {activeTab === "google" && (
              <div className="space-y-4 pt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Apne registered Google account se one-click sign in karein:
                </p>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 text-white font-semibold py-3 px-4 rounded-2xl shadow-md hover:shadow-xl transition-all disabled:opacity-60 text-sm cursor-pointer"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                  <span>Sign in with Google</span>
                </button>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-slate-400">
                    Clinic Doctors &amp; Admins can also use{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("admin")}
                      className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
                    >
                      Admin Password Login
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Admin Password / OTP Sign In */}
            {activeTab === "admin" && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between pb-1 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Method:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAdminMode("password")
                        setError("")
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        adminMode === "password"
                          ? "bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAdminMode("otp")
                        setError("")
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        adminMode === "otp"
                          ? "bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Email OTP
                    </button>
                  </div>
                </div>

                {adminMode === "password" ? (
                  <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Admin Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="doctor@missionrehab.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Admin Password
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 text-xs cursor-pointer"
                    >
                      {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                      <span>Admin Sign In</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Registered Admin Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || !email.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:bg-slate-900 transition-all disabled:opacity-60 text-xs cursor-pointer"
                      >
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        <span>Send 6-Digit OTP</span>
                      </button>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Enter 6-Digit Code
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            placeholder="123456"
                            className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading || otp.length !== 6}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all disabled:opacity-60 text-xs cursor-pointer"
                        >
                          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                          <span>Verify &amp; Enter Dashboard</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading}
                          className="w-full text-center text-xs text-brand-600 dark:text-brand-400 hover:underline pt-1"
                        >
                          Resend Code
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
