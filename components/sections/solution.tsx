import { Activity, Shield, Sparkles, Users } from 'lucide-react'

const differentiators = [
  {
    icon: Sparkles,
    title: "AI Care Plan Generator",
    description: "Personalized daily and weekly wellness tasks built around your parent's health profile, age, conditions, medications.",
  },
  {
    icon: Users,
    title: "Cultural Intelligence",
    description: "Nigerian meal plans featuring real staples: egusi, moi moi, amala, adapted for chronic conditions with portion guidance.",
  },
  {
    icon: Activity,
    title: "Safe Exercise Routines",
    description: "Low-impact mobility routines adapted to physical ability, with illustrated instructions and adaptive suggestions.",
  },
  {
    icon: Shield,
    title: "Accessibility-First",
    description: "Early warning signals sent to UK sponsors before health issues become emergencies, including contributing factors and clear suggested next steps.",
  },
]

export default function SolutionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-secondary bg-secondary/10 rounded-full uppercase">
              Our Solution
            </span>
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance">
              AI-Powered Wellness Intelligence
            </h2>
            <p className="mt-4 text-lg text-primary/70 leading-relaxed">
              Famva delivers personalized care plans, culturally appropriate Nigerian meal plans, 
              safe exercise routines, and predictive decline alerts that catch health issues before 
              they become emergencies.
            </p>

            {/* Dual App Model */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="bg-primary text-white rounded-2xl p-6">
                <h3 className="font-serif font-semibold text-lg text-background mb-2">
                  Sponsor App (UK)
                </h3>
                <p className="text-sm text-background/70">
                  Peace of mind dashboard with visibility, predictive alerts, and wellness summaries.
                </p>
              </div>
              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-serif font-semibold text-lg text-white mb-2">
                  Elderly App (Nigeria)
                </h3>
                <p className="text-sm text-white/80">
                  Simple daily checklist with large text, icons, and offline capability.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Differentiators */}
          <div className="grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group bg-background rounded-2xl p-6 hover:bg-white hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
