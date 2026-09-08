import { Target, Waves, Thermometer, Droplets, Heart, Dumbbell, Stethoscope, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "./ScrollReveal"

const treatments = [
  {
    icon: Thermometer,
    badge: "Pain & Tissue Healing",
    title: "Electrotherapy – IFT, TENS & Ultrasound",
    description:
      "Advanced electrotherapy modalities for pain relief, inflammation reduction, and accelerated tissue healing. Safe, drug-free treatment for chronic back pain, joint pain, and muscle spasms.",
  },
  {
    icon: Heart,
    badge: "Hands-on Therapy",
    title: "Manual Therapy & Joint Mobilization",
    description:
      "Hands-on techniques including soft tissue massage, myofascial release, and joint mobilization to restore range of motion, reduce stiffness, and improve circulation.",
  },
  {
    icon: Target,
    badge: "Deep Knot Release",
    title: "Dry Needling & Trigger Point Therapy",
    description:
      "Precise dry needling to release muscle knots, relieve chronic tension, and improve blood flow. Highly effective for neck pain, shoulder tightness, and lower back pain.",
  },
  {
    icon: Droplets,
    badge: "Circulation Recovery",
    title: "Cupping Therapy",
    description:
      "Traditional suction therapy to enhance blood circulation, release deep muscle tension, and promote detoxification. Excellent for sports recovery and chronic pain management.",
  },
  {
    icon: Waves,
    badge: "Low-Impact Rehabilitation",
    title: "Hydrotherapy & Aquatic Rehabilitation",
    description:
      "Low-impact water-based exercises that reduce joint stress while building strength, flexibility, and endurance. Ideal for arthritis, post-surgery recovery, and elderly patients.",
  },
  {
    icon: Dumbbell,
    badge: "Active Function Rebuilding",
    title: "Therapeutic Exercise & Functional Training",
    description:
      "Custom-designed exercise programs targeting strength, balance, coordination, and functional movement. Progress tracking to ensure measurable improvements every week.",
  },
]

export default function Treatments() {
  return (
    <section id="treatments" className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900/60 transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent dark:via-accent-600/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300 border border-accent-200/70 dark:border-accent-800/60 mb-3 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5" />
              Advanced Treatment Modalities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Evidence-Based <span className="text-gradient">Therapeutic Techniques</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              We combine modern electrotherapy equipment with proven manual techniques for
              faster pain relief, functional restoration, and lasting recovery.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="group bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200/90 dark:border-navy-700 hover:border-accent-400 dark:hover:border-accent-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/40 dark:to-brand-900/40 rounded-xl flex items-center justify-center text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2.5 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-navy-700/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Doctor Prescribed
                  </span>
                  <Link
                    href="/book-appointment"
                    className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
