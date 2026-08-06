"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

interface Review {
  name: string
  content: string
  rating: number
}

function getTruncated(text: string, max = 200): { display: string; needsTruncation: boolean } {
  if (text.length <= max) return { display: text, needsTruncation: false }
  const truncated = text.slice(0, max)
  const lastSpace = truncated.lastIndexOf(" ")
  return { display: text.slice(0, lastSpace > 0 ? lastSpace : max) + "...", needsTruncation: true }
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => { if (data.reviews) setReviews(data.reviews) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function toggleExpand(idx: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews.length > 1 ? "5.0" : "5.0",
      reviewCount: reviews.length || 1,
      bestRating: "5",
    },
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              Patient Success
            </span>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Real Stories of{" "}
              <span className="text-gradient">Recovery &amp; Hope</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Every journey is unique. Here are real Google reviews from patients who
              recovered at our neuro rehab center in Gorakhpur.
            </p>
            <a
              href="https://maps.google.com/?cid=6359659575143684042"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:underline mt-2"
            >
              View all reviews on Google <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.slice(0, 6).map((item, idx) => {
              const isExpanded = expanded.has(idx)
              const { display, needsTruncation } = isExpanded
                ? { display: item.content, needsTruncation: false }
                : getTruncated(item.content)

              return (
                <ScrollReveal key={item.name + idx}>
                  <article className="group relative bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-navy-700 hover:border-brand-200 dark:hover:border-brand-600 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-100/30 dark:hover:shadow-black/20 hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Quote className="w-8 h-8 text-brand-200 dark:text-brand-700 absolute top-4 right-4" aria-hidden="true" />
                    <div className="flex gap-1 mb-4 relative" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                          style={{ transitionDelay: `${i * 50}ms` }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => needsTruncation && toggleExpand(idx)}
                      onMouseEnter={() => needsTruncation && toggleExpand(idx)}
                      onMouseLeave={() => isExpanded && needsTruncation && toggleExpand(idx)}
                    >
                      <blockquote className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-2 relative z-10">
                        &ldquo;{display}&rdquo;
                      </blockquote>
                      {needsTruncation && (
                        <div className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-medium relative z-10">
                          {isExpanded ? (
                            <><ChevronUp className="w-3 h-3" /> Show less</>
                          ) : (
                            <><ChevronDown className="w-3 h-3" /> Read more</>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-slate-200 dark:border-navy-700 pt-3 relative z-10">
                      <p className="font-semibold text-navy-800 dark:text-white text-sm">{item.name}</p>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
