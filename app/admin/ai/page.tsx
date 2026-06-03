"use client"

import { useState } from "react"
import { adminApi } from "@/lib/admin-api"
import { Sparkles, Loader2, CheckCircle2, ClipboardList, Utensils, Dumbbell } from "lucide-react"
import { toast } from "sonner"

const PLAN_TYPES = [
  {
    icon: ClipboardList,
    title: "Care Plans",
    desc: "Daily tasks, weekly goals, and check-in summaries tailored to each profile's needs and conditions.",
  },
  {
    icon: Utensils,
    title: "Meal Plans",
    desc: "Weekly meal schedules with culturally relevant food choices and nutritional guidance.",
  },
  {
    icon: Dumbbell,
    title: "Exercise Routines",
    desc: "Adaptive exercise programs matched to each person's mobility level and physical condition.",
  },
]

export default function AIPlansPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleRegenerate() {
    setLoading(true)
    setResult(null)
    try {
      const res = await adminApi.regenerateAllPlans()
      setResult(res.message)
      toast.success(res.message)
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to trigger regeneration"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">
          AI Plans
        </h1>
        <p className="font-sans text-sm text-[#6b6b80] mt-1">
          Manage AI-generated care, meal, and exercise plans
        </p>
      </div>

      {/* Regenerate card */}
      <div className="bg-white rounded-xl border border-[#e0e0e8] p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF2E83]/10 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-[#FF2E83]" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif font-semibold text-base text-[#2B0F4F]">
              Regenerate All Plans
            </h2>
            <p className="font-sans text-sm text-[#6b6b80] mt-1.5 leading-relaxed">
              Queue AI-powered regeneration for all active elderly profiles.
              New plans will be generated asynchronously — the operation may
              take a few minutes to complete depending on the number of
              profiles.
            </p>

            <div className="mt-5">
              <button
                onClick={handleRegenerate}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 h-10 bg-[#2B0F4F] hover:bg-[#3D1A6D] text-white text-sm font-sans font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Queuing…
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Regenerate All Plans
                  </>
                )}
              </button>
            </div>

            {result && (
              <div className="mt-4 flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <CheckCircle2 size={15} className="text-green-600 flex-shrink-0" />
                <p className="font-sans text-sm text-green-700">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What gets regenerated */}
      <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
        <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
          What gets regenerated?
        </h2>
        <div className="space-y-3">
          {PLAN_TYPES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-[#F2F2F2] rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#e0e0e8] flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-[#2B0F4F]" />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-[#2B0F4F]">
                  {title}
                </p>
                <p className="font-sans text-xs text-[#6b6b80] mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
