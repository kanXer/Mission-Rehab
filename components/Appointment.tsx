import { Phone, MessageSquare, MapPin, Clock, Mail, ShieldCheck, IndianRupee } from "lucide-react"
import ScrollReveal from "./ScrollReveal"
import BookingFormEnhanced from "./BookingFormEnhanced"

export default function Appointment() {
  return (
    <section id="contact" className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-900 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/20 to-accent-100/10 rounded-full blur-3xl -z-10 dark:from-brand-900/20 dark:to-accent-900/10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-accent-100/20 to-brand-100/10 rounded-full blur-3xl -z-10 dark:from-accent-900/20 dark:to-brand-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
              Book Appointment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Start Your Recovery{" "}
              <span className="text-gradient">Journey Today</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Book a consultation with Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur —
              the trusted choice for stroke rehabilitation, paralysis treatment, and
              home visit physiotherapy near you. We&apos;ll confirm your appointment within 1 hour.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BookingFormEnhanced />
          </div>

          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
            <ScrollReveal>
              <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/40 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Call for Appointment</p>
                    <a href="tel:+919616962072" className="text-lg font-bold text-red-600 dark:text-red-400 hover:text-red-700">+91 9616962072</a>
                  </div>
                </div>
                <a href="tel:+919616962072"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  <Phone className="w-4 h-4" />Call Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/40 dark:to-brand-900/40 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Chat on WhatsApp</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Quick response within minutes</p>
                  </div>
                </div>
                <a href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20want%20to%20book%20a%20neuro%20rehabilitation%20consultation"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  <MessageSquare className="w-4 h-4" />WhatsApp Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/30 rounded-2xl p-6 border border-brand-100 dark:border-brand-800 shadow-lg">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-navy-800 dark:text-white">Home Visit Available</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Can&apos;t travel? Physiotherapy at your home in Gorakhpur.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gradient-to-r from-brand-600 to-accent-600 rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">Consultation / Session Fee</p>
                    <p className="text-2xl font-extrabold">
                      ₹{process.env.NEXT_PUBLIC_SESSION_PRICE || "500-600"}
                      <span className="text-xs font-medium text-white/70 ml-1">/ session</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/75">Charges depend on your condition and therapy plan. Call us for a personalised quote.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-lg space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Clinic Address</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Divyaman Hospital<br />
                      Bargadwa Bypass Road, Raptinagar Phase 1<br />
                      Gorakhpur, Uttar Pradesh — 273001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Clinic Hours</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Mon – Sat: 10:00 AM – 8:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800 dark:text-white">Email</p>
                    <a href="mailto:gorakhpurmissionrehab@gmail.com" className="text-sm text-brand-600 dark:text-brand-400 hover:underline break-all">
                      gorakhpurmissionrehab@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-2 lg:col-span-1">
              <div className="relative rounded-2xl h-44 md:h-56 lg:h-64 border border-slate-200 dark:border-navy-700 shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113963.35917819124!2d83.23025733232495!3d26.796823625280354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145e5c7df2057%3A0x58420cb04cd9d7ca!2sDr%20Devejya%20Srivastava%20Physiotherapist!5e0!3m2!1sen!2sin!4v1784874699996!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Divyaman Hospital, Gorakhpur — Location"
                />
              </div>
              {/* https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113963.35917819124!2d83.23025733232495!3d26.796823625280354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145e5c7df2057%3A0x58420cb04cd9d7ca!2sDr%20Devejya%20Srivastava%20Physiotherapist!5e0!3m2!1sen!2sin!4v1784874699996!5m2!1sen!2sin*/}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
