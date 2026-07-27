import nodemailer from "nodemailer"

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendOwnerNotification(details: {
  id: string
  name: string
  phone: string
  email: string
  condition: string
  date: string
  time: string
  message: string
  timestamp: string
}) {
  const ownerEmail = process.env.OWNER_EMAIL
  if (!ownerEmail || !process.env.SMTP_EMAIL || !process.env.SMTP_PASS) return

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
      <div style="background:linear-gradient(135deg,#1e3a5f,#0f2640);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px">🆕 New Appointment Booking</h1>
        <p style="color:#94a3b8;margin:6px 0 0;font-size:13px">Gorakhpur Mission Rehab</p>
      </div>
      <div style="padding:24px 32px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#64748b;width:110px">Booking ID</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.id}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Name</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0;font-weight:600;color:#1e293b"><a href="tel:${details.phone}" style="color:#2563eb;text-decoration:none">${details.phone}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;font-weight:600;color:#1e293b"><a href="mailto:${details.email}" style="color:#2563eb;text-decoration:none">${details.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Condition</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.condition}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Date</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.date}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Time</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.time}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Message</td><td style="padding:8px 0;color:#1e293b">${details.message}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Booked At</td><td style="padding:8px 0;color:#1e293b">${new Date(details.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
        </table>
        <div style="margin-top:20px;padding:12px 16px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca;font-size:13px;color:#991b1b">
          ⚡ <strong>Action required:</strong> Contact ${details.name} at <a href="tel:${details.phone}" style="color:#2563eb">${details.phone}</a> to confirm this appointment.
        </div>
      </div>
      <div style="background:#f1f5f9;padding:16px 32px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0">
        Gorakhpur Mission Rehab — Dr. Devejya Srivastava (PT)
      </div>
    </div>
  `

  try {
    await getTransporter().sendMail({
      from: `"Gorakhpur Mission Rehab" <${process.env.SMTP_EMAIL}>`,
      to: ownerEmail,
      subject: `🆕 New Booking — ${details.name} (${details.condition})`,
      html,
    })
  } catch (e) {
    console.error("Owner email notification failed:", e)
  }
}

export async function sendCustomerConfirmation(details: {
  name: string
  phone: string
  email: string
  condition: string
  date: string
  time: string
}) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASS) return

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
      <div style="background:linear-gradient(135deg,#1e3a5f,#0f2640);padding:24px 32px;text-align:center">
        <div style="font-size:40px;margin-bottom:8px">✅</div>
        <h1 style="color:#fff;margin:0;font-size:20px">Appointment Request Received!</h1>
      </div>
      <div style="padding:24px 32px">
        <p style="font-size:14px;color:#475569;margin:0 0 16px">Dear <strong style="color:#1e293b">${details.name}</strong>,</p>
        <p style="font-size:14px;color:#475569;margin:0 0 16px">Thank you for booking an appointment with <strong>Gorakhpur Mission Rehab</strong>. Here's a summary of your request:</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px">
          <tr><td style="padding:8px 0;color:#64748b;width:110px">Condition</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.condition}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Date</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.date}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Time</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.time}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0;font-weight:600;color:#1e293b">${details.phone}</td></tr>
        </table>
        <div style="padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:13px;color:#166534;margin-bottom:16px">
          📞 Dr. Devejya's team will contact you at <strong>${details.phone}</strong> within <strong>1 hour</strong> to confirm your appointment.
        </div>
        <p style="font-size:13px;color:#64748b;margin:0">If you need to reschedule or have any questions, call us at <a href="tel:+919616962072" style="color:#2563eb;text-decoration:none;font-weight:600">+91 9616962072</a>.</p>
      </div>
      <div style="background:#f1f5f9;padding:16px 32px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0">
        <p style="margin:0 0 4px"><strong>Gorakhpur Mission Rehab</strong></p>
        <p style="margin:0">Divyaman Hospital, Bargadwa Bypass, Raptinagar Phase 1, Gorakhpur — 273001</p>
      </div>
    </div>
  `

  try {
    await getTransporter().sendMail({
      from: `"Gorakhpur Mission Rehab" <${process.env.SMTP_EMAIL}>`,
      to: details.email,
      subject: "✅ Appointment Request Received — Gorakhpur Mission Rehab",
      html,
    })
  } catch (e) {
    console.error("Customer email confirmation failed:", e)
  }
}
