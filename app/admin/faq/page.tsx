"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { Loader, Plus, Edit3, Trash2, ArrowLeft, X, HelpCircle } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Faq {
  _id: string
  q: string
  a: string
  category: string
  order: number
}

export default function AdminFaq() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [q, setQ] = useState("")
  const [a, setA] = useState("")
  const [category, setCategory] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  function fetchFaqs() {
    fetch("/api/faqs")
      .then(r => r.json())
      .then(d => { if (d.faqs) setFaqs(d.faqs) })
      .catch(() => setError("Failed to load FAQs"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (user?.isAdmin) fetchFaqs() }, [user])

  function openAdd() {
    setEditingId(null)
    setQ("")
    setA("")
    setCategory("")
    setError("")
    setModalOpen(true)
  }

  function openEdit(faq: Faq) {
    setEditingId(faq._id)
    setQ(faq.q)
    setA(faq.a)
    setCategory(faq.category)
    setError("")
    setModalOpen(true)
  }

  async function saveFaq() {
    if (!q.trim() || !a.trim()) {
      setError("Question and answer are required")
      return
    }
    setSaving(true)
    setError("")
    try {
      const isEdit = editingId !== null
      const res = await fetch("/api/faqs", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { _id: editingId, q, a, category } : { q, a, category }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to save FAQ")
        setSaving(false)
        return
      }
      setModalOpen(false)
      toast(isEdit ? "FAQ updated" : "FAQ added")
      fetchFaqs()
    } catch {
      setError("Network error — could not reach server")
    }
    setSaving(false)
  }

  async function deleteFaq(id: string) {
    if (!confirm("Delete this FAQ?")) return
    setError("")
    try {
      const res = await fetch("/api/faqs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to delete FAQ")
        return
      }
      toast("FAQ deleted")
      fetchFaqs()
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
            <HelpCircle className="w-6 h-6 text-brand-600" /> Manage FAQs
          </h1>
          <button type="button" onClick={openAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>

        {error && !modalOpen && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="mb-4">No FAQs yet. Click &quot;Add FAQ&quot; to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map(faq => (
              <div key={faq._id} className="bg-white dark:bg-navy-800 rounded-xl p-4 border border-slate-200 dark:border-navy-700 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">{faq.category}</span>
                  </div>
                  <h3 className="font-semibold text-navy-800 dark:text-white text-sm">{faq.q}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{faq.a}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={() => openEdit(faq)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-500 dark:text-slate-400 hover:text-brand-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => deleteFaq(faq._id)}
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
                <h2 className="font-semibold text-navy-800 dark:text-white">{editingId ? "Edit FAQ" : "Add FAQ"}</h2>
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
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Question</label>
                  <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Enter the question..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Answer</label>
                  <textarea value={a} onChange={e => setA(e.target.value)} rows={5} placeholder="Enter the answer..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Treatment, Stroke & Paralysis" list="faq-categories"
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  <datalist id="faq-categories">
                    {Array.from(new Set(faqs.map(f => f.category))).map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-navy-700">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={saveFaq} disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
                  {saving ? <Loader className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? "Save Changes" : "Add FAQ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
