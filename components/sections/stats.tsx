const stats = [
  { value: "200K+", label: "UK-based Nigerian families" },
  { value: "63%", label: "Elderly with hypertension in Nigeria" },
  { value: "$21B", label: "Annual remittances, no care tools" },
  { value: "60–70%", label: "Healthcare costs paid out-of-pocket" },
]

export default function StatsSection() {
  return (
    <section className="bg-primary border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif font-bold text-3xl lg:text-4xl text-secondary">{value}</p>
              <p className="mt-1 font-sans text-sm text-white/60 leading-relaxed">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
