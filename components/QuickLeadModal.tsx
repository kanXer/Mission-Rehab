'use client'

import { useState, useEffect, type FormEvent } from "react"
import { Phone, User, Stethoscope, Clock, X, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react"
import { useAuth } from "./AuthProvider"
import { useToast } from "./ToastProvider"

const conditions = [
  "Stroke / Paralysis Recovery",
  "Spinal Cord Injury",
  "Gait & Balance Disorder",
  "Back / Neck Pain",
  "Pediatric Neuro Condition",
  "Post-Surgical Rehab",
  "General Neuro / Other",
]

interface QuickLeadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickLeadModal({ isOpen, onClose }: QuickLeadModalProps) {
  const { user, getIdToken } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [condition, setCondition] = useState(conditions[0])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return
    if (user.name) setName(user.name)
    async function loadSavedProfile() {
      try {
        const token = await getIdToken()
        if (token) {
          const res = await fetch("/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await res.json()
          if (data?.profile) {
            if (data.profile.name) setName(data.profile.name)
            if (data.profile.phone) setPhone(data.profile.phone)
            if (data.profile.condition) setCondition(data.profile.condition)
          }
        }
      } catch {
        // quiet fallback
      }
    }
    loadSavedProfile()
  }, [user, getIdToken])

  if (!isOpen) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    const cleanPhone = phone.trim().replace(/\D/g, "")
    if (!name.trim()) {
      setError("Please enter your name")
      return
    }
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          email: user?.email || "patient-direct@lead.local",
          subject: "⚡ Urgent 15-Min Callback Request",
          message: `URGENT LEAD (Conversion Dock): Patient requested a doctor call back within 15 mins. Condition: ${condition}. Phone: ${cleanPhone}`,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to submit request")

      setSubmitted(true)
      toast("Callback requested! Our doctor's team is notified.")
    } catch (err: any) {
      setError(err.message || "Failed to request callback. Please call directly at +91 9616962072.")
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setSubmitted(false)
    setError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-navy-700 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header */}
        <div className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Fast Doctor Response</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">Request Doctor Callback</h3>
          <p className="text-xs text-white/80 mt-1">
            Dr. Devejya Srivastava&apos;s team at Divyaman Hospital will call you in under 15 minutes.
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy-900 dark:text-white">Callback Request Confirmed!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Thank you, <strong className="text-brand-600">{name}</strong>. Our clinical team has received your priority alert and will call <strong className="text-navy-900 dark:text-white">{phone}</strong> shortly.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919616962072?text=Hi%20Doctor%2C%20I%20just%20requested%20a%20callback%20for%20${encodeURIComponent(name)}%20regarding%20${encodeURIComponent(condition)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-navy-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800/80 text-sm text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800/80 text-sm text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Doctor will call on this number directly.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Condition / Health Concern
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800/80 text-sm text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none cursor-pointer"
                  >
                    {conditions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-sm shadow-lg shadow-brand-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 text-amber-300" />
                      <span>Get 15-Minute Doctor Callback</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-800 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  100% Free &amp; Confidential
                </span>
                <a href="tel:+919616962072" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
                  Or Call +91 9616962072
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
