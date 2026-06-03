"use client"

import { useEffect, useState } from "react"
import { adminApi, Analytics, SystemMetrics } from "@/lib/admin-api"
import { Users, AlertTriangle, CreditCard, CheckCircle2, Loader2 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { format } from "date-fns"

type DashboardData = {
  metrics: SystemMetrics
  analytics: Analytics
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  sub,
}: {
  label: string
  value: number | string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconBg: string
  sub?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e0e0e8] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <span className="font-serif font-bold text-3xl text-[#2B0F4F]">{value}</span>
        {sub && (
          <p className="font-sans text-xs text-[#6b6b80] mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  )
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#e0e0e8] rounded-lg ${className ?? ""}`} />
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    Promise.all([adminApi.getSystemMetrics(), adminApi.getAnalyticsDashboard()])
      .then(([metricsRes, analyticsRes]) => {
        setData({
          metrics: metricsRes.data.metrics,
          analytics: analyticsRes.data.analytics,
        })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 font-sans text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { metrics, analytics } = data

  const chartData = analytics.userGrowth.map((d) => ({
    date: d.date,
    users: Number(d.count),
  }))

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">Dashboard</h1>
        <p className="font-sans text-sm text-[#6b6b80] mt-1">
          Platform overview and key metrics
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Users"
          value={metrics.users.total}
          icon={Users}
          iconBg="bg-[#2B0F4F]/10 text-[#2B0F4F]"
          sub={`${metrics.users.sponsors} sponsors`}
        />
        <StatCard
          label="Active Users"
          value={metrics.users.active}
          icon={CheckCircle2}
          iconBg="bg-green-100 text-green-600"
          sub="Currently active"
        />
        <StatCard
          label="Subscriptions"
          value={metrics.subscriptions.active}
          icon={CreditCard}
          iconBg="bg-[#FF2E83]/10 text-[#FF2E83]"
          sub={`${metrics.subscriptions.pastDue} past due`}
        />
        <StatCard
          label="Pending Alerts"
          value={metrics.alerts.pending}
          icon={AlertTriangle}
          iconBg="bg-orange-100 text-orange-500"
          sub={`${metrics.alerts.total} total`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#e0e0e8] p-6">
          <div className="mb-5">
            <h2 className="font-serif font-semibold text-lg text-[#2B0F4F]">
              User Growth
            </h2>
            <p className="font-sans text-xs text-[#6b6b80] mt-0.5">
              New registrations over time
            </p>
          </div>
          {chartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-[#6b6b80] font-sans text-sm">
              No registration data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e0e0e8"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6b6b80", fontFamily: "Inter" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => {
                    try {
                      return format(new Date(v), "MMM d")
                    } catch {
                      return v
                    }
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6b6b80", fontFamily: "Inter" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    fontFamily: "Inter",
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e0e0e8",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  labelFormatter={(v) => {
                    try {
                      return format(new Date(v), "MMM d, yyyy")
                    } catch {
                      return v
                    }
                  }}
                  formatter={(value: number) => [value, "New users"]}
                />
                <Bar
                  dataKey="users"
                  fill="#FF2E83"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Platform usage */}
        <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
          <div className="mb-5">
            <h2 className="font-serif font-semibold text-lg text-[#2B0F4F]">
              Platform Usage
            </h2>
            <p className="font-sans text-xs text-[#6b6b80] mt-0.5">
              Current statistics
            </p>
          </div>
          <div className="space-y-0">
            {[
              {
                label: "Total Users",
                value: analytics.platformUsage.totalUsers,
              },
              {
                label: "Active Users",
                value: analytics.platformUsage.activeUsers,
              },
              {
                label: "Total Profiles",
                value: analytics.platformUsage.totalProfiles,
              },
              {
                label: "Active Profiles",
                value: analytics.platformUsage.activeProfiles,
              },
              {
                label: "Total Alerts",
                value: analytics.platformUsage.totalAlerts,
              },
              {
                label: "Pending Alerts",
                value: analytics.platformUsage.pendingAlerts,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3 border-b border-[#e0e0e8] last:border-0"
              >
                <span className="font-sans text-sm text-[#6b6b80]">{label}</span>
                <span className="font-sans font-semibold text-sm text-[#2B0F4F]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-6 bg-white rounded-xl border border-[#e0e0e8] p-6">
        <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-5">
          Quick Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Sponsors", value: metrics.users.sponsors },
            { label: "Elderly Users", value: metrics.users.elderly },
            { label: "Health Metrics", value: metrics.health.totalMetrics },
            { label: "Transactions", value: metrics.payments.totalTransactions },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-serif font-bold text-2xl text-[#2B0F4F]">
                {value}
              </div>
              <div className="font-sans text-xs text-[#6b6b80] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
