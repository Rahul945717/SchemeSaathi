"use client"

import { Clock, FileCheck2, IndianRupee, Target, Wand2 } from "lucide-react"
import { applications, inr, schemes, type Scheme } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import { SchemeCard } from "@/components/scheme-card"

export function CitizenOverview({
  onView,
  onFind,
}: {
  onView: (s: Scheme) => void
  onFind: () => void
}) {
  const recommended = [...schemes].sort((a, b) => (b.match ?? 0) - (a.match ?? 0)).slice(0, 3)
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <Card className="flex flex-col justify-between gap-4 overflow-hidden bg-primary p-6 text-primary-foreground md:flex-row md:items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
            CITIZEN PORTAL
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Hello, Rahul 👋</h2>
          <p className="mt-1 max-w-md text-primary-foreground/80">
            We found government schemes that may match your profile and eligibility.
          </p>
          <Button variant="secondary" className="mt-4" onClick={onFind}>
            <Wand2 className="size-4" /> Find eligible schemes
          </Button>
        </div>
      </Card>

      {/* Profile completion */}
      <Card className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold">Complete your profile</h3>
          <p className="text-sm text-muted-foreground">
            Add more information to get better scheme recommendations.
          </p>
        </div>
        <div className="w-full md:max-w-xs">
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Profile completion</span>
            <span className="font-semibold">75%</span>
          </div>
          <Progress value={75} />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Target} label="Eligible schemes" value="18" hint="Based on your profile" tone="blue" />
        <StatCard icon={FileCheck2} label="Applications" value="05" hint="2 approved" tone="green" />
        <StatCard icon={Clock} label="Pending" value="02" hint="Awaiting response" tone="orange" />
        <StatCard icon={IndianRupee} label="Potential benefits" value="₹52K+" hint="Estimated yearly" tone="purple" />
      </div>

      {/* Two column */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Recommended for you</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {recommended.map((s) => (
              <SchemeCard key={s.id} scheme={s} onView={onView} />
            ))}
          </div>
        </div>

        <Card className="p-5">
          <h3 className="font-semibold">Application status</h3>
          <p className="text-sm text-muted-foreground">Track your recent applications</p>
          <div className="mt-4 space-y-3">
            {applications.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.schemeName}</p>
                  <p className="text-xs text-muted-foreground">{a.id} · {inr(a.amount)}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
