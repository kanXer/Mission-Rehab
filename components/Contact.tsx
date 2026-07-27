'use client'

import { useState, type FormEvent } from "react"
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  PhoneCall,
  Calendar,
  CheckCircle,
} from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const conditions = [
  "Back / Neck Pain",
  "Knee / Joint Pain",
  "Sports Injury",
  "Stroke / Paralysis",
  "Post-Surgical Rehab",
  "Arthritis",
  "Shoulder Pain",
  "Other",
]

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    condition: "",
    date: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: "", phone: "", condition: "", date: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              Book Your Appointment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Start Your Recovery{" "}
              <span className="text-gradient">Today</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Take the first step toward a pain-free life. Schedule a free consultation with
              the best physiotherapists in Gorakhpur.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ScrollReveal>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/50">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                  Free Appointment Request
                </h3>

                {submitted && (
                  <div className="mb-6 flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 text-brand-800 dark:text-brand-300 text-sm font-medium px-4 py-3 rounded-xl border border-brand-200 dark:border-brand-700/30">
                    <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                    Request submitted! We&apos;ll call you within 30 minutes to confirm your appointment.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <select
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select Your Pain / Condition</option>
                    {conditions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand-600/20"
                  >
                    <Send className="w-4 h-4" />
                    Book Free Consultation
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Call for Appointment
                    </p>
                    <a
                      href="tel:+919616962072"
                      className="text-lg font-bold text-red-600 dark:text-red-400 hover:text-red-700 transition-colors"
                    >
                      +91 9616962072
                    </a>
                  </div>
                </div>
                <a
                  href="tel:+919616962072"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-red-600/20"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/30 dark:to-brand-900/30 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Chat on WhatsApp
                    </p>
                    <p className="text-xs text-slate-500">Quick response within minutes</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919616962072?text=Hello%2C%20I%20need%20physiotherapy%20help%20in%20Gorakhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-brand-600 hover:from-accent-700 hover:to-brand-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-accent-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Gorakhpur, Uttar Pradesh
                      <br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Clinic Hours
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Mon – Sat: 8:00 AM – 8:00 PM
                      <br />
                      Sunday: 9:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Home Physiotherapy
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Available across Gorakhpur
                      <br />
                      Prior booking required
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-slate-100 dark:bg-slate-800/30 rounded-2xl h-48 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm overflow-hidden">
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">Google Map Location</p>
                  <p className="text-xs">Gorakhpur, Uttar Pradesh</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
