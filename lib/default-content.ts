export interface DefaultFaq {
  q: string
  a: string
  category: string
}

export interface DefaultReview {
  name: string
  content: string
  rating: number
}

export const defaultFaqs: DefaultFaq[] = [
  {
    q: "How soon after a stroke should rehabilitation begin?",
    a: "Early intervention is critical. Research shows that the best outcomes occur when rehab starts within 24–48 hours after medical stabilization. At Gorakhpur Mission Rehab, we design phase-appropriate therapy protocols — from bed mobility in the early stage to advanced gait training as recovery progresses. Even months or years after a stroke, neuroplasticity-based therapy can still produce meaningful improvements.",
    category: "Stroke & Paralysis",
  },
  {
    q: "Do you offer specialized balance and gait training in Gorakhpur?",
    a: "Yes, gait correction and balance retraining are core specialties of Dr. Devejya Srivastava at Divyaman Hospital, Gorakhpur. We use task-specific training, perturbation-based balance therapy, and advanced gait analysis to address fall risk, walking asymmetry, and coordination deficits — whether from stroke, Parkinson's, spinal injury, or age-related decline. Home visit options are also available for patients with limited mobility.",
    category: "Gait & Balance",
  },
  {
    q: "Where is the neuro rehabilitation clinic located in Gorakhpur?",
    a: "We are located at Divyaman Hospital, Bargadwa Bypass Road, Raptinagar Phase 1, Gorakhpur, Uttar Pradesh — 273001. The center is easily accessible from all parts of Gorakhpur city including Shahpur, Mohaddipur, Golghar, Gorakhnath, and Medical College Road. We also offer home visit physiotherapy services for patients with severe mobility limitations across Gorakhpur.",
    category: "Clinic Info",
  },
  {
    q: "How long does neuro-rehabilitation typically take to show results?",
    a: "Recovery timelines vary based on the condition, severity, and consistency of therapy. Stroke and brain injury patients typically require 6–12 months of structured rehab for significant functional gains, while conditions like gait disorders or plantar fasciitis may show improvement in 8–16 weeks. We provide a personalized timeline and measurable progress benchmarks after the initial assessment. Consistency is key — most patients attend 3–4 sessions per week for optimal results.",
    category: "Treatment",
  },
  {
    q: "Do you treat children with developmental delays or cerebral palsy?",
    a: "Yes, pediatric neuro-physiotherapy is one of our core specialties. Dr. Devejya Srivastava provides early intervention therapy for children with developmental delays, cerebral palsy, Down syndrome, and other neurological conditions. We focus on improving motor milestones, balance, coordination, and functional independence through play-based therapy and family-guided exercises.",
    category: "Pediatric",
  },
  {
    q: "What is neuroplasticity therapy and how does it help in paralysis recovery?",
    a: "Neuroplasticity is the brain's ability to form new neural pathways after injury. Instead of passive exercises alone, our therapy uses repeated, task-specific training to help the brain relearn movement — which is why many patients continue to improve months or even years after a stroke or paralysis. This is the foundation of every recovery plan we design at our neuro rehabilitation center in Gorakhpur.",
    category: "Stroke & Paralysis",
  },
  {
    q: "Can physiotherapy cure paralysis completely?",
    a: "Complete recovery depends on the cause, severity, and how soon rehabilitation begins. What we can promise is measurable progress: many of our patients regain the ability to walk, sit, balance, and perform daily tasks they thought were lost forever. With consistent sessions, our stroke and paralysis recovery program combines gait training, spasticity management, and home exercises to maximise independence.",
    category: "Stroke & Paralysis",
  },
  {
    q: "What is the difference between orthopedic and neurological physiotherapy?",
    a: "Orthopedic physiotherapy treats joints, muscles, bones, and soft tissue injuries such as back pain, knee pain, or frozen shoulder. Neurological physiotherapy treats conditions that affect the brain and nervous system — like stroke, paralysis, spinal cord injury, Parkinson's disease, and multiple sclerosis — where the focus is on retraining the brain to control movement. Dr. Devejya Srivastava specialises in the latter and consults regularly on orthopedic cases as well.",
    category: "Treatment",
  },
  {
    q: "How much does neuro rehabilitation cost per session?",
    a: "Session charges depend on the condition and the intensity of therapy required. Please call or WhatsApp us for a personalised quote — we keep our packages affordable so that families across Gorakhpur and Eastern Uttar Pradesh can continue long-term rehabilitation without financial strain.",
    category: "Treatment",
  },
  {
    q: "What conditions do you treat at Gorakhpur Mission Rehab?",
    a: "We treat a wide range of neurological and movement disorders including: Stroke & Paralysis, Spinal Cord Injury, Gait & Balance Disorders, Parkinson's Disease, Pediatric Developmental Delays, Cerebral Palsy, Plantar Fasciitis & Heel Pain, Sports Injuries, Post-Surgical Rehabilitation, Back & Neck Pain, Knee & Joint Pain, and Spasticity Management. Each patient receives a personalized treatment plan based on their specific condition and goals.",
    category: "Treatment",
  },
  {
    q: "Do you offer home visit physiotherapy in Gorakhpur?",
    a: "Yes, we offer home visit physiotherapy services for patients with severe mobility limitations across Gorakhpur city and surrounding areas. Our home visit program includes assessment, therapeutic exercises, family training, and progress monitoring. This is especially beneficial for stroke patients, elderly individuals, and post-surgical cases who cannot travel to the clinic.",
    category: "Clinic Info",
  },
  {
    q: "How does gait and balance training help stroke patients?",
    a: "After a stroke, the brain often loses its ability to coordinate walking and balance. Gait and balance training uses task-specific practice — stepping, weight shifting, and perturbation exercises — to retrain these pathways. Over time this reduces fall risk, corrects walking asymmetry, and helps patients regain the confidence to move around at home and in the community.",
    category: "Gait & Balance",
  },
  {
    q: "What is the role of physiotherapy in Parkinson's disease?",
    a: "Physiotherapy is central to Parkinson's disease management. It focuses on gait retraining, balance and coordination, freezing-of-gait strategies, and daily living skills so patients stay independent for longer. We combine exercises with mobility management therapy and regular reassessment to slow functional decline.",
    category: "Treatment",
  },
  {
    q: "How long does stroke recovery take with physiotherapy?",
    a: "Timelines vary with the type and severity of the stroke and how soon therapy begins. In our experience, most stroke patients see meaningful functional gains within 6–12 months of consistent rehabilitation, while early mobility — such as sitting, standing, and assisted walking — often improves in the first 8–12 weeks. Because of neuroplasticity, many continue improving for years with structured therapy and home exercises.",
    category: "Stroke & Paralysis",
  },
  {
    q: "How to treat plantar fasciitis with foot biomechanics physiotherapy?",
    a: "Plantar fasciitis is often caused by poor foot biomechanics — collapsed arches, tight calf muscles, or abnormal walking patterns. Our physiotherapist corrects these through gait analysis, stretching and strengthening, foot posture correction, and footwear advice, which relieves heel pain at its root rather than just masking symptoms.",
    category: "Treatment",
  },
  {
    q: "What exercises can I do for stroke recovery at home?",
    a: "Common home exercises include ankle pumps, knee bends, sitting-to-standing practice, heel raises, and assisted walking with a family member. The right set of exercises depends on your stage of recovery, so we provide a printed home exercise program during your sessions and guide your caregiver as well. Never attempt new exercises without your physiotherapist's approval.",
    category: "Stroke & Paralysis",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment online through our website, by calling +91 9616962072, or through WhatsApp. Simply choose your preferred date and time, share your details, and Dr. Devejya Srivastava's team will confirm your appointment within 24 hours. We are open Monday to Saturday, 10:00 AM to 8:00 PM. Sunday is a holiday.",
    category: "Treatment",
  },
]

