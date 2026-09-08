import { getDb } from "./mongodb"
import seedFaqs from "./faq-seed.json"

export interface Faq {
  _id?: string
  q: string
  a: string
  category: string
  order: number
}

export async function getFaqs(): Promise<Faq[]> {
  const db = await getDb()
  const count = await db.collection("faqs").countDocuments()
  if (count === 0) {
    await db.collection("faqs").insertMany(
      seedFaqs.map((f, i) => ({ ...f, order: i }))
    )
  }
  const docs = await db.collection("faqs").find({}).sort({ order: 1 }).toArray()
  return docs.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() })) as Faq[]
}
