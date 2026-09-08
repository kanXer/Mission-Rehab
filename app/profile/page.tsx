"use client"

import { useState, useEffect, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import {
  Loader, Mail, User as UserIcon, Shield, ShieldCheck, LogOut,
  ArrowLeft, LayoutDashboard, Phone, MapPin, Calendar, HeartPulse,
  Save, CheckCircle, FileText
} from "lucide-react"
import Header from "@/components/Header"
import TopBar from "@/components/TopBar"
import Footer from "@/components/Footer"
import { useToast } from "@/components/ToastProvider"

const conditions = [
  "Stroke / Paralysis Recovery",
  "Spinal Cord Injury",
  "Gait & Balance Disorder",
  "Pediatric Neuro Condition",
  "Plantar Fasciitis / Heel Pain",
  "Parkinson's / Neurological",
  "Sports Injury",
  "Post-Surgical Rehab",
  "Back / Neck Pain",
  "Knee / Joint Pain",
  "Other",
]

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("")
}

export default function ProfilePage() {
  const { user, loading, logout, getIdToken } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)

  // Patient Profile Details State
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [condition, setCondition] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")

  useEffect(() => {
    if (!loading && !user) router.push("/login")
  }, [user, loading, router])

  // Load saved profile data from MongoDB
  useEffect(() => {
    if (!user) return
    let isMounted = true

    async function loadProfile() {
      try {
        const token = await getIdToken()
        if (!token) return

        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (isMounted && data.profile) {
          setName(data.profile.name || user?.name || "")
          setPhone(data.profile.phone || "")
          setCondition(data.profile.condition || "")
          setAge(data.profile.age || "")
          setGender(data.profile.gender || "")
          setAddress(data.profile.address || "")
          setMedicalHistory(data.profile.medicalHistory || "")
        }
      } catch (e) {
        console.error("Profile load error:", e)
      } finally {
        if (isMounted) setFetching(false)
      }
    }

    loadProfile()
    return () => {
      isMounted = false
    }
  }, [user, getIdToken])

  async function handleSaveProfile(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const token = await getIdToken()
      if (!token) {
        toast("Session expired. Please sign in again.")
        setSaving(false)
        return
      }

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          condition,
          age,
          gender,
          address,
          medicalHistory,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        toast("Medical details saved! Appointment form will autofill this.")
      } else {
        toast(data.error || "Failed to update details")
      }
    } catch {
      toast("Error saving details. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || (user && fetching)) {
    return (
      <>
        <TopBar />
        <Header />
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-navy-950">
          <Loader className="w-8 h-8 animate-spin text-brand-600" />
          <p className="text-slate-400 text-xs font-semibold">Loading health profile...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <TopBar />
        <Header />
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 bg-slate-50 dark:bg-navy-950">
          <div className="text-center bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-xl p-8 max-w-sm w-full">
            <Shield className="w-12 h-12 text-brand-500 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Patient Portal</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Sign in with your Google account to manage your appointment profile and saved health records.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Sign In to Patient Portal
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const roleLabel = user.isSuperAdmin ? "Super Admin" : user.isAdmin ? "Clinical Admin" : "Verified Patient"

  return (
    <>
      <TopBar />
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-200px)] bg-slate-50 dark:bg-navy-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with Saved Info</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Account Overview Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 shadow-md overflow-hidden">
                <div className="h-28 bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 relative">
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="px-6 pb-6 relative">
                  <div className="flex items-end -mt-12 mb-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-navy-900 shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border-4 border-white dark:border-navy-900 shadow-lg flex items-center justify-center">
                        <span className="text-3xl font-extrabold text-white">{initials(user.name || user.email)}</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl font-black text-navy-900 dark:text-white flex items-center gap-2">
                    {name || user.name}
                    {user.isAdmin && <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />}
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        user.isAdmin
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                          : "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
                      }`}
                    >
                      {roleLabel}
                    </span>
                    <span className="text-xs text-slate-400">• Divyaman Hospital</span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800">
                      <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Account Email</p>
                        <p className="text-xs font-semibold text-navy-900 dark:text-slate-200 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800">
                      <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Primary Condition</p>
                        <p className="text-xs font-semibold text-navy-900 dark:text-slate-200 truncate">
                          {condition || "Not set yet"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Go to Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        await logout()
                        router.push("/")
                      }}
                      className="w-full flex items-center justify-center gap-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-bold text-xs py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Convenience Information Alert */}
              <div className="p-5 rounded-3xl bg-brand-50/70 dark:bg-brand-950/20 border border-brand-200/70 dark:border-brand-900/40 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <div className="font-bold text-brand-800 dark:text-brand-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-600" />
                  <span>Autofill Enabled</span>
                </div>
                <p className="leading-relaxed">
                  Yahan save kiye gaye details aapke <strong>Doctor Appointment Form</strong> me automatically pre-fill ho jayenge taaki aapko baar-baar apna name, phone ya medical details fill na karni padein.
                </p>
              </div>
            </div>

            {/* Right Column: Editable Health & Appointment Details */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-6 sm:p-8 shadow-md">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-600" />
                    <span>My Health &amp; Appointment Details</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Keep your contact &amp; clinical information updated for seamless consultations with Dr. Devejya Srivastava.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Full Patient Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Phone Number (WhatsApp)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          maxLength={10}
                          className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Primary Condition
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      >
                        <option value="">Select Condition</option>
                        {conditions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Patient Age
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 45"
                        className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      City / Area Address
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Raptinagar, Gorakhpur"
                        className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Brief Medical History / Notes
                    </label>
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      placeholder="e.g. Stroke occurred 3 months ago, weakness in left side arm and leg. Previous MRI done."
                      rows={3}
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-xl transition-all disabled:opacity-60"
                    >
                      {saving ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Saving Medical Details...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save &amp; Update Details</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

