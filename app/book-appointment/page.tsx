import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Phone, MessageSquare, ShieldCheck } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import BookingFormEnhanced from "@/components/BookingFormEnhanced"

export const metadata: Metadata = {
  title: "Book Appointment — Neuro Rehab Consultation | Gorakhpur Mission Rehab",
  description:
    "Book an appointment with Dr. Devejya Srivastava (PT) at Divyaman Hospital, Gorakhpur. Choose your preferred date and time for neuro rehabilitation, stroke recovery, gait training, or pediatric physiotherapy. Online booking with instant confirmation.",
  keywords: [
    "book appointment Gorakhpur",
    "neuro rehab consultation",
    "physiotherapy appointment online",
    "Dr. Devejya Srivastava booking",
    "physiotherapy consultation Gorakhpur",
    "stroke recovery appointment",
    "gait training booking",
    "pediatric neuro physiotherapy appointment",
    "Divyaman Hospital appointment",
    "book physiotherapist online",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Book Appointment — Consultation | Gorakhpur Mission Rehab",
    description:
      "Book a neuro rehabilitation consultation with Dr. Devejya Srivastava in Gorakhpur. Online booking with date & time selection. Confirmation within 24 hours.",
    type: "website",
    locale: "en_IN",
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://gorakhpurmissionrehab.com" },
    { "@type": "ListItem", position: 2, name: "Book Appointment", item: "https://gorakhpurmissionrehab.com/book-appointment" },
  ],
}

export default function BookAppointmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-16 bg-slate-50 dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                  <div className="text-center mb-10">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
                      Book Appointment
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-800 dark:text-white mb-4">
                      Book Your{" "}
                      <span className="text-gradient">Appointment</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                      Select your preferred date and time. Dr. Devejya Srivastava&apos;s team
                      will confirm your appointment within 1 hour.
                    </p>
                  </div>
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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
