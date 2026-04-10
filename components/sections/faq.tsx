
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
  }
]

export default function FAQSection() {
  return (
    <section className="bg-[#F2F2F2] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">FAQs</p>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
            Common questions answered.
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-lg p-6 border border-[#e0e0e8] shadow-sm">
              <h3 className="font-serif font-semibold text-base text-primary mb-2">{q}</h3>
              <p className="font-sans text-sm text-primary/65 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}