export const defaultReviews: DefaultReview[] = [
  { name: "Devinder Sharma", content: "Dr. Devejya is a great professional and is one of the best in business. His splendid skills and knowledge are admirable. He has some kind of artistic magic in his hands. Dr. Dev carries a very positive attitude making the experience even better. Also the clinic has a variety of equipments for almost all kind of exercises possible. Dr. Devejya is highly recommended in you are looking for a benevolent physiotherapist.", rating: 5 },
  { name: "Deepu Gond", content: "Best physiotherapist I have ever met. He cured my back pain very easily. I were very disturb and went for many doctors but got no benefit. Then I search #gorakhpur #mission Rehab# where doctor Devejya cured my back pain at divyman hospital", rating: 5 },
  { name: "Sumit Mishra8545", content: "I think its neurorehab his work facility is justify a neurorehablitation many of other use name of rehabilitation but his didnot know what is rehabilitation. Thanks god you meet dr. Devejya he is best physiotherapist ever in all Gorakhpur mybest wishes is always witgorakhpur mission rehabiits the brand of Dr. Devejy", rating: 5 },
  { name: "Aditya pratap Singh", content: "Best physiotherapy in gorakhpur", rating: 5 },
  { name: "Diksha Tiwari", content: "Highly recommended You can trust him blindly if you have any physical pain in your body I would like to say he is one of the finest and very hardworking physiotherapist in gorakhpur who believes in his hand more than machinery things and he will satisfied you with his strong technique and strength.", rating: 5 },
  { name: "Varsha Singh", content: "Dr Devejya is an amazing physiotherapist,full of compassion and dedication.3 years back I was suffering with severe back issues after lots of medication I was not able to recover.Now after his treatment I am perfectly fine.He has an amazing dedicated team . Recently I am suffering with cervical,doc prescribed a list of medicine and MRI,I didn't go for any medication but rushed immediately to him within two days I am feeling much much better.lots of appreciation 🙏", rating: 5 },
  { name: "RITES SHAHI", content: "Mere pitaji ko paralysis ke baad physiotherapy ki zarurat thi. Gorakhpur Mission Rehab me neuro rehabilitation shuru ki. Dr Devejya Srivastava ka approach bahut professional hai. Unki walking aur sitting balance improve hui. Gorakhpur ka trusted neuro rehab center.", rating: 5 },
  { name: "V.M. Tiwary", content: "Mujhe ghutne aur kamar dard ki problem thi. Gorakhpur Mission Rehab me physiotherapy treatment liya. Dr Devejya Srivastava ne exercise aur manual therapy se pain control kiya. Ab main bina pain ke chal pata hu. Best physiotherapy clinic in Gorakhpur.", rating: 5 },
  { name: "Shivam Singh Baghel", content: "Highly recommend Dr. Devejya Srivastava for neuro rehabilitation across Gorakhpur and Uttar Pradesh. Personalized rehab programs, professional and effective. Truly a best physio near me or in best Physiotherapist in Gorakhpur", rating: 5 },
  { name: "Smera Anand", content: "Best physiotherapist in Gorakhpur. Dr. Devjya Srivastava is very humble, he gave proper time, made one thing understandable, unlike other people he was not just focused on making money, I found this to be the best rehab center for me.", rating: 5 },
  { name: "Shalu Singh", content: "After regular sessions, my walking and balance improved a lot. One of the best neuro rehab clinics near me. Thank you doctor.", rating: 5 },
  { name: "Abhishek Yadav", content: "Dr.Devejya is the best neuro rehab physiotherapist near me in Gorakhpur,UP,India Excellent care for stroke ,paralysis and spinal injury recovery.", rating: 5 },
  { name: "Divaker Chaturvedi", content: "Best physiotherapy and neuro rehabilitation center in gorakhpur", rating: 5 },
  { name: "Mahi Bhai", content: "Excellent management and good environment team is very cooperative", rating: 5 },
  { name: "Abhinandan Singh", content: "Dr Srivastava is definitely the best physiotherapist that I have ever met and probably one of the best medical practitioner that I...", rating: 5 },
  { name: "Naseem Bano", content: "Best neuro rehab center in gorakhpur", rating: 5 },
  { name: "Ramendra Pratap Singh", content: "Excellent neuro rehab center ,truly dedicated to recovery, highly recommend.", rating: 5 },
  { name: "Kashish Nigam", content: "It's been around more than 3 years I am suffering from severe back pain I have consulted more than 10 doc and 3 physiotherapist can't get relief or dignose but when I started my treatment with Dr devejay sir from the day 1 he himself and his team was so supportive nd hardworking he has tried his best and slowly slowly the pain get started to reduce got my physical strength back I was so mentally exhausted but his kidness has treated my mental health also thanku for your support sir it's true that physio has magic in their hands # 😌 and also scored 90 percentage in class 12 after getting the relief in my pain due to treatment by sir", rating: 5 },
]
