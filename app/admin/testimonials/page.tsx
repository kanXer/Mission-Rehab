"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { Loader, Plus, Edit3, Trash2, ArrowLeft, X, Star } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Review {
  _id: string
  name: string
  content: string
  rating: number
}

export default function AdminTestimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  function fetchReviews() {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(d => { if (d.reviews) setReviews(d.reviews) })
      .catch(() => setError("Failed to load testimonials"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (user?.isAdmin) fetchReviews() }, [user])

  function openAdd() {
    setEditingId(null)
    setName("")
    setContent("")
    setRating(5)
    setError("")
    setModalOpen(true)
  }

  function openEdit(review: Review) {
    setEditingId(review._id)
    setName(review.name)
    setContent(review.content)
    setRating(review.rating)
    setError("")
    setModalOpen(true)
  }

  async function saveReview() {
    if (!name.trim() || !content.trim()) {
      setError("Name and review text are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      const isEdit = editingId !== null
      const res = await fetch("/api/reviews", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { _id: editingId, name, content, rating } : { name, content, rating }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to save testimonial")
        setSaving(false)
        return
      }
      setModalOpen(false)
      toast(isEdit ? "Testimonial updated" : "Testimonial added")
      fetchReviews()
    } catch {
      setError("Network error — could not reach server")
    }
    setSaving(false)
  }

  async function deleteReview(id: string) {
    if (!confirm("Delete this testimonial?")) return
    setError("")
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to delete testimonial")
        return
      }
      toast("Testimonial deleted")
      fetchReviews()
    } catch {
      setError("Network error — could not reach server")
    }
  }

  if (authLoading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy-800 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-brand-600" /> Manage Testimonials
          </h1>
          <button type="button" onClick={openAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>

        {error && !modalOpen && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="mb-4">No testimonials yet. Click &quot;Add Testimonial&quot; to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map(review => (
              <div key={review._id} className="bg-white dark:bg-navy-800 rounded-xl p-4 border border-slate-200 dark:border-navy-700 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-navy-800 dark:text-white text-sm">{review.name}</span>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{review.content}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={() => openEdit(review)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-500 dark:text-slate-400 hover:text-brand-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => deleteReview(review._id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <div className="relative bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-navy-700">
                <h2 className="font-semibold text-navy-800 dark:text-white">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
                <button type="button" onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Patient Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter patient name..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Review</label>
                  <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="Enter the testimonial text..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Rating</label>
                  <select value={rating} onChange={e => setRating(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-navy-700">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={saveReview} disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? "Save Changes" : "Add Testimonial"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
