import { Globe, Heart, AlertTriangle, Clock } from 'lucide-react'

const challenges = [
  {
    icon: Globe,
    title: 'Miles Apart',
    description: 'Over 200,000 UK-based Nigerians send billions home annually, yet lack tools to monitor their elderly parents\' daily health.',
  },
  {
    icon: Heart,
    title: 'Chronic Conditions',
    description: '63% of Nigerians over 70 have hypertension, and 10% over 60 have diabetes often managed without structured support.',
  },
  {
    icon: AlertTriangle,
    title: 'Late Detection',
    description: 'Health issues are often discovered only when they\'ve become emergencies, leading to preventable crises.',
  },
  {
    icon: Clock,
    title: 'Constant Worry',
    description: 'Caregivers experience severe emotional distress and guilt, relying on infrequent calls for health updates.',
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
            Distance shouldn't mean helplessness.
          </h2>
          <p className="mt-5 font-sans text-base text-primary/70 leading-relaxed">
            Over 200,000 UK-based Nigerians send billions home every year, but financial support alone cannot replace hands-on health management. Traditional care systems are breaking down, and existing health apps simply aren't built for Nigerian families.
          </p>
        </div>
        <div className="mt-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-primary/5 rounded-lg p-6 hover:bg-primary transition-colors duration-300 border border-transparent hover:border-secondary/20"
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
