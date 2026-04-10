import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Target, Eye, Heart, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const values = [
  {
    icon: Heart,
    title: "Human First",
    description:
      "Every feature is built around real people, not data points. We design for warmth, accessibility, and emotional connection.",
  },
  {
    icon: Target,
    title: "Cultural Intelligence",
    description:
      "We don't adapt Western solutions for Africa. We build from Africa, with deep respect for Nigerian food, language, and family structures.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "Health data should empower, not overwhelm. We translate complex signals into plain, actionable language every family can understand.",
  },
  {
    icon: Users,
    title: "Built for Every Generation",
    description:
      "From elderly users with basic Android phones to UK professionals on the go, Famva is accessible to everyone in the family.",
  },
]

const team = [
  {
    name: "Igori",
    role: "Founder & CEO",
    bio: "Building technology that honours family, bridges distance, and keeps people healthy across borders.",
    initials: "IG",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-background pt-32 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
            <div className="max-w-3xl">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">About Famva</p>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-balance leading-tight">
                We believe distance should never mean{" "}
                <span className="text-secondary">abandonment.</span>
              </h1>
              <p className="mt-6 font-sans text-lg text-foreground/70 leading-relaxed max-w-2xl">
                Famva was born from a deeply personal truth: millions of Nigerian professionals in the UK love their parents fiercely, but lack the tools to translate that love into daily care. We are building the bridge that should have always existed.
              </p>
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="bg-background pb-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[16px] p-8 border border-[#e0e0e8] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                  <Target size={18} className="text-secondary" />
                </div>
                <h2 className="font-serif font-bold text-xl text-primary mb-3">Our Mission</h2>
                <p className="font-sans text-sm text-primary/70 leading-relaxed">
                  To empower diaspora families with intelligent, culturally sensitive wellness tools that give elderly parents in Nigeria the daily support they deserve, and give their children in the UK the visibility and peace of mind they need to thrive.
                </p>
              </div>
              <div className="bg-primary rounded-[16px] p-8">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-5">
                  <Eye size={18} className="text-secondary" />
                </div>
                <h2 className="font-serif font-bold text-xl text-white mb-3">Our Vision</h2>
                <p className="font-sans text-sm text-white/70 leading-relaxed">
                  A world where no elderly parent feels abandoned because their children live abroad, and no adult child feels helpless because they cannot be physically present. Famva is the care layer that makes this possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1">
                <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Our Story</p>
                <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
                  Built from lived experience.
                </h2>
                <div className="mt-6 space-y-4 font-sans text-sm text-primary/70 leading-relaxed">
                  <p>
                    The idea for Famva came from a simple, painful reality: watching friends and colleagues in the UK manage the anxiety of not knowing how their elderly parents in Nigeria were doing each day, relying on infrequent phone calls and hoping for the best.
                  </p>
                  <p>
                    More than $21 billion is sent from the UK to Nigeria each year in remittances. While this financial support is vital, care often involves more than money alone, it includes helping with daily routines, offering companionship, and noticing early changes in health before they become serious concerns.
                  </p>
                  <p>
                    We set out to build what the Nigerian diaspora community has always needed: an intelligent, accessible, culturally respectful care platform designed not for Western markets, but for African families, wherever they are in the world.
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full max-w-sm lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden h-80 lg:h-100 shadow-xl shadow-primary/15">
                  <Image
                    src="/images/elderly-man.jpg"
                    alt="Elderly Nigerian man enjoying wellness and health outdoors"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-background py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Our Values</p>
              <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
                What guides everything we build.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-lg p-6 border border-[#e0e0e8] flex items-start gap-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-base text-primary mb-1">{title}</h3>
                    <p className="font-sans text-sm text-primary/65 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="bg-primary py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Who We Serve</p>
              <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white text-balance leading-tight">
                Two users. One family.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#3D1870]/50 rounded-[16px] p-8 border border-white/10">
                <p className="font-serif font-bold text-5xl text-secondary/30 leading-none mb-4">01</p>
                <h3 className="font-serif font-semibold text-xl text-white mb-3">UK-Based Nigerian Sponsors</h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed mb-5">
                  Professionals aged 35–50 managing careers in the UK while remotely overseeing the health of elderly parents in Nigeria. Tech-savvy, caring, and desperate for visibility beyond weekly calls.
                </p>
                <ul className="flex flex-col gap-2">
                  {["London, Manchester, Birmingham", "Healthcare, tech, finance professionals"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                      <span className="font-sans text-xs text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#3D1870]/50 rounded-[16px] p-8 border border-white/10">
                <p className="font-serif font-bold text-5xl text-secondary/30 leading-none mb-4">02</p>
                <h3 className="font-serif font-semibold text-xl text-white mb-3">Elderly Parents in Nigeria</h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed mb-5">
                  Adults aged 65–80+ in both urban and rural Nigeria, managing chronic conditions like hypertension and diabetes. Variable digital literacy, Famva is built for all of them.
                </p>
                <ul className="flex flex-col gap-2">
                  {["Urban and rural Nigeria", "Managing hypertension, diabetes, arthritis"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                      <span className="font-sans text-xs text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white text-balance leading-tight">
              Ready to bridge the distance?
            </h2>
            <p className="mt-4 font-sans text-base text-white/80 leading-relaxed">
              Join thousands of families already waiting for Famva.
            </p>
            <Link
              href="/waitlist"
              className="mt-7 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white text-secondary font-sans font-bold text-sm hover:bg-background transition-colors duration-200"
            >
              Join the Waitlist
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
