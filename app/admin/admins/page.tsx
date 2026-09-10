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
  name?: string
  addedBy?: string
  createdAt?: string
}

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [superAdminEmail, setSuperAdminEmail] = useState("")
  const [superAdminEmails, setSuperAdminEmails] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const { user, loading: authLoading, getIdToken } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading) {
      if (!user || !user.isAdmin) {
        router.push("/login")
      } else if (!user.isSuperAdmin) {
        router.push("/admin")
      }
    }
  }, [user, authLoading, router])

  async function fetchAdmins() {
    try {
      const token = await getIdToken()
      const headers: Record<string, string> = {}
      if (token) headers["Authorization"] = `Bearer ${token}`
      const r = await fetch("/api/admins", { headers })

      let d: any = null
      const contentType = r.headers.get("content-type") || ""
      if (contentType.includes("application/json")) {
        d = await r.json()
      } else {
        const text = await r.text()
        console.error("[ADMINS] Non-JSON response:", r.status, text)
      }

      if (!r.ok) {
        if (r.status === 401) {
          setError("Session expired. Please log in again to manage admins.")
        } else if (r.status === 403) {
          setError(d?.error || "Access denied: Super admin account required.")
        } else if (r.status === 504) {
          setError("Database timeout (504). Please ensure MongoDB Atlas allows access from all IPs (0.0.0.0/0).")
        } else {
          setError(d?.error || `Server error (${r.status}). Please check Vercel environment variables & logs.`)
        }
        return
      }

      if (d) {
        if (d.admins) setAdmins(d.admins)
        if (d.superAdminEmail) setSuperAdminEmail(d.superAdminEmail)
        if (d.superAdminEmails) setSuperAdminEmails(d.superAdminEmails)
      }
    } catch (err: any) {
      console.error("[ADMINS] Fetch error:", err)
      setError(err?.message || "Failed to load admins")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.isAdmin && user?.isSuperAdmin) fetchAdmins()
  }, [user])

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
        body: JSON.stringify({ email: newEmail.trim(), name: newName.trim() }),
      })
      let data: any = null
      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json()
      }
      if (!res.ok) {
        setError(data?.error || `Failed to add admin (${res.status})`)
        setAdding(false)
        return
      }
      setNewEmail("")
      setNewName("")
      toast("Admin added successfully")
      fetchAdmins()
    } catch (err: any) {
      setError(err?.message || "Network error — could not reach server")
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
      let data: any = null
      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json()
      }
      if (!res.ok) {
        setError(data?.error || `Failed to remove admin (${res.status})`)
        return
      }
      toast("Admin removed successfully")
      fetchAdmins()
    } catch (err: any) {
      setError(err?.message || "Network error — could not reach server")
    }
  }

  if (authLoading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin || !user.isSuperAdmin) return null

  const displaySuperAdmins = superAdminEmails.length > 0 ? superAdminEmails : superAdminEmail ? [superAdminEmail] : []

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-950 dark:text-white">Manage Administrators</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Control who can access and edit clinic records</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
            Total: {displaySuperAdmins.length + admins.length}
          </span>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs sm:text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-800 shadow-sm mb-6 p-5 sm:p-6">
          <h2 className="font-bold text-navy-950 dark:text-white text-sm mb-3">Add New Admin Account</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Doctor / Admin Name (e.g. Dr. Devejya)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-navy-950 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <input
              type="email"
              required
              placeholder="admin@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-navy-950 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Admin add hote hi turant active ho jayega aur Google Sign-In se admin panel access kar sakega.
            </p>
            <button
              type="button"
              onClick={addAdmin}
                disabled={adding || !newEmail.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 shrink-0 cursor-pointer"
              >
                {adding ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Admin
              </button>
            </div>
          </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader className="w-6 h-6 animate-spin text-brand-600" /></div>
        ) : (
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/80 dark:border-navy-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-navy-800">
              {/* Super Admins */}
              {displaySuperAdmins.map((email) => (
                <div key={email} className="flex items-center gap-3.5 px-5 py-4 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy-950 dark:text-white truncate">{email}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Super Admin (Permanent Owner)</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                </div>
              ))}

              {/* Additional Admins */}
              {admins.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Koi additional admin added nahi hai. Upar se add kar sakte hain.
                </div>
              ) : (
                admins.map((admin) => (
                  <div key={admin._id || admin.email} className="flex items-center gap-3.5 px-5 py-4 hover:bg-slate-50/50 dark:hover:bg-navy-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-800 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-navy-950 dark:text-white truncate">
                          {admin.name ? `${admin.name} (${admin.email})` : admin.email}
                        </p>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Active Admin
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {admin.createdAt ? `Added ${new Date(admin.createdAt).toLocaleDateString("en-IN")}` : "Admin"}
                        {admin.addedBy && ` • Added by ${admin.addedBy}`}
                      </p>
                    </div>
                    {isSuperAdmin && (
                      <button
                        type="button"
                        onClick={() => removeAdmin(admin.email)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                        title={`Remove ${admin.email}`}
                      >
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
