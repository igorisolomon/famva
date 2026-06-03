"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { adminApi, UserDetail } from "@/lib/admin-api"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
        {label}
      </dt>
      <dd className="font-sans text-sm text-[#2B0F4F] mt-1 break-all">
        {value || "—"}
      </dd>
    </div>
  )
}

function RoleBadge({ role }: { role: string }) {
  const cls: Record<string, string> = {
    admin: "bg-[#2B0F4F]/10 text-[#2B0F4F]",
    sponsor: "bg-[#FF2E83]/10 text-[#FF2E83]",
    elderly: "bg-green-100 text-green-700",
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans font-semibold ${cls[role] ?? "bg-gray-100 text-gray-600"}`}
    >
      {role}
    </span>
  )
}

export default function UserDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "" })

  useEffect(() => {
    adminApi
      .getUser(id)
      .then((res) => {
        setUser(res.data.user)
        setForm({
          firstName: res.data.user.firstName ?? "",
          lastName: res.data.user.lastName ?? "",
        })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    try {
      const res = await adminApi.updateUser(id, {
        firstName: form.firstName,
        lastName: form.lastName,
      })
      setUser((prev) => (prev ? { ...prev, ...res.data.user } : prev))
      toast.success("User updated successfully")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update user")
    } finally {
      setSaving(false)
    }
  }

  const backLink = (
    <Link
      href="/admin/users"
      className="inline-flex items-center gap-2 text-sm font-sans text-[#6b6b80] hover:text-[#2B0F4F] transition-colors mb-6"
    >
      <ArrowLeft size={15} /> Back to Users
    </Link>
  )

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {backLink}
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-white rounded-xl" />
          <div className="h-48 bg-white rounded-xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {backLink}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 font-sans text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const initials =
    (user.firstName?.[0] ?? "").toUpperCase() +
    (user.lastName?.[0] ?? "").toUpperCase()

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {backLink}

      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-[#2B0F4F] flex items-center justify-center text-white font-serif font-bold text-xl flex-shrink-0">
          {initials || "?"}
        </div>
        <div>
          <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">
            {user.firstName} {user.lastName}
          </h1>
          <p className="font-sans text-sm text-[#6b6b80] mt-0.5">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <RoleBadge role={user.role} />
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-sans font-medium",
                user.isActive ? "text-green-600" : "text-[#6b6b80]"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  user.isActive ? "bg-green-500" : "bg-gray-300"
                )}
              />
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: details + edit */}
        <div className="md:col-span-2 space-y-6">
          {/* Account details */}
          <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
            <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-5">
              Account Details
            </h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Field label="First Name" value={user.firstName} />
              <Field label="Last Name" value={user.lastName} />
              <Field label="Email" value={user.email} />
              <Field label="Phone" value={user.phone} />
              <Field label="Country" value={user.country} />
              <Field label="City" value={user.city} />
              <Field
                label="Email Verified"
                value={user.emailVerified ? "Yes" : "No"}
              />
              <Field
                label="Subscription"
                value={user.subscriptionStatus}
              />
              <Field
                label="Last Login"
                value={
                  user.lastLogin
                    ? format(new Date(user.lastLogin), "MMM d, yyyy HH:mm")
                    : "Never"
                }
              />
              <Field
                label="Joined"
                value={format(new Date(user.createdAt), "MMM d, yyyy")}
              />
            </dl>
          </div>

          {/* Edit form */}
          <div className="bg-white rounded-xl border border-[#e0e0e8] p-6">
            <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-5">
              Edit Profile
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#6b6b80] mb-1.5 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    className="w-full px-3 h-10 text-sm font-sans bg-white border border-[#e0e0e8] rounded-lg outline-none focus:ring-2 focus:ring-[#FF2E83]/30 focus:border-[#FF2E83] transition-all text-[#2B0F4F]"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#6b6b80] mb-1.5 uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    className="w-full px-3 h-10 text-sm font-sans bg-white border border-[#e0e0e8] rounded-lg outline-none focus:ring-2 focus:ring-[#FF2E83]/30 focus:border-[#FF2E83] transition-all text-[#2B0F4F]"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 h-9 bg-[#2B0F4F] hover:bg-[#3D1A6D] text-white text-sm font-sans font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: linked data + security */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e0e0e8] p-5">
            <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
              Linked Data
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Elderly Profiles",
                  value: user.elderlyProfiles.length,
                },
                {
                  label: "Sponsored Profiles",
                  value: user.sponsoredProfiles.length,
                },
                { label: "Subscriptions", value: user.subscriptions.length },
                { label: "Payments", value: user.payments.length },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-1 border-b border-[#e0e0e8] last:border-0"
                >
                  <span className="font-sans text-sm text-[#6b6b80]">
                    {label}
                  </span>
                  <span className="font-sans font-semibold text-sm text-[#2B0F4F]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e0e0e8] p-5">
            <h2 className="font-serif font-semibold text-base text-[#2B0F4F] mb-4">
              Security
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1 border-b border-[#e0e0e8]">
                <span className="font-sans text-sm text-[#6b6b80]">2FA</span>
                <span className="font-sans text-sm text-[#2B0F4F]">
                  {user.security?.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#e0e0e8]">
                <span className="font-sans text-sm text-[#6b6b80]">
                  Login Attempts
                </span>
                <span className="font-sans text-sm text-[#2B0F4F]">
                  {user.security?.loginAttempts ?? 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-sans text-sm text-[#6b6b80]">
                  Invite Code
                </span>
                <span className="font-mono text-xs text-[#2B0F4F]">
                  {user.sponsorInviteCode || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
