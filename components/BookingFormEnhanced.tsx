'use client'

import { useState, useEffect, type FormEvent } from "react"
import {
  Calendar, Clock, ChevronRight, ChevronLeft, Loader, CheckCircle,
  Send, ArrowRight, User, Phone, Mail, MessageSquare, FileText, AlertCircle,
} from "lucide-react"

const conditions = [
  "Stroke / Paralysis Recovery",
  "Spinal Cord Injury",
  "Gait & Balance Disorder",
  "Pediatric Neuro Condition",
  "Plantar Fasciitis / Heel Pain",
  "Parkinson's / Neurological",
  "Sports Injury",
  "Post-Surgical Rehab",
  "Back / Neck Pain",
  "Knee / Joint Pain",
  "Other",
]

const timeSlots = [
  { label: "10:00 AM – 11:00 AM", value: "10:00 AM" },
  { label: "11:00 AM – 12:00 PM", value: "11:00 AM" },
  { label: "12:00 PM – 1:00 PM", value: "12:00 PM" },
  { label: "1:00 PM – 2:00 PM", value: "1:00 PM" },
  { label: "2:00 PM – 3:00 PM", value: "2:00 PM" },
  { label: "3:00 PM – 4:00 PM", value: "3:00 PM" },
  { label: "4:00 PM – 5:00 PM", value: "4:00 PM" },
  { label: "5:00 PM – 6:00 PM", value: "5:00 PM" },
  { label: "6:00 PM – 7:00 PM", value: "6:00 PM" },
  { label: "7:00 PM – 8:00 PM", value: "7:00 PM" },
]

function getNext14Days() {
  const days: { date: string; label: string; dayName: string; dayNum: string; month: string; dayOfWeek: number; past: boolean }[] = []
  const today = new Date()
  const nowHour = today.getHours()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    if (dayOfWeek === 0) continue
    const dateStr = d.toISOString().split("T")[0]
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" })
    const dayNum = String(d.getDate())
    const month = d.toLocaleDateString("en-US", { month: "short" })
    const past = i === 0 && nowHour >= 19
    days.push({ date: dateStr, label: `${dayNum} ${month}`, dayName, dayNum, month, dayOfWeek, past })
  }
  return days
}

function parseTimeSlot(value: string): number {
  const match = value.match(/(\d+):00\s*(AM|PM)/)
  if (!match) return 0
  let hour = parseInt(match[1])
  const ampm = match[2]
  if (ampm === "PM" && hour !== 12) hour += 12
  if (ampm === "AM" && hour === 12) hour = 0
  return hour
}

type Step = "date" | "time" | "details" | "confirm" | "done"

interface BookedSlot {
  date: string
  time: string
}

