import { ObjectId } from "mongodb"
import { getDb } from "./mongodb"

interface Appointment {
  id: string
  name: string
  phone: string
  email: string
  condition: string
  date: string
  time: string
  message: string
  timestamp: string
  source: string
}

function generateId(): string {
  return `APT-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export async function isSlotBooked(date: string, time: string): Promise<boolean> {
  const db = await getDb()
  const count = await db.collection("appointments").countDocuments(
    { date, time },
    { limit: 1 }
  )
  return count > 0
}

export async function saveAppointment(
  appt: Omit<Appointment, "id">
): Promise<Appointment> {
  const db = await getDb()

  const record: Appointment = {
    ...appt,
    id: generateId(),
  }

  await db.collection("appointments").insertOne(record)
  return record
}

export async function getAppointments(): Promise<Appointment[]> {
  const db = await getDb()
  return db
    .collection<Appointment>("appointments")
    .find({})
    .sort({ timestamp: -1 })
    .toArray()
}

export async function getBookedSlots(): Promise<{ date: string; time: string }[]> {
  const db = await getDb()
  const slots = await db
    .collection<Appointment>("appointments")
    .find({}, { projection: { date: 1, time: 1, _id: 0 } })
    .toArray()
  return slots as { date: string; time: string }[]
}

export async function getStats() {
  const db = await getDb()
  const total = await db.collection("appointments").countDocuments({})
  return { total, last30: total }
}

export interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  message: string
  timestamp: string
  source: string
  status?: "pending" | "completed"
}

export async function saveEnquiry(
  enquiry: Omit<Enquiry, "id" | "status">
): Promise<Enquiry> {
  const db = await getDb()

  const record: Enquiry = {
    ...enquiry,
    id: `ENQ-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: "pending",
  }

  await db.collection("enquiries").insertOne(record)
  return record
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDb()
  return db
    .collection<Enquiry>("enquiries")
    .find({})
    .sort({ timestamp: -1 })
    .toArray()
}

export async function markEnquiryCompleted(id: string): Promise<Enquiry | null> {
  const db = await getDb()
  const result = await db.collection("enquiries").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status: "completed" } },
    { returnDocument: "after" }
  )
  return result as unknown as Enquiry | null
}
