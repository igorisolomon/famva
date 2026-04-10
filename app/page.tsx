import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import CtaSection from "@/components/sections/cta"
import FAQSection from "@/components/sections/faq"
import HeroSection from "@/components/sections/hero"
import HowItWorksSection from "@/components/sections/how-it-works"
import ProblemSection from "@/components/sections/problem"
import SolutionSection from "@/components/sections/solution"
import TestimonialsSection from "@/components/sections/testimonials"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
