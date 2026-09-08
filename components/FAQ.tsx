'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle, ArrowRight, Loader2 } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

interface Faq {
  _id?: string
  q: string
  a: string
  category: string
}

const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
})

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((d) => { if (d.faqs) setFaqs(d.faqs.slice(0, 5)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative py-16 md:py-24 bg-white dark:bg-navy-950 overflow-hidden transition-colors"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 border border-accent-200/70 dark:border-accent-800/60 mb-3 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              Patient &amp; Family Guidance
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              Everything you need to know about neuro-rehabilitation, recovery timelines, and clinic visits at Gorakhpur Mission Rehab.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
          </div>
        ) : (
          <div className="space-y-3" role="list">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq._id ?? index}>
                <div
                  className={`relative rounded-xl transition-all duration-300 ${
                    openIndex === index
                      ? "bg-white dark:bg-navy-800 border border-brand-200 dark:border-brand-700 shadow-lg shadow-brand-100/20 dark:shadow-none"
                      : "bg-slate-50 dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700 hover:border-brand-200 dark:hover:border-brand-600"
                  }`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  {openIndex === index && (
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-400/10 via-accent-400/10 to-brand-400/10 rounded-xl opacity-50 pointer-events-none" />
                  )}
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left relative z-10"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-sm font-semibold text-navy-800 dark:text-slate-100 pr-4 flex items-center gap-2" itemProp="name">
                      <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${
                        openIndex === index ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"
                      }`} />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        openIndex === index
                          ? "rotate-180 text-brand-600 dark:text-brand-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed relative z-10" itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link href="/faq"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-navy-800 text-navy-700 dark:text-slate-200 font-semibold text-sm hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
            View All FAQs
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
