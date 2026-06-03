"use client"

import { useEffect, useState } from "react"
import { adminApi, AuditLog } from "@/lib/admin-api"
import { Loader2, FileText } from "lucide-react"
import { format } from "date-fns"

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    adminApi
      .getAuditLogs()
      .then((res) => setLogs(res.data.logs))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">
          Audit Logs
        </h1>
        <p className="font-sans text-sm text-[#6b6b80] mt-1">
          System activity and administrative actions
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#e0e0e8] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={20} className="animate-spin text-[#6b6b80]" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="font-sans text-sm text-red-500">{error}</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F2F2F2] flex items-center justify-center">
              <FileText size={20} className="text-[#6b6b80]" />
            </div>
            <div className="text-center">
              <p className="font-sans text-sm font-medium text-[#2B0F4F]">
                No audit logs
              </p>
              <p className="font-sans text-xs text-[#6b6b80] mt-0.5">
                Administrative actions will appear here
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0e0e8] bg-[#F2F2F2]/60">
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
                    Action
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide hidden md:table-cell">
                    User ID
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e8]">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-[#F2F2F2]/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-sans text-sm text-[#2B0F4F]">
                      {log.action}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="font-mono text-xs text-[#6b6b80]">
                        {log.userId}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-sans text-xs text-[#6b6b80]">
                      {format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && (
        <p className="font-sans text-xs text-[#6b6b80] mt-3 px-1">
          {logs.length} {logs.length === 1 ? "entry" : "entries"}
        </p>
      )}
    </div>
  )
}
