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

import { CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react"
import TypewriterText from "./TypewriterText"

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
      ratingValue: "5.0",
      reviewCount: reviews.length || 360,
      bestRating: "5",
    },
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative py-16 md:py-24 bg-white dark:bg-navy-950 overflow-hidden transition-colors"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60 mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Google Rating &bull; 360+ Verified Patient Reviews</span>
            </div>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Patient Recoveries &amp;{" "}
              <TypewriterText
                words={["Clinical Success", "Real Life Stories", "Mobility Regained", "Doctor Reviews"]}
                className="text-gradient"
                cursorColor="text-brand-500"
              />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Every recovery journey is a testament to perseverance, science-backed rehabilitation, and dedicated clinical care.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="https://maps.google.com/?cid=6359659575143684042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-navy-900 px-4 py-2 rounded-xl border border-brand-200 dark:border-navy-700 hover:bg-brand-100 transition-colors"
              >
                <span>Read All Verified Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((item, idx) => {
              const isExpanded = expanded.has(idx)
              const { display, needsTruncation } = isExpanded
                ? { display: item.content, needsTruncation: false }
                : getTruncated(item.content, 220)

              return (
                <ScrollReveal key={item.name + idx}>
                  <article className="group relative bg-slate-50 dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Verified Patient
                        </span>
                      </div>

                      <div
                        className="relative cursor-pointer"
                        onClick={() => needsTruncation && toggleExpand(idx)}
                      >
                        <blockquote className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                          &ldquo;{display}&rdquo;
                        </blockquote>
                        {needsTruncation && (
                          <div className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-bold mb-2">
                            {isExpanded ? (
                              <><ChevronUp className="w-3 h-3" /> Read less</>
                            ) : (
                              <><ChevronDown className="w-3 h-3" /> Read full review</>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200/80 dark:border-navy-800 pt-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">{item.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Google Reviewer</p>
                      </div>
                      <Quote className="w-6 h-6 text-slate-300 dark:text-navy-700" aria-hidden="true" />
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
