'use client'

import { useState, type FormEvent } from "react"
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  PhoneCall,
  CheckCircle2,
  Loader2,
  Mail,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  User,
  FileText,
  AlertCircle,
} from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const subjects = [
  "General Inquiry",
  "Treatment & Packages",
  "Home Visit Availability",
  "Pricing & Doctor Fees",
  "Doctor Consultation",
  "Feedback & Support",
  "Other",
]

export default function Contact() {
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  })
  const [enquiryLoading, setEnquiryLoading] = useState(false)
  const [enquirySubmitted, setEnquirySubmitted] = useState(false)
  const [enquiryError, setEnquiryError] = useState("")

  const handleEnquirySubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnquiryLoading(true)
    setEnquiryError("")
    setEnquirySubmitted(false)

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryForm),
      })
      const data = await res.json()

      if (!res.ok) {
        setEnquiryError(data.error || "Failed to submit enquiry. Please try again.")
        return
      }

      setEnquirySubmitted(true)
      setEnquiryForm({
        name: "",
        phone: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      })
    } catch {
      setEnquiryError("Network error. Please check your internet connection and try again.")
    } finally {
      setEnquiryLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-12 md:py-20 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300 border border-accent-200/60 dark:border-accent-800/60 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Support &amp; Enquiries
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Have Questions? Send Us an <span className="text-gradient">Enquiry</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Ask about physiotherapy treatments, home visits, doctor fees, or rehabilitation packages
              for stroke recovery, paralysis, and neurological conditions. We usually respond within 1–2 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Enquiry Form Card */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-accent-500 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-accent-500/20">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Enquiry Form
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Fill in details &amp; our medical team will reach out to you.
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Fast Response
                  </span>
                </div>

                {enquirySubmitted ? (
                  <div className="py-10 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Enquiry Received!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto mb-6">
                      Thank you for contacting Gorakhpur Mission Rehab. Our team is reviewing your message and will call or email you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnquirySubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-5">
                    {enquiryError && (
                      <div className="bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-sm font-medium p-4 rounded-2xl border border-red-200 dark:border-red-800">
                        {enquiryError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Kumar"
                            value={enquiryForm.name}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 9876543210"
                            value={enquiryForm.phone}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={enquiryForm.email}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Enquiry Subject
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select
                            value={enquiryForm.subject}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                            className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white dark:focus:bg-slate-800 transition-all appearance-none"
                          >
                            {subjects.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Message / Question <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <textarea
                          rows={4}
                          required
                          placeholder="Please describe your health query, condition, or question in detail..."
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={enquiryLoading}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-accent-600 via-brand-600 to-accent-600 hover:from-accent-700 hover:to-brand-700 text-white font-bold text-sm px-6 py-4 rounded-2xl shadow-xl shadow-accent-600/20 dark:shadow-accent-600/10 hover:shadow-2xl transition-all duration-200 active:scale-[0.99] disabled:opacity-60"
                      >
                        {enquiryLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting Enquiry...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit General Enquiry
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center pt-1">
                      🔒 Your personal details are kept strictly confidential under doctor patient ethics.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Sidebar Details */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Contact Box */}
            <ScrollReveal>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-red-500" />
                  Urgent Consultation &amp; Help
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prefer direct phone call or WhatsApp? Contact Dr. Devejya Srivastava&apos;s clinic immediately.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href="tel:+919616962072"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-xs px-4 py-3 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4" />
                    Call +91 9616962072
                  </a>
                  <a
                    href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20have%20an%20enquiry%20regarding%20physiotherapy%20treatment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-xs px-4 py-3 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Home Visit Card */}
            <ScrollReveal>
              <div className="bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/90 rounded-3xl p-6 border border-brand-200/60 dark:border-slate-800 shadow-lg">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-brand-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Home Visit Physiotherapy
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Unable to travel to clinic? Doctor visits patient at home in Gorakhpur for
                      stroke, paralysis, &amp; neuro rehabilitation. Paralysis physio treatment at home available.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Clinic Info Box */}
            <ScrollReveal>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Clinic Location</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Divyaman Hospital</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, UP — 273001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Working Hours</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      <strong>Mon – Sat:</strong> 8:00 AM – 8:00 PM
                      <br />
                      <strong>Sunday:</strong> 9:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Official Email</p>
                    <a href="mailto:gorakhpurmissionrehab@gmail.com" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline break-all">
                      gorakhpurmissionrehab@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Map Embed */}
            <ScrollReveal>
              <div className="relative rounded-3xl h-48 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113963.35917819124!2d83.23025733232495!3d26.796823625280354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145e5c7df2057%3A0x58420cb04cd9d7ca!2sDr%20Devejya%20Srivastava%20Physiotherapist!5e0!3m2!1sen!2sin!4v1784874699996!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gorakhpur Mission Rehab — Map Location"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
