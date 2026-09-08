import { Phone, MessageSquare, MapPin, Clock, Mail, ShieldCheck, Stethoscope, CalendarCheck } from "lucide-react"
import ScrollReveal from "./ScrollReveal"
import BookingFormEnhanced from "./BookingFormEnhanced"

export default function Appointment() {
  return (
    <section id="contact" className="relative py-16 md:py-24 bg-slate-50 dark:bg-navy-950 overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-bl from-brand-100/20 to-accent-100/10 rounded-full blur-3xl -z-10 dark:from-brand-900/20 dark:to-accent-900/10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-tr from-accent-100/20 to-brand-100/10 rounded-full blur-3xl -z-10 dark:from-accent-900/20 dark:to-brand-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
              <CalendarCheck className="w-3.5 h-3.5" />
              Doctor Consultation &amp; Scheduling
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight">
              Start Your Recovery{" "}
              <span className="text-gradient">Journey Today</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Book a consultation with Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur.
              We&apos;ll confirm your appointment within 1 hour.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BookingFormEnhanced />
          </div>

          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
            <ScrollReveal>
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/40 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Immediate Assistance</p>
                    <a href="tel:+919616962072" className="text-lg font-black text-red-600 dark:text-red-400 hover:underline">+91 9616962072</a>
                  </div>
                </div>
                <a href="tel:+919616962072"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Phone className="w-4 h-4" />Direct Doctor Helpline
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/40 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Instant Chat</p>
                    <p className="text-sm font-bold text-navy-900 dark:text-white">Consult via WhatsApp</p>
                  </div>
                </div>
                <a href="https://wa.me/919616962072?text=Hello%20Dr.%20Devejya%2C%20I%20want%20to%20book%20a%20neuro%20rehabilitation%20consultation"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <MessageSquare className="w-4 h-4" />WhatsApp Doctor Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-navy-900 dark:via-navy-900 dark:to-navy-850 rounded-2xl p-6 border border-brand-200/80 dark:border-navy-700 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 dark:text-white">Home Visit Physiotherapy</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      For bedridden, post-stroke, or mobility-restricted patients across Gorakhpur.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-slate-200 dark:border-navy-800 shadow-lg space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">Clinic Address</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mt-0.5">
                      <strong>Divyaman Hospital</strong><br />
                      Bargadwa Bypass Road, Raptinagar Phase 1<br />
                      Gorakhpur, Uttar Pradesh — 273001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                  <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">Clinic Hours</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mt-0.5">
                      Mon – Sat: 10:00 AM – 8:00 PM<br />
                      Sunday: Closed (Emergency on call)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100 dark:border-navy-800">
                  <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">Email</p>
                    <a href="mailto:gorakhpurmissionrehab@gmail.com" className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline break-all">
                      gorakhpurmissionrehab@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-2 lg:col-span-1">
              <div className="relative rounded-2xl h-44 md:h-56 lg:h-64 border border-slate-200 dark:border-navy-800 shadow-lg overflow-hidden">
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
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
