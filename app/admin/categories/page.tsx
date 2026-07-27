"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { Loader, Plus, Edit3, Trash2, ArrowLeft, Check, X } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Category {
  _id: string
  name: string
  order: number
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [error, setError] = useState("")
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  function fetchCats() {
    fetch("/api/categories")
      .then(r => r.json())
      .then(d => { if (d.categories) setCategories(d.categories) })
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (user?.isAdmin) fetchCats() }, [user])

  async function addCategory() {
    if (!newName.trim()) return
    setAdding(true)
    setError("")
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to add category")
        setAdding(false)
        return
      }
      setNewName("")
      toast("Category added")
      fetchCats()
    } catch {
      setError("Network error — could not reach server")
    }
    setAdding(false)
  }

  async function updateCategory(id: string) {
    if (!editName.trim()) return
    setError("")
    try {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, name: editName }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to update category")
        return
      }
      setEditingId(null)
      setEditName("")
      toast("Category updated")
      fetchCats()
    } catch {
      setError("Network error — could not reach server")
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return
    setError("")
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to delete category")
        return
      }
      toast("Category deleted")
      fetchCats()
    } catch {
      setError("Network error — could not reach server")
    }
  }

  if (authLoading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-navy-800 dark:text-white mb-6">Categories</h1>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm mb-8">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-700 flex items-center gap-3">
            <input type="text" placeholder="New category name..." value={newName}
              onChange={e => setNewName(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <button type="button" onClick={addCategory} disabled={adding || !newName.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
              {adding ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><Loader className="w-6 h-6 animate-spin text-brand-600" /></div>
          ) : categories.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">No categories yet. Type a name above and click Add.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-navy-700">
              {categories.map(cat => (
                <div key={cat._id} className="flex items-center gap-3 px-5 py-3">
                  {editingId === cat._id ? (
                    <>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                      <button type="button" onClick={() => updateCategory(cat._id)}
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => { setEditingId(null); setEditName("") }}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-navy-800 dark:text-slate-200">{cat.name}</span>
                      <button type="button" onClick={() => { setEditingId(cat._id); setEditName(cat.name) }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => deleteCategory(cat._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
