import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Sponsor signs up in the UK",
    description: "Create your account, set up your parent's health profile, and invite them to install the Famva elderly app.",
  },
  {
    step: "02",
    title: "AI builds personalised plans",
    description: "Within minutes, Famva generates culturally-appropriate care plans, meal guides, and exercise routines tailored to your parent's conditions.",
  },
  {
    step: "03",
    title: "Parent follows a daily checklist",
    description: "Simple, large-text tasks with icons. Works offline. Medication reminders, meal suggestions, and mood check-ins — all in one place.",
  },
  {
    step: "04",
    title: "You stay informed, always",
    description: "Track completions on your dashboard. Receive predictive alerts before problems escalate. Have meaningful conversations on every call.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {/* <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">How It Works</p> */}
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white text-balance leading-tight">
            Simple Setup, Lasting Peace of Mind.
          </h2>
          <p className="mt-4 font-sans text-base text-white/60 leading-relaxed">
            Famva was designed to be as simple for elderly parents in Nigeria as it is powerful for sponsors in the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ step, title, description }, idx) => (
            <div key={step} className="relative">
              <div className="relative z-10 bg-[#3D1870]/50 rounded-lg p-6 border border-white/10 h-full">
                <p className="font-serif font-bold text-4xl text-secondary/30 mb-4 leading-none">{step}</p>
                <h3 className="font-serif font-semibold text-base text-white mb-2">{title}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-secondary hover:text-white transition-colors duration-200"
          >
            See the full walkthrough
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
