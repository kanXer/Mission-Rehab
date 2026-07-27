import { Bed, UtensilsCrossed, Stethoscope, Sparkles } from "lucide-react"

const facilities = [
  {
    icon: Bed,
    title: "AC & Non-AC Rooms",
    description:
      "Comfortable, private and shared accommodation options with modern amenities for a peaceful stay.",
  },
  {
    icon: UtensilsCrossed,
    title: "Nutritious & Balanced Diet",
    description:
      "Personalized meal plans prepared under hygienic conditions to support physical recovery and overall health.",
  },
  {
    icon: Stethoscope,
    title: "24/7 Medical Staff",
    description:
      "Qualified nurses and medical attendants available around the clock for emergency and routine care.",
  },
  {
    icon: Sparkles,
    title: "Clean & Hygienic Campus",
    description:
      "Well-maintained premises with strict sanitation protocols to ensure a safe and healthy environment.",
  },
]

export default function Facilities() {
  return (
    <section id="facilities" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Facilities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A supportive environment designed for healing, comfort, and dignity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                <facility.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {facility.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
