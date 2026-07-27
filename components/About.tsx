import Image from "next/image"
import { BookOpen, Brain, UserCheck, Star, MapPin, Award, Phone, Quote, Sparkles, Linkedin } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const concepts = [
  {
    icon: Brain,
    title: "Neuroplasticity-Based Recovery",
    desc: "The brain can rewire itself after stroke, brain injury, or paralysis. Our therapy uses task-specific training and cognitive challenge to forge new neural pathways — not just passive exercises. This is the core of our brain retraining therapy in Gorakhpur.",
  },
  {
    icon: UserCheck,
    title: "Task-Specific Gait & Balance Training",
    desc: "Recovery isn't about static standing. We train real-world movements — walking, reaching, balancing — to rebuild functional independence. Our fall prevention therapy and gait correction program helps Parkinson's and elderly patients regain confidence.",
  },
  {
    icon: BookOpen,
    title: "Research-Backed Neuro Rehab Protocols",
    desc: "Every protocol is grounded in the latest neuro-rehabilitation research. We measure progress with objective gait analysis and mobility assessments. From post-stroke physiotherapy to spinal cord rehab — every plan is evidence-based and personalized.",
  },
]

export default function About() {
  return (
    <section id="recovery" className="relative py-16 md:py-24 bg-white dark:bg-navy-900 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent dark:via-accent-700/40" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-bl from-brand-100/30 to-accent-100/20 rounded-full blur-3xl -z-10 dark:from-brand-900/30 dark:to-accent-900/20" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-100/20 to-brand-100/20 rounded-full blur-3xl -z-10 dark:from-accent-900/20 dark:to-brand-900/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-3">
              Science of Recovery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Why Science-Backed Rehab{" "}
              <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              True neuro-recovery requires brain challenge, repetition, and the right
              therapeutic approach — not just passive modalities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {concepts.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="group relative text-center p-6">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-transparent to-accent-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 dark:from-brand-900/30 dark:to-accent-900/20" />
                <div className="w-14 h-14 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/30 dark:to-brand-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent-200/50 dark:group-hover:shadow-accent-800/50">
                  <item.icon className="w-7 h-7 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-lg font-bold text-navy-800 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div id="about" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 via-accent-400 to-brand-400 rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-700 dark:from-brand-600 dark:via-accent-600 dark:to-brand-600" />
            <div className="relative bg-gradient-to-br from-navy-800 via-navy-800 to-navy-700 dark:from-navy-700 dark:via-navy-700 dark:to-navy-600 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl dark:shadow-2xl dark:shadow-black/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-full dark:from-brand-600/10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full dark:from-accent-600/10" />

              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 relative z-10">
                <div className="relative shrink-0">
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-brand-400/30 to-accent-400/20 rounded-full blur-xl dark:from-brand-600/30 dark:to-accent-600/20" />
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 ring-2 ring-white/10 dark:border-navy-600 dark:ring-navy-600">
<Image
                    src="/doctor.jpg"
                    alt="Dr. Devejya Srivastava (PT) — Consultant Neuro Rehab Physiotherapist"
                    fill
                    className="object-cover object-top"
                    sizes="128px"
                    loading="lazy"
                  />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                    <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-400 dark:text-brand-300" />
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-300 dark:text-brand-200">
                      Consultant Neuro Rehab Physiotherapist
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-1">
                    Dr. Devejya Srivastava (PT)
                  </h3>
                  <p className="text-slate-300 dark:text-slate-200 text-xs md:text-sm mb-3">
                    Specialized Neuro Rehabilitation | Divyaman Hospital, Gorakhpur
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] md:text-xs text-slate-400 dark:text-slate-300 justify-center md:justify-start">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-400 fill-yellow-400" />
                      10+ Years
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-400 dark:text-brand-300" />
                      Gorakhpur, UP
                    </span>
                    <span className="flex items-center gap-1">
                      <Quote className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-400 dark:text-brand-300" />
                      500+ Patients
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:+919616962072"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-semibold text-xs md:text-sm px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg dark:shadow-black/20 transition-all hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Consult Dr. Devejya
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dr-devejya-srivastava-784035143/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </a>
                  <a
                    href="https://www.justdial.com/Gorakhpur/Dr-Devejya-Srivastava-Physiotherapist-Rapti-Nagar/9999PX551-X551-211020214837-H6K4_BZDET/overview?source=SHARE&amp=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 text-white text-[10px] md:text-xs font-bold"
                    aria-label="JustDial"
                  >
                    JD
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong className="text-navy-800 dark:text-white">Gorakhpur Mission Rehab</strong> — 
              Directed by <strong className="text-navy-800 dark:text-white">Dr. Devejya Srivastava (PT)</strong>, 
              we are a specialized <strong className="text-navy-800 dark:text-white">neuro rehabilitation center in Gorakhpur </strong> 
              located at <strong className="text-navy-800 dark:text-white">Divyaman Hospital, Bargadwa Bypass, Raptinagar Phase 1</strong>. 
              We serve patients from across <strong className="text-navy-800 dark:text-white">Gorakhpur, Deoria, Kushinagar, Maharajganj, and Basti </strong> 
              seeking <strong className="text-navy-800 dark:text-white">affordable physiotherapy</strong> for stroke recovery, 
              paralysis treatment, spinal cord injury rehab, pediatric neuro care, gait training, 
              and fall prevention. <strong className="text-navy-800 dark:text-white">Home visit physiotherapy</strong> also available 
              across Gorakhpur for patients with limited mobility. 
              <strong className="text-navy-800 dark:text-white">Book an appointment</strong> with the 
              <strong className="text-navy-800 dark:text-white"> best physiotherapist near you</strong> in Gorakhpur today.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
