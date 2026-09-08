import { NextResponse } from "next/server"

const reviews = [
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

export async function GET() {
  return NextResponse.json({ reviews })
}
