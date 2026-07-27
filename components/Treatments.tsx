import { Sparkles, Waves, Thermometer, Droplets, Heart, Dumbbell } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const treatments = [
  {
    icon: Thermometer,
    title: "Electrotherapy – IFT, TENS & Ultrasound",
    description:
      "Advanced electrotherapy modalities for pain relief, inflammation reduction, and accelerated tissue healing. Safe, drug-free treatment for chronic back pain, joint pain, and muscle spasms.",
  },
  {
    icon: Heart,
    title: "Manual Therapy & Joint Mobilization",
    description:
      "Hands-on techniques including soft tissue massage, myofascial release, and joint mobilization to restore range of motion, reduce stiffness, and improve circulation.",
  },
  {
    icon: Sparkles,
    title: "Dry Needling & Trigger Point Therapy",
    description:
      "Precise dry needling to release muscle knots, relieve chronic tension, and improve blood flow. Highly effective for neck pain, shoulder tightness, and lower back pain.",
  },
  {
    icon: Droplets,
    title: "Cupping Therapy",
    description:
      "Traditional suction therapy to enhance blood circulation, release deep muscle tension, and promote detoxification. Excellent for sports recovery and chronic pain management.",
  },
  {
    icon: Waves,
    title: "Hydrotherapy & Aquatic Rehabilitation",
    description:
      "Low-impact water-based exercises that reduce joint stress while building strength, flexibility, and endurance. Ideal for arthritis, post-surgery recovery, and elderly patients.",
  },
  {
    icon: Dumbbell,
    title: "Therapeutic Exercise & Functional Training",
    description:
      "Custom-designed exercise programs targeting strength, balance, coordination, and functional movement. Progress tracking to ensure measurable improvements every week.",
  },
]

export default function Treatments() {
  return (
    <section id="treatments" className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-300/40 to-transparent dark:via-accent-600/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-3">
              Our Techniques
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Advanced Treatment{" "}
              <span className="text-gradient">Modalities</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              We combine modern electrotherapy equipment with proven manual techniques for
              faster pain relief and lasting recovery.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item, i) => (
            <ScrollReveal key={item.title}>
              <div className="group bg-white dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 hover:border-accent-300 dark:hover:border-accent-600/50 hover:shadow-2xl hover:shadow-accent-100/20 dark:hover:shadow-accent-900/10 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/30 dark:to-brand-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <item.icon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
