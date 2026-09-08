"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { HelpCircle, Plus, Edit3, Trash2, ArrowLeft, Check, X, ArrowUp, ArrowDown, Loader } from "lucide-react"
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
  const [error, setError] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [newQ, setNewQ] = useState("")
  const [newA, setNewA] = useState("")
  const [newCat, setNewCat] = useState("")
  const [editQ, setEditQ] = useState("")
  const [editA, setEditA] = useState("")
  const [editCat, setEditCat] = useState("")

  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/login")
  }, [user, authLoading, router])

  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs])

  function fetchFaqs() {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((d) => { if (d.faqs) setFaqs(d.faqs) })
      .catch(() => setError("Failed to load FAQs"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (user?.isAdmin) fetchFaqs() }, [user])

  async function addFaq() {
    if (!newQ.trim() || !newA.trim()) return
    setAdding(true)
    setError("")
    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: newQ, a: newA, category: newCat }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to add FAQ")
        setAdding(false)
        return
      }
      setNewQ("")
      setNewA("")
      setNewCat("")
      toast("FAQ added")
      fetchFaqs()
    } catch {
      setError("Network error â€” could not reach server")
    }
    setAdding(false)
  }

  async function updateFaq(id: string) {
    if (!editQ.trim() || !editA.trim()) return
    setError("")
    try {
      const res = await fetch("/api/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, q: editQ, a: editA, category: editCat }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to update FAQ")
        return
      }
      setEditingId(null)
      setEditQ("")
      setEditA("")
      setEditCat("")
      toast("FAQ updated")
      fetchFaqs()
    } catch {
      setError("Network error â€” could not reach server")
    }
  }

  async function deleteFaq(id: string) {
    if (!confirm("Delete this FAQ?")) return
    setError("")
    try {
      const res = await fetch("/api/faq", {
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
      setError("Network error â€” could not reach server")
    }
  }

  async function moveFaq(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= faqs.length) return
    setError("")
    const next = [...faqs]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    try {
      const res = await fetch("/api/faq", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: next.map((f) => f._id) }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to reorder FAQs")
        return
      }
      setFaqs(next)
      toast("Order updated")
    } catch {
      setError("Network error â€” could not reach server")
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
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-brand-600" />
          <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Manage FAQs</h1>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm mb-8 p-5">
          <h2 className="font-semibold text-navy-800 dark:text-white text-sm mb-4">Add New FAQ</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Question..." value={newQ} onChange={(e) => setNewQ(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <textarea placeholder="Answer..." value={newA} onChange={(e) => setNewA(e.target.value)} rows={3}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y" />
            <div className="flex flex-col sm:flex-row gap-3">
              <input list="faq-categories" type="text" placeholder="Category (e.g. Treatment)" value={newCat} onChange={(e) => setNewCat(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              <datalist id="faq-categories">
                {categories.map((cat) => <option key={cat} value={cat} />)}
              </datalist>
              <button type="button" onClick={addFaq} disabled={adding || !newQ.trim() || !newA.trim()}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
                {adding ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader className="w-6 h-6 animate-spin text-brand-600" /></div>
        ) : faqs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-10 bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700">No FAQs yet. Add one above.</p>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq._id} className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm p-4">
                {editingId === faq._id ? (
                  <div className="space-y-3">
                    <input type="text" value={editQ} onChange={(e) => setEditQ(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    <textarea value={editA} onChange={(e) => setEditA(e.target.value)} rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y" />
                    <div className="flex items-center gap-3">
                      <input list="faq-categories" type="text" value={editCat} onChange={(e) => setEditCat(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                      <button type="button" onClick={() => updateFaq(faq._id)}
                        className="p-2 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => { setEditingId(null); setEditQ(""); setEditA(""); setEditCat("") }}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy-800 dark:text-white">{faq.q}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{faq.a}</p>
                        <span className="inline-block text-[10px] font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full mt-2">{faq.category}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button type="button" onClick={() => moveFaq(index, -1)} disabled={index === 0}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Move up">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => moveFaq(index, 1)} disabled={index === faqs.length - 1}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Move down">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => { setEditingId(faq._id); setEditQ(faq.q); setEditA(faq.a); setEditCat(faq.category) }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => deleteFaq(faq._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
