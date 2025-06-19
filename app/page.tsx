import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Statistics from '@/components/Statistics'
import Benefits from '@/components/Benefits'
import HowItWorks from '@/components/HowItWorks'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <Benefits />
      <HowItWorks />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}