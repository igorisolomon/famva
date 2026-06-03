export type User = {
  id: string
  email: string
  role: "admin" | "sponsor" | "elderly"
  firstName: string
  lastName: string
  phone: string | null
  country: string | null
  city: string | null
  isActive: boolean
  emailVerified: boolean
  subscriptionStatus: string
  lastLogin: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type UserDetail = User & {
  elderlyProfiles: Record<string, unknown>[]
  sponsoredProfiles: Record<string, unknown>[]
  subscriptions: Record<string, unknown>[]
  payments: Record<string, unknown>[]
  pinHash: string | null
  loginOtpHash: string | null
  loginOtpExpire: string | null
  sponsorInviteCode: string | null
  resetPasswordToken: string | null
  resetPasswordExpire: string | null
  security?: { loginAttempts: number; twoFactorEnabled: boolean }
}

export type SystemHealth = {
  status: string
  timestamp: string
  uptime: number
  memory: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
    arrayBuffers: number
  }
  services: {
    database: { status: string; latency: string }
    redis: { status: string }
  }
}

export type SystemMetrics = {
  users: { total: number; active: number; sponsors: number; elderly: number }
  alerts: { total: number; pending: number; resolved: number }
  health: { totalMetrics: number; lastWeekMetrics: number }
  payments: { totalRevenue: number; totalTransactions: number }
  subscriptions: { active: number; pastDue: number }
}

export type Analytics = {
  userGrowth: { date: string; count: string }[]
  alertTrends: unknown[]
  revenueTrends: unknown[]
  platformUsage: {
    totalUsers: number
    activeUsers: number
    totalProfiles: number
    activeProfiles: number
    totalAlerts: number
    pendingAlerts: number
  }
}

export type AuditLog = {
  id: string
  action: string
  userId: string
  createdAt: string
  [key: string]: unknown
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("admin_token")
}

async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  })

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_refresh_token")
      window.location.href = "/admin/login"
    }
    throw new Error("Unauthorized")
  }

  if (res.status === 204) return undefined as T

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.message || `Request failed: ${res.status}`)
  }

  return res.json() as Promise<T>
}

export const adminApi = {
  getUsers(params?: { role?: string }) {
    const qs = params?.role && params.role !== "all" ? `?role=${params.role}` : ""
    return adminFetch<{ status: string; results: number; data: { users: User[] } }>(`/admin/users${qs}`)
  },

  getUser(id: string) {
    return adminFetch<{ status: string; data: { user: UserDetail } }>(`/admin/users/${id}`)
  },

  updateUser(id: string, body: Partial<Pick<User, "firstName" | "lastName" | "phone" | "country" | "city" | "isActive">>) {
    return adminFetch<{ status: string; data: { user: User } }>(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
  },

  deleteUser(id: string) {
    return adminFetch<void>(`/admin/users/${id}`, { method: "DELETE" })
  },

  getSystemHealth() {
    return adminFetch<SystemHealth>("/admin/system/health")
  },

  getSystemMetrics() {
    return adminFetch<{ status: string; data: { metrics: SystemMetrics } }>("/admin/system/metrics")
  },

  getAuditLogs() {
    return adminFetch<{ status: string; results: number; data: { logs: AuditLog[] } }>("/admin/system/audit-logs")
  },

  getAnalyticsDashboard() {
    return adminFetch<{ status: string; data: { analytics: Analytics } }>("/admin/analytics/dashboard")
  },

  regenerateAllPlans() {
    return adminFetch<{ status: string; message: string; data: Record<string, unknown> }>("/admin/ai/regenerate-all-plans", {
      method: "POST",
    })
  },
}
