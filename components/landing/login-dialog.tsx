"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, ShieldCheck, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Role = "citizen" | "partner" | "admin"

const roles: { key: Role; label: string; icon: typeof User; href: string }[] = [
  { key: "citizen", label: "Citizen", icon: User, href: "/dashboard" },
  { key: "partner", label: "Partner", icon: Building2, href: "/partner" },
  { key: "admin", label: "Admin", icon: ShieldCheck, href: "/admin" },
]

export function LoginDialog({
  open,
  onOpenChange,
  mode = "login",
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  mode?: "login" | "signup"
}) {
  const router = useRouter()
  const [role, setRole] = useState<Role>("citizen")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const dest = roles.find((r) => r.key === role)!.href
    router.push(dest)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Create your account" : "Welcome back"}</DialogTitle>
          <DialogDescription>
            Prototype demo — pick a role and use any email &amp; password to enter that dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Continue as</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => {
                const Icon = r.icon
                const activeRole = role === r.key
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRole(r.key)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-sm font-medium transition-colors",
                      activeRole
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40",
                    )}
                  >
                    <Icon className="size-5" />
                    {r.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" required />
          </div>

          <Button type="submit" className="w-full">
            {mode === "signup" ? "Create account" : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
