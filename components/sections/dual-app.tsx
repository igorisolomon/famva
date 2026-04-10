import { Globe, Users, CheckCircle2 } from "lucide-react"

export default function DualAppSection() {
  return (
    <section className="bg-[#F2F2F2] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Two Apps. One Family.</p>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-primary text-balance leading-tight">
            Designed for two very different worlds.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-[16px] p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Globe size={18} className="text-secondary" />
              </div>
              <div>
                <p className="font-serif font-semibold text-base text-white">UK Sponsor App</p>
                <p className="font-sans text-xs text-white/50">For adult children in the UK</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3" role="list">
              {[
                "Real-time wellness dashboard",
                "Predictive decline alerts with context",
                "View active care plans and completions",
                "Weekly wellness summaries to share",
                "Data-driven family conversations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={15} className="text-secondary shrink-0" />
                  <span className="font-sans text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-[16px] p-8 border border-[#e0e0e8] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users size={18} className="text-secondary" />
              </div>
              <div>
                <p className="font-serif font-semibold text-base text-primary">Elderly App (Nigeria)</p>
                <p className="font-sans text-xs text-primary/50">For parents and grandparents</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3" role="list">
              {[
                "Large text and icon-based design",
                "Simple daily task checklist",
                "Illustrated meal and exercise plans",
                "Emoji-based mood check-ins",
                "100% offline capability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={15} className="text-secondary shrink-0" />
                  <span className="font-sans text-sm text-primary/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
