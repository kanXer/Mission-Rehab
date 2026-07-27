"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader, Calendar, ArrowLeft, X, Trash2, Phone, Mail, Clock, FileText } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Booking {
  _id: string
  name: string
  phone: string
  email: string
  condition: string
  date: string
  time: string
  message: string
  timestamp: string
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Appointment (Earliest)", value: "apt_early" },
  { label: "Appointment (Latest)", value: "apt_late" },
  { label: "Name A–Z", value: "name_az" },
  { label: "Name Z–A", value: "name_za" },
]

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [sort, setSort] = useState("newest")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Booking | null>(null)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  async function fetchBookings() {
    try {
      const res = await fetch("/api/bookings")
      const data = await res.json()
      if (data.bookings) setBookings(data.bookings)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) fetchBookings() }, [user])

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking?")) return
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        toast("Booking deleted")
        fetchBookings()
        setSelected(null)
      }
    } catch {}
  }

  const filtered = bookings.filter(b =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search)
  )
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "oldest": return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "apt_early": return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "apt_late": return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "name_az": return a.name.localeCompare(b.name)
      case "name_za": return b.name.localeCompare(a.name)
      default: return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
  })

  if (authLoading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-navy-800 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-brand-600" /> Bookings
            </h1>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 shrink-0">
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <input type="text" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full mt-3 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-slate-50 dark:bg-navy-900 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">No bookings yet.</div>
        ) : (
          <div className="space-y-3">
            {sorted.map((b) => (
              <div key={b._id} onClick={() => setSelected(b)}
                className="bg-white dark:bg-navy-800 rounded-xl p-5 border border-slate-200 dark:border-navy-700 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-navy-800 dark:text-white">{b.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{b.phone}</p>
                    {b.email && b.email !== "—" && <p className="text-sm text-slate-400 dark:text-slate-500">{b.email}</p>}
                  </div>
                  <div className="text-right text-xs text-slate-400 dark:text-slate-500">
                    <p>{new Date(b.date).toLocaleDateString("en-IN")}</p>
                    <p>{b.time}</p>
                  </div>
                </div>
                {b.condition && b.condition !== "Not specified" && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Condition: {b.condition}</p>
                )}
                {b.message && b.message !== "—" && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-navy-700 pt-2 mt-2">{b.message}</p>
                )}
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  Booked: {new Date(b.timestamp).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-navy-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-navy-700 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-navy-800 dark:text-white mb-5">{selected.name}</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-brand-600" /> {selected.phone}
              </div>
              {selected.email && selected.email !== "—" && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-brand-600" /> {selected.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-brand-600" /> {new Date(selected.date).toLocaleDateString("en-IN")} at {selected.time}
              </div>
              {selected.condition && selected.condition !== "Not specified" && (
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                  <FileText className="w-4 h-4 text-brand-600 mt-0.5" /> {selected.condition}
                </div>
              )}
              {selected.message && selected.message !== "—" && (
                <div className="pt-3 border-t border-slate-100 dark:border-navy-700">
                  <p className="font-medium text-navy-800 dark:text-white mb-1">Message</p>
                  <p className="text-slate-600 dark:text-slate-300">{selected.message}</p>
                </div>
              )}
              <div className="pt-3 border-t border-slate-100 dark:border-navy-700 text-xs text-slate-400">
                Booked on {new Date(selected.timestamp).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-700 flex justify-end">
              <button onClick={() => deleteBooking(selected._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all">
                <Trash2 className="w-4 h-4" /> Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
