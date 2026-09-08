"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { Shield, Plus, Trash2, ArrowLeft, Loader, ShieldCheck, Crown, HelpCircle } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Admin {
  _id: string
  email: string
  addedBy?: string
  createdAt?: string
}

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [superAdminEmail, setSuperAdminEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [adding, setAdding] = useState(false)
  const { user, loading: authLoading, getIdToken } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/login")
  }, [user, authLoading, router])

  async function fetchAdmins() {
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = {}
      if (token) headers["Authorization"] = `Bearer ${token}`
      const r = await fetch("/api/admins", { headers })
      const d = await r.json()
      if (!r.ok) {
        setError(d.error || "Failed to load admins")
        return
      }
      if (d.admins) setAdmins(d.admins)
      if (d.superAdminEmail) setSuperAdminEmail(d.superAdminEmail)
    } catch {
      setError("Failed to load admins")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user?.isAdmin) fetchAdmins() }, [user])

  const isSuperAdmin = user?.isSuperAdmin === true

  async function addAdmin() {
    if (!newEmail.trim()) return
    setAdding(true)
    setError("")
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`
      const res = await fetch("/api/admins", {
        method: "POST",
        headers,
        body: JSON.stringify({ email: newEmail.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to add admin")
        setAdding(false)
        return
      }
      setNewEmail("")
      toast("Admin added successfully")
      fetchAdmins()
    } catch {
      setError("Network error — could not reach server")
    } finally {
      setAdding(false)
    }
  }

  async function removeAdmin(email: string) {
    if (!confirm(`Remove ${email} from admins?`)) return
    setError("")
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = {}
      if (token) headers["Authorization"] = `Bearer ${token}`
      const res = await fetch(`/api/admins?email=${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers,
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to remove admin")
        return
      }
      toast("Admin removed")
      fetchAdmins()
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
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-brand-600" />
          <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Manage Admins</h1>
        </div>

        {!isSuperAdmin && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
            Aap admin hain. Naye admins sirf super admin (owner) add/remove kar sakta hai.
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {isSuperAdmin && (
          <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm mb-6 p-5">
            <h2 className="font-semibold text-navy-800 dark:text-white text-sm mb-4">Add Admin Account</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="admin@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              <button type="button" onClick={addAdmin} disabled={adding || !newEmail.trim()}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
                {adding ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Admin
              </button>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
              Ye email Firebase account se login karega. Admin ko pehle account bana kar sign-in karna hoga.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10"><Loader className="w-6 h-6 animate-spin text-brand-600" /></div>
        ) : (
          <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-navy-700">
              {superAdminEmail && (
                <div className="flex items-center gap-3 px-5 py-4 bg-amber-50/60 dark:bg-amber-900/10">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy-800 dark:text-white truncate">{superAdminEmail}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Super Admin (Owner) â€” .env mein set</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                </div>
              )}
              {admins.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-10">No additional admins yet.</p>
              ) : (
                admins.map((admin) => (
                  <div key={admin._id} className="flex items-center gap-3 px-5 py-4">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-navy-800 dark:text-white truncate">{admin.email}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {admin.createdAt ? `Added ${new Date(admin.createdAt).toLocaleDateString("en-IN")}` : "Admin"}
                      </p>
                    </div>
                    {isSuperAdmin && (
                      <button type="button" onClick={() => removeAdmin(admin.email)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