export default function BookingFormEnhanced() {
  const [mounted, setMounted] = useState(false)
  const [todayStr, setTodayStr] = useState("")
  const [currentHour, setCurrentHour] = useState(0)

  const [days, setDays] = useState<{ date: string; label: string; dayName: string; dayNum: string; month: string; dayOfWeek: number; past: boolean }[]>([])
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)

  const [step, setStep] = useState<Step>("date")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [condition, setCondition] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const now = new Date()
    setTodayStr(now.toISOString().split("T")[0])
    setCurrentHour(now.getHours())
    setDays(getNext14Days())
    setMounted(true)
  }, [])

  useEffect(() => {
    fetch("/api/book")
      .then((r) => r.json())
      .then((data) => {
        if (data.slots) setBookedSlots(data.slots)
      })
      .catch(() => {})
      .finally(() => setLoadingSlots(false))
  }, [])

  const isToday = selectedDate === todayStr

  function isSlotBooked(date: string, timeLabel: string): boolean {
    return bookedSlots.some((s) => s.date === date && s.time === timeLabel)
  }

  function isTimeDisabled(timeValue: string, timeLabel: string): boolean {
    if (isSlotBooked(selectedDate, timeLabel)) return true
    if (!isToday) return false
    return parseTimeSlot(timeValue) <= currentHour
  }

  function validate(s: Step): boolean {
    setError("")
    if (s === "date" && !selectedDate) { setError("Please select a date from the calendar"); return false }
    if (s === "time" && !selectedTime) { setError("Please select a time slot"); return false }
    if (s === "details") {
      if (!name.trim()) { setError("Please enter your full name"); return false }
      if (!phone.trim()) { setError("Please enter your phone number"); return false }
      const digits = phone.replace(/\D/g, "")
      if (digits.length < 10) { setError("Enter a valid 10-digit phone number"); return false }
      if (phone.length !== digits.length) { setError("Phone number should contain only digits"); return false }
      if (!condition) { setError("Please select your condition"); return false }
      if (!email.trim()) { setError("Please enter your email address"); return false }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Enter a valid email address"); return false }
    }
    return true
  }

  function next(s: Step) {
    if (!validate(s)) return
    if (s === "date") setStep("time")
    else if (s === "time") setStep("details")
    else if (s === "details") setStep("confirm")
  }

  function back() {
    setError("")
    if (step === "time") { setStep("date") }
    else if (step === "details") { setStep("time") }
    else if (step === "confirm") { setStep("details") }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate("details")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          email,
          condition,
          date: selectedDate,
          time: selectedTime,
          message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Booking failed")
      setBookedSlots((prev) => [...prev, { date: selectedDate, time: selectedTime }])
      setBookingId(data.id)
      setStep("done")
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again or call +91 9616962072.")
    }
    setLoading(false)
  }

  function reset() {
    setStep("date"); setSelectedDate(""); setSelectedTime(""); setCondition("")
    setName(""); setPhone(""); setEmail(""); setMessage(""); setBookingId(""); setError("")
  }

  const steps = [
    { key: "date", label: "Date", desc: "Pick a day" },
    { key: "time", label: "Time", desc: "Choose slot" },
    { key: "details", label: "Details", desc: "Your info" },
    { key: "confirm", label: "Confirm", desc: "Review" },
  ]
  const stepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-xl dark:shadow-xl dark:shadow-black/10 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-white/80" />
          <h3 className="text-white font-bold text-lg">
            {step === "done" ? "Booking Confirmed!" : "Book Appointment"}
          </h3>
        </div>
        {step !== "done" && (
          <div className="flex items-center gap-3 mt-3">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1.5 flex-1">
                <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${i <= stepIndex ? "bg-white/90" : "bg-white/20"}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="mb-5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium px-4 py-3 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
            {error}
          </div>
        )}

        {/* Step 1: Date */}
        {step === "date" && !mounted && (
          <div className="flex items-center justify-center py-12 text-slate-400 dark:text-slate-500 text-sm">
            <Loader className="w-4 h-4 animate-spin mr-2" /> Loading calendar...
          </div>
        )}
        {step === "date" && mounted && (
          <div className="animate-fade-in">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred date <span className="text-slate-400 dark:text-slate-500">(Sunday closed)</span></p>
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-5">
              {days.map((d) => {
                const sel = selectedDate === d.date
                const isDisabled = d.dayOfWeek === 0 || d.past
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => !isDisabled && setSelectedDate(d.date)}
                    disabled={isDisabled}
                    className={`flex flex-col items-center py-2.5 px-0.5 rounded-xl border-2 transition-all duration-200 ${
                      isDisabled
                        ? "border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-navy-900 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                        : sel
                        ? "border-brand-500 dark:border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-md scale-105"
                        : "border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:border-brand-200 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-900/20"
                    }`}
                  >
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDisabled ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500"}`}>
                      {d.dayName}
                    </span>
                    <span className={`text-base md:text-lg font-bold leading-tight mt-0.5 ${isDisabled ? "text-slate-300 dark:text-slate-600" : sel ? "text-brand-700 dark:text-brand-300" : "text-navy-800 dark:text-white"}`}>
                      {d.dayNum}
                    </span>
                    <span className={`text-[9px] ${isDisabled ? "text-slate-300 dark:text-slate-600" : "text-slate-400 dark:text-slate-500"}`}>{d.month}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400 dark:text-slate-500">Next 14 days shown</p>
              <button
                type="button"
                onClick={() => next("date")}
                disabled={!selectedDate}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all ${
                  selectedDate
                    ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/20"
                    : "bg-slate-100 dark:bg-navy-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === "time" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="text-sm font-semibold text-navy-800 dark:text-white">
                  {days.find((d) => d.date === selectedDate)?.label || selectedDate}
                </span>
              </div>
              <button onClick={() => setStep("date")} className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">
                Change date
              </button>
            </div>
            {loadingSlots ? (
              <div className="flex items-center justify-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                <Loader className="w-4 h-4 animate-spin mr-2" /> Loading available slots...
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select your preferred time</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                  {timeSlots.map((t) => {
                    const booked = isSlotBooked(selectedDate, t.label)
                    const past = isTimeDisabled(t.value, t.label)
                    const disabled = booked || past
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => !disabled && setSelectedTime(t.label)}
                        disabled={disabled}
                        className={`flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                          disabled
                            ? booked
                              ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-400 cursor-not-allowed line-through"
                              : "border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-navy-900 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                            : selectedTime === t.label
                            ? "border-brand-500 dark:border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-md scale-[1.02]"
                            : "border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:border-brand-200 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-900/20"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs sm:text-sm">{t.label}</span>
                        {booked && <span className="text-[10px] font-semibold ml-1">Booked</span>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
            <div className="flex gap-2">
              <button type="button" onClick={back} className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
                <ChevronLeft className="w-4 h-4 inline mr-1" />Back
              </button>
              <button
                type="button"
                onClick={() => next("time")}
                disabled={!selectedTime}
                className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all ${
                  selectedTime
                    ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/20"
                    : "bg-slate-100 dark:bg-navy-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === "details" && (
          <div className="animate-fade-in">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Your contact details</p>
            <div className="space-y-4">
              <div className="relative">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 transition-shadow appearance-none"
                >
                  <option value="">Select your condition *</option>
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text" placeholder="Full Name *" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 transition-shadow"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="tel" placeholder="Phone Number *" required
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 transition-shadow"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="email" placeholder="Email Address *" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 transition-shadow"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <textarea
                  placeholder="Brief description of your condition (optional)"
                  rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm bg-white dark:bg-navy-800 text-navy-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 transition-shadow resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={back} className="px-5 py-3 rounded-xl border border-slate-300 dark:border-navy-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
                  <ChevronLeft className="w-4 h-4 inline mr-1" />Back
                </button>
                <button type="button" onClick={() => next("details")} className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold px-5 py-3 rounded-xl shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all hover:scale-[1.01] active:scale-[0.98]">
                  Review &amp; Confirm <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === "confirm" && (
          <div className="animate-fade-in">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Please verify your booking</p>
            <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-5 space-y-3 border border-slate-200 dark:border-navy-700 mb-5">
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                {[
                  ["Date", days.find((d) => d.date === selectedDate)?.label || selectedDate],
                  ["Time", selectedTime],
                  ["Condition", condition || "Not specified"],
                  ["Name", name],
                  ["Phone", phone],
                  ["Email", email],
                ].map(([l, v]) => (
                  <div key={l!}>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">{l}</span>
                    <p className="font-semibold text-navy-800 dark:text-white">{v as string}</p>
                  </div>
                ))}
              </div>
              {message && (
                <div className="text-sm pt-2 border-t border-slate-200 dark:border-navy-700">
                  <span className="text-slate-500 dark:text-slate-400 text-xs">Notes</span>
                  <p className="text-navy-800 dark:text-white mt-0.5">{message}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={back} className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
                <ChevronLeft className="w-4 h-4 inline mr-1" />Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg dark:shadow-lg dark:shadow-black/10 transition-all disabled:opacity-60"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Confirm &amp; Book
              </button>
            </div>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-50 dark:from-brand-900/30 to-accent-50 dark:to-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <h4 className="text-xl font-bold text-navy-800 dark:text-white mb-1">Booking Request Sent!</h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">Thank you, {name}.</p>
            <div className="inline-block bg-slate-100 dark:bg-navy-700 rounded-lg px-4 py-2 mt-2 mb-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">ID: </span>
              <span className="text-sm font-mono font-bold text-brand-700 dark:text-brand-300">{bookingId}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              {days.find((d) => d.date === selectedDate)?.label || selectedDate} &middot; {selectedTime}
              <br />Dr. Devejya&apos;s team will contact you at {phone} within 1 hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=Appointment+-+Gorakhpur+Mission+Rehab&dates=${selectedDate?.replace(/-/g, "")}/${selectedDate?.replace(/-/g, "")}&details=Appointment+with+Dr.+Devejya+Srivastava+at+Divyaman+Hospital+Gorakhpur&location=Divyaman+Hospital%2C+Bargadwa+Bypass%2C+Gorakhpur`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-600 text-slate-700 dark:text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </a>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg dark:shadow-lg dark:shadow-black/10 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all">
                Book Another <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
