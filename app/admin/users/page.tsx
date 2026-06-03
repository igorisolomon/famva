"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { adminApi, User } from "@/lib/admin-api"
import { Search, ChevronRight, Trash2, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const ROLES = [
  { value: "all", label: "All" },
  { value: "sponsor", label: "Sponsors" },
  { value: "elderly", label: "Elderly" },
  { value: "admin", label: "Admins" },
]

function RoleBadge({ role }: { role: string }) {
  const cls: Record<string, string> = {
    admin: "bg-[#2B0F4F]/10 text-[#2B0F4F]",
    sponsor: "bg-[#FF2E83]/10 text-[#FF2E83]",
    elderly: "bg-green-100 text-green-700",
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-sans font-semibold ${cls[role] ?? "bg-gray-100 text-gray-600"}`}
    >
      {role}
    </span>
  )
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [role, setRole] = useState("all")
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setLoading(true)
    adminApi
      .getUsers({ role: role === "all" ? undefined : role })
      .then((res) => setUsers(res.data.users))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [role])

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await adminApi.deleteUser(deleteId)
      setUsers((prev) => prev.filter((u) => u.id !== deleteId))
      toast.success("User deleted successfully")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete user")
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  const filtered = users.filter((u) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      u.email.toLowerCase().includes(q) ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif font-bold text-2xl text-[#2B0F4F]">Users</h1>
        <p className="font-sans text-sm text-[#6b6b80] mt-1">
          Manage all platform users
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b80]"
          />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-10 text-sm font-sans bg-white border border-[#e0e0e8] rounded-lg outline-none focus:ring-2 focus:ring-[#FF2E83]/30 focus:border-[#FF2E83] transition-all text-[#2B0F4F] placeholder:text-[#6b6b80]"
          />
        </div>

        <div className="flex gap-1 bg-white border border-[#e0e0e8] rounded-lg p-1 h-10">
          {ROLES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={cn(
                "px-3 rounded-md text-xs font-sans font-medium transition-colors",
                role === value
                  ? "bg-[#2B0F4F] text-white"
                  : "text-[#6b6b80] hover:text-[#2B0F4F] hover:bg-[#F2F2F2]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e0e0e8] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={20} className="animate-spin text-[#6b6b80]" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="font-sans text-sm text-red-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <p className="font-sans text-sm text-[#6b6b80]">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0e0e8] bg-[#F2F2F2]/60">
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
                    User
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide hidden lg:table-cell">
                    Last Login
                  </th>
                  <th className="text-left px-5 py-3 font-sans text-xs font-semibold text-[#6b6b80] uppercase tracking-wide hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="px-5 py-3 w-20" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e8]">
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#F2F2F2]/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-sans font-medium text-sm text-[#2B0F4F]">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="font-sans text-xs text-[#6b6b80] mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
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
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="font-sans text-xs text-[#6b6b80]">
                        {user.lastLogin
                          ? format(new Date(user.lastLogin), "MMM d, yyyy")
                          : "Never"}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="font-sans text-xs text-[#6b6b80]">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setDeleteId(user.id)}
                          className="p-1.5 text-[#6b6b80] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete user"
                        >
                          <Trash2 size={14} />
                        </button>
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="p-1.5 text-[#6b6b80] hover:text-[#2B0F4F] hover:bg-[#F2F2F2] rounded-md transition-colors"
                        >
                          <ChevronRight size={14} />
                        </Link>
                      </div>
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
          Showing {filtered.length} of {users.length} users
        </p>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user and all associated data will
              be permanently removed from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete user"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
