import TopBar from "@/components/TopBar"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Treatments from "@/components/Treatments"
import Services from "@/components/Services"
import Facilities from "@/components/Facilities"
import Gallery from "@/components/Gallery"
import Testimonials from "@/components/Testimonials"
import GoogleProfile from "@/components/GoogleProfile"
import FAQ from "@/components/FAQ"
import Appointment from "@/components/Appointment"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Gallery />
        <GoogleProfile />
        <Services />
        <Treatments />
        <Testimonials />
        <Facilities />
        <FAQ />
        <Appointment />
      </main>
      <Footer />
    </>
  )
}

