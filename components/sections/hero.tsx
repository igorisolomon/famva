import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="rel. ative overflow-hidden py-16">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-0 md:pt-24 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left my-24">

            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-balance leading-tight text-famva-black">
              Care for Your{' '}<span className="text-secondary">Loved Ones</span> No Matter the Distance.
            </h1>

            <p className="mt-6 font-sans text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Monitor and safeguard the wellbeing of your elderly parents with real-time health tracking, intelligent alerts, and AI-powered care plans designed for Nigerian Diasporans.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-primary text-background font-sans font-semibold text-sm hover:bg-famva-pink-hover transition-colors duration-200 w-full sm:w-auto"
              >
                Join the Waitlist
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none relative">
            <div className="relative rounded-t-2xl overflow-hidden shadow-2xl shadow-black/50 h-80 sm:h-96 lg:h-120">
              <Image
                src="/images/hero-family.jpg"
                alt="Elderly Nigerian woman using Famva health app at home"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-primary/30" aria-hidden="true" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans text-xs text-white/60 mb-0.5">Today's Wellness Score</p>
                    <p className="font-serif font-bold text-2xl text-green-400">
                      94<span className="text-white/60 font-sans font-normal text-sm">/100</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                      <span className="font-sans text-xs text-white/80">Meal plan created</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                      <span className="font-sans text-xs text-white/80">Medication taken</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                      <span className="font-sans text-xs text-white/80">Morning walk: pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
