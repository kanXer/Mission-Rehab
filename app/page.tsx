import TopBar from "@/components/TopBar"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials"
import Gallery from "@/components/Gallery"
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
          <Testimonials />
          <FAQ />
        <Appointment />
      </main>
      <Footer />
    </>
  )
}
