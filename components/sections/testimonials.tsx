import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "For the first time, I feel like I actually know how Mum is doing day-to-day — not just when something goes wrong. That&apos;s everything.",
      name: "Chidera O.",
      role: "Healthcare Administrator, Manchester",
      initials: "CO",
    },
    {
      quote: "I've been considering leaving my high-paying job to return to Nigeria. A solution like Famva would give me the visibility I desperately need.",
      name: "Ngozi A.",
      role: "Software Engineer, London",
      initials: "NA",
    },
    {
      quote: "Health apps are too complicated for me. I just want something simple that my children can see, so they don't worry so much.",
      name: "Emeka T.",
      role: "Pharmacist, Birmingham",
      initials: "ET",
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Early Feedback</p>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
            Heard from families like yours.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-background rounded-3xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-white" />
              </div>

              <div className="mt-4">
                <p className="text-primary/80 leading-relaxed text-lg italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="pt-6 border-t border-primary/10">
                  <p className="font-serif font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary/60 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
