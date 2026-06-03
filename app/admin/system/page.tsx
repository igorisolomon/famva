"use client"

import { useEffect, useState } from "react"
import { adminApi, SystemHealth, SystemMetrics } from "@/lib/admin-api"
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

function StatusIndicator({ status }: { status: string }) {
  const ok = status === "healthy"
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-sans font-semibold ${
        ok ? "text-green-600" : "text-red-500"
      }`}
    >
      {ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
      {status}
    </span>
  )
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#e0e0e8] last:border-0">
      <span className="font-sans text-sm text-[#6b6b80]">{label}</span>
      <span className="font-sans font-semibold text-sm text-[#2B0F4F]">
        {value}
      </span>
    </div>
  )
}

export default function SystemPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  async function load(silent = false) {
    if (silent) setRefreshing(true)
    else setLoading(true)
    try {
      const [h, m] = await Promise.all([
        adminApi.getSystemHealth(),
        adminApi.getSystemMetrics(),
      ])
      setHealth(h)
      setMetrics(m.data.metrics)
      setError("")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load system data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-[#6b6b80]" />
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

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">System</h1>
          <p className="font-sans text-sm text-[#6b6b80] mt-1">
            Health status and platform metrics
          </p>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3 h-9 bg-white border border-[#e0e0e8] text-sm font-sans font-medium text-[#2B0F4F] rounded-lg hover:bg-[#F2F2F2] transition-colors disabled:opacity-50"
        >
          <RefreshCw
            size={13}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      <Tabs defaultValue="health">
        <TabsList className="mb-6 h-10 bg-white border border-[#e0e0e8] p-1">
          <TabsTrigger value="health" className="text-sm font-sans">
            Health
          </TabsTrigger>
          <TabsTrigger value="metrics" className="text-sm font-sans">
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          {health && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Services */}
              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Services
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      label: "Database",
                      status: health.services.database.status,
                    },
                    { label: "Redis", status: health.services.redis.status },
                    { label: "API", status: health.status },
                  ].map(({ label, status }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-4 py-3 bg-[#F2F2F2] rounded-lg"
                    >
                      <span className="font-sans text-sm font-medium text-[#2B0F4F]">
                        {label}
                      </span>
                      <StatusIndicator status={status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Runtime */}
              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Runtime
                </h2>
                <Row label="Uptime" value={formatUptime(health.uptime)} />
                <Row label="RSS Memory" value={formatBytes(health.memory.rss)} />
                <Row
                  label="Heap Total"
                  value={formatBytes(health.memory.heapTotal)}
                />
                <Row
                  label="Heap Used"
                  value={formatBytes(health.memory.heapUsed)}
                />
                <Row
                  label="External"
                  value={formatBytes(health.memory.external)}
                />
                <p className="font-sans text-xs text-[#6b6b80] pt-3">
                  Last checked:{" "}
                  {new Date(health.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {/* DB detail */}
              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Database
                </h2>
                <Row
                  label="Status"
                  value={health.services.database.status}
                />
                <Row
                  label="Latency"
                  value={health.services.database.latency}
                />
              </div>

              {/* Memory usage bar */}
              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Memory Usage
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      label: "Heap",
                      used: health.memory.heapUsed,
                      total: health.memory.heapTotal,
                    },
                    {
                      label: "RSS",
                      used: health.memory.rss,
                      total: health.memory.heapTotal,
                    },
                  ].map(({ label, used, total }) => {
                    const pct = Math.min(
                      100,
                      Math.round((used / total) * 100)
                    )
                    return (
                      <div key={label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="font-sans text-xs text-[#6b6b80]">
                            {label}
                          </span>
                          <span className="font-sans text-xs font-semibold text-[#2B0F4F]">
                            {pct}%
                          </span>
                        </div>
                        <div className="h-2 bg-[#e0e0e8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2B0F4F] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="font-sans text-xs text-[#6b6b80] mt-1">
                          {formatBytes(used)} / {formatBytes(total)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="metrics">
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Users
                </h2>
                <Row label="Total" value={metrics.users.total} />
                <Row label="Active" value={metrics.users.active} />
                <Row label="Sponsors" value={metrics.users.sponsors} />
                <Row label="Elderly" value={metrics.users.elderly} />
              </div>

              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Alerts
                </h2>
                <Row label="Total" value={metrics.alerts.total} />
                <Row label="Pending" value={metrics.alerts.pending} />
                <Row label="Resolved" value={metrics.alerts.resolved} />
              </div>

              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Health Data
                </h2>
                <Row label="Total Metrics" value={metrics.health.totalMetrics} />
                <Row label="Last 7 Days" value={metrics.health.lastWeekMetrics} />
              </div>

              <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
                <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
                  Subscriptions & Revenue
                </h2>
                <Row
                  label="Active Subscriptions"
                  value={metrics.subscriptions.active}
                />
                <Row label="Past Due" value={metrics.subscriptions.pastDue} />
                <Row
                  label="Total Revenue"
                  value={`$${metrics.payments.totalRevenue}`}
                />
                <Row
                  label="Transactions"
                  value={metrics.payments.totalTransactions}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
