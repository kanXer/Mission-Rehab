"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Quote, ChevronRight, Phone, MessageSquare } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

interface Review {
  name: string
  content: string
  rating: number
}

export default function TestimonialsPageClient() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => { if (data.reviews) setReviews(data.reviews) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Gorakhpur Mission Rehab",
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.content,
      reviewRating: { "@type": "Rating", ratingValue: r.rating },
      itemReviewed: { "@type": "MedicalBusiness", name: "Gorakhpur Mission Rehab" },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-20 bg-slate-50 dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">Patient Success</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Real Stories of{" "}
                  <span className="text-gradient">Recovery &amp; Hope</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
                  Every journey is unique. Here are real Google reviews from our patients who regained their independence through dedicated neuro-rehabilitation at Gorakhpur Mission Rehab.
                </p>
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {reviews.map((item, idx) => (
                  <ScrollReveal key={item.name + idx}>
                    <article className="group relative bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:shadow-brand-100/30 dark:hover:shadow-brand-900/30 hover:-translate-y-1 transition-all duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Quote className="w-8 h-8 text-brand-200 dark:text-brand-300 absolute top-4 right-4" aria-hidden="true" />
                      <div className="flex gap-1 mb-3 relative" aria-label={`${item.rating} out of 5 stars`}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                        ))}
                      </div>
                      <blockquote className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-4 relative z-10">
                        &ldquo;{item.content}&rdquo;
                      </blockquote>
                      <div className="border-t border-slate-200 dark:border-navy-700 pt-3 relative z-10">
                        <p className="font-semibold text-navy-800 dark:text-white text-sm">{item.name}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            )}

            <ScrollReveal>
              <div className="text-center bg-gradient-to-r from-brand-600 to-accent-600 rounded-3xl p-10 shadow-2xl dark:shadow-2xl dark:shadow-black/10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Ready to Start Your Recovery Journey?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">Join hundreds of patients who have regained their independence. Book your appointment today.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center justify-center gap-2 bg-white dark:bg-navy-800 text-brand-700 dark:text-brand-300 font-semibold px-6 py-3 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105"
                  >
                    Book Appointment <ChevronRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+919616962072" className="inline-flex items-center justify-center gap-2 bg-white/20 dark:bg-white/10 text-white font-semibold px-6 py-3 rounded-full border border-white/30 dark:border-white/20 hover:bg-white/30 transition-all hover:scale-105">
                    <Phone className="w-4 h-4" /> Call +91 9616962072
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
