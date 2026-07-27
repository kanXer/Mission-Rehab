import type { Metadata } from "next"
import { Phone, MessageSquare, MapPin, Clock, Activity, Mail, ShieldCheck } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import BookingFormEnhanced from "@/components/BookingFormEnhanced"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-20 bg-slate-50 dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">Get In Touch</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Contact{" "}
                  <span className="text-gradient">Us</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                  Book a consultation with Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. We&apos;ll confirm your appointment within 1 hour.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <BookingFormEnhanced />
              </div>

              <div className="space-y-5">
                <ScrollReveal>
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg">
                    <h3 className="font-bold text-navy-800 dark:text-white mb-3 text-sm uppercase tracking-wide">
                      Quick Contact
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="tel:+919616962072"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Call +91 9616962072
                      </a>
                      <a
                        href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20want%20to%20book%20a%20consultation"
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-brand-600 text-white font-semibold text-sm px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Now
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg">
                    <h3 className="font-bold text-navy-800 dark:text-white mb-3 text-sm uppercase tracking-wide">
                      How It Works
                    </h3>
                    <ol className="space-y-3">
                      {[
                        "Pick a date from the calendar",
                        "Choose your preferred time slot",
                        "Fill in your details & condition",
                        "Review & confirm your booking",
                        "Get confirmation within 1 hour",
                      ].map((step, i) => (
                        <li key={step} className="flex items-start gap-3 text-sm">
                          <span className="w-6 h-6 bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-900/40 dark:to-accent-900/40 rounded-full flex items-center justify-center text-xs font-bold text-brand-700 dark:text-brand-300 shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 rounded-2xl p-6 border border-brand-100 dark:border-brand-800 shadow-lg">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-navy-800 dark:text-white">Home Visit Available</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Can&apos;t travel? Physiotherapy at your home in Gorakhpur.</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-navy-800 dark:text-white">Address</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Divyaman Hospital, Bargadwa Bypass Road<br />Raptinagar Phase 1, Gorakhpur, UP — 273001</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-navy-800 dark:text-white">Hours</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Mon – Sat: 10:00 AM – 8:00 PM<br />Sunday: Closed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-navy-800 dark:text-white">Email</p>
                        <a href="mailto:gorakhpurmissionrehab@gmail.com" className="text-sm text-brand-600 dark:text-brand-400 hover:underline break-all">gorakhpurmissionrehab@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="relative rounded-2xl h-44 md:h-56 lg:h-64 border border-slate-200 dark:border-navy-700 shadow-lg overflow-hidden">
                    <iframe
                      src="https://maps.google.com/maps?q=Divyaman+Hospital+Gorakhpur&output=embed"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Divyaman Hospital, Gorakhpur — Location"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
