import Link from "next/link"
import {
  UserPlus,
  Brain,
  Smartphone,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const steps = [
  {
    icon: UserPlus,
    step: "Step 01",
    title: "Sponsor creates an account",
    description:
      "The UK-based adult child signs up on Famva, creates a profile for their elderly parent, and enters key health information — diagnosed conditions, medications, mobility level, and dietary preferences.",
    forWho: "UK Sponsor",
    details: [
      "5-minute guided onboarding",
      "Enter parent health profile once",
      "Invite parent via WhatsApp or SMS",
      "No technical setup required",
    ],
  },
  {
    icon: Brain,
    step: "Step 02",
    title: "AI generates personalised plans",
    description:
      "Within minutes, Famva's AI builds a complete suite of personalised wellness resources: a weekly care plan, culturally appropriate Nigerian meal plan, safe exercise routine, and medication schedule.",
    forWho: "AI Engine",
    details: [
      "Meals featuring egusi, moi moi, jollof rice",
      "Exercise adapted to physical ability",
      "Plans refresh when health data changes",
      "Culturally sensitive and medically sound",
    ],
  },
  {
    icon: Smartphone,
    step: "Step 03",
    title: "Parent follows a daily checklist",
    description:
      "The elderly parent receives a beautifully simple daily task checklist on their phone. Large text, icons, and offline support mean no internet connection is required to complete daily wellness tasks.",
    forWho: "Elderly Parent",
    details: [
      "Large-text, icon-first interface",
      "Three simple daily wellness tasks",
      "Emoji mood check-ins",
      "100% offline capability",
    ],
  },
  {
    icon: LineChart,
    step: "Step 04",
    title: "Sponsor stays informed in real time",
    description:
      "The UK sponsor sees daily completion updates, receives predictive decline alerts before problems escalate, and can access wellness summaries to share with siblings or doctors.",
    forWho: "UK Sponsor",
    details: [
      "Daily task completion dashboard",
      "Predictive decline alerts with context",
      "Weekly wellness summaries",
      "Share data with family or GPs",
    ],
  },
]

const faqs = [
  {
    q: "Does my parent need a good internet connection?",
    a: "No. Famva is designed for low-connectivity environments. Core features including the daily task checklist, medication reminders, and meal plans work fully offline.",
  },
  {
    q: "What if my parent is not comfortable with technology?",
    a: "The elderly app uses large text, simple icons, and minimal navigation — designed for users with basic digital literacy. Most parents are comfortable within their first week.",
  },
  {
    q: "How does the AI create culturally appropriate plans?",
    a: "Famva's AI is trained on Nigerian dietary data and local health context. Meal plans feature real Nigerian staples adapted for chronic conditions, not generic Western health advice.",
  },
  {
    q: "What health conditions does Famva support?",
    a: "Famva currently supports hypertension, Type 2 diabetes, arthritis, and post-stroke recovery. We are continuously expanding based on the most common conditions in our user community.",
  },
  {
    q: "Is my family's health data secure?",
    a: "Yes. Famva is fully GDPR compliant for UK data and NDPR compliant for Nigerian data. All health information is end-to-end encrypted and never sold to third parties.",
  },
  {
    q: "How much does Famva cost?",
    a: "Famva is free during the beta period for all waitlist members. After launch, subscriptions will start at £9.99/month — less than the cost of one GP appointment.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-primary pt-32 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-4">How It Works</p>
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-white text-balance leading-tight">
                From sign-up to peace of mind{" "}
                <span className="text-secondary">in four steps.</span>
              </h1>
              <p className="mt-6 font-sans text-lg text-white/70 leading-relaxed max-w-2xl">
                Famva is designed to be set up in minutes and deliver lasting value for years. Here is exactly how it works for both the UK sponsor and their elderly parent in Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-[#F2F2F2] py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col gap-16">
              {steps.map(({ icon: Icon, step, title, description, forWho, details }, idx) => (
                <div
                  key={step}
                  className={`flex flex-col lg:flex-row items-start gap-10 lg:gap-16 ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-serif font-bold text-4xl text-secondary/25 leading-none">{step}</span>
                      <span className="px-3 py-1 rounded-full bg-secondary/10 font-sans text-xs font-semibold text-secondary">
                        {forWho}
                      </span>
                    </div>
                    <h2 className="font-serif font-bold text-2xl lg:text-3xl text-primary text-balance leading-tight mb-4">
                      {title}
                    </h2>
                    <p className="font-sans text-sm text-primary/70 leading-relaxed mb-6">
                      {description}
                    </p>
                    <ul className="flex flex-col gap-2.5" role="list">
                      {details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3">
                          <CheckCircle2 size={15} className="text-secondary shrink-0" />
                          <span className="font-sans text-sm text-primary/80">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual card */}
                  <div className="flex-1 w-full">
                    <div className="bg-primary rounded-[16px] p-10 flex flex-col items-center justify-center gap-4 min-h-60 border border-secondary/10">
                      <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
                        <Icon size={28} className="text-secondary" />
                      </div>
                      <p className="font-serif font-semibold text-xl text-white text-center text-balance">
                        {title}
                      </p>
                      <p className="font-sans text-sm text-white/50 text-center">{step}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timelines */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">The Journey</p>
              <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
                What the first 90 days look like.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* UK Sponsor */}
              <div className="bg-[#F2F2F2] rounded-[16px] p-6">
                <p className="font-serif font-semibold text-base text-primary mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                  UK Sponsor Journey
                </p>
                {[
                  { time: "Day 1", event: "Download, onboard, share app with parent over video call" },
                  { time: "Week 1", event: "Review AI care plan — impressed by Nigerian cultural fit" },
                  { time: "Week 3", event: "First predictive alert catches a missed medication pattern" },
                  { time: "Month 2", event: "Sunday calls shift from anxious check-ins to meaningful conversations" },
                  { time: "Month 6+", event: "Famva is part of the daily routine, like checking email" },
                ].map(({ time, event }) => (
                  <div key={time} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" aria-hidden="true" />
                      <span className="w-px flex-1 bg-secondary/20 mt-1" aria-hidden="true" />
                    </div>
                    <div className="pb-1">
                      <p className="font-sans text-xs font-semibold text-secondary mb-0.5">{time}</p>
                      <p className="font-sans text-sm text-primary/70 leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Elderly parent */}
              <div className="bg-primary rounded-[16px] p-6">
                <p className="font-serif font-semibold text-base text-white mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                  Elderly Parent Journey
                </p>
                {[
                  { time: "Day 1", event: "Daughter sets up the app over video call — three simple tasks" },
                  { time: "Week 2", event: "Checklist becomes routine after morning prayer" },
                  { time: "Week 3", event: "Neighbour notices improved walking; parent feels proud" },
                  { time: "Month 2", event: "Blood pressure improves at clinic checkup — doctor asks what changed" },
                  { time: "Month 6+", event: "Shows app to church friends; relationship with daughter feels closer" },
                ].map(({ time, event }) => (
                  <div key={time} className="flex gap-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" aria-hidden="true" />
                      <span className="w-px flex-1 bg-secondary/20 mt-1" aria-hidden="true" />
                    </div>
                    <div className="pb-1">
                      <p className="font-sans text-xs font-semibold text-secondary mb-0.5">{time}</p>
                      <p className="font-sans text-sm text-white/70 leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white text-balance leading-tight">
              Start in minutes. Stay connected for life.
            </h2>
            <p className="mt-4 font-sans text-base text-white/80 leading-relaxed">
              Join the waitlist and be among the first to give your parent the daily wellness support they deserve.
            </p>
            <Link
              href="/waitlist"
              className="mt-7 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white text-secondary font-sans font-bold text-sm hover:bg-[#F2F2F2] transition-colors duration-200"
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
