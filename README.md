# Gorakhpur Mission Rehab

Official website for **Gorakhpur Mission Rehab** — a specialized neuro rehabilitation center under the direction of Dr. Devejya Srivastava (PT) at Divyaman Hospital, Gorakhpur.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_MONGODB_URI=mongodb://user:pass@host:port/db?options
SMTP_EMAIL=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
OWNER_EMAIL=owner@example.com
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your-telegram-bot-token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your-telegram-chat-id
```

### Required
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_MONGODB_URI` | MongoDB connection string |
| `SMTP_EMAIL` | Gmail address used to send booking emails |
| `SMTP_PASS` | Gmail **App Password** (not regular password) |
| `OWNER_EMAIL` | Email that receives new booking notifications |

### Optional (Telegram backup)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` | Telegram bot token for notifications |
| `NEXT_PUBLIC_TELEGRAM_CHAT_ID` | Telegram chat ID for notifications |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run linter |

---

## Project Structure

```
├── app/
│   ├── about/          # About Dr. Devejya page
│   ├── api/book/       # Booking API (GET slots, POST booking)
│   ├── book-appointment/
│   ├── contact/
│   ├── faq/
│   ├── services/
│   ├── testimonials/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── About.tsx
│   ├── Appointment.tsx
│   ├── BookingFormEnhanced.tsx
│   ├── Contact.tsx
│   ├── FAQ.tsx
│   ├── Facilities.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ScrollReveal.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── TopBar.tsx
│   └── Treatments.tsx
├── lib/
│   ├── mongodb.ts      # MongoDB client & TTL index (48h auto-delete)
│   ├── storage.ts      # Appointment CRUD (async, MongoDB-based)
│   └── email.ts        # SMTP email notifications (owner + customer)
├── data/               # JSON storage (legacy, replaced by MongoDB)
├── public/             # Static assets
└── .env.local          # Environment variables (not committed)
```

---

## Features

- **Online appointment booking** with date/time selection and real-time slot availability
- **Multi-step booking form** with validation (name, phone, email, condition required)
- **MongoDB storage** with TTL index — old appointments auto-delete after 48 hours
- **SMTP email notifications** — owner gets booking alert, customer gets confirmation receipt
- **Telegram notifications** (optional backup channel)
- **Dark mode** support
- **Responsive design** — mobile, tablet, desktop
- **SEO optimized** with structured data and meta tags
- **Google Maps integration**
- **WhatsApp chat** integration

---

## Email Setup (Gmail SMTP)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use that app password as `SMTP_PASS` in `.env.local`

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB
- **Email:** Nodemailer (Gmail SMTP)
- **Icons:** Lucide React
- **Deployment:** Vercel / Any Node.js host
