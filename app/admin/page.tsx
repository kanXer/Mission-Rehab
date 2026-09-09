"use client"

import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import {
  FileText,
  Calendar,
  Image as IconImage,
  LayoutGrid,
  Loader,
  Tags,
  Phone,
  Clock,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Flame,
} from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Booking {
  _id: string
  name: string
  phone: string
  email: string
  condition?: string
  date: string
  time: string
  timestamp: string
}

interface Enquiry {
  _id: string
  name: string
  phone: string
  email: string
  subject: string
  message: string
  timestamp: string
  status?: "pending" | "completed"
}

const adminNavCards = [
  {
    icon: Calendar,
    label: "Appointment Bookings",
    desc: "Review time slots & patient schedule",
    href: "/admin/bookings",
    color: "from-blue-500/20 to-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  },
  {
    icon: MessageSquare,
    label: "Lead Inquiries & Callbacks",
    desc: "Manage urgent patient requests",
    href: "/admin/enquiries",
    color: "from-amber-500/20 to-rose-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    icon: FileText,
    label: "Blog Publications",
    desc: "Publish medical articles & updates",
    href: "/admin/blog",
    color: "from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    icon: Tags,
    label: "Article Categories",
    desc: "Organize clinical specialties",
    href: "/admin/categories",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    icon: LayoutGrid,
    label: "Gallery & Video Center",
    desc: "Manage treatment photos & YouTube",
    href: "/admin/gallery",
    color: "from-pink-500/20 to-rose-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30",
  },
  {
    icon: IconImage,
    label: "Cloudinary Uploads",
    desc: "Upload clinic media & equipment shots",
    href: "/admin/upload",
    color: "from-violet-500/20 to-brand-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30",
  },
  {
    icon: HelpCircle,
    label: "Patient FAQ Editor",
    desc: "Edit rehabilitation FAQs",
    href: "/admin/faq",
    color: "from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30",
  },
  {
    icon: Users,
    label: "Manage Administrators",
    desc: "Control doctor & admin access",
    href: "/admin/admins",
    color: "from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
]

export default function AdminDashboard() {
  const { user, loading: authLoading, logout, getIdToken } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [fetching, setFetching] = useState(true)
  const [activeTab, setActiveTab] = useState<"urgent" | "today" | "all">("urgent")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  async function loadData() {
    if (!user?.isAdmin) return
    setFetching(true)
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = {}
      if (token) headers["Authorization"] = `Bearer ${token}`

      const [bRes, eRes] = await Promise.all([
        fetch("/api/bookings", { headers }),
        fetch("/api/enquiries", { headers }),
      ])

      const [bData, eData] = await Promise.all([bRes.json(), eRes.json()])

      if (bData?.bookings) setBookings(bData.bookings)
      if (eData?.enquiries) setEnquiries(eData.enquiries)
    } catch {
      toast("Error refreshing dashboard data")
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (user?.isAdmin) {
      loadData()
    }
  }, [user])

  async function markEnquiryDone(id: string) {
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`

      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id }),
      })

      if (!res.ok) throw new Error("Failed to update enquiry")

      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: "completed" } : e))
      )
      toast("Enquiry marked completed")
    } catch {
      toast("Could not update enquiry status")
    }
  }

  // Derived Analytics & Lead Generation Statistics
  const stats = useMemo(() => {
    const today = new Date()
    const todayISO = today.toISOString().split("T")[0]

    const todaysBookings = bookings.filter((b) => b.date === todayISO)
    const todaysEnquiries = enquiries.filter((e) => {
      try {
        return new Date(e.timestamp).toISOString().split("T")[0] === todayISO
      } catch {
        return false
      }
    })

    const totalLeads = bookings.length + enquiries.length
    const todayLeads = todaysBookings.length + todaysEnquiries.length

    const pendingEnquiries = enquiries.filter((e) => e.status !== "completed")
    const completedEnquiries = enquiries.filter((e) => e.status === "completed")

    const callbackRequests = enquiries.filter(
      (e) =>
        (e.subject && e.subject.toLowerCase().includes("callback")) ||
        (e.message && e.message.toLowerCase().includes("callback"))
    )

    // Calculate lead condition breakdown
    const conditionCounts: Record<string, number> = {}
    bookings.forEach((b) => {
      const c = b.condition || "General Consultation"
      conditionCounts[c] = (conditionCounts[c] || 0) + 1
    })
    enquiries.forEach((e) => {
      let matched = "Other Enquiries"
      const lower = `${e.subject} ${e.message}`.toLowerCase()
      if (lower.includes("stroke") || lower.includes("paralysis")) matched = "Stroke / Paralysis"
      else if (lower.includes("spinal")) matched = "Spinal Cord Injury"
      else if (lower.includes("gait") || lower.includes("balance")) matched = "Gait & Balance"
      else if (lower.includes("back") || lower.includes("neck")) matched = "Back & Neck Pain"
      else if (lower.includes("pediatric")) matched = "Pediatric Neuro"
      conditionCounts[matched] = (conditionCounts[matched] || 0) + 1
    })

    const topConditions = Object.entries(conditionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 7-day velocity
    const last7Days: { dateStr: string; dayLabel: string; count: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dStr = d.toISOString().split("T")[0]
      const label = d.toLocaleDateString("en-US", { weekday: "short" })

      const count =
        bookings.filter((b) => b.date === dStr).length +
        enquiries.filter((e) => {
          try {
            return new Date(e.timestamp).toISOString().split("T")[0] === dStr
          } catch {
            return false
          }
        }).length

      last7Days.push({ dateStr: dStr, dayLabel: label, count })
    }

    const maxDayCount = Math.max(...last7Days.map((d) => d.count), 1)

    // Conversion rate estimation
    const conversionRate = totalLeads > 0 ? Math.round(((bookings.length + completedEnquiries.length) / totalLeads) * 100) : 100

    return {
      totalLeads,
      todayLeads,
      todaysBookings,
      pendingEnquiries,
      completedEnquiries,
      callbackRequests,
      topConditions,
      last7Days,
      maxDayCount,
      conversionRate,
    }
  }, [bookings, enquiries])

  // Filtered Leads Stream
  const filteredStream = useMemo(() => {
    let list: Array<{
      id: string
      type: "booking" | "enquiry" | "callback"
      name: string
      phone: string
      email: string
      detail: string
      time: string
      dateLabel: string
      status?: string
      rawDate?: string
    }> = []

    if (activeTab === "urgent" || activeTab === "all") {
      stats.pendingEnquiries.forEach((e) => {
        const isCb =
          e.subject?.toLowerCase().includes("callback") ||
          e.message?.toLowerCase().includes("callback")
        list.push({
          id: e._id,
          type: isCb ? "callback" : "enquiry",
          name: e.name || "Anonymous Patient",
          phone: e.phone,
          email: e.email,
          detail: e.subject || e.message || "Enquiry",
          time: new Date(e.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          dateLabel: new Date(e.timestamp).toLocaleDateString(),
          status: e.status || "pending",
          rawDate: e.timestamp,
        })
      })
    }

    if (activeTab === "today" || activeTab === "all") {
      stats.todaysBookings.forEach((b) => {
        list.push({
          id: b._id,
          type: "booking",
          name: b.name,
          phone: b.phone,
          email: b.email,
          detail: `${b.condition || "Appointment"} at ${b.time}`,
          time: b.time,
          dateLabel: b.date,
          status: "confirmed",
          rawDate: b.timestamp,
        })
      })
    }

    if (activeTab === "all") {
      bookings.forEach((b) => {
        if (!list.some((item) => item.id === b._id)) {
          list.push({
            id: b._id,
            type: "booking",
            name: b.name,
            phone: b.phone,
            email: b.email,
            detail: `${b.condition || "Appointment"} on ${b.date} (${b.time})`,
            time: b.time,
            dateLabel: b.date,
            status: "scheduled",
            rawDate: b.timestamp,
          })
        }
      })
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.detail.toLowerCase().includes(q)
      )
    }

    return list.sort((a, b) => (b.rawDate || "").localeCompare(a.rawDate || ""))
  }, [activeTab, stats, bookings, searchQuery])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  if (!user || !user.isAdmin) return null

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors">
      {/* ========================================================================= */}
      {/* FUTURISTIC GLASS AMBIENCE / GLOWING ORBS                                  */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-500/15 dark:bg-brand-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[550px] h-[550px] bg-accent-500/15 dark:bg-accent-500/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* ========================================================================= */}
        {/* GLASS COMMAND BAR / TOP HEADER                                            */}
        {/* ========================================================================= */}
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Doctor Command Center</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold normal-case">Live Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
              Lead Generation &amp; <span className="bg-gradient-to-r from-brand-600 via-accent-500 to-cyan-400 bg-clip-text text-transparent">Conversion Hub</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome, <strong className="text-slate-700 dark:text-slate-200">{user.name}</strong> • Real-time patient inquiries, bookings, and clinic performance analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={loadData}
              disabled={fetching}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-navy-800/80 hover:bg-white dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-navy-700 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${fetching ? "animate-spin text-brand-500" : ""}`} />
              <span>{fetching ? "Refreshing..." : "Sync Live Data"}</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200/60 dark:border-red-900/50 shadow-sm transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LEAD METRICS PULSE GRID (4 PRIMARY CONVERSION STATS)                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Card 1: Total Leads Generated */}
          <div className="relative group backdrop-blur-xl bg-white/75 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-500/20 to-cyan-500/20 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Active
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Inbound Leads
            </p>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
                {stats.totalLeads}
              </h2>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">all-time</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span>Today:</span>
              <strong className="text-brand-600 dark:text-brand-400 font-bold">+{stats.todayLeads} leads</strong>
            </p>
          </div>

          {/* Card 2: Booked Appointments */}
          <div className="relative group backdrop-blur-xl bg-white/75 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                Bookings
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              In-Clinic Bookings
            </p>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
                {bookings.length}
              </h2>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">slots</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span>Today:</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{stats.todaysBookings.length} today</strong>
            </p>
          </div>

          {/* Card 3: Urgent Callbacks & Enquiries */}
          <div className="relative group backdrop-blur-xl bg-white/75 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              {stats.pendingEnquiries.length > 0 ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 animate-pulse">
                  Urgent
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  Clear
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Pending Callbacks
            </p>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <h2 className="text-2xl sm:text-4xl font-black text-rose-600 dark:text-rose-400">
                {stats.pendingEnquiries.length}
              </h2>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">pending</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span>Resolved:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.completedEnquiries.length} done</strong>
            </p>
          </div>

          {/* Card 4: Lead Conversion Rate */}
          <div className="relative group backdrop-blur-xl bg-white/75 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60">
                Rate
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Conversion Efficiency
            </p>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <h2 className="text-2xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {stats.conversionRate}%
              </h2>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">rate</span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span>Turnaround:</span>
              <strong className="text-slate-700 dark:text-slate-300 font-bold">&lt; 15 mins</strong>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LEAD ANALYTICS: 7-DAY VELOCITY CHART & TOP CONDITIONS BREAKDOWN           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Columns: 7-Day Inbound Lead Velocity Chart */}
          <div className="lg:col-span-7 backdrop-blur-2xl bg-white/70 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-500" />
                  Lead Generation Velocity (Past 7 Days)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Combined daily intake of clinic bookings &amp; callback inquiries
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                Daily Trend
              </span>
            </div>

            {/* Custom SVG Bar Graph */}
            <div className="pt-4 pb-2">
              <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-200 dark:border-white/10">
                {stats.last7Days.map((day, idx) => {
                  const heightPercent = Math.max(Math.round((day.count / stats.maxDayCount) * 100), 12)
                  const isToday = idx === stats.last7Days.length - 1
                  return (
                    <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      {/* Count Badge */}
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                        {day.count}
                      </span>
                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[42px] rounded-t-xl transition-all duration-500 shadow-md ${
                          isToday
                            ? "bg-gradient-to-t from-brand-600 via-accent-500 to-cyan-400 shadow-brand-500/25 ring-2 ring-brand-400/40"
                            : "bg-gradient-to-t from-slate-300 to-slate-400 dark:from-navy-700 dark:to-navy-600 hover:from-brand-500 hover:to-accent-500"
                        }`}
                      />
                      {/* Day Label */}
                      <span
                        className={`text-[11px] font-semibold mt-2 ${
                          isToday ? "text-brand-600 dark:text-brand-400 font-bold" : "text-slate-400"
                        }`}
                      >
                        {day.dayLabel}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Top Medical Conditions In Demand */}
          <div className="lg:col-span-5 backdrop-blur-2xl bg-white/70 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-accent-500" />
                  Top Specialties In Demand
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">By Patient Intake</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Which conditions generate the highest conversion volume
              </p>

              <div className="space-y-4">
                {stats.topConditions.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No inquiries logged yet</p>
                ) : (
                  stats.topConditions.map((cond, i) => {
                    const pct = Math.round((cond.count / Math.max(stats.totalLeads, 1)) * 100)
                    const colors = [
                      "from-brand-500 to-cyan-500",
                      "from-accent-500 to-rose-500",
                      "from-emerald-500 to-teal-500",
                      "from-amber-500 to-yellow-500",
                      "from-purple-500 to-indigo-500",
                    ]
                    const color = colors[i % colors.length]
                    return (
                      <div key={cond.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-200">{cond.name}</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {cond.count} leads ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                            style={{ width: `${Math.max(pct, 8)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>Primary Service:</span>
              <strong className="text-accent-600 dark:text-accent-400 font-bold">Stroke &amp; Neuro Rehab</strong>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIVE INBOUND PATIENT PIPELINE (TABS + ACTIONS: CALL, WHATSAPP, COMPLETE)  */}
        {/* ========================================================================= */}
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-navy-900/50 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-500" />
                Live Patient Lead Stream
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Instant one-click direct communication &amp; response pipeline
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("urgent")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "urgent"
                    ? "bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md shadow-rose-600/20"
                    : "bg-slate-100 dark:bg-navy-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700"
                }`}
              >
                🔥 Urgent Callbacks ({stats.pendingEnquiries.length})
              </button>

              <button
                onClick={() => setActiveTab("today")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "today"
                    ? "bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md shadow-brand-600/20"
                    : "bg-slate-100 dark:bg-navy-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700"
                }`}
              >
                📅 Today&apos;s Appointments ({stats.todaysBookings.length})
              </button>

              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-navy-900 dark:bg-white text-white dark:text-navy-950 shadow-md"
                    : "bg-slate-100 dark:bg-navy-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700"
                }`}
              >
                All Recent Leads
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative my-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by patient name, phone, condition, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white/60 dark:bg-navy-800/60 text-xs text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>

          {/* Lead List */}
          <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[480px] overflow-y-auto">
            {filteredStream.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold text-navy-900 dark:text-white">
                  No active inquiries in this filter.
                </p>
                <p className="text-xs text-slate-400">
                  All patients have been attended to, or try clearing the search box.
                </p>
              </div>
            ) : (
              filteredStream.map((item) => {
                const isUrgent = item.type === "callback" || item.status === "pending"
                const whatsappText = encodeURIComponent(
                  `Hello ${item.name}, Dr. Devejya Srivastava's clinic (Gorakhpur Mission Rehab) received your consultation request regarding ${item.detail}. How can we assist you?`
                )

                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/40 dark:hover:bg-white/[0.02] p-3 rounded-2xl transition-colors"
                  >
                    {/* Left: Patient info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-navy-950 dark:text-white">{item.name}</span>
                        {item.type === "callback" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300/50 dark:border-rose-800 animate-pulse">
                            ⚡ 15-Min Callback
                          </span>
                        )}
                        {item.type === "booking" && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300/50 dark:border-cyan-800">
                            📅 Appointment
                          </span>
                        )}
                        {item.type === "enquiry" && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/50 dark:border-amber-800">
                            💬 Web Enquiry
                          </span>
                        )}
                        {item.status === "completed" && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            Resolved
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 max-w-2xl">
                        {item.detail}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1 font-mono font-medium text-slate-600 dark:text-slate-300">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {item.phone}
                        </span>
                        {item.email && item.email !== "patient-direct@lead.local" && (
                          <span>{item.email}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.dateLabel} {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Call Now */}
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold text-xs border border-red-200/60 dark:border-red-900/50 transition-colors"
                        title="Call patient phone"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Call</span>
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/91${item.phone.replace(/\D/g, "")}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-200/60 dark:border-emerald-900/50 transition-colors"
                        title="Chat with patient on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>

                      {/* Mark Resolved (if enquiry) */}
                      {item.type !== "booking" && item.status !== "completed" && (
                        <button
                          type="button"
                          onClick={() => markEnquiryDone(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                          title="Mark inquiry completed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="hidden sm:inline">Resolve</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODERN GLASSY MANAGEMENT PORTAL (CARD NAVIGATION GRID)                   */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white">
                Clinic Management Systems
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Fast navigation to content, patient ledgers, media, and security
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {adminNavCards
              .filter((card) => card.href !== "/admin/admins" || user?.isSuperAdmin)
              .map((card) => (
                <Link
                  key={card.href}
                href={card.href}
                className="group relative backdrop-blur-xl bg-white/70 dark:bg-navy-900/40 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Micro Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity pointer-events-none rounded-2xl sm:rounded-3xl" />

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.color} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <card.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                  {card.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
