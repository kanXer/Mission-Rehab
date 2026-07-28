import { NextRequest, NextResponse } from "next/server"
import { saveEnquiry } from "@/lib/storage"
import { sendOwnerEnquiryNotification, sendCustomerEnquiryConfirmation } from "@/lib/email"
import { sendTelegramNotification } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, subject, message } = await request.json()

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (phone or email) are required." },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()

    const record = await saveEnquiry({
      name: name.trim(),
      phone: phone || "—",
      email: email || "—",
      subject: subject || "General Enquiry",
      message: message || "—",
      timestamp,
      source: "Gorakhpur Mission Rehab Website (Enquiry Form)",
    })

    const details = {
      id: record.id,
      name: name.trim(),
      phone: phone || "—",
      email: email || "—",
      subject: subject || "General Enquiry",
      message: message || "—",
      timestamp,
    }

    await Promise.allSettled([
      sendOwnerEnquiryNotification(details),
      sendCustomerEnquiryConfirmation({ name: details.name, email: details.email, subject: details.subject }),
      sendTelegramNotification({
        id: details.id,
        name: details.name,
        phone: details.phone,
        email: details.email,
        condition: `[ENQUIRY] ${details.subject}`,
        date: "N/A",
        time: "N/A",
        message: details.message,
        timestamp,
      }),
    ])

    return NextResponse.json({
      success: true,
      id: record.id,
      message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
    })
  } catch (e) {
    console.error("Enquiry error:", e)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
