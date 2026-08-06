import { getDb } from "./mongodb"
import { defaultFaqs, defaultReviews } from "./default-content"

export async function ensureContent() {
  const db = await getDb()
  const meta = db.collection<any>("content_meta")

  const faqMeta = await meta.findOne({ _id: "faqs" })
  if (!faqMeta) {
    const count = await db.collection("faqs").countDocuments()
    if (count === 0 && defaultFaqs.length > 0) {
      await db.collection("faqs").insertMany(
        defaultFaqs.map((faq, i) => ({ ...faq, order: i }))
      )
    }
    await meta.updateOne({ _id: "faqs" }, { $set: { done: true } }, { upsert: true })
  }

  const reviewMeta = await meta.findOne({ _id: "reviews" })
  if (!reviewMeta) {
    const count = await db.collection("reviews").countDocuments()
    if (count === 0 && defaultReviews.length > 0) {
      await db.collection("reviews").insertMany(
        defaultReviews.map((review, i) => ({ ...review, order: i }))
      )
    }
    await meta.updateOne({ _id: "reviews" }, { $set: { done: true } }, { upsert: true })
  }
}
