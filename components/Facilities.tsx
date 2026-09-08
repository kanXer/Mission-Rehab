import { Bed, UtensilsCrossed, Stethoscope, Building2, ShieldCheck } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

const facilities = [
  {
    icon: Bed,
    title: "AC & Non-AC Inpatient Rooms",
    description:
      "Comfortable, private and semi-private rehabilitation rooms with modern amenities for patients needing continuous clinical stay.",
  },
  {
    icon: UtensilsCrossed,
    title: "Nutritious & Balanced Diet",
    description:
      "Personalized, physician-guided meal plans prepared under hygienic standards to support physical recovery and neuromuscular health.",
  },
  {
    icon: Stethoscope,
    title: "24/7 Nursing & Medical Staff",
    description:
      "Qualified clinical nurses, physical therapy assistants, and duty attendants available round the clock for routine and urgent care.",
  },
  {
    icon: ShieldCheck,
    title: "Sanitized & Wheelchair-Accessible Campus",
    description:
      "Well-maintained premises at Divyaman Hospital with strict sanitation protocols, elevators, ramps, and spacious rehabilitation halls.",
  },
]

export default function Facilities() {
  return (
    <section id="facilities" className="py-16 md:py-24 bg-white dark:bg-navy-950 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              Hospital Infrastructure • Divyaman Hospital
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Clinical Care &amp; <span className="text-gradient">Inpatient Facilities</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              A comprehensive healthcare environment designed for healing, patient dignity, comfort, and safety.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <ScrollReveal key={facility.title}>
              <div
                className="bg-slate-50 dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/40 dark:to-navy-800 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                    <facility.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200/70 dark:border-navy-800 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NABH &amp; Hospital Standard</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
