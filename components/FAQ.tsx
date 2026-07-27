'use client'

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const faqs = [
  {
    q: "How soon after a stroke should rehabilitation begin?",
    a: "Early intervention is critical. Research shows that the best outcomes occur when rehab starts within 24–48 hours after medical stabilization. At Gorakhpur Mission Rehab, we design phase-appropriate therapy protocols — from bed mobility in the early stage to advanced gait training as recovery progresses. Even months or years after a stroke, neuroplasticity-based therapy can still produce meaningful improvements.",
  },
  {
    q: "Do you offer specialized balance and gait training in Gorakhpur?",
    a: "Yes, gait correction and balance retraining are core specialties of Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. We use task-specific training, perturbation-based balance therapy, and advanced gait analysis to address fall risk, walking asymmetry, and coordination deficits — whether from stroke, Parkinson's, spinal injury, or age-related decline. Home visit options are also available for patients with limited mobility.",
  },
  {
    q: "Where is the neuro rehabilitation clinic located in Gorakhpur?",
    a: "We are located at Divyaman Hospital, Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, Uttar Pradesh — 273001. The center is easily accessible from all parts of Gorakhpur city including Shahpur, Mohaddipur, Golghar, Gorakhnath, and Medical College Road. We also offer home visit physiotherapy services for patients with severe mobility limitations across Gorakhpur.",
  },
  {
    q: "How long does neuro-rehabilitation typically take to show results?",
    a: "Recovery timelines vary based on the condition, severity, and consistency of therapy. Stroke and brain injury patients typically require 6–12 months of structured rehab for significant functional gains, while conditions like gait disorders or plantar fasciitis may show improvement in 8–16 weeks. We provide a personalized timeline and measurable progress benchmarks after the initial assessment. Consistency is key — most patients attend 3–4 sessions per week for optimal results.",
  },
  {
    q: "Do you treat children with developmental delays or cerebral palsy?",
    a: "Yes, pediatric neuro-physiotherapy is one of our core specialties. Dr. Devejya Srivastava provides early intervention therapy for children with developmental delays, cerebral palsy, Down syndrome, and other neurological conditions. We focus on improving motor milestones, balance, coordination, and functional independence through play-based therapy and family-guided exercises.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative py-16 md:py-24 bg-white dark:bg-navy-900 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent" />
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-accent-100/20 to-brand-100/10 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-brand-100/20 to-accent-100/10 rounded-full blur-2xl -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-3">
              FAQ
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Everything you need to know about neuro-rehabilitation at Gorakhpur Mission Rehab
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3" role="list">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index}>
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
