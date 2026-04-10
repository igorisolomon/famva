import { Brain, Utensils, Activity, Bell, Heart, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Care Plan Generator",
    description:
      "Personalized daily and weekly wellness tasks built around your parent's health profile — age, conditions, medications — and updated automatically as health data evolves.",
  },
  {
    icon: Utensils,
    title: "Culturally-Aware Meal Plans",
    description:
      "Nigerian meal plans featuring real staples: egusi, moi moi, jollof rice — adapted for chronic conditions like hypertension and diabetes with portion guidance.",
  },
  {
    icon: Activity,
    title: "Safe Exercise Routines",
    description:
      "Low-impact mobility routines adapted to physical ability, with illustrated instructions and adaptive suggestions. Seated, standing, or walking-based.",
  },
  {
    icon: Bell,
    title: "Predictive Decline Alerts",
    description:
      "Early warning signals sent to UK sponsors before health issues become emergencies — including contributing factors and clear suggested next steps.",
  },
  {
    icon: Heart,
    title: "Medication Reminders",
    description:
      "Structured daily reminders that drive 80%+ adherence — with check-in confirmations you can track remotely from the UK.",
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description:
      "GDPR compliant for UK data, NDPR compliant for Nigerian data. End-to-end encryption across all health information. Your family's data stays protected.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
            Everything your family needs. Nothing you don&apos;t.
          </h2>
          <p className="mt-4 font-sans text-base text-primary/60 leading-relaxed">
            Famva gives UK sponsors real-time peace of mind, while delivering elderly parents a beautifully simple daily wellness companion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-[#F2F2F2] rounded-lg p-6 hover:bg-primary transition-colors duration-300 border border-transparent hover:border-secondary/20"
            >
              <div className="w-11 h-11 rounded-full bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon size={20} className="text-secondary" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-primary group-hover:text-white mb-2 transition-colors duration-300">
                {title}
              </h3>
              <p className="font-sans text-sm text-primary/60 group-hover:text-white/70 leading-relaxed transition-colors duration-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
