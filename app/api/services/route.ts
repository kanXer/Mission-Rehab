import { NextResponse } from "next/server"

const services = [
  "Stroke & Paralysis Rehabilitation",
  "Gait & Balance Rehabilitation",
  "Pediatric Neuro Rehabilitation",
  "Foot & Ankle Rehabilitation",
  "Parkinson's Disease & Movement Disorders",
  "Knee, Hip & Joint Pain",
  "Spinal Cord Injury Rehabilitation",
  "Brain Injury (TBI) Rehabilitation",
  "Facial Palsy / Bell's Palsy",
  "Cerebral Palsy (CP)",
  "Multiple Sclerosis (MS)",
  "Guillain-Barré Syndrome (GBS)",
  "Vestibular Rehabilitation (Vertigo / Dizziness)",
  "Frozen Shoulder",
  "Shoulder Pain & Rotator Cuff Injury",
  "Osteoarthritis Rehabilitation",
  "ACL / Sports Rehabilitation",
  "Post-Fracture Rehabilitation",
]

const categoryMap: Record<string, string> = {
  "Stroke & Paralysis Rehabilitation": "Neurological",
  "Gait & Balance Rehabilitation": "Neurological",
  "Pediatric Neuro Rehabilitation": "Pediatric",
  "Foot & Ankle Rehabilitation": "Orthopaedic",
  "Parkinson's Disease & Movement Disorders": "Neurological",
  "Knee, Hip & Joint Pain": "Orthopaedic",
  "Spinal Cord Injury Rehabilitation": "Neurological",
  "Brain Injury (TBI) Rehabilitation": "Neurological",
  "Facial Palsy / Bell's Palsy": "Neurological",
  "Cerebral Palsy (CP)": "Pediatric",
  "Multiple Sclerosis (MS)": "Neurological",
  "Guillain-Barré Syndrome (GBS)": "Neurological",
  "Vestibular Rehabilitation (Vertigo / Dizziness)": "Neurological",
  "Frozen Shoulder": "Orthopaedic",
  "Shoulder Pain & Rotator Cuff Injury": "Orthopaedic",
  "Osteoarthritis Rehabilitation": "Orthopaedic",
  "ACL / Sports Rehabilitation": "Orthopaedic",
  "Post-Fracture Rehabilitation": "Orthopaedic",
}

export async function GET() {
  return NextResponse.json({
    services: services.map((title) => ({
      title,
      category: categoryMap[title] || "Other",
    })),
  })
}
