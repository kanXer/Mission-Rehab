'use client'

import { useState, useEffect, useMemo } from "react"
import { ChevronDown, HelpCircle, Phone, MessageSquare, Search } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

interface Faq {
  q: string
  a: string
  category: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => { if (data.faqs) setFaqs(data.faqs) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs])

  const filtered = faqs.filter((faq) => {
    const matchesSearch = search === "" ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === null || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-20 bg-white dark:bg-navy-900 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent dark:via-accent-700/40" />
          <div className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-2xl -z-10" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-tl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-2xl -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-3">FAQ</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Frequently Asked{" "}
                  <span className="text-gradient">Questions</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">Everything you need to know about neuro-rehabilitation at Gorakhpur Mission Rehab</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                   className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm dark:shadow-sm dark:shadow-black/10"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                    activeCategory === null
                       ? "bg-brand-600 dark:bg-brand-500 text-white shadow-md dark:shadow-md dark:shadow-black/10"
                       : "bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                      activeCategory === cat
                        ? "bg-brand-600 dark:bg-brand-500 text-white shadow-md dark:shadow-md dark:shadow-black/10"
                        : "bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 dark:border-t-brand-400 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700">
                    <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No matching questions found</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Try a different search term or category</p>
                  </div>
                )}
                {filtered.map((faq, index) => (
                  <ScrollReveal key={index}>
                    <div
                      className={`relative rounded-xl transition-all duration-300 ${
                        openIndex === index
                          ? "bg-white dark:bg-navy-800 border border-brand-200 dark:border-brand-800 shadow-lg dark:shadow-lg dark:shadow-black/10 shadow-brand-100/20 dark:shadow-brand-900/20"
                          : "bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 hover:border-brand-200 dark:hover:border-brand-800"
                      }`}
                    >
                      {openIndex === index && (
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-400/10 dark:from-brand-600/10 via-accent-400/10 dark:via-accent-600/10 to-brand-400/10 dark:to-brand-600/10 rounded-xl opacity-50 pointer-events-none" />
                      )}
                      <div className="flex items-center gap-2 px-5 pt-3 pb-0">
                        <span className="text-[10px] font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">{faq.category}</span>
                      </div>
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between px-5 py-3 text-left relative z-10"
                        aria-expanded={openIndex === index}
                      >
                        <span className="text-sm font-semibold text-navy-800 dark:text-white pr-4 flex items-center gap-2" itemProp="name">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                            openIndex === index ? "rotate-180 text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === index ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            <ScrollReveal>
              <div className="text-center mt-12 bg-gradient-to-r from-navy-800 to-navy-700 rounded-3xl p-8 shadow-2xl dark:shadow-2xl dark:shadow-black/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Still Have Questions?</h2>
                <p className="text-slate-300 dark:text-slate-600 text-sm mb-5">We&apos;re here to help. Reach out to Dr. Devejya directly.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+919616962072" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105">
                    <Phone className="w-4 h-4" /> Call +91 9616962072
                  </a>
                  <a href="https://wa.me/919616962072" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-navy-800 text-navy-800 dark:text-white font-semibold px-5 py-2.5 rounded-full shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all hover:scale-105">
                    <MessageSquare className="w-4 h-4 text-accent-600 dark:text-accent-400" /> WhatsApp Now
                  </a>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/20 dark:bg-white/10 text-white font-semibold px-5 py-2.5 rounded-full border border-white/30 dark:border-white/20 hover:bg-white/30 transition-all">
                    Contact Us
                  </Link>
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
