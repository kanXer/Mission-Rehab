import { NextRequest, NextResponse } from "next/server"
import { saveAppointment, getBookedSlots, isSlotBooked } from "@/lib/storage"
import { sendOwnerNotification, sendCustomerConfirmation } from "@/lib/email"
import { sendTelegramNotification } from "@/lib/telegram"

export async function GET() {
  const slots = await getBookedSlots()
  return NextResponse.json({ slots })
}

function parseTimeToHours(time: string): number {
  const match = time.match(/(\d+):00\s*(AM|PM)/)
  if (!match) return 0
  let hour = parseInt(match[1])
  const ampm = match[2]
  if (ampm === "PM" && hour !== 12) hour += 12
  if (ampm === "AM" && hour === 12) hour = 0
  return hour
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, condition, date, time, message } = await request.json()

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    if (date && time) {
      const today = new Date().toISOString().split("T")[0]
      const nowHour = new Date().getHours()

      if (date < today) {
        return NextResponse.json({ error: "Cannot book an appointment in the past." }, { status: 400 })
      }

      if (date === today && parseTimeToHours(time) <= nowHour) {
        return NextResponse.json({ error: "This time has already passed. Please choose a future time slot." }, { status: 400 })
      }

      if (await isSlotBooked(date, time)) {
        return NextResponse.json({ error: "This time slot is already booked. Please choose another." }, { status: 409 })
      }
    }

    const record = await saveAppointment({
      name: name.trim(),
      phone,
      email: email || "—",
      condition: condition || "Not specified",
      date: date || "Not specified",
      time: time || "Not specified",
      message: message || "—",
      timestamp: new Date().toISOString(),
      source: "Gorakhpur Mission Rehab Website",
    })

    const details = {
      id: record.id,
      name: name.trim(),
      phone,
      email: email || "—",
      condition: condition || "Not specified",
      date: date || "Not specified",
      time: time || "Not specified",
      message: message || "—",
      timestamp: new Date().toISOString(),
    }

    await Promise.allSettled([
      sendOwnerNotification(details),
      sendCustomerConfirmation(details),
      sendTelegramNotification(details),
    ])

    return NextResponse.json({
      success: true,
      id: record.id,
      message: "Appointment request received. Dr. Devejya's team will contact you within 1 hour.",
    })
  } catch (e) {
    console.error("Booking error:", e)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
