import { getFaqs, type Faq } from "@/lib/faqs"
import FAQContent from "./FAQContent"

export default async function FaqPage() {
  let faqs: Faq[] = []
  try {
    faqs = await getFaqs()
  } catch {}
  return <FAQContent faqs={faqs} />
}
