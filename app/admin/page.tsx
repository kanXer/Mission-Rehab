"use client"

import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Calendar, Image as IconImage, LayoutGrid, Loader, Tags, Phone, Clock, MessageSquare, AlertCircle, ArrowRight, CheckCircle } from "lucide-react"

interface Booking {
  _id: string
  name: string
  phone: string
  email: string
  condition: string
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

const cards = [
  { icon: FileText, label: "Manage Blog Posts", desc: "Create, edit or delete blog posts", href: "/admin/blog" },
  { icon: Tags, label: "Categories", desc: "Manage blog categories", href: "/admin/categories" },
  { icon: LayoutGrid, label: "Gallery Manager", desc: "Manage photos & videos", href: "/admin/gallery" },
  { icon: IconImage, label: "Upload Images and Embedd Youtube Videos", desc: "Add new images and youtube videos to the gallery", href: "/admin/upload" },
  { icon: Calendar, label: "View Bookings", desc: "See all appointment bookings", href: "/admin/bookings" },
  { icon: MessageSquare, label: "View Enquiries", desc: "See all customer enquiries", href: "/admin/enquiries" },
]

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, loading, router])

  useEffect(() => {
    if (!user?.isAdmin) return
    fetch("/api/bookings").then(r => r.json()).then(d => { if (d.bookings) setBookings(d.bookings) }).catch(() => {})
    fetch("/api/enquiries").then(r => r.json()).then(d => { if (d.enquiries) setEnquiries(d.enquiries) }).catch(() => {})
  }, [user])

  const d = new Date()
  const todayStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
  const todaysBookings = bookings.filter(b => b.date === todayStr)
  const pendingEnquiries = enquiries.filter(e => e.status !== "completed")

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-navy-800 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Welcome, {user.name} {user.isAdmin && <span className="text-brand-600 font-medium">(Super Admin)</span>}
            </p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Calendar className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Pending Enquiries */}
        <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-navy-700">
            <h2 className="font-semibold text-navy-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent-600" /> Incomplete Enquiries
              {pendingEnquiries.length > 0 && (
                <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">{pendingEnquiries.length}</span>
              )}
            </h2>
            <Link href="/admin/enquiries" className="text-sm text-brand-600 hover:text-brand-700 font-medium">View all</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-navy-700 max-h-[300px] overflow-y-auto">
            {pendingEnquiries.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> All enquiries resolved
              </p>
            ) : (
              pendingEnquiries.slice(0, 10).map(e => (
                <div key={e._id} className="px-6 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy-800 dark:text-slate-200">{e.name}</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">Pending</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{e.phone}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{e.subject}</span>
                    </div>
                  </div>
                  <Link href="/admin/enquiries" className="text-xs text-brand-600 hover:text-brand-700 font-medium shrink-0 flex items-center gap-1">
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Bookings */}
        <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-navy-700">
            <h2 className="font-semibold text-navy-800 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" /> Today&apos;s Bookings
            </h2>
            <Link href="/admin/bookings" className="text-sm text-brand-600 hover:text-brand-700 font-medium">View all</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-navy-700 max-h-[300px] overflow-y-auto">
            {todaysBookings.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No bookings today.</p>
            ) : (
              todaysBookings.slice(0, 10).map(b => (
                <div key={b._id} className="px-6 py-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-800 dark:text-slate-200">{b.name}</span>
                    <span className="text-xs text-slate-400">{new Date(b.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{b.phone}</span>
                    {b.date && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.date} {b.time}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((c) => (
            <Link key={c.href} href={c.href}
              className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <c.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="font-semibold text-navy-800 dark:text-white mb-1">{c.label}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
