export async function sendTelegramNotification(details: any) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) return

  const messageText = `🚨 New Appointment\n\nName: ${details.name}\nPhone: ${details.phone}\nEmail: ${details.email}\nCondition: ${details.condition}\nDate: ${details.date}\nTime: ${details.time}\nMessage: ${details.message}`

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
      }),
    })
  } catch (error) {
    console.error("Telegram error:", error)
  }
}
